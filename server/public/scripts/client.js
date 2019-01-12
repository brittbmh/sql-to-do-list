

$(document).ready(readyNow);

function readyNow() {
    getTasks();
    $('#input-tasks').on('submit', addNewTask);
    $('#task-list-body').on('click', '.update-status', updateStatus)
}

function updateStatus() {
    console.log($(this).data('taskid'));
    $.ajax({
        method: 'PUT',
        url: '/tasks'
    }).then((result) => {
        getTasks();
    }).catch((error) => {
        alert('unable to update task');
        console.log('Error in PUT /tasks', error);
    })
}

function addNewTask(event) {
    event.preventDefault();
    console.log('In function addNewTask');
    const newTask = { task: $('#task-name').val()};
    console.log(newTask);
    
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then((result) => {
        console.log(result);
        getTasks();
    }).catch((error) => {
        alert('unable to add task');
        console.log(error);
    })
}

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((result) => {
        const listOfTasks = result;
        console.log(listOfTasks);
        $('#task-list-body').empty();
        for (task of listOfTasks) {
            let status;
            if(task.completed === true){
                status = 'completed';
            } else if (task.completed === false){
                status = 'not done';
            } else {
                alert('can not complete request')
            };
            $('#task-list-body').append(`<tr>
                                            <td>${task.task}</td>
                                            <td>${status}</td>
                                            <td>
                                                <button class="update-status"
                                                    data-taskid="${task.id}">Update</button>
                                            </td>
                                            <td>
                                                <button class="remove-task"
                                                    data-taskid="${task.id}">Delete</button>
            </tr>`)
        }
    }).catch((error) => {
        alert('initial task pull failed');
        console.log(error);
    })
}