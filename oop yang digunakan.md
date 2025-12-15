# Konsep OOP yang Digunakan dalam Proyek Ini

Berikut adalah daftar konsep Object-Oriented Programming (OOP) yang diterapkan dalam proyek Router Admin ini:

## 1. Class & Object
- **Penerapan**: Hampir seluruh logika bisnis dibungkus dalam Class.
- **Lokasi**: `server/classes/*.js`, `oop_server.js`.
- **Penjelasan**: `RouterServer` adalah Class utama. `DeviceManager`, `AuthManager`, dll adalah Class pendukung. Saat aplikasi berjalan, kita membuat **Object** (instance) dari class-class tersebut (contoh: `new DeviceManager()`).

## 2. Encapsulation (Enkapsulasi)
- **Penerapan**: Menyembunyikan detail implementasi dan melindungi data internal.
- **Lokasi**:
    - `JsonStore.js`: Menyembunyikan kerumitan membaca/menulis file JSON (`fs.readFile`). Class lain hanya tahu method `.read()` dan `.write()`.
    - `AuthManager.js`: Token disimpan dalam variable privat di dalam class. Akses keluar hanya melalui method `login` dan `validateToken`.
- **Manfaat**: Kode menjadi lebih aman dan mudah diubah tanpa merusak bagian lain.

## 3. Inheritance (Pewarisan)
- **Penerapan**: Class anak mewarisi method dan properti dari Class induk.
- **Lokasi**:
    - **Parent**: `BaseManager.js` (Menangani logika file JSON umum).
    - **Children**: `DeviceManager`, `WifiManager`, `NetworkManager`, `SecurityManager`.
- **Kode**:
    ```javascript
    class DeviceManager extends BaseManager {
        constructor() { super('devices.json', ...); }
    }
    ```
- **Manfaat**: Mengurangi duplikasi kode (DRY - Don't Repeat Yourself). Logika `init` dan `JsonStore` cukup ditulis sekali di `BaseManager`.

## 4. Composition (Komposisi)
- **Penerapan**: Sebuah Class "memiliki" Class lain untuk membangun fungsionalitas yang lebih besar.
- **Lokasi**: `oop_server.js` (Class `RouterServer`).
- **Penjelasan**: `RouterServer` tidak mewarisi apa pun, tapi dia **memiliki** (`has-a`) banyak manager:
    - `this.authManager = new AuthManager();`
    - `this.deviceManager = new DeviceManager();`
- **Manfaat**: Struktur aplikasi lebih fleksibel dan modular dibandingkan pewarisan bertingkat (Hierarchy).

## 5. Abstraction (Abstraksi)
- **Penerapan**: Menyederhanakan sistem yang kompleks menjadi antarmuka (interface) yang sederhana.
- **Lokasi**:
    - `TrafficMonitor.js`: Pengguna class ini tidak perlu tahu rumus hitungan CPU/RAM. Cukup panggil `getStatus()` untuk dapat datanya.
    - `WifiManager.js`: Mengabstraksi pengaturan teknis WiFi menjadi objek konfigurasi sederhana (`ssid`, `password`).
