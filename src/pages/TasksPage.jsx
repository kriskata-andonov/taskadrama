import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasks, addTask, updateTask, deleteTask} from '../api';
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

function TasksPage() {
    const {currentUser} = useAuth()
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isPerformingAction, setIsPerformingAction] = useState(false)

    useEffect(() => {
        const fetchUserTasks = async () => {
            if (!currentUser) {
                setIsLoading(false)
                setTasks([])
                return
            }
            setIsLoading(true)
            setError(null)

            try {
                const userTasks = await getTasks(currentUser.id)
                setTasks(userTasks)
            } catch (error) {
                console.error('failed to fetch tasks')
                setError('failed to load taskss')
            } finally { 
                setIsLoading(false)
            }
        }
        fetchUserTasks()
    }, [currentUser])

    const handleNewTaskAdded = async (description) => {
        if(!currentUser) {
            setError("Can't add task: User not authenticated.")
            return
        }
    

    try {
        const newTask = await addTask(currentUser.id, description)
        setTasks(prevTasks => [...prevTasks, newTask])
        setError(null)
    } catch (error) {
        console.error("Error adding task: ", error)
        setError("Failed to add task")
    }
}

    const handleToggleComplete = async (taskId, newCompletedStatus) => {
        if (!currentUser) {
            setError("Can't update task: User not authed")
            return
        }
        setError(null)

        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? {...task, completed: newCompletedStatus} : task
            )
        )

        try {
            const taskToUpdate = tasks.find(task => task.id === taskId);
            if (!taskToUpdate) throw new Error('Task not found');
            const updatedTask = await updateTask(taskId, {
                ...taskToUpdate,
                completed: newCompletedStatus
            });
        } catch (error) {
            console.error(`TasksPage: Error toggling task ${taskId}: `, error);
            setError('Failed to update task.');

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? {...task, completed: !newCompletedStatus} : task
                )
            )
        }
    }

    const handleDeleteTask = async (taskId )=> { 

       if (!currentUser) {
            setError("Can't update task: User not authed")
            return
        }
        setError(null)


        const prevTasks = tasks
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))

        try {
            await deleteTask(taskId)
        } catch (error) {
            setTasks(prevTasks)
        }
    }


    return (
        <div>
            <h1>Your tasks</h1>
            <hr/>
            <TaskForm onTaskAdded={handleNewTaskAdded} />
            {isLoading && <p>Loading tasks...</p>}
            {!isLoading && 
                (<TaskList 
                    tasks={tasks}
                    onToggleComplete={handleToggleComplete}
                    onDeleteTask={handleDeleteTask}
                />
            )}
        </div>
    );
}
export default TasksPage;