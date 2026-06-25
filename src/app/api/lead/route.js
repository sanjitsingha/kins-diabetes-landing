import { NextResponse } from "next/server";
import { getZohoAccessToken } from "@/lib/zoho";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("[Zoho Lead] Incoming payload:", JSON.stringify(body));

    const { accessToken, apiDomain } = await getZohoAccessToken();

    const response = await fetch(`${apiDomain}/crm/v8/Leads/upsert`, {
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
            UTM_Content: body.utm_content || undefined,

            Landing_Page: body.landing_page?.split('?')[0],

            Lead_Source: body.Lead_Source || undefined,
          },
        ],
        duplicate_check_fields: ["Mobile"],
      }),
    });

    const result = await response.json();

    console.log("[Zoho Lead] HTTP status:", response.status);
    console.log("[Zoho Lead] Response body:", JSON.stringify(result, null, 2));

    if (!response.ok) {
      console.error("[Zoho Lead] API error — HTTP", response.status, JSON.stringify(result));
      return NextResponse.json(result, { status: response.status });
    }

    const record = result?.data?.[0];
    if (record?.status === "error") {
      console.error("[Zoho Lead] Record-level error:", JSON.stringify(record));
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[Zoho Lead] Exception:", error.message, error.stack);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
