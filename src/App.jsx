import React, { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const STORAGE_KEY = 'mes-rappels-droits-pwa-v2';

const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'ru', label: 'Русский' },
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
    homeIntro: 'Ajoutez une démarche, puis enregistrez-la quand elle est terminée.',
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
    openGuideIntro: 'Ouvrir le guide officiel ou sa traduction automatique selon la langue choisie.',
    back: 'Retour',
    ruleApplied: 'Règle appliquée',
    officialMarker: 'Repère officiel',
    reminderEnabled: 'Rappels activés',
    note: 'Note',
    save: 'Enregistrer',
    dateAutoAfterDone: 'La prochaine date est calculée automatiquement après enregistrement.',
    dateToEnter: 'Date à renseigner',
    saved: 'Enregistré',
    alreadyAdded: 'Déjà ajouté',
    updateTitle: 'Nouvelle version disponible',
    updateText: 'Une mise à jour de l’application est prête. Appuyez sur “Mettre à jour” pour charger la dernière version.',
    updateNow: 'Mettre à jour',
    later: 'Plus tard',
  },

  en: {
    appTitle: 'My rights reminders',
    appSubtitle: 'Track, understand, do not forget',
    home: 'Home',
    alerts: 'Alerts',
    settings: 'Settings',
    language: 'Language',
    addAction: 'Add a procedure',
    myProcedures: 'My procedures',
    homeIntro: 'Add a procedure, then record it when it is done.',
    todo: 'To do now',
    recentlyDone: 'Recorded procedures',
    nothingToDo: 'Nothing to do for now',
    emptyTodo: 'Add a procedure with the button below, or wait for the next automatic reminder.',
    emptyDone: 'Completed procedures will appear here after you record them.',
    guideStep: 'Step-by-step guide',
    doneButton: 'Yes, record it',
    finishedQuestion: 'Is the procedure finished?',
    todoHelp: 'Do the procedure first, then record it here.',
    doneHelp: 'These procedures have already been recorded.',
    rectify: 'Edit',
    delete: 'Delete',
    doneOn: 'Done on',
    nextReminder: 'Next reminder',
    deleteTitle: 'Delete this reminder?',
    deleteText: 'This procedure will no longer be tracked. You can add it again later if needed.',
    cancel: 'Cancel',
    welcome: 'Welcome 👋',
    chooseLanguage: 'Choose your language to start. You can change it at any time.',
    continue: 'Continue',
    settingsIntro: 'Change language, install and share the app.',
    shareApp: 'Share / QR code',
    scanToInstall: 'Scan this QR code to open the app on a phone.',
    installHelp: 'On Android: menu ⋮ then Install or Add to home screen. On iPhone: Safari, Share, then Add to Home Screen.',
    installApp: 'Install the app',
    installTitle: 'Install the app on the phone',
    installIntro: 'Add the app to the home screen to open it like a real app.',
    installReady: 'Installation is available on this phone.',
    installUnavailable: 'Automatic installation is not available here. Use the browser menu.',
    installAndroidHelp: 'On Android / Chrome: tap “Install the app”. If it does not work, open the ⋮ menu, then “Install app” or “Add to home screen”.',
    installIosHelp: 'On iPhone: open this page in Safari, tap Share, then choose “Add to Home Screen”. Apple does not allow automatic installation.',
    installed: 'App installed',
    installedText: 'The app seems to be installed or opened from the home screen.',
    openFromHome: 'Then open the app from its icon on the home screen.',
    activateNotifications: 'Enable notifications',
    notificationStepTitle: 'Enable notifications',
    notificationStepText: 'Notifications cannot be forced. The person must accept the phone request.',
    alertsIntro: 'Preparing automatic reminders and notifications.',
    browserNotifications: 'Browser notifications',
    currentStatus: 'Current status',
    allow: 'Allow',
    notificationsDeniedTitle: 'Notifications blocked',
    notificationsDeniedText: 'Notifications are blocked by the browser. You can keep using the app; to enable them again, allow them in the browser settings.',
    notificationsUnsupportedTitle: 'Notifications unavailable',
    notificationsUnsupportedText: 'This browser does not support notifications. Reminders remain visible in the app.',
    notificationsGrantedTitle: 'Notifications allowed',
    notificationsGrantedText: 'The browser accepts notifications.',
    notificationsDefaultText: 'You can allow notifications to receive reminders on this device.',
    nextAlerts: 'Upcoming alerts',
    noAlerts: 'No upcoming alert.',
    guidesTitle: 'Step-by-step guides',
    guidesIntro: 'Slides and videos will be added here later.',
    guideComing: 'Content to add later: slides, video or simple text.',
    openGuideIntro: 'Open the official guide or its automatic translation according to the selected language.',
    back: 'Back',
    ruleApplied: 'Applied rule',
    officialMarker: 'Official reference',
    reminderEnabled: 'Reminders enabled',
    note: 'Note',
    save: 'Save',
    dateAutoAfterDone: 'The next date is calculated automatically after recording.',
    dateToEnter: 'Date to enter',
    saved: 'Saved',
    alreadyAdded: 'Already added',
    updateTitle: 'New version available',
    updateText: 'An app update is ready. Tap “Update” to load the latest version.',
    updateNow: 'Update',
    later: 'Later',
  },

  es: {
    appTitle: 'Mis recordatorios de derechos',
    appSubtitle: 'Seguir, entender, no olvidar',
    home: 'Inicio',
    alerts: 'Alertas',
    settings: 'Ajustes',
    language: 'Idioma',
    addAction: 'Añadir un trámite',
    myProcedures: 'Mis trámites',
    homeIntro: 'Añada un trámite y regístrelo cuando esté terminado.',
    todo: 'Por hacer ahora',
    recentlyDone: 'Trámites registrados',
    nothingToDo: 'Nada que hacer por ahora',
    emptyTodo: 'Añada un trámite con el botón de abajo o espere el próximo recordatorio automático.',
    emptyDone: 'Los trámites terminados aparecerán aquí después de registrarlos.',
    guideStep: 'Guía paso a paso',
    doneButton: 'Sí, registrar',
    finishedQuestion: '¿El trámite está terminado?',
    todoHelp: 'Primero haga el trámite y luego regístrelo aquí.',
    doneHelp: 'Estos trámites ya han sido registrados.',
    rectify: 'Modificar',
    delete: 'Eliminar',
    doneOn: 'Hecho el',
    nextReminder: 'Próximo recordatorio',
    deleteTitle: '¿Eliminar este recordatorio?',
    deleteText: 'Este trámite ya no se seguirá. Podrá añadirlo de nuevo más tarde si es necesario.',
    cancel: 'Cancelar',
    welcome: 'Bienvenido/a 👋',
    chooseLanguage: 'Elija su idioma para empezar. Podrá cambiarlo en cualquier momento.',
    continue: 'Continuar',
    settingsIntro: 'Cambiar el idioma, instalar y compartir la aplicación.',
    shareApp: 'Compartir / Código QR',
    scanToInstall: 'Escanee este código QR para abrir la aplicación en un teléfono.',
    installHelp: 'En Android: menú ⋮ y luego Instalar o Añadir a la pantalla de inicio. En iPhone: Safari, Compartir y luego Añadir a pantalla de inicio.',
    installApp: 'Instalar la aplicación',
    installTitle: 'Instalar la aplicación en el teléfono',
    installIntro: 'Añada la aplicación a la pantalla de inicio para abrirla como una aplicación real.',
    installReady: 'La instalación está disponible en este teléfono.',
    installUnavailable: 'La instalación automática no está disponible aquí. Use el menú del navegador.',
    installAndroidHelp: 'En Android / Chrome: pulse “Instalar la aplicación”. Si no funciona, abra el menú ⋮ y elija “Instalar aplicación” o “Añadir a pantalla de inicio”.',
    installIosHelp: 'En iPhone: abra esta página con Safari, pulse Compartir y elija “Añadir a pantalla de inicio”. Apple no permite iniciar la instalación automáticamente.',
    installed: 'Aplicación instalada',
    installedText: 'La aplicación parece instalada o abierta desde la pantalla de inicio.',
    openFromHome: 'Después abra la aplicación desde su icono en la pantalla de inicio.',
    activateNotifications: 'Activar notificaciones',
    notificationStepTitle: 'Activar notificaciones',
    notificationStepText: 'Las notificaciones no se pueden forzar. La persona debe aceptar la solicitud del teléfono.',
    alertsIntro: 'Preparación de recordatorios automáticos y notificaciones.',
    browserNotifications: 'Notificaciones del navegador',
    currentStatus: 'Estado actual',
    allow: 'Autorizar',
    notificationsDeniedTitle: 'Notificaciones bloqueadas',
    notificationsDeniedText: 'Las notificaciones están bloqueadas por el navegador. Puede seguir usando la aplicación; para reactivarlas, autorícelas en los ajustes del navegador.',
    notificationsUnsupportedTitle: 'Notificaciones no disponibles',
    notificationsUnsupportedText: 'Este navegador no permite notificaciones. Los recordatorios siguen visibles en la aplicación.',
    notificationsGrantedTitle: 'Notificaciones autorizadas',
    notificationsGrantedText: 'El navegador acepta las notificaciones.',
    notificationsDefaultText: 'Puede autorizar las notificaciones para recibir recordatorios en este dispositivo.',
    nextAlerts: 'Próximas alertas previstas',
    noAlerts: 'No hay alertas próximas.',
    guidesTitle: 'Guías paso a paso',
    guidesIntro: 'Las diapositivas y vídeos se añadirán más adelante.',
    guideComing: 'Contenido que se añadirá más tarde: diapositivas, vídeo o texto sencillo.',
    openGuideIntro: 'Abra la guía oficial o su traducción automática según el idioma elegido.',
    back: 'Volver',
    ruleApplied: 'Regla aplicada',
    officialMarker: 'Referencia oficial',
    reminderEnabled: 'Recordatorios activados',
    note: 'Nota',
    save: 'Guardar',
    dateAutoAfterDone: 'La próxima fecha se calcula automáticamente después de registrar.',
    dateToEnter: 'Fecha a indicar',
    saved: 'Guardado',
    alreadyAdded: 'Ya añadido',
    updateTitle: 'Nueva versión disponible',
    updateText: 'Hay una actualización lista. Pulse “Actualizar” para cargar la última versión.',
    updateNow: 'Actualizar',
    later: 'Más tarde',
  },

  ru: {
    appTitle: 'Мои напоминания о правах',
    appSubtitle: 'Следить, понимать, не забывать',
    home: 'Главная',
    alerts: 'Оповещения',
    settings: 'Настройки',
    language: 'Язык',
    addAction: 'Добавить процедуру',
    myProcedures: 'Мои процедуры',
    homeIntro: 'Добавьте процедуру, затем сохраните её, когда она выполнена.',
    todo: 'Сделать сейчас',
    recentlyDone: 'Сохранённые процедуры',
    nothingToDo: 'Пока ничего делать не нужно',
    emptyTodo: 'Добавьте процедуру кнопкой ниже или дождитесь следующего автоматического напоминания.',
    emptyDone: 'Завершённые процедуры появятся здесь после сохранения.',
    guideStep: 'Пошаговая инструкция',
    doneButton: 'Да, сохранить',
    finishedQuestion: 'Процедура завершена?',
    todoHelp: 'Сначала выполните процедуру, затем сохраните её здесь.',
    doneHelp: 'Эти процедуры уже сохранены.',
    rectify: 'Изменить',
    delete: 'Удалить',
    doneOn: 'Сделано',
    nextReminder: 'Следующее напоминание',
    deleteTitle: 'Удалить это напоминание?',
    deleteText: 'Эта процедура больше не будет отслеживаться. При необходимости её можно добавить позже.',
    cancel: 'Отмена',
    welcome: 'Добро пожаловать 👋',
    chooseLanguage: 'Выберите язык для начала. Его можно изменить в любое время.',
    continue: 'Продолжить',
    settingsIntro: 'Изменить язык, установить приложение и поделиться им.',
    shareApp: 'Поделиться / QR-код',
    scanToInstall: 'Отсканируйте QR-код, чтобы открыть приложение на телефоне.',
    installHelp: 'На Android: меню ⋮, затем Установить или Добавить на главный экран. На iPhone: Safari, Поделиться, затем На экран “Домой”.',
    installApp: 'Установить приложение',
    installTitle: 'Установить приложение на телефон',
    installIntro: 'Добавьте приложение на главный экран, чтобы открывать его как обычное приложение.',
    installReady: 'Установка доступна на этом телефоне.',
    installUnavailable: 'Автоматическая установка здесь недоступна. Используйте меню браузера.',
    installAndroidHelp: 'На Android / Chrome: нажмите “Установить приложение”. Если не работает, откройте меню ⋮ и выберите “Установить приложение” или “Добавить на главный экран”.',
    installIosHelp: 'На iPhone: откройте страницу в Safari, нажмите Поделиться, затем “На экран Домой”. Apple не позволяет запускать установку автоматически.',
    installed: 'Приложение установлено',
    installedText: 'Похоже, приложение уже установлено или открыто с главного экрана.',
    openFromHome: 'Затем откройте приложение через значок на главном экране.',
    activateNotifications: 'Включить уведомления',
    notificationStepTitle: 'Включить уведомления',
    notificationStepText: 'Уведомления нельзя включить принудительно. Пользователь должен принять запрос телефона.',
    alertsIntro: 'Подготовка автоматических напоминаний и уведомлений.',
    browserNotifications: 'Уведомления браузера',
    currentStatus: 'Текущий статус',
    allow: 'Разрешить',
    notificationsDeniedTitle: 'Уведомления заблокированы',
    notificationsDeniedText: 'Уведомления заблокированы браузером. Приложением можно пользоваться; чтобы включить их снова, разрешите уведомления в настройках браузера.',
    notificationsUnsupportedTitle: 'Уведомления недоступны',
    notificationsUnsupportedText: 'Этот браузер не поддерживает уведомления. Напоминания остаются видимыми в приложении.',
    notificationsGrantedTitle: 'Уведомления разрешены',
    notificationsGrantedText: 'Браузер принимает уведомления.',
    notificationsDefaultText: 'Вы можете разрешить уведомления, чтобы получать напоминания на этом устройстве.',
    nextAlerts: 'Ближайшие оповещения',
    noAlerts: 'Нет ближайших оповещений.',
    guidesTitle: 'Пошаговые инструкции',
    guidesIntro: 'Слайды и видео будут добавлены позже.',
    guideComing: 'Контент будет добавлен позже: слайды, видео или простой текст.',
    openGuideIntro: 'Откройте официальный гид или его автоматический перевод в соответствии с выбранным языком.',
    back: 'Назад',
    ruleApplied: 'Применённое правило',
    officialMarker: 'Официальная справка',
    reminderEnabled: 'Напоминания включены',
    note: 'Заметка',
    save: 'Сохранить',
    dateAutoAfterDone: 'Следующая дата рассчитывается автоматически после сохранения.',
    dateToEnter: 'Указать дату',
    saved: 'Сохранено',
    alreadyAdded: 'Уже добавлено',
    updateTitle: 'Доступна новая версия',
    updateText: 'Обновление приложения готово. Нажмите “Обновить”, чтобы загрузить последнюю версию.',
    updateNow: 'Обновить',
    later: 'Позже',
  },

  uk: {
    appTitle: 'Мої нагадування про права', appSubtitle: 'Стежити, розуміти, не забувати', home: 'Головна', alerts: 'Нагадування', settings: 'Налаштування', language: 'Мова', addAction: 'Додати дію', myProcedures: 'Мої дії', homeIntro: 'Додайте дію, потім збережіть її, коли вона виконана.', todo: 'Зробити', recentlyDone: 'Збережені дії', nothingToDo: 'Поки нічого робити', emptyTodo: 'Додайте дію кнопкою нижче або дочекайтеся наступного нагадування.', emptyDone: 'Виконані дії з’являться тут після збереження.', guideStep: 'Покроковий гід', doneButton: 'Так, зберегти', finishedQuestion: 'Дію завершено?', todoHelp: 'Спочатку виконайте дію, потім збережіть її тут.', doneHelp: 'Ці дії вже збережені.', rectify: 'Виправити', delete: 'Видалити', doneOn: 'Зроблено', nextReminder: 'Наступне нагадування', deleteTitle: 'Видалити це нагадування?', deleteText: 'Ця дія більше не буде відстежуватися.', cancel: 'Скасувати', welcome: 'Ласкаво просимо 👋', chooseLanguage: 'Виберіть мову. Її можна змінити пізніше.', continue: 'Продовжити', settingsIntro: 'Змінити мову, встановити та поділитися застосунком.', shareApp: 'Поділитися / QR-код', scanToInstall: 'Скануйте QR-код, щоб відкрити застосунок на телефоні.', installHelp: 'Android: меню ⋮, потім Install/Add to home screen. iPhone: Safari, Share, Add to Home Screen.', installApp: 'Встановити застосунок', installTitle: 'Встановити застосунок на телефон', installIntro: 'Додайте застосунок на головний екран.', installReady: 'Встановлення доступне на цьому телефоні.', installUnavailable: 'Автоматичне встановлення тут недоступне. Використайте меню браузера.', installAndroidHelp: 'Android / Chrome: натисніть “Встановити застосунок” або меню ⋮.', installIosHelp: 'iPhone: відкрийте в Safari, натисніть Поділитися, потім На головний екран.', installed: 'Застосунок встановлено', installedText: 'Застосунок уже встановлений або відкритий з головного екрана.', openFromHome: 'Потім відкрийте його з іконки на головному екрані.', activateNotifications: 'Увімкнути сповіщення', notificationStepTitle: 'Увімкнути сповіщення', notificationStepText: 'Сповіщення не можна примусово ввімкнути. Користувач має погодитися.', alertsIntro: 'Підготовка автоматичних нагадувань.', browserNotifications: 'Сповіщення браузера', currentStatus: 'Поточний стан', allow: 'Дозволити', notificationsDeniedTitle: 'Сповіщення заблоковано', notificationsDeniedText: 'Сповіщення заблоковані браузером. Нагадування залишаються видимими в застосунку.', notificationsUnsupportedTitle: 'Сповіщення недоступні', notificationsUnsupportedText: 'Цей браузер не підтримує сповіщення.', notificationsGrantedTitle: 'Сповіщення дозволено', notificationsGrantedText: 'Браузер приймає сповіщення.', notificationsDefaultText: 'Дозвольте сповіщення, щоб отримувати нагадування.', nextAlerts: 'Наступні нагадування', noAlerts: 'Немає майбутніх нагадувань.', guidesTitle: 'Покрокові гіди', guidesIntro: 'Слайди та відео будуть додані пізніше.', guideComing: 'Контент буде додано пізніше.', openGuideIntro: 'Відкрийте офіційний гід або автоматичний переклад відповідно до вибраної мови.', back: 'Назад', ruleApplied: 'Застосоване правило', officialMarker: 'Офіційний орієнтир', reminderEnabled: 'Нагадування увімкнено', note: 'Нотатка', save: 'Зберегти', dateAutoAfterDone: 'Наступна дата розраховується автоматично після збереження.', dateToEnter: 'Дата', saved: 'Збережено', alreadyAdded: 'Уже додано', updateTitle: 'Доступна нова версія', updateText: 'Оновлення застосунку готове. Натисніть “Оновити”, щоб завантажити останню версію.', updateNow: 'Оновити', later: 'Пізніше',
  },

  ar: {
    appTitle: 'تذكيراتي بالحقوق', appSubtitle: 'متابعة وفهم وعدم نسيان', home: 'الرئيسية', alerts: 'التنبيهات', settings: 'الإعدادات', language: 'اللغة', addAction: 'إضافة إجراء', myProcedures: 'إجراءاتي', homeIntro: 'أضف إجراءً ثم احفظه عندما ينتهي.', todo: 'يجب القيام به', recentlyDone: 'إجراءات محفوظة', nothingToDo: 'لا شيء حاليًا', emptyTodo: 'أضف إجراءً بالزر أدناه أو انتظر التذكير التالي.', emptyDone: 'ستظهر الإجراءات المنجزة هنا بعد الحفظ.', guideStep: 'دليل خطوة بخطوة', doneButton: 'نعم، حفظ', finishedQuestion: 'هل تمّ الإجراء؟', todoHelp: 'قم بالإجراء أولاً، ثم احفظه هنا.', doneHelp: 'تم تسجيل هذه الإجراءات بالفعل.', rectify: 'تعديل', delete: 'حذف', doneOn: 'تم في', nextReminder: 'التذكير القادم', deleteTitle: 'حذف هذا التذكير؟', deleteText: 'لن تتم متابعة هذا الإجراء بعد الآن.', cancel: 'إلغاء', welcome: 'مرحبًا 👋', chooseLanguage: 'اختر لغتك للبدء. يمكنك تغييرها لاحقًا.', continue: 'متابعة', settingsIntro: 'تغيير اللغة وتثبيت التطبيق ومشاركته.', shareApp: 'مشاركة / رمز QR', scanToInstall: 'امسح رمز QR لفتح التطبيق على الهاتف.', installHelp: 'Android: القائمة ⋮ ثم Install/Add to home screen. iPhone: Safari ثم Share ثم Add to Home Screen.', installApp: 'تثبيت التطبيق', installTitle: 'تثبيت التطبيق على الهاتف', installIntro: 'أضف التطبيق إلى الشاشة الرئيسية.', installReady: 'التثبيت متاح على هذا الهاتف.', installUnavailable: 'التثبيت التلقائي غير متاح هنا. استخدم قائمة المتصفح.', installAndroidHelp: 'Android / Chrome: اضغط “تثبيت التطبيق” أو استخدم القائمة ⋮.', installIosHelp: 'iPhone: افتح في Safari، اضغط Share ثم Add to Home Screen.', installed: 'تم تثبيت التطبيق', installedText: 'يبدو أن التطبيق مثبت أو مفتوح من الشاشة الرئيسية.', openFromHome: 'افتحه بعد ذلك من أيقونته على الشاشة الرئيسية.', activateNotifications: 'تفعيل الإشعارات', notificationStepTitle: 'تفعيل الإشعارات', notificationStepText: 'لا يمكن إجبار الإشعارات. يجب أن يوافق المستخدم.', alertsIntro: 'إعداد التذكيرات والتنبيهات.', browserNotifications: 'تنبيهات المتصفح', currentStatus: 'الحالة الحالية', allow: 'السماح', notificationsDeniedTitle: 'الإشعارات محظورة', notificationsDeniedText: 'الإشعارات محظورة من المتصفح. تبقى التذكيرات مرئية داخل التطبيق.', notificationsUnsupportedTitle: 'الإشعارات غير متاحة', notificationsUnsupportedText: 'هذا المتصفح لا يدعم الإشعارات.', notificationsGrantedTitle: 'تم السماح بالإشعارات', notificationsGrantedText: 'المتصفح يقبل الإشعارات.', notificationsDefaultText: 'يمكنك السماح بالإشعارات لتلقي التذكيرات.', nextAlerts: 'التنبيهات القادمة', noAlerts: 'لا توجد تنبيهات قادمة.', guidesTitle: 'أدلة خطوة بخطوة', guidesIntro: 'ستتم إضافة الشرائح والفيديوهات لاحقًا.', guideComing: 'سيتم إضافة المحتوى لاحقًا.', openGuideIntro: 'افتح الدليل الرسمي أو ترجمته التلقائية حسب اللغة المختارة.', back: 'رجوع', ruleApplied: 'القاعدة المطبقة', officialMarker: 'مرجع رسمي', reminderEnabled: 'التذكيرات مفعلة', note: 'ملاحظة', save: 'حفظ', dateAutoAfterDone: 'يتم حساب التاريخ التالي تلقائيًا بعد الحفظ.', dateToEnter: 'التاريخ', saved: 'تم الحفظ', alreadyAdded: 'مضاف بالفعل', updateTitle: 'يتوفر إصدار جديد', updateText: 'تحديث التطبيق جاهز. اضغط “تحديث” لتحميل الإصدار الأخير.', updateNow: 'تحديث', later: 'لاحقًا',
  },

  tr: {
    appTitle: 'Hak hatırlatmalarım', appSubtitle: 'Takip et, anla, unutma', home: 'Ana sayfa', alerts: 'Uyarılar', settings: 'Ayarlar', language: 'Dil', addAction: 'Bir işlem ekle', myProcedures: 'İşlemlerim', homeIntro: 'Bir işlem ekleyin, tamamlanınca kaydedin.', todo: 'Yapılacak', recentlyDone: 'Kaydedilen işlemler', nothingToDo: 'Şimdilik yapılacak yok', emptyTodo: 'Aşağıdaki düğmeyle bir işlem ekleyin veya sonraki hatırlatmayı bekleyin.', emptyDone: 'Tamamlanan işlemler kaydedildikten sonra burada görünür.', guideStep: 'Adım adım rehber', doneButton: 'Evet, kaydet', finishedQuestion: 'İşlem tamamlandı mı?', todoHelp: 'Önce işlemi yapın, sonra burada kaydedin.', doneHelp: 'Bu işlemler zaten kaydedildi.', rectify: 'Düzelt', delete: 'Sil', doneOn: 'Yapıldı', nextReminder: 'Sonraki hatırlatma', deleteTitle: 'Bu hatırlatma silinsin mi?', deleteText: 'Bu işlem artık takip edilmeyecek.', cancel: 'İptal', welcome: 'Hoş geldiniz 👋', chooseLanguage: 'Başlamak için dilinizi seçin. Daha sonra değiştirebilirsiniz.', continue: 'Devam et', settingsIntro: 'Dili değiştirin, uygulamayı kurun ve paylaşın.', shareApp: 'Paylaş / QR kod', scanToInstall: 'Uygulamayı telefonda açmak için QR kodu tarayın.', installHelp: 'Android: ⋮ menüsü, Install/Add to home screen. iPhone: Safari, Share, Add to Home Screen.', installApp: 'Uygulamayı kur', installTitle: 'Uygulamayı telefona kur', installIntro: 'Uygulamayı ana ekrana ekleyin.', installReady: 'Bu telefonda kurulum kullanılabilir.', installUnavailable: 'Otomatik kurulum burada kullanılamıyor. Tarayıcı menüsünü kullanın.', installAndroidHelp: 'Android / Chrome: “Uygulamayı kur” düğmesine basın veya ⋮ menüsünü kullanın.', installIosHelp: 'iPhone: Safari ile açın, Paylaş’a basın, sonra Ana ekrana ekleyin.', installed: 'Uygulama kuruldu', installedText: 'Uygulama zaten kurulmuş veya ana ekrandan açılmış görünüyor.', openFromHome: 'Sonra ana ekrandaki ikonundan açın.', activateNotifications: 'Bildirimleri aç', notificationStepTitle: 'Bildirimleri aç', notificationStepText: 'Bildirimler zorla açılamaz. Kullanıcı kabul etmelidir.', alertsIntro: 'Otomatik hatırlatmalar hazırlanıyor.', browserNotifications: 'Tarayıcı bildirimleri', currentStatus: 'Mevcut durum', allow: 'İzin ver', notificationsDeniedTitle: 'Bildirimler engellendi', notificationsDeniedText: 'Bildirimler tarayıcı tarafından engellendi. Hatırlatmalar uygulama içinde görünür.', notificationsUnsupportedTitle: 'Bildirimler kullanılamıyor', notificationsUnsupportedText: 'Bu tarayıcı bildirimleri desteklemiyor.', notificationsGrantedTitle: 'Bildirimlere izin verildi', notificationsGrantedText: 'Tarayıcı bildirimleri kabul ediyor.', notificationsDefaultText: 'Hatırlatma almak için bildirimlere izin verebilirsiniz.', nextAlerts: 'Planlanan uyarılar', noAlerts: 'Yaklaşan uyarı yok.', guidesTitle: 'Adım adım rehberler', guidesIntro: 'Slaytlar ve videolar daha sonra eklenecek.', guideComing: 'İçerik daha sonra eklenecek.', openGuideIntro: 'Seçilen dile göre resmi rehberi veya otomatik çevirisini açın.', back: 'Geri', ruleApplied: 'Uygulanan kural', officialMarker: 'Resmi referans', reminderEnabled: 'Hatırlatmalar açık', note: 'Not', save: 'Kaydet', dateAutoAfterDone: 'Sonraki tarih kayıttan sonra otomatik hesaplanır.', dateToEnter: 'Tarih', saved: 'Kaydedildi', alreadyAdded: 'Zaten eklendi', updateTitle: 'Yeni sürüm mevcut', updateText: 'Uygulama güncellemesi hazır. Son sürümü yüklemek için “Güncelle”ye basın.', updateNow: 'Güncelle', later: 'Daha sonra',
  },
};

