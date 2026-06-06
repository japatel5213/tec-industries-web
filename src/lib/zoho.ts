/**
 * Zoho CRM OAuth & REST API Helper
 */

/**
 * Refreshes and returns the Zoho CRM Access Token using configured OAuth credentials.
 */
export async function getZohoAccessToken(): Promise<string | null> {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  try {
    const tokenUrl = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`;
    
    const res = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('[Zoho CRM OAuth] Failed to refresh access token:', errorText);
      return null;
    }

    const data = await res.json();
    return data.access_token || null;
  } catch (err) {
    console.error('[Zoho CRM OAuth] Error refreshing access token:', err);
    return null;
  }
}

interface ZohoLeadPayload {
  name: string;
  email?: string;
  phone: string;
  company?: string;
  description?: string;
  source?: string;
}

/**
 * Pushes a lead to Zoho CRM using the REST API (v3).
 * Returns true if successful, false otherwise.
 */
export async function pushLeadToZohoCRM(lead: ZohoLeadPayload): Promise<boolean> {
  try {
    const token = await getZohoAccessToken();
    if (!token) {
      return false;
    }

    const nameParts = lead.name.trim().split(/\s+/);
    const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0] || 'Unknown';

    // Map fields. Note: Customize the WhatsApp custom field API name if needed (e.g., WhatsApp_Number)
    const recordPayload = {
      data: [
        {
          First_Name: firstName,
          Last_Name: lastName,
          Email: lead.email || '',
          Phone: lead.phone,
          Mobile: lead.phone,
          Company: lead.company || 'Individual / B2B Lead',
          Description: lead.description || '',
          Lead_Source: lead.source || 'B2B Mail Sync',
          WhatsApp_Number: lead.phone
        }
      ]
    };

    console.log('[Zoho CRM API] Pushing lead details to Leads module...');
    const res = await fetch('https://www.zohoapis.in/crm/v3/Leads', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recordPayload)
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('[Zoho CRM API] Error response:', data);
      return false;
    }

    console.log('[Zoho CRM API] Lead inserted successfully via REST API:', data);
    return true;
  } catch (err) {
    console.error('[Zoho CRM API] Error in pushLeadToZohoCRM:', err);
    return false;
  }
}
