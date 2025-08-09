exports.handler = async (event) => {
  try {
    const { productId } = JSON.parse(event.body);
    const API_KEY = process.env.AIRTABLE_API_KEY;
    const BASE_ID = "apppfuJapye8WbhBo";
    const TABLE_NAME = 'Products';

    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${productId}`;

    const res = await fetch(url, {
      method: 'DELETE',
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
    console.error("Error deleting product:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error deleting product" }),
    };
  }
};