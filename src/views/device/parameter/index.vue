<template>
  <PageWrapper contentClass="flex" contentFullHeight dense fixedHeight>
    <ParameterTree @select="handleSelect" class="w-1/4 xl:w-1/5" />
    <BasicTable :searchInfo="searchInfo" @register="registerTable" class="w-3/4 xl:w-4/5">
      <template #toolbar>
        <a-button @click="handleCreate" type="primary">新增</a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import ParameterTree from './tree.vue';
  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, ParameterTree },
    setup() {
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload }] = useTable({
        title: '参数列表',
        // api: getList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
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
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {}

      function handleSelect(deptId = '') {
        searchInfo.deptId = deptId;
        reload();
      }

      return {
        registerTable,
        handleCreate,
        handleSelect,
        searchInfo,
      };
    },
  });
</script>
