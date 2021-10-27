import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/system',
  name: 'system',
  component: LAYOUT,
  redirect: '/system/user',
  meta: {
    orderNo: 101,
    icon: 'ion:grid-outline',
    title: t('routes.system.system'),
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('/@/views/system/user.vue'),
      meta: {
        // affix: true,
        title: t('routes.system.user'),
      },
    },
  ],
};

export default dashboard;
