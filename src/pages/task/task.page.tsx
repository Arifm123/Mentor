"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, Plus, Check, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface Task {
  id: number
  text: string
  completed: boolean
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [editingTask, setEditingTask] = useState<number | null>(null)
  const [editText, setEditText] = useState("")
  const router = useRouter()

  const createTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
      },
    ])
    setNewTask("")
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const startEdit = (task: Task) => {
    setEditingTask(task.id)
    setEditText(task.text)
  }

  const saveEdit = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: editText } : task)))
    setEditingTask(null)
  }

  const toggleComplete = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Your Tasks</CardTitle>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Create Task Form */}
            <form onSubmit={createTask} className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </form>

            {/* Task List */}
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleComplete(task.id)}>
                    <Check className={`h-4 w-4 ${task.completed ? "text-green-500" : "text-gray-300"}`} />
                  </Button>

                  {editingTask === task.id ? (
                    <div className="flex-1 flex gap-2">
                      <Input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={() => saveEdit(task.id)}>
                        Save
                      </Button>
                    </div>
                  ) : (
                    <span className={`flex-1 ${task.completed ? "line-through text-gray-400" : ""}`}>{task.text}</span>
                  )}

                  {editingTask !== task.id && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => startEdit(task)}>
                        <Pencil className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              {tasks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-2">No tasks yet</p>
                  <p className="text-sm text-muted-foreground">Add a new task using the form above</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

