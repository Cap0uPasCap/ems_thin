export interface page {
  pageNo: number;
  pageSize: number;
}

export interface ResultModel {
  data: any;
}
export interface QuerySchema {
  page: page;
  loginName: string;
}
