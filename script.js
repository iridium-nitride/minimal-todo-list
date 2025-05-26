const list = document.querySelector(`#list`);
const input = document.querySelector(`#input`);
const submit = document.querySelector(`#submit`);

let tasks = JSON.parse(localStorage.getItem(`tasks`)) || [];

render();

submit.addEventListener(`click`, () => {
    const task = input.value.trim();
    input.value = ``;

    if (task !== ``){
        tasks.push({text: task, status: `notStarted`, notes: ``});
        input.value = ``;
        render();
    }
    else{
        alert(`please enter a task`);
    }
})

function render(){
    list.innerHTML = ``;

    tasks.forEach((task, index) => {
        const li = document.createElement(`li`);
        li.textContent = task.text;

        const status = document.createElement(`button`);
        status.classList.add(`status`, task.status);
        status.textContent = task.status !== `inProgress` ? `not started` : `in progress`;

        const notes = document.createElement(`input`);
        notes.classList.add(`notes`);
        notes.value = task.notes;

        notes.addEventListener(`input`, () => {
            task.notes = notes.value;
            localStorage.setItem(`tasks`, JSON.stringify(tasks));
        })

        const del = document.createElement(`button`);
        del.classList.add(`delete`);
        del.textContent = `x`;

        del.addEventListener(`click`, () => {
            tasks.splice(index, 1);
            render();
        })

        status.addEventListener(`click`, () => {
            task.status = task.status === `notStarted` ? `inProgress` : `notStarted`;
            render();
        })

        li.appendChild(status);
        li.appendChild(notes);
        li.appendChild(del);
        list.appendChild(li);
    })

    localStorage.setItem(`tasks`, JSON.stringify(tasks));
}