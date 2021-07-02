import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { viteArms } from '../../src';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    viteArms({
      entry: path.resolve('src/main.tsx'),
      enabled: true,
      config: {
        pid: '',
        appType: 'web',
        sendResource: true,
        enableLinkTrace: true,
        behavior: true,
        enableSPA: true,
        useFmp: true,
        enableConsole: true,
        disableHook: false,
        environment: 'local',
        release: '0.1.0'
      }
    })
  ]
});
