const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // const taskItem = document.createElement("li");
    // taskItem.innerHTML = `
    //     ${taskText}<div class="box">
    //     <button class="edit-btn">Complete</button>
    //     <button class="complete-btn">#228B22</button>
    //     <button class="delete-btn">Delete</button></div>
    // `;

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      ${taskText}<div class="box">
      <button class="edit-btn"  style="color: ##007bff;">&#x270F;</button>
      <button class="complete-btn" style="color: #228B22;">&#x2714;</button>
      <button class="delete-btn" style="color: #FF0000;">&#x1F5D1;</button>
    </div>
  `;
    // Add event listeners for buttons
    taskItem.querySelector(".edit-btn").addEventListener("click", () => editTask(taskItem));
    taskItem.querySelector(".complete-btn").addEventListener("click", () => completeTask(taskItem));
    taskItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(taskItem));

    pendingTasks.appendChild(taskItem);
    taskInput.value = "";
}

function editTask(taskItem) {
    const taskText = prompt("Edit your task:", taskItem.childNodes[0].textContent);
    
    if (taskText !== null && taskText.trim() !== "") {
        taskItem.childNodes[0].textContent = taskText;
    }
}

function completeTask(taskItem) {
    taskItem.classList.toggle("completed");
    completedTasks.appendChild(taskItem);
    
    // Remove buttons if task is completed
    const buttons = taskItem.querySelectorAll("button");
    buttons.forEach(button => button.style.display = 'none');

    taskItem.querySelector(".edit-btn").style.display = 'none'; // Hide the edit button for completed tasks
}

function deleteTask(taskItem) {
    if (taskItem.classList.contains("completed")) {
        completedTasks.removeChild(taskItem);
    } else {
        pendingTasks.removeChild(taskItem);
    }
}
