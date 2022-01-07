import { BasicColumn } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
function t1(context) {
  const prefix = 'parameter-config.page.advanced.column.';
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
      title: t1('numOfTxAntenna'),
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
      title: t1('numOfRxAntenna'),
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
      title: t1('dlMimo'),
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
      title: t1('ulMimo'),
      dataIndex: 'ulMimo',
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

function t2(context) {
  const prefix = 'parameter-config.page.timeSlot.column.';
  return t(prefix + context);
}
export function getTimeSlotColumns() {
  const columns: BasicColumn[] = [
    {
      title: t2('cellIndex'),
      dataIndex: 'cellIndex',
      editRow: false,
    },
    {
      title: t2('tddUlDlPattern2Configured'),
      dataIndex: 'tddUlDlPattern2Configured',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: t2('selectOption.single'),
            value: '0',
          },
          {
            label: t2('selectOption.double'),
            value: '1',
          },
        ],
      },
    },
    {
      title: t2('dlUlTransmissionPeriodicity'),
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
      title: t2('numDlSlots'),
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
      title: t2('numDlSymbols'),
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
      title: t2('numUlSlots'),
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
      title: t2('numUlSymbols'),
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
