import { BasicColumn } from '/@/components/Table';

export function getColumns() {
  const columns: BasicColumn[] = [
    {
      title: '小区索引',
      dataIndex: 'cellIndex',
      editRow: false,
    },
    {
      title: '周期类型',
      dataIndex: 'tddUlDlPattern2Configured',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: '单周期',
            value: 0,
          },
          {
            label: '双周期',
            value: 1,
          },
        ],
      },
    },
    {
      title: '传输周期',
      dataIndex: 'dlUlTransmissionPeriodicity',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: '2.5ms',
            value: 5,
          },
          {
            label: '5ms',
            value: 6,
          },
        ],
      },
    },
    {
      title: '下行时隙数',
      dataIndex: 'numDlSlots',
      editComponent: 'InputNumber',
      editRow: true,
    },
    {
      title: '特殊子帧下行符号数',
      dataIndex: 'numDlSymbols',
      editComponent: 'InputNumber',
      editRow: true,
    },
    {
      title: '上行时隙数',
      dataIndex: 'numUlSlots',
      editComponent: 'InputNumber',
      editRow: true,
    },
    {
      title: '特殊子帧上行符号数',
      dataIndex: 'numUlSymbols',
      editComponent: 'InputNumber',
      editRow: true,
    },
  ];
  return columns;
}
