<template>
  <Card :title="t('parameter-config.page.general.title')" style="padding-bottom: 150px">
    <template #extra>
      <Button type="primary" @click="getConfigData">{{
        t('parameter-config.page.general.btn.refresh')
      }}</Button>
      <Button type="primary" style="margin-left: 10px" @click="submitClick">{{
        t('parameter-config.page.general.btn.submit')
      }}</Button>
    </template>
    <BasicForm
      autoFocusFirstItem
      :labelWidth="200"
      @register="register"
      :schemas="schemas"
      :showActionButtonGroup="false"
    />
    <Loading :absolute="compState.absolute" :loading="compState.loading" :tip="compState.tip" />
  </Card>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Card } from 'ant-design-vue';
  import { schemas } from './data';
  import { Button } from '/@/components/Button';
  import { Loading } from '/@/components/Loading';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getCellGlobalConfig, setCellGlobalConfig } from '/@/api/parameter-config';
  export default defineComponent({
    components: { BasicForm, Card, Button, Loading },
    setup() {
      const { t } = useI18n();
      const [register, { getFieldsValue, setFieldsValue }] = useForm();
      const compState = reactive({
        absolute: true,
        loading: false,
        tip: t('parameter-config.loadingTip'),
      });
      //t('device.command.loadingTip')
      const check = ref(null);
      async function getConfigData() {
        compState.loading = true;
        const data = await getCellGlobalConfig();
        console.log('🚀data👉👉', data);
        await setFieldsValue(data?.data);
        compState.loading = false;
      }

      async function submitClick() {
        const data = await getFieldsValue();
        compState.loading = true;
        await setCellGlobalConfig(data);
        await getCellGlobalConfig();
        compState.loading = false;
      }

      onMounted(() => {
        getConfigData();
      });
      return {
        t,
        submitClick,
        schemas,
        register,
        compState,
        getConfigData,
        check,
      };
    },
  });
</script>
