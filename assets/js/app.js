// Aqui farem les funcionalitats del carret


function addToCart(id) {
    cart.push(products.find((ele) => ele.id === id));
}
// console.log(cart);