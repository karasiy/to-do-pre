let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function getTasksFromDOM() {
  const taskTextElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];

  taskTextElements.forEach((element) => {
    tasks.push(element.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    const updatedTasks = getTasksFromDOM();
    saveTasks(updatedTasks);
  });

  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const updatedTasks = getTasksFromDOM();
    saveTasks(updatedTasks);
  });

  return clone;
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return items;
}

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const taskText = inputElement.value;

  if (taskText.trim() !== "") {
    const newTask = createItem(taskText);
    listElement.prepend(newTask);

    const updatedTasks = getTasksFromDOM();
    saveTasks(updatedTasks);

    inputElement.value = "";
  }
});

items = loadTasks();

items.forEach((task) => {
  const taskElement = createItem(task);
  listElement.append(taskElement);
});
