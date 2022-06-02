import type { viteArmsOptions } from './types';
import type { Plugin } from 'vite';

import { ResolvedConfig } from 'vite';

export function viteArms(opt: viteArmsOptions): Plugin {
  let viteConfig: ResolvedConfig;
  let isDev = false;
  const { entry, enabled = true, config } = opt;

  let entryPath = Array.isArray(entry) ? entry : [entry];
  if (process.platform === 'win32')
    entryPath = entryPath.map((item) => item.replace(/\\/g, '/'));

  return {
    name: 'vite:arms',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
      isDev = viteConfig.command === 'serve';
      console.log(isDev);
    },
    transform(_source: string, id: string) {
      // if (id === entry && enabled && !isDev) {
      if (entryPath.includes(id) && enabled) {
        return {
          code: `
          /* eslint-disable */
          import * as BrowserLogger from 'alife-logger';
          const __bl = BrowserLogger.singleton({
            pid: '${config.pid}',
            appType: '${config.appType}',
            imgUrl: '${
              config.imgUrl
                ? config.imgUrl
                : 'https://arms-retcode.aliyuncs.com/r.png?'
            }',
            ${
              config.sendResource ? `sendResource: ${config.sendResource},` : ''
            }
            ${
              config.enableLinkTrace
                ? `enableLinkTrace: ${config.enableLinkTrace},`
                : ''
            }
            ${config.behavior ? `behavior: ${config.behavior},` : ''}
            ${config.enableSPA ? `enableSPA: ${config.enableSPA},` : ''}
            ${config.useFmp ? `useFmp: ${config.useFmp},` : ''}
            ${
              config.enableConsole
                ? `enableConsole: ${config.enableConsole},`
                : ''
            }
            ${config.disableHook ? `disableHook: ${config.disableHook},` : ''}
            ${config.environment ? `environment: '${config.environment}',` : ''}
            ${config.tag ? `tag: '${config.tag}',` : ''}
            ${config.release ? `release: '${config.release}',` : ''}
            ${config.sample ? `sample: ${config.sample},` : ''}
            ${config.uid ? `uid: '${config.uid}',` : ''}
          });
          window.__bl = __bl;
          /* eslint-enable */
          ${_source};
        `,
          map: null
        };
      }
      return {
        code: _source,
        map: null
      };
    }
  };
}

export * from './types';
