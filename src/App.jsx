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
  { id: 'aah_caf', rule: 'caf_quarterly', title: 'AAH — déclaration CAF', short: 'Déclaration trimestrielle — si vous êtes concerné', cat: 'Handicap', icon: '♿', timing: 'À utiliser seulement si vous êtes concerné par la déclaration trimestrielle AAH.' },
  { id: 'titre_sejour', rule: 'titre_sejour', title: 'Titre de séjour', short: 'Renouvellement à anticiper', cat: 'Séjour', icon: '🪪', timing: 'Demande généralement entre 4 et 2 mois avant la fin de validité.' },
  { id: 'css_sante', rule: 'css_sante', title: 'CSS / Santé', short: 'Renouvellement annuel', cat: 'Santé', icon: '🏥', timing: 'Droits CSS accordés pour 1 an. Renouvellement entre 4 et 2 mois avant la fin.' },
  { id: 'ame', rule: 'ame', title: 'AME', short: 'Renouvellement annuel', cat: 'Santé', icon: '🩺', timing: 'Renouvellement à déposer dans les 2 mois avant expiration.' },
  { id: 'logement_social', rule: 'logement_social', title: 'Logement social', short: 'Renouvellement annuel', cat: 'Logement', icon: '🏠', timing: 'Renouvellement annuel entre le 10e et le 12e mois.' },
  { id: 'impots_revenus', rule: 'custom', title: 'Impôts — déclaration de revenus', short: 'Déclaration annuelle', cat: 'Impôts', icon: '🧾', timing: 'La date limite dépend du département ou de la situation. Vérifier la date affichée dans l’application impots.gouv.' },
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
function reminderOffsets(rule) { if (rule === 'france_travail') return [-5, -1, 0]; if (rule === 'caf_quarterly') return [-21, -7, -1, 0, 3]; if (rule === 'titre_sejour' || rule === 'css_sante') return [-120, -90, -60, -15, 0]; if (rule === 'ame' || rule === 'logement_social') return [-60, -30, -15, 0]; if (rule === 'mdph_long') return [-180, -120, -60, -30, 0]; return [-7, 0, 1]; }
function franceTravailCurrentDeadline(from = todayISO()) { const d = parseDate(from) || parseDate(todayISO()); const deadline = new Date(d.getFullYear(), d.getMonth(), 15); if (d.getDate() > 15) deadline.setMonth(deadline.getMonth() + 1); return localISO(deadline); }
function franceTravailNextDeadlineAfterDone(from = todayISO()) { return addMonths(franceTravailCurrentDeadline(from), 1); }
function franceTravailOpeningDate(deadlineDate) { const deadline = parseDate(deadlineDate) || parseDate(franceTravailCurrentDeadline()); const opening = new Date(deadline.getFullYear(), deadline.getMonth() - 1, 1); const previousMonthIsFebruary = opening.getMonth() === 1; opening.setDate(previousMonthIsFebruary ? 26 : 28); return localISO(opening); }
function nextAfterDone(item, from = todayISO()) { const rule = item.rule; if (rule === 'france_travail') return franceTravailNextDeadlineAfterDone(from); if (rule === 'caf_quarterly') return addMonths(from, 3); if (['css_sante', 'ame', 'logement_social', 'mdph_long', 'titre_sejour'].includes(rule)) return addMonths(from, 12); if (rule === 'custom') return item.nextDate || addMonths(from, 1); return addMonths(from, 1); }
function suggestedDate(catalog, from = todayISO()) { if (catalog.rule === 'france_travail') return franceTravailCurrentDeadline(from); if (catalog.rule === 'caf_quarterly') return addMonths(from, 3); if (catalog.rule === 'titre_sejour') return ''; if (catalog.rule === 'mdph_long') return addDays(from, 180); if (['css_sante', 'ame', 'logement_social'].includes(catalog.rule)) return addMonths(from, 12); return addDays(from, 30); }
function needsDate(item) { return ['titre_sejour', 'css_sante', 'ame', 'logement_social', 'mdph_long', 'custom'].includes(item.rule); }
function showAsTodo(item) {
  // Les rappels personnalisés sont des rappels ponctuels :
  // une fois enregistrés, ils ne doivent pas rester dans “À faire maintenant”.
  if (item.rule === 'custom' && item.completedOnce) return false;

  // Les autres démarches récurrentes réapparaissent automatiquement
  // quand la prochaine échéance approche.
  return !item.completedOnce || statusOf(item.nextDate) !== 'ok';
}
function makeItem(catalogId) { const c = CATALOG.find((x) => x.id === catalogId) || CATALOG[0]; return { uid: `${c.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`, catalogId: c.id, rule: c.rule, title: c.title, short: c.short, cat: c.cat, icon: c.icon, nextDate: suggestedDate(c), lastAction: '', note: '', notifications: true, completedOnce: false }; }
function normalizeItem(item) { const c = catalogFor(item); return { ...makeItem(c.id), ...item, rule: item.rule || c.rule, title: item.title || c.title, short: item.short || c.short, cat: item.cat || c.cat, icon: item.icon || c.icon }; }
function initialState() { return { language: 'fr', onboarded: false, tab: 'home', toast: null, items: [] }; }
function loadState() { try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) { const parsed = JSON.parse(saved); return { ...initialState(), ...parsed, items: Array.isArray(parsed.items) ? parsed.items.map(normalizeItem) : [] }; } } catch {} return initialState(); }
function upcomingAlerts(items) { return items.filter((item) => Boolean(item.nextDate)).flatMap((item) => { if (item.rule === 'france_travail') { const openingDate = franceTravailOpeningDate(item.nextDate); return [{ ...item, reminderDate: openingDate, offset: 'opening', label: 'Ouverture de l’actualisation' }, ...reminderOffsets(item.rule).map((offset) => ({ ...item, reminderDate: addDays(item.nextDate, offset), offset }))]; } return reminderOffsets(item.rule).map((offset) => ({ ...item, reminderDate: addDays(item.nextDate, offset), offset })); }).filter((r) => daysUntil(r.reminderDate) >= 0).sort((a, b) => parseDate(a.reminderDate) - parseDate(b.reminderDate)).slice(0, 12); }
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
function UpdateAvailableBanner({ show, labels, onUpdate, onDismiss }) { if (!show) return null; return <div className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-lg sm:bottom-6 sm:left-auto sm:right-6 sm:w-96"><div className="font-bold text-amber-950">{labels.updateTitle}</div><div className="mt-1 text-sm text-amber-900">{labels.updateText}</div><div className="mt-3 grid grid-cols-2 gap-2"><Button variant="outline" onClick={onDismiss}>{labels.later}</Button><Button onClick={onUpdate}>{labels.updateNow}</Button></div></div>; }

function ProcedureCard({ item, labels, actions }) {
  const todo = showAsTodo(item);
  const missingDate = needsDate(item) && !item.nextDate;
  return <Card className={`overflow-hidden border-l-4 ${todo ? 'border-l-slate-900' : 'border-l-emerald-500'}`}><CardContent className="p-4"><div className="flex items-start gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-3xl">{item.icon}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold">{item.title}</h3><span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{item.cat}</span></div><p className="mt-1 text-sm text-slate-600">{missingDate ? labels.dateToEnter : todo ? item.short : `${labels.doneOn} ${formatDate(item.lastAction)}`}</p>{!todo && <p className="mt-1 text-xs text-slate-500">{labels.nextReminder} : {formatDate(item.nextDate)}</p>}{todo && item.nextDate && <p className="mt-1 text-xs text-slate-500">{labels.nextReminder} : {formatDate(item.nextDate)}</p>}</div></div>{todo ? (missingDate ? <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"><Button variant="outline" onClick={() => actions.guide(item)}>📘 {labels.guideStep}</Button><Button variant="success" onClick={() => actions.edit(item)}>📅 {labels.dateToEnter}</Button></div> : <div className="mt-4 space-y-2"><p className="text-sm font-medium text-slate-700">{labels.finishedQuestion}</p><div className="grid grid-cols-1 gap-2 sm:grid-cols-3"><Button variant="outline" onClick={() => actions.guide(item)}>📘 {labels.guideStep}</Button><Button variant="default" onClick={() => actions.done(item.uid)}>✅ {labels.doneButton}</Button><Button variant="ghost" onClick={() => actions.edit(item)}>⚙ {labels.rectify}</Button></div></div>) : <div className="mt-4 grid grid-cols-2 gap-2"><Button variant="outline" onClick={() => actions.edit(item)}>⚙ {labels.rectify}</Button><Button variant="ghost" onClick={() => actions.askDelete(item.uid)}>🗑 {labels.delete}</Button></div>}</CardContent></Card>;
}

