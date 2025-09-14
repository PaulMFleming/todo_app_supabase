import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos from Supabase on component mount
  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase.from("todos").select("*").order('created_at', { ascending: false });
      
      if (error) throw error;
      setTodos(data) || [];
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p>Loading todos...</p>

    return (
        <div>
            <h2>My Todos</h2>
            {todos.length === 0 ? (
                <p>No todos found</p>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            <span style={{
                                textDecoration: todo.is_complete ? 'line-through' : 'none'
                            }}>
                                {todo.text}
                            </span>
                        <small> - {new Date(todo.created_at).toLocaleString()}</small>
                        </li>
                        ))}
                </ul>
            )}
        </div>
    );
}

export default TodoList;