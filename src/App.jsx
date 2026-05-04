import React, { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const STORAGE_KEY = 'mes-rappels-droits-pwa-v2';

const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'uk', label: 'Українська' },
  { code: 'dari', label: 'دری' },
  { code: 'ps', label: 'پښتو' },
  { code: 'fa', label: 'فارسی' },
  { code: 'ar', label: 'العربية' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'so', label: 'Soomaali' },
];

const RTL_LANGUAGES = new Set(['ar', 'fa', 'dari', 'ps']);

const UI = {
  fr: {
    appTitle: 'Mes rappels de droits',
    appSubtitle: 'Suivre, comprendre, ne pas oublier',
    home: 'Accueil',
    alerts: 'Alertes',
    settings: 'Réglages',
    language: 'Langue',
    addAction: 'Ajouter une démarche',
    myProcedures: 'Mes démarches',
    homeIntro: 'Ajoutez une démarche, puis cliquez simplement sur “C’est fait”.',
    todo: 'À faire maintenant',
    recentlyDone: 'Démarches faites',
    nothingToDo: 'Rien à faire pour le moment',
    emptyTodo: 'Ajoutez une démarche avec le bouton ci-dessous, ou attendez le prochain rappel automatique.',
    emptyDone: 'Les démarches terminées apparaîtront ici après validation.',
    guideStep: 'Guide pas à pas',
    doneButton: 'Oui, enregistrer',
    finishedQuestion: 'La démarche est terminée ?',
    todoHelp: 'Faites d’abord la démarche, puis enregistrez-la ici.',
    doneHelp: 'Ces démarches ont déjà été enregistrées.',
    rectify: 'Rectifier',
    delete: 'Supprimer',
    doneOn: 'Fait le',
    nextReminder: 'Prochain rappel',
    deleteTitle: 'Supprimer ce rappel ?',
    deleteText: 'Cette démarche ne sera plus suivie. Vous pourrez la rajouter plus tard si besoin.',
    cancel: 'Annuler',
    welcome: 'Bienvenue 👋',
    chooseLanguage: 'Choisissez votre langue pour commencer. Vous pourrez la changer à tout moment.',
    continue: 'Continuer',
    settingsIntro: 'Changer la langue, installer et partager l’application.',
    shareApp: 'Partager / QR code',
    scanToInstall: 'Scannez ce QR code pour ouvrir l’application sur un téléphone.',
    installHelp: 'Sur Android : menu ⋮ puis Installer ou Ajouter à l’écran d’accueil. Sur iPhone : Safari, Partager, puis Sur l’écran d’accueil.',
    installApp: 'Installer l’application',
    installTitle: 'Installer l’application sur le téléphone',
    installIntro: 'Ajoutez l’application sur l’écran d’accueil pour l’ouvrir comme une vraie application.',
    installReady: 'Installation disponible sur ce téléphone.',
    installUnavailable: 'Installation automatique indisponible ici. Utilisez le menu du navigateur.',
    installAndroidHelp: 'Sur Android / Chrome : appuyez sur “Installer l’application”. Si le bouton ne fonctionne pas, ouvrez le menu ⋮ puis “Installer l’application” ou “Ajouter à l’écran d’accueil”.',
    installIosHelp: 'Sur iPhone : ouvrez cette page avec Safari, appuyez sur Partager, puis choisissez “Sur l’écran d’accueil”. Apple ne permet pas de lancer l’installation automatiquement.',
    installed: 'Application installée',
    installedText: 'L’application semble déjà installée ou ouverte depuis l’écran d’accueil.',
    openFromHome: 'Ouvrez ensuite l’application depuis son icône sur l’écran d’accueil.',
    activateNotifications: 'Activer les notifications',
    notificationStepTitle: 'Activer les notifications',
    notificationStepText: 'Les notifications ne peuvent pas être forcées. La personne doit accepter la demande du téléphone.',
    alertsIntro: 'Préparation des rappels automatiques et des notifications.',
    browserNotifications: 'Notifications navigateur',
    currentStatus: 'État actuel',
    allow: 'Autoriser',
    notificationsDeniedTitle: 'Notifications bloquées',
    notificationsDeniedText: 'Les notifications sont bloquées par le navigateur. Vous pouvez continuer à utiliser l’application ; pour les réactiver, il faudra les autoriser dans les paramètres du navigateur.',
    notificationsUnsupportedTitle: 'Notifications indisponibles',
    notificationsUnsupportedText: 'Ce navigateur ne permet pas les notifications. Les rappels restent visibles dans l’application.',
    notificationsGrantedTitle: 'Notifications autorisées',
    notificationsGrantedText: 'Le navigateur accepte les notifications.',
    notificationsDefaultText: 'Vous pouvez autoriser les notifications pour recevoir les rappels sur cet appareil.',
    nextAlerts: 'Prochaines alertes prévues',
    noAlerts: 'Aucune alerte à venir.',
    guidesTitle: 'Guides pas à pas',
    guidesIntro: 'Les slides et vidéos seront ajoutés ici plus tard.',
    guideComing: 'Contenu à injecter plus tard : slides, vidéo ou texte simple.',
    back: 'Retour',
    ruleApplied: 'Règle appliquée',
    officialMarker: 'Repère officiel',
    reminderEnabled: 'Rappels activés',
    note: 'Note',
    save: 'Enregistrer',
    dateAutoAfterDone: 'La prochaine date est calculée automatiquement après “C’est fait”.',
    dateToEnter: 'Date à renseigner',
    saved: 'Enregistré',
    alreadyAdded: 'Déjà ajouté',
  },
  uk: {
    appTitle: 'Мої нагадування про права', appSubtitle: 'Стежити, розуміти, не забувати', home: 'Головна', alerts: 'Нагадування', settings: 'Налаштування', language: 'Мова', addAction: 'Додати дію', myProcedures: 'Мої дії', homeIntro: 'Додайте дію, потім натисніть “Зроблено”.', todo: 'Зробити', recentlyDone: 'Нещодавно виконано', nothingToDo: 'Поки нічого робити', emptyTodo: 'Додайте дію кнопкою нижче або дочекайтеся наступного нагадування.', emptyDone: 'Виконані дії з’являться тут після натискання “Зроблено”.', guideStep: 'Покроковий гід', doneButton: 'Так, зберегти', finishedQuestion: 'Дію завершено?', todoHelp: 'Спочатку виконайте дію, потім збережіть її тут.', doneHelp: 'Ці дії вже збережені.', rectify: 'Виправити', delete: 'Видалити', doneOn: 'Зроблено', nextReminder: 'Наступне нагадування', deleteTitle: 'Видалити це нагадування?', deleteText: 'Ця дія більше не буде відстежуватися.', cancel: 'Скасувати', welcome: 'Ласкаво просимо 👋', chooseLanguage: 'Виберіть мову. Її можна змінити пізніше.', continue: 'Продовжити', settingsIntro: 'Змінити мову, встановити та поділитися застосунком.', shareApp: 'Поділитися / QR-код', scanToInstall: 'Скануйте QR-код, щоб відкрити застосунок на телефоні.', installHelp: 'Android: меню ⋮, потім Install/Add to home screen. iPhone: Safari, Share, Add to Home Screen.', installApp: 'Встановити застосунок', installTitle: 'Встановити застосунок на телефон', installIntro: 'Додайте застосунок на головний екран.', installReady: 'Встановлення доступне на цьому телефоні.', installUnavailable: 'Автоматичне встановлення тут недоступне. Використайте меню браузера.', installAndroidHelp: 'Android / Chrome: натисніть “Встановити застосунок” або меню ⋮.', installIosHelp: 'iPhone: відкрийте в Safari, натисніть Поділитися, потім На головний екран.', installed: 'Застосунок встановлено', installedText: 'Застосунок уже встановлений або відкритий з головного екрана.', openFromHome: 'Потім відкрийте його з іконки на головному екрані.', activateNotifications: 'Увімкнути сповіщення', notificationStepTitle: 'Увімкнути сповіщення', notificationStepText: 'Сповіщення не можна примусово ввімкнути. Користувач має погодитися.', alertsIntro: 'Підготовка автоматичних нагадувань.', browserNotifications: 'Сповіщення браузера', currentStatus: 'Поточний стан', allow: 'Дозволити', notificationsDeniedTitle: 'Сповіщення заблоковано', notificationsDeniedText: 'Сповіщення заблоковані браузером. Нагадування залишаються видимими в застосунку.', notificationsUnsupportedTitle: 'Сповіщення недоступні', notificationsUnsupportedText: 'Цей браузер не підтримує сповіщення.', notificationsGrantedTitle: 'Сповіщення дозволено', notificationsGrantedText: 'Браузер приймає сповіщення.', notificationsDefaultText: 'Дозвольте сповіщення, щоб отримувати нагадування.', nextAlerts: 'Наступні нагадування', noAlerts: 'Немає майбутніх нагадувань.', guidesTitle: 'Покрокові гіди', guidesIntro: 'Слайди та відео будуть додані пізніше.', guideComing: 'Контент буде додано пізніше.', back: 'Назад', ruleApplied: 'Застосоване правило', officialMarker: 'Офіційний орієнтир', reminderEnabled: 'Нагадування увімкнено', note: 'Нотатка', save: 'Зберегти', dateAutoAfterDone: 'Наступна дата розраховується автоматично після “Зроблено”.', dateToEnter: 'Дата', saved: 'Збережено', alreadyAdded: 'Уже додано',
  },
  ar: {
    appTitle: 'تذكيراتي بالحقوق', appSubtitle: 'متابعة وفهم وعدم نسيان', home: 'الرئيسية', alerts: 'التنبيهات', settings: 'الإعدادات', language: 'اللغة', addAction: 'إضافة إجراء', myProcedures: 'إجراءاتي', homeIntro: 'أضف إجراءً ثم اضغط على “تم”.', todo: 'يجب القيام به', recentlyDone: 'تم مؤخرًا', nothingToDo: 'لا شيء حاليًا', emptyTodo: 'أضف إجراءً بالزر أدناه أو انتظر التذكير التالي.', emptyDone: 'ستظهر الإجراءات المنجزة هنا بعد الضغط على “تم”.', guideStep: 'دليل خطوة بخطوة', doneButton: 'نعم، حفظ', finishedQuestion: 'هل تمّ الإجراء؟', todoHelp: 'قم بالإجراء أولاً، ثم احفظه هنا.', doneHelp: 'تم تسجيل هذه الإجراءات بالفعل.', rectify: 'تعديل', delete: 'حذف', doneOn: 'تم في', nextReminder: 'التذكير القادم', deleteTitle: 'حذف هذا التذكير؟', deleteText: 'لن تتم متابعة هذا الإجراء بعد الآن.', cancel: 'إلغاء', welcome: 'مرحبًا 👋', chooseLanguage: 'اختر لغتك للبدء. يمكنك تغييرها لاحقًا.', continue: 'متابعة', settingsIntro: 'تغيير اللغة وتثبيت التطبيق ومشاركته.', shareApp: 'مشاركة / رمز QR', scanToInstall: 'امسح رمز QR لفتح التطبيق على الهاتف.', installHelp: 'Android: القائمة ⋮ ثم Install/Add to home screen. iPhone: Safari ثم Share ثم Add to Home Screen.', installApp: 'تثبيت التطبيق', installTitle: 'تثبيت التطبيق على الهاتف', installIntro: 'أضف التطبيق إلى الشاشة الرئيسية.', installReady: 'التثبيت متاح على هذا الهاتف.', installUnavailable: 'التثبيت التلقائي غير متاح هنا. استخدم قائمة المتصفح.', installAndroidHelp: 'Android / Chrome: اضغط “تثبيت التطبيق” أو استخدم القائمة ⋮.', installIosHelp: 'iPhone: افتح في Safari، اضغط Share ثم Add to Home Screen.', installed: 'تم تثبيت التطبيق', installedText: 'يبدو أن التطبيق مثبت أو مفتوح من الشاشة الرئيسية.', openFromHome: 'افتحه بعد ذلك من أيقونته على الشاشة الرئيسية.', activateNotifications: 'تفعيل الإشعارات', notificationStepTitle: 'تفعيل الإشعارات', notificationStepText: 'لا يمكن إجبار الإشعارات. يجب أن يوافق المستخدم.', alertsIntro: 'إعداد التذكيرات والتنبيهات.', browserNotifications: 'تنبيهات المتصفح', currentStatus: 'الحالة الحالية', allow: 'السماح', notificationsDeniedTitle: 'الإشعارات محظورة', notificationsDeniedText: 'الإشعارات محظورة من المتصفح. تبقى التذكيرات مرئية داخل التطبيق.', notificationsUnsupportedTitle: 'الإشعارات غير متاحة', notificationsUnsupportedText: 'هذا المتصفح لا يدعم الإشعارات.', notificationsGrantedTitle: 'تم السماح بالإشعارات', notificationsGrantedText: 'المتصفح يقبل الإشعارات.', notificationsDefaultText: 'يمكنك السماح بالإشعارات لتلقي التذكيرات.', nextAlerts: 'التنبيهات القادمة', noAlerts: 'لا توجد تنبيهات قادمة.', guidesTitle: 'أدلة خطوة بخطوة', guidesIntro: 'ستتم إضافة الشرائح والفيديوهات لاحقًا.', guideComing: 'سيتم إضافة المحتوى لاحقًا.', back: 'رجوع', ruleApplied: 'القاعدة المطبقة', officialMarker: 'مرجع رسمي', reminderEnabled: 'التذكيرات مفعلة', note: 'ملاحظة', save: 'حفظ', dateAutoAfterDone: 'يتم حساب التاريخ التالي تلقائيًا بعد “تم”.', dateToEnter: 'التاريخ', saved: 'تم الحفظ', alreadyAdded: 'مضاف بالفعل',
  },
  tr: {
    appTitle: 'Hak hatırlatmalarım', appSubtitle: 'Takip et, anla, unutma', home: 'Ana sayfa', alerts: 'Uyarılar', settings: 'Ayarlar', language: 'Dil', addAction: 'Bir işlem ekle', myProcedures: 'İşlemlerim', homeIntro: 'Bir işlem ekleyin, sonra “Yaptım” düğmesine basın.', todo: 'Yapılacak', recentlyDone: 'Son yapılanlar', nothingToDo: 'Şimdilik yapılacak yok', emptyTodo: 'Aşağıdaki düğmeyle bir işlem ekleyin veya sonraki hatırlatmayı bekleyin.', emptyDone: '“Yaptım” düğmesine bastığınız işlemler burada görünür.', guideStep: 'Adım adım rehber', doneButton: 'Evet, kaydet', finishedQuestion: 'İşlem tamamlandı mı?', todoHelp: 'Önce işlemi yapın, sonra burada kaydedin.', doneHelp: 'Bu işlemler zaten kaydedildi.', rectify: 'Düzelt', delete: 'Sil', doneOn: 'Yapıldı', nextReminder: 'Sonraki hatırlatma', deleteTitle: 'Bu hatırlatma silinsin mi?', deleteText: 'Bu işlem artık takip edilmeyecek.', cancel: 'İptal', welcome: 'Hoş geldiniz 👋', chooseLanguage: 'Başlamak için dilinizi seçin. Daha sonra değiştirebilirsiniz.', continue: 'Devam et', settingsIntro: 'Dili değiştirin, uygulamayı kurun ve paylaşın.', shareApp: 'Paylaş / QR kod', scanToInstall: 'Uygulamayı telefonda açmak için QR kodu tarayın.', installHelp: 'Android: ⋮ menüsü, Install/Add to home screen. iPhone: Safari, Share, Add to Home Screen.', installApp: 'Uygulamayı kur', installTitle: 'Uygulamayı telefona kur', installIntro: 'Uygulamayı ana ekrana ekleyin.', installReady: 'Bu telefonda kurulum kullanılabilir.', installUnavailable: 'Otomatik kurulum burada kullanılamıyor. Tarayıcı menüsünü kullanın.', installAndroidHelp: 'Android / Chrome: “Uygulamayı kur” düğmesine basın veya ⋮ menüsünü kullanın.', installIosHelp: 'iPhone: Safari ile açın, Paylaş’a basın, sonra Ana ekrana ekleyin.', installed: 'Uygulama kuruldu', installedText: 'Uygulama zaten kurulmuş veya ana ekrandan açılmış görünüyor.', openFromHome: 'Sonra ana ekrandaki ikonundan açın.', activateNotifications: 'Bildirimleri aç', notificationStepTitle: 'Bildirimleri aç', notificationStepText: 'Bildirimler zorla açılamaz. Kullanıcı kabul etmelidir.', alertsIntro: 'Otomatik hatırlatmalar hazırlanıyor.', browserNotifications: 'Tarayıcı bildirimleri', currentStatus: 'Mevcut durum', allow: 'İzin ver', notificationsDeniedTitle: 'Bildirimler engellendi', notificationsDeniedText: 'Bildirimler tarayıcı tarafından engellendi. Hatırlatmalar uygulama içinde görünür.', notificationsUnsupportedTitle: 'Bildirimler kullanılamıyor', notificationsUnsupportedText: 'Bu tarayıcı bildirimleri desteklemiyor.', notificationsGrantedTitle: 'Bildirimlere izin verildi', notificationsGrantedText: 'Tarayıcı bildirimleri kabul ediyor.', notificationsDefaultText: 'Hatırlatma almak için bildirimlere izin verebilirsiniz.', nextAlerts: 'Planlanan uyarılar', noAlerts: 'Yaklaşan uyarı yok.', guidesTitle: 'Adım adım rehberler', guidesIntro: 'Slaytlar ve videolar daha sonra eklenecek.', guideComing: 'İçerik daha sonra eklenecek.', back: 'Geri', ruleApplied: 'Uygulanan kural', officialMarker: 'Resmi referans', reminderEnabled: 'Hatırlatmalar açık', note: 'Not', save: 'Kaydet', dateAutoAfterDone: 'Sonraki tarih “Yaptım”dan sonra otomatik hesaplanır.', dateToEnter: 'Tarih', saved: 'Kaydedildi', alreadyAdded: 'Zaten eklendi',
  },
};

