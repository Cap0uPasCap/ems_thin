import { defHttp } from '/@/utils/http/axios';
import { QuerySchema, ResultModel } from './model/user';

enum Api {
  getList = '/user/findUserList',
  add = '/user/addUser',
  del = '/user/deleteUser',
  getDetails = '/user/getUser',
  updateUser = '/user/updateUser',
  resetUserPassword = '/user/resetUserPassword',
  updateUserPassword = '/user/updateUserPassword',
}

export const getList = async (params: any) => {
  const { pageNo, pageSize, loginName } = params;
  const query: QuerySchema = {
    page: {
      pageNo,
      pageSize,
    },
    loginName,
  };

  const data = await defHttp.post<ResultModel>({
    url: Api.getList,
    params: query,
  });

  return data.data;
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

export const updateUserPassword = (password: string | number, id: string | number) => {
  return defHttp.post({ url: Api.updateUserPassword, params: { password, id } });
};
