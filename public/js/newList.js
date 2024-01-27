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
        await postList({
            list_owner: currentUser,
            name : listName.value,
            exchange_date: exchangeDate.value
        })
        const users = await getUsers()
        let thisUser
        for(i in users){
            if(users[i].id = currentUser){
                thisUser = users[i]
            }
        }
        let listId
        const lists = await getLists()
        for(i in lists){
            if(lists[i].list_owner == currentUser && !thisUser.owned_lists){
                listId = lists[i].id
                await updateUser(currentUser, {owned_lists: listId})
            }else if(lists[i].list_owner == thisUser.id && !thisUser.owned_lists.split(',').includes(lists[i].id)){
                listId = lists[i].id
                await updateUser(currentUser, {owned_lists: thisUser.owned_lists + ',' + listId})
            }
        }
        for(i in items){
            await postItem({
                list_id: listId, 
                list_name: listName.value, 
                name: items[i].name, 
                url: items[i].url, 
                exchange_date: exchangeDate.value
            })
        }
        alert(listName.value + ' created')
        window.location.href = 'homePage.html'
    }
}

finish.addEventListener('click', finishList)