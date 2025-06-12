// JavaScript Document

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Sayfa yüklendiğinde localStorage'dan görevleri al
document.addEventListener("DOMContentLoaded", loadTasksFromStorage);

// Görev ekleme
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Lütfen bir görev girin.");
    return;
  }

  addTaskToUI(taskText, false);
  saveTaskToStorage(taskText, false);
  taskInput.value = "";
});

taskList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  const text = li.querySelector(".task-text").textContent;

  if (e.target.classList.contains("completeBtn")) {
    const taskTextEl = li.querySelector(".task-text");
    taskTextEl.classList.toggle("completed");
    updateTaskStatus(text, taskTextEl.classList.contains("completed"));
  }

  if (e.target.classList.contains("deleteBtn")) {
    li.remove();
    deleteTaskFromStorage(text);
  }
});

function addTaskToUI(text, completed) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  li.innerHTML = `
    <span class="task-text ${completed ? "completed" : ""}">${text}</span>
    <div>
      <button class="btn btn-success btn-sm me-2 completeBtn">Tamamla</button>
      <button class="btn btn-danger btn-sm deleteBtn">Sil</button>
    </div>
  `;

  taskList.appendChild(li);
}

// LocalStorage'a görev ekle
function saveTaskToStorage(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LocalStorage'dan görev sil
function deleteTaskFromStorage(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LocalStorage'da görev tamamlandı mı güncelle
function updateTaskStatus(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => task.text === text ? { ...task, completed } : task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Sayfa açıldığında görevleri yükle
function loadTasksFromStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToUI(task.text, task.completed));
}