
/*Se genera el array de productos*/
const products = [
    {
        image: "./imagenes/Cortadoradecesped.webp",
        price: 29000,
        name: "Cortadora de Césped",
        description: "¡Mantené tu jardín impecable con esta potente cortadora de césped! Funciona perfectamente, ideal para jardines medianos y grandes. Motor eficiente, cuchillas afiladas y fácil de manejar.",
    },
    {
        image: "./imagenes/tablet.png",
        price:100000,
        name: "Tablet Samsung",
        description: "¡Potencia y comodidad en tus manos! Esta tablet es ideal para estudiar, trabajar o disfrutar de tus series y juegos favoritos. Pantalla nítida, batería de larga duración y rendimiento fluido.",
    },
    {
        image: "./imagenes/Cocina.webp",
        price:530000,
        name: "Cocina",
        description: "¡Renová tu cocina con este increíble modelo! Perfecta para preparar tus comidas favoritas con facilidad y eficiencia. Funciona a la perfección, con hornallas potentes y horno parejo.",
    },
];

/*Se ubica el selector donde van las cards*/
const grid = document.querySelector('.gallery');

/*Se crea la función para generar las tarjetas*/
function createProductCard(product) {

    /*Se crea la tarjeta y cada uno de sus componentes*/
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const price = document.createElement('h3');
    price.textContent = `$${product.price}`;

    const title = document.createElement('h3');
    title.textContent = product.name;

    const description = document.createElement('p');
    description.textContent = product.description;

    const button = document.createElement('button');
    button.textContent = 'Comprar';

    /*Se inserta el contenido en la tarjeta*/
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(description);
    card.appendChild(button);

    return card;
}

/*Se recorre el array de productos para generar cada tarjeta*/

products.forEach( product => {
    const card = createProductCard(product);
    grid.appendChild(card);
});

/*Codigo para desplegar menú en pantallas chicas*/
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});