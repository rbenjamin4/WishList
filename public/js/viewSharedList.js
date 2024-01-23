//Gets information from session storage:
    //username
    //current list_id of list to be viewed
    //(Will enter your username into the DB is_bought field if you click "buy");
    //If you unclick "buy" it will remove your username from the is_bought field

//Displays all the items in the list

//Should display a preview of what the item looks like

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

displayList(2);