UI.fa = UI.ar;
UI.dari = UI.fa;
UI.ps = UI.fa;
UI.so = { ...UI.fr, home: 'Bogga hore', alerts: 'Xusuusin', settings: 'Dejinta', language: 'Luqad', addAction: 'Ku dar tallaabo', myProcedures: 'Tallaabooyinkayga', todo: 'In la sameeyo', recentlyDone: 'Hawlaha la kaydiyay', guideStep: 'Hagid tallaabo-tallaabo', doneButton: 'Haa, kaydi', finishedQuestion: 'Hawshu ma dhammaatay?', todoHelp: 'Marka hore hawsha samee, kadib halkan ku kaydi.', doneHelp: 'Hawshan hore ayaa loo kaydiyay.', rectify: 'Sax', delete: 'Tirtir', updateTitle: 'Nooc cusub ayaa diyaar ah', updateText: 'Cusboonaysiin ayaa diyaar ah. Riix “Cusboonaysii” si aad u hesho nooca ugu dambeeya.', updateNow: 'Cusboonaysii', later: 'Mar dambe' };

const CATALOG = [
  { id: 'france_travail', rule: 'france_travail', title: 'France Travail', short: 'Actualisation mensuelle', cat: 'Emploi', icon: '💼', timing: 'Actualisation mensuelle. Date limite généralement le 15 du mois à minuit.' },
  { id: 'caf_rsa', rule: 'caf_quarterly', title: 'CAF / RSA', short: 'Déclaration trimestrielle', cat: 'Droits sociaux', icon: '💶', timing: 'Déclaration trimestrielle de ressources tous les 3 mois.' },
  { id: 'prime_activite', rule: 'caf_quarterly', title: 'Prime d’activité', short: 'Déclaration trimestrielle', cat: 'Droits sociaux', icon: '💶', timing: 'Déclaration trimestrielle de ressources tous les 3 mois.' },
  { id: 'titre_sejour', rule: 'titre_sejour', title: 'Titre de séjour', short: 'Renouvellement à anticiper', cat: 'Séjour', icon: '🪪', timing: 'Demande généralement entre 4 et 2 mois avant la fin de validité.' },
  { id: 'css_sante', rule: 'css_sante', title: 'CSS / Santé', short: 'Renouvellement annuel', cat: 'Santé', icon: '🏥', timing: 'Droits CSS accordés pour 1 an. Renouvellement entre 4 et 2 mois avant la fin.' },
  { id: 'ame', rule: 'ame', title: 'AME', short: 'Renouvellement annuel', cat: 'Santé', icon: '🩺', timing: 'Renouvellement à déposer dans les 2 mois avant expiration.' },
  { id: 'logement_social', rule: 'logement_social', title: 'Logement social', short: 'Renouvellement annuel', cat: 'Logement', icon: '🏠', timing: 'Renouvellement annuel entre le 10e et le 12e mois.' },
  { id: 'impots_revenus', rule: 'impots_revenus', title: 'Impôts — déclaration de revenus', short: 'Déclaration annuelle — lieu à renseigner', cat: 'Impôts', icon: '🧾', timing: 'La date limite est calculée automatiquement selon le département de résidence ou la situation à l’étranger. Dates intégrées pour la campagne 2026 : 21 mai, 28 mai ou 4 juin à 23h59.' },
  { id: 'mdph', rule: 'mdph_long', title: 'MDPH — dossier général', short: 'Renouvellement à anticiper', cat: 'Handicap', icon: '📁', timing: 'Renouvellement conseillé 6 mois avant la fin des droits.' },
  { id: 'aah_mdph', rule: 'mdph_long', title: 'AAH — renouvellement MDPH', short: 'Renouvellement à anticiper', cat: 'Handicap', icon: '♿', timing: 'Renouvellement AAH conseillé 6 mois avant la fin des droits.' },
  { id: 'rqth', rule: 'mdph_long', title: 'RQTH', short: 'Renouvellement à anticiper', cat: 'Handicap', icon: '🧩', timing: 'Renouvellement MDPH à anticiper avant l’échéance.' },
  { id: 'custom', rule: 'custom', title: 'Autre rappel', short: 'Rappel personnalisé', cat: 'Personnalisé', icon: '📌', timing: 'Rappel personnalisé.' },
];

