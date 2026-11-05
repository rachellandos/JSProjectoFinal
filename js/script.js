//********************************************* */
//********************************************* */
//**************** MODO NOTURNO *************** */
//********************************************* */
//********************************************* */

document.getElementById('theme-toggle').addEventListener('click', function () {
    let body = document.querySelector('body')
    console.log(body)
    document.body.classList.toggle('modo-noturno');
})

//********************************************* */
//********************************************* */
//**************LOG IN e LOG OUT*************** */
//********************************************* */
//********************************************* */
const loginBtn = document.querySelector("#login-open-btn")
const enterBtn = document.querySelector("#login-btn")
const logoutBtn = document.querySelector("#logout-btn")
const myLoginForm = document.querySelector("#login-form")
const greeting = document.querySelector("#greeting")
let greetingName = document.querySelector("#greeting span")
const greetingGuest = document.querySelector("#greeting-guest")
console.log(loginBtn)
console.log(logoutBtn)
// console.log(UserName)

//********************** Log in */
function login() {
    if (localStorage.getItem("user")) {
        let UserName = localStorage.getItem("user")
        greetingGuest.classList.add("d-none")
        greeting.classList.remove("d-none")
        greetingName.textContent = UserName
        loginBtn.classList.add("d-none")
        logoutBtn.classList.remove("d-none")
    } else {
        let UserName = document.querySelector("#login-name").value
        //armazenar no local storage
        localStorage.setItem("user", UserName);
    }
}

if (enterBtn) {
    enterBtn.addEventListener("click", () => login());
    // loginBtn.addEventListener("click", lunchTime);
}

if (myLoginForm) {
    myLoginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const dataFromForm = new FormData(this);

        if (dataFromForm.get("user") != "" && dataFromForm.get("password") != "") {
            localStorage.setItem("user", dataFromForm.get("user"));

            this.reset();
            document.querySelector("#login-modal .btn-close").click(); // fecha o modal
            login();
        }
        else if (dataFromForm.get("user") == "" || dataFromForm.get("password") == "") {
            alert("Ambos campos são obrigatórios! Tente novamente.")
        }

    });
}

//********************** Log out */
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("user");
        document.location.reload();
    })
}

//********************************************* */
//********************************************* */
//**************ADICIONAR TAREFA*************** */
//********************************************* */
//********************************************* */
const input = document.querySelector("#task-input");
const template = document.querySelector("#task-template");
const list = document.querySelector("#task-list");
let taskForm = document.querySelector("#task-form")
let countTotal = document.querySelector('#count-total')
console.log(countTotal)
let countActive = document.querySelector('#count-active')


taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (input.value.trim() == "") {
        alert("digite pelo menos um caractere")
    }
    else {
        const clone = "<li class="list-group-item task-item d-flex align-items-center gap-3">
            <input class="form-check-input task-check" type="checkbox" aria-label="Marcar como concluída">
            <span class="task-text flex-grow-1"></span>
            <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary btn-edit">Editar</button>
                <button type="button" class="btn btn-outline-danger btn-delete">Remover</button>
            </div>
        </li>";
        clone.querySelector(".task-text").textContent = input.value;
        list.appendChild(clone);

        countTotal.textContent = Number(countTotal.textContent) + 1
        countActive.textContent = Number(countActive.textContent) + 1
    }
})

let editBtn = document.querySelectorAll('.btn-edit')
console.log(editBtn)
for (let button of editBtn) {
    button.addEventListener('click', function () {
        let newTask = prompt("Qual o novo texto que quer colocar?")
        this.closest('.task-item').querySelector('.task-text').textContent = newTask
    })
}

let removeBtn = document.querySelectorAll('.btn-delete')
for (let button of removeBtn) {
    button.addEventListener('click', function () {
        this.closest('.task-item').remove();
        countTotal.textContent = Number(countTotal.textContent) - 1

        if (this.closest('li').classList.contains('completed')) {
            countCompleted.textContent = Number(countCompleted.textContent)
        }
        else {
            countActive.textContent = Number(countActive.textContent) - 1
        }
    })
}

//********************************************* */
//********************************************* */
//**************CONTADOR TAREFAS*************** */
//********************************************* */
//********************************************* */
let taskList = document.querySelector("#task-list")
let countCompleted = document.querySelector('#count-completed')

taskList.addEventListener('change', function (e) {
    if (!e.target.classList.contains("task-check")) return

    if (e.target.checked) {
        e.target.closest('li').classList.add("completed")
        countActive.textContent = Number(countActive.textContent) - 1
        countCompleted.textContent = Number(countCompleted.textContent) + 1
    } else {
        e.target.closest('li').classList.remove("completed")
        countActive.textContent = Number(countActive.textContent) + 1
        countCompleted.textContent = Number(countCompleted.textContent) - 1
    }


})


//********************************************* */
//********************************************* */
//******************* FILTRO ****************** */
//********************************************* */
//********************************************* */

let filtroTarefas = document.querySelector('#filters')
let itemsTarefas = document.querySelectorAll('.filter-btn')
console.log(filtroTarefas)



for (let item of itemsTarefas) {
    item.addEventListener("click", function (e) {
        e.preventDefault();

        for (let uncheck of itemsTarefas) {
            uncheck.classList.remove('active')
        }

        item.classList.add('active')

        const filter = item.getAttribute("data-filter")
        const tarefas = document.querySelectorAll('.task-item')

        for (let task of tarefas) {
            const done = task.classList.contains('completed')

            if (filter == 'all') {
                task.classList.remove('d-none')
            } else if (filter == 'active') {
                task.classList.toggle('d-none', done)
            } else {
                task.classList.toggle('d-none', !done)
            }
        }

    })
}

//********************************************* */
//********************************************* */
//******************* Editar ****************** */
//********************************************* */
//********************************************* */




// for (let button of editBtn){
// button.addEventListener('click', function() {
//     alert("Qual o novo texto que quer colocar?")
// })
// }


//********************************************* */
//********************************************* */
//******************** API ******************** */
//********************************************* */
//********************************************* */

const weatherLoading = document.querySelector("#weather-loading");
const weatherError = document.querySelector("#weather-error");
const weatherContent = document.querySelector("#weather-content");

fetch("https://api.open-meteo.com/v1/forecast?latitude=38.72&longitude=-9.14&current=temperature_2m,wind_speed_10m,weather_code")
    .then(response => response.json())
    .then(data => {
        document.querySelector("#weather-temp").textContent = (data.current.temperature_2m) + "°C";
        document.querySelector("#weather-desc").textContent = getDescription(data.current.weather_code);

        weatherLoading.classList.add("d-none");
        weatherContent.classList.remove("d-none");
    })
    .catch(() => {
        weatherLoading.classList.add("d-none");
        weatherError.textContent = "Não foi possível carregar o tempo.";
        weatherError.classList.remove("d-none");
    });

// A API devolve um código WSO
function getDescription(code) {
    if (code === 0) return "Céu limpo";
    if (code <= 3) return "Parcialmente nublado";
    if (code <= 48) return "Nevoeiro";
    if (code <= 67) return "Chuva";
    if (code <= 77) return "Neve";
    if (code <= 82) return "Aguaceiros";
    return "Trovoada";
}