exports.handler = async (event) => {
  try {
    const { productId, newStock } = JSON.parse(event.body);
    const API_KEY = process.env.AIRTABLE_API_KEY;
    const BASE_ID = "apppfuJapye8WbhBo";
    const TABLE_NAME = 'Products';

    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${productId}`;
console.log({ productId, newStock, url });
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: { stock: newStock } }),
    });
    console.log(await res.text());
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error updating product" }),
    };
  }
};