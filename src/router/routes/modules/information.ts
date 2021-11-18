import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const information: AppRouteModule = {
  path: '/information',
  name: 'Information',
  component: LAYOUT,
  redirect: '/information/device',
  meta: {
    orderNo: 1,
    icon: 'ion:grid-outline',
    title: t('routes.information.information'),
  },
  children: [
    {
      path: 'device',
      name: 'InformationDevice',
      component: () => import('/@/views/information/index.vue'),
      meta: {
        title: t('routes.information.information'),
      },
    },
  ],
};

export default information;
