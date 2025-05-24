Suggestion in search input filed code here :-----


'''''''''

let search2 = document.getElementById("search");
let suggestionsBox = document.getElementById("suggestions");

search2.addEventListener("input", debounce(showSuggestions, 300));

function showSuggestions() {
  const inputValue = search2.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  if (inputValue === "") {
    suggestionsBox.style.display = "none";
    return;
  }

  // Filter matching tasks
  let filtered = tasks.filter((task) =>
    task.task.toLowerCase().includes(inputValue)
  );

  if (filtered.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  suggestionsBox.style.display = "block";

  filtered.forEach((task) => {
    let div = document.createElement("div");
    div.textContent = task.task;
    div.addEventListener("click", () => {
      search.value = task.task; // Autofill input
      suggestionsBox.innerHTML = ""; // Clear suggestions
      suggestionsBox.style.display = "none";
      filterTasks(task.task); // Optional: filter task list
    });
    suggestionsBox.appendChild(div);
  });
}


'''''''''


2. CSS

''''

.search-container {
  position: relative;
  width: 300px;
}

.suggestion-box {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
  display: none;
}

.suggestion-box div {
  padding: 10px;
  cursor: pointer;
}

.suggestion-box div:hover {
  background-color: #eee;
}


''''



3. HTML 

'''

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Daily Planner</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main>
  <header class="heading">
    <h1>My Daily Planner</h1>

    <!-- Search Container with Suggestions Box -->
    <div class="search-container">
      <input
        class="search"
        id="search"
        type="search"
        placeholder="Search tasks"
        autocomplete="off"
      />
      <div id="suggestions" class="suggestion-box"></div>
    </div>
  </header>

  <!-- Task Input Form -->
  <form id="task-form">
    <input id="input-field" type="text" placeholder="Add a task..." />
    <button id="submit-button" type="submit">Add</button>
  </form>

  <!-- Task List Section -->
  <section id="task-list"></section>
</main>

  </body>
  <script src="./index.js"></script>
</html>


'''