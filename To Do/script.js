// script.js

document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const searchBar = document.getElementById('search-bar');
    const clearCompletedButton = document.getElementById('clear-completed');
    const calendar = document.getElementById('calendar');

    function addTask() {
        const taskText = newTaskInput.value.trim();
        const taskCategory = document.getElementById('task-category').value.trim();
        const taskDate = document.getElementById('task-date').value;
        const taskPriority = document.getElementById('task-priority').value;

        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.classList.add(`priority-${taskPriority}`);

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;

        if (taskCategory) {
            const categoryBadge = document.createElement('span');
            categoryBadge.textContent = taskCategory;
            categoryBadge.classList.add('category-badge');
            taskContent.appendChild(categoryBadge);
        }

        if (taskDate) {
            const dateBadge = document.createElement('span');
            dateBadge.textContent = taskDate;
            dateBadge.classList.add('date-badge');
            taskContent.appendChild(dateBadge);
            scheduleNotification(taskText, new Date(taskDate));
        }

        taskItem.appendChild(taskContent);

        taskItem.addEventListener('click', function() {
            taskItem.classList.toggle('completed');
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskItem.remove();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            editTask(taskItem, taskContent, taskCategory, taskDate, taskPriority);
        });

        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        newTaskInput.value = '';
        document.getElementById('task-category').value = '';
        document.getElementById('task-date').value = '';
        document.getElementById('task-priority').value = 'low';
        newTaskInput.focus();
    }

    function editTask(taskItem, taskContent, taskCategory, taskDate, taskPriority) {
        newTaskInput.value = taskContent.textContent;
        document.getElementById('task-category').value = taskCategory;
        document.getElementById('task-date').value = taskDate;
        document.getElementById('task-priority').value = taskPriority;

        taskItem.remove();
    }

    function scheduleNotification(task, date) {
        const now = new Date();
        const timeDifference = date.getTime() - now.getTime();
        if (timeDifference > 0) {
            setTimeout(() => {
                new Notification(`Reminder: ${task}`);
            }, timeDifference);
        }
    }

    function filterTasks() {
        const searchTerm = searchBar.value.toLowerCase();
        const tasks = taskList.getElementsByTagName('li');
        Array.from(tasks).forEach(task => {
            const taskText = task.textContent.toLowerCase();
            if (taskText.includes(searchTerm)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    }

    function clearCompletedTasks() {
        const tasks = taskList.getElementsByClassName('completed');
        Array.from(tasks).forEach(task => {
            task.remove();
        });
    }

    function renderCalendar() {
        // Placeholder for calendar rendering logic
        // You can use a library like FullCalendar (https://fullcalendar.io/) for advanced calendar features
        calendar.innerHTML = '<p>Calendar View (Under Construction)</p>';
    }

    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
