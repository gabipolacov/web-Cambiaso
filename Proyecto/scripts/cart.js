const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

function createProductCartCard(product) {
    const card = document.createElement('div');
    card.classList.add('card-cart');

    const img = document.createElement('img');
   if (product.image && product.image.length > 0) {
    img.src = product.image[0].url;
    } else {
    img.src = './imagenes/predeterminada.jpg';
    }
    img.alt = product.title;

    const title = document.createElement('p');
    title.textContent = product.name;

    const precioFormateado =product.price.toLocaleString("es-AR");
    const price = document.createElement('h4');
    price.textContent = `$${precioFormateado}`;

    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.addEventListener('click', () => {
        const exists = cartProducts.findIndex(p => p.name === product.name);
        if (exists !== -1) {
            cartProducts.splice(exists, 1); //Elimina 1 elemento del array cartProducts a partir del índice encontrado.
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            renderCartProducts(cartProducts);
        }
    });
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}


function renderCartProducts(list){
    const cart = document.querySelector('.cards-cart');
    cart.innerHTML = ''; // Clear previous content
    
    list.forEach( product => {
        const card = createProductCartCard(product);
        cart.appendChild(card);
    });
}


renderCartProducts(cartProducts);

function addPayCard(product) {
    const card = document.createElement('ul');
    card.classList.add('product-list');

    const title = document.createElement('p');
    title.textContent = product.name;

    const card1 = document.createElement('ul');
    card1.classList.add('price-list');
    const precioFormateado =product.price.toLocaleString("es-AR");
    const price = document.createElement('h4');
    price.textContent = `$${precioFormateado}`;

    card.appendChild(title);
    card1.appendChild(price);

    return card;
}