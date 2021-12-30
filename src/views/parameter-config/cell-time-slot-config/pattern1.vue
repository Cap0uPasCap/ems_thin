<template>
  <BasicTable @register="registerTable" @edit-change="onEditChange">
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
  import { getCellTimeslotConfig, setCellTimeslotConfig } from '/@/api/parameter-config';
  export default defineComponent({
    components: { BasicTable, TableAction },
    setup() {
      const { createMessage: msg } = useMessage();
      const currentEditKeyRef = ref('');
      const [registerTable, { getDataSource }] = useTable({
        title: 'Pattern1',
        api: getCellTimeslotConfig,
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
        // const valid = await record.onValid?.();
        // if (valid) {
        try {
          const data = cloneDeep(getDataSource());

          let dataList: any = [];
          data.forEach((e) => {
            dataList.push({
              maxRank: e.editValueRefs.maxRank,
              nrofSRSPorts: e.editValueRefs.nrofSRSPorts,
              puschMaxMimoLayers: e.editValueRefs.puschMaxMimoLayers,
              ulMimo: e.editValueRefs.ulMimo,
              dlMimo: e.editValueRefs.dlMimo,
              numOfRxAntenna: e.editValueRefs.numOfRxAntenna,
              numOfTxAntenna: e.editValueRefs.numOfTxAntenna,
              cellIndex: e.cellIndex,
            });
          });

          await setCellTimeslotConfig({
            cellAdvancedConfigList: dataList,
          });
          //TODO 此处将数据提交给服务器保存
          // 保存之后提交编辑状态
          const pass = await record.onEdit?.(false, true);
          if (pass) {
            currentEditKeyRef.value = '';
          }
          msg.success({ content: '数据已保存', key: 'saving' });
        } catch (error) {
          msg.error({ content: '保存失败', key: 'saving' });
        }
        // } else {
        //   msg.error({ content: '请填写正确的数据', key: 'saving' });
        // }
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
        if (column.dataIndex === 'ulMimo') {
          switch (value) {
            case 1:
              record.editValueRefs.maxRank = 2;
              record.editValueRefs.nrofSRSPorts = 1;
              record.editValueRefs.puschMaxMimoLayers = 2;
              break;
            case 2:
              record.editValueRefs.maxRank = 1;
              record.editValueRefs.nrofSRSPorts = 0;
              record.editValueRefs.puschMaxMimoLayers = 1;
              break;
          }
        }
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