const OFFICIAL_GUIDE_URLS = {
  impots_revenus: 'https://www.impots.gouv.fr/sites/default/files/aide/pas-a-pas/declarer/declarer-revenus.html'
};

const GOOGLE_TRANSLATE_LANG = {
  fr: 'fr',
  en: 'en',
  es: 'es',
  ru: 'ru',
  uk: 'uk',
  ar: 'ar',
  fa: 'fa',
  dari: 'fa',
  ps: 'ps',
  tr: 'tr',
  so: 'so'
};

const GUIDE_AVAILABLE = {
  impots_revenus: true
};

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
function reminderOffsets(rule) {
  if (rule === 'france_travail') return [-5, -1, 0];
  if (rule === 'caf_quarterly') return [-14, -7, -1, 0];
  if (rule === 'css_sante') return [-120, -90, -60];
  if (rule === 'ame') return [-60, -30, 0];
  if (rule === 'logement_social') return [-30];
  if (rule === 'titre_sejour' || rule === 'mdph_long') return [0];
  if (rule === 'custom') return [0];
  return [0];
}
function franceTravailCurrentDeadline(from = todayISO()) { const d = parseDate(from) || parseDate(todayISO()); const deadline = new Date(d.getFullYear(), d.getMonth(), 15); if (d.getDate() > 15) deadline.setMonth(deadline.getMonth() + 1); return localISO(deadline); }
function franceTravailNextDeadlineAfterDone(from = todayISO()) { return addMonths(franceTravailCurrentDeadline(from), 1); }
function franceTravailOpeningDate(deadlineDate) { const deadline = parseDate(deadlineDate) || parseDate(franceTravailCurrentDeadline()); const opening = new Date(deadline.getFullYear(), deadline.getMonth() - 1, 1); const previousMonthIsFebruary = opening.getMonth() === 1; opening.setDate(previousMonthIsFebruary ? 26 : 28); return localISO(opening); }
function impotsCampaignYear(from = todayISO()) {
  const d = parseDate(from) || parseDate(todayISO());
  const y = Math.max(2026, d.getFullYear());
  // Après mi-juin, on prépare déjà la campagne de l'année suivante.
  const afterCampaign = d > new Date(y, 5, 15);
  return afterCampaign ? y + 1 : y;
}
function impotsDeadlineDate(year, zone) {
  if (zone === 1) return `${year}-05-21`;
  if (zone === 2) return `${year}-05-28`;
  return `${year}-06-04`;
}
function impotsZoneForDepartment(value) {
  const dept = normalizeTaxDepartment(value);
  if (!dept) return 0;
  if (dept === '2A' || dept === '2B') return 2;
  const number = Number.parseInt(dept, 10);
  if (!Number.isFinite(number)) return 0;
  if (number >= 1 && number <= 19) return 1;
  if (number >= 20 && number <= 54) return 2;
  if (number >= 55) return 3;
  return 0;
}
function impotsDeadlineForYear(item, year) {
  const zone = impotsZoneForDepartment(item?.taxDepartment);
  return zone ? impotsDeadlineDate(year, zone) : '';
}
function impotsReminderStartDate(year) {
  // Les dates officielles changent chaque année.
  // Pour l'année suivante, on ne met pas la date limite comme premier rappel :
  // on relance la personne dès mi-avril pour vérifier le calendrier officiel.
  return `${year}-04-15`;
}
function impotsAutomaticReminderDate(from = todayISO()) {
  const d = parseDate(from) || parseDate(todayISO());
  const y = Math.max(2026, d.getFullYear());
  const thisYearStart = impotsReminderStartDate(y);
  if (d <= (parseDate(thisYearStart) || d)) return thisYearStart;
  return impotsReminderStartDate(y + 1);
}
function normalizeTaxDepartment(value) {
  return String(value || '').trim().toUpperCase().replace(/\s+/g, '');
}
function impotsDeadlineForLocation(item, from = todayISO()) {
  if (!item || item.rule !== 'impots_revenus') return '';
  return impotsDeadlineForYear(item, impotsCampaignYear(from));
}
function impotsFirstReminderForLocation(item, from = todayISO()) {
  const deadline = impotsDeadlineForLocation(item, from);
  if (!deadline) return '';

  const deadlineDate = parseDate(deadline);
  const today = parseDate(from) || parseDate(todayISO());
  if (!deadlineDate || !today) return deadline;

  const year = deadlineDate.getFullYear();
  const start = impotsReminderStartDate(year);
  const startDate = parseDate(start);

  // Avant l'ouverture de la campagne : premier rappel à mi-avril.
  if (startDate && today < startDate) return start;

  // Campagne déjà ouverte, mais date limite pas encore passée : rappel immédiat.
  if (today <= deadlineDate) return todayISO();

  // Campagne terminée : on prépare la campagne suivante, dès mi-avril.
  return impotsReminderStartDate(year + 1);
}
function impotsNextReminderAfterRecording(item, from = todayISO()) {
  const deadline = impotsDeadlineForLocation(item, from) || item.nextDate || todayISO();
  const deadlineDate = parseDate(deadline);
  const year = deadlineDate ? deadlineDate.getFullYear() + 1 : (parseDate(from) || new Date()).getFullYear() + 1;
  return impotsReminderStartDate(year);
}
function impotsNextDeadlineAfterRecording(item, from = todayISO()) {
  const d = parseDate(from) || parseDate(todayISO());
  const year = Math.max(2026, d.getFullYear() + 1);
  return impotsDeadlineForYear(item, year);
}
function withImpotsAutoDate(item) {
  if (!item || item.rule !== 'impots_revenus') return item;
  if (item.completedOnce && item.nextDate) return item;
  const deadline = impotsDeadlineForLocation(item);
  return deadline ? { ...item, taxResidence: 'france', nextDate: deadline } : { ...item, taxResidence: 'france', nextDate: '' };
}
function nextAfterDone(item, from = todayISO()) {
  const rule = item.rule;
  if (rule === 'france_travail') return franceTravailNextDeadlineAfterDone(from);
  if (rule === 'caf_quarterly') return addMonths(from, 3);
  if (rule === 'impots_revenus') return impotsNextDeadlineAfterRecording(item, from);
  if (rule === 'titre_sejour') return addMonths(from, 6);
  if (rule === 'mdph_long') return addMonths(from, 6);
  if (['css_sante', 'ame', 'logement_social'].includes(rule)) return addMonths(from, 12);
  if (rule === 'custom') return item.nextDate || addDays(from, 30);
  return addMonths(from, 1);
}
function nextDateAfterRecording(item) {
  if (item.rule === 'custom') return item.nextDate || addDays(todayISO(), 30);
  return nextAfterDone(item);
}
function impotsResidenceComplete(item) {
  return true;
}
function missingRequiredInfo(item) {
  if (!item) return true;
  if (item.rule === 'impots_revenus' && !item.completedOnce) return !impotsDeadlineForLocation(item);
  if (item.rule === 'custom') return !item.nextDate || !String(item.note || '').trim();
  return false;
}
function suggestedDate(catalog, from = todayISO()) {
  if (catalog.rule === 'france_travail') return franceTravailCurrentDeadline(from);
  if (catalog.rule === 'caf_quarterly') return addMonths(from, 3);
  if (catalog.rule === 'impots_revenus') return '';
  if (catalog.rule === 'titre_sejour') return addMonths(from, 6);
  if (catalog.rule === 'mdph_long') return addMonths(from, 6);
  if (['css_sante', 'ame', 'logement_social'].includes(catalog.rule)) return addMonths(from, 12);
  return addDays(from, 30);
}
function needsDate(item) {
  return item?.rule === 'custom';
}
function dateInputLabel(item, labels) {
  if (!item) return labels.dateToEnter;
  if (item.rule === 'custom') return 'Date du rappel';
  return labels.dateToEnter;
}
function dateInputHelp(item) {
  if (!item) return '';
  if (item.rule === 'custom') return 'Choisissez la date du rappel et écrivez une note.';
  return 'Le rappel est calculé automatiquement.';
}
function firstReminderDateForItem(item) {
  if (!item || !item.nextDate || missingRequiredInfo(item)) return item?.nextDate || '';
  const alerts = upcomingAlerts([item]);
  if (alerts && alerts.length) return alerts[0].reminderDate;
  return item.nextDate;
}
function displayDateForItem(item) {
  if (!item) return '';
  return item.calendarDate || item.reminderDate || firstReminderDateForItem(item) || item.nextDate || '';
}
function showAsTodo(item) {
  if (missingRequiredInfo(item)) return true;

  // Les rappels personnalisés sont des rappels ponctuels :
  // une fois enregistrés, ils ne doivent pas rester dans “À faire maintenant”.
  if (item.rule === 'custom' && item.completedOnce) return false;

  // Les démarches récurrentes réapparaissent quand le PREMIER rappel anticipé approche,
  // pas seulement à la date anniversaire ou à la date limite.
  const reminderDate = firstReminderDateForItem(item) || item.nextDate;
  return !item.completedOnce || statusOf(reminderDate) !== 'ok';
}
function makeItem(catalogId) { const c = CATALOG.find((x) => x.id === catalogId) || CATALOG[0]; return { uid: `${c.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`, catalogId: c.id, rule: c.rule, title: c.title, short: c.short, cat: c.cat, icon: c.icon, nextDate: suggestedDate(c), lastAction: '', note: '', notifications: true, completedOnce: false, taxResidence: '', taxDepartment: '' }; }
function normalizeItem(item) { const c = catalogFor(item); return withImpotsAutoDate({ ...makeItem(c.id), ...item, rule: item.rule || c.rule, title: item.title || c.title, short: item.short || c.short, cat: item.cat || c.cat, icon: item.icon || c.icon }); }
function initialState() { return { language: 'fr', onboarded: false, tab: 'home', toast: null, items: [] }; }
function loadState() { try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) { const parsed = JSON.parse(saved); return { ...initialState(), ...parsed, items: Array.isArray(parsed.items) ? parsed.items.filter((item) => item.catalogId !== 'aah_caf').map(normalizeItem) : [] }; } } catch {} return initialState(); }
function upcomingAlerts(items) {
  return items
    .filter((item) => Boolean(item.nextDate) && !missingRequiredInfo({ ...item, completedOnce: true }))
    .flatMap((item) => {
      if (item.rule === 'france_travail') {
        const openingDate = franceTravailOpeningDate(item.nextDate);
        return [
          { ...item, reminderDate: openingDate, offset: 'opening', label: 'Ouverture de l’actualisation' },
          ...reminderOffsets(item.rule).map((offset) => ({ ...item, reminderDate: addDays(item.nextDate, offset), offset }))
        ];
      }

      if (item.rule === 'impots_revenus') {
        const deadline = parseDate(item.nextDate);
        if (!deadline) return [];
        const year = deadline.getFullYear();
        return [
          { ...item, reminderDate: impotsReminderStartDate(year), offset: 'opening', label: 'Vérifier la déclaration' },
          { ...item, reminderDate: addDays(item.nextDate, -14), offset: -14 },
          { ...item, reminderDate: addDays(item.nextDate, -7), offset: -7 },
          { ...item, reminderDate: item.nextDate, offset: 0 },
        ];
      }

      return reminderOffsets(item.rule).map((offset) => ({ ...item, reminderDate: addDays(item.nextDate, offset), offset }));
    })
    .filter((r) => daysUntil(r.reminderDate) >= 0)
    .sort((a, b) => parseDate(a.reminderDate) - parseDate(b.reminderDate))
    .slice(0, 12);
}
function notificationStatus() { if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported'; return window.Notification.permission; }
const PUSH_CLIENT_ID_KEY = 'mes-rappels-droits-client-id-v1';
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';
function pushSupported() { return typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window; }
function getPushClientId() { try { let id = localStorage.getItem(PUSH_CLIENT_ID_KEY); if (!id) { id = `client-${Date.now()}-${Math.random().toString(16).slice(2)}`; localStorage.setItem(PUSH_CLIENT_ID_KEY, id); } return id; } catch { return `client-${Date.now()}`; } }
function urlBase64ToUint8Array(base64String) { const padding = '='.repeat((4 - (base64String.length % 4)) % 4); const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/'); const rawData = window.atob(base64); const outputArray = new Uint8Array(rawData.length); for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i); return outputArray; }
function remindersForPush(items) { return upcomingAlerts(items).map((r) => ({ catalogId: r.catalogId, title: r.title, cat: r.cat, icon: r.icon, reminderDate: r.reminderDate, nextDate: r.nextDate, offset: r.offset, label: r.label || '' })); }
async function postJson(url, data) { const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); }
function officialGuideUrlFor(catalogId, language) { const url = OFFICIAL_GUIDE_URLS[catalogId]; if (!url) return ''; const target = GOOGLE_TRANSLATE_LANG[language] || 'fr'; if (target === 'fr') return url; return `https://translate.google.com/translate?sl=fr&tl=${encodeURIComponent(target)}&u=${encodeURIComponent(url)}`; }
function guideUiFor(language) { const map = {
  fr: { official: 'Source officielle', translated: 'Ouvrir traduit automatiquement', notice: 'Traduction automatique possible par Google. En cas de doute, vérifier avec le site officiel ou un accompagnant.', available: 'Guide officiel disponible.' },
  en: { official: 'Official source', translated: 'Open automatic translation', notice: 'Automatic translation by Google may contain errors. If in doubt, check the official website or ask a support worker.', available: 'Official guide available.' },
  es: { official: 'Fuente oficial', translated: 'Abrir traducción automática', notice: 'La traducción automática de Google puede contener errores. En caso de duda, consulte el sitio oficial o pida ayuda a un acompañante.', available: 'Guía oficial disponible.' },
  ru: { official: 'Официальный источник', translated: 'Открыть автоматический перевод', notice: 'Автоматический перевод Google может содержать ошибки. Если есть сомнения, проверьте официальный сайт или обратитесь к сопровождающему.', available: 'Официальная инструкция доступна.' },
  uk: { official: 'Офіційне джерело', translated: 'Відкрити автоматичний переклад', notice: 'Автоматичний переклад може містити помилки. У разі сумніву перевірте офіційний сайт або зверніться до супроводжуючого.', available: 'Офіційний гід доступний.' },
  ar: { official: 'المصدر الرسمي', translated: 'فتح الترجمة التلقائية', notice: 'قد تحتوي الترجمة التلقائية على أخطاء. عند الشك، تحقق من الموقع الرسمي أو اطلب المساعدة.', available: 'الدليل الرسمي متاح.' },
  fa: { official: 'منبع رسمی', translated: 'باز کردن ترجمه خودکار', notice: 'ترجمه خودکار ممکن است خطا داشته باشد. در صورت تردید، سایت رسمی یا یک همراه را بررسی کنید.', available: 'راهنمای رسمی موجود است.' },
  dari: { official: 'منبع رسمی', translated: 'باز کردن ترجمه خودکار', notice: 'ترجمه خودکار ممکن است خطا داشته باشد. در صورت شک، سایت رسمی یا یک همراه را بررسی کنید.', available: 'راهنمای رسمی موجود است.' },
  ps: { official: 'رسمي سرچينه', translated: 'اتومات ژباړه پرانیزئ', notice: 'اتومات ژباړه کېدای شي تېروتنې ولري. که شک وي، رسمي پاڼه یا یو ملګری وګورئ.', available: 'رسمي لارښود شته.' },
  tr: { official: 'Resmi kaynak', translated: 'Otomatik çeviriyi aç', notice: 'Otomatik çeviri hata içerebilir. Şüphe varsa resmi siteyi veya bir refakatçiyi kontrol edin.', available: 'Resmi rehber mevcut.' },
  so: { official: 'Isha rasmiga ah', translated: 'Fur turjumaad otomaatig ah', notice: 'Turjumaadda otomaatigga ah khalad way yeelan kartaa. Haddii shaki jiro, hubi bogga rasmiga ah ama weydii qof ku caawiya.', available: 'Hagidda rasmiga ah ayaa diyaar ah.' }
}; return map[language] || map.fr; }

function repairUiFor(language) { const map = {
  fr: { title: 'Réparer / mettre à jour l’application', text: 'À utiliser si l’application garde une ancienne version, si l’icône ne change pas, ou si les notifications semblent bloquées.', button: 'Réparer et recharger', warning: 'L’application va vider son cache puis se recharger. Il faudra peut-être réactiver les notifications.' },
  en: { title: 'Repair / update the app', text: 'Use this if the app keeps an old version, if the icon does not change, or if notifications seem stuck.', button: 'Repair and reload', warning: 'The app will clear its cache and reload. You may need to enable notifications again.' },
  es: { title: 'Reparar / actualizar la aplicación', text: 'Use esto si la aplicación conserva una versión antigua, si el icono no cambia o si las notificaciones parecen bloqueadas.', button: 'Reparar y recargar', warning: 'La aplicación vaciará la caché y se recargará. Puede que tenga que activar de nuevo las notificaciones.' },
  ru: { title: 'Исправить / обновить приложение', text: 'Используйте, если приложение сохраняет старую версию, значок не меняется или уведомления заблокированы.', button: 'Исправить и перезагрузить', warning: 'Приложение очистит кэш и перезагрузится. Возможно, нужно будет снова включить уведомления.' },
  uk: { title: 'Виправити / оновити застосунок', text: 'Використовуйте, якщо застосунок зберігає стару версію, іконка не змінюється або сповіщення заблоковані.', button: 'Виправити і перезавантажити', warning: 'Застосунок очистить кеш і перезавантажиться. Можливо, потрібно буде знову увімкнути сповіщення.' },
  ar: { title: 'إصلاح / تحديث التطبيق', text: 'استخدم هذا إذا بقي التطبيق على إصدار قديم أو لم تتغير الأيقونة أو بدت الإشعارات عالقة.', button: 'إصلاح وإعادة التحميل', warning: 'سيتم مسح ذاكرة التخزين المؤقت وإعادة تحميل التطبيق. قد تحتاج إلى تفعيل الإشعارات مرة أخرى.' },
  fa: { title: 'تعمیر / به‌روزرسانی برنامه', text: 'اگر برنامه نسخه قدیمی را نگه می‌دارد، آیکون تغییر نمی‌کند یا اعلان‌ها گیر کرده‌اند، از این گزینه استفاده کنید.', button: 'تعمیر و بارگذاری دوباره', warning: 'برنامه کش را پاک می‌کند و دوباره بارگذاری می‌شود. ممکن است لازم باشد اعلان‌ها را دوباره فعال کنید.' },
  dari: { title: 'تعمیر / به‌روزرسانی برنامه', text: 'اگر برنامه نسخه قدیمی را نگه می‌دارد، آیکون تغییر نمی‌کند یا اعلان‌ها گیر کرده‌اند، از این گزینه استفاده کنید.', button: 'تعمیر و بارگذاری دوباره', warning: 'برنامه کش را پاک می‌کند و دوباره بارگذاری می‌شود. ممکن است لازم باشد اعلان‌ها را دوباره فعال کنید.' },
  ps: { title: 'اپ ترمیم / تازه کول', text: 'که اپ زوړ نسخه ساتي، نښه نه بدلېږي، یا خبرتیاوې بندې ښکاري، دا وکاروئ.', button: 'ترمیم او بیا پورته کول', warning: 'اپ به خپل کش پاک کړي او بیا به پورته شي. ښايي خبرتیاوې بیا فعالې کړئ.' },
  tr: { title: 'Uygulamayı onar / güncelle', text: 'Uygulama eski sürümü tutuyorsa, ikon değişmiyorsa veya bildirimler takılmış görünüyorsa bunu kullanın.', button: 'Onar ve yeniden yükle', warning: 'Uygulama önbelleği temizleyip yeniden yüklenecek. Bildirimleri yeniden açmanız gerekebilir.' },
  so: { title: 'Dayactir / cusboonaysii app-ka', text: 'Isticmaal haddii app-ku hayo nooc duug ah, astaantu is beddeli weydo, ama xusuusintu xanniban tahay.', button: 'Dayactir oo dib u rar', warning: 'App-ku wuxuu nadiifinayaa kaydka kadib wuu dib u rarayaa. Waxaa laga yaabaa inaad mar kale shiddo xusuusinta.' }
}; return map[language] || map.fr; }

function taxUiFor(language) { const map = {
  fr: { title: 'Lieu d’habitation pour les impôts', help: 'La date limite dépend du département ou de la situation à l’étranger.', residence: 'Situation', choose: 'Choisir', france: 'J’habite en France', abroad: 'Je réside à l’étranger', department: 'Département de résidence', departmentPlaceholder: 'Exemple : 61', abroadHelp: 'Pour une résidence à l’étranger, vérifiez la date affichée par impots.gouv.', dateHelp: 'La date de rappel est calculée automatiquement à partir du lieu renseigné.' },
  en: { title: 'Tax residence', help: 'The deadline depends on the department or foreign residence situation.', residence: 'Situation', choose: 'Choose', france: 'I live in France', abroad: 'I live abroad', department: 'Department of residence', departmentPlaceholder: 'Example: 61', abroadHelp: 'For residence abroad, check the date displayed by impots.gouv.', dateHelp: 'The reminder date is calculated automatically from the selected residence.' },
  es: { title: 'Lugar de residencia para impuestos', help: 'La fecha límite depende del departamento o de la residencia en el extranjero.', residence: 'Situación', choose: 'Elegir', france: 'Vivo en Francia', abroad: 'Resido en el extranjero', department: 'Departamento de residencia', departmentPlaceholder: 'Ejemplo: 61', abroadHelp: 'Si reside en el extranjero, verifique la fecha indicada por impots.gouv.', dateHelp: 'La fecha del recordatorio se calcula automáticamente según el lugar indicado.' },
  ru: { title: 'Место проживания для налогов', help: 'Срок зависит от департамента или проживания за границей.', residence: 'Ситуация', choose: 'Выбрать', france: 'Я живу во Франции', abroad: 'Я живу за границей', department: 'Департамент проживания', departmentPlaceholder: 'Например: 61', abroadHelp: 'Для проживания за границей проверьте дату на impots.gouv.', dateHelp: 'Дата напоминания рассчитывается автоматически по месту проживания.' },
  ar: { title: 'مكان الإقامة للضرائب', help: 'تاريخ الموعد النهائي يعتمد على القسم أو الإقامة في الخارج.', residence: 'الوضع', choose: 'اختيار', france: 'أعيش في فرنسا', abroad: 'أقيم في الخارج', department: 'رقم القسم', departmentPlaceholder: 'مثال: 61', abroadHelp: 'إذا كنت مقيماً في الخارج، تحقق من التاريخ الظاهر في impots.gouv.', dateHelp: 'يتم حساب تاريخ التذكير تلقائياً حسب مكان الإقامة.' },
  tr: { title: 'Vergi için ikamet yeri', help: 'Son tarih departmana veya yurt dışı ikamet durumuna bağlıdır.', residence: 'Durum', choose: 'Seç', france: 'Fransa’da yaşıyorum', abroad: 'Yurt dışında yaşıyorum', department: 'İkamet departmanı', departmentPlaceholder: 'Örnek: 61', abroadHelp: 'Yurt dışı ikamet için impots.gouv’da gösterilen tarihi kontrol edin.', dateHelp: 'Hatırlatma tarihi seçilen ikamet yerine göre otomatik hesaplanır.' },
  uk: { title: 'Місце проживання для податків', help: 'Кінцева дата залежить від департаменту або проживання за кордоном.', residence: 'Ситуація', choose: 'Вибрати', france: 'Я живу у Франції', abroad: 'Я живу за кордоном', department: 'Департамент проживання', departmentPlaceholder: 'Наприклад: 61', abroadHelp: 'Для проживання за кордоном перевірте дату на impots.gouv.', dateHelp: 'Дата нагадування розраховується автоматично за місцем проживання.' },
  so: { title: 'Meesha deggenaanshaha canshuurta', help: 'Taariikhda kama dambaysta ah waxay ku xiran tahay deegaanka ama haddii aad dibadda deggen tahay.', residence: 'Xaaladda', choose: 'Dooro', france: 'Waxaan deggenahay Faransiiska', abroad: 'Waxaan deggenahay dibadda', department: 'Waaxda deegaanka', departmentPlaceholder: 'Tusaale: 61', abroadHelp: 'Haddii aad dibadda deggen tahay, hubi taariikhda ku qoran impots.gouv.', dateHelp: 'Taariikhda xusuusinta si otomaatig ah ayaa loo xisaabiyaa iyadoo lagu saleynayo meesha la doortay.' }
}; if (language === 'fa' || language === 'dari' || language === 'ps') return map.ar; return map[language] || map.fr; }


function calendarUiFor(language) { const map = {
  fr: { shortLabel: 'Agenda', title: 'Ajouter à l’agenda', intro: 'Choisissez comment ajouter ce prochain rappel dans le calendrier du téléphone.', google: 'Google Agenda', ics: 'iPhone / autre agenda', close: 'Pas maintenant', eventPrefix: 'Rappel —', description: 'Rappel créé depuis Mes rappels de droits.', noDate: 'Aucune date de rappel n’est encore renseignée.' },
  en: { shortLabel: 'Calendar', title: 'Add to calendar', intro: 'Choose how to add this next reminder to the phone calendar.', google: 'Google Calendar', ics: 'iPhone / other calendar', close: 'Not now', eventPrefix: 'Reminder —', description: 'Reminder created from My rights reminders.', noDate: 'No reminder date has been set yet.' },
  es: { shortLabel: 'Agenda', title: 'Añadir al calendario', intro: 'Elija cómo añadir este próximo recordatorio al calendario del teléfono.', google: 'Google Calendar', ics: 'iPhone / otro calendario', close: 'Ahora no', eventPrefix: 'Recordatorio —', description: 'Recordatorio creado desde Mis recordatorios de derechos.', noDate: 'Todavía no se ha indicado una fecha de recordatorio.' },
  ru: { shortLabel: 'Календарь', title: 'Добавить в календарь', intro: 'Выберите, как добавить это напоминание в календарь телефона.', google: 'Google Календарь', ics: 'iPhone / другой календарь', close: 'Не сейчас', eventPrefix: 'Напоминание —', description: 'Напоминание создано в приложении Мои напоминания о правах.', noDate: 'Дата напоминания ещё не указана.' },
  uk: { shortLabel: 'Календар', title: 'Додати до календаря', intro: 'Виберіть, як додати це нагадування до календаря телефону.', google: 'Google Календар', ics: 'iPhone / інший календар', close: 'Не зараз', eventPrefix: 'Нагадування —', description: 'Нагадування створено з застосунку Мої нагадування про права.', noDate: 'Дата нагадування ще не вказана.' },
  ar: { shortLabel: 'التقويم', title: 'إضافة إلى التقويم', intro: 'اختر طريقة إضافة هذا التذكير إلى تقويم الهاتف.', google: 'تقويم Google', ics: 'iPhone / تقويم آخر', close: 'ليس الآن', eventPrefix: 'تذكير —', description: 'تم إنشاء التذكير من تطبيق تذكيراتي بالحقوق.', noDate: 'لم يتم تحديد تاريخ التذكير بعد.' },
  fa: { shortLabel: 'تقویم', title: 'افزودن به تقویم', intro: 'روش افزودن این یادآوری به تقویم تلفن را انتخاب کنید.', google: 'تقویم Google', ics: 'iPhone / تقویم دیگر', close: 'بستن', eventPrefix: 'یادآوری —', description: 'یادآوری از برنامه یادآوری حقوق من ایجاد شد.', noDate: 'هنوز تاریخ یادآوری مشخص نشده است.' },
  dari: { shortLabel: 'تقویم', title: 'افزودن به تقویم', intro: 'روش افزودن این یادآوری به تقویم تلفن را انتخاب کنید.', google: 'تقویم Google', ics: 'iPhone / تقویم دیگر', close: 'بستن', eventPrefix: 'یادآوری —', description: 'یادآوری از برنامه یادآوری حقوق من ایجاد شد.', noDate: 'هنوز تاریخ یادآوری مشخص نشده است.' },
  ps: { shortLabel: 'کليزه', title: 'کليزې ته زياتول', intro: 'دا یادونه د تلیفون کليزې ته د زياتولو طریقه وټاکئ.', google: 'Google Calendar', ics: 'iPhone / بله کليزه', close: 'بندول', eventPrefix: 'یادونه —', description: 'یادونه د حقونو د یادونې له اپ څخه جوړه شوې.', noDate: 'د یادونې نېټه لا نه ده ټاکل شوې.' },
  tr: { shortLabel: 'Takvim', title: 'Takvime ekle', intro: 'Bu hatırlatmayı telefon takvimine nasıl ekleyeceğinizi seçin.', google: 'Google Takvim', ics: 'iPhone / diğer takvim', close: 'Daha sonra', eventPrefix: 'Hatırlatma —', description: 'Hak hatırlatmalarım uygulamasından oluşturulan hatırlatma.', noDate: 'Henüz hatırlatma tarihi belirtilmedi.' },
  so: { shortLabel: 'Kalandar', title: 'Ku dar kalandarka', intro: 'Dooro sida xusuusintan loogu darayo kalandarka telefoonka.', google: 'Google Calendar', ics: 'iPhone / kalandar kale', close: 'Hadda maya', eventPrefix: 'Xusuusin —', description: 'Xusuusin laga sameeyay app-ka xusuusinta xuquuqda.', noDate: 'Taariikh xusuusin weli lama gelin.' }
}; return map[language] || map.fr; }

function toCalendarDate(value, hour = 9, minute = 0) {
  const d = parseDate(value);
  if (!d || Number.isNaN(d.getTime())) return null;
  d.setHours(hour, minute, 0, 0);
  return d;
}
function pad2(value) { return String(value).padStart(2, '0'); }
function formatCalendarDateLocal(date) {
  return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}T${pad2(date.getHours())}${pad2(date.getMinutes())}00`;
}
function escapeIcsText(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}
function calendarEventFor(item, ui) {
  const reminderDate = displayDateForItem(item);
  if (!item || !reminderDate) return null;
  const start = toCalendarDate(reminderDate, 9, 0);
  if (!start) return null;
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const title = `${ui.eventPrefix} ${item.title}`;
  const appUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const reference = item.nextDate && item.nextDate !== reminderDate ? `\nÉchéance / date de référence : ${formatDate(item.nextDate)}` : '';
  const details = `${ui.description}${reference}${appUrl ? '\n' + appUrl : ''}`;
  return { title, details, start, end, location: '', uid: `${item.uid || item.catalogId || 'rappel'}-${formatCalendarDateLocal(start)}@mes-rappels-droits` };
}
function googleCalendarUrl(event) {
  if (!event) return '#';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatCalendarDateLocal(event.start)}/${formatCalendarDateLocal(event.end)}`,
    details: event.details,
    location: event.location || '',
    ctz: 'Europe/Paris'
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
function downloadIcs(event) {
  if (!event || typeof window === 'undefined') return;
  const now = new Date();
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mes rappels de droits//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${escapeIcsText(event.uid)}`,
    `DTSTAMP:${formatCalendarDateLocal(now)}`,
    `DTSTART:${formatCalendarDateLocal(event.start)}`,
    `DTEND:${formatCalendarDateLocal(event.end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.details)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const day = localISO(event.start);
  link.href = url;
  link.download = `rappel-${day}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}


function isStandaloneMode() { if (typeof window === 'undefined') return false; return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true; }
function detectPlatform() { if (typeof navigator === 'undefined') return 'other'; const ua = navigator.userAgent || ''; if (/iphone|ipad|ipod/i.test(ua)) return 'ios'; if (/android/i.test(ua)) return 'android'; return 'other'; }

function Button({ children, onClick, variant = 'default', className = '', type = 'button', disabled = false }) {
  const styles = {
    default: 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg shadow-blue-700/20 hover:from-blue-800 hover:to-blue-700',
    outline: 'border border-blue-100 bg-white text-blue-900 shadow-sm hover:bg-blue-50',
    ghost: 'bg-transparent text-slate-700 hover:bg-blue-50',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-emerald-700 text-white hover:bg-emerald-800'
  };
  return <button type={type} onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-black transition disabled:opacity-50 ${styles[variant] || styles.default} ${className}`}>{children}</button>;
}
function Card({ children, className = '' }) { return <div className={`rounded-3xl border border-white/70 bg-white shadow-lg shadow-blue-950/5 ${className}`}>{children}</div>; }
function CardContent({ children, className = '' }) { return <div className={className}>{children}</div>; }

function AddMenu({ actions, labels, compact = false }) {
  const [open, setOpen] = useState(false);
  function choose(id) { actions.add(id); setOpen(false); }
  const menuPosition = compact ? 'bottom-16' : 'top-14';
  const buttonText = compact ? labels.addAction.replace(' une démarche', '').replace(' un rappel', '') : labels.addAction;

  return <div className="relative inline-flex"><button type="button" onClick={() => setOpen(!open)} className={`${compact ? 'px-5 py-4 text-base' : 'px-5 py-3 text-base'} inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 font-black text-white shadow-xl shadow-blue-700/25 transition hover:scale-[1.02] hover:from-blue-800 hover:to-blue-600`}><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-2xl text-blue-700">+</span><span>{buttonText}</span></button>{open && <div className={`absolute right-0 ${menuPosition} z-50 max-h-[72vh] w-80 overflow-auto rounded-3xl border border-slate-100 bg-white p-3 text-left shadow-2xl`}>{CATALOG.map((c) => <button key={c.id} type="button" onClick={() => choose(c.id)} className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-blue-50"><InstitutionLogo item={c} size="sm" /><span className="min-w-0"><span className="block font-bold text-slate-950">{c.title}</span><span className="block text-xs text-slate-500">{c.short}</span></span></button>)}</div>}</div>;
}

function Toast({ toast, close }) { if (!toast) return null; return <div className="fixed left-4 right-4 top-20 z-50 mx-auto max-w-xl rounded-2xl border bg-white p-4 shadow-lg sm:left-auto sm:right-6 sm:w-96"><div className="flex items-start justify-between gap-3"><div><div className="font-bold">{toast.title}</div><div className="mt-1 text-sm text-slate-600">{toast.body}</div></div><button onClick={close} className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100">×</button></div></div>; }
function EmptyState({ labels, actions }) { return <Card className="border-dashed"><CardContent className="p-6 text-center"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl">➕</div><h3 className="text-lg font-semibold">{labels.nothingToDo}</h3><p className="mt-1 text-slate-600">{labels.emptyTodo}</p><div className="mt-5"><AddMenu actions={actions} labels={labels} /></div></CardContent></Card>; }
function DeleteDialog({ item, labels, cancel, confirm }) { if (!item) return null; return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"><Card className="w-full max-w-md rounded-3xl shadow-xl"><CardContent className="p-6"><div className="text-3xl">🗑</div><h2 className="mt-3 text-xl font-bold">{labels.deleteTitle}</h2><p className="mt-2 text-slate-600"><strong>{item.title}</strong> — {labels.deleteText}</p><div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2"><Button variant="outline" className="py-3" onClick={cancel}>{labels.cancel}</Button><Button variant="destructive" className="py-3" onClick={confirm}>{labels.delete}</Button></div></CardContent></Card></div>; }
function UpdateAvailableBanner({ show, labels, onUpdate, onDismiss }) { if (!show) return null; return <div className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-lg sm:bottom-6 sm:left-auto sm:right-6 sm:w-96"><div className="font-bold text-amber-950">{labels.updateTitle}</div><div className="mt-1 text-sm text-amber-900">{labels.updateText}</div><div className="mt-3 grid grid-cols-2 gap-2"><Button variant="outline" onClick={onDismiss}>{labels.later}</Button><Button onClick={onUpdate}>{labels.updateNow}</Button></div></div>; }

function CalendarDialog({ item, language, onClose }) {
  const ui = calendarUiFor(language);
  const event = calendarEventFor(item, ui);
  if (!item) return null;

  function openGoogleAgenda() {
    if (!event) return;
    window.open(googleCalendarUrl(event), '_blank', 'noopener,noreferrer');
    onClose();
  }

  function downloadAgendaFile() {
    if (!event) return;
    downloadIcs(event);
    onClose();
  }

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"><Card className="w-full max-w-lg rounded-3xl shadow-xl"><CardContent className="p-6"><div className="flex items-start gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-3xl">📅</div><div><h2 className="text-2xl font-bold">{ui.title}</h2><p className="mt-1 text-sm text-slate-600">{item.title}</p>{item.nextDate && <p className="mt-1 text-sm font-semibold text-slate-900">{formatDate(item.nextDate)} · 09:00</p>}</div></div>{event ? <><p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{ui.intro}</p><div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"><Button className="py-6 text-base" onClick={openGoogleAgenda}>🌐 {ui.google}</Button><Button variant="outline" className="py-6 text-base" onClick={downloadAgendaFile}>📄 {ui.ics}</Button></div></> : <p className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950">{ui.noDate}</p>}<Button variant="ghost" className="mt-5 w-full" onClick={onClose}>{ui.close}</Button></CardContent></Card></div>;
}



function GuideDialog({ item, language, onClose }) {
  if (!item) return null;
  const catalog = catalogFor(item);
  const officialUrl = OFFICIAL_GUIDE_URLS[catalog.id] || '';
  const translatedUrl = officialGuideUrlFor(catalog.id, language);
  const guideUi = guideUiFor(language);

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"><Card className="w-full max-w-lg rounded-3xl shadow-xl"><CardContent className="p-6"><div className="flex items-start gap-4"><InstitutionLogo item={catalog} size="sm" /><div><h2 className="text-2xl font-black text-slate-950">📘 Tuto / aide</h2><p className="mt-1 text-sm font-semibold text-slate-600">{catalog.title}</p></div></div>{officialUrl ? <><p className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm font-medium text-blue-950">Ouvrir le guide officiel ou sa traduction automatique selon la langue choisie.</p><div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"><Button className="py-6 text-base" variant="default" onClick={() => window.open(officialUrl, '_blank', 'noopener,noreferrer')}>🌐 {guideUi.official}</Button><Button className="py-6 text-base" variant="outline" onClick={() => window.open(translatedUrl, '_blank', 'noopener,noreferrer')}>🌍 {guideUi.translated}</Button></div><div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950">{guideUi.notice}</div></> : <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">Aucun tuto officiel intégré pour cette démarche pour le moment.</p>}<Button variant="ghost" className="mt-5 w-full" onClick={onClose}>Fermer</Button></CardContent></Card></div>;
}



function visualTextFor(language) {
  const map = {
    fr: { next: 'Prochain rappel', upcoming: 'Rappels à venir', seeAll: 'Voir tout', recorded: 'Déjà enregistré', dates: 'Mes dates', addReminder: 'Ajouter un rappel', soon: 'À préparer bientôt', late: 'En retard', upcomingBadge: 'À venir', saved: 'Enregistré', noReminder: 'Aucun rappel pour le moment', noReminderHelp: 'Ajoutez une démarche pour commencer.', allDates: 'Toutes mes dates', allDatesHelp: 'Voir toutes mes échéances', view: 'Voir', orangeHelp: 'Les dates en orange arrivent bientôt.', nextDate: 'Prochaine date', why: 'Pourquoi ce rappel ?', actions: 'Actions', autoOn: 'Les rappels automatiques sont activés' },
    en: { next: 'Next reminder', upcoming: 'Upcoming reminders', seeAll: 'See all', recorded: 'Already recorded', dates: 'My dates', addReminder: 'Add a reminder', soon: 'Prepare soon', late: 'Late', upcomingBadge: 'Upcoming', saved: 'Saved', noReminder: 'No reminder yet', noReminderHelp: 'Add a procedure to start.', allDates: 'All my dates', allDatesHelp: 'See all my deadlines', view: 'View', orangeHelp: 'Orange dates are coming soon.', nextDate: 'Next date', why: 'Why this reminder?', actions: 'Actions', autoOn: 'Automatic reminders are enabled' },
    es: { next: 'Próximo recordatorio', upcoming: 'Próximos recordatorios', seeAll: 'Ver todo', recorded: 'Ya registrado', dates: 'Mis fechas', addReminder: 'Añadir un recordatorio', soon: 'Preparar pronto', late: 'Con retraso', upcomingBadge: 'Por venir', saved: 'Registrado', noReminder: 'Ningún recordatorio', noReminderHelp: 'Añada un trámite para empezar.', allDates: 'Todas mis fechas', allDatesHelp: 'Ver todos mis vencimientos', view: 'Ver', orangeHelp: 'Las fechas en naranja llegan pronto.', nextDate: 'Próxima fecha', why: '¿Por qué este recordatorio?', actions: 'Acciones', autoOn: 'Los recordatorios automáticos están activados' },
    ru: { next: 'Следующее напоминание', upcoming: 'Ближайшие напоминания', seeAll: 'Все', recorded: 'Уже сохранено', dates: 'Мои даты', addReminder: 'Добавить напоминание', soon: 'Скоро подготовить', late: 'Просрочено', upcomingBadge: 'Скоро', saved: 'Сохранено', noReminder: 'Пока нет напоминаний', noReminderHelp: 'Добавьте действие для начала.', allDates: 'Все мои даты', allDatesHelp: 'Посмотреть все сроки', view: 'Открыть', orangeHelp: 'Оранжевые даты скоро наступят.', nextDate: 'Следующая дата', why: 'Зачем это напоминание?', actions: 'Действия', autoOn: 'Автоматические напоминания включены' },
    ar: { next: 'التذكير القادم', upcoming: 'التذكيرات القادمة', seeAll: 'عرض الكل', recorded: 'تم التسجيل', dates: 'مواعيدي', addReminder: 'إضافة تذكير', soon: 'للتحضير قريبًا', late: 'متأخر', upcomingBadge: 'قادم', saved: 'مسجل', noReminder: 'لا يوجد تذكير بعد', noReminderHelp: 'أضف إجراءً للبدء.', allDates: 'كل المواعيد', allDatesHelp: 'عرض كل المواعيد', view: 'عرض', orangeHelp: 'المواعيد البرتقالية قريبة.', nextDate: 'الموعد القادم', why: 'لماذا هذا التذكير؟', actions: 'الإجراءات', autoOn: 'التذكيرات التلقائية مفعلة' },
    tr: { next: 'Sonraki hatırlatma', upcoming: 'Yaklaşan hatırlatmalar', seeAll: 'Tümünü gör', recorded: 'Kaydedildi', dates: 'Tarihlerim', addReminder: 'Hatırlatma ekle', soon: 'Yakında hazırlanacak', late: 'Gecikti', upcomingBadge: 'Yaklaşan', saved: 'Kaydedildi', noReminder: 'Henüz hatırlatma yok', noReminderHelp: 'Başlamak için bir işlem ekleyin.', allDates: 'Tüm tarihlerim', allDatesHelp: 'Tüm son tarihleri gör', view: 'Gör', orangeHelp: 'Turuncu tarihler yakında.', nextDate: 'Sonraki tarih', why: 'Bu hatırlatma neden?', actions: 'İşlemler', autoOn: 'Otomatik hatırlatmalar açık' },
    so: { next: 'Xusuusinta xigta', upcoming: 'Xusuusin soo socota', seeAll: 'Dhammaan eeg', recorded: 'La kaydiyay', dates: 'Taariikhahayga', addReminder: 'Ku dar xusuusin', soon: 'Dhowaan diyaari', late: 'Dib u dhac', upcomingBadge: 'Soo socota', saved: 'La kaydiyay', noReminder: 'Wali xusuusin ma jirto', noReminderHelp: 'Ku dar hawl si aad u bilowdo.', allDates: 'Dhammaan taariikhaha', allDatesHelp: 'Eeg dhammaan waqtiyada', view: 'Eeg', orangeHelp: 'Taariikhaha oranji ah way soo dhow yihiin.', nextDate: 'Taariikhda xigta', why: 'Maxaa xusuusintan?', actions: 'Ficillo', autoOn: 'Xusuusin otomaatig ah waa daaran tahay' },
  };
  if (language === 'uk') return map.ru;
  if (language === 'fa' || language === 'dari' || language === 'ps') return map.ar;
  return map[language] || map.fr;
}

function logoFor(item) {
  const id = item?.catalogId || item?.id || 'custom';
  if (id === 'france_travail') return '/logos/france-travail.svg';
  if (['caf_rsa', 'prime_activite', 'aah_caf'].includes(id)) return '/logos/caf.svg';
  if (id === 'impots_revenus') return '/logos/impots.svg';
  if (['css_sante', 'ame'].includes(id)) return '/logos/ameli.svg';
  if (['mdph', 'aah_mdph', 'rqth'].includes(id)) return '/logos/mdph.svg';
  if (id === 'titre_sejour') return '/logos/interieur.svg';
  if (id === 'logement_social') return '/logos/logement.svg';
  return '/logos/custom.svg';
}

function InstitutionLogo({ item, size = 'md' }) {
  const cls = size === 'lg' ? 'h-24 w-24 rounded-[2rem]' : size === 'sm' ? 'h-14 w-14 rounded-2xl' : 'h-16 w-16 rounded-3xl';
  return <div className={`${cls} flex shrink-0 items-center justify-center overflow-hidden bg-white shadow-lg shadow-blue-950/10 ring-1 ring-blue-100`}><img src={logoFor(item)} alt="" className="h-full w-full object-contain p-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} /></div>;
}

function sortedReminderItems(items) {
  return items
    .filter((item) => item.nextDate && !missingRequiredInfo(item))
    .sort((a, b) => parseDate(a.nextDate) - parseDate(b.nextDate));
}

function reminderTone(item) {
  const date = displayDateForItem(item);
  if (!date) return 'ok';
  const d = daysUntil(date);
  if (d < 0) return 'late';
  if (d <= 10) return 'soon';
  return 'ok';
}

function StatusBadge({ item, language, done = false }) {
  const ui = visualTextFor(language);
  const tone = done ? 'done' : reminderTone(item);
  const text = done ? ui.saved : tone === 'late' ? ui.late : tone === 'soon' ? ui.soon : ui.upcomingBadge;
  const cls = tone === 'late' ? 'bg-red-50 text-red-700 ring-red-100' : tone === 'soon' ? 'bg-orange-50 text-orange-700 ring-orange-100' : done ? 'bg-emerald-50 text-emerald-700 ring-emerald-100' : 'bg-blue-50 text-blue-700 ring-blue-100';
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1 ${cls}`}>{text}</span>;
}

