// JavaScript code for task list functionality

function addTask() {
    var newTaskInput = document.getElementById("new-task");
    var taskList = document.getElementById("task-list");

    if (newTaskInput.value.trim() !== "") {
        var taskItem = document.createElement("li");
        taskItem.className = "task-item";

        taskItem.innerHTML = `
            <span>${newTaskInput.value}</span>
            <button class="complete-button" onclick="completeTask(this)">Complete</button>
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
        `;

        taskList.appendChild(taskItem);
        newTaskInput.value = "";

        // Save tasks to local storage
        saveTasksToLocalStorage();
    }
}
function deleteTask(deleteButton) {
    var taskItem = deleteButton.parentNode;
    var taskList = document.getElementById("task-list");

    taskList.removeChild(taskItem);

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    var taskList = document.getElementById("task-list");
    var tasks = [];

    // Extract task text from each task item
    taskList.querySelectorAll(".task-item span").forEach(function (task) {
        tasks.push(task.textContent);
    });

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function completeTask(completeButton) {
    var taskItem = completeButton.parentNode;
    var taskText = taskItem.querySelector("span");

    taskItem.classList.toggle("completed-task");

    if (taskItem.classList.contains("completed-task")) {
        // Display completion message below the task
        displayCompletionMessage(taskText.textContent);
    } else {
        // Remove completion message if task is marked incomplete
        removeCompletionMessage(taskText.textContent);
    }

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

function displayCompletionMessage(taskText) {
    var completionMessage = document.createElement("p");
    completionMessage.textContent = `Task "${taskText}" is completed!`;
    document.getElementById("task-container").appendChild(completionMessage);
}

function removeCompletionMessage(taskText) {
    var completionMessage = document.querySelector(`p:contains("${taskText}")`);
    if (completionMessage) {
        completionMessage.remove();
    }
}