function Header({ labels, actions }) {
  return <div className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3"><button type="button" onClick={() => actions.setTab('home')} className="flex items-center gap-3 text-left"><div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-slate-900"><img src="/icon-192.png" alt="" className="h-full w-full object-cover" /></div><div><div className="font-bold leading-tight">{labels.appTitle}</div><div className="text-xs text-slate-500">{labels.appSubtitle}</div></div></button><div className="flex items-center gap-2"><Button variant="ghost" className="hidden sm:inline-flex" onClick={() => actions.setTab('settings')}>🌐 {labels.language}</Button><AddMenu actions={actions} labels={labels} /></div></div></div>;
}
function Nav({ labels, tab, setTab }) { const tabs = [['home', '🏠', labels.home], ['alerts', '🔔', labels.alerts], ['settings', '⚙️', labels.settings]]; return <div className="mb-6 hidden flex-wrap gap-2 sm:flex">{tabs.map(([id, icon, label]) => <Button key={id} variant={tab === id ? 'default' : 'outline'} onClick={() => setTab(id)}><span>{icon}</span>{label}</Button>)}</div>; }
function BottomNav({ labels, tab, setTab }) { const tabs = [['home', '🏠', labels.home], ['alerts', '🔔', labels.alerts], ['settings', '⚙️', labels.settings]]; return <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white sm:hidden"><div className="grid grid-cols-3">{tabs.map(([id, icon, label]) => <button key={id} type="button" onClick={() => setTab(id)} className={`flex flex-col items-center gap-1 px-1 py-2 text-[11px] ${tab === id ? 'font-bold text-slate-950' : 'text-slate-500'}`}><span className="text-lg">{icon}</span><span>{label}</span></button>)}</div></div>; }

function Onboarding({ state, setState, labels }) { return <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white p-4"><Card className="w-full max-w-xl rounded-3xl shadow-lg"><CardContent className="p-6 sm:p-8"><div className="mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-900"><img src="/icon-192.png" alt="" className="h-full w-full object-cover" /></div><h1 className="text-3xl font-bold">{labels.welcome}</h1><p className="mt-2 text-slate-600">{labels.chooseLanguage}</p><div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">{LANGUAGES.map((lang) => <button key={lang.code} type="button" onClick={() => setState((s) => ({ ...s, language: lang.code }))} className={`rounded-2xl border p-4 text-left hover:bg-slate-50 ${state.language === lang.code ? 'ring-2 ring-slate-900' : ''}`}><div className="font-semibold">{lang.label}</div></button>)}</div><Button className="mt-6 w-full py-6 text-base" onClick={() => setState((s) => ({ ...s, onboarded: true }))}>{labels.continue}</Button></CardContent></Card></div>; }

function InstallPanel({ labels, deferredInstallPrompt, standalone, platform, onInstall, permission, askNotifications }) {
  const canAutoInstall = Boolean(deferredInstallPrompt) && !standalone;
  const installHelpText = standalone ? labels.openFromHome : platform === 'ios' ? labels.installIosHelp : platform === 'android' ? labels.installAndroidHelp : labels.installUnavailable;
  const installButtonText = standalone ? labels.installed : canAutoInstall ? labels.installApp : platform === 'ios' ? 'Voir les étapes iPhone' : 'Voir comment installer';
  const notificationButtonText = permission === 'granted' ? labels.notificationsGrantedTitle : permission === 'denied' ? labels.notificationsDeniedTitle : permission === 'unsupported' ? labels.notificationsUnsupportedTitle : labels.activateNotifications;
  return <Card><CardContent className="p-5"><h2 className="text-lg font-bold">📲 {labels.installTitle}</h2><p className="mt-1 text-slate-600">{standalone ? labels.installedText : labels.installIntro}</p><div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{installHelpText}</div><div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"><Button className="py-4" onClick={onInstall} disabled={standalone}>📲 {installButtonText}</Button><Button variant={permission === 'granted' ? 'success' : 'outline'} className="py-4" onClick={askNotifications}>🔔 {notificationButtonText}</Button></div><div className="mt-3 rounded-xl bg-white p-3 text-xs text-slate-500"><strong>{labels.notificationStepTitle} :</strong> {labels.notificationStepText} Rappels envoyés vers 09:00.</div></CardContent></Card>;
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

function RepairPanel({ language, onRepair }) { const repair = repairUiFor(language); return <Card><CardContent className="p-5"><h2 className="text-lg font-bold">🛠️ {repair.title}</h2><p className="mt-1 text-slate-600">{repair.text}</p><div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950">{repair.warning}</div><Button variant="outline" className="mt-4 py-4" onClick={onRepair}>🛠️ {repair.button}</Button></CardContent></Card>; }

function Settings({ state, labels, setState, appUrl, installProps, onRepair }) { return <div className="space-y-6"><div><h1 className="text-3xl font-bold">{labels.settings}</h1><p className="mt-1 text-slate-600">{labels.settingsIntro}</p></div><InstallPanel labels={labels} {...installProps} /><RepairPanel language={state.language} onRepair={onRepair} /><Card><CardContent className="p-5"><h2 className="text-lg font-bold">🌐 {labels.language}</h2><div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">{LANGUAGES.map((lang) => <Button key={lang.code} variant={state.language === lang.code ? 'default' : 'outline'} className="justify-start" onClick={() => setState((s) => ({ ...s, language: lang.code, toast: { title: labelsFor(lang.code).saved, body: lang.label } }))}>{lang.label}</Button>)}</div></CardContent></Card><Card><CardContent className="p-5"><h2 className="text-lg font-bold">📱 {labels.shareApp}</h2><p className="mt-1 text-slate-600">{labels.scanToInstall}</p><div className="mt-4 inline-block rounded-2xl bg-white p-4 shadow-sm"><QRCodeSVG value={appUrl} size={220} includeMargin /></div><p className="mt-3 max-w-xl text-sm text-slate-600">{labels.installHelp}</p><p className="mt-2 break-all rounded-xl bg-slate-50 p-3 text-xs text-slate-600">{appUrl}</p></CardContent></Card></div>; }

function Guides({ labels, setTab, language, selectedGuideId, openGuide }) {
  const catalog = CATALOG.find((c) => c.id === selectedGuideId) || null;
  const officialUrl = catalog ? OFFICIAL_GUIDE_URLS[catalog.id] : '';
  const translatedUrl = catalog ? officialGuideUrlFor(catalog.id, language) : '';
  const guideUi = guideUiFor(language);

  if (catalog && officialUrl) {
    return <div className="space-y-6"><Button variant="ghost" onClick={() => setTab('home')}>← {labels.back}</Button><Card><CardContent className="p-6 sm:p-8"><div className="flex items-start gap-4"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-slate-100 text-4xl">{catalog.icon}</div><div><h1 className="text-3xl font-bold">{labels.guideStep} — {catalog.title}</h1><p className="mt-2 text-slate-600">{labels.openGuideIntro}</p></div></div><div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"><Button className="py-6 text-base" variant="default" onClick={() => window.open(officialUrl, '_blank', 'noopener,noreferrer')}>🌐 {guideUi.official}</Button><Button className="py-6 text-base" variant="outline" onClick={() => window.open(translatedUrl, '_blank', 'noopener,noreferrer')}>🌍 {guideUi.translated}</Button></div><div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950">{guideUi.notice}</div></CardContent></Card></div>;
  }

  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">{labels.guidesTitle}</h1><p className="mt-1 text-slate-600">{labels.guidesIntro}</p></div><Card><CardContent className="p-5"><div className="grid grid-cols-1 gap-3 md:grid-cols-2">{CATALOG.filter((c) => c.id !== 'custom').map((c) => { const hasGuide = Boolean(GUIDE_AVAILABLE[c.id]); return <button key={c.id} type="button" onClick={() => hasGuide ? openGuide(c.id) : null} className="rounded-2xl bg-slate-50 p-4 text-left"><div className="font-semibold">📘 {labels.guideStep} — {c.title}</div><div className="mt-1 text-sm text-slate-600">{hasGuide ? guideUi.available : labels.guideComing}</div></button>; })}</div><Button className="mt-5" onClick={() => setTab('home')}>{labels.back}</Button></CardContent></Card></div>;
}

function Detail({ item, labels, actions }) { const [draft, setDraft] = useState(item); useEffect(() => setDraft(item), [item]); if (!draft) return null; const c = catalogFor(draft); return <div className="space-y-6"><Button variant="ghost" onClick={() => actions.setTab('home')}>← {labels.back}</Button><Card className="rounded-3xl"><CardContent className="p-6 sm:p-8"><div className="flex items-start gap-4"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-slate-100 text-4xl">{draft.icon}</div><div><h1 className="text-3xl font-bold">{draft.title}</h1><p className="mt-1 text-slate-600">{draft.short}</p></div></div><div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700"><div className="font-semibold">{labels.ruleApplied}</div><div className="mt-1">{c.timing}</div></div><div className="mt-6 space-y-4">{needsDate(draft) ? <label className="space-y-2 block"><span className="text-sm font-medium text-slate-700">{labels.dateToEnter}</span><input type="date" value={draft.nextDate} onChange={(e) => setDraft({ ...draft, nextDate: e.target.value })} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3" /></label> : <div className="rounded-2xl bg-white p-4 text-sm text-slate-700">{labels.dateAutoAfterDone}</div>}<label className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-3 py-3"><input type="checkbox" checked={draft.notifications !== false} onChange={(e) => setDraft({ ...draft, notifications: e.target.checked })} /><span className="text-sm font-medium text-slate-700">{labels.reminderEnabled}</span></label><label className="space-y-2 block"><span className="text-sm font-medium text-slate-700">{labels.note}</span><textarea value={draft.note || ''} onChange={(e) => setDraft({ ...draft, note: e.target.value })} rows={4} className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-3" /></label></div><div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3"><Button variant="default" className="py-6" onClick={() => actions.done(draft.uid, draft)}>✅ {labels.doneButton}</Button><Button className="py-6" onClick={() => actions.save(draft)}>💾 {labels.save}</Button><Button variant="outline" className="py-6" onClick={() => actions.askDelete(draft.uid)}>🗑 {labels.delete}</Button></div></CardContent></Card></div>; }

export default function App() {
  const [state, setState] = useState(loadState);
  const [selectedUid, setSelectedUid] = useState(null);
  const [deleteUid, setDeleteUid] = useState(null);
  const [selectedGuideId, setSelectedGuideId] = useState(null);
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
    add: (catalogId) => setState((s) => {
      const c = CATALOG.find((x) => x.id === catalogId);
      if (!c) return s;
      if (catalogId !== 'custom' && s.items.some((i) => i.catalogId === catalogId)) return { ...s, toast: { title: labels.alreadyAdded, body: c.title } };
      return { ...s, tab: 'home', items: [makeItem(catalogId), ...s.items], toast: { title: labels.saved, body: c.title } };
    }),
    done: (uid, draft = null) => {
      const item = draft ? normalizeItem(draft) : state.items.find((i) => i.uid === uid);
      if (item && needsDate(item) && !item.nextDate) {
        setSelectedUid(uid);
        setState((s) => ({ ...s, tab: 'detail', toast: { title: labels.dateToEnter, body: item.title } }));
        return;
      }
      setState((s) => ({ ...s, tab: 'home', items: s.items.map((i) => {
        if (i.uid !== uid) return i;
        const merged = normalizeItem({ ...i, ...(draft || {}) });
        return { ...merged, completedOnce: true, lastAction: todayISO(), nextDate: nextAfterDone(merged) };
      }), toast: { title: '✅', body: labels.saved } }));
    },
    edit: (item) => { setSelectedUid(item.uid); setState((s) => ({ ...s, tab: 'detail' })); },
    guide: (item) => { setSelectedGuideId(item.catalogId); setState((s) => ({ ...s, tab: 'guides' })); },
    save: (draft) => { setState((s) => ({ ...s, items: s.items.map((i) => i.uid === draft.uid ? normalizeItem(draft) : i), toast: { title: labels.saved, body: draft.title } })); },
    askDelete: (uid) => setDeleteUid(uid),
    cancelDelete: () => setDeleteUid(null),
    confirmDelete: () => { setState((s) => ({ ...s, tab: 'home', items: s.items.filter((i) => i.uid !== deleteUid) })); setDeleteUid(null); setSelectedUid(null); },
  };

  if (!state.onboarded) return <Onboarding state={state} setState={setState} labels={labels} />;

  return <div className="min-h-screen bg-slate-50 pb-24 text-slate-950 sm:pb-10"><Toast toast={state.toast} close={() => setState((s) => ({ ...s, toast: null }))} /><UpdateAvailableBanner show={Boolean(waitingWorker) && !updateDismissed} labels={labels} onUpdate={applyAppUpdate} onDismiss={() => setUpdateDismissed(true)} /><DeleteDialog item={deleteItem} labels={labels} cancel={actions.cancelDelete} confirm={actions.confirmDelete} /><Header labels={labels} actions={actions} /><main className="mx-auto max-w-6xl px-4 py-6"><Nav labels={labels} tab={state.tab} setTab={actions.setTab} />{state.tab === 'home' && <Home state={state} labels={labels} actions={actions} installProps={installProps} />}{state.tab === 'alerts' && <Alerts state={state} labels={labels} actions={actions} permission={permission} setPermission={setPermission} />}{state.tab === 'settings' && <Settings state={state} labels={labels} setState={setState} appUrl={appUrl} installProps={installProps} onRepair={repairApp} />}{state.tab === 'guides' && <Guides labels={labels} setTab={actions.setTab} language={state.language} selectedGuideId={selectedGuideId} openGuide={setSelectedGuideId} />}{state.tab === 'detail' && <Detail item={selected} labels={labels} actions={actions} />}</main><BottomNav labels={labels} tab={state.tab} setTab={actions.setTab} /></div>;
}
