import React from "react";
import './TaskItem.css';

function TaskItem({ task }) {


    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span className="task-description">{task.description}</span>
        </li>
    )
}

export default TaskItem