import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export function getColumns() {
  const columns: BasicColumn[] = [
    {
      title: t('system.column.loginName'),
      dataIndex: 'loginName',
      width: 150,
    },
    {
      title: t('system.column.name'),
      dataIndex: 'name',
      width: 150,
    },
    {
      title: t('system.column.createDate'),
      dataIndex: 'createDate',
      width: 150,
    },
  ];
  return columns;
}

export function getSearchFormSchema() {
  const searchFormSchema: FormSchema[] = [
    {
      field: 'loginName',
      label: t('system.column.loginName'),
      component: 'Input',
      colProps: { span: 8 },
    },
  ];
  return searchFormSchema;
}

export function getAccountFormSchema(isUpdate) {
  console.log('🚀isUpdate👉👉', isUpdate);

  const userFormSchema: FormSchema[] = [
    {
      field: 'loginName',
      label: t('system.column.loginName'),
      component: 'Input',
      required: true,
      dynamicDisabled: (_column) => {
        return isUpdate; // 根据业务控制是否显示
      },
    },
    {
      field: 'name',
      label: t('system.column.name'),
      component: 'Input',
      required: true,
    },
    {
      field: 'password',
      label: t('system.column.password'),
      component: 'InputPassword',
      required: true,
      ifShow: (_column) => {
        return !isUpdate; // 根据业务控制是否显示
      },
    },
    {
      label: t('system.column.remark'),
      field: 'remark',
      component: 'InputTextArea',
    },
  ];
  return userFormSchema;
}
