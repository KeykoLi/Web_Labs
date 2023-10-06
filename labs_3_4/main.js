const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");

let complexs = [];

const countButton = document.getElementById('count');
const totalAttendanceElement = document.getElementById('totalAttendance');

countButton.addEventListener('click', () => {
    let complexs = JSON.parse(localStorage.getItem("complexs")) || [];
    let total_attendance = 0;
    for (let i of complexs) {
        total_attendance += i.attendance;
    }
    totalAttendanceElement.textContent = total_attendance;
});

document.addEventListener('DOMContentLoaded', function () {
    let complexs = JSON.parse(localStorage.getItem("complexs")) || [];

    function renderComplexs() {
        let selectors = document.querySelectorAll(".complex_container");
        selectors.forEach((selector) => {
            let name_div = selector.querySelector(".name");
            let capacity_div = selector.querySelector(".capacity");
            let attendance_div = selector.querySelector(".attendance");
            let cost_div = selector.querySelector(".cost");
            name_div.innerHTML = null;
            capacity_div.innerHTML = null;
            attendance_div.innerHTML = null;
            cost_div.innerHTML = null;
        });
        displayObjectsOnPage(complexs);
    }

    function sortComplexsCapacity() {
        complexs.sort(function (a, b) {
            return b.capacity - a.capacity;
        });
        renderComplexs();
    }

    const CapacityDes = document.getElementById("capacity__des");
    CapacityDes.addEventListener("click", sortComplexsCapacity);

    const CapacityAsc = document.getElementById("capacity__asc");
    CapacityAsc.addEventListener("click", function () {
        complexs.sort(function (a, b) {
            return a.capacity - b.capacity;
        });
        renderComplexs();
    });
});

function findComplex() {
    let complexs = JSON.parse(localStorage.getItem("complexs")) || [];
    const find_input = document.getElementById("find_input");
    const findButton = document.getElementById("find_button");
    const result = document.getElementById("result");
    findButton.addEventListener("click", function (event) {
        event.preventDefault();
        result.classList.toggle('active');
        const findName = find_input.value.toLowerCase();
        console.log(complexs); // Додайте цей рядок
        console.log("Complexs length:", complexs.length);

        const foundComplex = complexs.find(function (complex) {
            return complex.name.toLowerCase() === findName;
        });
        if (foundComplex) {
            result.innerHTML = `
                Name: ${foundComplex.name}<br>
                Capacity: ${foundComplex.capacity}<br>
                Attendance: ${foundComplex.attendance}<br>
                Cost: ${foundComplex.cost}<br>
            `;
        } else {
            result.innerHTML = 'Complex not found. Check the spelling of the name.';
        }
    });
}
findComplex();


function displayObjectsOnPage(objects) {
    const allComplexs = document.querySelector(".complexs_selec");
    allComplexs.innerHTML = '';
    objects.forEach((object, index) => {
        const displayElement = document.createElement("div");
        displayElement.classList.add("complex_container");
        displayElement.innerHTML = `
            <div class="name">
                <p>Name: ${object.name}</p>
            </div>
            <div class="capacity">
                <p>Capacity: ${object.capacity}</p>
            </div>
            <div class="attendance">
                <p>Attendance: ${object.attendance}</p>
            </div>
            <div class="cost">
                <p>Cost: ${object.cost}</p>
            </div>
            <div class="buttons">
                <button class="delete_button">Delete</button>
            </div>
        `;
        displayElement.addEventListener('click', () => {
            displayElement.classList.toggle('selected');
        });

        const deleteButton = displayElement.querySelector('.delete_button');
        deleteButton.addEventListener('click', () => {
            const index = objects.findIndex(obj => obj === object);
            deleteObject(index);
        });

        allComplexs.appendChild(displayElement);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let complexs = JSON.parse(localStorage.getItem("complexs")) || [];
    // Make sure complexs is an array
    if (!Array.isArray(complexs)) {
        complexs = [];
    }

    displayObjectsOnPage(complexs);
});

function deleteObject(index) {
    let complexs = JSON.parse(localStorage.getItem("complexs")) || [];

    // Ensure complexs is an array
    if (!Array.isArray(complexs)) {
        complexs = [];
    }

    if (index >= 0 && index < complexs.length) {
        complexs.splice(index, 1);
        localStorage.setItem("complexs", JSON.stringify(complexs));
        window.location.href = "index.html"; // Reload the page after deletion
    }
}

function loadComplexsFromStorage() {
    const complexs = JSON.parse(localStorage.getItem('complexs'));
    return complexs ? complexs : [];
}
