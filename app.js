import { handleAddTask, displayTask, filterTasks, clearAllTasks } from './taskManager.js';
import { debounce} from './Files/debounce.js';
import { throttle} from './Files/throttel.js';

const form = document.getElementById("task-form");
const search = document.getElementById("search");
const backToTop = document.getElementById("back-to-top");
const clearBtn = document.getElementById("clear-tasks");

// Add task handler
form.addEventListener("submit", handleAddTask);

// Display tasks on load
displayTask();

// Search input
search.addEventListener("input", debounce((e) => {
  filterTasks(e.target.value);
}, 600));

// Clear all tasks
clearBtn.addEventListener("click", () => {
  clearAllTasks();
});

// Back to top button
window.addEventListener("scroll", throttle(() => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
}, 200));

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
