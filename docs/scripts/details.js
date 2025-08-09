
const params = new URLSearchParams(window.location.search);
const Id = parseInt(params.get('Id'));
const detailSection = document.getElementById('details');
const API_URL = "/.netlify/functions/getProducts";
const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

fetchProduct();

//Función para obtener los productos de Airtable
async function fetchProduct() {
     document.getElementById('loader').style.display = 'block';
    const response = await fetch(API_URL);
    const data = await response.json();
    const record = data.records.find(record => record.fields.Id === Id);
    if (record) {
        product = {
            name: record.fields.name,
            price: record.fields.price,
            image: record.fields.image,
            description: record.fields.description,
            stock: record.fields.stock,
            Id: record.fields.Id,
            category: record.fields.category,
        };
    } else {
        product = null;
    }
    document.getElementById('loader').style.display = 'none';
    const detailCard = createDetailCard(record);
    detailSection.appendChild(detailCard);
}

function createDetailCard(product) {
    const fields = product.fields;


    const card = document.createElement('div');
    card.classList.add('details-card');
    detailSection.appendChild(card);

    const imageCard = document.createElement('div');
    imageCard.classList.add('details-image');
    card.appendChild(imageCard);

    const img = document.createElement('img');
    if (fields.image && fields.image.length > 0) {
        img.src = fields.image[0].url;
    } else {
        img.src = './imagenes/predeterminada.jpg';
    }
    img.alt = fields.name;
    imageCard.appendChild(img);

    const textCard = document.createElement('div');
    textCard.classList.add('details-text');
    card.appendChild(textCard);

    const title = document.createElement('h3');
    title.textContent = fields.name;
    textCard.appendChild(title);

    const precioFormateado = fields.price.toLocaleString("es-AR");
    const price = document.createElement('h3');
    price.textContent = `$${precioFormateado}`;
    textCard.appendChild(price);

    const description = document.createElement('p');
    description.textContent = fields.description;
    textCard.appendChild(description);

    const cantidad = document.createElement('p');
    cantidad.innerHTML = `<b>Stock Disponible: ${fields.stock}</b>`;
    textCard.appendChild(cantidad);

    const button = document.createElement('button');
    button.textContent = 'Agregar al carrito';
    textCard.appendChild(button);

    button.addEventListener('click', () => {
        const productToAdd = {
            name: fields.name,
            price: fields.price,
            image: fields.image,
            description: fields.description,
            Id: fields.Id,
            quantity: 1,
            stock: fields.stock,
            category: fields.category
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

    return card;

}
