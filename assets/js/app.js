// Aqui farem les funcionalitats del carret


function addToCart(id) {
    cart.push(products.find((ele) => ele.id === id));
}
// console.log(cart);


// función remove All from Card

function removeAllFromCart() {
    cart.length = 0;
    cartList.length = 0;
    //console.log(cart);
}

//PROTOTYPE:  cartListOnes()
//DESCRIPTION: A partir del arrar -cart- crea el array -cartList- crea la propiedad cantidad para ir sumando los elemntos repetidos.
// Autor: Olegario Ballester . 18/03/2022
function cartListOnes() {
    // El Array cartList esta declarado en data;
   
     // ids es un array auxiliar para controlas los id's del carrito y ver si se repiten
     const ids = [];
   
     cart.forEach((producto) => {
       if (ids.includes(producto.id) === false) {
         ids.push(producto.id);
         producto.cantidad = 1;
         producto.total = producto.price * producto.cantidad;
         cartList.push(producto);
       } else {
         producto.cantidad += 1;
         producto.total = producto.price * producto.cantidad;
       }
     });
     console.table(cartList); //print
     return cartList;
   }

//PROTOTYPE:   addTotalcart()
//DESCRIPTION:  Calculo del total del carrito
// Autor: Olegario Ballester . 18/03/2022

function addTotalCart() {

    const totalCart = cartList
      .reduce((suma, ele) => (suma += ele.total), 0)
      .toFixed(3);
    console.log(`El total de la compra es ${totalCart} €`); // print
    return totalCart;
  }

//DESCRIPTION: Remove de object with the id.
// Autor: Olegario Ballester . 18/03/2022
function removeBuy(id) {
    // let cartList = cartListOnes();
     const index = cartList.findIndex(ele=> ele.id === id);
     if (index !== -1){
       cartList.splice(index,1)
     }
     addTotalCart()
     console.table(cartList);
     return cartList
     
   }


