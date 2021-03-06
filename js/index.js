const taskInput = document.querySelector('.createTask-container input');
const taskBox = document.querySelector('.task-box');
const sendBtn = document.querySelector('.createTask-container button');
const container = document.querySelector('.container');
const allTasks = document.getElementById('all');
allTasks.classList.add('active'); // Adding the class to show it like clicked by default.
const pendingTasks = document.getElementById('pending');
const completedTasks = document.getElementById('completed');

let todos = JSON.parse(localStorage.getItem("todo-list")); // Defining && getting the local storage to-do list (as JSON form)
let idEdited; // For tracking the ID in the array of an edited task.
let isEdited = false; // For validates in the listener input.

taskInput.addEventListener('keyup', event => {
    let userTask = taskInput.value.trim(); // Saves the task input value entered removing the whitespaces (trim method)
    // Saving in localStorage
    if (event.key == 'Enter' && userTask) { // Validates if the key pressed was 'Enter' && user sends anything != whitespaces.
        if (!isEdited) { // If is a new task
            if (!todos) { // If the todolist local doesn't exist creates an empty array to save each task.
                todos = [];
            }
            let taskInfo = {name: userTask, status:"pending"};
            todos.push(taskInfo); // Push the new task into the array.
        } else { // If is a edited task
            todos[idEdited].name = userTask; // Adding the new value of the task into their position in todos.
            isEdited = false; // Updating the control variable.
        }
        taskInput.value = ''; // Resets the input value
        localStorage.setItem('todo-list',JSON.stringify(todos)); // saving the array in local storage after convert it to a string.
        showActive();
    }
});

sendBtn.addEventListener('click', (e) => {
    let userTask = taskInput.value.trim(); // Saves the task input value entered removing the whitespaces (trim method)
    // Saving in localStorage
    if (userTask) { // Validates if the user sends anything != whitespaces.
        if (!isEdited) { // If is a new task
            if (!todos) { // If the todolist local doesn't exist creates an empty array to save each task.
                todos = [];
            }
            let taskInfo = {name: userTask, status:"pending"};
            todos.push(taskInfo); // Push the new task into the array.
        } else { // If is a edited task
            todos[idEdited].name = userTask;
            isEdited = false;
        }
        taskInput.value = ''; // Resets the input value
        localStorage.setItem('todo-list',JSON.stringify(todos)); // saving the array in local storage after convert it to a string.
        show('all');
    }
})

allTasks.addEventListener('click', ()=> {
    allTasks.classList.add('active');
    pendingTasks.classList.remove('active');
    completedTasks.classList.remove('active');
    show('all');
});

pendingTasks.addEventListener('click', () => {
    allTasks.classList.remove('active');
    pendingTasks.classList.add('active');
    completedTasks.classList.remove('active');
    show("pending");
});

completedTasks.addEventListener('click', () => {
    allTasks.classList.remove('active');
    pendingTasks.classList.remove('active');
    completedTasks.classList.add('active');
    show("completed");
});

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

const removeTask = (id) => {
    todos.splice(id,1); // Remove the object in the array todos.
    localStorage.setItem('todo-list',JSON.stringify(todos)); // Updates the local storage with the new array todos after stringify.
    isEdited = false; // For prevent bugs with the edit because of the positions in the array.
    showActive(); // Displaying the results and updating the listeners for editing/removing
}

