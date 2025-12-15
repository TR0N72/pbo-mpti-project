import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Titik Masuk Utama (Entry Point) Aplikasi React:
// File ini adalah yang pertama kali dieksekusi oleh Vite untuk me-mount aplikasi ke DOM.
createRoot(document.getElementById('root')!).render(
  // StrictMode: Komponen pembungkus untuk menyoroti potensi masalah dalam aplikasi.
  // Hanya aktif di mode development (dev), tidak berdampak pada production build.
  <StrictMode>
    <App />
  </StrictMode>,
)
