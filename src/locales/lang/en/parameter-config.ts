export default {
  title: 'Parameter Config',
  loadingTip: 'requesting..',
  tab: {
    tabName: {
      general: 'General Config',
      cellBasicConfig: 'Cell Basic Config',
      cellAdvancedConfig: 'Cell Advanced Config',
      timeSlotConfig: 'Time Slot Config',
    },
  },
  page: {
    general: {
      title: 'General Config',
      titleList: ['Global Parameter Config', 'AMF Config', 'SNSSA Config'],
      btn: {
        refresh: 'Refresh',
        submit: 'Submit',
      },
      column: {
        cellNum: 'Cell Num',
        plmnId: 'Plmn ID',
        amfIp: 'AMF IP',
        snssaNum: 'SNSSA Num',
        sliceSd: 'Slice SD',
        sliceSst: 'Slice SST',
      },
    },
    basic: {
      title: ['Cell Basic Info', 'Link Adaptation', 'Function Control'],
      btn: {
        editText: 'Edit',
        saveText: 'Save',
        cancelText: 'Cancel',
        cancelTip: 'whether to cancel editing?',
        saveTip: 'saving...',
        saveSuccessTip: 'The data is saved',
        saveFailedTip: 'Data save failed',
      },
      column: {
        cellIndex: 'Cell Index',
        cellStatus: 'Cell Status',
        cellId: 'Cell ID',
        hoppingId: 'HoppingId',
        ssb: 'SSB',
        pointA: 'PointA',
        maxUe: 'Max Ue',
        rlcMode: 'RLC Mode',
        dlLaEnabled: 'DL LaEnabled',
        initDlMcs: 'Init DlMcs',
        ulLaEnabled: 'Ul LaEnabled',
        initUlMcs: 'Init UlMcs',
        p0NominalWithGrant: 'P0NominalWithGrant',
        preambleReceivedTargetPower: 'PreambleReceivedTargetPower',
        puschTargetPower: 'PuschTargetPower',
        puschEnable: 'Pusch Enable',
        selectOption: {
          open: 'Open',
          close: 'Close',
          available: 'Available',
          notAvailable: 'NotAvailable',
        },
      },
    },
    advanced: {
      title: 'Physical Resource Config',
      btn: {
        editText: 'Edit',
        saveText: 'Save',
        cancelText: 'Cancel',
        cancelTip: 'whether to cancel editing?',
        saveTip: 'saving...',
        saveSuccessTip: 'The data is saved',
        saveFailedTip: 'Data save failed',
      },
      column: {
        cellIndex: 'Cell Index',
        numOfTxAntenna: 'Num Of TxAntenna',
        numOfRxAntenna: 'Num Of RxAntenna',
        dlMimo: 'Dl Mimo',
        ulMimo: 'Ul Mimo',
      },
    },
    timeSlot: {
      btn: {
        editText: 'Edit',
        saveText: 'Save',
        cancelText: 'Cancel',
        cancelTip: 'whether to cancel editing?',
        saveTip: 'saving...',
        saveSuccessTip: 'The data is saved',
        saveFailedTip: 'Data save failed',
        saveValidFailedTip: 'Please fill in the correct data',
      },
      title: 'Pattern1',
      column: {
        cellIndex: 'Cell Index',
        tddUlDlPattern2Configured: 'TddUlDl Pattern2 Configured',
        dlUlTransmissionPeriodicity: 'DlUl Transmission Periodicity',
        numDlSlots: 'Num DlSlots',
        numDlSymbols: 'Num DlSymbols',
        numUlSlots: 'NumUl Slots',
        numUlSymbols: 'NumUl Symbols',
        selectOption: {
          single: 'Single',
          double: 'Double',
        },
      },
    },
  },
};
