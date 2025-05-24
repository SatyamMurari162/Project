let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

export function handleAddTask(e) {
  e.preventDefault();
  const input = document.getElementById("input-field");
  const category = document.getElementById("category-select").value;
  const value = input.value.trim();

  if (!value) return;

  tasks.push({
    id: Date.now(),
    task: value,
    completed: false,
    category,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  displayTask();
}

export function displayTask(filtered = null) {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  (filtered || tasks).forEach((item) => {
    const div = document.createElement("div");
    div.className = "task-item" + (item.completed ? " completed" : "");

    const p = document.createElement("p");
    p.innerText = `${item.task} [${item.category}]`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;
    checkbox.addEventListener("change", () => {
      item.completed = checkbox.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTask();
    });

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== item.id);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTask();
    });

    div.append(p, checkbox, delBtn);
    list.appendChild(div);
  });
}

export function filterTasks(keyword) {
  const filtered = tasks.filter(t =>
    t.task.toLowerCase().includes(keyword.toLowerCase())
  );
  displayTask(filtered);
}

export function clearAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    localStorage.removeItem("tasks");
    displayTask();
  }
}
