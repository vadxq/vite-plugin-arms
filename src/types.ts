export interface viteArmsOptions {
  entry: string; // entry file
  enabled?: boolean; // enabled
  config: {
    pid: string;
    appType: string;
    sendResource?: boolean;
    enableLinkTrace?: boolean;
    behavior?: boolean;
    enableSPA?: boolean;
    useFmp?: boolean;
    enableConsole?: boolean;
    disableHook?: boolean;
    environment?: 'prod' | 'gray' | 'pre' | 'daily' | 'local';
    tag?: string;
    release?: string;
    sample?: number;
    uid?: string;
  };
}
