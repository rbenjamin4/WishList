
/**
 * Uncomment the below code to POST data to the database
 */


const postUsers = async(userObj) => {
    //console.log('posting ' + userObj.name)
    const response = await fetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    //console.log('posted ' + userObj.name)

    //const data = await response.json()

    //console.log(data)
}

// const newUser = {
//     //name: 'George',
//     username: 'George',
//     password: 'reallyInsecurePassword'
// }

// postUsers(newUser)

const postItem = async(itemObj) => {
    console.log(itemObj)
    const response = await fetch(`/api/items`, {
        method: 'POST',
        body: JSON.stringify(itemObj),
        headers: {
            'Content-Type' : 'application/json',
        }
    })
}

// const newItem = {
//     list_id: 1,
//     list_name: 'socklist',
//     name: 'socks',
//     url: 'https://amazon.com',
//     exchange_date: '2024-01-19'
// }

//postItem(newItem)

//console.log('about to post ' + newUser.name)

// postUsers(newUser)

// const newTrip = {
//     name: 'pretty cool mountain adventure',
//     description: 'more than okay!!!'
// }

// postTrips(newTrip)

/**
 * Uncomment the below code to GET data from the database
 */


const getUsers = async() => {
    const response = await fetch(`/api/users`)
    const data = await response.json()
    //console.log(data)
    return (data)
}

const getItems = async() => {
    const response = await fetch(`/api/items`)
    const data = await response.json()
    return data
}

// getTrips()
//getUsers()


/**
 * Uncomment the below code to DELETE data from the database
 */


const deleteUsers = async(id) => {
   const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    //const data = await response.json()
    //console.log(data)
}

const deleteItems = async(id) => {
    const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}

// deleteTrip(1)


/**
 * Uncomment the below code to Update data in the database
 */

// const newTrip = {
//     name: 'pretty cool mountain adventure',
//     description: 'WAY WAY more than okay!!!'
// }


const updateUser = async(id, newUserObj) => {
   const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newUserObj),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    //const data = await response.json()
    //console.log(data)
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
// updateTrip(1, newTrip)