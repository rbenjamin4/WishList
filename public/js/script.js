const postUsers = async(userObj) => {
    const response = await fetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const postItem = async(itemObj) => {
    const response = await fetch(`/api/items`, {
        method: 'POST',
        body: JSON.stringify(itemObj),
        headers: {
            'Content-Type' : 'application/json',
        }
    })
}

const postList = async(listObj) => {
    const response = await fetch(`/api/lists`, {
        method: 'POST',
        body: JSON.stringify(listObj),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}

const getUsers = async() => {
    const response = await fetch(`/api/users`)
    const data = await response.json()
    return (data)
}

const getItems = async() => {
    const response = await fetch(`/api/items`)
    const data = await response.json()
    return data
}

const getLists = async() => {
    const response = await fetch(`/api/lists`)
    const data = await response.json()
    return data
}

const deleteUsers = async(id) => {
   const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const deleteItems = async(id) => {
    const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}

const deleteLists = async(id) => {
    const response = await fetch(`/api/lists/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}

const updateUser = async(id, newUserObj) => {
   const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newUserObj),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const updateItem = async(id, newItemObj) => {
    const response = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newItemObj),
        headers: {
            'Content-Type' : 'application/json',
        }
    })
}

const updateList = async(id, newListObj) => {
    const response = await fetch(`/api/lists/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newListObj),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}