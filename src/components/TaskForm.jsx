import { use, useState } from "react";

function TaskForm ({ onTaskAdded }) {
    const [taskDescription, setTaskDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleInputChange = (event) => {
        setTaskDescription(event.target.value)
    }

    const handleSubmit = async (event) => {
    event.preventDefault()

    // // if (!taskDescription.trim()) {
    // //     setError("forgot duh descrptn u dum dum")
    // //     return
    // // }

    // setError(null)
    // setIsLoading(true)

        try {
            if (onTaskAdded) {
                onTaskAdded(taskDescription)
            }

            setTaskDescription('')
        } catch (error) {
            console.error('Task add fail..')
            setError('nesh sa ulq')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h3></h3>
            <div>
                <input
                    type="text"
                    id="task-description"
                    value={taskDescription}
                    onChange={handleInputChange}
                    placeholder="Enter Task"
                    required
                />
            </div>
            
            {/* <button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Task'}
            </button> */}
        </form>
    )
}
export default TaskForm