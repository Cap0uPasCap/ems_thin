<template>
  <div class="p-4">
    <BasicTable @register="registerTable" @edit-change="onEditChange" :dataSource="configData">
      <template #action="{ record, column }">
        <TableAction :actions="createActions(record, column)" />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { setCellBaseConfig } from '/@/api/parameter-config';
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
  export default defineComponent({
    components: { BasicTable, TableAction },
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
      const currentEditKeyRef = ref('');
      const [registerTable, { getDataSource }] = useTable({
        title: '功控配置',
        columns: getColumns('FunctionControl'),
        showIndexColumn: false,
        showTableSetting: true,
        canResize: false,
        pagination: false,
        tableSetting: { fullScreen: true },
        actionColumn: {
          width: 40,
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleEdit(record: EditRecordRow) {
        currentEditKeyRef.value = record.key;
        record.onEdit?.(true);
      }

      function handleCancel(record: EditRecordRow) {
        currentEditKeyRef.value = '';
        record.onEdit?.(false, false);
      }

      async function handleSave(record: EditRecordRow) {
        // 校验
        msg.loading({ content: '正在保存...', duration: 0, key: 'saving' });
        const valid = await record.onValid?.();
        if (valid) {
          try {
            const data = cloneDeep(getDataSource());
            let dataList: any = [];
            data.forEach((e) => {
              if (
                (e.nrArfcnDL >= 538000 && e.nrArfcnDL < 600000) ||
                e.nrArfcnDL > 653333 ||
                e.nrArfcnDL < 499200
              ) {
                throw new Error('请填写正确的数据');
              } else {
                dataList.push({
                  hoppingId: e.editValueRefs.hoppingId || e.hoppingId,
                  ssb: e.editValueRefs.ssb || e.ssb,
                  maxUe: e.editValueRefs.maxUe || e.maxUe,
                  rlcMode: e.editValueRefs.rlcMode || e.rlcMode,
                  dlLaEnabled: e.editValueRefs.dlLaEnabled || e.dlLaEnabled,
                  initDlMcs: e.editValueRefs.initDlMcs || e.initDlMcs,
                  ulLaEnabled: e.editValueRefs.ulLaEnabled || e.ulLaEnabled,
                  initUlMcs: e.editValueRefs.initUlMcs || e.initUlMcs,
                  p0NominalWithGrant: e.editValueRefs.p0NominalWithGrant || e.p0NominalWithGrant,
                  preambleReceivedTargetPower:
                    e.editValueRefs.preambleReceivedTargetPower || e.preambleReceivedTargetPower,
                  puschEnable: e.editValueRefs.puschEnable || e.puschEnable,
                  nrArfcnDL: e.editValueRefs.nrArfcnDL || e.nrArfcnDL,
                  nrArfcnUL: e.editValueRefs.nrArfcnDL || e.nrArfcnDL,
                  nrFreqBandDL: (e.editValueRefs.nrArfcnDL || e.nrArfcnDL) >= 600000 ? 78 : 41,
                  nrFreqBandUL: (e.editValueRefs.nrArfcnDL || e.nrArfcnDL) >= 600000 ? 78 : 41,
                  cellIndex: e.cellIndex,
                  cellStatus: e.cellStatus,
                  cellId: e.cellId,
                });
              }
            });
            await setCellBaseConfig({
              cellBaseConfigList: dataList,
            });
            emit('reload');
            const pass = await record.onEdit?.(false, true);
            if (pass) {
              currentEditKeyRef.value = '';
            }
            msg.success({ content: '数据已保存', key: 'saving' });
          } catch (error) {
            msg.error({ content: '请填写正确的数据', key: 'saving' });
          }
        } else {
          msg.error({ content: '请填写正确的数据', key: 'saving' });
        }
      }

      function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
        if (!record.editable) {
          return [
            {
              label: '编辑',
              disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
              onClick: handleEdit.bind(null, record),
            },
          ];
        }
        return [
          {
            label: '保存',
            onClick: handleSave.bind(null, record, column),
          },
          {
            label: '取消',
            popConfirm: {
              title: '是否取消编辑',
              confirm: handleCancel.bind(null, record, column),
            },
          },
        ];
      }

      function onEditChange({ column, value, record }) {
        // 本例
        if (column.dataIndex === 'id') {
          record.editValueRefs.name4.value = `${value}`;
        }
        console.log(column, value, record);
      }

      return {
        registerTable,
        handleEdit,
        createActions,
        onEditChange,
      };
    },
  });
</script>
