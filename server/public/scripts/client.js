console.log('js');

$(document).ready(readyNow);

function readyNow() {
    console.log('jq');
    getTasks();
}

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((result) => {
        const listOfTasks = result;
        console.log(listOfTasks);
        
    }).catch((error) => {
        alert('initial task pull failed');
        console.log(error);
    })
}