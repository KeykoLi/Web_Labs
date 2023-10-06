const nameEdit = document.getElementById("name_input_edit");
const capacityEdit = document.getElementById("capacity_input_edit");
const attendanceEdit = document.getElementById("attendance_input_edit");
const costEdit = document.getElementById("cost_input_edit");
let complexs = JSON.parse(localStorage.getItem("complexs")) || [];

let NameComplexToEdit = null;

const chooseModel = document.querySelector(".choose_complex");
chooseModel.addEventListener('submit', function (e) {
    e.preventDefault();
    NameComplexToEdit = document.getElementById('complex_to_edit').value;
    const complexToEdit = complexs.find(complex => complex.name === NameComplexToEdit);
    const editingForm = document.querySelector(".editing_form");
    editingForm.classList.add("active");
    nameEdit.value = complexToEdit.name;
    capacityEdit.value = complexToEdit.capacity;
    attendanceEdit.value = complexToEdit.attendance;
    costEdit.value = complexToEdit.cost;
});

const finishEditing = document.querySelector(".editing_form");
finishEditing.addEventListener('submit', function (e) {
    e.preventDefault();
    const editedComplex = complexs.find(complex => complex.name === NameComplexToEdit);
    editedComplex.name = nameEdit.value;
    editedComplex.capacity = parseInt(capacityEdit.value);
    editedComplex.attendance = parseInt(attendanceEdit.value);
    editedComplex.cost = parseInt(costEdit.value);

    localStorage.setItem('complexs', JSON.stringify(complexs));
});
