import { v4 as uuidV4 } from "uuid";

type Task = {
    id: string,
    title: string,
    completed: boolean,
    createdAt: Date
}


const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#taskform");
const input = document.querySelector<HTMLInputElement>("#inputtask");
const button = document.querySelector<HTMLButtonElement>("#submittask");
const tasks: Task[] = loadTasks();
tasks.forEach(addTask);

form?.addEventListener("submit", e => {
    e.preventDefault();

    if (input?.value == "" || input?.value == null) return;

    const newTask: Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    tasks.push(newTask);
    saveTasks();
    addTask(newTask);
    input.value = "";
})

function addTask(task: Task) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks();
    })
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    label.append(checkbox, task.title);
    item.append(label);
    list?.append(item);
}

function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("TASKS");
    if (taskJSON == null) return []
    return JSON.parse(taskJSON);
}