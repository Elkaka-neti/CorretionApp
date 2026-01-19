import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPath from 'vite-tsconfig-paths'
import fs from 'fs';
import path from 'path';


const model404Plugin = () => ({
  name: 'model-404-fix',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const url = req.url || '';
      if (url.startsWith('/model/') && /\.(onnx|json)$/.test(url)) {
        const cleanUrl = url.split('?')[0];
        const filePath = path.join(process.cwd(), 'public', cleanUrl);

        if (!fs.existsSync(filePath)) {
          console.warn(`[DEBUG-SENIOR] Bloqueando arquivo inexistente: ${cleanUrl}`);
          res.statusCode = 404;
          res.end('Not Found');
          return;
        }
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.onnx'],
  plugins: [react(), tsConfigPath(), model404Plugin()],
  server: {
      host: true, 
      port: 5173,
      fs: {
        strict: false,
        allow:[".."]
      },
      watch: {
       usePolling: true, 
      }
   }
  })
