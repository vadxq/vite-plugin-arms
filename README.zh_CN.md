# vite-plugin-arms

[![](https://img.shields.io/npm/v/vite-plugin-arms.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-arms)
[![](https://img.shields.io/npm/l/vite-plugin-arms.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-arms)
[![](https://img.shields.io/npm/dt/vite-plugin-arms.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-arms)

> vitejs v2 plugin for arms

**中文** | [English](./README.md)

## 安装 (yarn or npm)

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

## 示例

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

## 使用

### vite.config.ts 配置

- **Vue** 简单配置

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
        imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?', // 新加坡 `https://arms-retcode-sg.aliyuncs.com/r.png?`
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

- **React** 简单配置

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
        imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?', // 新加坡 `https://arms-retcode-sg.aliyuncs.com/r.png?`
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

- 区分开发环境和生产打包环境

```ts
// 你可以使用 command / mode 来区分是否使用
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
        imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?', // 新加坡 `https://arms-retcode-sg.aliyuncs.com/r.png?`
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

## viteArms配置

```ts
{
  entry: string; // 入口文件
  enabled?: boolean; // 是否启用
  config?: { // Arms options
    // pid 查阅 https://arms.console.aliyun.com/retcode/#/index
    pid: string;
    // app type 查阅 https://arms.console.aliyun.com/retcode/#/index
    appType: string; // 默认: 'web'
    // 上报地址
    imgUrl?: string; // 'https://arms-retcode.aliyuncs.com/r.png?', 新加坡 `https://arms-retcode-sg.aliyuncs.com/r.png?`
    // 开启页面资源上报
    sendResource?: boolean; // 默认: true
    // 与应用监控关联
    enableLinkTrace?: boolean; // 默认: true
    // 开启用户行为回溯
    behavior?: boolean; // 默认: true
    // 开启SPA自动解析
    enableSPA?: boolean; // 默认: true
    // 开启首屏FMP采集
    useFmp?: boolean; // 默认: true
    // 开启Console追踪
    enableConsole?: boolean; // 默认: true
    // 关闭API自动上报
    disableHook?: boolean; // // 默认: false
    // 环境字段，取值为：prod、gray、pre、daily和local
    environment?: 'prod' | 'gray' | 'pre' | 'daily' | 'local'; // 默认: prod
    // 传入的标记，每条日志都会携带该标记
    tag?: string;
    // 应用版本号。建议您配置，便于查看不同版本的上报信息
    release?: string;
    // 日志采样配置，值为1、10或100。性能和成功API日志按照1/sample的比例采样
    sample?: number; // 默认: 1
    // 用户ID，用于标识访问用户，可手动配置，用于根据用户ID检索。如果不配置，则由SDK自动生成且每半年更新一次
    uid?: string;
  };
}
```

## 高级用法

此插件会将实例`__bl`挂在在window。

### API

详细参考：https://help.aliyun.com/document_detail/58657.html?spm=a2c4g.11186623.6.693.76f84afeBXsfOw

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
