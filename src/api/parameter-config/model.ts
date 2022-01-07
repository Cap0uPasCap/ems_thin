export interface CellGlobalConfig {
  amfIp: string;
  cellNum: number;
  plmnId: number;
  sliceSd: string;
  sliceSst: string;
  snssaNum: number;
}

export interface CellGlobalConfigResultModel {
  data: CellGlobalConfig;
}

export interface CellTimeSlotConfigResultModel {
  data: {
    cellTimeslot1ConfigList: cellTimeslotConfigList[];
    cellTimeslot2ConfigList: cellTimeslotConfigList[];
  };
}

export interface cellTimeslotConfigList {
  data: {
    cellIndex: string;
    dlUlTransmissionPeriodicity: string;
    numDlSlots: string;
    numDlSymbols: string;
    numUlSlots: string;
    numUlSymbols: string;
    tddUlDlPattern2Configured: string;
  };
}

export interface CellAdvancedConfigResultModel {
  data: {
    cellAdvancedConfigList: cellAdvancedConfigList[];
  };
}

export interface cellAdvancedConfigList {
  data: {
    //小区索引
    cellIndex: string;
    //上行mimo
    dlMimo: string;
    maxRank: string;
    nrofSRSPorts: string;
    //下行天线数
    numOfRxAntenna: string;
    //上行天线数
    numOfTxAntenna: string;
    puschMaxMimoLayers: string;
    //下行mimo
    ulMimo: string;
  };
}

export interface CellBasicConfigResultModel {
  data: {
    cellBaseConfigList: cellBaseConfigList[];
  };
}

export interface cellBaseConfigList {
  data: {
    cellId: string;
    cellIndex: string;
    cellStatus: string;
    dlLaEnabled: string;
    hoppingId: string;
    initDlMcs: string;
    initUlMcs: string;
    maxUe: string;
    nrArfcnDL: string;
    nrArfcnUL: string;
    nrFreqBandDL: string;
    nrFreqBandUL: string;
    p0NominalWithGrant: string;
    preambleReceivedTargetPower: string;
    puschEnable: string;
    puschTargetPower: string;
    rlcMode: string;
    ssb: string;
    ulLaEnabled: string;
  };
}
