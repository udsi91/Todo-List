let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDate = new Date();
let dayName = days[currentDate.getUTCDay()];
let date = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();

document.getElementById("current-day-date").innerHTML =
  dayName + " " + date + "/" + month + "/" + year;

// Elements

const todoInput = document.getElementById("input");
const addBtn = document.querySelector("#btn");
const todoUl = document.querySelector("#todo-ul");

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

window.addEventListener("load", () => {
  getTodoListFromLocalStorage();
});

const getTodoListFromLocalStorage = () => {
  todoList.forEach((todo) => {
    createTodo(todo);
  });
};

addBtn.addEventListener("click", (e) => {
  //prevent form submit
  e.preventDefault();
  if (todoInput.value.trim() === "") {
    alert("Please, enter new todo text!");
    return;
  }

  const newTodo = {
    id: new Date().getTime(), //unique id with ms of now
    completed: false, //status
    text: todoInput.value, //userInput
  };

  createTodo(newTodo);

  todoList.push(newTodo);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  e.target.closest("form").reset();
});

const createTodo = (newTodo) => {
  //todo item creation

  const { id, completed, text } = newTodo;

  //create li
  const li = document.createElement("li");
  li.setAttribute("id", id);

  //add class with completed(status)
  completed ? li.classList.add("checked") : "";

  //create check icon
  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-check");

  li.append(icon);

  //create item text
  const p = document.createElement("p");
  p.innerText = text;
  li.appendChild(p);

  //create remove icon
  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fas fa-trash");
  li.append(removeIcon);

  todoUl.prepend(li);
};

todoUl.addEventListener("click", (e) => {
  const idAttr = e.target.closest("li").getAttribute("id");
  if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("checked");

    todoList.forEach((todo) => {
      if (todo.id == idAttr) {
        todo.completed = !todo.completed;
      }
    });
    //add updated array to localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else if (e.target.classList.contains("fa-trash")) {
    //remove from UI
    e.target.parentElement.remove();
    //remove from Array

    todoList = todoList.filter((todo) => todo.id != idAttr);
    //add updated array to localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else {
    alert("other element clicked");
  }
});
