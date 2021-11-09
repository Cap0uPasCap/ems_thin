import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('device.parameter.column.parameterName'),
    dataIndex: 'parameterName',
    width: 250,
  },
  {
    title: t('device.parameter.column.omcParameterName'),
    dataIndex: 'omcParameterName',
    width: 150,
  },
  {
    title: t('device.parameter.column.location'),
    dataIndex: 'location',
    width: 50,
  },
  {
    title: t('device.parameter.column.type'),
    dataIndex: 'type',
    width: 50,
  },
  {
    title: t('device.parameter.column.writable'),
    dataIndex: 'writable',
    width: 50,
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
