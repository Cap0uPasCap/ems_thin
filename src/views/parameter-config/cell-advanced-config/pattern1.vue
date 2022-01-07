<template>
  <BasicTable @register="registerTable" :dataSource="configData">
    <template #action="{ record, column }">
      <TableAction :actions="createActions(record, column)" />
    </template>
    <template #toolbar>
      <Tooltip>
        <template #title> {{ t('parameter-config.redo') }} </template>
        <RedoOutlined @click="reload" />
      </Tooltip>
    </template>
  </BasicTable>
  <Loading :absolute="compState.absolute" :loading="compState.loading" :tip="compState.tip" />
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
  import { getTimeSlotColumns, TimeSlotConfigModel } from './data';
  import { setCellTimeslotConfig } from '/@/api/parameter-config';
  import { Loading } from '/@/components/Loading';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { RedoOutlined } from '@ant-design/icons-vue';
  import { Tooltip } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicTable, TableAction, Loading, Tooltip, RedoOutlined },
    props: {
      configData: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    setup(_, { emit }) {
      const { createMessage: msg } = useMessage();
      const { t } = useI18n();
      const compState = reactive({
        absolute: true,
        loading: false,
        tip: t('parameter-config.loadingTip'),
      });
      const currentEditKeyRef = ref('');
      const [registerTable] = useTable({
        title: t('parameter-config.page.timeSlot.title') + ' Pattern1',
        // api: getCellTimeslot1Config,
        columns: getTimeSlotColumns(),
        showIndexColumn: false,
        showTableSetting: true,
        tableSetting: {
          size: false,
          setting: false,
          redo: false,
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
        const prefix = 'parameter-config.page.timeSlot.';
        return t(prefix + context);
      }

      function handleEdit(record: EditRecordRow) {
        currentEditKeyRef.value = record.key;
        record.onEdit?.(true);
      }

      function reload() {
        emit('reload');
      }

      function handleCancel(record: EditRecordRow) {
        currentEditKeyRef.value = '';
        record.onEdit?.(false, false);
      }

      async function handleSave(record: EditRecordRow) {
        const valid = await record.onValid?.();
        if (valid) {
          try {
            let timeSlotConfig: TimeSlotConfigModel = {
              tddUlDlPattern2Configured: record?.editValueRefs?.tddUlDlPattern2Configured,
              dlUlTransmissionPeriodicity: record?.editValueRefs?.dlUlTransmissionPeriodicity,
              numDlSlots: record?.editValueRefs?.numDlSlots,
              numDlSymbols: record?.editValueRefs?.numDlSymbols,
              numUlSlots: record?.editValueRefs?.numUlSlots,
              numUlSymbols: record?.editValueRefs?.numUlSymbols,
              cellIndex: record.cellIndex,
            };
            compState.loading = true;
            const responseInfo = await setCellTimeslotConfig({
              cellTimeslot1ConfigList: [timeSlotConfig],
            });
            compState.loading = false;
            if (responseInfo.status === 1) throw new Error(responseInfo.message);
            emit('reload');
            // 保存之后提交编辑状态
            const pass = await record.onEdit?.(false, true);
            if (pass) {
              currentEditKeyRef.value = '';
            }
            msg.success({ content: t1('btn.saveSuccessTip'), key: 'saving' });
          } catch (error) {
            console.log('🚀error👉👉', error);
          }
        } else {
          msg.error({ content: t1('btn.saveValidFailedTip'), key: 'saving' });
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
        t,
        t1,
        reload,
        compState,
        registerTable,
        handleEdit,
        createActions,
      };
    },
  });
</script>
