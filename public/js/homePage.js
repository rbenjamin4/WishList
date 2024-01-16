const welcome = document.querySelector("#welcome");
const myLists = document.querySelector("#my-lists");
const otherLists = document.querySelector("#other-lists");

const welcomeUser = (userName) => {
    welcome.textContent = `Welcome back, ${userName}`;
}


const displayMyList = (listName, expDate, numItems) => {
    const list = document.createElement("div");
    const listP = document.createElement("p");
    const listButton = document.createElement("button");
    list.setAttribute("class", "list");
    listP.textContent = `My ${listName} list (exp. ${expDate}): ${numItems} items`;
    listButton.textContent = "Delete";
    myLists.appendChild(list);
    list.appendChild(listP);
    list.appendChild(listButton);
}

const displayOtherList = (userName, listName, expDate, numItems) => {
    const list = document.createElement("div");
    const listP = document.createElement("p");
    const listButton = document.createElement("button");
    list.setAttribute("class", "list");
    listP.textContent = `${userName}'s ${listName} list (exp. ${expDate}): ${numItems} items`;
    listButton.textContent = "Remove";
    otherLists.appendChild(list);
    list.appendChild(listP);
    list.appendChild(listButton);
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
