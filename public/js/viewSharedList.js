//Gets information from session storage:
    //username
    //current list_id of list to be viewed
    //(Will enter your username into the DB is_bought field if you click "buy");
    //If you unclick "buy" it will remove your username from the is_bought field

//Displays all the items in the list
//Should display a preview of what the item looks like

const exampleId = 1;
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
    welcome.textContent = `Hello ${userName}! ${listOwnerUsername} shared this list with you:`;
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
getUsername();


//checks bought_by: 
    //If null, gives "mark as bought" button with event listener that adds user id to bought_by
    //If matches user id, gives "mark not bought"
    //Otherwise (number that doesn't match), gives "bought" status

const handleBoughtByStatus = async(itemIndex) => {
    const object = await getItems();
    let boughtByContents;
        if(object[itemIndex].bought_by == exampleId){
            console.log("bought by this user");
            let notBoughtButton = document.createElement("button");
            notBoughtButton.textContent = "Mark not bought";
            //notBoughtButton.addEventListener("click", markNotBought); //Need to make a function to set DB bought_by to 0
            boughtByContents = notBoughtButton;
        } else if(object[itemIndex].bought_by === null){
            console.log("can be bought");
            let markBoughtButton = document.createElement("button");
            markBoughtButton.textContent = "Mark as bought";
            //markBoughtButton.addEventListener("click", markAsBought); //Need a function to set DB bought_by to user Id
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

    //populate item information: name, url, bought_by
    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            let itemIndex = i;
            let itemName = object[i].name;
            let itemUrl = object[i].url;

            let itemDiv = document.createElement("div");
            itemDiv.setAttribute("class", "item-div");
            let itemNameP = document.createElement("p");
            itemNameP.textContent = itemName;
            let itemUrlP = document.createElement("p");
            itemUrlP.textContent = itemUrl;
            let boughtByContentsDiv = document.createElement("div");
            boughtByContentsDiv.innerHTML = await handleBoughtByStatus(itemIndex);
            itemDiv.appendChild(itemNameP);
            itemDiv.appendChild(itemUrlP);
            itemDiv.appendChild(boughtByContentsDiv);
            list.appendChild(itemDiv);
        }
    }
}



displayList(exampleListId);

