import { BasicColumn } from '/@/components/Table';

export function getColumns() {
  const columns: BasicColumn[] = [
    {
      title: '小区索引',
      dataIndex: 'cellIndex',
      editRow: true,
      editRule: true,
      editComponent: 'InputNumber',
      width: 150,
    },
    {
      title: '小区状态',
      dataIndex: 'initDlMcs',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: 'Option1',
            value: '1',
          },
          {
            label: 'Option2',
            value: '2',
          },
          {
            label: 'Option3',
            value: '3',
          },
        ],
      },
      width: 200,
    },
    {
      title: 'CELL ID',
      dataIndex: 'cellId',
      editRow: true,
      editComponent: 'ApiSelect',
      // editComponentProps: {
      //   api: optionsListApi,
      //   resultField: 'list',
      //   labelField: 'name',
      //   valueField: 'id',
      // },
      width: 200,
    },
    {
      title: '物理标识',
      dataIndex: 'hoppingId',
      editRow: true,
      editComponent: 'ApiTreeSelect',
      editRule: false,
      // editComponentProps: {
      //   api: treeOptionsListApi,
      //   resultField: 'list',
      // },
      width: 200,
    },
    {
      title: 'SSB',
      dataIndex: 'ssb',
      editRow: true,
      editComponent: 'InputNumber',
      width: 150,
    },
    {
      title: 'pointA',
      dataIndex: 'time',
      editRow: true,
      editComponent: 'InputNumber',
      width: 100,
    },
    {
      title: '工作带宽',
      dataIndex: 'name5',
      editRow: true,
      editComponent: 'Checkbox',
      editValueMap: (value) => {
        return value ? '是' : '否';
      },
      width: 100,
    },
    {
      title: '小区支持最大用户数',
      dataIndex: 'maxUe',
      editRow: true,
      editComponent: 'Switch',
      editValueMap: (value) => {
        return value ? '开' : '关';
      },
      width: 100,
    },
    {
      title: 'RLC传输方式',
      dataIndex: 'rlcMode',
      editRow: true,
      editComponent: 'Switch',
      editValueMap: (value) => {
        return value ? '开' : '关';
      },
      width: 100,
    },
  ];
  return columns;
}

export function getLinkAdaptationColumns() {
  const columns: BasicColumn[] = [
    {
      title: '小区索引',
      dataIndex: 'cellId',
      editRow: true,
      editComponent: 'InputNumber',
      width: 150,
    },
    {
      title: '下行LA开关',
      dataIndex: 'ulLaEnabled',
      editRow: true,
      editRule: true,
      editComponent: 'Input',
      width: 150,
    },
    {
      title: '下行初始MCS',
      dataIndex: 'initDlMcs',
      editRow: true,
      width: 200,
    },
    {
      title: '上行LA开关',
      dataIndex: 'ulLaEnabled',
      editRow: true,
      width: 200,
    },
    {
      title: '上行初始MCS',
      dataIndex: 'initDlMcs',
      editRow: true,
      width: 200,
    },
  ];
  return columns;
}

export function getFunctionControlColumns() {
  const columns: BasicColumn[] = [
    {
      title: '小区索引',
      dataIndex: 'cellIndex',
      editRow: true,
      editComponent: 'InputNumber',
      width: 150,
    },
    {
      title: 'PUCCH期望接收功率RSRP',
      dataIndex: 'p0NominalWithGrant',
      editRow: true,
      width: 200,
    },
    {
      title: 'PRACH期望接收功率RSRP',
      dataIndex: 'preambleReceivedTargetPower',
      editRow: true,
      editComponent: 'ApiSelect',
      width: 200,
    },
    {
      title: '开关',
      dataIndex: 'puschEnable',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: '开启',
            value: '1',
          },
          {
            label: '关闭',
            value: '0',
          },
        ],
      },
      width: 200,
    },
  ];
  return columns;
}
