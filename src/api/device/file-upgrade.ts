import { defHttp } from '/@/utils/http/axios';
import { ResultModel } from './model/parameter';

enum Api {
  download = '/file/download/deviceConf',
}

export const download = (fileName: string) =>
  defHttp.get<ResultModel>({ url: Api.download, params: { fileName }, responseType: 'blob' });
