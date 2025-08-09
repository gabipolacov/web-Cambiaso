
exports.handler = async function (event, context) {
  const API_KEY = process.env.AIRTABLE_API_KEY;
  const BASE_ID = "apppfuJapye8WbhBo";
  const TABLE_NAME = "Payments";

  const id = event.queryStringParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Falta el ID" }),
    };
  }

  try {
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: event.body,
    });

    const data = await res.json();

    return {
      statusCode: res.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error Airtable: " + error.message }),
    };
  }
};