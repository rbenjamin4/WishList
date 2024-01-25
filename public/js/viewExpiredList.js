if(!sessionStorage.getItem('listId')){
    window.location.href = 'homePage.html'
}else{
    listId = sessionStorage.getItem('listId')
}

const list = document.querySelector("#list");
const welcome = document.querySelector("#welcome");
const listTitle = document.querySelector("#list-title");

const welcomeUser = (userName) => {
    welcome.textContent = `Hello ${userName}. This is your expired list:`;
}

const getUsername = async(id) => {
    let users = await getUsers()
    let userName;
    for(i in users){
        if(users[i].id == currentUser){
            userName =  users[i].username
            welcomeUser(userName);
        }
    }
    return userName;
}
getUsername(currentUser);

const findBoughtStatus = async(itemId) => {
    let boughtByStatus;
    let item;
    let purchaserId;
    let purchaser;
    const object = await getItems();
    for(let i = 0; i < object.length; i++){
        if(object[i].id == itemId){
            item = object[i];
        }
    }
    if(item.bought_by === null){
        boughtByStatus = "Not purchased"
    } else {
        purchaserId = item.bought_by;
        purchaser = await getUsername(purchaserId);
        boughtByStatus = `Bought by ${purchaser}`;
    }
    return boughtByStatus;
}

const displayList = async(listId) => {
    const object = await getItems();
    let userName = await getUsername();
    let listName;
    let exchangeDate;
    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            listName = object[i].list_name;
            exchangeDate = dayjs(object[i].exchange_date).format("MMMM D, YYYY");
        }
    }
    listTitle.textContent = `${userName}'s ${listName} list (expired ${exchangeDate})`;

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
            let boughtStatus = await findBoughtStatus(itemId);
            let boughtStatusDiv = document.createElement("p");
            boughtStatusDiv.textContent = boughtStatus;
            boughtByContentsDiv.appendChild(boughtStatusDiv);
            itemDiv.appendChild(itemNameP);
            itemDiv.appendChild(itemUrlP);
            itemDiv.appendChild(boughtByContentsDiv);
            list.appendChild(itemDiv);
        }
    }
}

displayList(listId);

