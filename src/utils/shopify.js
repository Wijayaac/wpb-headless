export async function shopifyFetch({ query, variables }) {
  const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
  const version = process.env.SHOPIFY_VERSION;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  try {
    const result = await fetch(`${endpoint}${version}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
        "X-Shopify-Api-Version": "2023-10",
      },
      body: { query, variables } && JSON.stringify({ query, variables }),
    });
    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
    };
  }
}
