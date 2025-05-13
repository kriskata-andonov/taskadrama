import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggleComplete, onDeleteTask}) {
    if (!tasks || tasks.length === 0) {
        return <p>No tasks available. Please add some tasks.</p>;
    }

    return (
        <ul className="task-list">
            {tasks.map(task => (
                <TaskItem 
                    key={task.id}
                    task={task} 
                    onToggleComplete={onToggleComplete}
                    onDeleteTask={onDeleteTask}
                />
            ))}
        </ul>
    );
}

export default TaskList