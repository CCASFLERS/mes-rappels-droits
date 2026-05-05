import webpush from 'web-push';
import { getSupabaseAdmin } from './_supabase.js';

function parisDateISO() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function textFor(language, count, firstTitle) {
  const titleMap = {
    fr: 'Rappel de démarche',
    en: 'Procedure reminder',
    es: 'Recordatorio de trámite',
    ru: 'Напоминание о процедуре',
    uk: 'Нагадування про дію',
    ar: 'تذكير بإجراء',
    fa: 'یادآوری کار اداری',
    dari: 'یادآوری کار اداری',
    ps: 'د اداري کار یادونه',
    tr: 'İşlem hatırlatıcısı',
    so: 'Xusuusin hawl',
  };
  const bodyMap = {
    fr: count > 1 ? `${count} rappels sont prévus aujourd’hui.` : `Aujourd’hui : ${firstTitle}.`,
    en: count > 1 ? `${count} reminders are scheduled today.` : `Today: ${firstTitle}.`,
    es: count > 1 ? `${count} recordatorios están previstos hoy.` : `Hoy: ${firstTitle}.`,
    ru: count > 1 ? `Сегодня запланировано ${count} напоминаний.` : `Сегодня: ${firstTitle}.`,
    uk: count > 1 ? `Сьогодні заплановано ${count} нагадувань.` : `Сьогодні: ${firstTitle}.`,
    ar: count > 1 ? `لديك ${count} تذكيرات اليوم.` : `اليوم: ${firstTitle}.`,
    fa: count > 1 ? `امروز ${count} یادآوری دارید.` : `امروز: ${firstTitle}.`,
    dari: count > 1 ? `امروز ${count} یادآوری دارید.` : `امروز: ${firstTitle}.`,
    ps: count > 1 ? `نن ${count} یادونې لرئ.` : `نن: ${firstTitle}.`,
    tr: count > 1 ? `Bugün ${count} hatırlatma var.` : `Bugün: ${firstTitle}.`,
    so: count > 1 ? `Maanta waxaa jira ${count} xusuusin.` : `Maanta: ${firstTitle}.`,
  };
  return {
    title: titleMap[language] || titleMap.fr,
    body: bodyMap[language] || bodyMap.fr,
  };
}

export default async function handler(request, response) {
  const authHeader = request.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return response.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  try {
    if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
      throw new Error('VAPID_PUBLIC_KEY ou VAPID_PRIVATE_KEY manquant dans Vercel.');
    }

    webpush.setVapidDetails(
      'mailto:contact@ccas-flers.local',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    const today = parisDateISO();
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('push_devices')
      .select('id, endpoint, p256dh, auth, language, reminders, last_sent_on');

    if (error) throw error;

    let sent = 0;
    let removed = 0;

    for (const device of data || []) {
      if (device.last_sent_on === today) continue;
      const reminders = Array.isArray(device.reminders) ? device.reminders : [];
      const todays = reminders.filter((r) => r && r.reminderDate === today);
      if (!todays.length) continue;

      const message = textFor(device.language || 'fr', todays.length, todays[0].title || 'Démarche');
      const subscription = {
        endpoint: device.endpoint,
        keys: { p256dh: device.p256dh, auth: device.auth },
      };
      const payload = JSON.stringify({
        title: message.title,
        body: message.body,
        url: '/',
      });

      try {
        await webpush.sendNotification(subscription, payload);
        sent += 1;
        await supabase.from('push_devices').update({ last_sent_on: today }).eq('id', device.id);
      } catch (error) {
        console.error('Erreur envoi push', error.statusCode, error.body || error.message);
        if (error.statusCode === 404 || error.statusCode === 410) {
          removed += 1;
          await supabase.from('push_devices').delete().eq('id', device.id);
        }
      }
    }

    return response.status(200).json({ ok: true, date: today, sent, removed });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ ok: false, error: error.message || 'Server error' });
  }
}
