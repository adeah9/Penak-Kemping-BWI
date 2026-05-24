# PenakKemping Android APK (TWA / Bubblewrap)

Folder ini menyiapkan build Android APK dari PWA yang sudah ada, **tanpa mengubah fitur web**.

## 1) Prasyarat

Install:

1. `Node.js` LTS (disarankan 18+)
2. `Java JDK` 17
3. `Android Studio` (termasuk SDK + Build Tools)
4. `Google Chrome` di Android untuk runtime TWA

Opsional cek:

```bash
node -v
java -version
adb version
```

## 2) Pastikan domain production

Konfigurasi saat ini memakai:

- `https://penakkempingg.vercel.app`

Jika domain production beda, edit file:

- `android-twa/twa-manifest.json`
  - `host`
  - `webManifestUrl`
  - `iconUrl`
  - `maskableIconUrl`
  - `monochromeIconUrl`

## 3) Install Bubblewrap CLI

```bash
npm i -g @bubblewrap/cli
```

## 4) Generate project Android dari manifest Bubblewrap

Dari root project (`PenakK`):

```bash
cd android-twa
bubblewrap init --manifest https://penakkempingg.vercel.app/manifest.json
```

Saat wizard muncul, isi:

1. App name: `PenakKemping`
2. Package name: `com.penakkemping.app`
3. Start URL: `/index.html`
4. Launcher name: `PenakKemping`
5. Theme/background color: sesuai manifest (`#C8102E` / `#FFFFFF`)
6. Icon: gunakan icon PWA existing dari URL project

Setelah selesai, salin konfigurasi generated jika perlu dan samakan dengan `android-twa/twa-manifest.json`.

## 5) Build APK (debug)

```bash
bubblewrap build
```

Hasil APK debug umumnya ada di:

- `android-twa/app/build/outputs/apk/debug/app-debug.apk`

## 6) Build APK release

### Buat keystore release (sekali saja)

```bash
keytool -genkeypair -v -keystore penakkemping-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias penakkemping
```

### Jalankan build release

```bash
bubblewrap build --skipPwaValidation
```

Jika diminta, isi data signing sesuai keystore release.

Hasil release biasanya di:

- `android-twa/app/build/outputs/apk/release/app-release.apk`

## 7) Install APK ke HP Android

### Via kabel (ADB)

```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

### Manual

1. Copy APK ke HP.
2. Buka file APK di HP.
3. Izinkan install dari sumber ini.
4. Install aplikasi `PenakKemping`.

## 8) Verifikasi TWA (penting untuk fullscreen tanpa URL bar)

Agar TWA terverifikasi:

1. Ambil SHA-256 cert dari keystore release:

```bash
keytool -list -v -keystore penakkemping-release.jks -alias penakkemping
```

2. Isi `android-twa/assetlinks.json.template` dengan SHA-256 tersebut.
3. Upload file menjadi:

- `https://penakkempingg.vercel.app/.well-known/assetlinks.json`

Tanpa verifikasi asset links, aplikasi bisa fallback ke mode Custom Tabs (fungsi tetap jalan, tapi bukan full verified TWA).

## 9) Lokasi file penting

1. Bubblewrap config: `android-twa/twa-manifest.json`
2. Template asset links: `android-twa/assetlinks.json.template`
3. Output APK debug: `android-twa/app/build/outputs/apk/debug/app-debug.apk`
4. Output APK release: `android-twa/app/build/outputs/apk/release/app-release.apk`

## 10) Catatan batasan TWA

1. APK TWA tetap bergantung pada web app yang di-hosting (HTTPS), bukan localhost.
2. Fitur web tetap sama persis dengan PWA (admin, database, cart, invoice mengikuti website).
3. Jika domain down, app ikut terdampak.
4. Untuk experience terbaik dan fullscreen, asset links harus valid.
