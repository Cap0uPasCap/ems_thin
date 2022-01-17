import { BasicColumn } from '/@/components/Table';

export function getColumns() {
  const columns: BasicColumn[] = [
    {
      title: 'Name',
      dataIndex: 'cellIndex',
      editRow: false,
    },
    {
      title: 'Host',
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
      title: 'Gateway',
      dataIndex: 'numOfRxAntenna',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: '1',
            value: '1',
          },
          {
            label: '2',
            value: '2',
          },
          {
            label: '4',
            value: '4',
          },
        ],
      },
    },
    {
      title: 'Subnet Mask',
      dataIndex: 'dlMimo',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: '1',
            value: '1',
          },
          {
            label: '2',
            value: '2',
          },
          {
            label: '4',
            value: '4',
          },
        ],
      },
    },
  ];
  return columns;
}
export function getIPHostColumns() {
  const columns: BasicColumn[] = [
    {
      title: 'Function',
      dataIndex: 'cellIndex',
      editRow: false,
    },
    {
      title: 'Network Card',
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
      title: 'Host',
      dataIndex: 'numOfRxAntenna',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: '1',
            value: '1',
          },
          {
            label: '2',
            value: '2',
          },
          {
            label: '4',
            value: '4',
          },
        ],
      },
    },
    {
      title: 'Gateway',
      dataIndex: 'dlMimo',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: '1',
            value: '1',
          },
          {
            label: '2',
            value: '2',
          },
          {
            label: '4',
            value: '4',
          },
        ],
      },
    },
    {
      title: 'Subnet Mask',
      dataIndex: 'dlMimo',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: '1',
            value: '1',
          },
          {
            label: '2',
            value: '2',
          },
          {
            label: '4',
            value: '4',
          },
        ],
      },
    },
  ];
  return columns;
}

export interface AdvancedConfigModel {
  ulMimo: number | string | any;
  dlMimo: number | string | any;
  numOfRxAntenna: number | string | any;
  numOfTxAntenna: number | string | any;
  cellIndex: number | string;
}
