import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
export const schemas: FormSchema[] = [
  {
    field: 'divider-basic',
    component: 'Divider',
    label: t('parameter-config.page.general.titleList[0]'),
  },
  {
    field: 'cellNum',
    component: 'Select',
    label: t('parameter-config.page.general.column.cellNum'),
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '1',
          value: '1',
          key: '1',
        },
        {
          label: '2',
          value: '2',
          key: '2',
        },
        {
          label: '3',
          value: '3',
          key: '3',
        },
      ],
    },
  },
  {
    field: 'plmnId',
    component: 'Input',
    label: t('parameter-config.page.general.column.plmnId'),
    colProps: {
      span: 8,
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (_, value) => {
          if (!value) {
            return Promise.reject('值不能为空');
          }
          if (value.length > 6) {
            return Promise.reject('PLMNID: maxLength:6');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'divider-selects',
    component: 'Divider',
    label: t('parameter-config.page.general.titleList[1]'),
  },
  {
    field: 'amfIp',
    component: 'Input',
    label: t('parameter-config.page.general.column.amfIp'),
    colProps: {
      span: 8,
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (_, value) => {
          if (!value) {
            return Promise.reject('值不能为空');
          }
          if (value.length > 256 || value.length < 1) {
            return Promise.reject('NGSigLinkServerList: maxLength: 256, minLength: 1');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'amfIp2',
    component: 'Input',
    label: 'AMF IP',
    dynamicDisabled: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'divider-selects',
    component: 'Divider',
    label: t('parameter-config.page.general.titleList[2]'),
  },
  {
    field: 'snssaNum',
    component: 'Select',
    label: t('parameter-config.page.general.column.snssaNum'),
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '1',
          value: '1',
          key: '1',
        },
      ],
    },
  },
  {
    field: 'sliceSst',
    component: 'Input',
    label: t('parameter-config.page.general.column.sliceSst'),
    colProps: {
      span: 8,
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (_, value) => {
          if (!value) {
            return Promise.reject('值不能为空');
          }
          if (value.length !== 2) {
            return Promise.reject('Slice_SST: maxLength: 2, minLength: 2');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'sliceSd',
    component: 'Input',
    label: t('parameter-config.page.general.column.sliceSd'),
    colProps: {
      span: 8,
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (_, value) => {
          if (!value) {
            return Promise.reject('值不能为空');
          }
          if (value.length !== 6) {
            return Promise.reject('Slice_SD: maxLength: 6, minLength: 6');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
];
