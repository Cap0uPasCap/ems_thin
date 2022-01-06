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
            label: t1('selectOption.single'),
            value: '0',
          },
          {
            label: t1('selectOption.double'),
            value: '1',
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
            value: '5',
          },
          {
            label: '5ms',
            value: '6',
          },
        ],
      },
    },
    {
      title: t1('numDlSlots'),
      dataIndex: 'numDlSlots',
      editComponent: 'Input',
      editRow: true,
      editRule: async (text) => {
        const numValue = Number(text);
        if (numValue < 0 || numValue > 320) {
          return 'NumDlSlots: minInclusive:0, maxInclusive: 320';
        }
        return '';
      },
    },
    {
      title: t1('numDlSymbols'),
      dataIndex: 'numDlSymbols',
      editComponent: 'Input',
      editRow: true,
      editRule: async (text) => {
        const numValue = Number(text);
        if (numValue < 0 || numValue > 13) {
          return 'NumDlSymbols: minInclusive:0, maxInclusive: 13';
        }
        return '';
      },
    },
    {
      title: t1('numUlSlots'),
      dataIndex: 'numUlSlots',
      editComponent: 'Input',
      editRow: true,
      editRule: async (text) => {
        const numValue = Number(text);
        if (numValue < 0 || numValue > 320) {
          return 'NumUlSlots: minInclusive:0, maxInclusive: 320';
        }
        return '';
      },
    },
    {
      title: t1('numUlSymbols'),
      dataIndex: 'numUlSymbols',
      editComponent: 'Input',
      editRow: true,
      editRule: async (text) => {
        const numValue = Number(text);
        if (numValue < 0 || numValue > 13) {
          return 'NumUlSymbols: minInclusive:0, maxInclusive: 13';
        }
        return '';
      },
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
