// Aqui farem les funcionalitats del carret


function addToCart(id) {
    cart.push(products.find((ele) => ele.id === id));
}
// console.log(cart);


// función remove All from Card

function removeAllFromCart() {
    cart.length = 0;
    //console.log(cart);
}



