const params = new URLSearchParams(window.location.search);
const id = params.get('id');
console.log('ID recibido desde URL:', id);
const paymentCard = document.getElementById('card-content');

const API_TOKEN = 'patzuzJS60aaOG2eX.c5c086240d6bd5338c0e9bf4ba22c453eabc7f051ca170a1ed493976fc0ac8a2';
const BASE_ID = 'apppfuJapye8WbhBo';
const TABLE_NAME = 'Payments';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

fetchPayment();

//Función para obtener el payment de Airtable
async function fetchPayment() {
    console.log("Accediendo a la tabla");
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    payment = data.records.find(record => record.id === id); 
    console.log("Payment encontrado:", payment);
    createPayDetailCard(payment);
    
}

function createPayDetailCard(payment) {
    const fields = payment.fields;
    const clientDetails = document.getElementById('client-details-data')

    const name= document.createElement('p');
    name.textContent = fields.name || '-';
    clientDetails.appendChild(name);

    const lastname= document.createElement('p');
    lastname.textContent = fields.lastname || '-';
    clientDetails.appendChild(lastname);

    const address= document.createElement('p');
    address.textContent = fields.address || '-';
    clientDetails.appendChild(address);

    const province= document.createElement('p');
    province.textContent = fields.province || '-';
    clientDetails.appendChild(province);

    const city= document.createElement('p');
    city.textContent = fields.city || '-';
    clientDetails.appendChild(city);

    const cp= document.createElement('p');
    cp.textContent = fields.cp || '-';
    clientDetails.appendChild(cp);

    const paymentDetails = document.getElementById('pay-details-data')

    const method= document.createElement('p');
    method.textContent = fields.method || '-';
    paymentDetails.appendChild(method);

    const cardNumber= document.createElement('p');
    cardNumber.textContent = fields.cardNumber || '-';
    paymentDetails.appendChild(cardNumber);

    const cvv= document.createElement('p');
    cvv.textContent = fields.cvv || '-';
    paymentDetails.appendChild(cvv);

    const cardHolder= document.createElement('p');
    cardHolder.textContent = fields.cardHolder || '-';
    paymentDetails.appendChild(cardHolder);

    const dni= document.createElement('p');
    dni.textContent = fields.dni || '-';
    paymentDetails.appendChild(dni);
    

    const editButton = document.getElementById('edit-button');
    const payButton = document.getElementById('pay-button');

    editButton.addEventListener('click', () => {
            window.location.href = `pago.html?id=${id}`;    
    });

}
