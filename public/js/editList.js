let listId

if(!sessionStorage.getItem('listId')){
    window.location.href = 'homePage.html'
}else{
    listId = sessionStorage.getItem('listId')
}

const list = document.querySelector('#list')
const listName = document.querySelector('#listName')
const shareButton = document.querySelector('#share')
const otherUsername = document.querySelector('#otherUsername')
const itemName = document.querySelector('#itemName')
const itemUrl = document.querySelector('#itemUrl')
const add = document.querySelector('#add')

const initialize = async() => {
    const items = await getItems()
    for(i in items){
        if(items[i].list_id == listId){
            listName.textContent = items[i].list_name
            const div = document.createElement('div')
            const a = document.createElement('a')
            a.textContent = items[i].name
            a.href = items[i].url
            const id = items[i].id
            const button = document.createElement('button')
            button.textContent = 'Delete'
            div.appendChild(a)
            div.appendChild(button)
            div.style.display = 'flex'
            list.appendChild(div)

            const deleteItem = async() => {
                list.removeChild(div)
                await deleteItems(id)
            }

            button.addEventListener('click', deleteItem)
        }
    }
}

initialize()

const share = async() => {
    const users = await getUsers()
    let isShared = false
    for(i in users){
        if(users[i].username === otherUsername.value){
            if(users[i].shared_lists){
                const sharedLists = users[i].shared_lists.split(',')
                console.log(sharedLists)
                if(!sharedLists.includes(listId)){
                    await updateUser(users[i].id, {shared_lists: users[i].shared_lists + ',' + listId})
                }
            }else{
                await updateUser(users[i].id, {shared_lists: listId})
            }
            isShared = true
        }
    }
    if(isShared){
        alert(otherUsername.value + ' has recieved your list!')
        otherUsername.value = ''
    }else{
        alert('No user with that username exists!')
    }
}

shareButton.addEventListener('click', share)

const addItem = async() => {
    if(itemName.value && itemUrl.value){
        const items = await getItems()
        let exchangeDate
        for (i in items) {
            if (items[i].list_id == listId) {
                exchangeDate = items[i].exchange_date
            }
        }
        await postItem({
            list_id: listId, 
            list_name: listName.textContent, 
            name: itemName.value, 
            url: itemUrl.value, 
            exchange_date: exchangeDate
        })

        const div = document.createElement('div')
        const a = document.createElement('a')
        a.textContent = itemName.value
        a.href = itemUrl.value
        const button = document.createElement('button')
        button.textContent = 'Delete'
        div.appendChild(a)
        div.appendChild(button)
        div.style.display = 'flex'
        list.appendChild(div)
        const id = items[items.length-1].id + 1

        const deleteItem = async() => {
            list.removeChild(div)
            await deleteItems(id)
        }

        button.addEventListener('click', deleteItem)
        itemName.value = ''
        itemUrl.value = ''
    }
}

add.addEventListener('click', addItem)