# Mes rappels de droits — PWA gratuite

Application web installable sur téléphone, sans Play Store ni App Store.

## Tester sur ordinateur

```bash
npm install
npm run dev
```

Puis ouvrir l'adresse affichée par Vite.

## Tester sur téléphone en Wi-Fi

Lancer :

```bash
npm run dev
```

Sur le téléphone connecté au même Wi-Fi, ouvrir l'adresse `http://adresse-ip-du-pc:5173`.

Attention : les notifications complètes demandent généralement une adresse HTTPS.

## Déployer gratuitement

Solution recommandée : Vercel gratuit.

1. Créer un compte gratuit sur Vercel.
2. Créer un dépôt GitHub avec ces fichiers.
3. Dans Vercel : Add New Project > Import Git Repository.
4. Framework : Vite.
5. Build command : `npm run build`.
6. Output directory : `dist`.
7. Déployer.

Vercel donnera une adresse HTTPS du type :

```text
https://mes-rappels-droits.vercel.app
```

## QR code

Une fois l'application ouverte à son adresse publique, aller dans :

```text
Réglages > Partager / QR code
```

Le QR code affiché pointe automatiquement vers l'adresse publique de l'application.

## Installation sur téléphone

Android / Chrome : ouvrir le lien, menu ⋮, puis Installer ou Ajouter à l'écran d'accueil.

iPhone / Safari : ouvrir le lien, bouton Partager, puis Sur l'écran d'accueil.
