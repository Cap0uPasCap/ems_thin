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
      dataIndex: 'numOfTxAntenna',
      editRow: true,
    },
    {
      title: '传输周期',
      dataIndex: 'numOfTxAntenna',
      editRow: true,
    },
    {
      title: '下行时隙数',
      dataIndex: 'numOfTxAntenna',
      editRow: true,
    },
    {
      title: '特殊子帧下行符号数',
      dataIndex: 'numOfTxAntenna',
      editRow: true,
    },
    {
      title: '上行时隙数',
      dataIndex: 'numOfTxAntenna',
      editRow: true,
    },
    {
      title: '特殊子帧上行符号数',
      dataIndex: 'numOfTxAntenna',
      editRow: true,
    },
  ];
  return columns;
}
