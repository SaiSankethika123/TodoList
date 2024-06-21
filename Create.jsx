import React, { useState } from 'react';
import axios from 'axios';

function Create() {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/add', { task })
            .then(response => {
                console.log('Todo added:', response.data);
                setTask('');
                window.location.reload();  // Reload the page to fetch new todos
            })
            .catch(err => console.log('Error adding todo:', err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                placeholder="Add a new task" 
                required 
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default Create;