// Displaying in the DOM the tasks filtering by the status parameter: 'all tasks', 'pendings tasks', 'completed tasks'
const show = (status) => {
    sendBtn.textContent = "Create";
    let li = '';
    // Showing the tasks after filter it.
    if(status == 'completed' || status == 'pending'){
        todos.forEach((todo,id) => { // Searching in the todos array for todos with 'pending' status
            let isCompleted = todo.status == "completed" ? "checked" : '';
            if(todo.status == status){
                li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" class="check" type="checkbox" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <img src = "assets/icons/options.png" onclick ="showMenu(this)">
                            <ul class="task-menu">
                                    <li onclick ="editTask('${todo.name}')">Edit</li>
                                    <li onclick ="removeTask(${id})">Delete</li>
                            </ul>
                        </div>
                    </li>`; 
            }
        });
            // Replacing the clear all button in the filters for clear pending && clear completed.
            if (container.lastElementChild.classList.value === "clear-btn"){
                if (status == 'pending') {
                    let btnclearPending = createButton('pending');
                    container.replaceChild(btnclearPending,document.querySelector('.clear-btn')); 
                } else if (status == 'completed') {
                    let btnclearCompleted = createButton('completed');
                    container.replaceChild(btnclearCompleted,document.querySelector('.clear-btn')); 
                } 
            } 
            // Creating the clear (pending||completed) buttons if there aren't exist.
            else if (container.firstElementChild != null && status == 'pending') {
                let btnclearPending = createButton('pending');
                container.appendChild(btnclearPending); 
            } else if (container.firstElementChild != null && status == 'completed'){
                let btnclearCompleted = createButton('completed');
                container.appendChild(btnclearCompleted); 
            }
    } 
    // Showing all the tasks.
    else if (status == 'all'){
        todos.forEach((todo,id) => { // Searching in the todos array for todos with 'pending' status
            let isCompleted = todo.status == "completed" ? "checked" : '';
                li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" class="check" type="checkbox" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <img src = "assets/icons/options.png" onclick ="showMenu(this)">
                            <ul class="task-menu">
                                    <li onclick ="editTask('${todo.name}')">Edit</li>
                                    <li onclick ="removeTask(${id})">Delete</li>
                            </ul>
                        </div>
                    </li>`; 
        });
        // Creates a clear-all button in the ALL FILTER if there are no one.
        if(container.lastElementChild.classList.value == 'task-box'){
            let btnclear = createButton('all');
            container.appendChild(btnclear);   
        }  
        // Replaces the clear pending/completed for clear ALL button.
         else if (container.lastElementChild.classList.value === "clear-btn"){
                let btnclearAll = createButton('all');
                container.replaceChild(btnclearAll,document.querySelector('.clear-btn')); 
        } 

        // Add the class & remove the others because this function is called when the user tips a new task.
        allTasks.classList.add('active');
        pendingTasks.classList.remove('active');
        completedTasks.classList.remove('active');
    }
    // If there aren't tasks, then shows the message and removes the clear button.
    if (li == '') {
        li = "You don't have any task here!";
        // Removing the clear btn because there aren't tasks.
        if (container.lastElementChild.classList.value === "clear-btn"){
            container.removeChild(container.lastElementChild);
        }
    }
    // Updating the DOM.
    taskBox.innerHTML = li;
}

// Calls the show with the status depending by the current filter active.
const showActive = () => {
    if (allTasks.classList.contains('active')){
        show('all');
    } else if (pendingTasks.classList.contains('active')){
        show('pending');
    } else if (completedTasks.classList.contains('active')) {
        show('completed');
    }
}

// Displays the menu-task for edit/delete when clicks the options button.
const showMenu = (selectedTask) => {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show"); // Adding the class so as to makes it visible.
    document.addEventListener('click', e => { // If user clicks != options, removes the taskmenu
        if (e.target != selectedTask)  {
            taskMenu.classList.remove("show");
        }
    })
}

// Removes all the tasks after the user confirmation.
const removeAllTasks = () => {
    let userConfirmation = confirm('Do you want to delete all your tasks?')
        if (userConfirmation) {
            todos.splice(0,todos.length); // Remove all the elements in the todos array.
            localStorage.setItem('todo-list',JSON.stringify(todos)); // Update the local storage after stringify the array content.
            show('all'); // Update the DOM
        }
}

// Removes only the Completed tasks after user confirmation.
const removeCompletedTasks = ()=> {
    let userConfirmation = confirm('Do you want to delete your completed tasks?');
    if (userConfirmation && todos) {
        pendingArray = todos.filter(task => task.status == 'pending'); // Creating an array with pending tasks only.
        todos = pendingArray; // Merging the pending array into the todos.
        localStorage.setItem('todo-list',JSON.stringify(todos)); // Updating the local storage.
        show('completed'); // Showing the completed tasks remaining (0 after removing)
    }
}

// Removes only the pending tasks after user confirmation.
const removePendingTasks = ()=> {
    let userConfirmation = confirm('Do you want to delete your pending tasks?');
    if (userConfirmation && todos) { 
        let completedArray = todos.filter(task => task.status == 'completed'); // Creating an array with completed tasks only.
        todos = completedArray; // Merging the completed array into the todos.
        localStorage.setItem('todo-list',JSON.stringify(todos)); // Updating the local storage.
        show('pending'); // Showing the pending tasks remaining (0 after removing)
    }
}

const editTask = (task) => { 
    let identifier;
    for (let todo in todos) { // Looking for the index of the selected element in the array todos.
         if (todos[todo].name == task) {
            identifier = todo;
        } 
    }
    taskInput.value = task; // Adding the actual task to the input to edit.
    idEdited = identifier; // Updating the global parameter.
    isEdited = true; // Updating the global parameter.
    taskInput.focus(); // Adding focus to the input to edit the selected task.
    sendBtn.textContent = "Update"; // Changing the send button to 'update'
}

// Creates a button with their onclick according to the status.
const createButton = (status) => {
    let btn;
    if (status == 'all'){
        btn = document.createElement("BUTTON");
        btn.classList.add('clear-btn');
        btn.textContent= 'Clear All';
        btn.onclick = removeAllTasks;
            return btn;
    } else if (status == 'pending') {
        btn = document.createElement("BUTTON");
        btn.classList.add('clear-btn');
        btn.textContent= 'Clear Pending';
        btn.onclick = removePendingTasks;
            return btn;
    } else if(status == 'completed'){
        btn = document.createElement("BUTTON");
        btn.classList.add('clear-btn');
        btn.textContent= 'Clear Completed';
        btn.onclick = removeCompletedTasks;
            return btn;
    }
}

// Displaying all the tasks by default.
show('all');