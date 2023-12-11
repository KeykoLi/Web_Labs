import {
    EDIT_BUTTON_PREFIX,
    addItemToPage,
    clearInputs,
    renderItemsList,
    getInputValues,
} from "./dom_util.js";

const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");

document.querySelector(".button").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "flex";
})

document.querySelector(".close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
})

let stones = [];


// Інша частина коду...

const onEditItem = (id) => {
    // Отримайте елемент для редагування за id
    const item = stones.find((stone) => stone._id === id);

    // Заповніть поля вікна редагування поточними даними
    const editTitleInput = document.getElementById("edit_title_input");
    const editCaratsInput = document.getElementById("edit_carats_input");
    const editPriceInput = document.getElementById("edit_price_input");


    editTitleInput.value = item.title;
    editCaratsInput.value = item.carats;
    editPriceInput.value = item.price;

    // Покажіть вікно редагування
    const editPopup = document.getElementById("edit_popup");
    editPopup.classList.add("show");

    // Додайте обробник подій для збереження редагованих даних
    const editSubmitButton = document.getElementById("edit_submit_button");
    editSubmitButton.addEventListener("click", () => {
        // Отримайте змінені дані
        const editedTitle = editTitleInput.value;
        const editedCarats = editCaratsInput.value;
        const editedPrice = editPriceInput.value;


        // Оновіть дані карточки
        const editedItem = stones.find((hamster) => hamster._id === id);
        editedItem.title = editedTitle;
        editedItem.carats = editedCarats;
        editedItem.price = editedPrice;

        // Оновіть відображення карточки
        renderItemsList(stones, onEditItem, onRemoveItem);

        // Сховайте вікно редагування
        editPopup.classList.remove("show");
    });
};

// Інша частина коду...


const onRemoveItem = (id) => {
    // Видалення карточки на клієнтському боці
    stones = stones.filter((hamster) => hamster._id !== id);

    renderItemsList(stones, onEditItem, onRemoveItem);
};

submitButton.addEventListener("click", (event) => {
    // Prevents default page reload on submit
    event.preventDefault();

    const { title, carats, price} = getInputValues();

    // Додавання нової карточки на клієнтський бік
    const newItem = {
        _id: new Date().getTime().toString(), // Тимчасовий унікальний ідентифікатор
        title,
        carats,
        price,
    };
    stones.push(newItem);

    clearInputs();
    renderItemsList(stones, onEditItem, onRemoveItem);
});

findButton.addEventListener("click", () => {
    const foundStones = stones.filter(
        (stone) => stone.title.includes(findInput.value)
    );

    renderItemsList(foundStones, onEditItem, onRemoveItem);
});

cancelFindButton.addEventListener("click", () => {
    renderItemsList(stones, onEditItem, onRemoveItem);
    findInput.value = "";
});
