

const API_TOKEN ='patzuzJS60aaOG2eX.c5c086240d6bd5338c0e9bf4ba22c453eabc7f051ca170a1ed493976fc0ac8a2';
const BASE_ID = 'apppfuJapye8WbhBo';
const TABLE_NAME = 'Messages';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
const form = document.getElementById('contact-form');

//Función Para agregar productos a Airtable
async function addMessage(message) {
    const newMessage = {
        fields: message
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMessage)
        });

        const data = await response.json();
        console.log(data);
        return true;
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        return false;
    }
}

//Evento para hacer submit del formulario
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formMessage = {
        Name: document.getElementById('name').value,
        Lastname: document.getElementById('lastname').value,
        Email: document.getElementById('email').value,
        Comments: document.getElementById('comments').value,
    };
    const sent = await addMessage(formMessage);

    if (sent) {
        Swal.fire({
            icon: 'success',
            title: '¡Mensaje enviado!',
            text: 'Gracias por contactarte, te responderemos pronto.',
            customClass: {
                confirmButton: 'custom-button',
            },
        });
        form.reset(); // Limpia el formulario
    } else {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Hubo un problema al enviar el mensaje. Intentalo más tarde.',
            customClass: {
                confirmButton: 'custom-button',
            },
        });
    }
});
