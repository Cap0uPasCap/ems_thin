import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '登录账号',
    dataIndex: 'loginName',
    width: 150,
  },
  {
    title: '用户名',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'loginName',
    label: '登录账号',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export function accountFormSchema(isUpdate) {
  const userFormSchema: FormSchema[] = [
    {
      field: 'loginName',
      label: '登录账号',
      component: 'Input',
      required: true,
      helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    },
    {
      field: 'name',
      label: '用户名',
      component: 'Input',
      required: true,
      helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    },
    {
      field: 'password',
      label: '密码',
      component: 'InputPassword',
      required: true,
      ifShow: (_column) => {
        return !isUpdate.value; // 根据业务控制是否显示
      },
    },
    {
      label: '备注',
      field: 'remark',
      component: 'InputTextArea',
    },
  ];
  return userFormSchema;
}
