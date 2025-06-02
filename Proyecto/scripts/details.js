
const params = new URLSearchParams(window.location.search);
const Id = parseInt(params.get('Id'));
 const detailSection = document.getElementById('details');

const API_TOKEN = 'patzuzJS60aaOG2eX.c5c086240d6bd5338c0e9bf4ba22c453eabc7f051ca170a1ed493976fc0ac8a2';
const BASE_ID = 'apppfuJapye8WbhBo';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

fetchProduct(); 

//Función para obtener los productos de Airtable
async function fetchProduct(){
    console.log("Accediendo a la tabla");
    const response = await fetch(API_URL, {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    product = data.records.find(record => record.fields.Id === Id); //Transforma el array de Airtable (data.records) en un array más limpio, donde cada product tiene solo name, price, image, etc., tal como espera createProductCard().
    const detailCard = createDetailCard(product);
    detailSection.appendChild(detailCard);
}

function createDetailCard(product){
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

    const precioFormateado =fields.price.toLocaleString("es-AR");
    const price = document.createElement('h3');
    price.textContent = `$${precioFormateado}`;
    textCard.appendChild(price);

    const description = document.createElement('p');
    description.textContent = fields.description;
    textCard.appendChild(description);

    const button = document.createElement('button');
    button.textContent = 'Agregar al carrito';
    textCard.appendChild(button);

     button.addEventListener('click', () => {
        const exists = cartProducts.find(p => p.name === product.name);
        if (!exists){
            cartProducts.push(product);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            console.log('Producto agregado al carrito');
        }
    });

    return card;

}
