/* const task = document.getElementById('newTask');
const btn = document.querySelector('.btn');
const cont = document.querySelector('.task-box');
const p = document.querySelectorAll('.p')
let check = document.querySelectorAll('.check');

btn.addEventListener('click',() => {
    const label = document.createElement('LABEL');
    let checkbox = document.createElement('INPUT');
    let p = document.createElement('P');
    checkbox.type = 'checkbox';
    checkbox.classList.add('check');
    label.appendChild(checkbox);
    label.appendChild(p);
    if (task.value != "") {
        p.textContent = task.value;
        cont.appendChild(label);
        task.value = '';
        console.log(checkbox);
        check += checkbox;
    } else {
        alert('NO MI REY!');
    }
})

check.forEach(element => element.addEventListener('click', ()=> {
    element.nextElementSibling.classList.toggle('linethrough');
}))  */

const taskInput = document.querySelector('.createTask-container input');
const taskBox = document.querySelector('.task-box');
const sendBtn = document.querySelector('.createTask-container button');
const clearBtn = document.querySelector('.container .clear-btn');
const container = document.querySelector('.container');

// Defining && getting the local storage to-do list (as JSON form)
let todos = JSON.parse(localStorage.getItem("todo-list"));

/* clearBtn.addEventListener('click', ()=> {
    if(todos[0]) { // The clear-btn shouldn't display if there aren't displayed tasks.
        let userConfirmation = confirm('Do you want to delete all your tasks?')
        if (userConfirmation) {
            removeAllTasks();
        }
    }
}) */

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
if (todos) { // If there are anything in todos.
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
                        container.appendChild(btnclear);   
                    }
                });
                taskBox.innerHTML = li; // Add the new list of todos into the taskbox element (UL element).
            }   
}

const updateStatus = (task) => {
    let taskName = task.parentElement.lastElementChild; // Last child of the parent(label) is the paragraph
     if (task.checked){
        todos[task.id].status = "completed"; // Updates the status of the task to completed
        taskName.classList.add("checked"); // Adds the class for line-through
    } else {
        todos[task.id].status = "pending"; // Updates the status of the task to pending
        taskName.classList.remove("checked"); // Removes the class for line-through
    } 
   localStorage.setItem('todo-list',JSON.stringify(todos)); // Updating the data in local storage (for the status)
}

const removeTask = (selectedTask) => {
    //selected task is: task.parentElement.parentElement; // Selects the entire task container: <li class="task"> 
    taskBox.removeChild(selectedTask); // Removes the HTML element child of taskBox(<ul class="task-box"></ul>): <li class="task">
    todos.splice(selectedTask.firstElementChild.firstElementChild.id,1); // Remove the object in the array todos.\
    localStorage.setItem('todo-list',JSON.stringify(todos)); // Updates the local storage with the new array todos after stringify.
    showTodos();
    removeClearButton();
}

const removeAllTasks = () => {
    todos.splice(0,todos.length);
    localStorage.setItem('todo-list',JSON.stringify(todos));
    showTodos();
    removeClearButton;
}

const removeClearButton = () => {
    if (todos.length == 0) {
        container.removeChild(container.lastElementChild);   
    }  
}

showTodos();



