//Needs to retrieve information about the user's username
//Needs to retrieve database information about owned lists and shared lists
    //Including: each shared list's username, and the listName, expirationDate, and number of Items for each list 

//Uses functions to display this information as "lists of lists" for "my lists", and "lists I'm watching"

//Create new list button will link to newList.html

const welcome = document.querySelector("#welcome");
const myLists = document.querySelector("#my-lists");
const otherLists = document.querySelector("#other-lists");
const newListButton = document.querySelector("#new-list-button");

const welcomeUser = (userName) => {
    welcome.textContent = `Welcome back, ${userName}`;
}


const displayOwnedList = (listName, expDate, numItems) => {
    const list = document.createElement("div");
    const listP = document.createElement("p");
    const myListsButtonDiv = document.createElement("div");
    const viewButton = document.createElement("button");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    list.setAttribute("class", "list");
    viewButton.setAttribute("class", "view-button");
    editButton.setAttribute("class", "edit-button");
    deleteButton.setAttribute("class", "delete-button");
    listP.textContent = `My ${listName} list (exp. ${expDate}): ${numItems} items`;
    viewButton.textContent = "View";
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";
    myLists.appendChild(list);
    list.appendChild(listP);
    list.appendChild(myListsButtonDiv);
    myListsButtonDiv.appendChild(viewButton);
    myListsButtonDiv.appendChild(editButton);
    myListsButtonDiv.appendChild(deleteButton);
}

const displaySharedList = (userName, listName, expDate, numItems) => {
    const list = document.createElement("div");
    const listP = document.createElement("p");
    const otherListsButtonDiv = document.createElement("div");
    const viewButton = document.createElement("button");
    const removeButton = document.createElement("button");
    list.setAttribute("class", "list");
    viewButton.setAttribute("class", "view-button");
    removeButton.setAttribute("class", "remove-button");
    listP.textContent = `${userName}'s ${listName} list (exp. ${expDate}): ${numItems} items`;
    viewButton.textContent = "View";
    removeButton.textContent = "Remove";
    otherLists.appendChild(list);
    list.appendChild(listP);
    list.appendChild(otherListsButtonDiv);
    otherListsButtonDiv.appendChild(viewButton);
    otherListsButtonDiv.appendChild(removeButton);
}

//Example code for posting lists in my/other list lists
let userName = "Frederico35";
welcomeUser(userName);
// displayOwnedList("Just buy me things", "1/17/2024", "100");
// displaySharedList("Tim35", "birthday", "5/31/2024", "8");

//gets the username of the list owner of a shared list for display
///////////////////////////////////////////////////////////Needs code to deal with multiple owned lists//////////////////////////////////
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


//creates array of required owned list information for display, from DB item entries
const makeOwnedListFromItems = async(listId) => {
    let ownedListArray = [];
    let listName;
    let expDate;
    let numItems = 0;
    let object = await getItems();
    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            listName = object[i].list_name;
            expDate = object[i].exchange_date;
            numItems++;
        }
    }
    ownedListArray.push(listName);
    ownedListArray.push(expDate);
    ownedListArray.push(numItems);
    console.log(ownedListArray);
    displayOwnedList(ownedListArray[0], ownedListArray[1], ownedListArray[2]);
}
makeOwnedListFromItems(2);

//creates array of required shared list information for display, from DB item entries
const makeSharedListArrayFromItems = async(listId) => {
    let sharedListArray = [];
    let ownerUsername = getListOwnerUsernameById(listId);
    let listName;
    let expDate;
    let numItems = 0;
    let object = await getItems();
    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            listName = object[i].list_name;
            expDate = object[i].exchange_date;
            numItems++;
        }
    }
    sharedListArray.push(ownerUsername);
    sharedListArray.push(listName);
    sharedListArray.push(expDate);
    sharedListArray.push(numItems);
    displaySharedList(sharedListArray[0], sharedListArray[1], sharedListArray[2], sharedListArray[3]);
}



//Gets owned and shared lists for user by id. Returns array where index 0 is owned lists and index 1 is shared lists (false if no lists)
let userId = 1;
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
    console.log(listsArray);
    return listsArray;
}

let userOwnedSharedLists = getUserListsInfoById(userId);
