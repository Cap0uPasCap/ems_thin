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
          <a-button @click="handleSearchParameterValue" type="primary"> 查询参数值</a-button>
          <a-button @click="handleSetParameterValue" type="primary"> 批量提交</a-button>
        </template>
      </BasicTable>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { message } from 'ant-design-vue';
  import { defineComponent, reactive, ref, onMounted } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import ParameterTree from './tree.vue';
  import { getColumns } from './data';
  import {
    findParameterList,
    getParameterValues,
    setParameterValues,
  } from '/@/api/device/parameter';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ParameterValuesResult } from '/@/api/device/model/parameter';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, ParameterTree },
    setup() {
      const selectParameterName = ref<string>('');
      const { t } = useI18n();
      const listData = ref<any>([]);
      const searchInfo = reactive<Recordable>({ tr069: false });
      const [
        registerTable,
        {
          reload,
          getRowSelection,
          setShowPagination,
          updateTableDataRecord,
          clearSelectedRowKeys,
          setLoading,
        },
      ] = useTable({
        api: findParameterList,
        rowKey: searchInfo.tr069 ? 'omcParameterName' : 'parameterName',
        showIndexColumn: false,
        clickToRowSelect: false,
        columns: getColumns(searchInfo.tr069),
        afterFetch(data) {
          listData.value = data;
          return data;
        },
        formConfig: {
          labelWidth: 120,
          autoSubmitOnEnter: true,
        },
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          return info;
        },
      });

      function changeLoading() {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }

      async function handleSearchParameterValue() {
        const selectedRowKeys: any = getRowSelection().selectedRowKeys;

        if (!selectedRowKeys?.length) return message.warning('请至少选择一项操作');
        let parameterNames: string[] = [];
        for (let i in selectedRowKeys) {
          if (selectedRowKeys.hasOwnProperty(i)) {
            parameterNames.push(selectedRowKeys[i]);
          }
        }

        const data = await getParameterValues({ parameterNames });
        if (!data?.length) return;

        data.forEach((e) => {
          let record = listData.value.filter(
            (item) => item[searchInfo.tr069 ? 'omcParameterName' : 'parameterName'] === e.name,
          );
          updateTableDataRecord(e.name, {
            ...record,
            parameterValue: e.value,
          });
        });
        changeLoading();
        clearSelectedRowKeys();
      }

      async function handleSetParameterValue() {
        const selectedRowKeys: any = getRowSelection().selectedRowKeys;

        if (!selectedRowKeys?.length) return message.warning('请至少选择一项操作');
        let parameterList: ParameterValuesResult[] = [];
        for (let i in selectedRowKeys) {
          if (selectedRowKeys.hasOwnProperty(i)) {
            listData.value.forEach((item) => {
              if (
                item[searchInfo.tr069 ? 'omcParameterName' : 'parameterName'] === selectedRowKeys[i]
              ) {
                parameterList.push({
                  name: selectedRowKeys[i],
                  value: item.parameterCurrentValue,
                });
              }
            });
          }
        }
        await setParameterValues({ parameterList });
        parameterList.forEach((e) => {
          let record = listData.value.filter(
            (item) => item[searchInfo.tr069 ? 'omcParameterName' : 'parameterName'] === e.name,
          );
          updateTableDataRecord(e.name, {
            ...record,
            parameterValue: e.value,
          });
        });
        changeLoading();
        clearSelectedRowKeys();
      }

      function handleSelect(parameter) {
        const { fullName, tr069 } = parameter;
        selectParameterName.value = fullName;
        searchInfo.searchName = fullName;
        searchInfo.tr069 = tr069;
        reload({
          searchInfo,
        });
      }

      onMounted(() => {
        setShowPagination(false);
      });
      return {
        t,
        listData,
        searchInfo,
        registerTable,
        selectParameterName,
        handleSelect,
        changeLoading,
        handleSearchParameterValue,
        handleSetParameterValue,
      };
    },
  });
</script>
