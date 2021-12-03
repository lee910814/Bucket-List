const todoForm = document.getElementById("form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".list");
const todoSpan = document.querySelector(".error");
const allBtn = document.querySelector("#allBtn");
const clock = document.querySelector(".clock");




let toDos =  [];

const TODO_KEY = "toDos"

function saveLocal(){
    localStorage.setItem(TODO_KEY,JSON.stringify(toDos)); //localstorage에 데이터저장
}

function deleteToDo(e){
    const parentList = e.target.parentElement;
    localStorage.removeItem(parentList);
    parentList.remove(); //부모요소 삭제
}

//시계
function homeClock(){
    const span = document.createElement("span");
    let date = new Date();
    let hour = date.getHours();
    let Minites = date.getMinutes();
    let seconds =date.getSeconds();
    clock.appendChild(span);
    clock.innerText = `${hour < 10 ? `0${hour}`:hour}:${Minites < 10 ? `0${Minites}`: Minites}:${seconds < 10 ? `0${seconds}` : seconds}`;
    if(clock <= 12){
        span.innerText = clock + "PM";
    }else{
        span.innerText = "AM";
    }
}

setInterval(homeClock,50);




//리스트 추가
function addList(newTodo){
    const li = document.createElement("li");
    const button = document.createElement("button");
    const check = document.createElement("button");
    const span = document.createElement("span");

    //에러문
    if(!newTodo){
        todoSpan.innerHTML = "입력을 깜빡한 것 같아요"
    }else{
    span.innerHTML = newTodo;
    todoList.appendChild(li);
    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(button);
     todoSpan.innerHTML = "";
     button.className = "far fa-trash-alt" //삭제버튼
     check.className = "fas fa-check" //체크버튼
     check.addEventListener("click",()=>{
         span.style.textDecoration="line-through";
         check.style.color="red";

     });
     button.addEventListener("click",deleteToDo);
}
}


// 전체 삭제


//폼에 입력될때
function saveForm(e){
    e.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    addList(newTodo);
    toDos.push(newTodo);
    saveLocal();
}

todoForm.addEventListener("submit",saveForm);
allBtn.addEventListener("click",allBtn);

const localTodo = localStorage.getItem(TODO_KEY);


if(localTodo !== null){
    const parsed = JSON.parse(localTodo);

    toDos = parsed;
    parsed.map(addList);
}


/*side bar*/
function openNav(){
    document.getElementById("sideNav").style.width="250px"
}
function closeNav() {
    document.getElementById("sideNav").style.width = "0";
  }

