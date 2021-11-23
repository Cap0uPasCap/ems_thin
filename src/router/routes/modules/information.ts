import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const information: AppRouteModule = {
  path: '/information',
  name: 'Information',
  component: LAYOUT,
  redirect: '/information/index',
  meta: {
    orderNo: 1,
    hideChildrenInMenu: true,
    icon: 'bi:info-square-fill',
    title: t('routes.information.information'),
  },
  children: [
    {
      path: 'index',
      name: 'InformationDevice',
      component: () => import('/@/views/information/index.vue'),
      meta: {
        title: t('routes.information.information'),
      },
    },
  ],
};

export default information;
