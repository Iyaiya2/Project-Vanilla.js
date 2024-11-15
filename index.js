document.getElementById("button-add-todo")
addEventListener("click", function (){
    console.log("click");
});

let todoList = document.getElementById("todo-list");

todoList.innerHTML = "<li>Une Todo !</li>";
todoList.innerHTML += "<li>Une autre todo , list.. </li>";
todoList.innerHTML += "<li> Bon vasi j'ai faim  </li>";

