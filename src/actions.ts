"use server"

import { revalidatePath } from "next/cache"
import type { CreateTodo, Todo, UpdateTodo } from "./types/todo"

const todos: Todo[] = []

export async function getTodos(): Promise<Todo[]> {
  return todos
}

export async function createTodo(data: CreateTodo) {
  const todo: Todo = {
    id: Math.random().toString(36).slice(2),
    title: data.title,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  todos.push(todo)
  revalidatePath("/dashboard")
  return todo
}

export async function updateTodo(data: UpdateTodo) {
  const todo = todos.find((t) => t.id === data.id)
  if (!todo) throw new Error("Todo not found")

  Object.assign(todo, {
    ...data,
    updatedAt: new Date(),
  })

  revalidatePath("/dashboard")
  return todo
}

export async function deleteTodo(id: string) {
  const index = todos.findIndex((t) => t.id === id)
  if (index === -1) throw new Error("Todo not found")

  todos.splice(index, 1)
  revalidatePath("/dashboard")
}

export async function toggleTodo(id: string) {
  const todo = todos.find((t) => t.id === id)
  if (!todo) throw new Error("Todo not found")

  todo.completed = !todo.completed
  todo.updatedAt = new Date()

  revalidatePath("/dashboard")
  return todo
}

