let tasks = [];

function addtask(){
  let tasktext = document.getElementById("inputtext").value;
  if(tasktext === "") return;

  let task = { text: tasktext, done:false };
  tasks.push(task);
  saveTasks();
  displayTasks();
  document.getElementById("inputtext").value="";
}

function displayTasks(){
  let list = document.getElementById("TaskList");
  list.innerHTML="";

  tasks.forEach((task,index)=>{
    let li = document.createElement("li");

  
    let span = document.createElement("span");
    span.classList.add("text");
    span.textContent = task.text;
    if(task.done) span.classList.add("done");
    li.appendChild(span);

    
    let doneBtn = document.createElement("button");
    doneBtn.textContent = "✔";
    doneBtn.onclick = ()=> toggleTask(index);
    li.appendChild(doneBtn);


    let delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = ()=> deleteTask(index);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

function toggleTask(i){
  tasks[i].done = !tasks[i].done;
  saveTasks();
  displayTasks();
}

function deleteTask(i){
  tasks.splice(i,1);
  saveTasks();
  displayTasks();
}

function saveTasks(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){
  let saved = localStorage.getItem("tasks");
  if(saved){
    tasks = JSON.parse(saved);
    displayTasks();
  }
}

loadTasks();