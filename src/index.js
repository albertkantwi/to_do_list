// import _ from 'lodash';
import './style.css';
import { renderTaskList, addNewTask } from './modules/addremove.js';

document.addEventListener('DOMContentLoaded', () => {
  renderTaskList();

  const newTask = document.querySelector('.new-task');
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskDescription = newTask.value;
    if (taskDescription.trim() === '') {
      return;
    }

    addNewTask(taskDescription);
    newTask.value = '';
    renderTaskList();
  });
});