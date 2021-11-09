<template>
  <PageWrapper contentClass="flex" contentFullHeight dense fixedHeight>
    <ParameterTree @select="handleSelect" class="w-1/4 xl:w-1/5" />
    <div class="w-3/4 xl:w-4/5 bg-white m-4 mr-0 overflow-hidden">
      <BasicTable
        :rowSelection="{ type: 'checkbox' }"
        :title="selectParameterName"
        @register="registerTable"
      >
        <template #toolbar>
          <a-button type="primary"> 查询参数列表</a-button>
          <a-button type="primary"> 查询参数值</a-button>
          <a-button type="primary"> 批量提交</a-button>
        </template>
      </BasicTable>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import ParameterTree from './tree.vue';
  import { getColumns } from './data'; //, searchFormSchema
  import { findParameterList } from '/@/api/device/parameter';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, ParameterTree },
    setup() {
      const selectParameterName = ref('');
      const { t } = useI18n();
      const searchInfo = reactive<Recordable>({ tr069: false });
      const [registerTable, { reload }] = useTable({
        api: findParameterList,
        rowKey: 'id',
        columns: getColumns(searchInfo.tr069),
        formConfig: {
          labelWidth: 120,
          // schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          return info;
        },
      });

      function handleSelect(parameter) {
        const { fullName, tr069 } = parameter;
        selectParameterName.value = fullName;
        searchInfo.searchName = fullName;
        searchInfo.tr069 = tr069;
        reload({
          searchInfo,
        });
      }

      return {
        registerTable,
        handleSelect,
        selectParameterName,
        searchInfo,
        t,
      };
    },
  });
</script>
