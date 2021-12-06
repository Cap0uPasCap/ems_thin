import { defHttp } from '/@/utils/http/axios';
import {
  ParameterListModel,
  ParameterValuesModel,
  ParameterResult,
  SetParameterValuesModel,
  RequestModel,
  ResultModel,
} from './model/parameter';

enum Api {
  add = '/user/addUser',
  del = '/user/deleteUser',
  parameterList = '/parameter/findParameterList',
  parametersTree = '/parameter/findParametersTree',
  getParameterValues = '/action/getParameterValues',
  setParameterValues = '/action/setParameterValues',
}

/**
 * @desc 因为后台返回数据不能满足前端需要 对参数树数据进行加工 对树结构所有children 中的数据 添加 identity（唯一标识） title（树节点显示） 字段
 * @return {String} identity title
 * @param arr
 */
function changeData(arr: any[]) {
  return arr.map((e) => {
    return {
      ...e,
      children: e?.children ? changeData(e.children) : [],
      identity: `[${e?.nextIndex}]: ${e?.parameterName}`,
      title: e?.nodeArr ? `[${e?.nextIndex}]: ${e?.nodeName}` : e?.nodeName,
    };
  });
}

export const findParametersTree = async function (params: any) {
  const data = await defHttp.post({
    url: Api.parametersTree,
    params: params,
  });
  const info = changeData([data.data]);
  return info[0];
};

export const findParameterList = async function (params: RequestModel) {
  if (params?.tr069 ?? true) return;
  const data = await defHttp.post<ParameterListModel[]>({
    url: Api.parameterList,
    params: {
      searchName: params.searchName,
      tr069: params.tr069,
    },
  });
  return data['data'].map((e) => ({
    ...e,
    parameterValue: null,
    parameterCurrentValue: null,
  }));
};

export const add = (data: any) => defHttp.post<ResultModel>({ url: Api.add, params: data });

export const getParameterValues = (data: ParameterValuesModel) =>
  defHttp.post<ParameterResult>({
    url: Api.getParameterValues,
    params: data,
  });

export const setParameterValues = (data: SetParameterValuesModel) =>
  defHttp.post<ParameterResult>({
    url: Api.setParameterValues,
    params: data,
  });

export const del = (id: string | number) =>
  defHttp.post<ResultModel>({ url: Api.del, params: { id } });
