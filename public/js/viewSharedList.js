//Gets information from session storage:
    //username
    //current list_id of list to be viewed
    //(Will enter your username into the DB is_bought field if you click "buy");
    //If you unclick "buy" it will remove your username from the is_bought field

//Displays all the items in the list
//Should display a preview of what the item looks like

const exampleListId = 1;

const list = document.querySelector("#list");
const welcome = document.querySelector("#welcome");
const listTitle = document.querySelector("#list-title");

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
    return listOwnerUsername;
}

const listOwnerUsername = getListOwnerUsernameById(exampleListId);

const welcomeUser = (userName, listOwnerUsername) => {
    welcome.textContent = `Hello ${userName}! ${listOwnerUsername} shared their list with you:`;
}

const getUsername = async() => {
    let users = await getUsers()
    for(i in users){
        if(users[i].id == currentUser){
            const userName =  users[i].username
            const listOwnerUsername = await getListOwnerUsernameById(exampleListId);
            welcomeUser(userName, listOwnerUsername);
        }
    }
}
getUsername();

const markNotBought = async(itemIndex) => {
    updateItem(itemIndex, {bought_by: null});
    displayList(exampleListId);
}

const markAsBought = async(itemIndex) => {
    updateItem(itemIndex, {bought_by: currentUser});
    displayList(exampleListId);
}

const handleBoughtByStatus = async(itemIndex) => {
    let item;
    const object = await getItems();
    for(let i = 0; i < object.length; i++){
        if(object[i].id == itemIndex){
            item = object[i];
        }
    }
    let boughtByContents;
        if(item.bought_by == currentUser){
            console.log("bought by this user");
            let notBoughtButton = document.createElement("button");
            notBoughtButton.textContent = "Mark not bought";
            notBoughtButton.addEventListener("click", function(){
                markNotBought(itemIndex);
            });
            boughtByContents = notBoughtButton;
        } else if(item.bought_by === null){
            console.log("can be bought");
            let markBoughtButton = document.createElement("button");
            markBoughtButton.textContent = "Mark as bought";
            markBoughtButton.addEventListener("click", function(){
                markAsBought(itemIndex);
            });
            boughtByContents = markBoughtButton;
        } else {
            console.log("bought by another user");
            let alreadyBought = document.createElement("p");
            alreadyBought.textContent = "Item has been purchased";
            boughtByContents = alreadyBought;
        }
    return boughtByContents;
}

const displayList = async(listId) => {
    const object = await getItems();
    let listOwner = await getListOwnerUsernameById(listId);
    let listName;
    let exchangeDate;
    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            listName = object[i].list_name;
            exchangeDate = dayjs(object[i].exchange_date).format("MMMM D, YYYY");
        }
    }
    listTitle.textContent = `${listOwner}'s ${listName} list (expires ${exchangeDate})`;

    while(list.childNodes.length > 2){
        list.removeChild(list.lastChild);
    }

    //populate item information: name, url, bought_by
    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            let itemId = object[i].id;
            let itemName = object[i].name;
            let itemUrl = object[i].url;

            let itemDiv = document.createElement("div");
            itemDiv.setAttribute("class", "item-div");
            let itemNameP = document.createElement("p");
            itemNameP.textContent = itemName;
            let itemUrlP = document.createElement("p");
            itemUrlP.textContent = itemUrl;
            let boughtByContentsDiv = document.createElement("div");
            let boughtStatus = await handleBoughtByStatus(itemId);
            boughtByContentsDiv.appendChild(boughtStatus);
            itemDiv.appendChild(itemNameP);
            itemDiv.appendChild(itemUrlP);
            itemDiv.appendChild(boughtByContentsDiv);
            list.appendChild(itemDiv);
        }
    }
}



displayList(exampleListId);

