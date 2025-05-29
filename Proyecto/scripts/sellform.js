const API_TOKEN = 'patzuzJS60aaOG2eX.c5c086240d6bd5338c0e9bf4ba22c453eabc7f051ca170a1ed493976fc0ac8a2';
const BASE_ID = 'apppfuJapye8WbhBo';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
const form = document.getElementById('sell-form');

//Función Para agregar productos a Airtable
async function addProduct(product){
     const newProduct = {
        fields: product
    };
    const response = await fetch(API_URL, {
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    }); 
    const data = await response.json();
    console.log(data);
}

//Evento para hacer submit del formulario
 form.addEventListener('submit', async(event) =>{
     event.preventDefault();

     const formProduct = { 
            name: document.getElementById('title').value,
            category: document.getElementById('category').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            image: document.getElementById('image').value,
     };
    await addProduct(formProduct);
    //Resetea el formulario
    form.reset();
 }); 
