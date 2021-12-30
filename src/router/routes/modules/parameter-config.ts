import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const information: AppRouteModule = {
  path: '/parameter-config',
  name: 'ParameterConfig',
  component: LAYOUT,
  redirect: '/parameter-config/index',
  meta: {
    orderNo: 7,
    hideChildrenInMenu: true,
    icon: 'carbon:parameter',
    title: t('routes.parameter-config.parameterConfig'),
  },
  children: [
    {
      path: 'index',
      name: 'ParameterConfigPage',
      component: () => import('/@/views/parameter-config/index.vue'),
      meta: {
        title: t('routes.parameter-config.parameterConfig'),
      },
    },
  ],
};

export default information;
