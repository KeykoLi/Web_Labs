document.addEventListener('DOMContentLoaded', function () {
    let complexs = JSON.parse(localStorage.getItem('complexs')) || [];
    const form = document.querySelector('.add_class');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name_input').value;
        const capacity = parseInt(document.getElementById('capacity_input').value);
        const attendance = parseInt(document.getElementById('attendance_input').value);
        const cost = parseInt(document.getElementById('cost_input').value);

        const complex = {
            name: name,
            capacity: capacity,
            attendance: attendance,
            cost: cost
        };

        complexs.push(complex);
        localStorage.setItem('complexs', JSON.stringify(complexs));
        console.log(localStorage.getItem('complexs'))

        document.getElementById('name_input').value = '';
        document.getElementById('capacity_input').value = '';
        document.getElementById('attendance_input').value = '';
        document.getElementById('cost_input').value = '';

        window.location.href = "index.html";
    });
});

