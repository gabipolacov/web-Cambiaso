const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
const payProducts = JSON.parse(localStorage.getItem('pay-cart')) || [];

cartVerify(cartProducts);

function cartVerify(cartProducts) {
    if (cartProducts.length === 0) {
        const shoppingCart = document.getElementById('shopping-cart');
        shoppingCart.innerHTML = '';

        const nullMessage = document.createElement('div');
        nullMessage.className = 'null-cart';

        const messageTitle = document.createElement('h3');
        messageTitle.textContent = 'No tienes ningún producto en tu carrito.';

        const messageText = document.createElement('p');
        messageText.textContent = 'Para agregar un producto haz click en "Agregar al carrito" en nuestro catálogo de productos.';

        nullMessage.appendChild(messageTitle);
        nullMessage.appendChild(messageText);
        shoppingCart.appendChild(nullMessage);
    }
    else {
        renderPayCard(cartProducts);
        renderCartProducts(cartProducts);
    }
}


function createProductCartCard(product) {
    const card = document.createElement('div');
    card.classList.add('card-cart');

    const img = document.createElement('img');
    if (product.image && product.image.length > 0) {
        img.src = product.image[0].url;
    } else {
        img.src = './imagenes/predeterminada.jpg';
    }
    img.alt = product.name;

    const title = document.createElement('p');
    title.textContent = product.name;

    const precioFormateado = product.price.toLocaleString("es-AR");
    const price = document.createElement('h4');
    price.textContent = `$${precioFormateado}`;

    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.addEventListener('click', () => {

        const exists = cartProducts.findIndex(p => p.name === product.name);
        if (exists !== -1) { //!== -1 significa: "si existe (porque si no existiera, el índice sería -1)"
            cartProducts.splice(exists, 1); //Elimina 1 elemento del array cartProducts a partir del índice encontrado.
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            cartVerify(cartProducts);
        }
    });
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}


function renderCartProducts(list) {
    const cart = document.querySelector('.cards-cart');
    cart.innerHTML = ''; // Clear previous content

    list.forEach(product => {
        const card = createProductCartCard(product);
        cart.appendChild(card);
    });
}


function renderPayCard(products) {
    const payCardContainer = document.getElementById('pay-card-container');
    payCardContainer.innerHTML = '';

    const payCard = document.createElement('div');
    payCard.classList.add('pay-card');
    payCardContainer.appendChild(payCard);

    const cardTitle = document.createElement('h1');
    cardTitle.textContent = 'Detalle de Compra';
    payCard.appendChild(cardTitle);

    const lists = document.createElement('div');
    payCard.appendChild(lists);
    lists.classList.add('lists-container');

    const productList = document.createElement('ul');
    lists.appendChild(productList);
    productList.classList.add('product-list');

    const priceList = document.createElement('ul');
    lists.appendChild(priceList);
    priceList.classList.add('price-list');

    const totalContainer = document.createElement('div');
    payCard.appendChild(totalContainer);
    totalContainer.classList.add('total-container');

    const totalText = document.createElement('h3');
    totalText.textContent = 'Total:';
    totalContainer.appendChild(totalText);

    const payButton = document.createElement('button');
    payButton.textContent = 'Pagar';
    payCard.appendChild(payButton);

    payButton.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        localStorage.setItem('pay-cart', JSON.stringify(cart));
        localStorage.removeItem('cart');
        window.location.href = `pago.html`;
    });

    let precioTotal = 0;
    precioTotal = products.reduce((total, product) => total + product.price, 0);

    const totalFormateado = precioTotal.toLocaleString("es-AR");
    const totalNumber = document.createElement('h3');
    totalNumber.textContent = `$${totalFormateado}`
    totalContainer.appendChild(totalNumber);

    products.forEach(product => {
        console.log(product);
        const liName = document.createElement('li');
        liName.textContent = product.name;

        const liPriceFormateado = product.price.toLocaleString("es-AR");
        const liPrice = document.createElement('li');
        liPrice.textContent = `$${liPriceFormateado}`;

        productList.appendChild(liName);
        priceList.appendChild(liPrice);

    });

}