let todoListArray = [{ todoName: "Doniyorbek", dueDate: "24-02-2343" }];
let getTodoListArray = localStorage.getItem("todoListArray");

if (getTodoListArray) {
  todoListArray = JSON.parse(getTodoListArray);
}

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";

  for (i = 0; i < todoListArray.length; i++) {
    let todoListArrayvalue = todoListArray[i];
    let { todoName, dueDate } = todoListArrayvalue;

    let html = `
		<p class="main__result__sub">
      ${todoName} - ${dueDate}

        <button 
          onclick="
          todoListArray.splice(${[i]},1)
          localStorage.removeItem('todoListArray');
          renderTodoList();          
          "><img src="./img/deleteIcon.svg"/>
        </button>
		</p>
  `;

    todoListHTML += html;
  }
  document.querySelector(".main__result").innerHTML = todoListHTML;
}

const inputElement = document.querySelector(".todoList__row__input");
const btnAdd = document.querySelector(".todoList__row__buttonAdd");
btnAdd.setAttribute("disabled", "");
btnAdd.style.opacity = "0.3";

inputElement.oninput = function () {
  if (inputElement.value.length === 0) {
    btnAdd.setAttribute("disabled", "");
    return;
  } else {
    btnAdd.removeAttribute("disabled");
    btnAdd.style.opacity = "1";
  }
};

function addTodo() {
  const inputDueData = document.querySelector(".todoList__row__date");
  const errorElement = document.querySelector(".main__error");
  errorElement.style.color = "red";

  const todoName = inputElement.value.trim();
  const dueDate = inputDueData.value;

  /*   if (todoName === "") {
    // alert("Заполните пожалуйста поле, с текстом 🗒 и датой 📅");
    errorElement.innerHTML =
      "Заполните пожалуйста поле, с текстом 🗒 и датой 📅";
    return;
  } else if (inputDueData.value === "") {
    // alert("Заполните пожалуйста поле, с датой 📅");
    errorElement.innerHTML = "Заполните пожалуйста поле, с датой 📅";
    return;
  }
  errorElement.innerHTML = ""; */

  todoListArray.push({ todoName, dueDate });
  inputElement.value = "";
  inputDueData.value = "";

  if (inputElement.value === "") {
    btnAdd.setAttribute("disabled", "");
  } else {
    btnAdd.removeAttribute("disabled", "");
    btnAdd.style.opacity = "10";
  }
  renderTodoList();
  // ! SET LOCAL STORAGE
  let setTodoLocal = localStorage.setItem(
    "todoListArray",
    JSON.stringify(todoListArray)
  );
}
