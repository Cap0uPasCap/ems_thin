import { BasicColumn } from '/@/components/Table';

export function getColumns() {
  const columns: BasicColumn[] = [
    {
      title: '小区索引',
      dataIndex: 'cellIndex',
      editRow: false,
    },
    {
      title: '下行天线数',
      dataIndex: 'numOfTxAntenna',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: 1,
            value: 1,
          },
          {
            label: 2,
            value: 2,
          },
          {
            label: '4',
            value: '4',
          },
        ],
      },
    },
    {
      title: '上行天线数',
      dataIndex: 'numOfRxAntenna',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: 1,
            value: 1,
          },
          {
            label: 2,
            value: 2,
          },
          {
            label: '4',
            value: '4',
          },
        ],
      },
    },
    {
      title: '下行mimo',
      dataIndex: 'dlMimo',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: 1,
            value: 1,
          },
          {
            label: 2,
            value: 2,
          },
          {
            label: '4',
            value: '4',
          },
        ],
      },
    },
    {
      title: '上行mimo',
      dataIndex: 'ulMimo',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: 1,
            value: 1,
          },
          {
            label: 2,
            value: 2,
          },
        ],
      },
    },
    // {
    //   dataIndex: 'maxRank',
    //   ifShow: false,
    // },
    // {
    //   dataIndex: 'nrofSRSPorts',
    //   ifShow: false,
    // },
    // {
    //   dataIndex: 'puschMaxMimoLayers',
    //   ifShow: false,
    // },
  ];
  return columns;
}