function DateSummary({ item, className = '', label = 'Premier rappel', card = false }) {
  const reminder = displayDateForItem(item);
  const deadline = item?.nextDate || '';
  const isCustom = item?.rule === 'custom';
  const container = card ? 'grid grid-cols-1 gap-2 sm:grid-cols-2' : 'space-y-1';
  const box = card ? 'rounded-2xl bg-blue-50 px-4 py-3 ring-1 ring-blue-100' : '';
  const secondaryBox = card ? 'rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100' : '';
  return <div className={`${container} ${className}`}>{reminder && <div className={box}><div className="text-[11px] font-black uppercase tracking-wide text-blue-600">{isCustom ? 'Rappel' : label}</div><div className="mt-0.5 font-black text-slate-950">📅 {formatDate(reminder)}</div></div>}{deadline && !isCustom && <div className={secondaryBox}><div className="text-[11px] font-black uppercase tracking-wide text-slate-500">Échéance estimée</div><div className="mt-0.5 font-black text-slate-950">🎯 {formatDate(deadline)}</div></div>}</div>;
}

function ReminderMiniCard({ item, actions, language }) {
  const tone = reminderTone(item);
  const chip = tone === 'soon' ? 'bg-orange-50 text-orange-700 ring-orange-100' : tone === 'late' ? 'bg-red-50 text-red-700 ring-red-100' : 'bg-blue-50 text-blue-700 ring-blue-100';
  return <button type="button" onClick={() => actions.edit(item)} className="flex w-full items-center gap-4 rounded-[1.7rem] border border-white bg-white/95 p-4 text-left shadow-lg shadow-blue-950/5 ring-1 ring-blue-100/60 transition hover:-translate-y-0.5 hover:shadow-xl"><InstitutionLogo item={item} size="sm" /><div className="min-w-0 flex-1"><div className="font-black text-slate-950">{item.title}</div><DateSummary item={item} className="mt-2" /></div><div className={`hidden rounded-full px-3 py-1 text-xs font-black ring-1 sm:block ${chip}`}>{tone === 'soon' ? 'Bientôt' : tone === 'late' ? 'En retard' : 'À venir'}</div><div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-700">›</div></button>;
}

