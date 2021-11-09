export interface page {
  pageNo: number;
  pageSize: number;
}

export interface ResultModel {
  data: any;
}

export interface RequestModel {
  searchName: string;
  tr069: boolean;
}
