<!--
 * @Description: 设备管理-参数管理
 * @Author: stay foolish
 * @Date: 2021/12/6/0006
-->
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
      // 国际化函数
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
        //是否显示序列号
        showIndexColumn: false,
        //是否点击行选择
        clickToRowSelect: false,
        // table列配置
        columns: getColumns(), //searchInfo.tr069
        // 自定义处理接口返回参数
        afterFetch(data) {
          listData.value = data;
          return data;
        },
        // table组件表单配置
        formConfig: {
          labelWidth: 120,
          autoSubmitOnEnter: true,
        },
        //使用搜索表单
        useSearchForm: false,
        //显示表格配置
        showTableSetting: true,
        //是否显示边框
        bordered: true,
        // 查询表格条件前处理
        handleSearchInfoFn(info) {
          return info;
        },
      });

      /**
       * @desc 查询参数值按钮触发事件
       */
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
      /**
       * @desc 批量提交按钮触发事件
       */
      async function handleSetParameterValue() {
        const selectedRowKeys: any = getRowSelection().selectedRowKeys;
        if (!selectedRowKeys?.length) return message.warning('请至少选择一项操作');
        let parameterList: ParameterValuesResult[] = [];
        for (let i in selectedRowKeys) {
          if (selectedRowKeys.hasOwnProperty(i)) {
            listData.value.forEach((item) => {
              //searchInfo.tr069 ? 'omcParameterName' :
              if (item['parameterName'] === selectedRowKeys[i]) {
                parameterList.push({
                  name: selectedRowKeys[i],
                  value: item.parameterCurrentValue,
                });
              }
            });
          }
        }
        /**
         * @desc BasicTable  组件 设置loading事件函数
         * @param  {boolean} loading
         */
        setLoading(true);
        const data = await setParameterValues({ parameterList });
        setLoading(false);
        /**
         * @desc message  ant design vue 提示信息组件
         * @param  {string} message
         */
        message.success(data.message);
        clearSelectedRowKeys();
        parameterList.forEach((e) => {
          let record = listData.value.filter(
            (item) => item['parameterName'] === e.name, //searchInfo.tr069 ? 'omcParameterName' :
          );
          /**
           * @desc   BasicTable 组件 更新行数据函数
           * @param  rowKey 行索引字段值
           * @param  record 需要更新的行数据
           */
          updateTableDataRecord(e.name, {
            ...record,
            parameterValue: e.value,
          });
        });
      }
      /**
       * @desc 接收来自子组件tree的点击事件和参数 触发当前列表的数据的查询
       * @param parameter 接收参数
       */
      function handleSelect(parameter) {
        const { parameterName } = parameter; //tr069
        selectParameterName.value = parameterName;
        searchInfo.searchName = parameterName;
        // searchInfo.tr069 = tr069;
        /**
         * @desc   reload TableActionType 列表组件重载接口
         * @param  {Object} searchInfo 查询条件
         * @return {Object} 返回查询数据
         */
        reload({
          searchInfo,
        });
      }

      onMounted(() => {
        /**
         * @desc 设置 BasicTable 组件中的分页组件显示
         */
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
