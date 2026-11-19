let tasks = []
let tasksHolder = document.getElementById("taskItems")


// UI Coisas

function showAndHideTaskPopup(){
    const popupOverlay    = document.getElementById('popupOverlay');
    popupOverlay.classList.toggle('show');
}

function updateTaskElements() {
    tasksHolder.replaceChildren();

    // be refatored
    for (let i in tasks) {
        let taskObj = tasks[i];

       tasksHolder.appendChild(taskObj.htmlElement);
    }
}

function turnElementDisplay(elementId, booleano) {
    if (booleano == true) {
        document.getElementById(elementId).style.display = "" ;
    } else if (booleano == false) {
        document.getElementById(elementId).style.display = "none";
    }
}

function updateDashboardTasksElements(){
    let summary = getSummarizeOfTasks();
    console.log(summary);

    const t0 = document.getElementById("tasksCompletedNum");
    const t1 = document.getElementById("tasksRemainingNum");
    const t2 = document.getElementById("tasksCountNum");

    t0.textContent = summary.tasksDone;t1.textContent = summary.tasksRemaining;t2.textContent = summary.totalTasks;
}

// Funcoes principais
function createTaskObj(taskName, taskDate) {
    let taskIndex  = tasks.length;

    let object = {
        index: taskIndex,

        name: taskName,
        date: taskDate,

        htmlElement: document.createElement("div"),
        done: false,
        createdTime: Date.now(),

        update : function(){
            let buttonText = this.done ? "desmarcar" : "pronto";
            let boolean    = !this.done;

            console.log(`${boolean}, nunca e ${buttonText}`);

            this.htmlElement.innerHTML = innerHTML = ` 
                <div id="taskItem">
                    <div>
                        <h6>${taskName}</h6>
                        <p>${taskDate}</p>
                    </div>
            
                    <div>
                        <button onclick="changeTaskStatus(${this.index}, ${boolean})" id="btn-${buttonText}">${buttonText.toUpperCase()}</button>
                        <button onclick="removeTask(${this.index})"id="btn-remove">Remove</button>
                    </div>
            </div>`;


        },

        destroy : function () {
    
        }
    }

    tasks[taskIndex] = object;
    object.update();
    console.log(tasks);
}

function addTask() {
    let taskName   = document.getElementById("nomeFazer").value;
    let taskDate   = document.getElementById("dataFazer").value;
 
    createTaskObj(taskName, taskDate);
    updateDashboardTasksElements();
    updateTaskElements();
}

function changeTaskStatus(taskIndex, newStatus){
    //alert(`Updated task status: ${taskName}, ${newStatus}`);
    if (taskIndex != null) {
        tasks[taskIndex].done = newStatus;
        tasks[taskIndex].update();

        updateDashboardTasksElements();
    }
}

function removeTask(taskId) {
    tasks = tasks.filter(t => t.index !== taskId);
    updateTaskElements();
    updateDashboardTasksElements();
}



function getSummarizeOfTasks(){
    let taskNumDone    = 0;
    tasks.forEach((element) => { console.log("indo"); if (element.done == true){ taskNumDone++;}})


    return {
        totalTasks: tasks.length,
        tasksDone : taskNumDone,
        tasksRemaining : (tasks.length - taskNumDone),
    }
};


function start() {
    function updateUserDateParagraph() {
        document.getElementById("userDateParagraph").textContent = (new Date().toLocaleDateString('pt-br', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));

    }

    function updateUserNicknameLabel(newName) {
        let name = newName;

        document.getElementById("nicknameLabel").textContent = "Good night" + newName;
    };

    // --[Eventos]
    document.querySelector("#taskForm").addEventListener("submit", (e) => {
        e.preventDefault();
        showAndHideTaskPopup();
        addTask();
    })

    // -- []
    turnElementDisplay("tasksDiv", true);
   // updateTaskElements();
    updateUserNicknameLabel("");
    updateUserDateParagraph();
}


start();

