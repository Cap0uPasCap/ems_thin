import { defHttp } from '/@/utils/http/axios';

export const getInformation = () => defHttp.get({ url: '/information/list' });
export const setInformation = (params) =>
  defHttp.post({ url: '/action/setParameterValues', params: params });
