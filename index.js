function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks"));
  const tasksToRender = saved || items;

  tasksToRender.forEach((task) => {
    listElement.append(createItem(task));
  });
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);

  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(
    ".to-do__item-button_type_duplicate",
  );
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    saveTasks(getTasksFromDOM());
  });

  duplicateButton.addEventListener("click", () => {
    const newTask = createItem(textElement.textContent);
    clone.after(newTask);
    saveTasks(getTasksFromDOM());
  });

  editButton.addEventListener("click", () => {
    const currentText = textElement.textContent;
    const newText = prompt("Отредактируйте задачу:", currentText);
    if (newText !== null && newText.trim() !== "") {
      textElement.textContent = newText.trim();
      saveTasks(getTasksFromDOM());
    }
  });

  return clone;
}

function getTasksFromDOM() {
  const taskNodes = document.querySelectorAll(".to-do__item-text");
  return Array.from(taskNodes).map((node) => node.textContent);
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const taskValue = inputElement.value.trim();

  if (taskValue) {
    listElement.prepend(createItem(taskValue));
    saveTasks(getTasksFromDOM());
    inputElement.value = "";
  }
});

loadTasks();
