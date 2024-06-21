import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log('Error fetching todos:', err));
    }, []);

    const handleSelect = (id) => {
        axios.put(`http://localhost:3000/update/${id}`)
            .then(result => {
                console.log(result);
                setTodos(todos.map(todo => todo._id === id ? { ...todo, done: true } : todo));
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/delete/${id}`)
            .then(result => {
                console.log(result);
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h2>Todo List</h2>
            <Create />
            {todos.length === 0 ? (
                <div>
                    <h2>No Record</h2>
                </div>
            ) : (
                todos.map((todo, index) => (
                    <div key={index} className='task'>
                        <div className='checkbox' onClick={() => handleSelect(todo._id)}>
                            {todo.done ? (
                                <BsFillCheckCircleFill className="icon" />
                            ) : (
                                <BsCircleFill className="icon" style={{ color: todo.done ? 'green' : 'gray' }} />
                            )}
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} /></span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;









