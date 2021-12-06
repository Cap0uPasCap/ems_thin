<template>
  <PageWrapper contentClass="flex" contentFullHeight dense fixedHeight>
    <ParameterTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <div class="w-3/4 xl:w-4/5 bg-white m-4 mr-0 overflow-hidden">
      <BasicTable
        :rowSelection="{ type: 'checkbox' }"
        :title="selectParameterName"
        @register="registerTable"
      >
        <template #toolbar>
          <a-button type="primary" @click="handleSearchParameterValue">
            {{ t('device.parameter.action.queryParameterBtn') }}
          </a-button>
          <a-button type="primary" @click="handleSetParameterValue">
            {{ t('device.parameter.action.batch') }}
          </a-button>
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
        rowKey: 'parameterName', //searchInfo.tr069 ? 'omcParameterName' :
        showIndexColumn: false,
        clickToRowSelect: false,
        columns: getColumns(), //searchInfo.tr069
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

      async function handleSearchParameterValue() {
        const selectedRowKeys: any = getRowSelection().selectedRowKeys;
        if (!selectedRowKeys?.length)
          return message.warning(t('device.parameter.action.selectTip'));
        let parameterNames: string[] = [];
        for (let i in selectedRowKeys) {
          if (selectedRowKeys.hasOwnProperty(i)) {
            parameterNames.push(selectedRowKeys[i]);
          }
        }
        setLoading(true);
        const data = await getParameterValues({ parameterNames });
        setLoading(false);
        message.success(data.message);
        clearSelectedRowKeys();
        if (!data.data?.length) return;
        data.data.forEach((e) => {
          let record = listData.value.filter(
            (item) => item['parameterName'] === e.name, //searchInfo.tr069 ? 'omcParameterName' :
          );
          updateTableDataRecord(e.name, {
            ...record,
            parameterValue: e.value,
          });
        });
      }

      async function handleSetParameterValue() {
        const selectedRowKeys: any = getRowSelection().selectedRowKeys;
        if (!selectedRowKeys?.length) return message.warning('请至少选择一项操作');
        let parameterList: ParameterValuesResult[] = [];
        for (let i in selectedRowKeys) {
          if (selectedRowKeys.hasOwnProperty(i)) {
            listData.value.forEach((item) => {
              if (
                item['parameterName'] === selectedRowKeys[i] //searchInfo.tr069 ? 'omcParameterName' :
              ) {
                parameterList.push({
                  name: selectedRowKeys[i],
                  value: item.parameterCurrentValue,
                });
              }
            });
          }
        }
        setLoading(true);
        const data = await setParameterValues({ parameterList });
        setLoading(false);
        message.success(data.message);
        clearSelectedRowKeys();
        parameterList.forEach((e) => {
          let record = listData.value.filter(
            (item) => item['parameterName'] === e.name, //searchInfo.tr069 ? 'omcParameterName' :
          );
          updateTableDataRecord(e.name, {
            ...record,
            parameterValue: e.value,
          });
        });
      }

      function handleSelect(parameter) {
        const { parameterName } = parameter; //tr069
        selectParameterName.value = parameterName;
        searchInfo.searchName = parameterName;
        // searchInfo.tr069 = tr069;
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
        handleSelect,
        registerTable,
        selectParameterName,
        handleSetParameterValue,
        handleSearchParameterValue,
      };
    },
  });
</script>
