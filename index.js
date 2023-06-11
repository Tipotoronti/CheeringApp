const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const publicList = document.getElementById("list-el")

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js"
import { getDatabase, onValue, ref, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"

const appsettings = "https://championsapp-90af9-default-rtdb.europe-west1.firebasedatabase.app/"

const app = initializeApp(appsettings)
const database = getDatabase(app)
const listInDB = ref(database, "listOfStatements")

inputBtn.addEventListener("click" , function() {
    let inputValue = inputEl.value
    push(listInDB, inputValue)
    resetInputEl()
})

onValue(listInDB, function(snapshot) {
    let itemsFromDbAsArray = Object.entries(snapshot.val())
    for (let i = 0; i < itemsFromDbAsArray.length; i++) {
        itemsToWorkWith = itemsFromDbAsArray[i]
        let itemID = itemsToWorkWith[0]
        let itemValue = itemsToWorkWith[1]

        addOrDeleteItemFromListInEl(itemValue)
    }
    
    resetInputEl()
})

function resetInputEl() {
    inputEl.innerHTML = ""
}

function addOrDeleteItemFromListInEl(itemHandler){
    publicList.innerHTML += `<li> ${itemHandler} </li>`
}