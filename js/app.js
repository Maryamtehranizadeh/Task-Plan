let taskInput = document.getElementById("task-input");
let dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");

const alertMessage = document.getElementById("alert-message");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");
const filterButtons = document.querySelectorAll(".filter-todos");

const generateId = () => {
  return Math.round(Math.random() * Math.pow(10, 15));
};

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 3000);
};

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const displayTodos = () => {
  todosBody.innerHTML = "";
  if (!todos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No task found!</td></tr>";
    return;
  }
  todos.forEach((todo) => {
    todosBody.innerHTML += `<tr>
    <td>${todo.task}</td>
    <td>${todo.date || "No Date Specified"}</td>
    <td>${todo.completed ? "Completed" : "Pending"}</td>
    <td>
    <button onclick="editHandler(${todo.id})">Edit</button>
    <button onclick="toggleHandler(${todo.id})">${
      todo.completed ? "Undo" : "Do"
    }</button>
    <button onclick="deleteHandler(${todo.id})">Delete</button>
    </td>
    </tr>`;
  });
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    completed: false,
    task,
    date,
  };

  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";
    showAlert("Task added successfully!", "success");
  } else {
    showAlert("Please enter a valid task!", "error");
  }
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("All Tasks Cleared Successfully", "success");
  } else {
    showAlert("No task to delete!", "error");
  }
};
const deleteHandler = (id) => {
  console.log(id);
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showAlert("Task deleted successfully!", "success");
};
const toggleHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  saveToLocalStorage();
  displayTodos();
  showAlert("Task status changed successfully!", "success");
};
const editHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none";
  editButton.style.display = "inline-block";
  editButton.dataset.id = id;
};
const applyEditHandler = (event) => {
  const id = event.target.dataset.id;
  const todo = todos.find((todo) => todo.id == id);
  todo.task = taskInput.value;
  todo.date = dateInput.value;
  taskInput.value = "";
  dateInput.value = "";
  addButton.style.display = "inline-block";
  editButton.style.display = "none";
  saveToLocalStorage();
  displayTodos();
  showAlert("Task edited successfully!", "success");
};

const filterhandler = (event) => {
  const filter = event.target.dataset.filter;
  if (filter === "all") {
    todos = JSON.parse(localStorage.getItem("todos"));
    displayTodos();
  } else if (filter === "completed") {
    todos = JSON.parse(localStorage.getItem("todos"));
    const newTodos = todos.filter((todo) => todo.completed === true);
    todos = newTodos;
    displayTodos();
  } else if (filter === "pending") {
    todos = JSON.parse(localStorage.getItem("todos"));
    const newTodos = todos.filter((todo) => todo.completed === false);
    todos = newTodos;
    displayTodos();
  }
};

deleteAllButton.addEventListener("click", deleteAllHandler);
window.addEventListener("load", displayTodos);
addButton.addEventListener("click", addHandler);
editButton.addEventListener("click", applyEditHandler);

filterButtons.forEach((button) => {
  button.addEventListener("click", filterhandler);
});
