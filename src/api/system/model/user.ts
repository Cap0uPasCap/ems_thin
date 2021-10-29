export interface page {
  pageNo: number;
  pageSize: number;
}

export interface ListParams {
  page: page;
}

export interface ResultModel {
  data: any;
}
