import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '参数',
    dataIndex: 'account',
  },
  {
    title: '参数值',
    dataIndex: 'nickname',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '参数',
    component: 'Input',
    colProps: { span: 8 },
  },
];
