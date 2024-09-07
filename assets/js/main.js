const taskInput = document.querySelector("#input__task");
const btnAddTask = document.querySelector("#btn__add-task");
const tasks = document.querySelector(".tasks");

btnAddTask.addEventListener("click", function () {
  const task = taskInput.value;
  if (!task) return;
  createTask(task);
});

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    createTask(taskInput.value);
  }
});

function createTask(task) {
  const li = createLiElement();
  tasks.appendChild(li);
  li.innerHTML = `${task}`;
  const btnDelete = createButtonElement();
  li.appendChild(btnDelete);
  taskInput.value = " ";
  taskInput.focus();
  saveTasks();
}

function createLiElement() {
  const li = document.createElement("li");
  li.setAttribute("class", "task");

  return li;
}

function createButtonElement() {
  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("class", "btn__delete-task fa-solid fa-trash");
  return btnDelete;
}

document.addEventListener("click", function (e) {
  const el = e.target;

  if (el.classList.contains("btn__delete-task")) {
    el.parentElement.remove();
    saveTasks()
  }
});

// Função para salvar os dados no localStorage
function saveTasks() {
  const liTasks = tasks.querySelectorAll("li");
  const taskList = [];

  for (const task of liTasks) {
    let taskContent = task.innerText;
    taskList.push(taskContent);
  }
  const tasksInJSON = JSON.stringify(taskList);
  localStorage.setItem('tasks', tasksInJSON);
}

//Funcão para repor as tasks novamente na lista no HTML
function replaceTasks(){
  const tasks = localStorage.getItem('tasks');
  const taskList = JSON.parse(tasks);
  for (const task of taskList) {
    createTask(task);
  }
}
replaceTasks();
