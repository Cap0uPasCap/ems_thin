import { defHttp } from '/@/utils/http/axios';

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

export const getCellGlobalConfig = () => defHttp.get({ url: Api.getCellGlobalConfig });

export const getCellBaseConfig = async () => {
  const data = await defHttp.get({ url: Api.getCellBaseConfig });
  return changeCellTypeToString(data?.data?.cellBaseConfigList);
};

export const getCellAdvancedConfig = async () => {
  const data = await defHttp.get({ url: Api.getCellAdvancedConfig });
  return changeCellTypeToString(data?.data?.cellAdvancedConfigList);
};

export const getCellTimeslot1Config = async () => {
  const data = await defHttp.get({ url: Api.getCellTimeslotConfig });
  return changeCellTypeToString(data?.data?.cellTimeslot1ConfigList);
};
export const getCellTimeslot2Config = async () => {
  const data = await defHttp.get({ url: Api.getCellTimeslotConfig });
  return changeCellTypeToString(data?.data?.cellTimeslot2ConfigList);
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
  if (!!arr) {
    arr.forEach((e) => {
      const obj = {};
      for (const i in e) {
        obj[i] = e[i] + '';
      }
      list.push(obj);
    });
  }
  return list;
}
