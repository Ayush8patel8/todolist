// script.js
document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');
    const notification = document.querySelector('.notification');

    addTaskBtn.addEventListener('click', function() {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') {
            showNotification('Please enter a task.');
            return;
        }
        addTask(taskText);
        newTaskInput.value = '';
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', function() {
            const newText = prompt('Edit task:', textSpan.textContent);
            if (newText !== null && newText.trim() !== '') {
                textSpan.textContent = newText;
                showNotification('Task updated successfully.');
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            updateTaskCount();
            showNotification('Task deleted successfully.');
        });

        li.appendChild(textSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            showNotification('Task status updated.');
        });

        taskList.appendChild(li);
        li.classList.add('fade-in');
        updateTaskCount();
    }

    function updateTaskCount() {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.completed').length;
        taskCount.textContent = `Total Tasks: ${totalTasks}, Completed: ${completedTasks}`;
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }
});
