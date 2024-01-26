const list = document.querySelector('#list')
const itemName = document.querySelector('#itemName')
const itemUrl = document.querySelector('#itemUrl')
const add = document.querySelector('#add')
const exchangeDate = document.querySelector('#exchangeDate')
const listName = document.querySelector('#listName')
const finish = document.querySelector('#finish')
const items = []









const addItem = () => {
    if(itemName.value && itemUrl.value){
        const newItem = {name: itemName.value, url: itemUrl.value}
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
    if(items && exchangeDate && listName){
        const itemList = await getItems()
        let listId = 1
        for(i in itemList){
            if(itemList[i].list_id >= listId){
                listId = itemList[i].list_id + 1
            }
        }
        for(i in items){
            postItem({
                list_id: listId, 
                list_name: listName.value, 
                name: items[i].name, 
                url: items[i].url, 
                exchange_date: exchangeDate.value
            })
        }
        const users = await getUsers()
        let thisUser
        for(i in users){
            if(users[i].id = currentUser){
                thisUser = users[i]
            }
        }
        if(thisUser.owned_lists){
            updateUser(currentUser, {owned_lists: thisUser.owned_lists + ',' + listId})
        }else{
            updateUser(currentUser, {owned_lists: listId})
        }
        alert(listName.value + ' created')
        window.location.href = 'homePage.html'
    }
}

finish.addEventListener('click', finishList)