
const API_TOKEN = 'patzuzJS60aaOG2eX.c5c086240d6bd5338c0e9bf4ba22c453eabc7f051ca170a1ed493976fc0ac8a2';
const BASE_ID = 'apppfuJapye8WbhBo';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
let productsList = [];
let productId=0;
//Se ubica el selector donde van las cards
const grid = document.querySelector('.gallery');
const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

fetchProducts();


//Función para obtener los productos de Airtable
async function fetchProducts(){
    const response = await fetch(API_URL, {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    productsList = data.records.map(record => record.fields); //Transforma el array de Airtable (data.records) en un array donde cada product tiene solo name, price, image, como espera createProductCard().
    productsList.forEach( product=> {
    const card = createProductCard(product);
    grid.appendChild(card);
});
}

//Se crea la función para generar las tarjetas
function createProductCard(product) {

    //Se crea la tarjeta y cada uno de sus componentes
    const card = document.createElement('div');
    card.classList.add('card');
    card.addEventListener('click', () => {
       window.location.href = `detalle.html?Id=${product.Id}`;

    });

    const img = document.createElement('img');
    if (product.image && product.image.length > 0) {
    img.src = product.image[0].url;
    } else {
    img.src = './imagenes/predeterminada.jpg';
    }
    img.alt = product.name;

    const precioFormateado =product.price.toLocaleString("es-AR");
    const price = document.createElement('h3');
    price.textContent = `$${precioFormateado}`;
 

    const title = document.createElement('h3');
    title.textContent = product.name;

    const description = document.createElement('p');
    description.textContent = product.description;

    const button = document.createElement('button');
    button.textContent = 'Agregar al carrito';
     button.addEventListener('click', (e) => {
         e.stopPropagation(); // detiene que el click siga subiendo al contenedor
        const exists = cartProducts.find(p => p.name === product.name);
        if (!exists){
            cartProducts.push(product);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            console.log('Producto agregado al carrito');
        }
    });


    //Se inserta el contenido en la tarjeta
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

//-----------------------------------------------------------

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
    const filteredProducts = productsList.filter( product => {

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
    if (filteredProducts.length === 0){
        grid.innerHTML = '<h3 id="resultado">No se encontraron resultados</h3>';
    }
    else{
        renderProducts(filteredProducts);
    }
   
}

    searchInputBtn.addEventListener('click', (e) => {
        e.preventDefault(); // esto evita el refresh del formulario
        
        const valorInput = searchInput.value;
        const categoryInput = category.value;
        const minimoInput = precioMin.value;
        const maximoInput = precioMax.value;

        filterProducts(valorInput, categoryInput, minimoInput, maximoInput);
    });

