import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteArms } from '../../src';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteArms({
      entry: path.resolve(__dirname, 'src/main.ts'),
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