UI.fa = UI.ar;
UI.dari = UI.fa;
UI.ps = UI.fa;
UI.so = { ...UI.fr, home: 'Bogga hore', alerts: 'Xusuusin', settings: 'Dejinta', language: 'Luqad', addAction: 'Ku dar tallaabo', myProcedures: 'Tallaabooyinkayga', todo: 'In la sameeyo', recentlyDone: 'Dhawaan la sameeyay', guideStep: 'Hagid tallaabo-tallaabo', doneButton: 'Haa, kaydi', finishedQuestion: 'Hawshu ma dhammaatay?', todoHelp: 'Marka hore hawsha samee, kadib halkan ku kaydi.', doneHelp: 'Hawshan hore ayaa loo kaydiyay.', rectify: 'Sax', delete: 'Tirtir' };

const CATALOG = [
  { id: 'france_travail', rule: 'france_travail', title: 'France Travail', short: 'Actualisation mensuelle', cat: 'Emploi', icon: '💼', timing: 'Actualisation mensuelle. Date limite généralement le 15 du mois à minuit.' },
  { id: 'caf_rsa', rule: 'caf_quarterly', title: 'CAF / RSA', short: 'Déclaration trimestrielle', cat: 'Droits sociaux', icon: '💶', timing: 'Déclaration trimestrielle de ressources tous les 3 mois.' },
  { id: 'prime_activite', rule: 'caf_quarterly', title: 'Prime d’activité', short: 'Déclaration trimestrielle', cat: 'Droits sociaux', icon: '💶', timing: 'Déclaration trimestrielle de ressources tous les 3 mois.' },
  { id: 'aah_caf', rule: 'caf_quarterly', title: 'AAH — déclaration CAF', short: 'Déclaration trimestrielle — si vous êtes concerné', cat: 'Handicap', icon: '♿', timing: 'À utiliser seulement si vous êtes concerné par la déclaration trimestrielle AAH.' },
  { id: 'titre_sejour', rule: 'titre_sejour', title: 'Titre de séjour', short: 'Renouvellement à anticiper', cat: 'Séjour', icon: '🪪', timing: 'Demande généralement entre 4 et 2 mois avant la fin de validité.' },
  { id: 'css_sante', rule: 'css_sante', title: 'CSS / Santé', short: 'Renouvellement annuel', cat: 'Santé', icon: '🏥', timing: 'Droits CSS accordés pour 1 an. Renouvellement entre 4 et 2 mois avant la fin.' },
  { id: 'ame', rule: 'ame', title: 'AME', short: 'Renouvellement annuel', cat: 'Santé', icon: '🩺', timing: 'Renouvellement à déposer dans les 2 mois avant expiration.' },
  { id: 'logement_social', rule: 'logement_social', title: 'Logement social', short: 'Renouvellement annuel', cat: 'Logement', icon: '🏠', timing: 'Renouvellement annuel entre le 10e et le 12e mois.' },
  { id: 'mdph', rule: 'mdph_long', title: 'MDPH — dossier général', short: 'Renouvellement à anticiper', cat: 'Handicap', icon: '📁', timing: 'Renouvellement conseillé 6 mois avant la fin des droits.' },
  { id: 'aah_mdph', rule: 'mdph_long', title: 'AAH — renouvellement MDPH', short: 'Renouvellement à anticiper', cat: 'Handicap', icon: '♿', timing: 'Renouvellement AAH conseillé 6 mois avant la fin des droits.' },
  { id: 'rqth', rule: 'mdph_long', title: 'RQTH', short: 'Renouvellement à anticiper', cat: 'Handicap', icon: '🧩', timing: 'Renouvellement MDPH à anticiper avant l’échéance.' },
  { id: 'custom', rule: 'custom', title: 'Autre rappel', short: 'Rappel personnalisé', cat: 'Personnalisé', icon: '📌', timing: 'Rappel personnalisé.' },
];

