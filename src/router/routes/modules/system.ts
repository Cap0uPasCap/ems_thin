import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/user',
  meta: {
    orderNo: 8,
    icon: 'ion:grid-outline',
    title: t('routes.system.system'),
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('/@/views/system/user/index.vue'),
      meta: {
        title: t('routes.system.user'),
      },
    },
  ],
};

export default system;
