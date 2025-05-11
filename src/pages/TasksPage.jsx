import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasks } from "../api";
import TaskList from "../components/TaskList";

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
    }, [currentUser]
)
    return (
        <div>
            <h1>Tasks Page</h1>
            {isLoading && <p>Loading tasks...</p>}
            {!isLoading && (<TaskList tasks={tasks} />)}
        </div>
    );
}
export default TasksPage;