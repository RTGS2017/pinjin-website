import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // 正式站 https://pinjinpump.com/ 必须是站点根。不要用 /pinjin-website/，否则 JS/CSS 会 404。
  // /en/ /zh/ /pt/ /ar/ 是 React Router 语言路径，由路由处理，不是 Vite base。
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
