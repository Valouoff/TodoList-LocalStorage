const input = document.getElementById('taskInput')
const btnAddTack = document.getElementById('addBtn')
const btnClear = document.getElementById('clearBtn')

const ulTodo = document.getElementById('taskList')

const nombreTask = document.getElementById('nombreTask')

let tasks = []
let nbTask = 0;

const saveTodo = localStorage.getItem('task')
const nombreTasks = localStorage.getItem('nombre')

if (saveTodo !== null) {
    tasks = JSON.parse(saveTodo)
    render(tasks)
}

if (saveTodo !== null) {
    nbTask = JSON.parse(nombreTasks)
    nombreTask.textContent = nbTask
}

function addTask() {
    tasks.push(input.value)
    localStorage.setItem('task', JSON.stringify(tasks))
    input.value = ''
    nbTask++
    nombreTask.textContent = nbTask
    localStorage.setItem('nombre', JSON.stringify(nbTask))
        
    render(tasks)
}

btnAddTack.addEventListener('click', () => {
    addTask()
})

input.addEventListener('keydown', (e) => {
    if (e.code === "Enter") {
        addTask()
    }
})

function render() {
    ulTodo.innerHTML = ''
    tasks.forEach((task, index) => {
        const liTodo = document.createElement('li')
        const paraList = document.createElement('p')
        const btnDeleteTask = document.createElement('button')
        const inputChange = document.createElement('input')
        liTodo.classList.add('flex')

        paraList.textContent = task
        paraList.classList.add('paralist')
        liTodo.append(paraList)

        btnDeleteTask.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>`
        btnDeleteTask.classList.add('btnDeleteTask')
        liTodo.append(btnDeleteTask)

        inputChange.classList.add('inputChangeName')
        liTodo.append(inputChange)

        ulTodo.append(liTodo)

        btnClear.addEventListener('click', () => {
            tasks.length = 0;
            localStorage.removeItem('task')
            liTodo.remove()
            nbTask = 0
            nombreTask.textContent = nbTask
            localStorage.setItem('nombre', JSON.stringify(nbTask))
        })

        btnDeleteTask.addEventListener('click', () => {
            tasks.splice(index, 1)
            render(tasks)
            localStorage.setItem('task', JSON.stringify(tasks))
            nbTask--
            nombreTask.textContent = tasks.length
            localStorage.setItem('nombre', JSON.stringify(nbTask))
        })

        liTodo.addEventListener('dblclick', () => {
            paraList.style.visibility = 'hidden'
            inputChange.style.display = 'block'
            inputChange.value = task
            inputChange.select()
        })

        inputChange.addEventListener('keydown', (event) => {
            if (event.code === 'Enter') {
                task = inputChange.value
                tasks[index] = task
                paraList.textContent = task
                paraList.style.visibility = 'visible'
                inputChange.style.display = 'none'
                localStorage.setItem('task', JSON.stringify(tasks))
            }
        })
    })
}

const darkMode = document.getElementById('darkMode')

const savedTheme = localStorage.getItem('darkMode');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    darkMode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
                            <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                        </svg>`
} else {
    document.body.classList.remove('dark');
    darkMode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
                            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                        </svg>`
}

darkMode.addEventListener('click', () => {
    let theme = localStorage.getItem('darkMode')
    if (theme === 'light') {
        document.body.classList.add('dark')
        localStorage.setItem('darkMode', 'dark')
        darkMode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
                                <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                            </svg>`
    } else {
        document.body.classList.remove('dark')
        localStorage.setItem('darkMode', 'light')
        darkMode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
                                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                            </svg>`
    }
})