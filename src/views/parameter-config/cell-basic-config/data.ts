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
      title: t1('cellStatus'),
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
      title: t1('cellId'),
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
      editRule: async (text) => {
        const numValue = Number(text);
        if (numValue < 0 || numValue > 1023) {
          return 'HoppingId: minInclusive: 0, maxInclusive: 1023';
        }
        return '';
      },
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
    },
    {
      title: 'nrFreqBand',
      dataIndex: 'nrFreqBandUL',
      ifShow: () => {
        return type === 'Basic';
      },
      slots: { customRender: 'nrFreqBand' },
      width: 150,
    },
    {
      title: t1('maxUe'),
      dataIndex: 'maxUe',
      editComponent: 'Input',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'Basic';
      },
      editRule: async (text) => {
        const numValue = Number(text);
        if (numValue < 1 || numValue > 1600) {
          return 'MaxUe: minInclusive: 1, maxInclusive: 1600';
        }
        return '';
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
            value: '1',
          },
          {
            label: 'UM',
            value: '2',
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
            value: '1',
          },
          {
            label: t1('selectOption.close'),
            value: '0',
          },
        ],
      },
    },
    {
      title: t1('initDlMcs'),
      dataIndex: 'initDlMcs',
      editComponent: 'Input',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'LinkAdaptation';
      },
      editRule: async (text) => {
        const numValue = Number(text);
        if (numValue < 0 || numValue > 28) {
          return 'InitDlMcs: minInclusive: 0, maxInclusive: 28';
        }
        return '';
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
            value: '1',
          },
          {
            label: t1('selectOption.close'),
            value: '0',
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
      editComponent: 'Input',
      editRow: true,
      editRule: async (text) => {
        const numValue = Number(text);
        if (numValue < 0 || numValue > 28) {
          return 'InitUlMcs: minInclusive: 0, maxInclusive: 28';
        }
        return '';
      },
    },
    {
      title: t1('preambleReceivedTargetPower'),
      dataIndex: 'preambleReceivedTargetPower',
      editComponent: 'Input',
      editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'FunctionControl';
      },
      editRule: async (text) => {
        const numValue = Number(text);
        if (numValue < -200 || numValue > -60) {
          return 'preambleReceivedTargetPower: minInclusive: -200, maxInclusive: -60';
        }
        return '';
      },
    },
    {
      title: t1('p0NominalWithGrant'),
      dataIndex: 'p0NominalWithGrant',
      slots: { customRender: 'p0NominalWithGrant' },
      editComponent: 'Input',
      width: 80,
      editRule: async (text) => {
        const numValue = Number(text);
        if (numValue < -202 || numValue > 24) {
          return 'P0NominalWithGrant: minInclusive: -202, maxInclusive: 24';
        }
        return '';
      },
      ifShow: () => {
        return type === 'FunctionControl';
      },
    },
    {
      title: t1('puschTargetPower'),
      dataIndex: 'puschTargetPower',
      slots: { customRender: 'puschTargetPower' },
      editComponent: 'Input',
      // editRow: true,
      width: 80,
      ifShow: () => {
        return type === 'FunctionControl';
      },
    },

    {
      title: t1('puschEnable'),
      dataIndex: 'puschEnable',
      // editRow: true,
      width: 80,
      editComponent: 'Select',
      slots: { customRender: 'puschEnable' },
      editComponentProps: {
        options: [
          {
            label: t1('selectOption.open'),
            value: '1',
          },
          {
            label: t1('selectOption.close'),
            value: '0',
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
