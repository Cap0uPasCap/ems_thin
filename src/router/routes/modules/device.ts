import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const device: AppRouteModule = {
  path: '/device',
  name: 'Device',
  component: LAYOUT,
  redirect: '/device/parameter',
  meta: {
    orderNo: 7,
    icon: 'ic:baseline-dashboard-customize',
    title: t('routes.device.device'),
  },
  children: [
    {
      path: 'parameter',
      name: 'Parameter',
      component: () => import('/@/views/device/parameter/index.vue'),
      meta: {
        title: t('routes.device.parameter'),
      },
    },
    {
      path: 'command',
      name: 'Command',
      component: () => import('/@/views/device/command/index.vue'),
      meta: {
        title: 'routes.device.command',
      },
    },
    {
      path: 'file',
      name: 'File',
      component: () => import('/@/views/device/file-upgrade/index.vue'),
      meta: {
        title: 'routes.device.fileUpgrade',
      },
    },
  ],
};

export default device;
