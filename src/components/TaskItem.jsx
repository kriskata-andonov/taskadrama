import React from "react";
import './TaskItem.css';

function TaskItem({ task, onToggleComplete, onDeleteTask }) {

    const itemClassName = `task-item ${task.completed ? 'completed' : ''}`

    const handleToggle = () => {
        if (onToggleComplete) 
            onToggleComplete(task.id, !task.completed)
    }

    const handleDelete = () => {
        if (onDeleteTask) onDeleteTask(task.id)
    }

    return (
        <li className={itemClassName}>
            <input 
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="task-checkbox"
        />
            <span className="task-description">{task.description}</span>
            <button 
                onClick={handleDelete}
                className="delete-button"
            >
                Delete
            </button>
        </li>
    )
}

export default TaskItem