function DoneMiniCard({ item, actions }) {
  return <button type="button" onClick={() => actions.edit(item)} className="flex w-full items-center justify-between gap-3 rounded-[1.6rem] bg-white/85 px-4 py-3 text-left shadow-sm ring-1 ring-emerald-100"><div className="flex min-w-0 items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-xl text-white shadow-lg shadow-emerald-700/20">✓</span><div className="min-w-0"><div className="truncate font-black text-slate-950">{item.title}</div><div className="text-sm font-semibold text-emerald-700">{item.lastAction ? `Enregistré le ${formatDate(item.lastAction)}` : 'Enregistré'}</div><DateSummary item={item} className="mt-1 text-xs" /></div></div><span className="text-2xl text-emerald-700">›</span></button>;
}

function TimelineItem({ item, actions, language }) {
  const tone = reminderTone(item);
  const color = tone === 'late' ? 'bg-red-500' : tone === 'soon' ? 'bg-orange-500' : 'bg-emerald-500';
  return <div className="relative flex gap-3"><div className="flex w-6 flex-col items-center"><span className={`mt-8 h-4 w-4 rounded-full ring-4 ring-white ${color}`} /><span className="mt-1 h-full w-px bg-slate-200" /></div><div className="mb-4 flex-1 rounded-3xl border border-white bg-white p-4 shadow-lg shadow-blue-950/5 ring-1 ring-blue-100/60"><div className="flex items-center gap-3"><InstitutionLogo item={item} size="sm" /><div className="min-w-0 flex-1"><div className="text-lg font-black text-slate-950">{item.title}</div>{item.label && <div className="text-xs font-semibold text-slate-500">{item.label}</div>}<DateSummary item={item} label="Rappel prévu" className="mt-2" /><div className="mt-2"><StatusBadge item={item} language={language} /></div></div><Button variant="outline" onClick={() => actions.edit(item)}>{visualTextFor(language).view}</Button></div></div></div>;
}


