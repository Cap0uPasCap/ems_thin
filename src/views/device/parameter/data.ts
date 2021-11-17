import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { h } from 'vue';
import { Input } from 'ant-design-vue'; //Tag
const { t } = useI18n();

export function getColumns() {
  //tr069: boolean
  // 根据 tr069 判断显示 true 取 omc前缀 属性字段
  const columns: BasicColumn[] = [
    {
      title: t('device.parameter.column.lastNodeName'),
      dataIndex: 'lastNodeName',
      width: 200,
      // ifShow: (_column) => {
      //   return !tr069;
      // },
    },
    {
      dataIndex: 'fullName',
      width: 200,
      ifShow: (_column) => {
        return false;
      },
    },
    // {
    //   title: t('device.parameter.column.lastNodeName'),
    //   dataIndex: 'omcLastNodeName',
    //   width: 200,
    //   ifShow: (_column) => {
    //     return tr069;
    //   },
    // },
    {
      title: t('device.parameter.column.type'),
      dataIndex: 'type',
      width: 50,
    },
    {
      title: t('device.parameter.column.parameterValue'),
      dataIndex: 'parameterValue',
      width: 120,
    },
    {
      title: t('device.parameter.column.action'),
      dataIndex: 'parameterCurrentValue',
      width: 250,
      customRender: ({ record }) => {
        return h(
          Input,
          {
            disabled: record.writable === 0,
            value: record.parameterCurrentValue,
            onChange: (e) => {
              record.parameterCurrentValue = e.target.value;
            },
          },
          () => {},
        );
      },
    },
  ];
  return columns;
}

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '参数',
    component: 'Input',
    colProps: { span: 8 },
  },
];
