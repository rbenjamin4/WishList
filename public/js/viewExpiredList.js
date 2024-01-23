//Receives username and list id from home page
//Gets information from list database:
    //list DB: list name, expiration date, name + url of item

//Displays the list

//Should display a preview of what the item looks like

//Edit button that links to edit button page, back to homepage button

const list = document.querySelector("#list");

const displayList = async(listId) => {
    const object = await getList();
    for(let i = 0; i < object.length; i++){
        if(object[i].list_id == listId){
            let listName; 
            let expDate;
            let itemName;
            let itemUrl;
        }
    }

    
    

}
