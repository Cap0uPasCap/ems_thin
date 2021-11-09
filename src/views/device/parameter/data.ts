import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { h } from 'vue';
import { Input } from 'ant-design-vue'; //Tag
const { t } = useI18n();

export function getColumns(tr069) {
  // 根据 tr069 判断显示 true 取 omc前缀 属性字段
  const columns: BasicColumn[] = [
    {
      title: t('device.parameter.column.lastNodeName'),
      dataIndex: 'lastNodeName',
      width: 200,
      ifShow: (_column) => {
        return !tr069; // 根据业务控制是否显示
      },
    },
    // {
    //   title: t('device.parameter.column.parameterName'),
    //   dataIndex: 'parameterName',
    //   width: 250,
    //   ifShow: (_column) => {
    //     return !tr069; // 根据业务控制是否显示
    //   },
    // },
    // {
    //   title: t('device.parameter.column.parameterTreeName'),
    //   dataIndex: 'parameterTreeName',
    //   width: 250,
    //   ifShow: (_column) => {
    //     return !tr069; // 根据业务控制是否显示
    //   },
    // },
    {
      title: t('device.parameter.column.lastNodeName'),
      dataIndex: 'omcLastNodeName',
      width: 200,
      ifShow: (_column) => {
        return !!tr069; // 根据业务控制是否显示
      },
    },
    // {
    //   title: t('device.parameter.column.parameterName'),
    //   dataIndex: 'omcParameterName',
    //   width: 250,
    //   ifShow: (_column) => {
    //     return !!tr069; // 根据业务控制是否显示
    //   },
    // },
    //
    // {
    //   title: t('device.parameter.column.parameterTreeName'),
    //   dataIndex: 'omcParameterTreeName',
    //   width: 250,
    //   ifShow: (_column) => {
    //     return !!tr069; // 根据业务控制是否显示
    //   },
    // },
    // {
    //   title: t('device.parameter.column.location'),
    //   dataIndex: 'location',
    //   width: 80,
    // },
    {
      title: t('device.parameter.column.type'),
      dataIndex: 'type',
      width: 50,
    },
    {
      title: t('device.parameter.column.action'),
      dataIndex: 'action',
      width: 280,
      customRender: ({ record }) => {
        // const writable = record.writable;
        // const enable = ~~writable === 0;
        // const color = enable ? 'gray' : 'success';
        // const text = enable
        //   ? t('device.parameter.column.readOnly')
        //   : t('device.parameter.column.writeable');
        return h(Input, { disabled: record.writable === 0 }, () => {});
      },
    },
    // {
    //   title: t('device.parameter.column.writable'),
    //   dataIndex: 'writable',
    //   width: 80,
    //   customRender: ({ record }) => {
    //     const writable = record.writable;
    //     const enable = ~~writable === 0;
    //     const color = enable ? 'gray' : 'success';
    //     const text = enable
    //       ? t('device.parameter.column.readOnly')
    //       : t('device.parameter.column.writeable');
    //     return h(Tag, { color: color }, () => text);
    //   },
    // },
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
