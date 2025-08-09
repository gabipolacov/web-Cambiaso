const API_URL_GET_PAYMENT = "/.netlify/functions/getPayments";  // función para obtener pagos (GET)
const API_URL_ADD_PAYMENT = "/.netlify/functions/addPayment";  // función para crear pago (POST)
const API_URL_EDIT_PAYMENT = "/.netlify/functions/editPayment"; // función para editar pago (POST)


const form = document.getElementById('pay-data');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id) {
    loadForm(id);
}

//Función Para agregar payment a Airtable
async function addPayment(payment) {
    const newPayment = {
        fields: payment
    };

    const response = await fetch(API_URL_ADD_PAYMENT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPayment)
    });

    const data = await response.json();

    return data.id;
}

function getFormData(){

    const formPayment = {
            name: document.getElementById('nombre').value || '',
            lastname: document.getElementById('apellido').value || '',
            address: document.getElementById('direccion').value || '',
            province: document.getElementById('provincia').value || '',
            city: document.getElementById('localidad').value || '',
            cp: document.getElementById('CP').value || '',

            method: document.getElementById('pago').value || '',
            cardnumber: document.getElementById('numero').value || '',
            CVV: document.getElementById('clave').value || '',
            cardholder: document.getElementById('titular').value || '',
            dni: document.getElementById('dni').value || '',

        };
        return formPayment;
}

//Editar el registro en Airtable
async function editPayment(payment) {
    const newPayment = {
        fields: payment
    };
    const response = await fetch(`${API_URL_EDIT_PAYMENT}?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPayment)
    });
    const data = await response.json();

    return data.id;
}
//Función para recargar el formulario con el payment Airtable
async function loadForm(id) {
    const response = await fetch(`${API_URL_GET_PAYMENT}/?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();

    document.getElementById('nombre').value = data.fields.name || '';
    document.getElementById('apellido').value = data.fields.lastname || '';
    document.getElementById('direccion').value = data.fields.address || '';
    document.getElementById('provincia').value = data.fields.province || '';
    document.getElementById('localidad').value = data.fields.city || '';
    document.getElementById('CP').value = data.fields.cp || '';
    document.getElementById('pago').value = data.fields.method || '';
    document.getElementById('numero').value = data.fields.cardnumber || '';
    document.getElementById('clave').value = data.fields.CVV || '';
    document.getElementById('titular').value = data.fields.cardholder || '';
    document.getElementById('dni').value = data.fields.dni || '';
}

//Evento para hacer submit del formulario

form.addEventListener('submit', async (event) => {
    event.preventDefault();

  
    if (id) {
        const formPayment = getFormData();
        const paymentId = await editPayment(formPayment);
        window.location.href = `tarjetaPago.html?id=${paymentId}`;
    } else {
        const formPayment = getFormData();
        const paymentId = await addPayment(formPayment);
        window.location.href = `tarjetaPago.html?id=${paymentId}`;
    }

}); 