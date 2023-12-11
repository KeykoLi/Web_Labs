import { onDragNDrop } from "./drag_n_drop.js";

export const EDIT_BUTTON_PREFIX = 'edit-button-';

const titleInput = document.getElementById("title_input");
const caratsInput = document.getElementById("carats_input");
const priceInput = document.getElementById("price_input");

const itemsContainer = document.getElementById("items_container");

// local functions

const itemTemplate = ({ id, title, carats, price }) => `
<li id="${id}" class="card mb-3 item-card" draggable="true">
  <div class="card-body">
    <h5 class="card-title">title ${title}</h5>
    <p class="card-text">carats ${carats}</p>
    <p class="card-text">price ${price}</p>
    <button id="${EDIT_BUTTON_PREFIX}${id}" type="button" class="btn btn-info">
      Edit
    </button>
  </div>

  <div id="edit_popup" class="edit-popup">
    
    <input id="edit_title_input" type="text" placeholder="Title">
    <input id="edit_carats_input" type="text" placeholder="Carats">
    <input id="edit_price_input" type="text" placeholder="Price">

    <button id="edit_submit_button" class="btn btn-primary">Save</button>
</div>

</li>`;

// exposed functions
export const clearInputs = () => {
    titleInput.value = "";

    caratsInput.value = "";
};

export const addItemToPage = ({ _id: id, title, carats, price }, onEditItem, onRemoveItem) => {
    itemsContainer.insertAdjacentHTML(
        "afterbegin",
        itemTemplate({ id, title, carats, price })
    );

    const element = document.getElementById(id);
    const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);

    // Додайте обробник подій для відкриття вікна редагування при натисканні кнопки "Edit"
    editButton.addEventListener("click", () => {
        onEditItem(id);
    });

    // VERY IMPORTANT
    // Allows not to trigger DragNDrop when user clicks Edit Button
    editButton.onmousedown = e => e.stopPropagation();
};

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
    itemsContainer.innerHTML = "";

    for (const item of items) {
        addItemToPage(item, onEditItem, onRemoveItem);
    }
};

export const getInputValues = () => {
    return {
        title: titleInput.value,
        carats: caratsInput.value,
        price: priceInput.value,
    };
};