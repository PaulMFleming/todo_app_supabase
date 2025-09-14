import { useState } from "react";
import { supabase } from "../supabase";

function AddToDo({ onTodoAdded }) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    
    const addTodo = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("todos")
                .insert([{ text: text.trim() }])
                .select()
                
            if (error) throw error;

            setText("")
            onTodoAdded() // Refresh the todo list
            console.log("Todo added:", data)
    } catch (error) {
        console.error("Error adding todo:", error)
        alert("Failed to add todo. Please try again.")
    } finally {
        setLoading(false)
    }
}

return (
    <form onSubmit={addTodo}>
        <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="What needs doing?" 
            disabled={loading}
        />
        <button type="submit" disabled={loading || !text.trim()}>
            {loading ? "Adding..." : "Add Todo"}
        </button>
    </form>
)
}

export default AddToDo;