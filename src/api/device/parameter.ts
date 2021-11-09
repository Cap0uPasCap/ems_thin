import { ResultModel, RequestModel } from './model/parameter';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  add = '/user/addUser',
  del = '/user/deleteUser',
  parameterList = '/parameter/findParameterList',
  parametersTree = '/parameter/findParametersTree',
}

export const findParametersTree = (params: any) => {
  return defHttp.post<ResultModel>({
    url: Api.parametersTree,
    params: params,
  });
};
export const findParameterList = (params: RequestModel) => {
  return defHttp.post<ResultModel>({
    url: Api.parameterList,
    params: {
      searchName: params.searchName,
      tr069: params.tr069,
    },
  });
};

export const add = (data: any) => defHttp.post<ResultModel>({ url: Api.add, params: data });

export const del = (id: string | number) =>
  defHttp.post<ResultModel>({ url: Api.del, params: { id } });
