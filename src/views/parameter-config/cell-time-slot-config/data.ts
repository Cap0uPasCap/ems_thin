import { BasicColumn } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
function t1(context) {
  const prefix = 'parameter-config.page.timeSlot.column.';
  return t(prefix + context);
}
export function getColumns() {
  const columns: BasicColumn[] = [
    {
      title: t1('cellIndex'),
      dataIndex: 'cellIndex',
      editRow: false,
    },
    {
      title: t1('tddUlDlPattern2Configured'),
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
      title: t1('dlUlTransmissionPeriodicity'),
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
      title: t1('numDlSlots'),
      dataIndex: 'numDlSlots',
      editComponent: 'InputNumber',
      editRow: true,
    },
    {
      title: t1('numDlSymbols'),
      dataIndex: 'numDlSymbols',
      editComponent: 'InputNumber',
      editRow: true,
    },
    {
      title: t1('numUlSlots'),
      dataIndex: 'numUlSlots',
      editComponent: 'InputNumber',
      editRow: true,
    },
    {
      title: t1('numUlSymbols'),
      dataIndex: 'numUlSymbols',
      editComponent: 'InputNumber',
      editRow: true,
    },
  ];
  return columns;
}

export interface TimeSlotConfigModel {
  tddUlDlPattern2Configured: string | number | any;
  dlUlTransmissionPeriodicity: string | number | any;
  numDlSlots: string | number | any;
  numDlSymbols: string | number | any;
  numUlSlots: string | number | any;
  numUlSymbols: string | number | any;
  cellIndex: string | number | any;
}
