

const welcome = document.querySelector("#welcome");
const myLists = document.querySelector("#my-lists");
const otherLists = document.querySelector("#other-lists");
const newListButton = document.querySelector("#new-list-button");

const welcomeUser = (userName) => {
    welcome.textContent = `Welcome back, ${userName}`;
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

const deleteOwnedList = () => {
    //code to delete an owned list, and remove it from owner's owned lists and other's shared lists as needed, and then re-display lists
}

const removeSharedList = () => {
    //code to remove a shared list id from shared lists and then re-display lists
}


const displayOwnedList = (listId, listName, expDate, expDateFormat, numItems) => {
    const list = document.createElement("div");
    const listP = document.createElement("p");
    const myListsButtonDiv = document.createElement("div");
    const viewEditButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    //if list is expired, make expired class, otherwise use list class
    if(expDateFormat.isBefore(dayjs().startOf('day'))){
        console.log('expired');
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

    //For event listeners, if expired, send to expired function, otherwise send to edit list function
    if(expDateFormat.isBefore(dayjs().startOf('day'))){
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

const displaySharedList = (listId, listUserName, listName, expDate, expDateFormat, numItems) => {
    //Code to not display expired shared lists
    if(expDateFormat.isBefore(dayjs().startOf('day'))){
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

        viewButton.addEventListener("click", function(){
            sendToViewSharedList(listId);
        })
    }
}

//Returns username based on user id accessed from session storage. Runs welcome function based on username.
const getUsername = async() => {
    let users = await getUsers()
    for(i in users){
        if(users[i].id == currentUser){
            const userName =  users[i].username
            welcomeUser(userName);
        }
    }
}

//gets the username of the list owner of a shared list for display
//------------------------------------------------------------NEED TO CHECK THIS CODE WHEN SHARED LISTS ARE POSSIBLE-------------------------//
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
    console.log(listOwnerUsername)
    return listOwnerUsername;
}


//takes owned list id, sends 3 required fields to display owned list function
const makeOwnedListFromItems = async(listId) => {
    let listName;
    let expDate;
    let expDateFormat;
    let numItems = 0;
    let object = await getItems();
    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            listName = object[i].list_name;
            expDate = dayjs(object[i].exchange_date).format("MMMM D, YYYY");
            expDateFormat = dayjs(object[i].exchange_date);
            numItems++;
        }
    }
    displayOwnedList(listId, listName, expDate, expDateFormat, numItems);
}

//takes shared list id, sends 3 required fields to display shared list function
const makeSharedListFromItems = async(listId) => {
    let ownerUsername = await getListOwnerUsernameById(listId);
    let listName;
    let expDate;
    let expDateFormat;
    let numItems = 0;
    let object = await getItems();
    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            listName = object[i].list_name;
            expDate = dayjs(object[i].exchange_date).format("MMMM D, YYYY");
            expDateFormat = dayjs(object[i].exchange_date);
            numItems++;
        }
    }
    displaySharedList(listId, ownerUsername, listName, expDate, expDateFormat, numItems);
}

//Gets owned and shared lists for user by id. Returns array where index 0 is owned lists and index 1 is shared lists (false if no lists)
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
        let userListsArray = listsArray[1].split(',');
        for(let i = 0; i < userListsArray.length; i++){
            makeSharedListFromItems(userListsArray[i]);
        }
    }
}

getUsername();
getUserListsInfoById(currentUser);


