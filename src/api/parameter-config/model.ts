interface ColumnsModel {
  maxRank: string | number;
  nrofSRSPorts: string | number;
  puschMaxMimoLayers: string | number;
  ulMimo: string | number;
  dlMimo: string | number;
  numOfRxAntenna: string | number;
  numOfTxAntenna: string | number;
  cellIndex: string | number;
}

export interface ColumnsModelList {
  cellAdvancedConfigList: ColumnsModel[];
}
