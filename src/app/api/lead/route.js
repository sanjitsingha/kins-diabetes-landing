import { NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Lead Data:", body);

    const accessToken =
      await getZohoAccessToken();

    const response = await fetch(
      "https://www.zohoapis.in/crm/v2/Leads",
      {
        method: "POST",
        headers: {
          Authorization:
            `Zoho-oauthtoken ${accessToken}`,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              Last_Name:
                body.name || "Website Lead",

              Phone:
                body.phone,

              Email:
                body.email,

              Lead_Source:
                "Website"
            },
          ],
        }),
      }
    );

    const result =
      await response.json();

console.log("Zoho Status:", response.status);
console.log("Zoho Response:", result);

    return NextResponse.json(result);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}