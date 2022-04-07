
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
      if (index == -1) {
        // no lo encuentra
        cart.push(addProduct);
        addProduct.cantidad = 1;
        addProduct.subTotal = addProduct.cantidad * addProduct.price;
      } else {
        // silo ha encontrado
        addProduct.cantidad = addProduct.cantidad + 1;
        addProduct.subTotal = addProduct.cantidad * addProduct.price;
      }
    }

    console.table(cart);
    pintarCarrito();
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
  const totalCart = cart.reduce((suma, ele) => (suma += ele.subTotal), 0);
  console.log(`El total de la compra es ${totalCart} €`); // print
  document.getElementById("totalCart").innerText = totalCart + " €";
  return totalCart ;
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


const templateCarrito = document.getElementById("template-carrito").content;
const templateFooter = document.getElementById("template-footer").content;
// const fragment = document.createDocumentFragment()

//FUNCION PINTA template-CARRITO (ANTIUGUA, mejor sin Object.)

// const pintarCarrito = () => {
//   items.innerHTML = ''

//   Object.values(carrito).forEach(producto => {

//       templateCarrito.querySelector('th').textContent = producto.id
//       templateCarrito.querySelectorAll('td')[0].textContent = producto.title
//       templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
//       templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad

//       //botones
//       templateCarrito.querySelector('.btn-info').dataset.id = producto.id
//       templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

//       const clone = templateCarrito.cloneNode(true)
//       fragment.appendChild(clone)
//   })
//   items.appendChild(fragment)

//   pintarFooter()
// }
// pintar carrito deberia quedar asi:

const pintarCarrito = () => {
  const items = document.getElementById("itemsModal");
  items.innerHTML = "";

  // console.log("ESTOY AQUI:" + cart);

  cart.forEach((items) => {

    templateCarrito.querySelector("th").textContent = items.id;
    templateCarrito.querySelectorAll("td")[0].textContent = items.name;
    templateCarrito.querySelectorAll("td")[1].textContent = items.cantidad;
    templateCarrito.querySelectorAll("td")[2].textContent = items.price;
    templateCarrito.querySelector("span").textContent = items.price * items.cantidad;

    //botone
    // templateCarrito.querySelector(".btn-info").dataset.id = items.id;
    //botone
    // templateCarrito.querySelector(".btn-danger").dataset.id = items.id;

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  //pintarFooter();
  addTotalCart();
  
};



//FUNCION PINTA template-FOOTER

// const pintarFooter = () => {
//   footer.innerHTML = "";

//   if (Object.keys(carrito).length === 0) {
//     footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío con innerHTML</th>`;
//     return;
//   }

//   // sumar cantidad y sumar totales
//   const nCantidad = Object.values(carrito).reduce(
//     (acc, { cantidad }) => acc + cantidad,
//     0
//   );
//   const nPrecio = Object.values(carrito).reduce(
//     (acc, { cantidad, precio }) => acc + cantidad * precio,
//     0
//   );
//   // console.log(nPrecio)

//   templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
//   templateFooter.querySelector("span").textContent = nPrecio;

//   const clone = templateFooter.cloneNode(true);
//   fragment.appendChild(clone);

//   footer.appendChild(fragment);

//   const boton = document.querySelector("#vaciar-carrito");
//   boton.addEventListener("click", () => {
//     carrito = {};
//     pintarCarrito();
//   });
// };
