//********************************************* */
//********************************************* */
//**************** MODO NOTURNO *************** */
//********************************************* */
//********************************************* */

const themeBtn = document.getElementById('theme-toggle')

if (localStorage.getItem('modo') == 'noturno') {
    document.body.classList.add('modo-noturno')
}
themeBtn.addEventListener('click', function () {
    document.body.classList.toggle('modo-noturno')

    if (document.body.classList.contains('modo-noturno')) {
        localStorage.setItem('modo', 'noturno')
    } else {
        localStorage.setItem('modo', 'claro')
    }
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
        greetingGuest.classList.add("d-none")
        greeting.classList.remove("d-none")
        greetingName.textContent = localStorage.getItem("user")
        loginBtn.classList.add("d-none")
        logoutBtn.classList.remove("d-none")
    }
}

login()
if (enterBtn) {
    enterBtn.addEventListener("click", () => login());
    // loginBtn.addEventListener("click", lunchTime);
}

if (myLoginForm) {
    myLoginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const dataFromForm = new FormData(this);

        if (dataFromForm.get("user").trim() != "") {
            if (dataFromForm.get("password").trim() == "") {
                alert("A palavra passe não pode estar vazia e não pode incluir unicamente espaços.")
            }
            else {
                localStorage.setItem("user", dataFromForm.get("user"));

                this.reset();
                document.querySelector("#login-modal .btn-close").click(); // fecha o modal
                login();
            }
        }
        else {
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
const inputTask = document.querySelector("#task-input");
const listContainer = document.querySelector("#task-list");
const taskForm = document.querySelector("#task-form")
const countTotal = document.querySelector('#count-total')
console.log(countTotal)
const countActive = document.querySelector('#count-active')
const countCompleted = document.querySelector('#count-completed')
const emptyMessage = document.querySelector('#empty-message')

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (inputTask.value.trim() == "") {
        alert("digite pelo menos um caractere")
    }
    else {
        const li = document.createElement("li")
        li.className = "list-group-item task-item d-flex align-items-center gap-3"

        li.innerHTML = `
            <input class="form-check-input task-check" type="checkbox" aria-label="Marcar como concluída">
            <span class="task-text flex-grow-1">`+ inputTask.value + `</span>
            <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary btn-edit">Editar</button>
                <button type="button" class="btn btn-outline-danger btn-delete">Remover</button>
            </div>`
        listContainer.appendChild(li);

        countTotal.textContent = Number(countTotal.textContent) + 1
        countActive.textContent = Number(countActive.textContent) + 1
        emptyMessage.classList.add('d-none')
        this.reset()
    }
})

//********************************************* */
//********************************************* */
//************* ATUALIZAR TAREFA ************** */
//********************************************* */
//********************************************* */

listContainer.addEventListener('click', function (e) {
    const item = e.target.closest('.task-item')

    // EDITAR
    if (e.target.classList.contains('btn-edit')) {
        let newTask = prompt("Qual o novo texto que quer colocar?")

        if (newTask !== null && newTask.trim() !== "") {
            item.querySelector('.task-text').textContent = newTask
        }
    }
    // REMOVER
    else if (e.target.classList.contains('btn-delete')) {
        item.remove();
        countTotal.textContent = Number(countTotal.textContent) - 1
        if (countTotal.textContent == 0) {
            emptyMessage.classList.remove('d-none')

        }

        if (item.classList.contains('completed')) {
            countCompleted.textContent = Number(countCompleted.textContent) - 1
        }
        else {
            countActive.textContent = Number(countActive.textContent) - 1
        }
    }
})

//********************************************* */
//********************************************* */
//*********MARCAR TAREFAS COMPLETADAS********** */
//********************************************* */
//********************************************* */

listContainer.addEventListener('change', function (e) {
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

let itemsTarefas = document.querySelectorAll('.filter-btn')

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
//**************** DATA e HORA **************** */
//********************************************* */
//********************************************* */

const currentDate = document.querySelector('#current-date')
const currentTime = document.querySelector('#current-time')

setInterval(function () {
    const data = new Date().toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit", year: "2-digit" })
    const hora = new Date().toLocaleTimeString("pt-PT", { hour: "numeric", minute: "2-digit", second: "2-digit" })

    currentDate.textContent = data
    currentTime.textContent = hora

});



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