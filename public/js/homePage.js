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


const displayMyList = (listName, expDate, numItems) => {
    const list = document.createElement("div");
    const listP = document.createElement("p");
    const viewButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    list.setAttribute("class", "list");
    viewButton.setAttribute("class", "view-button");
    deleteButton.setAttribute("class", "delete-button");
    listP.textContent = `My ${listName} list (exp. ${expDate}): ${numItems} items`;
    viewButton.textContent = "View";
    deleteButton.textContent = "Delete";
    myLists.appendChild(list);
    list.appendChild(viewButton);
    list.appendChild(listP);
    list.appendChild(deleteButton);
}

const displayOtherList = (userName, listName, expDate, numItems) => {
    const list = document.createElement("div");
    const listP = document.createElement("p");
    const viewButton = document.createElement("button");
    const removeButton = document.createElement("button");
    list.setAttribute("class", "list");
    viewButton.setAttribute("class", "view-button");
    removeButton.setAttribute("class", "remove-button");
    listP.textContent = `${userName}'s ${listName} list (exp. ${expDate}): ${numItems} items`;
    viewButton.textContent = "View";
    removeButton.textContent = "Remove";
    otherLists.appendChild(list);
    list.appendChild(viewButton);
    list.appendChild(listP);
    list.appendChild(removeButton);
}

//Example code for posting lists in my/other list lists
let userName = "Frederico35";
welcomeUser(userName);
displayMyList("Christmas", "12/25/2024", "10");
displayMyList("Thanksgiving", "11/22/2024", "1");
displayMyList("Fourth of July", "7/4/2024", "3");
displayMyList("Just buy me things", "1/17/2024", "100");
displayOtherList("Tim35", "birthday", "5/31/2024", "8");
displayOtherList("PatrickLikesSnakes", "President's day", "2/19/2024", "45");
displayOtherList("YMCAGymMaster11", "Gym Party", "5/3/2024", "9");
