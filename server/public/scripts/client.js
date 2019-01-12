

$(document).ready(readyNow);

function readyNow() {
    getTasks();
}

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((result) => {
        const listOfTasks = result;
        console.log(listOfTasks);
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