function ProcedureCard({ item, labels, actions, calendarUi }) {
  const todo = showAsTodo(item);
  const missingDate = missingRequiredInfo(item);
  const canAddCalendar = Boolean(item.nextDate) && !missingDate;
  const language = typeof document !== 'undefined' ? (document.documentElement.lang || 'fr') : 'fr';

  return <Card className={`overflow-hidden rounded-3xl border-0 shadow-sm ring-1 ring-white/70 ${todo ? 'bg-white' : 'bg-emerald-50/80'}`}><CardContent className="p-4"><div className="flex items-start gap-4"><InstitutionLogo item={item} size="sm" /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-black text-slate-950">{item.title}</h3><StatusBadge item={item} language={language} done={!todo} /></div><p className="mt-1 text-sm text-slate-600">{missingDate ? labels.dateToEnter : todo ? item.short : `${labels.doneOn} ${formatDate(item.lastAction)}`}</p>{item.nextDate && <DateSummary item={item} className="mt-2 text-sm" />}</div></div>{todo ? <>{GUIDE_AVAILABLE[item.catalogId] && <div className="mt-4"><Button variant="outline" className="w-full" onClick={() => actions.guide(item)}>📘 Tuto / aide</Button></div>}<div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"><Button variant="default" className="bg-orange-600 hover:bg-orange-700" onClick={() => actions.done(item.uid)}>✅ {labels.doneButton}</Button><Button variant="outline" onClick={() => actions.askDelete(item.uid)}>🗑 {labels.delete}</Button></div></> : <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3"><Button variant="outline" onClick={() => actions.edit(item)}>⚙ {labels.rectify}</Button>{canAddCalendar && <Button variant="outline" onClick={() => actions.calendar(item)}>📅 {calendarUi.shortLabel}</Button>}<Button variant="ghost" onClick={() => actions.askDelete(item.uid)}>🗑 {labels.delete}</Button></div>}</CardContent></Card>;
}

function HeroIllustration() {
  return <div className="pointer-events-none relative hidden h-28 w-52 shrink-0 sm:block"><div className="absolute right-24 top-5 h-14 w-14 rounded-2xl bg-white/15 backdrop-blur" /><div className="absolute right-24 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-2xl shadow-lg">📅</div><div className="absolute right-3 top-0 h-20 w-20 rounded-full bg-blue-300/20 blur-xl" /><div className="absolute right-0 top-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/30 text-5xl">👤</div><div className="absolute right-0 top-16 h-10 w-16 rounded-2xl bg-emerald-400/90 shadow-lg"><div className="p-2 text-[10px] font-black text-emerald-950">Vitale</div></div><div className="absolute right-14 top-20 h-12 w-16 rounded-2xl bg-white/20 shadow-inner" /></div>;
}

