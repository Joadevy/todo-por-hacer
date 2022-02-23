const taskInput = document.querySelector('.createTask-container input');
const taskBox = document.querySelector('.task-box');
const sendBtn = document.querySelector('.createTask-container button');
const container = document.querySelector('.container');
const allTasks = document.getElementById('all');
const pendingTasks = document.getElementById('pending');
const completedTasks = document.getElementById('completed');


// Defining && getting the local storage to-do list (as JSON form)
let todos = JSON.parse(localStorage.getItem("todo-list"));

taskInput.addEventListener('keyup', (e) => {
    let userTask = taskInput.value.trim(); // Saves the task input value entered removing the whitespaces (trim method)
    
    // Saving in localStorage
    if (e.key == 'Enter' && userTask) { // Validates if the key pressed was 'Enter' && user sends anything != whitespaces.
        if (!todos) { // If the todolist local doesn't exist creates an empty array to save each task.
            todos = [];
        }
        taskInput.value = ''; // Resets the input value
        let taskInfo = {name: userTask, status:"pending"};
        todos.push(taskInfo); // Push the new task into the array.
        localStorage.setItem('todo-list',JSON.stringify(todos)); // saving the array in local storage after convert it to a string.
        showTodos();
    }
})

sendBtn.addEventListener('click', (e) => {
    let userTask = taskInput.value.trim(); // Saves the task input value entered removing the whitespaces (trim method)
    // Saving in localStorage
    if (userTask) { // Validates if the user sends anything != whitespaces.
        if (!todos) { // If the todolist local doesn't exist creates an empty array to save each task.
            todos = [];
        }
        taskInput.value = ''; // Resets the input value
        let taskInfo = {name: userTask, status:"pending"};
        todos.push(taskInfo); // Push the new task into the array.
        localStorage.setItem('todo-list',JSON.stringify(todos)); // saving the array in local storage after convert it to a string.
        showTodos();
    }
})

showTodos = () => {
let li = '';
if (todos) { // If there are something in todos.
                todos.forEach((todo,id)=> { // For each todo in the local storage, creates the HTML code adding the data of each one.
                    let isCompleted = todo.status == "completed" ? "checked" : ''; // If todo.status == 'completed', saves checked, else saves ''
                    li += `<li class="task">
                                <label for="${id}">
                                    <input onclick="updateStatus(this)" class="check" type="checkbox" id="${id}" ${isCompleted}>
                                    <p class="${isCompleted}">${todo.name}</p>
                                </label>
                                <div class="removeTask">
                                    <img src = "../assets/icons/removeTask.png" onclick ="removeTask(this.parentElement.parentElement)">
                                </div>
                            </li>`;

                    if(container.lastElementChild.classList.value == 'task-box'){ // Creates a clear-all button if there are no one.
                        let btnclear = document.createElement("BUTTON");
                        btnclear.textContent= 'Clear All';
                        btnclear.classList.add('clear-btn');
                        btnclear.onclick = removeAllTasks; // Adding the functionality
                        container.appendChild(btnclear);   
                    }
                });
                taskBox.innerHTML = li; // Add the new list of todos into the taskbox element (UL element).
            }   
}

allTasks.addEventListener('click', ()=> showTodos());

pendingTasks.addEventListener('click', () => showFilteredTodos("pending"));

completedTasks.addEventListener('click', () => showFilteredTodos("completed"));

const showFilteredTodos = (filter) => {
    let li = '';
    todos.forEach((todo,id) => { // Searching in the todos array for todos with 'pending' status
        let isCompleted = todo.status == "completed" ? "checked" : '';
        if(todo.status == filter){
            li += `<li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" class="check" type="checkbox" id="${id}" ${isCompleted}>
                        <p class="${isCompleted}">${todo.name}</p>
                    </label>
                    <div class="removeTask">
                        <img src = "../assets/icons/removeTask.png" onclick ="removeTask(this.parentElement.parentElement)">
                    </div>
                </li>`; 
        }
    });
    taskBox.innerHTML = li;
}

const updateStatus = (task) => {
    let taskName = task.parentElement.lastElementChild; // Last child of the parent (label) is the paragraph
     if (task.checked){
        todos[task.id].status = "completed"; // Updates the status of the task to completed
        taskName.classList.add("checked"); // Adds the class for line-through
    } else {
        todos[task.id].status = "pending"; // Updates the status of the task to pending
        taskName.classList.remove("checked"); // Removes the class for line-through
    } 
   localStorage.setItem('todo-list',JSON.stringify(todos)); // Updating the data in local storage (for update the status)
}

const removeTask = (selectedTask) => {
    //selected task is: task.parentElement.parentElement; // Selects the entire task container: <li class="task"> 
    taskBox.removeChild(selectedTask); // Removes the HTML element child of taskBox(<ul class="task-box"></ul>): <li class="task">
    todos.splice(selectedTask.firstElementChild.firstElementChild.id,1); // Remove the object in the array todos.\
    localStorage.setItem('todo-list',JSON.stringify(todos)); // Updates the local storage with the new array todos after stringify.
    showTodos();
    removeClearButton();
}

const removeAllTasks = () => { // Removes all the tasks after the user confirmation.
    let userConfirmation = confirm('Do you want to delete all your tasks?')
        if (userConfirmation) {
            todos.splice(0,todos.length); // Remove all the elements in the todos array.
            localStorage.setItem('todo-list',JSON.stringify(todos)); // Update the local storage after stringify the array content.
            showTodos(); // Update the DOM
            removeClearButton(); // Removes the clear all btn because there aren't tasks to do.
        }
}

const removeClearButton = () => { // If todos == 0, there aren't tasks to do.
    if (todos.length == 0) { 
        container.removeChild(container.lastElementChild); // The lastElementChild of container is the clear btn.
    }  
}

showTodos();



