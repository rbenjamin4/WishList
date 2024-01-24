

const welcome = document.querySelector("#welcome");
const myLists = document.querySelector("#my-lists");
const otherLists = document.querySelector("#other-lists");
const newListButton = document.querySelector("#new-list-button");

const sendToNewList = () => {
    window.location.href = "newList.html";
}

newListButton.addEventListener("click", sendToNewList);

const welcomeUser = (userName) => {
    welcome.textContent = `Welcome back, ${userName}`;
}

const displayOwnedList = (listName, expDate, numItems) => {
    const list = document.createElement("div");
    const listP = document.createElement("p");
    const myListsButtonDiv = document.createElement("div");
    const viewEditButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    list.setAttribute("class", "list");
    viewEditButton.setAttribute("class", "view-button");
    deleteButton.setAttribute("class", "delete-button");
    listP.textContent = `My ${listName} list (exp. ${expDate}): ${numItems} items`;
    viewEditButton.textContent = "View/Edit";
    deleteButton.textContent = "Delete";
    myLists.appendChild(list);
    list.appendChild(listP);
    list.appendChild(myListsButtonDiv);
    myListsButtonDiv.appendChild(viewEditButton);
    myListsButtonDiv.appendChild(deleteButton);
}

const displaySharedList = (listUserName, listName, expDate, numItems) => {
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
            if(object[i].owned_lists.includes(listId)){
                listOwnerUsername = object[i].username;
            }
        }
    }
    console.log(listOwnerUsername)
    return listOwnerUsername;
}



const makeOwnedListFromItems = async(listId) => {
    let listName;
    let expDate;
    let numItems = 0;
    let object = await getItems();
    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            listName = object[i].list_name;
            expDate = dayjs(object[i].exchange_date).format("MMMM D, YYYY");
            numItems++;
        }
    }
    displayOwnedList(listName, expDate, numItems);
}


const makeSharedListFromItems = async(listId) => {
    let ownerUsername = await getListOwnerUsernameById(listId);
    let listName;
    let expDate;
    let numItems = 0;
    let object = await getItems();
    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            listName = object[i].list_name;
            expDate = dayjs(object[i].exchange_date).format("MMMM D, YYYY");
            numItems++;
        }
    }
    displaySharedList(ownerUsername, listName, expDate, numItems);
}


const getUserListsInfoById = async (userId) => {
    const object = await getUsers();
    let listsArray = [];
    let ownedLists;
    let sharedLists;
    for(let i = 0; i < object.length; i++){
        if(object[i].id == userId){
            if(object[i].owned_lists){
                ownedLists = object[i].owned_lists;
            } else {
                ownedLists = false;
            }
            if(object[i].shared_lists){
                sharedLists = object[i].shared_lists;
            } else {
                sharedLists = false;
            }
            listsArray.push(ownedLists);
            listsArray.push(sharedLists);
        }
    }
    if(listsArray[0]){
        let userListsArray = listsArray[0].split(',');
        for(let i = 0; i < userListsArray.length; i++){
            makeOwnedListFromItems(userListsArray[i]);
        }
    }
    if(listsArray[1]){
        let userListsArray = listsArray[0].split(',');
        for(let i = 0; i < userListsArray.length; i++){
            makeSharedListFromItems(userListsArray[i]);
        }
    }
}

getUsername();
getUserListsInfoById(currentUser);


