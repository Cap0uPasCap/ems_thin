import { BasicColumn } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
function t1(context) {
  const prefix = 'parameter-config.page.basic.column.';
  return t(prefix + context);
}
export function getColumns(type) {
  const columns: BasicColumn[] = [
    {
      title: t1('cellIndex'),
      dataIndex: 'cellIndex',
      width: 50,
    },
    {
      title: t1('cellIndex'),
      dataIndex: 'cellStatus',
      format: (v) => {
        return v == '0' ? t1('selectOption.notAvailable') : t1('selectOption.available');
      },
      ifShow: () => {
        return type === 'Basic';
      },
      width: 80,
    },
    {
      title: t1('cellIndex'),
      dataIndex: 'cellId',
      ifShow: () => {
        return type === 'Basic';
      },
      width: 80,
    },
    {
      title: t1('hoppingId'),
      dataIndex: 'hoppingId',
      editRow: true,
      ifShow: () => {
        return type === 'Basic';
      },
      width: 80,
    },
    {
      title: t1('ssb'),
      dataIndex: 'ssb',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'Basic';
      },
    },
    {
      title: t1('pointA'),
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
      title: t1('maxUe'),
      dataIndex: 'maxUe',
      editComponent: 'InputNumber',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'Basic';
      },
    },
    {
      title: t1('rlcMode'),
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
      title: t1('dlLaEnabled'),
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
            label: t1('selectOption.open'),
            value: 1,
          },
          {
            label: t1('selectOption.close'),
            value: 0,
          },
        ],
      },
    },
    {
      title: t1('initDlMcs'),
      dataIndex: 'initDlMcs',
      editComponent: 'InputNumber',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'LinkAdaptation';
      },
    },
    {
      title: t1('ulLaEnabled'),
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
            label: t1('selectOption.open'),
            value: 1,
          },
          {
            label: t1('selectOption.close'),
            value: 0,
          },
        ],
      },
    },
    {
      title: t1('initUlMcs'),
      width: 80,
      ifShow: () => {
        return type === 'LinkAdaptation';
      },
      dataIndex: 'initUlMcs',
      editComponent: 'InputNumber',
      editRow: true,
    },
    {
      title: t1('p0NominalWithGrant'),
      dataIndex: 'p0NominalWithGrant',
      editComponent: 'InputNumber',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'FunctionControl';
      },
    },
    {
      title: t1('preambleReceivedTargetPower'),
      dataIndex: 'preambleReceivedTargetPower',
      editComponent: 'InputNumber',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'FunctionControl';
      },
    },
    {
      title: t1('puschEnable'),
      dataIndex: 'puschEnable',
      editRow: true,
      width: 80,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: t1('selectOption.open'),
            value: 1,
          },
          {
            label: t1('selectOption.close'),
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
