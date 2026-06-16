import { NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Lead Data:", body);

    const accessToken = await getZohoAccessToken();

    const response = await fetch("https://www.zohoapis.in/crm/v2/Leads", {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            Last_Name: body.name,
            Mobile: body.mobile,
            City: body.city,    
            Are_You_Diabetic: body.diabetic,
            How_Can_I_Help_You: body.service,

            UTM_Source: body.utm_source,
            UTM_Medium: body.utm_medium,
            UTM_Campaign: body.utm_campaign,

            Landing_Page: body.landing_page,

            Lead_Source: body.Lead_Source || undefined,
          },
        ],
      }),
    });

    const result = await response.json();

    console.log("Zoho Status:", response.status);
    console.log("Zoho Full Response:", JSON.stringify(result, null, 2));

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
