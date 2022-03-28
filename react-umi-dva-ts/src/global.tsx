// 全局配置 最开始触发
import { Button, message, notification } from 'antd';
import defaultSettings from '../config/defaultSettings';
const { pwa } = defaultSettings;
const isHttps = document.location.protocol === 'https:';

/** 清空缓存 */
const clearCache = () => {
  if (window.caches) {
    caches
      .keys()
      .then((keys) => {
        keys.forEach((key) => caches.delete(key));
      })
      .catch((err) => console.log(err));
  }
};

if (pwa) {
  // 监听网络离线状态
  window.addEventListener('sw.offline', () => {
    message.warning('当前处于离线状态');
  });

  // 监听更新状态
  window.addEventListener('sw.updated', (event: Event) => {
    const e = event as CustomEvent;

    const reloadSW = async () => {
      const worker = e.detail && e.detail.waiting;
      if (!worker) {
        return true;
      } // Send skip-waiting event to waiting SW with MessageChannel

      await new Promise((resolve, reject) => {
        // 通讯
        const channel = new MessageChannel();
        channel.port1.onmessage = (mesEvent) => {
          if (mesEvent.data.error) {
            reject(mesEvent.data.error);
          } else {
            resolve(mesEvent.data);
          }
        };

        worker.postMessage({ type: 'skip-waiting' }, [channel.port2]);
      });
      clearCache();
      window.location.reload();
      return true;
    };

    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        onClick={() => {
          notification.close(key);
          reloadSW();
        }}
      >
        {'刷新'}
      </Button>
    );

    notification.open({
      message: '有新内容',
      description: '请点击“刷新”按钮或者手动刷新页面',
      btn,
      key,
      onClose: async () => null,
    });
  });
} else if ('serviceWorker' in navigator && isHttps) {
  // unregister service worker
  const { serviceWorker } = navigator;

  if (serviceWorker.getRegistrations) {
    serviceWorker.getRegistrations().then((sws) => {
      sws.forEach((sw) => {
        sw.unregister();
      });
    });
  }

  serviceWorker.getRegistration().then((sw) => {
    if (sw) sw.unregister();
  });
  clearCache();
}
