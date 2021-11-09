<template>
  <PageWrapper contentClass="flex" contentFullHeight dense fixedHeight>
    <ParameterTree @select="handleSelect" class="w-1/4 xl:w-1/5" />
    <BasicTable :searchInfo="searchInfo" @register="registerTable" class="w-3/4 xl:w-4/5">
      <!--      <template #toolbar>
        <a-button @click="handleCreate" type="primary">{{ t('device.parameter.action.addText') }}</a-button>
      </template>-->
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import ParameterTree from './tree.vue';
  import { columns } from './data'; //, searchFormSchema
  import { findParameterList } from '/@/api/device/parameter';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, ParameterTree },
    setup() {
      const { t } = useI18n();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload }] = useTable({
        title: t('device.parameter.title'),
        api: findParameterList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          // schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          return info;
        },
        actionColumn: {
          width: 120,
          title: t('device.parameter.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {}

      function handleSelect(parameter) {
        searchInfo.searchName = parameter.fullName;
        searchInfo.tr069 = parameter.tr069;
        reload();
      }

      return {
        registerTable,
        handleCreate,
        handleSelect,
        searchInfo,
        t,
      };
    },
  });
</script>
