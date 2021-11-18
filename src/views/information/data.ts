import { DescItem } from '/@/components/Description';
import { useI18n } from '/@/hooks/web/useI18n';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';

const { t } = useI18n();

const commonTagRender = (color: string) => (curVal) => h(Tag, { color }, () => curVal);

export const softwareSchema: DescItem[] = [
  {
    field: 'softwareVersion',
    label: t('information.softwareVersion'),
    render: commonTagRender('blue'),
    labelMinWidth: 100,
    contentMinWidth: 200,
  },
  {
    field: 'platform',
    label: t('information.platform'),
    labelMinWidth: 100,
    contentMinWidth: 200,
  },
];
export const runtimeSchema: DescItem[] = [
  {
    field: 'firstUseDate',
    label: t('information.firstUseDate'),
    render: commonTagRender('blue'),
    labelMinWidth: 100,
    contentMinWidth: 200,
  },
];
export const hardwareSchema: DescItem[] = [
  {
    field: 'modelName',
    label: t('information.modelName'),
    labelMinWidth: 100,
    contentMinWidth: 200,
  },
  {
    field: 'manufacturer',
    label: t('information.manufacturer'),
    labelMinWidth: 100,
    contentMinWidth: 200,
  },
  {
    field: 'manufacturerOui',
    label: t('information.manufacturerOui'),
    labelMinWidth: 100,
    contentMinWidth: 200,
  },
  {
    field: 'serialNumber',
    label: t('information.serialNumber'),
    labelMinWidth: 100,
    contentMinWidth: 200,
  },
  {
    field: 'productClass',
    label: t('information.productClass'),
    labelMinWidth: 100,
    contentMinWidth: 200,
  },
  {
    field: 'hardwareVersion',
    label: t('information.hardwareVersion'),
    render: commonTagRender('blue'),
    labelMinWidth: 100,
    contentMinWidth: 200,
  },
];
