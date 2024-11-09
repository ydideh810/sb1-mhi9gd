import React, { useState } from 'react';
import { Check, Trash2, Plus, XCircle } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

export default function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  const { todos, addTodo, toggleTodo, removeTodo, clearCompleted } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="p-4 h-[60vh] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold terminal-text">TASK MANAGER v1.0</h2>
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="terminal-button text-sm flex items-center gap-2"
          >
            <XCircle size={14} />
            Clear Completed ({completedCount})
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="NEW TASK ENTRY..."
          className="terminal-input flex-1"
          maxLength={50}
        />
        <button type="submit" className="terminal-button">
          <Plus className="w-4 h-4" />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-2">
        {todos.length === 0 ? (
          <div className="text-center p-4 border-2 border-dashed border-[var(--terminal-red)] rounded-lg">
            NO TASKS IN QUEUE
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-2 p-2 border-2 border-[var(--terminal-red)] rounded-lg bg-black/30"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-6 h-6 border-2 border-[var(--terminal-red)] rounded flex items-center justify-center
                  ${todo.completed ? 'bg-[var(--terminal-red)]' : ''}`}
              >
                {todo.completed && <Check className="w-4 h-4 text-black" />}
              </button>
              <span className={`flex-1 ${todo.completed ? 'line-through opacity-50' : ''}`}>
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-[var(--terminal-red)] hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-sm text-[var(--terminal-red)]/70 border-t-2 border-[var(--terminal-red)]/20 pt-2">
        {todos.length} TASK{todos.length !== 1 ? 'S' : ''} IN QUEUE • {completedCount} COMPLETED
      </div>
    </div>
  );
}