function Header({ labels, actions }) {
  return <header className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 text-white"><div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-300/20 blur-3xl" /><div className="pointer-events-none absolute left-10 top-20 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" /><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pb-12 pt-5 sm:pb-14"><button type="button" onClick={() => actions.setTab('home')} className="flex items-center gap-4 text-left"><div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.7rem] bg-white shadow-xl shadow-blue-950/20"><img src="/icon-192.png" alt="" className="h-full w-full object-cover" /></div><div><div className="max-w-[14rem] text-3xl font-black leading-tight tracking-tight sm:max-w-none sm:text-4xl">{labels.appTitle}</div><div className="mt-2 text-sm font-semibold text-blue-100 sm:text-base">{labels.appSubtitle}</div></div></button><div className="flex items-center gap-3"><HeroIllustration /><button type="button" onClick={() => actions.setTab('settings')} className="hidden h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur sm:inline-flex">🌐</button><div className="hidden sm:block"><AddMenu actions={actions} labels={labels} /></div></div></div></header>;
}
function Nav({ labels, tab, setTab, language = 'fr' }) { const ui = visualTextFor(language); const tabs = [['home', '🏠', labels.home], ['alerts', '📅', ui.dates], ['settings', '⚙️', labels.settings]]; return <div className="mb-6 hidden flex-wrap gap-2 sm:flex">{tabs.map(([id, icon, label]) => <button key={id} type="button" onClick={() => setTab(id)} className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black shadow-sm transition ${tab === id ? 'bg-blue-950 text-white' : 'border border-blue-100 bg-white text-slate-800 hover:bg-blue-50'}`}><span>{icon}</span>{label}</button>)}</div>; }
function BottomNav({ labels, tab, setTab, language = 'fr' }) { const ui = visualTextFor(language); const tabs = [['home', '🏠', labels.home], ['alerts', '📅', ui.dates], ['settings', '⚙️', labels.settings]]; return <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-blue-100 bg-white/95 shadow-2xl shadow-blue-950/10 backdrop-blur sm:hidden"><div className="grid grid-cols-3">{tabs.map(([id, icon, label]) => <button key={id} type="button" onClick={() => setTab(id)} className={`flex flex-col items-center gap-1 px-1 py-2 text-[11px] ${tab === id ? 'font-black text-blue-700' : 'font-semibold text-slate-500'}`}><span className={`flex h-9 w-9 items-center justify-center rounded-2xl text-xl ${tab === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-transparent'}`}>{icon}</span><span>{label}</span></button>)}</div></div>; }


function Onboarding({ state, setState, labels }) { return <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white p-4"><Card className="w-full max-w-xl rounded-3xl shadow-lg"><CardContent className="p-6 sm:p-8"><div className="mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-900"><img src="/icon-192.png" alt="" className="h-full w-full object-cover" /></div><h1 className="text-3xl font-bold">{labels.welcome}</h1><p className="mt-2 text-slate-600">{labels.chooseLanguage}</p><div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">{LANGUAGES.map((lang) => <button key={lang.code} type="button" onClick={() => setState((s) => ({ ...s, language: lang.code }))} className={`rounded-2xl border p-4 text-left hover:bg-slate-50 ${state.language === lang.code ? 'ring-2 ring-slate-900' : ''}`}><div className="font-semibold">{lang.label}</div></button>)}</div><Button className="mt-6 w-full py-6 text-base" onClick={() => setState((s) => ({ ...s, onboarded: true }))}>{labels.continue}</Button></CardContent></Card></div>; }

function InstallPanel({ labels, deferredInstallPrompt, standalone, platform, onInstall, permission, askNotifications }) {
  const canAutoInstall = Boolean(deferredInstallPrompt) && !standalone;
  const installHelpText = standalone ? labels.openFromHome : platform === 'ios' ? labels.installIosHelp : platform === 'android' ? labels.installAndroidHelp : labels.installUnavailable;
  const installButtonText = standalone ? labels.installed : canAutoInstall ? labels.installApp : platform === 'ios' ? 'Voir les étapes iPhone' : 'Voir comment installer';
  const notificationButtonText = permission === 'granted' ? labels.notificationsGrantedTitle : permission === 'denied' ? labels.notificationsDeniedTitle : permission === 'unsupported' ? labels.notificationsUnsupportedTitle : labels.activateNotifications;
  return <Card><CardContent className="p-5"><h2 className="text-lg font-bold">📲 {labels.installTitle}</h2><p className="mt-1 text-slate-600">{standalone ? labels.installedText : labels.installIntro}</p><div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{installHelpText}</div><div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"><Button className="py-4" onClick={onInstall} disabled={standalone}>📲 {installButtonText}</Button><Button variant={permission === 'granted' ? 'success' : 'outline'} className="py-4" onClick={askNotifications}>🔔 {notificationButtonText}</Button></div><div className="mt-3 rounded-xl bg-white p-3 text-xs text-slate-500"><strong>{labels.notificationStepTitle} :</strong> {labels.notificationStepText} Rappels envoyés vers 09:00.</div></CardContent></Card>;
}

function Home({ state, labels, actions, installProps }) {
  const ui = visualTextFor(state.language);
  const activeItems = state.items
    .filter(showAsTodo)
    .sort((a, b) => {
      const aMissing = missingRequiredInfo(a) ? 0 : 1;
      const bMissing = missingRequiredInfo(b) ? 0 : 1;
      if (aMissing !== bMissing) return aMissing - bMissing;
      const ad = displayDateForItem(a) || '2999-12-31';
      const bd = displayDateForItem(b) || '2999-12-31';
      return (parseDate(ad) || new Date(2999, 11, 31)) - (parseDate(bd) || new Date(2999, 11, 31));
    });
  const featured = activeItems[0] || null;
  const featuredMissing = featured ? missingRequiredInfo(featured) : false;
  const upcoming = activeItems.filter((item) => !featured || item.uid !== featured.uid).filter((item) => item.nextDate && !missingRequiredInfo(item)).slice(0, 3);
  const done = state.items.filter((i) => i.completedOnce).sort((a, b) => parseDate(b.lastAction) - parseDate(a.lastAction)).slice(0, 3);
  const isTaxFeatured = featured?.rule === 'impots_revenus' && !featured.completedOnce;
  const taxDepartmentValue = featured?.taxDepartment || '';
  const featuredDate = featured ? displayDateForItem(featured) : '';

  return <div className="relative -mt-10 space-y-6 pb-8">{(!installProps.standalone || installProps.permission !== 'granted') && <InstallPanel labels={labels} {...installProps} />}{featured ? <section className="relative overflow-hidden rounded-[2.2rem] border border-white bg-white p-5 shadow-2xl shadow-blue-950/10 ring-1 ring-blue-100/70"><div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-200/50 blur-3xl" /><div className="pointer-events-none absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl" /><div className="relative flex flex-col gap-5 sm:flex-row sm:items-center"><InstitutionLogo item={featured} size="lg" /><div className="min-w-0 flex-1"><div className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-sm font-black text-blue-700 ring-1 ring-blue-100">À faire maintenant</div><h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">{featured.title}</h1><p className="mt-2 text-base font-medium text-slate-600">{featured.short}</p>{featuredDate && <DateSummary item={featured} className="mt-4" card />}</div><div className="hidden rounded-[1.7rem] bg-gradient-to-br from-blue-600 to-blue-800 p-5 text-white shadow-xl shadow-blue-800/20 sm:block"><div className="text-sm font-semibold text-blue-100">Rappel</div><div className="mt-1 text-2xl font-black">{featuredDate ? `${Math.max(daysUntil(featuredDate), 0)} jours` : 'À compléter'}</div></div></div>{isTaxFeatured && <div className="relative mt-5 rounded-3xl bg-blue-50/80 p-4 ring-1 ring-blue-100"><label className="block text-sm font-black text-slate-900">Département de résidence</label><p className="mt-1 text-xs font-medium text-slate-500">Exemple : 61, 75, 2A. L’application estime automatiquement les dates.</p><input value={taxDepartmentValue} inputMode="text" maxLength={3} placeholder="Ex : 61" onChange={(e) => actions.update({ ...featured, taxResidence: 'france', taxDepartment: e.target.value.replace(/[^0-9ABab]/g, '').toUpperCase() })} className="mt-3 w-full rounded-2xl border border-blue-100 bg-white px-4 py-3 text-lg font-black text-slate-950 outline-none focus:ring-2 focus:ring-blue-300" /></div>}{GUIDE_AVAILABLE[featured.catalogId] && <div className="relative mt-5"><Button variant="outline" className="w-full py-4 text-base" onClick={() => actions.guide(featured)}>📘 Tuto / aide</Button></div>}<div className="relative mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"><Button variant="default" disabled={featuredMissing} className="py-5 text-base" onClick={() => actions.done(featured.uid)}>✅ {labels.doneButton}</Button><Button variant="outline" className="py-5 text-base text-red-600 hover:bg-red-50" onClick={() => actions.askDelete(featured.uid)}>🗑 {labels.delete}</Button></div>{featuredMissing && <p className="relative mt-3 rounded-2xl bg-amber-50 p-3 text-sm font-semibold text-amber-950">Complétez l’information demandée avant d’enregistrer.</p>}</section> : <section className="rounded-[2.2rem] border border-dashed border-blue-200 bg-white/95 p-8 text-center shadow-xl shadow-blue-950/5 ring-1 ring-white"><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-3xl">✅</div><h1 className="text-2xl font-black text-slate-950">{labels.nothingToDo}</h1><p className="mt-2 text-slate-500">{labels.emptyTodo}</p><p className="mt-2 text-sm font-medium text-blue-700">Ajoutez une démarche, puis cliquez sur “Oui, enregistrer” : le rappel sera calculé automatiquement.</p><div className="mt-5"><AddMenu actions={actions} labels={labels} /></div></section>}<section><div className="mb-3 flex items-center justify-between"><h2 className="flex items-center gap-2 text-2xl font-black text-slate-950">📅 {ui.upcoming}</h2><button type="button" onClick={() => actions.setTab('alerts')} className="rounded-full bg-blue-50 px-3 py-2 text-sm font-black text-blue-700">{ui.seeAll} ›</button></div><div className="space-y-3">{upcoming.length ? upcoming.map((item) => <ReminderMiniCard key={item.uid} item={item} actions={actions} language={state.language} />) : <p className="rounded-3xl bg-white/90 p-5 text-sm text-slate-500 shadow-sm ring-1 ring-white">{labels.emptyTodo}</p>}</div></section><section className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-lg shadow-emerald-900/5"><h2 className="mb-3 flex items-center gap-2 text-2xl font-black text-emerald-900">✅ {ui.recorded}</h2><div className="space-y-2">{done.length ? done.map((item) => <DoneMiniCard key={item.uid} item={item} actions={actions} />) : <p className="rounded-2xl bg-white/80 p-4 text-sm text-slate-500">{labels.emptyDone}</p>}</div></section><div className="fixed bottom-24 right-4 z-20 sm:hidden"><AddMenu actions={actions} labels={{ ...labels, addAction: ui.addReminder }} compact /></div></div>;
}

function Alerts({ state, labels, actions, permission, setPermission, language = 'fr' }) {
  const ui = visualTextFor(language);
  const dated = upcomingAlerts(state.items);

  return <div className="space-y-6 pb-8"><div><h1 className="flex items-center gap-3 text-3xl font-black text-slate-950">📅 {ui.dates}</h1><p className="mt-1 text-slate-600">Ici, on distingue clairement le rappel envoyé et l’échéance estimée.</p></div><Card className="rounded-3xl border-0 shadow-sm"><CardContent className="flex items-center gap-4 p-5"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-3xl">📌</div><div className="flex-1"><div className="text-xl font-black text-slate-950">{ui.allDates}</div><div className="text-sm text-slate-500">Chaque ligne affiche le rappel prévu et l’échéance correspondante.</div></div><span className="text-2xl text-slate-500">⌄</span></CardContent></Card><div>{dated.length ? dated.map((item) => <TimelineItem key={`${item.uid}-${item.reminderDate}-${item.offset}`} item={item} actions={actions} language={language} />) : <p className="rounded-3xl bg-white p-6 text-center text-slate-500 shadow-sm">{ui.noReminder}</p>}</div><div className="rounded-3xl bg-blue-50 p-4 text-sm text-blue-950">ℹ️ Un rappel peut arriver avant l’échéance : c’est volontaire pour laisser le temps de faire la démarche.</div></div>;
}

function RepairPanel({ language, onRepair }) { const repair = repairUiFor(language); return <Card><CardContent className="p-5"><h2 className="text-lg font-bold">🛠️ {repair.title}</h2><p className="mt-1 text-slate-600">{repair.text}</p><div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950">{repair.warning}</div><Button variant="outline" className="mt-4 py-4" onClick={onRepair}>🛠️ {repair.button}</Button></CardContent></Card>; }

function Settings({ state, labels, setState, appUrl, installProps, onRepair }) {
  const permission = installProps?.permission || 'default';
  const notificationMessage = permission === 'denied'
    ? [labels.notificationsDeniedTitle, labels.notificationsDeniedText, 'bg-red-50 border-red-100 text-red-900']
    : permission === 'granted'
      ? [labels.notificationsGrantedTitle, labels.notificationsGrantedText, 'bg-emerald-50 border-emerald-100 text-emerald-900']
      : permission === 'unsupported'
        ? [labels.notificationsUnsupportedTitle, labels.notificationsUnsupportedText, 'bg-amber-50 border-amber-100 text-amber-900']
        : [labels.browserNotifications, labels.notificationsDefaultText, 'bg-blue-50 border-blue-100 text-blue-900'];

  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">{labels.settings}</h1><p className="mt-1 text-slate-600">{labels.settingsIntro}</p></div><InstallPanel labels={labels} {...installProps} /><Card><CardContent className="p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-black">🔔 {labels.browserNotifications}</h2><p className="mt-1 text-slate-600">{labels.currentStatus} : <strong>{permission}</strong></p></div>{permission === 'default' && <Button variant="outline" onClick={installProps.askNotifications}>{labels.allow}</Button>}</div><div className={`mt-4 rounded-2xl border p-4 text-sm ${notificationMessage[2]}`}><div className="font-semibold">{notificationMessage[0]}</div><div className="mt-1">{notificationMessage[1]}</div></div><p className="mt-3 text-xs font-semibold text-slate-500">Les rappels sont envoyés vers 09:00.</p></CardContent></Card><RepairPanel language={state.language} onRepair={onRepair} /><Card><CardContent className="p-5"><h2 className="text-lg font-bold">🌐 {labels.language}</h2><div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">{LANGUAGES.map((lang) => <Button key={lang.code} variant={state.language === lang.code ? 'default' : 'outline'} className="justify-start" onClick={() => setState((s) => ({ ...s, language: lang.code, toast: { title: labelsFor(lang.code).saved, body: lang.label } }))}>{lang.label}</Button>)}</div></CardContent></Card><Card><CardContent className="p-5"><h2 className="text-lg font-bold">📱 {labels.shareApp}</h2><p className="mt-1 text-slate-600">{labels.scanToInstall}</p><div className="mt-4 inline-block rounded-2xl bg-white p-4 shadow-sm"><QRCodeSVG value={appUrl} size={220} includeMargin /></div><p className="mt-3 max-w-xl text-sm text-slate-600">{labels.installHelp}</p><p className="mt-2 break-all rounded-xl bg-slate-50 p-3 text-xs text-slate-600">{appUrl}</p></CardContent></Card></div>;
}


function Guides({ labels, setTab, language, selectedGuideId, openGuide }) {
  const catalog = CATALOG.find((c) => c.id === selectedGuideId) || null;
  const officialUrl = catalog ? OFFICIAL_GUIDE_URLS[catalog.id] : '';
  const translatedUrl = catalog ? officialGuideUrlFor(catalog.id, language) : '';
  const guideUi = guideUiFor(language);

  if (catalog && officialUrl) {
    return <div className="space-y-6"><Button variant="ghost" onClick={() => setTab('home')}>← {labels.back}</Button><Card><CardContent className="p-6 sm:p-8"><div className="flex items-start gap-4"><div className=""><InstitutionLogo item={catalog} /></div><div><h1 className="text-3xl font-bold">{labels.guideStep} — {catalog.title}</h1><p className="mt-2 text-slate-600">{labels.openGuideIntro}</p></div></div><div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"><Button className="py-6 text-base" variant="default" onClick={() => window.open(officialUrl, '_blank', 'noopener,noreferrer')}>🌐 {guideUi.official}</Button><Button className="py-6 text-base" variant="outline" onClick={() => window.open(translatedUrl, '_blank', 'noopener,noreferrer')}>🌍 {guideUi.translated}</Button></div><div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950">{guideUi.notice}</div></CardContent></Card></div>;
  }

  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">{labels.guidesTitle}</h1><p className="mt-1 text-slate-600">{labels.guidesIntro}</p></div><Card><CardContent className="p-5"><div className="grid grid-cols-1 gap-3 md:grid-cols-2">{CATALOG.filter((c) => c.id !== 'custom').map((c) => { const hasGuide = Boolean(GUIDE_AVAILABLE[c.id]); return <button key={c.id} type="button" onClick={() => hasGuide ? openGuide(c.id) : null} className="rounded-2xl bg-slate-50 p-4 text-left"><div className="font-semibold">📘 {labels.guideStep} — {c.title}</div><div className="mt-1 text-sm text-slate-600">{hasGuide ? guideUi.available : labels.guideComing}</div></button>; })}</div><Button className="mt-5" onClick={() => setTab('home')}>{labels.back}</Button></CardContent></Card></div>;
}

function Detail({ item, labels, actions, language }) {
  const [draft, setDraft] = useState(item);
  useEffect(() => setDraft(item), [item]);
  if (!draft) return null;

  const c = catalogFor(draft);
  const cal = calendarUiFor(language);
  const prepared = withImpotsAutoDate(draft);
  const date = displayDateForItem(prepared);
  const isCustom = draft.rule === 'custom';

  if (isCustom) {
    return <div className="space-y-6"><Button variant="ghost" onClick={() => actions.setTab('home')}>← {labels.back}</Button><Card className="rounded-3xl border-0 shadow-sm ring-1 ring-white/70"><CardContent className="p-6 sm:p-8"><div className="flex items-start gap-4"><InstitutionLogo item={draft} /><div><h1 className="text-3xl font-black text-slate-950">{draft.title}</h1><p className="mt-1 text-slate-600">Rappel personnalisé</p></div></div><div className="mt-6 space-y-4"><label className="block space-y-2"><span className="text-sm font-black text-slate-800">Date du rappel</span><input type="date" value={draft.nextDate || ''} onChange={(e) => setDraft({ ...draft, nextDate: e.target.value })} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3" /></label><label className="block space-y-2"><span className="text-sm font-black text-slate-800">Note</span><textarea value={draft.note || ''} onChange={(e) => setDraft({ ...draft, note: e.target.value })} rows={4} placeholder="Ex : appeler l’organisme, apporter un document…" className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3" /></label></div><div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2"><Button variant="default" disabled={missingRequiredInfo(draft)} className="py-6 bg-orange-600 hover:bg-orange-700" onClick={() => actions.done(draft.uid, draft)}>✅ {labels.doneButton}</Button><Button variant="outline" className="py-6" onClick={() => actions.askDelete(draft.uid)}>🗑 {labels.delete}</Button></div>{missingRequiredInfo(draft) && <p className="mt-3 rounded-2xl bg-amber-50 p-3 text-sm font-semibold text-amber-950">La date et la note sont obligatoires pour un rappel personnalisé.</p>}</CardContent></Card></div>;
  }

  return <div className="space-y-6"><Button variant="ghost" onClick={() => actions.setTab('home')}>← {labels.back}</Button><Card className="rounded-3xl border-0 shadow-sm ring-1 ring-white/70"><CardContent className="p-6 sm:p-8"><div className="flex items-start gap-4"><InstitutionLogo item={draft} /><div><h1 className="text-3xl font-black text-slate-950">{draft.title}</h1><p className="mt-1 text-slate-600">{draft.short}</p></div></div><div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700"><div className="font-bold">{labels.ruleApplied}</div><div className="mt-1">{c.timing}</div></div>{draft.completedOnce ? <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-950"><div className="font-black">✅ {labels.saved}</div><div className="mt-1">{draft.lastAction ? `${labels.doneOn} ${formatDate(draft.lastAction)}` : labels.doneHelp}</div>{date && <DateSummary item={prepared} className="mt-3" />}</div> : <div className="mt-6 rounded-2xl bg-orange-50 p-4 text-sm text-orange-950"><div className="font-black">À enregistrer</div><div className="mt-1">Cliquez sur “Oui, enregistrer”. Le prochain rappel sera calculé automatiquement.</div>{date && <DateSummary item={prepared} className="mt-3" />}</div>}{GUIDE_AVAILABLE[draft.catalogId] && <div className="mt-6"><Button variant="outline" className="w-full py-4 text-base" onClick={() => actions.guide(draft)}>📘 Tuto / aide</Button></div>}<div className={`mt-6 grid grid-cols-1 gap-2 ${draft.completedOnce ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>{!draft.completedOnce && <Button variant="default" className="py-6 bg-orange-600 hover:bg-orange-700" onClick={() => actions.done(draft.uid, prepared)}>✅ {labels.doneButton}</Button>}{draft.completedOnce && draft.nextDate && !missingRequiredInfo(prepared) && <Button variant="outline" className="py-6" onClick={() => actions.calendar(prepared)}>📅 {cal.shortLabel}</Button>}{draft.completedOnce && <Button variant="outline" className="py-6" onClick={() => actions.done(draft.uid, prepared)}>✅ Enregistrer à nouveau</Button>}<Button variant="outline" className="py-6" onClick={() => actions.askDelete(draft.uid)}>🗑 {labels.delete}</Button></div></CardContent></Card></div>;
}

export default function App() {
  const [state, setState] = useState(loadState);
  const [selectedUid, setSelectedUid] = useState(null);
  const [deleteUid, setDeleteUid] = useState(null);
  const [selectedGuideId, setSelectedGuideId] = useState(null);
  const [guideItem, setGuideItem] = useState(null);
  const [calendarItem, setCalendarItem] = useState(null);
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

  useEffect(() => { syncPushReminders(); }, [state.items, state.language, permission]);

  const selected = useMemo(() => state.items.find((i) => i.uid === selectedUid), [state.items, selectedUid]);
  const deleteItem = useMemo(() => state.items.find((i) => i.uid === deleteUid), [state.items, deleteUid]);

  async function installApp() {
    if (standalone) {
      setState((s) => ({ ...s, toast: { title: labels.installed, body: labels.installedText } }));
      return;
    }
    if (!deferredInstallPrompt) {
      const body = platform === 'ios' ? labels.installIosHelp : platform === 'android' ? labels.installAndroidHelp : labels.installUnavailable;
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
    if (!pushSupported()) {
      setPermission('unsupported');
      setState((s) => ({ ...s, toast: { title: labels.notificationsUnsupportedTitle, body: labels.notificationsUnsupportedText } }));
      return;
    }
    if (!VAPID_PUBLIC_KEY) {
      setState((s) => ({ ...s, toast: { title: 'Configuration notifications', body: 'La clé publique VAPID manque dans Vercel. Les notifications push ne peuvent pas encore être activées.' } }));
      return;
    }

    const current = notificationStatus();
    if (current === 'denied') {
      setPermission('denied');
      setState((s) => ({ ...s, toast: { title: labels.notificationsDeniedTitle, body: labels.notificationsDeniedText } }));
      return;
    }

    try {
      const result = current === 'granted' ? 'granted' : await window.Notification.requestPermission();
      setPermission(result);
      if (result !== 'granted') {
        setState((s) => ({ ...s, toast: { title: labels.browserNotifications, body: labels.notificationsDefaultText } }));
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
      }

      await postJson('/api/subscribe', {
        clientId: getPushClientId(),
        language: state.language,
        subscription: subscription.toJSON(),
        reminders: remindersForPush(state.items),
      });

      try { new window.Notification(labels.appTitle, { body: `${labels.notificationsGrantedText} ${labels.nextAlerts} : 09:00.` }); } catch {}
      setState((s) => ({ ...s, toast: { title: labels.notificationsGrantedTitle, body: `${labels.notificationsGrantedText} Rappels prévus vers 09:00.` } }));
    } catch (error) {
      console.error(error);
      setState((s) => ({ ...s, toast: { title: labels.notificationsUnsupportedTitle, body: 'Impossible d’activer les notifications push pour le moment.' } }));
    }
  }

  async function syncPushReminders() {
    if (!pushSupported() || notificationStatus() !== 'granted') return;
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) return;
      await postJson('/api/sync-reminders', {
        clientId: getPushClientId(),
        language: state.language,
        subscription: subscription.toJSON(),
        reminders: remindersForPush(state.items),
      });
    } catch (error) {
      console.warn('Synchronisation push impossible', error);
    }
  }

  function applyAppUpdate() {
    if (!waitingWorker) return;
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
  }


  async function repairApp() {
    try {
      setState((s) => ({ ...s, toast: { title: '🛠️', body: repairUiFor(s.language).button } }));
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister().catch(() => null)));
      }
    } catch {}
    setTimeout(() => window.location.reload(), 600);
  }

  const installProps = { deferredInstallPrompt, standalone, platform, onInstall: installApp, permission, askNotifications };

  const actions = {
    setTab: (tab) => setState((s) => ({ ...s, tab })),
    add: (catalogId) => {
      const c = CATALOG.find((x) => x.id === catalogId);
      if (!c) return;

      const existing = catalogId !== 'custom' ? state.items.find((i) => i.catalogId === catalogId) : null;
      if (existing) {
        if (existing.completedOnce) {
          setSelectedUid(existing.uid);
          setState((s) => ({
            ...s,
            tab: 'detail',
            toast: { title: labels.alreadyAdded, body: `${c.title} — ${labels.rectify}` },
          }));
        } else {
          setState((s) => ({
            ...s,
            tab: 'home',
            toast: { title: labels.alreadyAdded, body: c.title },
          }));
        }
        return;
      }

      const newItem = makeItem(catalogId);
      if (catalogId === 'custom') {
        setSelectedUid(newItem.uid);
      }

      setState((s) => ({
        ...s,
        tab: catalogId === 'custom' ? 'detail' : 'home',
        items: [newItem, ...s.items],
        toast: {
          title: labels.saved,
          body: c.title,
        },
      }));
    },
    done: (uid, draft = null) => {
      const existing = state.items.find((i) => i.uid === uid);
      const item = normalizeItem({ ...(existing || {}), ...(draft || {}) });

      if (!existing && !draft) return;

      if (item && missingRequiredInfo(item)) {
        if (item.rule === 'custom') setSelectedUid(uid);
        setState((s) => ({ ...s, tab: item.rule === 'custom' ? 'detail' : 'home', toast: { title: labels.dateToEnter, body: item.rule === 'impots_revenus' ? 'Renseignez le département avant d’enregistrer.' : item.title } }));
        return;
      }

      const completed = {
        ...item,
        completedOnce: true,
        lastAction: todayISO(),
        nextDate: nextDateAfterRecording(item),
      };

      setState((s) => ({
        ...s,
        tab: 'home',
        items: s.items.map((i) => i.uid === uid ? completed : i),
        toast: { title: labels.saved, body: completed.title },
      }));

      // Après validation, proposer directement l'ajout du prochain rappel à l'agenda.
      // setTimeout évite que la fenêtre soit masquée par le changement d'écran.
      if (completed.nextDate) {
        const agendaItem = { ...completed, calendarDate: firstReminderDateForItem(completed) || completed.nextDate };
        setTimeout(() => setCalendarItem(agendaItem), 80);
      }
    },
    update: (draft) => {
      setState((s) => ({
        ...s,
        items: s.items.map((i) => i.uid === draft.uid ? normalizeItem(draft) : i),
      }));
    },
    edit: (item) => {
      if (item.completedOnce || item.rule === 'custom') {
        setSelectedUid(item.uid);
        setState((s) => ({ ...s, tab: 'detail' }));
      } else {
        setState((s) => ({ ...s, tab: 'home', toast: { title: item.title, body: 'Cliquez sur “Oui, enregistrer” pour activer le rappel automatique.' } }));
      }
    },
    guide: (item) => setGuideItem(item),
    calendar: (item) => {
      const prepared = withImpotsAutoDate(item);
      setCalendarItem({ ...prepared, calendarDate: firstReminderDateForItem(prepared) || prepared.nextDate });
    },
    save: (draft) => { setState((s) => ({ ...s, items: s.items.map((i) => i.uid === draft.uid ? normalizeItem(draft) : i), toast: { title: labels.saved, body: draft.title } })); },
    askDelete: (uid) => setDeleteUid(uid),
    cancelDelete: () => setDeleteUid(null),
    confirmDelete: () => { setState((s) => ({ ...s, tab: 'home', items: s.items.filter((i) => i.uid !== deleteUid) })); setDeleteUid(null); setSelectedUid(null); },
  };

  if (!state.onboarded) return <Onboarding state={state} setState={setState} labels={labels} />;

  return <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white pb-24 text-slate-950 sm:pb-10"><Toast toast={state.toast} close={() => setState((s) => ({ ...s, toast: null }))} /><UpdateAvailableBanner show={Boolean(waitingWorker) && !updateDismissed} labels={labels} onUpdate={applyAppUpdate} onDismiss={() => setUpdateDismissed(true)} /><DeleteDialog item={deleteItem} labels={labels} cancel={actions.cancelDelete} confirm={actions.confirmDelete} /><CalendarDialog item={calendarItem} language={state.language} onClose={() => setCalendarItem(null)} /><GuideDialog item={guideItem} language={state.language} onClose={() => setGuideItem(null)} /><Header labels={labels} actions={actions} /><main className="relative z-10 mx-auto max-w-6xl px-4 py-6"><Nav labels={labels} tab={state.tab} setTab={actions.setTab} language={state.language} />{state.tab === 'home' && <Home state={state} labels={labels} actions={actions} installProps={installProps} />}{state.tab === 'alerts' && <Alerts state={state} labels={labels} actions={actions} permission={permission} setPermission={setPermission} language={state.language} />}{state.tab === 'settings' && <Settings state={state} labels={labels} setState={setState} appUrl={appUrl} installProps={installProps} onRepair={repairApp} />}{state.tab === 'guides' && <Guides labels={labels} setTab={actions.setTab} language={state.language} selectedGuideId={selectedGuideId} openGuide={setSelectedGuideId} />}{state.tab === 'detail' && <Detail item={selected} labels={labels} actions={actions} language={state.language} />}</main><BottomNav labels={labels} tab={state.tab} setTab={actions.setTab} language={state.language} /></div>;
}
