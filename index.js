import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const groceryItem = document.getElementById("input-field");
const appSettings = {
  databaseURL: "https://mobile-grocery-app-6c191-default-rtdb.firebaseio.com/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const groceriesInDB = ref(database, "groceries");
const groceryList = document.getElementById("groceryList");

document.getElementById("add-btn").addEventListener("click", function () {
  let inputValue = groceryItem.value;
  if (inputValue) {
    push(groceriesInDB, inputValue);
    clearInputField();
  } else {
    return;
  }
});

onValue(groceriesInDB, function (snapshot) {
  if (snapshot.exists()) {
    let groceriesArr = Object.entries(snapshot.val());
    clearInputField();
    // fetchSingleList();
    groceriesArr.map((item) => {
      let currentItem = item;
      addNewItems(currentItem);
    });
  } else {
    groceryList.innerHTML = "Nothing here... yet.";
  }
});

function addNewItems(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newGroceryItem = document.createElement("li");
  newGroceryItem.textContent = itemValue;
  newGroceryItem.classList.add("list-item");
  groceryList.append(newGroceryItem);
  newGroceryItem.addEventListener("dblclick", function () {
    let idOfItemInDB = ref(database, `groceries/${itemID}`);
    remove(idOfItemInDB);
  });
}

function clearInputField() {
  groceryItem.value = "";
}

function fetchSingleList() {
  groceryList.innerHTML = "";
}
