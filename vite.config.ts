import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega les variables d'entorn des del fitxer .env
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: '/',
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY)
    },
    plugins: [
      react(),
      // Plugin personalitzat per copiar el service worker, injectar la clau d'API i escriure'l a dist/
      {
        name: 'build-service-worker',
        apply: 'build',
        closeBundle: () => {
          const sourceSwPath = resolve(__dirname, 'firebase-messaging-sw.js');
          const destSwPath = resolve(__dirname, 'dist/firebase-messaging-sw.js');
          try {
            let swContent = readFileSync(sourceSwPath, 'utf-8');
            // Reemplaça el marcador de posició per la clau real
            swContent = swContent.replace(
              '"__VITE_API_KEY_PLACEHOLDER__"',
              `"${env.VITE_API_KEY}"`
            );
            writeFileSync(destSwPath, swContent);
            console.log('Service worker copiat i clau API injectada correctament a dist/.');
          } catch (error) {
            console.error('Error en processar el service worker (firebase-messaging-sw.js):', error);
          }
        }
      }
    ],
  }
})
