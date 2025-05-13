const API_BASE_URL = 'http://localhost:3001'


console.log("API module loaded. JSON Server URL: ", API_BASE_URL)

async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json()
        throw new Error(`HTTP err status: ${response.status}`)
    }
    return response.json()
}

export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users?username=${username}`)
        console.log('Attempting GET login request to:', API_BASE_URL)

        const users = await handleResponse(response)
        console.log('Parsed login data:', users)

        if (users.length === 0)
        {
            throw new Error('usra se')
        }

        const user = users[0]
        if (user.password !== password) {
        throw new Error('izponasra se')
        }

        return user

    } catch (error) {
        console.error ('ne stana nesh err: ', error)
        throw error
    }
}

export const registerUser = async (username, password) => {
    try {
    const checkResponse = await fetch(`${API_BASE_URL}/users?username=${username}`)
    console.log('Received check response:', checkResponse)
    const existingUsers = await handleResponse(checkResponse)
    console.log('Parsed check data:', existingUsers)

        if (existingUsers.length > 0){
            throw new Error('username already go ima')
        }
        const newUser = {
            username,
            password
        }

        const registerResponse = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'appplication/json'
            },
            body: JSON.stringify(newUser),
        })
        console.log('Received register response:', registerResponse)
        const createdUser = await handleResponse(registerResponse)
        console.log('Parsed registered user data:', createdUser)

        return createdUser

    } catch (error){
    console.error('nesh sa oburka err:', error)
    throw error
    }
}

export const getTasks = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks?userId=${userId}`)
        console.log('Attempting GET tasks request to:', API_BASE_URL)

        const tasks = await handleResponse(response)
        console.log('Parsed tasks data:', tasks)

        return tasks

    } catch (error) {
        console.error('ne stana nesh err: ', error)
        throw error
    }
}

export const addTask = async (userId, description) => {
    try {
        const newTask = {
            userId: userId,
            description: description,
            completed: false
        }

        const response = await fetch (`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(newTask),
        })

        const createdTask = await handleResponse(response)
        return createdTask
    } catch (error) {
        console.error(`err adding task for ${userId}: `,error)
        throw error
    }
}
