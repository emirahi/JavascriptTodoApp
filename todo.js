const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

// Tüm event listenerlar
function eventListeners() {
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    const todos = getTodosFromStorage();
    let flag = true;

    todos.forEach(function(todo){
        if (todo.toLowerCase() === newTodo.toLowerCase()){
            showAlert("alert-danger","bu todo zaten var");
            flag = false;
        }
    });

    if (flag){
        if (newTodo === ""){
            showAlert("alert-danger","Lütfen bir todo girin")
        }else{
            addTodoToUI(newTodo);
            addTodoToStorage(newTodo);
            showAlert("alert-success", newTodo.toString() + " başırılı bir şekilde eklendi")
        }
    }    
    e.preventDefault();
}

function addTodoToUI(newTodo) {
   // List Item Oluşturma
   const listItem = document.createElement("li");
   listItem.className  = "list-group-item d-flex justify-content-between";
   console.log(listItem)
   // Link Oluşturma
   const link = document.createElement("a");
   link.href = "#";
   link.className = "delete-item";
   link.innerHTML = "<i class = 'fa fa-remove'></i>";
   console.log(link)

   // Text Node Ekleme
   listItem.appendChild(document.createTextNode(newTodo));
   listItem.appendChild(link);
   todoList.appendChild(listItem);

}

function showAlert(type,message) {
    const alerts = document.createElement("div");
    alerts.className = "alert " + type;
    alerts.textContent = message;
    
    firstCardBody.appendChild(alerts);

    window.setTimeout(function() {
        alerts.remove()        
    },1500);
    
}

function getTodosFromStorage() { // bütün todoları alıcak.
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
    
}

function addTodoToStorage(newTodo) {
    const todos = getTodosFromStorage();
    let flag = true;

    todos.forEach(function(todo){
        if (todo.toLowerCase() === newTodo.toLowerCase()){
            showAlert("alert-danger","bu todo zaten var");
            flag = false;
        }
    });

    if (flag){
        let todos = getTodosFromStorage();
        todos.push(newTodo);
        localStorage.setItem("todos",JSON.stringify(todos))
    }
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo) {
        addTodoToUI(todo);
    });
}

function deleteTodo(e) {
    if(e.target.className == "fa fa-remove"){
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        e.target.parentElement.parentElement.remove();
        showAlert("alert-success","Başarılı");
    }
}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if (todo == deleteTodo){
            todos.splice(index,1);
        }    
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function filterTodos(e){
    const value = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function (listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(value) !== -1){
            listItem.setAttribute("style","display:block")
        }else {
            listItem.setAttribute("style","display:none !important")
        }

    })
}

function clearAllTodos() {
    if(confirm("Tümünü silmek istediğinize emin misiniz ?")){
        // todoList.innerHTML = ""; // yavaş
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}


