
const categories= document.getElementById('tipo')
categories.addEventListener('click', e => {
  
    if (e.target.classList.contains('prodAnillos')) { 
        console.log("Anillos");       
        //cleanListProducts();
        ProductByCategory=getProductByCategory("Anillos"); 
        renderCards(ProductByCategory);
     }
     if (e.target.classList.contains('prodColgantes')) {
        cleanListProducts();
        ProductByCategory=getProductByCategory("Colgantes");               
        renderCards(ProductByCategory);
     }
     if (e.target.classList.contains('prodPendientes')) {
        cleanListProducts();
        ProductByCategory=getProductByCategory("Pendientes");               
        renderCards(ProductByCategory);
     }
     if (e.target.classList.contains('prodPulseras')) {
      cleanListProducts();
      ProductByCategory=getProductByCategory("Pulseras");               
      renderCards(ProductByCategory);
   }
     if (e.target.classList.contains('prodTots')) {
        cleanListProducts();
        renderCards(products);
     }

});

// Limpiar lista de profuctos 


function cleanListProducts(){
  const cardsprint = document.querySelector('#cards');
  console.log(cardsprint.children);
  while (cardsprint.firstChild) {
      cardsprint.removeChild(cardsprint.firstChild);
  }
}


// Aqui farem les funcionalitats del carret

// Funciones para añadir al Cart
// function addToCart(id) {
//   cart.push(products.find((ele) => ele.id === id));
// }

const addToCart = (e) => {
  if (e.target.classList.contains("cardAdd")) {
    // buscamos el id del boton Add clicked
    let id = +e.target.getAttribute("data-id");
    // Con ese id buscamos el elemento en products
    let addProduct = products.find((ele) => ele.id === id);

    // 1.-Si el carrito esta vacio => subimos el producto al carrito

    if (cart.length < 1) {
      cart.push(addProduct);
      addProduct.cantidad = 1;
      addProduct.subTotal = addProduct.cantidad * addProduct.price;
    } else {
      // Si no lo esta, buscamos el elemnto: si no lo encuentra lo sube, y si lo encuentra aumenta la cantidad

      let index = cart.indexOf(addProduct);
      if (index == -1) {   // no lo encuentra
        cart.push(addProduct);
        addProduct.cantidad = 1;
        addProduct.subTotal = addProduct.cantidad * addProduct.price;
      } else { // silo ha encontrado
        addProduct.cantidad = addProduct.cantidad + 1;
        addProduct.subTotal = addProduct.cantidad * addProduct.price;
      }
    }

    console.table(cart);
    // pintarCarrito()
  }
  e.stopPropagation();
};

// función remove All from Card

function removeAllFromCart() {
  cart.length = 0;
  //cartList.length = 0;
  //console.log(cart);
}

//PROTOTYPE:  cartListOnes()
//DESCRIPTION: A partir del arrar -cart- crea el array -cartList- crea la propiedad cantidad para ir sumando los elemntos repetidos.
// Autor: Olegario Ballester . 18/03/2022
// function cartListOnes() {
//   // El Array cartList esta declarado en data;
//   // ids es un array auxiliar para controlas los id's del carrito y ver si se repiten
//   const ids = [];

//   cart.forEach((producto) => {
//     if (ids.includes(producto.id) === false) {
//       ids.push(producto.id);
//       producto.cantidad = 1;
//       producto.total = producto.price * producto.cantidad;
//       cartList.push(producto);
//     } else {
//       producto.cantidad += 1;
//       producto.total = producto.price * producto.cantidad;
//     }
//   });
//   //console.table(cartList); //print
//   return cartList;
// }
// ---------------------------------------------------------------------------------------------------
//PROTOTYPE:   addTotalcart()
//DESCRIPTION:  Calculo del total del carrito
// Autor: Olegario Ballester . 18/03/2022

function addTotalCart() {
  const totalCart = cart
    .reduce((suma, ele) => (suma += ele.total), 0)
    .toFixed(3);
  console.log(`El total de la compra es ${totalCart} €`); // print
  return totalCart;
}

//DESCRIPTION: Remove de object with the id.
// Autor: Olegario Ballester . 18/03/2022
function removeBuy(id) {
  // let cartList = cartListOnes();
  const index = cart.findIndex((ele) => ele.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  addTotalCart();
  console.table(cart);
  return cart;
}

//DESCRIPTION: Decrease by  ONE to quantity
// Autor: Olegario Ballester . 22/03/2022
function decreaseQuantityByOne(id) {
  const producto = products.find((ele) => ele.id === id);
  if (producto.cantidad === 1) {
    removeBuy(id);
    let index = cart.indexOf(producto.id);
    cart.splice(index, 1);
  } else {
    producto.cantidad--;
    producto.total = producto.price * producto.cantidad;
    console.table(cart);
  }
}

//DESCRIPTION: Increase by ONE to quantity
// Autor: Olegario Ballester . 22/03/2022
function increaseQuantityByOne(id) {
  const producto = products.find((ele) => ele.id === id);
  producto.cantidad++;
  producto["total"] = producto.price * producto.cantidad;
  console.table(cartList);
}

// Función para filtros (anillos/collares/pendientes/pulseras)
function getProductByCategory(buscado) {
  const productos = products.filter((prod) => prod.type == buscado);
  console.log(products);
  console.table(productos);
  return productos;
}



