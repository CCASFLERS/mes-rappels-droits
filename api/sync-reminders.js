import { getSupabaseAdmin } from './_supabase.js';

function validSubscription(subscription) {
  return Boolean(
    subscription &&
    subscription.endpoint &&
    subscription.keys &&
    subscription.keys.p256dh &&
    subscription.keys.auth
  );
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { clientId, language = 'fr', subscription, reminders = [] } = request.body || {};
    if (!clientId || !validSubscription(subscription)) {
      return response.status(400).json({ ok: false, error: 'Données push invalides' });
    }

    const supabase = getSupabaseAdmin();
    const payload = {
      client_id: clientId,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
      language,
      reminders: Array.isArray(reminders) ? reminders : [],
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('push_devices')
      .upsert(payload, { onConflict: 'client_id' });

    if (error) throw error;
    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ ok: false, error: error.message || 'Server error' });
  }
}
