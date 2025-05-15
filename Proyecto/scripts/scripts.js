
//Se genera el array de productos
const products = [
    {
        image: "./imagenes/Cortadoradecesped.webp",
        price: 29000,
        name: "Cortadora de Césped",
        category:"Jardin",
        description: "¡Mantené tu jardín impecable con esta potente cortadora de césped! Funciona perfectamente, ideal para jardines medianos y grandes. Motor eficiente, cuchillas afiladas y fácil de manejar.",
    },
    {
        image: "./imagenes/tablet.png",
        price:100000,
        name: "Tablet Samsung",
        category:"Tecnologia",
        description: "¡Potencia y comodidad en tus manos! Esta tablet es ideal para estudiar, trabajar o disfrutar de tus series y juegos favoritos. Pantalla nítida, batería de larga duración y rendimiento fluido.",
    },
    {
        image: "./imagenes/Cocina.webp",
        price:530000,
        name: "Cocina",
        category: "Electrodomestico",
        description: "¡Renová tu cocina con este increíble modelo! Perfecta para preparar tus comidas favoritas con facilidad y eficiencia. Funciona a la perfección, con hornallas potentes y horno parejo.",
    },
];

//Se ubica el selector donde van las cards
const grid = document.querySelector('.gallery');

//Se crea la función para generar las tarjetas
function createProductCard(product) {

    //Se crea la tarjeta y cada uno de sus componentes
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
    button.textContent = 'Agregar al carrito';



    //Se inserta el contenido en la tarjeta
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

//Se recorre el array de productos para generar cada tarjeta
products.forEach( product=> {
    const card = createProductCard(product);
    grid.appendChild(card);
});
products.forEach( product=> {
    const card = createProductCard(product);
    grid.appendChild(card);
});


//-----------------------------------------------------------
//Agregar productos al gallery
const form = document.getElementById('sell-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const newProduct = { 
        image: document.getElementById('image').value,
        price: document.getElementById('price').value,
        name: document.getElementById('title').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
    };

    const card = createProductCard(newProduct);

// Agrega la tarjeta al contenedor
grid.appendChild(card);

// Resetea el formulario
form.reset();
});

//Agregar productos al Carrito

//Quitar productos del Carrito


//Búsqueda
const searchInput = document.querySelector('#search-product');
const searchInputBtn = document.querySelector('#btn-search-product');
const category = document.querySelector('#category-filter');
const precioMax = document.querySelector('#filter-max');
const precioMin = document.querySelector('#filter-min');

function renderProducts(list){

    list.forEach( product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

function filterProducts(text, cat, min, max){
    const filteredProducts = products.filter( product => {

        if(cat.includes("todas") && min == 0 && max == 0){
        return product.name.toLowerCase().includes(text.toLowerCase());
        }
        else if (cat.includes("todas")){
            return product.name.toLowerCase().includes(text.toLowerCase())
            && product.price >= parseFloat(min) && product.price <= parseFloat(max);

        }
        else if (min == 0 && max == 0){
            return product.name.toLowerCase().includes(text.toLowerCase())
            && product.category.toLowerCase().includes(cat.toLowerCase());
        }
        else {
            return product.name.toLowerCase().includes(text.toLowerCase())
            && product.category.toLowerCase().includes(cat.toLowerCase())
            && product.price >= parseFloat(min) && product.price <= parseFloat(max);
        }

    });
    grid.innerHTML = '';
    renderProducts(filteredProducts);
}

    searchInputBtn.addEventListener('click', (e) => {
        e.preventDefault(); // esto evita el refresh del formulario
        
        const valorInput = searchInput.value;
        const categoryInput = category.value;
        const minimoInput = precioMin.value;
        const maximoInput = precioMax.value;

        filterProducts(valorInput, categoryInput, minimoInput, maximoInput);
        console.log(minimoInput, maximoInput);
    });

//renderProducts(products);