const API_TOKEN = 'patzuzJS60aaOG2eX.c5c086240d6bd5338c0e9bf4ba22c453eabc7f051ca170a1ed493976fc0ac8a2';
const BASE_ID = 'apppfuJapye8WbhBo';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
const form = document.getElementById('sell-form');

//Función Para agregar productos a Airtable
async function addProduct(product) {
    const newProduct = {
        fields: product
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error("No se pudo publicar tu producto", error);
        return false;
    }
}

//Evento para hacer submit del formulario
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formProduct = {
        name: document.getElementById('title').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        stock: parseInt(document.getElementById('stock').value),
        price: parseFloat(document.getElementById('price').value),
        image: [
            {
                url: document.getElementById('image').value
            }
        ],
    };
    const airtableId = await addProduct(formProduct);
    console.log(formProduct);
    if (airtableId) {
        formProduct.airtableId = airtableId;
        Swal.fire({
            icon: 'success',
            title: '¡Producto Publicado!',
            text: 'Tu producto se publicó exitosamente.',
            customClass: {
                confirmButton: 'custom-button',
            },
        });
        form.reset(); // Limpia el formulario
    } else {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Hubo un problema al publicar tu producto. Intentalo más tarde.',
            customClass: {
                confirmButton: 'custom-button',
            },
        });
    }
}); 
