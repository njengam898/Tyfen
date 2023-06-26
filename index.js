const icon =document.querySelector(".toggle-btn")
const upper = document.querySelector(".upper");
const lower = document.querySelector(".lower");
const add = document.querySelector(".add");
const cl = document.querySelector(".close");
const taskForm = document.querySelector("#taskForm");
const tasksList = document.querySelector("#tasksList");
const otherTaskslist = document.querySelector("#otherTasksList")
const taskName = document.querySelector("#task-name").value;
const imageUrl = document.querySelector("#im").value;
const taskDate = document.querySelector("#date").value;

const taskArray = []

icon.addEventListener("click",()=>{
    if (icon.className === "bi bi-plus-circle toggle-btn") {
        icon.className = "bi bi-x-circle toggle-btn";
        add.style.display = "none"
        cl.style.display = "flex"
    } else {
        icon.className = "bi bi-plus-circle toggle-btn";
        cl.style.display = "none"
        add.style.display = "flex"
    }
})

let bestStreak = null;

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    // addTask();

    const taskName = document.querySelector("#task-name").value;
    const imageUrl = document.querySelector("#im").value;
    const taskDate = document.querySelector("#date").value;

    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = "SUCCESS.";
    document.querySelector(".success").style = "background-color: background: rgb(26, 234, 241);"
    successMessage.classList.add("show");

    // Remove the success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove("show");
    }, 5000);

    const task = {
        name: taskName,
        image: imageUrl,
        date: taskDate
    };

    taskArray.push(task)

    if (isNewBestStreak(task.date)) {
        addTaskToBestStreak(task);
      } else {
        addTaskToOtherStreaks(task);
     }
    
    //   document.getElementById('task-name').value = '';
    //   document.getElementById('im').value = '';
    //   document.getElementById('date').value = '';
});


function isNewBestStreak(date) {
    // Get the current best streak date
    const bestStreakDate = tasksList.children[0]?.dataset.date;
  
    // If there is no best streak or the new date is older, it is a new best streak
    return !bestStreakDate || date < bestStreakDate;
}

function addTaskToBestStreak(task) {

    if (bestStreak) {
        addTaskToOtherStreaks(bestStreak);
      }
    
      // Set the new best streak
      bestStreak = task;    
  
    // Create a new task element
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.dataset.date = task.date;
  
    // Set the task content
    taskElement.innerHTML = `
      <img src="${task.image}" alt="Task Image">
      <h4>${task.name}</h4>
      <p>${task.date}</p>
    `;
  
    // Add the task to the best streak section
    tasksList.innerHTML = '';
    tasksList.appendChild(taskElement);
}


const createModal = (task)=>{
    let itemsArray = Array.from(otherTaskslist.children)
    itemsArray.forEach((task)=>{
        task.addEventListener("click", ()=> {Modalcreate(task)});
    })
    tasksList.addEventListener("click", ()=> {Modalcreate(tasksList)});
}

const Modalcreate = (task) => {
    let taskDisplay = document.querySelector(".overlay")
    let taskid = task.getAttribute("id");
    let taskImage = task.querySelector("img").getAttribute("src");
    let taskName = task.querySelector("h4").textContent;
    let taskDate = task.querySelector("p").textContent;

    let Modal = document.createElement('div');
    Modal.classList.add('modal')

    Modal.innerHTML = `
      <img src="${taskImage}" alt="Task Image">
      <h4>${taskName}</h4>
      <p>${taskDate}</p>
      <button type="submit">CLOSE</button>
      <button type="submit">DELETE</button>
      `
      while(taskDisplay.firstChild){
        taskDisplay.removeChild(taskDisplay.firstChild)
      }

      taskDisplay.appendChild(Modal)
}


function addTaskToOtherStreaks(task) {
    // Create a new task element
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.dataset.date = task.date;
  
    // Set the task content
    taskElement.innerHTML = `
      <img src="${task.image}" alt="Task Image">
      <h4>${task.name}</h4>
      <p>${task.date}</p>
    `;
  
    // Add the task to the other streaks section
    otherTaskslist.appendChild(taskElement);
    createModal();
}


// Get the modal and overlay elements
// const modal = document.getElementById("modal");
// const overlay = document.getElementById("overlay");
// // Add event listeners to open and close the modal
// taskImage.addEventListener("click", function(event) {
// if (event.target.classList.contains("task-image")) {
//     tasksList.foreach((task)=>{})
//     const imageSrc = task.querySelector(".task-image img").src;
//     const taskName = task.querySelector(".task-name").textContent;
//     const taskDate = task.querySelector(".task-date").textContent;

// // Set the modal content
// document.getElementById("modal-image").src = imageSrc;
// document.getElementById("modal-task-name").textContent = taskName;
// document.getElementById("modal-task-date").textContent = taskDate;

// // Show the modal and overlay
// modal.style.display = "block";
// overlay.classList.add("show");
// document.body.classList.add("noscroll");
// }
// });

// // Close the modal when the close button is clicked
// document.querySelector(".clos").addEventListener("click", function() {
// closeModal();
// });

// // Close the modal when the overlay is clicked
// overlay.addEventListener("click", function() {
// closeModal();
// });

// // Function to close the modal
// function closeModal() {
// modal.style.display = "none";
// overlay.classList.remove("show");
// document.body.classList.remove("noscroll");
// }