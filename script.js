let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");
let delAll = document.querySelector(".del-all");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLS();

// Add Task
function addTask() {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
}

submit.onclick = addTask;

input.onkeypress = function (event) {
  if (event.keyCode === 13) {
    addTask();
  }
};

// Click On Task Element
taskDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLS(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  taskDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";

    if (task.completed) {
      div.className = "task done";
    }

    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));

    div.appendChild(span);
    taskDiv.appendChild(div);
  });
}

function addDataToLS(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLS() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLS(arrayOfTasks);
  }
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLS(arrayOfTasks);
}

delAll.onclick = function () {
  localStorage.clear();
  arrayOfTasks = [];
  taskDiv.innerHTML = "";
};
