
class List {

    #username
    #exchangeDate
    #items

    constructor(exchangeDate){
        this.username = ''
        this.exchangeDate = exchangeDate
        this.items = []
    }

     addItem = (Item) => {
        this.items.push(Item)
    }

     removeItem = (Item) => {
        for(let i in this.items){
            if(Item === this.items[i]){
                this.items.splice(i, 1)
            }
        }
    }

     share = (User) => {
        if(!User.shared_lists.includes(this) && User.username != this.username){
            User.shared_lists = User.shared_lists + this.listToString()
        }
    }

    listToString = () => {
        return JSON.stringify(this)
    }
}

class Item {

    #name
    #url
    #comment
    #isBought

    constructor(name, url){
        this.name = name
        this.url = url
        this.comment = ''
        this.isBought = false
    }

    markBought = () => {
        this.isBought = !this.isBought
    }

    addComment = (str) => {
        this.comment = str
    }
}

/*const listA = new List('')
const itemA = new Item('Item A', 'urlA')
listA.addItem(itemA)
const itemB = new Item('Item B', 'urlB')
listA.addItem(itemB)
console.log(listA.items)
listA.removeItem(itemA)
console.log(listA.listToString())

const User = {
    username: 'test',
    shared_lists: []
}

listA.share(User)
console.log(User.shared_lists)*/