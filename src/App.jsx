import { useEffect, useState } from 'react'
import { supabase } from './supabase'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function fetchTodos() {
      const { data, error } = await supabase.from('todos').select('*')
      if (error) {
        console.error('Error fetching todos:', error)
      } else {
        setTodos(data)
      }
    }
    fetchTodos()
  }, [])

  return (
    <div>
      <h1>Todo App</h1>
      <p>Found {todos.length} todos</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App