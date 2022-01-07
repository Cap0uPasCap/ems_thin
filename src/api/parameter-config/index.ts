import { defHttp } from '/@/utils/http/axios';
import {
  CellAdvancedConfigResultModel,
  CellBasicConfigResultModel,
  CellGlobalConfigResultModel,
  CellTimeSlotConfigResultModel,
} from './model';

enum Api {
  getCellGlobalConfig = '/cell/getCellGlobalConfig',
  getCellBaseConfig = '/cell/getCellBaseConfig',
  getCellAdvancedConfig = '/cell/getCellAdvancedConfig',
  getCellTimeslotConfig = '/cell/getCellTimeslotConfig',
  setCellGlobalConfig = '/cell/setCellGlobalConfig',
  setCellBaseConfig = '/cell/setCellBaseConfig',
  setCellAdvancedConfig = '/cell/setCellAdvancedConfig',
  setCellTimeslotConfig = '/cell/setCellTimeslotConfig',
}

export const getCellGlobalConfig = () =>
  defHttp.get<CellGlobalConfigResultModel>({ url: Api.getCellGlobalConfig });

export const getCellBaseConfig = async () => {
  const data = await defHttp.get<CellBasicConfigResultModel>({ url: Api.getCellBaseConfig });
  return changeCellTypeToString(data?.data?.cellBaseConfigList);
};

export const getCellAdvancedConfig = async () => {
  const data = await defHttp.get<CellAdvancedConfigResultModel>({ url: Api.getCellAdvancedConfig });
  return changeCellTypeToString(data?.data?.cellAdvancedConfigList);
};

export const getCellTimeslotConfig = async () => {
  const data = await defHttp.get<CellTimeSlotConfigResultModel>({ url: Api.getCellTimeslotConfig });
  return data?.data;
};

export const setCellGlobalConfig = (params) =>
  defHttp.post({ url: Api.setCellGlobalConfig, params: params });

export const setCellBaseConfig = (params) =>
  defHttp.post({ url: Api.setCellBaseConfig, params: params });

export const setCellAdvancedConfig = (params) =>
  defHttp.post({ url: Api.setCellAdvancedConfig, params: params });

export const setCellTimeslotConfig = (params) =>
  defHttp.post({ url: Api.setCellTimeslotConfig, params: params });

function changeCellTypeToString(arr) {
  const list = [];
  if (!!arr && arr instanceof Array && arr?.length > 0) {
    arr.forEach((e) => {
      const obj: any = {};
      for (const i in e) {
        obj[i] = e[i] + '';
      }
      list.push(obj);
    });
  }
  return list;
}
