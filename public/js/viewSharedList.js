if(!sessionStorage.getItem('listId')){
    window.location.href = 'homePage.html'
}else{
    listId = sessionStorage.getItem('listId')
}

const list = document.querySelector("#list");
const welcome = document.querySelector("#welcome");
const listTitle = document.querySelector("#list-title");

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

const listOwnerUsername = getListOwnerUsernameById(listId);

const welcomeUser = (userName, listOwnerUsername) => {
    welcome.textContent = `Hello ${userName}! ${listOwnerUsername} shared their list with you:`;
}

const getUsername = async() => {
    let users = await getUsers()
    for(i in users){
        if(users[i].id == currentUser){
            const userName =  users[i].username
            const listOwnerUsername = await getListOwnerUsernameById(listId);
            welcomeUser(userName, listOwnerUsername);
        }
    }
}
getUsername();

const displayList = async(listId) => {
    const object = await getItems();
    let listOwner = await getListOwnerUsernameById(listId);
    let listName;
    let exchangeDate;
    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            listName = object[i].list_name;
            exchangeDate = dayjs(object[i].exchange_date).add(1, 'day').format("MMMM D, YYYY");
        }
    }
    listTitle.textContent = `${listOwner}'s ${listName} list (expires ${exchangeDate})`;

    while(list.childNodes.length > 2){
        list.removeChild(list.lastChild);
    }

    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            let itemId = object[i].id;
            let itemName = object[i].name;
            let itemUrl = object[i].url;
            const itemComment = object[i].comment

            let itemDiv = document.createElement("div");
            itemDiv.setAttribute("class", "item-div");
            let itemNameP = document.createElement("p");
            itemNameP.textContent = itemName;
            let itemUrlP = document.createElement("p");
            itemUrlP.textContent = itemUrl;
            let boughtByContentsDiv = document.createElement("div");
            let boughtButton = document.createElement("button");
            const itemCommentP = document.createElement('p')
            itemCommentP.textContent = itemComment
            itemCommentP.style.width = '25%'
            if(object[i].bought_by == currentUser){
                boughtButton.textContent = "Mark not bought";
            } else if(object[i].bought_by){
                boughtButton.textContent = "Already bought";
            } else {
                boughtButton.textContent = "Mark as bought";
            }
            boughtByContentsDiv.appendChild(boughtButton);
            itemDiv.appendChild(itemNameP);
            itemDiv.appendChild(itemUrlP);
            itemDiv.appendChild(itemCommentP)
            itemDiv.appendChild(boughtByContentsDiv);
            list.appendChild(itemDiv);
            boughtButton.addEventListener("click", async function(){
                if(boughtButton.textContent === "Already bought"){
                    return;
                } else if(boughtButton.textContent === "Mark not bought"){
                    boughtButton.textContent = "Mark as bought";
                    await updateItem(object[i].id, {bought_by: null})
                } else {
                    boughtButton.textContent = "Mark not bought";
                    await updateItem(object[i].id, {bought_by: currentUser});
                }
            })
        }
    }
}



displayList(listId);

