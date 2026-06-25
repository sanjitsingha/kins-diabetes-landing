export async function getZohoAccessToken() {
  const response = await fetch("https://accounts.zoho.in/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN,
      client_id: process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET,
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json();

  if (!data.access_token) {
    console.error("[Zoho] Token fetch failed (HTTP %d):", response.status, JSON.stringify(data));
    throw new Error(`Zoho OAuth error: ${data.error || JSON.stringify(data)}`);
  }

  return { accessToken: data.access_token, apiDomain: data.api_domain };
}
