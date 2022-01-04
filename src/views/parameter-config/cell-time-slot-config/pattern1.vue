<template>
  <BasicTable @register="registerTable">
    <template #action="{ record, column }">
      <TableAction :actions="createActions(record, column)" />
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';
  import { cloneDeep } from 'lodash-es';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getColumns } from './data';
  import { getCellTimeslot1Config, setCellTimeslotConfig } from '/@/api/parameter-config';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    components: { BasicTable, TableAction },
    setup() {
      const { createMessage: msg } = useMessage();
      const { t } = useI18n();
      const currentEditKeyRef = ref('');
      const [registerTable, { getDataSource }] = useTable({
        title: 'Pattern1',
        api: getCellTimeslot1Config,
        columns: getColumns(),
        showIndexColumn: false,
        showTableSetting: true,
        tableSetting: { fullScreen: true },
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
        const prefix = 'parameter-config.page.timeSlot.';
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
        msg.loading({ content: t1('btn.saveTip'), duration: 0, key: 'saving' });
        try {
          const data = cloneDeep(getDataSource());

          let dataList: any = [];
          data.forEach((e) => {
            dataList.push({
              tddUlDlPattern2Configured: e.editValueRefs.tddUlDlPattern2Configured,
              dlUlTransmissionPeriodicity: e.editValueRefs.dlUlTransmissionPeriodicity,
              numDlSlots: e.editValueRefs.numDlSlots,
              numDlSymbols: e.editValueRefs.numDlSymbols,
              numUlSlots: e.editValueRefs.numUlSlots,
              numUlSymbols: e.editValueRefs.numUlSymbols,
              cellIndex: e.cellIndex,
            });
          });

          await setCellTimeslotConfig({
            cellTimeslot1ConfigList: dataList,
          });
          await getCellTimeslot1Config();
          // 保存之后提交编辑状态
          const pass = await record.onEdit?.(false, true);
          if (pass) {
            currentEditKeyRef.value = '';
          }
          msg.success({ content: t1('btn.saveSuccessTip'), key: 'saving' });
        } catch (error) {
          msg.error({ content: t1('btn.saveFailedTip'), key: 'saving' });
        }
        // } else {
        //   msg.error({ content: '请填写正确的数据', key: 'saving' });
        // }
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
        registerTable,
        handleEdit,
        createActions,
      };
    },
  });
</script>
