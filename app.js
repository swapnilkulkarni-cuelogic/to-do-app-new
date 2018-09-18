class ToDo {
    constructor( toDoName, toDoStartDate, toDoEndDate ) {
        this.name       = toDoName;
        this.startDate  = toDoStartDate;
        this.endDate    = toDoEndDate;
    }
}

class UI {
    addTask( objToDoTask ) {
        const toDoList = document.getElementById('todolist');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Task</strong>: ${objToDoTask.name}   ||
                    <strong>Start Date</strong>: ${objToDoTask.startDate} ||  
                    <strong>End Date</strong>: ${objToDoTask.endDate}
                    <a href="#" class="btn btn-danger" name="delete">Mark Complete</a>
                </div>
            </div>
        `;
        toDoList.appendChild( element );
    }

    resetForm() {
        document.getElementById( 'todoform' ).reset();
    }

    removeTask( element ) {
        if ( element.name === 'delete' ) {
            element.parentElement.parentElement.remove();
            this.showMessage( 'Task Deleted Succsssfully', 'success' );
        }
    }

    showMessage( strMessage, strCssClass ) {
        const div = document.createElement('div');

        div.className = `alert alert-${strCssClass} mt-2`;
        div.appendChild( document.createTextNode( strMessage ) );

        const container = document.querySelector('.container');
        const app = document.querySelector( '#App' );

        container.insertBefore( div, app );

        setTimeout( function() {
            document.querySelector( '.alert' ).remove();
        }, 3000 );
    }
}

document.getElementById( 'todoform' ).addEventListener('submit', function( e ) {

        const toDoItem  = document.getElementById( 'todoitem' ).value,
              startDate = document.getElementById( 'startDate' ).value,
              endDate   = document.getElementById( 'endDate' ).value;

        if ( toDoItem === '' || startDate === '' || endDate === '' ) {
            alert( 'Please Insert data in all fields', 'danger' );
            return;
        }

        const objToDoTask = new ToDo( toDoItem, startDate, endDate );

        const objUI       = new UI();

        objUI.addTask( objToDoTask );

        localStorage.setItem( "ToDo", objToDoTask );
        objUI.showMessage( 'To Do Task Created Successfully', 'success' );
        objUI.resetForm();

        e.preventDefault();
    });

document.getElementById( 'todolist' ).addEventListener('click', function (e) {
        const objUI = new UI();
        objUI.removeTask( e.target );
        e.preventDefault();
    });

