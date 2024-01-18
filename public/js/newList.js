const list = document.querySelector('#list')
const itemName = document.querySelector('#itemName')
const itemUrl = document.querySelector('#itemUrl')
const add = document.querySelector('#add')
const exchangeDate = document.querySelector('#exchangeDate')
const finish = document.querySelector('#finish')
const items = []
const thisUser = 1 //change to user id if auth is added

// const georgeUser = {
//     name: 'George',
//     username: 'George',
//     password: 'yr7hug'
// }
// console.log(georgeUser)
// postUsers(georgeUser)

const addItem = () => {
    if(itemName.value && itemUrl.value){
        const newItem = new Item(itemName.value, itemUrl.value)
        items.push(newItem)
        const div = document.createElement('div')
        const a = document.createElement('a')
        a.textContent = newItem.name
        a.href = newItem.url
        const button = document.createElement('button')
        button.textContent = 'Delete'
        div.appendChild(a)
        div.appendChild(button)
        div.style.display = 'flex'
        list.appendChild(div)

        const deleteItem = () => {
            list.removeChild(div)
            for(i in items){
                if(items[i] === newItem){
                    items.splice(i, 1)
                }
            }
        }

        button.addEventListener('click', deleteItem)
        itemName.value = ''
        itemUrl.value = ''

    }
}

add.addEventListener('click', addItem)

const finishList = async() => {
    if(items){
        const newList = new List(exchangeDate.value)
        for(i in items){
            newList.addItem(items[i])
        }
        users = await getUsers()
        currentUser = users[thisUser-1]
        console.log(currentUser)
        updateUser(thisUser, {owned_lists: currentUser.owned_lists + newList.listToString()})
        window.location.href = 'template.html' //change to homescreen
    }
}

finish.addEventListener('click', finishList)