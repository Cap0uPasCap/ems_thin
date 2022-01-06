<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #action="{ record, column }">
        <TableAction :actions="createActions(record, column)" />
      </template>
    </BasicTable>
    <Loading :absolute="compState.absolute" :loading="compState.loading" :tip="compState.tip" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getColumns, AdvancedConfigModel } from './data';
  import { getCellAdvancedConfig, setCellAdvancedConfig } from '/@/api/parameter-config';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Loading } from '/@/components/Loading';

  export default defineComponent({
    components: { BasicTable, TableAction, Loading },
    setup() {
      const { createMessage: msg } = useMessage();
      const { t } = useI18n();
      const compState = reactive({
        absolute: true,
        loading: false,
        tip: t('parameter-config.loadingTip'),
      });
      const currentEditKeyRef = ref('');
      const [registerTable] = useTable({
        title: t1('title'),
        api: getCellAdvancedConfig,
        columns: getColumns(),
        showIndexColumn: false,
        showTableSetting: true,
        tableSetting: {
          size: false,
          setting: false,
        },
        canResize: false,
        pagination: false,
        actionColumn: {
          width: 160,
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function t1(context) {
        const prefix = 'parameter-config.page.advanced.';
        return t(prefix + context);
      }

      function handleEdit(record: EditRecordRow) {
        currentEditKeyRef.value = record.key;
        record.onEdit?.(true);
      }

      function handleCancel(record: EditRecordRow) {
        currentEditKeyRef.value = '';
        record.onEdit?.(false, false);
      }

      async function handleSave(record: EditRecordRow) {
        try {
          let advancedConfigData: AdvancedConfigModel = {
            ulMimo: record?.editValueRefs?.ulMimo || '',
            dlMimo: record?.editValueRefs?.dlMimo || '',
            numOfRxAntenna: record?.editValueRefs?.numOfRxAntenna || '',
            numOfTxAntenna: record?.editValueRefs?.numOfTxAntenna || '',
            cellIndex: record.cellIndex,
          };
          //TODO 此处将数据提交给服务器保存
          compState.loading = true;
          const responseInfo = await setCellAdvancedConfig({
            cellAdvancedConfigList: [advancedConfigData],
          });
          compState.loading = false;
          if (responseInfo.status === 1) throw new Error(responseInfo.message);
          await getCellAdvancedConfig();
          // 保存之后提交编辑状态
          const pass = await record.onEdit?.(false, true);
          if (pass) {
            currentEditKeyRef.value = '';
          }
          msg.success({ content: t1('btn.saveSuccessTip'), key: 'saving' });
        } catch (error) {
          console.log('🚀error👉👉', error);
        }
      }

      function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
        if (!record.editable) {
          return [
            {
              label: t1('btn.editText'),
              disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
              onClick: handleEdit.bind(null, record),
            },
          ];
        }
        return [
          {
            label: t1('btn.saveText'),
            onClick: handleSave.bind(null, record, column),
          },
          {
            label: t1('btn.cancelText'),
            popConfirm: {
              title: t1('btn.cancelTip'),
              confirm: handleCancel.bind(null, record, column),
            },
          },
        ];
      }

      return {
        t1,
        compState,
        registerTable,
        handleEdit,
        createActions,
      };
    },
  });
</script>
