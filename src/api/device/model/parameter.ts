export interface ResultModel {
  data: any;
}

export interface ParameterListModel {
  parameterValue: string | number;
  parameterCurrentValue: any;
  writable: number;
  lastNodeName: string;
  type: number;
}

export interface ParameterValuesModel {
  parameterNames: string[];
}

export interface SetParameterValuesModel {
  parameterList: ParameterValuesResult[];
}

export interface ParameterValuesResult {
  name: string;
  value: any;
}

export interface ParameterResult {
  data: ParameterValuesResult[];
  message: string;
}

export interface RequestModel {
  searchName: string;
  tr069?: boolean;
}
