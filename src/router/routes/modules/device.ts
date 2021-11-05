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
    icon: 'ion:aperture-outline',
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
  ],
};

export default device;
