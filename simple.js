function taskMaker() {
  let count = document.getElementById("count");
  const mainInput = document.querySelector(".inp");
  const list = document.querySelector(".todolist");
  mainInput.addEventListener("keydown", function(event) {
    if (event.key != "Enter" || mainInput.value.trim() == "") return;
    const task = document.createElement("div");
    task.classList.add("mainDiv");
    const input = document.createElement("textarea");
    input.style.cursor = "default";
    input.classList.add("inp");
    input.classList.add("createdElements");
    input.setAttribute("readonly", true);
    prevDef = event => event.preventDefault();

    input.addEventListener("blur", function(event) {
      input.setAttribute("readonly", true);
      input.addEventListener("selectstart", prevDef);
      input.addEventListener("mousedown", prevDef);
      input.style.cursor = "default";
      if (input.value == "") input.closest("div").remove();
    });

    input.addEventListener("selectstart", prevDef);
    input.addEventListener("mousedown", prevDef);

    input.addEventListener("dblclick", event => {
      input.focus();
      input.removeAttribute("readonly");
      input.style.cursor = "text";
      input.removeEventListener("selectstart", prevDef);
      input.removeEventListener("mousedown", prevDef);
    });

    input.addEventListener("keydown", event => {
      if (event.key == "Enter") event.preventDefault();
    });

    input.addEventListener("keyup", event => {
      autosize(input); // Jquery решение для переноса строчек в textarea;
      if (event.key == "Enter") input.blur();
    });
    count.innerHTML = Number(count.innerHTML) + 1;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");

    checkbox.addEventListener("click", complitedTasks);
    input.value = mainInput.value.trim();
    mainInput.value = "";
    task.prepend(input);
    task.prepend(checkbox);
    list.after(task);
    autosize(input);
    checkForAll();
    checkForSelected();
    checkForComplited();
  });
}

function checkbox() {
  const checked = document.querySelectorAll(".checkbox");
  for (let item of checked) {
    if (item.checked != true) continue;
    item.closest("div").remove();
  }
}

function wrapper() {
  const buttonAll = document.querySelectorAll("button")[0];
  const buttonSelected = document.querySelectorAll("button")[1];
  const buttonComplited = document.querySelectorAll("button")[2];
  buttonAll.classList.add("select");
  buttonAll.onclick = () => {
    buttonAll.classList.add("select");
    buttonSelected.classList.remove("select");
    buttonComplited.classList.remove("select");
    checkForAll();
  };
  buttonSelected.onclick = () => {
    buttonSelected.classList.add("select");
    buttonAll.classList.remove("select");
    buttonComplited.classList.remove("select");
    checkForSelected();
  };

  buttonComplited.addEventListener("click", function() {
    buttonComplited.classList.add("select");
    buttonAll.classList.remove("select");
    buttonSelected.classList.remove("select");
    checkForComplited();
  });
}

function checkForAll() {
  const buttonAll = document.querySelectorAll("button")[0];
  if (buttonAll.classList.contains("select")) {
    const allElements = document.querySelectorAll(".mainDiv");
    for (let item of allElements) {
      item.hidden = false;
    }
  }
}

function checkForSelected() {
  const buttonSelected = document.querySelectorAll("button")[1];
  if (buttonSelected.classList.contains("select")) {
    const allElements = document.querySelectorAll(".mainDiv");
    for (let item of allElements) {
      if (item.firstChild.checked) item.hidden = true;
      else item.hidden = false;
    }
  }
}

function checkForComplited() {
  const buttonComplited = document.querySelectorAll("button")[2];
  if (buttonComplited.classList.contains("select")) {
    const allElements = document.querySelectorAll(".mainDiv");
    for (let item of allElements) {
      if (item.firstChild.checked) item.hidden = false;
      else item.hidden = true;
    }
  }
}

function complitedTasks(event) {
  let count = document.getElementById("count");
  const checkbox = document.querySelectorAll(".checkbox");
    if (event.target.checked) {
      event.target.nextSibling.classList.add("textDecorationForTask");
      count.innerHTML = Number(count.innerHTML) -1;
    } else if (event.target.nextSibling.classList.contains("textDecorationForTask")){
      count.innerHTML = Number(count.innerHTML) +1;
      event.target.nextSibling.classList.remove("textDecorationForTask");
    }

  checkForAll();
  checkForSelected();
  checkForComplited();
}

function clearComplited() {
  const cleaner = document.querySelector(".clear");
  cleaner.addEventListener("click", clickForCleaner);
}

function clickForCleaner() {
  for (let item of document.querySelectorAll(".checkbox")) {
    if (item.checked) item.closest("div").remove();
  }
}


clearComplited();
wrapper();
taskMaker();
