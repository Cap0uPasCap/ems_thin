import { ColumnsModelList } from './model';
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

export const getCellBaseConfig = () => defHttp.get({ url: Api.getCellBaseConfig });

export const getCellAdvancedConfig = async () => {
  const data = await defHttp.get({ url: Api.getCellAdvancedConfig });
  return data?.data?.cellAdvancedConfigList || [];
};

export const getCellTimeslotConfig = async () => {
  const data = await defHttp.get({ url: Api.getCellTimeslotConfig });
  return data?.data?.cellTimeslot1ConfigList || [];
};

export const setCellGlobalConfig = (params) =>
  defHttp.post({ url: Api.setCellGlobalConfig, params: params });

export const setCellBaseConfig = (params: ColumnsModelList) =>
  defHttp.post({ url: Api.setCellBaseConfig, params: params });

export const setCellAdvancedConfig = (params) =>
  defHttp.post({ url: Api.setCellAdvancedConfig, params: params });

export const setCellTimeslotConfig = (params) =>
  defHttp.post({ url: Api.setCellTimeslotConfig, params: params });
