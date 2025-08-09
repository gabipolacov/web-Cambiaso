exports.handler = async function (event, context) {
  const API_KEY = process.env.AIRTABLE_API_KEY;
  const BASE_ID = "apppfuJapye8WbhBo";
  const TABLE_NAME = "Payments";

  const id = event.queryStringParameters?.id; // obtener id de la query string

  // Si hay id, consultamos ese registro puntual
  // Si no, consultamos toda la tabla
  const url = id
    ? `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`
    : `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Hubo un error al obtener los datos" }),
    };
  }
};