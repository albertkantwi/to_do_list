import todoTasks from './task';

const listDiv = document.querySelector('.list-items');
const LOCAL_STORAGE_KEY = 'todoTasks';

export const saveToLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoTasks));
};

export const addTask = (detail, idx, status) => {
  const task = {
    description: detail,
    completed: status,
    index: idx,
  };

  const singleTask = document.createElement('li');
  singleTask.className = 'display-item';
  singleTask.id = `${task.description}-${task.index}`;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `${task.index}-checkbox`;
  checkbox.name = 'checkbox';
  checkbox.className = 'check-box';
  if (status) {
    checkbox.checked = true;
  }

  const taskDescription = document.createElement('p');
  taskDescription.innerText = task.description;

  singleTask.appendChild(checkbox);
  singleTask.appendChild(taskDescription);

  const threeDotIcon = document.createElement('i');
  threeDotIcon.classList.add('fas', 'fa-ellipsis-v', 'dot-icon');
  threeDotIcon.classList.add(`${task.index}-threedot`);
  singleTask.appendChild(threeDotIcon);
  listDiv.appendChild(singleTask);
};

 export const addNewTask = (inputField, event) => {
  if (event.key === 'Enter' && inputField.value.trim() !== '') {
    const newTaskDescription = inputField.value.trim();
    const newIndex = todoTasks.length + 1;

    addTask(newTaskDescription, newIndex, false);
    const newTask = {
      description: newTaskDescription,
      completed: false,
      index: newIndex,
    };
    todoTasks.push(newTask);
    inputField.value = '';
    saveToLocalStorage();
  }
};

export const deleteTask = (indexes) => {
  indexes.sort((a, b) => b - a);
  indexes.forEach((index) => {
    todoTasks.splice(index, 1);
  });

  for (let i = 0; i < todoTasks.length; i += 1) {
    todoTasks[i].index = i + 1;
  }

  saveToLocalStorage();
};

export const toggleViewMode = (taskElement, index, description) => {
  const deleteIcon = taskElement.querySelector('.delete-icon');
  const threeDotIcon = document.createElement('i');
  threeDotIcon.classList.add('fas', 'fa-ellipsis-v', 'dot-icon');
  threeDotIcon.setAttribute('data-action', 'edit');

  const inputField = taskElement.querySelector('.edit-input');
  inputField.remove();

  const taskDescription = document.createElement('p');
  taskDescription.innerText = description;
  taskElement.appendChild(taskDescription);

  deleteIcon.remove();
  taskElement.appendChild(threeDotIcon);

  todoTasks[index - 1].description = description;
  saveToLocalStorage();
};

export const editTaskDescription = (index, newDescription) => {
  todoTasks[index - 1].description = newDescription;
  saveToLocalStorage();
};

export const toggleEditMode = (taskElement, index) => {
  const threeDotIcon = taskElement.querySelector('.dot-icon');
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fas', 'fa-trash', 'delete-icon');
  deleteIcon.setAttribute('data-action', 'delete');

  const taskDescription = taskElement.querySelector('p');
  const currentDescription = taskDescription.innerText;

  taskDescription.remove();
  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.className = 'edit-input';
  inputField.value = currentDescription;
  taskElement.appendChild(inputField);

  threeDotIcon.remove();
  taskElement.appendChild(deleteIcon);

  inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && inputField.value.trim() !== '') {
      const newDescription = inputField.value.trim();
      editTaskDescription(index, newDescription);
      toggleViewMode(taskElement, index, newDescription);
    }
  });
};