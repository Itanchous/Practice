document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const categoryInput = document.getElementById('categoryInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const taskText = taskInput.value.trim();
    const taskDueDate = dueDateInput.value;
    const taskCategory = categoryInput.value.trim();
    const taskPriority = prioritySelect.value;

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        const editButton = document.createElement('button');
        
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(taskItem);
        });

        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.addEventListener('click', function() {
            taskInput.value = taskText;
            dueDateInput.value = taskDueDate;
            categoryInput.value = taskCategory;
            prioritySelect.value = taskPriority;
            taskList.removeChild(taskItem);
        });

        taskItem.classList.add(taskPriority);
        taskItem.innerHTML = `<span>${taskText}</span> <span>[${taskCategory}]</span> <span>(${taskDueDate})</span>`;
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        taskItem.addEventListener('click', function(event) {
            if (event.target.tagName !== 'BUTTON') {
                taskItem.classList.toggle('completed');
            }
        });

        taskInput.value = '';
        dueDateInput.value = '';
        categoryInput.value = '';
        prioritySelect.value = 'low';
    }
});

document.getElementById('filterInput').addEventListener('input', function() {
    const filterText = this.value.trim().toLowerCase();
    const tasks = document.getElementById('taskList').getElementsByTagName('li');

    Array.from(tasks).forEach(task => {
        const taskCategory = task.textContent.toLowerCase();
        if (taskCategory.includes(filterText)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
});
