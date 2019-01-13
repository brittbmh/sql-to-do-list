

$(document).ready(readyNow);

function readyNow() {
    getTasks();
    $('#input-tasks').on('submit', addNewTask);
    $('#task-list-body').on('click', '.update-status', updateStatus)
    $('#task-list-body').on('click', '.remove-task', deleteTask)
    $('#status-button').on('click', '#hide-complete', hideCompleted)
    $('#status-button').on('click', '#show-all', getTasks)

}

let hideStatus;

function hideCompleted() {
    console.log('in hideCompleted');
    hideStatus = 'hidden';
    $.ajax({
        method: 'GET',
        url: '/tasks/hidden'
    }).then((result) => {
        console.log(result);
        $('#status-button').empty();
        $('#status-button').append(`
            <button class="btn btn-outline-primary btn-sm" id="show-all">show all tasks</button>`
        );
        const listOfTasks = result;
        $('#task-list-body').empty();
        for (task of listOfTasks) {
            $('#task-list-body').append(`<tr>
                                            <td>${task.task}</td>
                                            <td>not done</td>
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
        console.log('Error in hidden GET', error);
        swal('unable to load task list')
    })
}

function deleteTask() {
    const taskId = ($(this).data('taskid'));
    console.log(taskId);
    swal({
        title: 'wait a tic... ',
        text: 'click confirm to delete the task',
        icon: 'warning',
        buttons: true
    }).then((willDelete) => {
        if (willDelete) {
            swal("task removed", {
                icon: 'success',
            })
            $.ajax({
                method: 'DELETE',
                url: `/tasks/${taskId}`
            }).then((result) => {
                if (hideStatus === 'hidden') {
                    hideCompleted();
                } else {
                    getTasks();
                }
            }).catch((error) => {
                swal('unable to delete task');
                console.log('Error in DELETE /tasks', error);
            });
        } else {
            swal('task remains')
        };
    });
}

function updateStatus() {
    console.log($(this).data('taskid'));
    const taskId = ($(this).data('taskid'));
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`
    }).then((result) => {
        if (hideStatus === 'hidden') {
            hideCompleted();
        } else {
            getTasks();
        }
    }).catch((error) => {
        swal('unable to update task');
        console.log('Error in PUT /tasks', error);
    })
}

function addNewTask(event) {
    event.preventDefault();
    console.log('In function addNewTask');
    const newTask = { task: $('#task-name').val() };
    console.log(newTask);

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then((result) => {
        console.log(result);
        if (hideStatus === 'hidden') {
            hideCompleted();
        } else {
            getTasks();
        }
    }).catch((error) => {
        swal('unable to add task');
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
        hideStatus = 'show';
        $('#task-list-body').empty();
        $('#status-button').empty();
        $('#status-button').append(`
            <button class="btn btn-outline-primary btn-sm" id="hide-complete">hide completed tasks</button>`
        );
        for (task of listOfTasks) {
            let status;
            if (task.completed === true) {
                status = 'completed';
            } else if (task.completed === false) {
                status = 'not done';
            } else {
                swal('can not complete request')
            };
            $('#task-list-body').append(`<tr class="${status}">
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
        swal('initial task pull failed');
        console.log(error);
    })
}

