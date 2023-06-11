const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const publicList = document.getElementById("list-el")

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js"
import { getDatabase, onValue, ref, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"

const appsettings = {
    databaseURL: "https://championsapp-90af9-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appsettings)
const database = getDatabase(app)
const listInDB = ref(database, "listOfStatements")

inputBtn.addEventListener("click", function() {
    let inputValue = inputEl.value
    push(listInDB, inputValue)
    resetInputEl()
    console.log("ich funktioniere")
})

onValue(listInDB, function(snapshot) {
    clearList()
    if (snapshot.exists()) {
        let itemsFromDbAsArray = Object.entries(snapshot.val())
        for (let i = 0; i < itemsFromDbAsArray.length; i++) {
            let itemsToWorkWith = itemsFromDbAsArray[i]
            //let itemID = itemsToWorkWith[0]
            // let itemValue = itemsToWorkWith[1]

            addOrDeleteItemFromListInEl(itemsToWorkWith)
        }
    } else {
        publicList.innerHTML = `<li>Ich will euch jubeln sehen</li>`
    }
    resetInputEl()
})

function resetInputEl() {
    inputEl.innerHTML = ""
}

function clearList() {
    itemsFromDbAsArray = ""
}

function addOrDeleteItemFromListInEl(itemHandler){
    let itemID = itemHandler[0]
    let itemValue = itemHandler[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    publicList.append(newEl)
    
     // publicList.innerHTML += `<li> ${itemHandler} </li>`
}
