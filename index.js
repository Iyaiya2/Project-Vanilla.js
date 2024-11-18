// Variables globales
let todoList = document.getElementById("todo-list");


// Créer une tâche personnalisée avec un prompt
document.getElementById("button-add-todo")
    .addEventListener("click", function () {
        console.log("Créer une tâche");
        let newTodo = prompt("Entrez une nouvelle tâche :");
        if (newTodo) {
            todoList.innerHTML += `<li>${newTodo}</li>`;
        }
    });

// Supprimer la dernière tâche
document.getElementById("supprimer")
    .addEventListener("click", function () {
        console.log("Suppression de la dernière tâche");
        if (todoList.lastElementChild) {
            todoList.removeChild(todoList.lastElementChild);
        } else {
            alert("La liste est vide, rien à supprimer !");
        }
    });

// Exemple initial de tâches
todoList.innerHTML = "<li>Une Todo !</li>";
todoList.innerHTML += "<li>Une autre todo, liste...</li>";
todoList.innerHTML += "<li>Bon, vas-y, j'ai faim</li>";
