import type { viteArmsOptions } from './types';
import type { Plugin } from 'vite';

import { ResolvedConfig } from 'vite';

export function viteArms(opt: viteArmsOptions): Plugin {
  let viteConfig: ResolvedConfig;
  let isDev = false;
  const { entry, enabled = true, localEnabled = false } = opt;

  return {
    name: 'vite:arms',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
      isDev = viteConfig.command === 'serve';
      console.log(viteConfig, isDev, entry, enabled, localEnabled);
    },
    transform(_source: string, id: string) {
      console.log(id);
      return _source;
    }
  };
}

export * from './types';
