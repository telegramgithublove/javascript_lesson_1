function spilitEvenOdd(numbers) {
  const even = [];
  const odd =[];

  for (let num of numbers) {
    if (num % 2 ===  0) {
      even.push(num)
    } else {
      odd.push(num)
    }
  } return { even, odd }
}

console.log(spilitEvenOdd([1, 2, 3, 4, 5, 6]))


function isPolidrom(str) {
  const normolazed = str.toLowerCase().replace(/\s/g, '');
  return normolazed === normolazed.split('').reverse().join('');
}

console.log(isPolidrom('топот')) // true
console.log(isPolidrom('Heloo'))

function factorial(n) {
  if (n === 0 || n === 1) return 1
  return n * factorial(n - 1)
}

console.log(factorial(5)) // 120


function uniqueArra(arr) {
  return [...new Set(arr)]
}

console.log(uniqueArra([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]

function fibonachi(n) {
  const result = [0, 1]

  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i -2]);  
}
    return result;
}

console.log(fibonachi(7));

function reverseString(str) {
  return str.split('').reverse().join('')
}

console.log(reverseString('Hellow'))

function isAnagram(str1, str2) {
  const normolaze = str => str.toLowerCase().split('').sort().join('')
  return normolaze(str1) === normolaze(str2)
}

console.log(isAnagram('listen', 'silent')) // true
console.log(isAnagram('hellow', 'word')) // false


function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}



console.log(findIndex([1, 2, 3, 4, 5], 3));
console.log(findIndex([1, 2, 3, 4, 5], 6));

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

console.log(isPrime(7)); //true

console.log(isPrime(10)); //false


async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
    const data = await response.json();
    console.log(data);

  } catch (error) {
      console.log('Произошла ошибка:', error)
  }
}

fetchData('https://jsonplaceholder.typicode.com/todos/1')

// To-Do List

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

//добовление новой задачи

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText) {
    addTask(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = ''; // Очистить поле ввода
  }
});

// Обработка кликов по задачам

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    deleteTask(event.target.parentElement);
  } else if (event.target.tagName === 'LI') {
    toggleTaskCompletion(event.target);
  }
});



//Добавить addTask

function addTask(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Отметить задачу как выполненную/невыполненную

function toggleTaskCompletion(taskElement) {
  taskElement.classList.toggle('completed');
  updateTaskStatusInLocalStorage(taskElement.textContent);
}

// Удалить задачу

function deleteTask(taskElement) {
  removeTaskFromLocalStorage(taskElement.textContent);
  taskElement.remove();
}


function saveTaskToLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatusInLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  const task = tasks.find(t => t.text === taskText.replace('Delete', '').trim());
  if (task) task.completed = !task.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(t => t.text !== taskText.replace('Delete', '').trim());
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}



function loadTasksFromLocalStorage() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(task => {
    addTask(task.text);
    if (task.completed) {
      const lastTask = taskList.lastElementChild;
      lastTask.classList.add('completed');
    }
  });
}

