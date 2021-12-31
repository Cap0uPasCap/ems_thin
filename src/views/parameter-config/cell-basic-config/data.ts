import { BasicColumn } from '/@/components/Table';

export function getColumns(type) {
  const columns: BasicColumn[] = [
    {
      title: '小区索引',
      dataIndex: 'cellIndex',
      width: 50,
    },
    {
      title: '小区状态',
      dataIndex: 'cellStatus',
      format: (v) => {
        return v == '0' ? '不可用' : '可用';
      },
      ifShow: () => {
        return type === 'Basic';
      },
      width: 80,
    },
    {
      title: 'CELL ID',
      dataIndex: 'cellId',
      ifShow: () => {
        return type === 'Basic';
      },
      width: 80,
    },
    {
      title: '物理标识',
      dataIndex: 'hoppingId',
      editRow: true,
      ifShow: () => {
        return type === 'Basic';
      },
      width: 80,
    },
    {
      title: 'SSB',
      dataIndex: 'ssb',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'Basic';
      },
    },
    {
      title: 'PointA',
      dataIndex: 'pointA',
      ifShow: () => {
        return type === 'Basic';
      },
      slots: { customRender: 'pointA' },
      width: 150,
      // editRow: true,
    },
    // {
    //   title: '工作带宽',
    //   dataIndex: 'WorkingBandwidth',
    //   editRow: true,
    //   ifShow: () => {
    //   return type === 'Basic';
    // },
    // },
    {
      title: '小区支持最大用户数',
      dataIndex: 'maxUe',
      editComponent: 'InputNumber',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'Basic';
      },
    },
    {
      title: 'RLC传输方式',
      dataIndex: 'rlcMode',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'Basic';
      },
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: 'AM',
            value: 1,
          },
          {
            label: 'UM',
            value: 2,
          },
        ],
      },
    },
    {
      title: '下行LA开关',
      dataIndex: 'dlLaEnabled',
      editRow: true,
      width: 80,
      editComponent: 'Select',
      ifShow: () => {
        return type === 'LinkAdaptation';
      },
      editComponentProps: {
        options: [
          {
            label: '开启',
            value: 1,
          },
          {
            label: '关闭',
            value: 0,
          },
        ],
      },
    },
    {
      title: '下行初始MCS',
      dataIndex: 'initDlMcs',
      editComponent: 'InputNumber',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'LinkAdaptation';
      },
    },
    {
      title: '上行LA开关',
      dataIndex: 'ulLaEnabled',
      width: 80,
      ifShow: () => {
        return type === 'LinkAdaptation';
      },
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: '开启',
            value: 1,
          },
          {
            label: '关闭',
            value: 0,
          },
        ],
      },
    },
    {
      title: '上行初始MCS',
      width: 80,
      ifShow: () => {
        return type === 'LinkAdaptation';
      },
      dataIndex: 'initUlMcs',
      editComponent: 'InputNumber',
      editRow: true,
    },
    {
      title: 'PUCCH期望接收功率RSRP',
      dataIndex: 'p0NominalWithGrant',
      editComponent: 'InputNumber',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'FunctionControl';
      },
    },
    {
      title: 'PRACH期望接收功率RSRP',
      dataIndex: 'preambleReceivedTargetPower',
      editComponent: 'InputNumber',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'FunctionControl';
      },
    },
    {
      title: '开关',
      dataIndex: 'puschEnable',
      editRow: true,
      width: 80,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: '开启',
            value: 1,
          },
          {
            label: '关闭',
            value: 0,
          },
        ],
      },
      ifShow: () => {
        return type === 'FunctionControl';
      },
    },
  ];
  return columns;
}
