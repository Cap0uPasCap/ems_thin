import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const information: AppRouteModule = {
  path: '/network-config',
  name: 'NetworkConfig',
  component: LAYOUT,
  redirect: '/network-config/index',
  meta: {
    orderNo: 7,
    hideChildrenInMenu: true,
    icon: 'clarity:network-settings-line',
    title: '网管配置',
  },
  children: [
    {
      path: 'index',
      name: 'NetworkConfig',
      component: () => import('/@/views/network-config/index.vue'),
      meta: {
        title: '网管配置',
      },
    },
  ],
};

export default information;