function labelsFor(language) { return UI[language] || UI.fr; }
function catalogFor(item) { return CATALOG.find((c) => c.id === item.catalogId) || CATALOG.find((c) => c.id === 'custom'); }
function localISO(date) { const y = date.getFullYear(); const m = String(date.getMonth() + 1).padStart(2, '0'); const d = String(date.getDate()).padStart(2, '0'); return `${y}-${m}-${d}`; }
function todayISO() { const d = new Date(); return localISO(new Date(d.getFullYear(), d.getMonth(), d.getDate())); }
function parseDate(s) { if (!s) return null; const [y, m, d] = s.split('-').map(Number); if (!y || !m || !d) return null; return new Date(y, m - 1, d); }
function formatDate(s) { const d = parseDate(s); if (!d || Number.isNaN(d.getTime())) return '—'; return d.toLocaleDateString('fr-FR'); }
function addDays(s, n) { const d = parseDate(s) || parseDate(todayISO()); d.setDate(d.getDate() + n); return localISO(d); }
function addMonths(s, n) { const d = parseDate(s) || parseDate(todayISO()); d.setMonth(d.getMonth() + n); return localISO(d); }
function daysUntil(s) { return Math.round(((parseDate(s) || new Date()) - (parseDate(todayISO()) || new Date())) / 86400000); }
function statusOf(s) { const d = daysUntil(s); if (d < 0) return 'late'; if (d <= 7) return 'soon'; return 'ok'; }
function reminderOffsets(rule) { if (rule === 'france_travail') return [-5, -1, 0]; if (rule === 'caf_quarterly') return [-21, -7, -1, 0, 3]; if (rule === 'titre_sejour' || rule === 'css_sante') return [-120, -90, -60, -15, 0]; if (rule === 'ame' || rule === 'logement_social') return [-60, -30, -15, 0]; if (rule === 'mdph_long') return [-180, -120, -60, -30, 0]; return [-7, 0, 1]; }
function franceTravailCurrentDeadline(from = todayISO()) { const d = parseDate(from) || parseDate(todayISO()); const deadline = new Date(d.getFullYear(), d.getMonth(), 15); if (d.getDate() > 15) deadline.setMonth(deadline.getMonth() + 1); return localISO(deadline); }
function franceTravailNextDeadlineAfterDone(from = todayISO()) { return addMonths(franceTravailCurrentDeadline(from), 1); }
function franceTravailOpeningDate(deadlineDate) { const deadline = parseDate(deadlineDate) || parseDate(franceTravailCurrentDeadline()); const opening = new Date(deadline.getFullYear(), deadline.getMonth() - 1, 1); const previousMonthIsFebruary = opening.getMonth() === 1; opening.setDate(previousMonthIsFebruary ? 26 : 28); return localISO(opening); }
function nextAfterDone(item, from = todayISO()) { const rule = item.rule; if (rule === 'france_travail') return franceTravailNextDeadlineAfterDone(from); if (rule === 'caf_quarterly') return addMonths(from, 3); if (['css_sante', 'ame', 'logement_social', 'mdph_long', 'titre_sejour'].includes(rule)) return addMonths(from, 12); return addMonths(from, 1); }
function suggestedDate(catalog, from = todayISO()) { if (catalog.rule === 'france_travail') return franceTravailCurrentDeadline(from); if (catalog.rule === 'caf_quarterly') return addMonths(from, 3); if (catalog.rule === 'titre_sejour') return ''; if (catalog.rule === 'mdph_long') return addDays(from, 180); if (['css_sante', 'ame', 'logement_social'].includes(catalog.rule)) return addMonths(from, 12); return addDays(from, 30); }
function needsDate(item) { return ['titre_sejour', 'css_sante', 'ame', 'logement_social', 'mdph_long', 'custom'].includes(item.rule); }
function showAsTodo(item) { return !item.completedOnce || statusOf(item.nextDate) !== 'ok'; }
function makeItem(catalogId) { const c = CATALOG.find((x) => x.id === catalogId) || CATALOG[0]; return { uid: `${c.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`, catalogId: c.id, rule: c.rule, title: c.title, short: c.short, cat: c.cat, icon: c.icon, nextDate: suggestedDate(c), lastAction: '', note: '', notifications: true, completedOnce: false }; }
function normalizeItem(item) { const c = catalogFor(item); return { ...makeItem(c.id), ...item, rule: item.rule || c.rule, title: item.title || c.title, short: item.short || c.short, cat: item.cat || c.cat, icon: item.icon || c.icon }; }
function initialState() { return { language: 'fr', onboarded: false, tab: 'home', toast: null, items: [] }; }
function loadState() { try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) { const parsed = JSON.parse(saved); return { ...initialState(), ...parsed, items: Array.isArray(parsed.items) ? parsed.items.map(normalizeItem) : [] }; } } catch {} return initialState(); }
function upcomingAlerts(items) { return items.filter((item) => Boolean(item.nextDate)).flatMap((item) => { if (item.rule === 'france_travail') { const openingDate = franceTravailOpeningDate(item.nextDate); return [{ ...item, reminderDate: openingDate, offset: 'opening', label: 'Ouverture de l’actualisation' }, ...reminderOffsets(item.rule).map((offset) => ({ ...item, reminderDate: addDays(item.nextDate, offset), offset }))]; } return reminderOffsets(item.rule).map((offset) => ({ ...item, reminderDate: addDays(item.nextDate, offset), offset })); }).filter((r) => daysUntil(r.reminderDate) >= 0).sort((a, b) => parseDate(a.reminderDate) - parseDate(b.reminderDate)).slice(0, 12); }
function notificationStatus() { if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported'; return window.Notification.permission; }
function isStandaloneMode() { if (typeof window === 'undefined') return false; return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true; }
function detectPlatform() { if (typeof navigator === 'undefined') return 'other'; const ua = navigator.userAgent || ''; if (/iphone|ipad|ipod/i.test(ua)) return 'ios'; if (/android/i.test(ua)) return 'android'; return 'other'; }

function Button({ children, onClick, variant = 'default', className = '', type = 'button', disabled = false }) {
  const styles = { default: 'bg-slate-900 text-white hover:bg-slate-800', outline: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50', ghost: 'bg-transparent text-slate-700 hover:bg-slate-100', destructive: 'bg-red-600 text-white hover:bg-red-700', success: 'bg-emerald-700 text-white hover:bg-emerald-800' };
  return <button type={type} onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-50 ${styles[variant] || styles.default} ${className}`}>{children}</button>;
}
function Card({ children, className = '' }) { return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>; }
function CardContent({ children, className = '' }) { return <div className={className}>{children}</div>; }

function AddMenu({ actions, labels }) {
  const [open, setOpen] = useState(false);
  function choose(id) { actions.add(id); setOpen(false); }
  return <div className="relative inline-flex"><Button className="px-5 py-3 text-base shadow-md" onClick={() => setOpen(!open)}>➕ {labels.addAction} ▾</Button>{open && <div className="absolute right-0 top-12 z-50 max-h-[70vh] w-72 overflow-auto rounded-2xl border bg-white p-2 text-left shadow-xl">{CATALOG.map((c) => <button key={c.id} type="button" onClick={() => choose(c.id)} className="flex w-full items-start gap-3 rounded-xl p-3 text-left hover:bg-slate-50"><span className="text-2xl">{c.icon}</span><span><span className="block font-semibold">{c.title}</span><span className="block text-xs text-slate-500">{c.short}</span></span></button>)}</div>}</div>;
}

function Toast({ toast, close }) { if (!toast) return null; return <div className="fixed left-4 right-4 top-20 z-50 mx-auto max-w-xl rounded-2xl border bg-white p-4 shadow-lg sm:left-auto sm:right-6 sm:w-96"><div className="flex items-start justify-between gap-3"><div><div className="font-bold">{toast.title}</div><div className="mt-1 text-sm text-slate-600">{toast.body}</div></div><button onClick={close} className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100">×</button></div></div>; }
function EmptyState({ labels, actions }) { return <Card className="border-dashed"><CardContent className="p-6 text-center"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl">➕</div><h3 className="text-lg font-semibold">{labels.nothingToDo}</h3><p className="mt-1 text-slate-600">{labels.emptyTodo}</p><div className="mt-5"><AddMenu actions={actions} labels={labels} /></div></CardContent></Card>; }
function DeleteDialog({ item, labels, cancel, confirm }) { if (!item) return null; return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"><Card className="w-full max-w-md rounded-3xl shadow-xl"><CardContent className="p-6"><div className="text-3xl">🗑</div><h2 className="mt-3 text-xl font-bold">{labels.deleteTitle}</h2><p className="mt-2 text-slate-600"><strong>{item.title}</strong> — {labels.deleteText}</p><div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2"><Button variant="outline" className="py-3" onClick={cancel}>{labels.cancel}</Button><Button variant="destructive" className="py-3" onClick={confirm}>{labels.delete}</Button></div></CardContent></Card></div>; }
function UpdateAvailableBanner({ show, onUpdate, onDismiss }) { if (!show) return null; return <div className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-lg sm:bottom-6 sm:left-auto sm:right-6 sm:w-96"><div className="font-bold text-amber-950">Nouvelle version disponible</div><div className="mt-1 text-sm text-amber-900">Une mise à jour de l’application est prête. Appuyez sur “Mettre à jour” pour charger la dernière version.</div><div className="mt-3 grid grid-cols-2 gap-2"><Button variant="outline" onClick={onDismiss}>Plus tard</Button><Button onClick={onUpdate}>Mettre à jour</Button></div></div>; }

function ProcedureCard({ item, labels, actions }) {
  const todo = showAsTodo(item);
  const missingDate = needsDate(item) && !item.nextDate;
  return <Card className={`overflow-hidden border-l-4 ${todo ? 'border-l-slate-900' : 'border-l-emerald-500'}`}><CardContent className="p-4"><div className="flex items-start gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-3xl">{item.icon}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold">{item.title}</h3><span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{item.cat}</span></div><p className="mt-1 text-sm text-slate-600">{missingDate ? labels.dateToEnter : todo ? item.short : `${labels.doneOn} ${formatDate(item.lastAction)}`}</p>{!todo && <p className="mt-1 text-xs text-slate-500">{labels.nextReminder} : {formatDate(item.nextDate)}</p>}{todo && item.completedOnce && item.nextDate && <p className="mt-1 text-xs text-slate-500">{labels.nextReminder} : {formatDate(item.nextDate)}</p>}</div></div>{todo ? (missingDate ? <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"><Button variant="outline" onClick={() => actions.guide(item)}>📘 {labels.guideStep}</Button><Button variant="success" onClick={() => actions.edit(item)}>📅 {labels.dateToEnter}</Button></div> : <div className="mt-4 space-y-2"><p className="text-sm font-medium text-slate-700">{labels.finishedQuestion}</p><div className="grid grid-cols-1 gap-2 sm:grid-cols-3"><Button variant="outline" onClick={() => actions.guide(item)}>📘 {labels.guideStep}</Button><Button variant="default" onClick={() => actions.done(item.uid)}>✅ {labels.doneButton}</Button><Button variant="ghost" onClick={() => actions.edit(item)}>⚙ {labels.rectify}</Button></div></div>) : <div className="mt-4 grid grid-cols-2 gap-2"><Button variant="outline" onClick={() => actions.edit(item)}>⚙ {labels.rectify}</Button><Button variant="ghost" onClick={() => actions.askDelete(item.uid)}>🗑 {labels.delete}</Button></div>}</CardContent></Card>;
}

function Header({ labels, actions }) { return <div className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3"><button type="button" onClick={() => actions.setTab('home')} className="flex items-center gap-3 text-left"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">🛡️</div><div><div className="font-bold leading-tight">{labels.appTitle}</div><div className="text-xs text-slate-500">{labels.appSubtitle}</div></div></button><div className="flex items-center gap-2"><Button variant="ghost" className="hidden sm:inline-flex" onClick={() => actions.setTab('settings')}>🌐 {labels.language}</Button><AddMenu actions={actions} labels={labels} /></div></div></div>; }
function Nav({ labels, tab, setTab }) { const tabs = [['home', '🏠', labels.home], ['alerts', '🔔', labels.alerts], ['settings', '⚙️', labels.settings]]; return <div className="mb-6 hidden flex-wrap gap-2 sm:flex">{tabs.map(([id, icon, label]) => <Button key={id} variant={tab === id ? 'default' : 'outline'} onClick={() => setTab(id)}><span>{icon}</span>{label}</Button>)}</div>; }
function BottomNav({ labels, tab, setTab }) { const tabs = [['home', '🏠', labels.home], ['alerts', '🔔', labels.alerts], ['settings', '⚙️', labels.settings]]; return <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white sm:hidden"><div className="grid grid-cols-3">{tabs.map(([id, icon, label]) => <button key={id} type="button" onClick={() => setTab(id)} className={`flex flex-col items-center gap-1 px-1 py-2 text-[11px] ${tab === id ? 'font-bold text-slate-950' : 'text-slate-500'}`}><span className="text-lg">{icon}</span><span>{label}</span></button>)}</div></div>; }

function Onboarding({ state, setState, labels }) { return <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white p-4"><Card className="w-full max-w-xl rounded-3xl shadow-lg"><CardContent className="p-6 sm:p-8"><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-3xl text-white">🌐</div><h1 className="text-3xl font-bold">{labels.welcome}</h1><p className="mt-2 text-slate-600">{labels.chooseLanguage}</p><div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">{LANGUAGES.map((lang) => <button key={lang.code} type="button" onClick={() => setState((s) => ({ ...s, language: lang.code }))} className={`rounded-2xl border p-4 text-left hover:bg-slate-50 ${state.language === lang.code ? 'ring-2 ring-slate-900' : ''}`}><div className="font-semibold">{lang.label}</div></button>)}</div><Button className="mt-6 w-full py-6 text-base" onClick={() => setState((s) => ({ ...s, onboarded: true }))}>{labels.continue}</Button></CardContent></Card></div>; }

function InstallPanel({ labels, deferredInstallPrompt, standalone, platform, onInstall, permission, askNotifications }) {
  const canAutoInstall = Boolean(deferredInstallPrompt) && !standalone;
  const installHelpText = standalone
    ? labels.openFromHome
    : platform === 'ios'
      ? labels.installIosHelp
      : platform === 'android'
        ? labels.installAndroidHelp
        : labels.installUnavailable;
  const installButtonText = standalone
    ? labels.installed
    : canAutoInstall
      ? labels.installApp
      : platform === 'ios'
        ? 'Voir les étapes iPhone'
        : 'Voir comment installer';
  const notificationButtonText = permission === 'granted'
    ? labels.notificationsGrantedTitle
    : permission === 'denied'
      ? labels.notificationsDeniedTitle
      : permission === 'unsupported'
        ? labels.notificationsUnsupportedTitle
        : labels.activateNotifications;
  return <Card><CardContent className="p-5"><h2 className="text-lg font-bold">📲 {labels.installTitle}</h2><p className="mt-1 text-slate-600">{standalone ? labels.installedText : labels.installIntro}</p><div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{installHelpText}</div><div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"><Button className="py-4" onClick={onInstall} disabled={standalone}>📲 {installButtonText}</Button><Button variant={permission === 'granted' ? 'success' : 'outline'} className="py-4" onClick={askNotifications}>🔔 {notificationButtonText}</Button></div><div className="mt-3 rounded-xl bg-white p-3 text-xs text-slate-500"><strong>{labels.notificationStepTitle} :</strong> {labels.notificationStepText}</div></CardContent></Card>;
}

function Home({ state, labels, actions, installProps }) {
  const todo = state.items.filter(showAsTodo).sort((a, b) => parseDate(a.nextDate) - parseDate(b.nextDate));
  const done = state.items.filter((i) => !showAsTodo(i)).sort((a, b) => parseDate(b.lastAction) - parseDate(a.lastAction));
  return <div className="space-y-6"><section className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm sm:p-8"><h1 className="text-3xl font-bold">{labels.myProcedures}</h1><p className="mt-2 text-slate-300">{labels.homeIntro}</p></section>{(!installProps.standalone || installProps.permission !== 'granted') && <InstallPanel labels={labels} {...installProps} />}<section className="rounded-3xl border-2 border-slate-300 bg-white p-4 shadow-sm"><div className="mb-3 flex items-center justify-between"><div><h2 className="text-xl font-bold">{labels.todo}</h2><p className="text-sm text-slate-500">{labels.todoHelp}</p></div><span className="rounded-full bg-slate-200 px-3 py-1 text-sm text-slate-700">{todo.length}</span></div><div className="space-y-3">{todo.length ? todo.map((item) => <ProcedureCard key={item.uid} item={item} labels={labels} actions={actions} />) : <EmptyState labels={labels} actions={actions} />}</div></section><section className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-4"><div className="mb-3 flex items-center justify-between"><div><h2 className="text-xl font-bold">{labels.recentlyDone}</h2><p className="text-sm text-emerald-800">{labels.doneHelp}</p></div><span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800">{done.length}</span></div><div className="space-y-3">{done.length ? done.map((item) => <ProcedureCard key={item.uid} item={item} labels={labels} actions={actions} />) : <p className="rounded-2xl bg-white p-4 text-sm text-slate-500">{labels.emptyDone}</p>}</div></section></div>;
}

function Alerts({ state, labels, actions, permission, setPermission }) {
  const reminders = upcomingAlerts(state.items);
  async function ask() { const current = notificationStatus(); if (current === 'unsupported' || current === 'denied') { setPermission(current); return; } try { setPermission(await window.Notification.requestPermission()); } catch { setPermission('unsupported'); } }
  const message = permission === 'denied' ? [labels.notificationsDeniedTitle, labels.notificationsDeniedText, 'bg-red-50 border-red-100 text-red-900'] : permission === 'granted' ? [labels.notificationsGrantedTitle, labels.notificationsGrantedText, 'bg-emerald-50 border-emerald-100 text-emerald-900'] : permission === 'unsupported' ? [labels.notificationsUnsupportedTitle, labels.notificationsUnsupportedText, 'bg-amber-50 border-amber-100 text-amber-900'] : [labels.browserNotifications, labels.notificationsDefaultText, 'bg-slate-50 border-slate-100 text-slate-700'];
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">{labels.alerts}</h1><p className="mt-1 text-slate-600">{labels.alertsIntro}</p></div><Card><CardContent className="p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-bold">🔔 {labels.browserNotifications}</h2><p className="mt-1 text-slate-600">{labels.currentStatus} : <strong>{permission}</strong></p></div>{permission === 'default' && <Button variant="outline" onClick={ask}>{labels.allow}</Button>}</div><div className={`mt-4 rounded-2xl border p-4 text-sm ${message[2]}`}><div className="font-semibold">{message[0]}</div><div className="mt-1">{message[1]}</div></div></CardContent></Card><Card><CardContent className="p-5"><h2 className="text-lg font-bold">{labels.nextAlerts}</h2><div className="mt-4 space-y-3">{reminders.length ? reminders.map((r) => <button key={`${r.uid}-${r.offset}`} type="button" onClick={() => actions.edit(r)} className="flex w-full items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 text-left hover:bg-slate-100"><div><div className="font-semibold">{r.icon} {r.title}</div><div className="text-sm text-slate-500">{r.label ? r.label : r.offset < 0 ? Math.abs(r.offset) + ' jour(s) avant' : r.offset === 0 ? 'Le jour même' : r.offset + ' jour(s) après'}</div></div><div className="text-right text-sm font-semibold">{formatDate(r.reminderDate)}</div></button>) : <p className="text-slate-500">{labels.noAlerts}</p>}</div></CardContent></Card></div>;
}

function Settings({ state, labels, setState, appUrl, installProps }) { return <div className="space-y-6"><div><h1 className="text-3xl font-bold">{labels.settings}</h1><p className="mt-1 text-slate-600">{labels.settingsIntro}</p></div><InstallPanel labels={labels} {...installProps} /><Card><CardContent className="p-5"><h2 className="text-lg font-bold">🌐 {labels.language}</h2><div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">{LANGUAGES.map((lang) => <Button key={lang.code} variant={state.language === lang.code ? 'default' : 'outline'} className="justify-start" onClick={() => setState((s) => ({ ...s, language: lang.code, toast: { title: labelsFor(lang.code).saved, body: lang.label } }))}>{lang.label}</Button>)}</div></CardContent></Card><Card><CardContent className="p-5"><h2 className="text-lg font-bold">📱 {labels.shareApp}</h2><p className="mt-1 text-slate-600">{labels.scanToInstall}</p><div className="mt-4 inline-block rounded-2xl bg-white p-4 shadow-sm"><QRCodeSVG value={appUrl} size={220} includeMargin /></div><p className="mt-3 max-w-xl text-sm text-slate-600">{labels.installHelp}</p><p className="mt-2 break-all rounded-xl bg-slate-50 p-3 text-xs text-slate-600">{appUrl}</p></CardContent></Card></div>; }

function Guides({ labels, setTab }) { return <div className="space-y-6"><div><h1 className="text-3xl font-bold">{labels.guidesTitle}</h1><p className="mt-1 text-slate-600">{labels.guidesIntro}</p></div><Card><CardContent className="p-5"><div className="grid grid-cols-1 gap-3 md:grid-cols-2">{CATALOG.filter((c) => c.id !== 'custom').map((c) => <div key={c.id} className="rounded-2xl bg-slate-50 p-4"><div className="font-semibold">📘 {labels.guideStep} — {c.title}</div><div className="mt-1 text-sm text-slate-600">{labels.guideComing}</div></div>)}</div><Button className="mt-5" onClick={() => setTab('home')}>{labels.back}</Button></CardContent></Card></div>; }

function Detail({ item, labels, actions }) { const [draft, setDraft] = useState(item); useEffect(() => setDraft(item), [item]); if (!draft) return null; const c = catalogFor(draft); return <div className="space-y-6"><Button variant="ghost" onClick={() => actions.setTab('home')}>← {labels.back}</Button><Card className="rounded-3xl"><CardContent className="p-6 sm:p-8"><div className="flex items-start gap-4"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-slate-100 text-4xl">{draft.icon}</div><div><h1 className="text-3xl font-bold">{draft.title}</h1><p className="mt-1 text-slate-600">{draft.short}</p></div></div><div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700"><div className="font-semibold">{labels.ruleApplied}</div><div className="mt-1">{c.timing}</div></div><div className="mt-6 space-y-4">{needsDate(draft) ? <label className="space-y-2 block"><span className="text-sm font-medium text-slate-700">{labels.dateToEnter}</span><input type="date" value={draft.nextDate} onChange={(e) => setDraft({ ...draft, nextDate: e.target.value })} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3" /></label> : <div className="rounded-2xl bg-white p-4 text-sm text-slate-700">{labels.dateAutoAfterDone}</div>}<label className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-3 py-3"><input type="checkbox" checked={draft.notifications !== false} onChange={(e) => setDraft({ ...draft, notifications: e.target.checked })} /><span className="text-sm font-medium text-slate-700">{labels.reminderEnabled}</span></label><label className="space-y-2 block"><span className="text-sm font-medium text-slate-700">{labels.note}</span><textarea value={draft.note || ''} onChange={(e) => setDraft({ ...draft, note: e.target.value })} rows={4} className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-3" /></label></div><div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3"><Button variant="success" className="py-6" onClick={() => actions.done(draft.uid)}>✅ {labels.doneButton}</Button><Button className="py-6" onClick={() => actions.save(draft)}>💾 {labels.save}</Button><Button variant="outline" className="py-6" onClick={() => actions.askDelete(draft.uid)}>🗑 {labels.delete}</Button></div></CardContent></Card></div>; }

export default function App() {
  const [state, setState] = useState(loadState);
  const [selectedUid, setSelectedUid] = useState(null);
  const [deleteUid, setDeleteUid] = useState(null);
  const [appUrl, setAppUrl] = useState('');
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState(null);
  const [standalone, setStandalone] = useState(isStandaloneMode());
  const [permission, setPermission] = useState(notificationStatus());
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [updateDismissed, setUpdateDismissed] = useState(false);
  const labels = labelsFor(state.language);
  const platform = detectPlatform();

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {} }, [state]);
  useEffect(() => { if (typeof document !== 'undefined') { document.documentElement.lang = state.language; document.documentElement.dir = RTL_LANGUAGES.has(state.language) ? 'rtl' : 'ltr'; } }, [state.language]);
  useEffect(() => { if (typeof window !== 'undefined') setAppUrl(window.location.origin + window.location.pathname); }, []);
  useEffect(() => {
    function onBeforeInstallPrompt(event) { event.preventDefault(); setDeferredInstallPrompt(event); }
    function onInstalled() { setStandalone(true); setDeferredInstallPrompt(null); }
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => { window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt); window.removeEventListener('appinstalled', onInstalled); };
  }, []);
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return undefined;
    let refreshing = false;
    function onControllerChange() {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    }
    function trackInstalling(worker) {
      if (!worker) return;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          setWaitingWorker(worker);
          setUpdateDismissed(false);
        }
      });
    }
    async function setupUpdateListener() {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setUpdateDismissed(false);
        }
        if (registration.installing) trackInstalling(registration.installing);
        registration.addEventListener('updatefound', () => trackInstalling(registration.installing));
        if (registration.update) registration.update();
      } catch {}
    }
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
    setupUpdateListener();
    return () => navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
  }, []);

  const selected = useMemo(() => state.items.find((i) => i.uid === selectedUid), [state.items, selectedUid]);
  const deleteItem = useMemo(() => state.items.find((i) => i.uid === deleteUid), [state.items, deleteUid]);

  async function installApp() {
    if (standalone) {
      setState((s) => ({ ...s, toast: { title: labels.installed, body: labels.installedText } }));
      return;
    }
    if (!deferredInstallPrompt) {
      const body = platform === 'ios'
        ? labels.installIosHelp
        : platform === 'android'
          ? labels.installAndroidHelp
          : labels.installUnavailable;
      setState((s) => ({ ...s, toast: { title: labels.installTitle, body } }));
      return;
    }
    try {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      setDeferredInstallPrompt(null);
      const accepted = choice && choice.outcome === 'accepted';
      setState((s) => ({ ...s, toast: { title: accepted ? labels.installed : labels.installTitle, body: accepted ? labels.openFromHome : labels.installAndroidHelp } }));
    } catch {
      setState((s) => ({ ...s, toast: { title: labels.installUnavailable, body: labels.installAndroidHelp } }));
    }
    setStandalone(isStandaloneMode());
  }

  async function askNotifications() {
    const current = notificationStatus();
    if (current === 'unsupported') {
      setPermission('unsupported');
      setState((s) => ({ ...s, toast: { title: labels.notificationsUnsupportedTitle, body: labels.notificationsUnsupportedText } }));
      return;
    }
    if (current === 'denied') {
      setPermission('denied');
      setState((s) => ({ ...s, toast: { title: labels.notificationsDeniedTitle, body: labels.notificationsDeniedText } }));
      return;
    }
    if (current === 'granted') {
      setPermission('granted');
      try { new window.Notification(labels.appTitle, { body: labels.notificationsGrantedText }); } catch {}
      setState((s) => ({ ...s, toast: { title: labels.notificationsGrantedTitle, body: labels.notificationsGrantedText } }));
      return;
    }
    try {
      const result = await window.Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        try { new window.Notification(labels.appTitle, { body: labels.notificationsGrantedText }); } catch {}
        setState((s) => ({ ...s, toast: { title: labels.notificationsGrantedTitle, body: labels.notificationsGrantedText } }));
      } else if (result === 'denied') {
        setState((s) => ({ ...s, toast: { title: labels.notificationsDeniedTitle, body: labels.notificationsDeniedText } }));
      } else {
        setState((s) => ({ ...s, toast: { title: labels.browserNotifications, body: labels.notificationsDefaultText } }));
      }
    } catch {
      setPermission('unsupported');
      setState((s) => ({ ...s, toast: { title: labels.notificationsUnsupportedTitle, body: labels.notificationsUnsupportedText } }));
    }
  }

  function applyAppUpdate() {
    if (!waitingWorker) return;
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
  }

  const installProps = { deferredInstallPrompt, standalone, platform, onInstall: installApp, permission, askNotifications };

  const actions = {
    setTab: (tab) => setState((s) => ({ ...s, tab })),
    add: (catalogId) => setState((s) => {
      const c = CATALOG.find((x) => x.id === catalogId);
      if (!c) return s;
      if (catalogId !== 'custom' && s.items.some((i) => i.catalogId === catalogId)) return { ...s, toast: { title: labels.alreadyAdded, body: c.title } };
      return { ...s, tab: 'home', items: [makeItem(catalogId), ...s.items], toast: { title: labels.saved, body: c.title } };
    }),
    done: (uid) => {
      const item = state.items.find((i) => i.uid === uid);
      if (item && needsDate(item) && !item.nextDate) {
        setSelectedUid(uid);
        setState((s) => ({ ...s, tab: 'detail', toast: { title: labels.dateToEnter, body: item.title } }));
        return;
      }
      setState((s) => ({ ...s, tab: 'home', items: s.items.map((i) => i.uid === uid ? { ...i, completedOnce: true, lastAction: todayISO(), nextDate: nextAfterDone(i) } : i), toast: { title: '✅', body: labels.doneButton } }));
    },
    edit: (item) => { setSelectedUid(item.uid); setState((s) => ({ ...s, tab: 'detail' })); },
    guide: () => setState((s) => ({ ...s, tab: 'guides' })),
    save: (draft) => { setState((s) => ({ ...s, items: s.items.map((i) => i.uid === draft.uid ? normalizeItem(draft) : i), toast: { title: labels.saved, body: draft.title } })); },
    askDelete: (uid) => setDeleteUid(uid),
    cancelDelete: () => setDeleteUid(null),
    confirmDelete: () => { setState((s) => ({ ...s, tab: 'home', items: s.items.filter((i) => i.uid !== deleteUid) })); setDeleteUid(null); setSelectedUid(null); },
  };

  if (!state.onboarded) return <Onboarding state={state} setState={setState} labels={labels} />;

  return <div className="min-h-screen bg-slate-50 pb-24 text-slate-950 sm:pb-10"><Toast toast={state.toast} close={() => setState((s) => ({ ...s, toast: null }))} /><UpdateAvailableBanner show={Boolean(waitingWorker) && !updateDismissed} onUpdate={applyAppUpdate} onDismiss={() => setUpdateDismissed(true)} /><DeleteDialog item={deleteItem} labels={labels} cancel={actions.cancelDelete} confirm={actions.confirmDelete} /><Header labels={labels} actions={actions} /><main className="mx-auto max-w-6xl px-4 py-6"><Nav labels={labels} tab={state.tab} setTab={actions.setTab} />{state.tab === 'home' && <Home state={state} labels={labels} actions={actions} installProps={installProps} />}{state.tab === 'alerts' && <Alerts state={state} labels={labels} actions={actions} permission={permission} setPermission={setPermission} />}{state.tab === 'settings' && <Settings state={state} labels={labels} setState={setState} appUrl={appUrl} installProps={installProps} />}{state.tab === 'guides' && <Guides labels={labels} setTab={actions.setTab} />}{state.tab === 'detail' && <Detail item={selected} labels={labels} actions={actions} />}</main><BottomNav labels={labels} tab={state.tab} setTab={actions.setTab} /></div>;
}
