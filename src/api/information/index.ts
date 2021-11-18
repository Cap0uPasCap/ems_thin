import { defHttp } from '/@/utils/http/axios';

export const getInformation = () => defHttp.get({ url: '/information/list' });
