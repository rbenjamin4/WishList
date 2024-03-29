const welcome = document.querySelector("#welcome");
const myLists = document.querySelector("#my-lists");
const otherLists = document.querySelector("#other-lists");
const newListButton = document.querySelector("#new-list-button");

const welcomeUser = (userName) => {
    welcome.textContent = `Welcome back, ${userName}`;
}

const getUsername = async() => {
    let users = await getUsers()
    for(i in users){
        if(users[i].id == currentUser){
            const userName =  users[i].username
            welcomeUser(userName);
        }
    }
}

const getListOwnerUsernameById = async(listId) => {
    let listOwnerUsername;
    const object = await getUsers();
    for(let i = 0; i < object.length; i++){
        if(object[i].owned_lists){
            let ownedListsArray = object[i].owned_lists.split(',');
            if(ownedListsArray.includes(listId)){
                listOwnerUsername = object[i].username;
            }
        }
    }
    return listOwnerUsername;
}

const sendToNewList = () => {
    window.location.href = "newList.html";
}
newListButton.addEventListener("click", sendToNewList);

const sendToViewSharedList = (listId) => {
    sessionStorage.setItem('listId', listId);
    window.location.href = "viewSharedList.html";
}

const sendToViewExpiredList = (listId) => {
    sessionStorage.setItem('listId', listId);
    window.location.href = "viewExpiredList.html";
}

const sendToEditList = (listId) => {
    sessionStorage.setItem('listId', listId);
    window.location.href = "editList.html";
}

const deleteOwnedList = async(listId) => {
    const users = await getUsers();
    const items = await getItems();
    const lists = await getLists();
    for(i in users){
        if(users[i].id == currentUser){
            const ownedListArray = users[i].owned_lists.split(",");
            for(j in ownedListArray){
                if(ownedListArray[j] == listId){
                    ownedListArray.splice(j, 1);
                    await updateUser(currentUser, {owned_lists: ownedListArray.join(",")})
                }
            }
        }
    }
    for(i in users){
        if(users[i].shared_lists){
            const sharedListArray = users[i].shared_lists.split(",");
            for(j in sharedListArray){
                if(sharedListArray[j] == listId){
                    sharedListArray.splice(j, 1);
                    await updateUser(users[i].id, {shared_lists: sharedListArray.join(",")})
                }
            }
        }

    }
    for(i in items){
        if(items[i].list_id == listId){
            await deleteItems(items[i].id);
        } 
    }
    for(i in lists){
        if(lists[i].id == listId){
            await deleteLists(listId)
        }
    }
}

const removeSharedList = async(listId) => {
    const users = await getUsers();
    for(i in users){
        if(users[i].id == currentUser){
            const sharedListArray = users[i].shared_lists.split(",");
            for(j in sharedListArray){
                if(sharedListArray[j] == listId){
                    sharedListArray.splice(j, 1);
                    await updateUser(currentUser, {shared_lists: sharedListArray.join(",")})
                }
            }
        }
    }

}


const displayOwnedList = async(listId) => {
    let listName;
    let expDate;
    let expDateFormat;
    let numItems = 0;
    let object = await getItems();
    for(i in object){
        if(object[i].list_id == listId){
            numItems++
        }
    }
    const lists = await getLists()
    for(let i = 0; i < lists.length; i++){
        if(lists[i].id == listId){
            listName = lists[i].name;
            expDate = dayjs(lists[i].exchange_date).add(1, 'day').format("MMMM D, YYYY");
            expDateFormat = dayjs(lists[i].exchange_date).add(1, 'day');
        }
    }
    const list = document.createElement("div");
    const listP = document.createElement("p");
    const myListsButtonDiv = document.createElement("div");
    const viewEditButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    //if list is expired, make expired class, otherwise use list class
    if(expDateFormat.isBefore(dayjs().add(1, 'day').startOf('day'))){
        list.setAttribute("class", "expired-list");
    } else {
        list.setAttribute("class", "list"); 
    }
    viewEditButton.setAttribute("class", "view-button");
    deleteButton.setAttribute("class", "delete-button");
    listP.textContent = `My ${listName} list (exp. ${expDate}): ${numItems} items`;

    deleteButton.textContent = "Delete";
    myLists.appendChild(list);
    list.appendChild(listP);
    list.appendChild(myListsButtonDiv);
    myListsButtonDiv.appendChild(viewEditButton);
    myListsButtonDiv.appendChild(deleteButton);

    deleteButton.addEventListener("click", function(){
        deleteOwnedList(listId);
        myLists.removeChild(list);
    });

    if(expDateFormat.isBefore(dayjs().add(1, 'day').startOf('day'))){
        viewEditButton.textContent = "View";
        viewEditButton.addEventListener("click", function(){
            sendToViewExpiredList(listId);
        });
    } else {
        viewEditButton.textContent = "View/Edit";
        viewEditButton.addEventListener("click", function(){
            sendToEditList(listId);
        })
    }
}

const displaySharedList = async(listId) => {
    let listUserName = await getListOwnerUsernameById(listId);
    let listName;
    let expDate;
    let expDateFormat;
    let numItems = 0;
    let object = await getItems();
    for(i in object){
        if(object[i].list_id == listId){
            numItems++
        }
    }
    const lists = await getLists()
    for(let i = 0; i < lists.length; i++){
        if(lists[i].id == listId){
            listName = lists[i].name;
            expDate = dayjs(lists[i].exchange_date).add(1, 'day').format("MMMM D, YYYY");
            expDateFormat = dayjs(lists[i].exchange_date).add(1, 'day');
        }
    }
    //Code to not display expired shared lists
    if(expDateFormat.isBefore(dayjs().add(1, 'day').startOf('day'))){
        return;
    } else {
        const list = document.createElement("div");
        const listP = document.createElement("p");
        const otherListsButtonDiv = document.createElement("div");
        const viewButton = document.createElement("button");
        const removeButton = document.createElement("button");
        list.setAttribute("class", "list");
        viewButton.setAttribute("class", "view-button");
        removeButton.setAttribute("class", "remove-button");
        listP.textContent = `${listUserName}'s ${listName} list (exp. ${expDate}): ${numItems} items`;
        viewButton.textContent = "View";
        removeButton.textContent = "Remove";
        otherLists.appendChild(list);
        list.appendChild(listP);
        list.appendChild(otherListsButtonDiv);
        otherListsButtonDiv.appendChild(viewButton);
        otherListsButtonDiv.appendChild(removeButton);
        removeButton.addEventListener("click", function(){
            removeSharedList(listId);
            otherLists.removeChild(list);
        })
        viewButton.addEventListener("click", function(){
            sendToViewSharedList(listId);
        })
    }
}

const extractListsByUserId = async (userId) => {
    const object = await getUsers();
    for(let i = 0; i < object.length; i++){
        if(object[i].id == userId){
            if(object[i].owned_lists){
                let ownedListsArray = object[i].owned_lists.split(',');
                for(let j = 0; j < ownedListsArray.length; j++){
                    displayOwnedList(ownedListsArray[j]);
                }
            }
            if(object[i].shared_lists){
                let sharedListsArray = object[i].shared_lists.split(',');
                for(let j = 0; j < sharedListsArray.length; j++){
                    displaySharedList(sharedListsArray[j]);
                }
            }
        }
    }
}

getUsername();
extractListsByUserId(currentUser);