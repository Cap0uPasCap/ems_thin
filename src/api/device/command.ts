import { defHttp } from '/@/utils/http/axios';

enum Api {
  factoryReset = '/command/factoryReset',
  reboot = '/command/reboot',
}

export const factoryReset = () => defHttp.post({ url: Api.factoryReset });

export const reboot = () => defHttp.post({ url: Api.reboot });
