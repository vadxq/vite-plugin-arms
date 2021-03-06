# vite-plugin-arms

[![](https://img.shields.io/npm/v/vite-plugin-arms.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-arms)
[![](https://img.shields.io/npm/l/vite-plugin-arms.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-arms)
[![](https://img.shields.io/npm/dt/vite-plugin-arms.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-arms)

> vite2 plugin for arms

**English** | [中文](./README.zh_CN.md)

## Install (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
yarn add alife-logger
# or
npm i  alife-logger -S
```

```bash
yarn add vite-plugin-arms -D
# or
npm i vite-plugin-arms -D
```

## Example

```bash
# vue
cd ./example/vue-demo

yarn install

yarn dev

```

```bash
# react
cd ./example/react-demo

yarn install

yarn dev

```

## Usage

### Config plugin in vite.config.ts

- **Vue** sample config

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteArms } from 'vite-plugin-arms';
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
        imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?', // SG `https://arms-retcode-sg.aliyuncs.com/r.png?`
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
```

- **React** sample config

```ts
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { viteArms } from 'vite-plugin-arms';
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
        imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?', // SG `https://arms-retcode-sg.aliyuncs.com/r.png?`
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
```

- Different from the production environment and development environment

```ts
// Different from the production environment and development environment
// You can use command / mode to distinguish usage
import { UserConfigExport, ConfigEnv } from 'vite';
import { viteArms } from 'vite-plugin-arms';
import vue from '@vitejs/plugin-vue';
import * as path from 'path'
import * as pkg from '../package.json';

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteArms({
      entry: path.resolve(__dirname, 'src/main.ts'),
      enabled: command !== 'serve' || mode === 'prod', // build production
      config: {
        pid: '',
        appType: 'web',
        imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?', // SG `https://arms-retcode-sg.aliyuncs.com/r.png?`
        sendResource: true,
        enableLinkTrace: true,
        behavior: true,
        enableSPA: true,
        useFmp: true,
        enableConsole: true,
        disableHook: false,
        environment: mode === 'prod' ? 'prod' : 'local',
        release: pkg.version
      }
    })
    ],
  };
};
```

### viteArms Options

```ts
{
  entry: string | string[]; // entry file require
  enabled?: boolean;
  config?: { // Arms options
    // pid see https://arms.console.aliyun.com/retcode/#/index
    pid: string;
    // app type https://arms.console.aliyun.com/retcode/#/index
    appType: string; // default: 'web'
    // url
    imgUrl?: string; // 'https://arms-retcode.aliyuncs.com/r.png?', SG `https://arms-retcode-sg.aliyuncs.com/r.png?`
    // Open page resource report
    sendResource?: boolean; // default: true
    // Associated with application monitoring
    enableLinkTrace?: boolean; // default: true
    // Turn on user behavior backtracking
    behavior?: boolean; // default: true
    // Turn on SPA automatic resolution
    enableSPA?: boolean; // default: true
    // Open the first screen FMP capture
    useFmp?: boolean; // default: true
    // Turn on Console tracking
    enableConsole?: boolean; // default: true
    // Turn off API automatic reporting
    disableHook?: boolean; // // default: false
    // Environment field, the value is: prod, gray, pre, daily and local
    environment?: 'prod' | 'gray' | 'pre' | 'daily' | 'local'; // default: prod
    // The incoming tag, each log will carry the tag.
    tag?: string;
    // App version number. It is recommended that you configure it so that you can view the reported information of different versions.
    release?: string;
    // Log sampling configuration, the value is 1, 10, or 100. The performance and success API logs are sampled at the ratio of 1/sample.
    sample?: number; // default: 1
    // User ID, used to identify the accessing user, can be manually configured, and used for retrieval based on user ID. If it is not configured, it will be automatically generated by the SDK and updated every six months.
    uid?: string;
  };
}
```

## Advanced Usage

This plugin will hang the instance `__bl` in the window.

### API

Detailed reference: https://help.aliyun.com/document_detail/58657.html?spm=a2c4g.11186623.6.693.76f84afeBXsfOw

```ts
__bl.api(api, success, time, code, msg)

__bl.error(error, pos)

__bl.sum(key, value)

__bl.avg(key, value)

__bl.addBehavior(behavior)

__bl.reportBehavior()

__bl.setConfig(next)

__bl.setPage(page, sendPv)

```

## License

[MIT](LICENSE)
