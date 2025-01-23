"use client"

import { useState } from "react"
import { Loader2, Plus, Trash } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Checkbox } from "../../components/ui/checkbox"
import { Input } from "../../components/ui/input"
import { createTodo, deleteTodo, toggleTodo } from "../../actions"
import type { Todo } from "@/types/todo"

export default function DashboardPage() {
  const router = useRouter()
  const [newTodo, setNewTodo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [todos, setTodos] = useState<Todo[]>([])

  async function handleCreateTodo(e: React.FormEvent) {
    e.preventDefault()
    if (!newTodo.trim()) return

    setIsLoading(true)
    try {
      const todo = await createTodo({ title: newTodo })
      setTodos((prev) => [...prev, todo])
      setNewTodo("")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleToggleTodo(id: string) {
    try {
      const updated = await toggleTodo(id)
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)))
    } catch (error) {
      console.error("Failed to toggle todo:", error)
    }
  }

  async function handleDeleteTodo(id: string) {
    try {
      await deleteTodo(id)
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error("Failed to delete todo:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Todo List</CardTitle>
            <CardDescription>Manage your tasks and stay organized</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTodo} className="flex gap-2 mb-4">
              <Input
                placeholder="Add a new todo..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                disabled={isLoading}
              />
              <Button disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                <span className="sr-only">Add todo</span>
              </Button>
            </form>

            <div className="space-y-4">
              {todos.map((todo) => (
                <div key={todo.id} className="flex items-center gap-2 group">
                  <Checkbox checked={todo.completed} onCheckedChange={() => handleToggleTodo(todo.id)} />
                  <span className={todo.completed ? "line-through text-muted-foreground" : ""}>{todo.title}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto opacity-0 group-hover:opacity-100"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete todo</span>
                  </Button>
                </div>
              ))}
              {todos.length === 0 && <p className="text-center text-muted-foreground">No todos yet. Add one above!</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

