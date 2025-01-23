export interface Todo {
    id: string
    title: string
    completed: boolean
    createdAt: Date
    updatedAt: Date
  }
  
  export type CreateTodo = Pick<Todo, "title">
  export type UpdateTodo = Partial<CreateTodo> & Pick<Todo, "id">
  
  