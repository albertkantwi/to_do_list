// import _ from 'lodash';
import './style.css';
import todoTasks from './modules/task';
import {
  addTask,
  addNewTask,
  deleteTask,
  toggleEditMode,
  saveToLocalStorage,
} from './modules/addremove';

const listDiv = document.querySelector('.list-items');
const clearBtn = document.querySelector('.clear');
const inputField = document.querySelector('.task');

const buildTask = () => {
  listDiv.innerHTML = '';
  todoTasks.forEach((task) => {
    addTask(task.description, task.index, task.completed);
  });

  const checkboxes = document.querySelectorAll('.check-box');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const index = Number(checkbox.id.split('-')[0]);
      const status = todoTasks[index - 1].completed;
      todoTasks[index - 1].completed = !status;
      saveToLocalStorage();
    });
  });
  saveToLocalStorage();
};

inputField.addEventListener('keydown', (event) => {
  addNewTask(inputField, event);
});

clearBtn.addEventListener('click', () => {
  const completedIndexes = todoTasks.reduce((indexes, task, index) => {
    if (task.completed) indexes.push(index);
    return indexes;
  }, []);

  if (completedIndexes.length > 0) {
    deleteTask(completedIndexes);
    buildTask();
  }
});

listDiv.addEventListener('click', (event) => {
  const { target } = event;
  const taskElement = target.closest('.display-item');

  if (!taskElement) return;

  const index = Number(taskElement.id.split('-')[1]);

  if (target.classList.contains('dot-icon') || target.classList.contains('delete-icon')) {
    const dataAction = target.getAttribute('data-action');
    if (dataAction === 'edit') {
      toggleEditMode(taskElement, index);
    } else if (dataAction === 'delete') {
      deleteTask([index - 1]);
      buildTask();
    }
  } else if (target.tagName === 'P') {
    toggleEditMode(taskElement, index);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('todoTasks'));
  if (data) {
    todoTasks.length = 0;
    data.forEach((task) => {
      todoTasks.push(task);
    });
  }
  buildTask();
});