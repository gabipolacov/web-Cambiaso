exports.handler = async (event) => {
  try {
    
    const API_KEY = process.env.AIRTABLE_API_KEY;
    const BASE_ID = "apppfuJapye8WbhBo"; // tu base de Airtable
    const TABLE_NAME = "Messages";

    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
     const { fields } = JSON.parse(event.body);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return {
        statusCode: res.status,
        body: `Error Airtable: ${errorText}`,
      };
    }

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error("Error creando payment:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error creando payment" }),
    };
  }
};