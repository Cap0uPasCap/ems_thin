import { ResultModel, QuerySchema } from './model/user';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  getList = '/user/findUserList',
  add = '/user/addUser',
  del = '/user/deleteUser',
  getDetails = '/user/getUser',
  updateUser = '/user/updateUser',
  resetUserPassword = '/user/resetUserPassword',
  updateUserPassword = '/user/updateUserPassword',
}

export const getList = (params: any) => {
  const query: QuerySchema = {
    page: {
      pageNo: params.page,
      pageSize: params.pageSize,
    },
    loginName: params.loginName,
  };

  return defHttp.post<ResultModel>({
    url: Api.getList,
    params: query,
  });
};

export const add = (data: any) => defHttp.post<ResultModel>({ url: Api.add, params: data });

export const update = (data: any) =>
  defHttp.post<ResultModel>({ url: Api.updateUser, params: data });

export const del = (id: string | number) =>
  defHttp.post<ResultModel>({ url: Api.del, params: { id } });

export const getDetails = (id: string | number) =>
  defHttp.get<ResultModel>({ url: Api.getDetails, params: { id } });

export const resetUserPassword = (id: string | number) =>
  defHttp.post<ResultModel>({ url: Api.resetUserPassword, params: { id } });
