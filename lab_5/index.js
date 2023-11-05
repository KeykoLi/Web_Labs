
async function deleteComplex(id){
    const res = await fetch(`http://localhost:5500/api/complex/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await res.json();
    console.log(data);

    if(data) {
        document.getElementById(`complex${id}`).remove();
    }
}

document.querySelector(".button").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "flex";
})

document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
})

document.getElementById('submit_button').addEventListener('click', async () => {
    const nameInput = document.getElementById('title_input');
    const attendanceInput = document.getElementById('attendance_input');
    const priceInput = document.getElementById('price_input');

    const name = nameInput.value;
    const attendance = attendanceInput.value;
    const price = priceInput.value;

    if(name && attendance && price) {
        const res = await fetch ('http://localhost:5500/api/complex', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, attendance: attendance, price})
        });

        const attendance = await res.json();
        complexToHTML(attendance);

        nameInput.value = '';
        attendanceInput.value = '';
        priceInput.value = '';

    }
})

async function getAllComplexs() {
    const res = await fetch('http://localhost:5500/api/complex')
    const complexes = await res.json();

    console.log(complexes);
    complexes.forEach(complex => complexToHTML(complex))

}

window.addEventListener('DOMContentLoaded', getAllComplexs);

function complexToHTML({ id, name, attendance, price }) {
    const complexList = document.getElementById('complexes');

    complexList.insertAdjacentHTML('afterbegin', `
    <div id="complex${id}" class="card mb-3 item-card" draggable="true">
    <div class="card-body">
        <h5 class="card-title">title ${name}</h5>
        <p class="card-text">attendance ${attendance}</p>
        <p class="card-text">price ${price}</p>
        
        <button onclick="deleteComplex(${id})" type="button" class="btn btn-info">delete</button>   
    </div>`);
}

// async function deleteStone(id){
//     const res = await fetch(`http://localhost:5500/api/stone/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });

//     const data = await res.json();
//     console.log(data);

//     if(data) {
//         document.getElementById(`stone${id}`).remove();
//     }
// }