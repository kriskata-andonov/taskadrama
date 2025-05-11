import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks }) {
    if (!tasks || tasks.length === 0) {
        return <p>No tasks available. Please add some tasks.</p>;
    }

    return (
        <ul className="task-list">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    );
}

export default TaskList