import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        // O Vite só empacota index.html por padrão. Sem declarar as páginas
        // de dev/ aqui elas nunca chegam ao dist/ e a rota devolve 404 em
        // produção.
        input: {
          home: path.resolve(__dirname, 'index.html'),
          painel: path.resolve(__dirname, 'dev/painel.html'),
          calibracao: path.resolve(__dirname, 'dev/calibracao.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
