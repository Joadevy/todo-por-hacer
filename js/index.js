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
const taskBox = document.querySelector('.task-box')

// Defining && getting the local storage to do list (as JSON form)
let todos = JSON.parse(localStorage.getItem("todo-list"));


showTodos = () => {
let li = '';
if (todos) { // If there are anything in todos.
// For each todo in the local storage, creates the HTML code adding the data of each one.
    todos.forEach((todo,id)=> {
        li += `<li class="task">
                    <label for="${id}">
                        <input class="check" type="checkbox" id="${id}">
                        <p class="p">${todo.name}</p>
                    </label>
                </li>`;
    });
}
// Add the new list of todos into the taskbox element (UL element).
taskBox.innerHTML = li;
}

showTodos();

taskInput.addEventListener('keyup', (e) => {
    // Saves the task input value entered removing the whitespaces.
    let userTask = taskInput.value.trim();
    
    // Saving in localStorage
    if (e.key == 'Enter' && userTask) { // Validates if the key pressed was 'Enter' && user sends anything != whitespaces.
        if (!todos) { // If the todolist local doesn't exist creates an empty array to save each task.
            todos = [];
        }
        taskInput.value = '';
        let taskInfo = {name: userTask, status:"pending"};
        todos.push(taskInfo); // Push the new task for the array.
        localStorage.setItem('todo-list',JSON.stringify(todos)); // saving the array in local storage after convert it to a string.
        showTodos();
    }
})
