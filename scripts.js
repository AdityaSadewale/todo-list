const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const closePopup = document.getElementById("closePopup");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Show popup
function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = "flex";
}

// Close popup
closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});

// Add task
addBtn.addEventListener("click", addTask);

function addTask() {
    const text = taskInput.value.trim();
    const date = taskDate.value;

    if (text === "") {
        showPopup("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        date: date,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskDate.value = "";
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    showPopup("Task Deleted!");
}

// Toggle complete
function toggleComplete(id) {
    tasks.forEach(task => {
        if (task.id === id) {
            task.completed = !task.completed;
            if (task.completed) {
                showPopup("🎉 Task Completed!");
            }
        }
    });

    saveTasks();
    renderTasks();
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        const info = document.createElement("div");
        info.className = "task-info";

        const title = document.createElement("strong");
        title.textContent = task.text;

        if (task.completed) {
            title.classList.add("completed");
        }

        const dateText = document.createElement("small");
        dateText.textContent = task.date ? "Reminder: " + task.date : "No Date";

        info.appendChild(title);
        info.appendChild(dateText);

        const actions = document.createElement("div");
        actions.className = "actions";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.className = "complete-btn";
        completeBtn.onclick = () => toggleComplete(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteTask(task.id);

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(info);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}

// Load tasks when page opens
renderTasks();
