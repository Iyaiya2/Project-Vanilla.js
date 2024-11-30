class TodoList {
    constructor() {
        this.todos = [];
        this.archives = [];
        this.todoListElement = document.getElementById("todo-list");
        this.archiveListElement = document.getElementById("archive-list");
        this.loadFromStorage();
    }

    addTodo(description) {
        if (description.trim() === "") {
            alert("Veuillez entrer une tâche !");
            return;
        }
        const newTask = { id: this.generateId(), description, completed: false, archived: false };
        this.todos.push(newTask);
        this.render();
        this.saveToStorage();
    }

    archiveTask(id) {
        const taskIndex = this.todos.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            const [task] = this.todos.splice(taskIndex, 1);
            task.archived = true;
            this.archives.push(task);
            this.render();
            this.saveToStorage();
        }
    }

    deleteTask(id) {
        this.todos = this.todos.filter(task => task.id !== id);
        this.render();
        this.saveToStorage();
    }

    deleteAllTasks() {
        if (confirm("Êtes-vous sûr de vouloir supprimer toutes les tâches ?")) {
            this.todos = [];
            this.render();
            this.saveToStorage();
        }
    }

    deleteAllArchives() {
        if (confirm("Êtes-vous sûr de vouloir supprimer toutes les tâches archivées ?")) {
            this.archives = [];
            this.render();
            this.saveToStorage();
        }
    }

    toggleArchives() {
        const archiveSection = document.getElementById("archive-list");
        const archiveButton = document.getElementById("supprimer-archives");
        archiveSection.classList.toggle("hidden");
        archiveButton.classList.toggle("hidden");
    }

    render() {
        this.todoListElement.innerHTML = this.todos.map(task => `
            <li class="todo-card">
                <span>${task.description}</span>
                <button class="archive-button" onclick="todoList.archiveTask('${task.id}')">Archiver</button>
                <button class="delete-button" onclick="todoList.deleteTask('${task.id}')">Supprimer</button>
            </li>
        `).join("");

        this.archiveListElement.innerHTML = this.archives.map(task => `
            <li class="archive-card">
                <span>${task.description}</span>
            </li>
        `).join("");
    }

    saveToStorage() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
        localStorage.setItem("archives", JSON.stringify(this.archives));
    }

    loadFromStorage() {
        const todos = localStorage.getItem("todos");
        const archives = localStorage.getItem("archives");
        this.todos = todos ? JSON.parse(todos) : [];
        this.archives = archives ? JSON.parse(archives) : [];
        this.render();
    }

    generateId() {
        return Math.random().toString(36).substring(2, 10);
    }
}

const todoList = new TodoList();

document.getElementById("button-add-todo").addEventListener("click", () => {
    const todoInput = document.getElementById("todo-text-input");
    todoList.addTodo(todoInput.value);
    todoInput.value = "";
});

document.getElementById("supprimer").addEventListener("click", () => todoList.deleteAllTasks());
document.getElementById("supprimer-archives").addEventListener("click", () => todoList.deleteAllArchives());
document.getElementById("button-toggle-archives").addEventListener("click", () => todoList.toggleArchives());
