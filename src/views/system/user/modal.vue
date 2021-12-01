<template>
  <BasicModal :title="getTitle" v-bind="$attrs" @ok="handleSubmit" @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  // import {message} from 'ant-design-vue';
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { getAccountFormSchema } from './data';
  import { add, update } from '/@/api/system/user';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const isUpdate = ref<boolean>(true);
      const rowId = ref('');
      const accountFormSchema = computed(() => getAccountFormSchema(isUpdate.value));

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          await setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('system.action.addText') : t('system.action.editBtnTip'),
      );
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // custom api\
          // if (!unref(isUpdate)) {
          //   await add({ ...values });
          // } else {
          //   await update({ ...values, id: rowId.value });
          // }
          closeModal();
          emit('success', {
            data: !unref(isUpdate) ? { ...values } : { ...values, id: rowId.value },
            fn: !unref(isUpdate) ? add : update,
          });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
