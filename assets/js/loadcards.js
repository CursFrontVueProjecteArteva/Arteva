// Script to load de product card
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
  renderCards(products);
});

// Render all cards from data
function renderCards() {
  products.forEach((item) => {
    templateCard
      .querySelector(".cardProduct")
      .setAttribute("id", "card" + item.id);
    templateCard.querySelector(".cardProduct").setAttribute("data-id", item.id);

    templateCard.querySelector(".cardAdd").setAttribute("id", item.id);
    templateCard.querySelector(".cardAdd").setAttribute("card-id", item.id);
    // templateCard.querySelector('.cardRemove').setAttribute('id', item.id)

    templateCard.querySelector("img").setAttribute("src", item.img);
    templateCard.querySelector(".nombre").textContent = item.name;
    templateCard.querySelector(".descripcion").textContent = item.description;
    templateCard.querySelector(".talla").textContent = `Talla ${item.size}`;
    templateCard.querySelector(".precio").textContent = `${item.price} €`;
    const clone = templateCard.cloneNode(true);
    // se guarda en memoria, de momento no se printa
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
}

//FEM CLICK A CARDS
const cards = document.getElementById('cards')

function addToCart(id) {
  alert("add to cart " + id);
}
function listenerEvents(){
  document.querySelectorAll(".cardProduct").forEach(function (element) {
    element.addEventListener("click", function (e) {
      var dataID = element.getAttribute("data-id");
      //alert(dataID);
      if (e.target.classList.contains("cardAdd") || e.target.classList.contains("fa-cart-plus")) {
        addToCart(dataID);
        e.stopPropagation();
      }
      // if (e.target.classList.contains("cardRemove") || e.target.classList.contains("fa-trash-alt") ) {
      //   removeFromCart(dataID);
      //   e.stopPropagation();
      // }
    });
  });
}