import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text) => set((state) => ({
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            text,
            completed: false,
            createdAt: Date.now()
          }
        ].sort((a, b) => b.createdAt - a.createdAt)
      })),
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      })),
      removeTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),
      clearCompleted: () => set((state) => ({
        todos: state.todos.filter(todo => !todo.completed)
      }))
    }),
    {
      name: 'todo-storage',
      version: 1,
    }
  )
);