// app/api/offline-conversion/route.js

export async function POST(request) {
  try {
    const body = await request.json();

    // Zoho sends these fields via webhook
    const { Mobile, First_Name, Last_Name, City } = body;

    // Validate — must have at least phone
    if (!Mobile) {
      return Response.json(
        { success: false, message: 'Mobile number required' },
        { status: 400 }
      );
    }

    // Build user_data — hash PII before sending to META
    const userData = {};

    if (Mobile) {
      userData.ph = [await hashSHA256(`+91${Mobile.trim()}`)];
    }
    if (First_Name) {
      userData.fn = [await hashSHA256(First_Name.toLowerCase().trim())];
    }
    if (Last_Name) {
      userData.ln = [await hashSHA256(Last_Name.toLowerCase().trim())];
    }
    if (City) {
      userData.ct = [await hashSHA256(City.toLowerCase().trim())];
    }

    // Always add country — improves match quality
    userData.country = [await hashSHA256('in')];

    // Build META Conversions API payload
    const payload = {
      data: [
        {
          event_name:       'Purchase',
          event_time:       Math.floor(Date.now() / 1000),
          event_id:         `zoho_patient_${id}_${Date.now()}`,
          action_source:    'other',        // CRM conversion — not website
          user_data:        userData,
          custom_data: {
            content_name: 'Patient Converted',
            currency:     'INR',
            value:        1,               // update to actual package value later
          },
        },
      ],
    };

    // Send to META Conversions API
    const metaRes = await fetch(
      `https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_ACCESS_TOKEN}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      }
    );

    const metaData = await metaRes.json();

    if (metaData.error) {
      console.error('META CAPI error:', metaData.error);
      return Response.json(
        { success: false, error: metaData.error },
        { status: 500 }
      );
    }

    console.log('✅ Offline conversion sent:', metaData);
    return Response.json({ success: true, meta: metaData });

  } catch (err) {
    console.error('Offline conversion error:', err);
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// SHA256 hash — required by META for all PII fields
async function hashSHA256(value) {
  const normalized = value.trim().toLowerCase();
  const msgBuffer  = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray  = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}