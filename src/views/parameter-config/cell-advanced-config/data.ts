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
      title: t1('dlMimo'),
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
      title: t1('ulMimo'),
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
