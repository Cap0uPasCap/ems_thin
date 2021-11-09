import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
const { t } = useI18n();

export function getColumns(tr069) {
  // 根据 tr069 判断显示 true 取 omc前缀 属性字段
  const columns: BasicColumn[] = [
    {
      title: t('device.parameter.column.lastNodeName'),
      dataIndex: 'lastNodeName',
      width: 150,
      ifShow: (_column) => {
        return !tr069; // 根据业务控制是否显示
      },
    },
    {
      title: t('device.parameter.column.parameterName'),
      dataIndex: 'parameterName',
      width: 250,
      ifShow: (_column) => {
        return !tr069; // 根据业务控制是否显示
      },
    },
    {
      title: t('device.parameter.column.parameterTreeName'),
      dataIndex: 'parameterTreeName',
      width: 250,
      ifShow: (_column) => {
        return !tr069; // 根据业务控制是否显示
      },
    },
    {
      title: t('device.parameter.column.lastNodeName'),
      dataIndex: 'omcLastNodeName',
      width: 150,
      ifShow: (_column) => {
        return !!tr069; // 根据业务控制是否显示
      },
    },
    {
      title: t('device.parameter.column.parameterName'),
      dataIndex: 'omcParameterName',
      width: 250,
      ifShow: (_column) => {
        return !!tr069; // 根据业务控制是否显示
      },
    },

    {
      title: t('device.parameter.column.parameterTreeName'),
      dataIndex: 'omcParameterTreeName',
      width: 250,
      ifShow: (_column) => {
        return !!tr069; // 根据业务控制是否显示
      },
    },
    {
      title: t('device.parameter.column.location'),
      dataIndex: 'location',
      width: 80,
    },
    {
      title: t('device.parameter.column.type'),
      dataIndex: 'type',
      width: 80,
    },
    {
      title: t('device.parameter.column.writable'),
      dataIndex: 'writable',
      width: 80,
      customRender: ({ record }) => {
        const writable = record.writable;
        const enable = ~~writable === 0;
        const color = enable ? 'gray' : 'success';
        const text = enable ? '只读' : '可写';
        return h(Tag, { color: color }, () => text);
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
