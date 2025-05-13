import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasks, addTask } from "../api";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

function TasksPage() {
    const {currentUser} = useAuth()
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

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
    return (
        <div>
            <h1>Tasks Page</h1>
            <TaskForm onTaskAdded={handleNewTaskAdded} />
            {isLoading && <p>Loading tasks...</p>}
            {!isLoading && (<TaskList tasks={tasks} />)}
        </div>
    );
}
export default TasksPage;