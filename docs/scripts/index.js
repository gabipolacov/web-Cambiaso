
const API_URL = "/.netlify/functions/getProducts";
let productsList = [];
let productId = 0;
//Se ubica el selector donde van las cards
const grid = document.querySelector('.gallery');
const cartProducts = JSON.parse(localStorage.getItem('cart')) || []

fetchProducts();


//Función para obtener los productos de Airtable
async function fetchProducts() {
  
    const response = await fetch(API_URL);
    const data = await response.json();
     console.log("Respuesta de getProducts:", data); 
    productsList = data.records.map(record => {
        const fields = record.fields;
        return {
            name: fields.name,
            price: fields.price,
            image: fields.image,
            description: fields.description,
            Id: fields.Id,
            stock: fields.stock,
            category: fields.category,
            airtableId: record.id
        };
    });
   
    productsList.forEach(product => {
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

    const precioFormateado = product.price.toLocaleString("es-AR");
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

        const productToAdd = {
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            Id: product.Id,
            stock: product.stock,
            quantity: 1,
            category: product.category,
            airtableId: product.airtableId
        };

        const exists = cartProducts.find(p => p.Id === productToAdd.Id);
        const index = cartProducts.findIndex(p => p.Id === productToAdd.Id);
        if (!exists) {
            cartProducts.push(productToAdd);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            console.log('Producto agregado al carrito');

            button.textContent = '¡Agregado al carrito!';
            button.style.backgroundColor = "green";

            setTimeout(function () {
                button.textContent = 'Agregar al carrito';
                button.style.backgroundColor = "black";
            }, 1500);
        }
        else{
            cartProducts.splice(index, 1);
            productToAdd.quantity++;
            cartProducts.push(productToAdd);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            button.textContent = '¡Agregado nuevamente al carrito!';
            button.style.backgroundColor = "green";

            setTimeout(function () {
                button.textContent = 'Agregar al carrito';
                button.style.backgroundColor = "black";
            }, 1500);
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
const cleanFilters =document.querySelector('#clean-filters');

cleanFilters.addEventListener('click', () =>{
    precioMax.value = '';
    precioMin.value = '';
    category.value = 'todas';
    searchInput.value = '';
    filterProducts('', 'todas', 0, 0);
});

function renderProducts(list) {
    list.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

function filterProducts(text, cat, min, max) {
    const filteredProducts = productsList.filter(product => {

        if (cat.includes("todas") && min == 0 && max == Infinity) {
            return product.name.toLowerCase().includes(text.toLowerCase());
        }
        else if (cat.includes("todas")) {
            return product.name.toLowerCase().includes(text.toLowerCase())
                && product.price >= parseFloat(min) && product.price <= parseFloat(max);

        }
        else if (min == 0 && max == 0) {
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
    if (filteredProducts.length === 0) {

        grid.style.display = 'flex';
        grid.style.justifyContent = 'center';
        grid.style.alignItems = 'center';
        grid.style.minHeight = '150px';

        const nullResult = document.createElement('div');
        nullResult.className = 'null-result';

        const nullTitle = document.createElement('h3');
        nullTitle.innerHTML = 'No se encontraron resultados';

        const nullText = document.createElement('p');
        nullText.innerHTML = 'Intenta buscar otro artículo.';

        nullResult.appendChild(nullTitle);
        nullResult.appendChild(nullText);
        grid.appendChild(nullResult);

    }
    else {
        grid.style.display = 'grid';
        renderProducts(filteredProducts);
    }

}

searchInputBtn.addEventListener('click', (e) => {
    e.preventDefault(); // esto evita el refresh del formulario

    const valorInput = searchInput.value;
    const categoryInput = category.value;
    const minimoInput = precioMin.value || 0;
    const maximoInput = precioMax.value || Infinity;

    filterProducts(valorInput, categoryInput, minimoInput, maximoInput);
});

function applyFilters() {
  const valorInput = searchInput.value.trim();
  const categoryInput = category.value;
  const minimoInput = precioMin.value.trim() === '' ? 0 : parseFloat(precioMin.value);
  const maximoInput = precioMax.value.trim() === '' ? Infinity : parseFloat(precioMax.value);

  filterProducts(valorInput, categoryInput, minimoInput, maximoInput);
}

// Agregar event listeners para que se active cuando cambian los filtros
searchInput.addEventListener('input', applyFilters);
category.addEventListener('change', applyFilters);
precioMin.addEventListener('input', applyFilters);
precioMax.addEventListener('input', applyFilters);