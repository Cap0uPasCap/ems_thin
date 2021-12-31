<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #action="{ record, column }">
        <TableAction :actions="createActions(record, column)" />
      </template>
    </BasicTable>
  </div>
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
  import { getCellAdvancedConfig, setCellAdvancedConfig } from '/@/api/parameter-config';
  export default defineComponent({
    components: { BasicTable, TableAction },
    setup() {
      const { createMessage: msg } = useMessage();
      const currentEditKeyRef = ref('');
      const [registerTable, { getDataSource }] = useTable({
        title: '物理资源配置',
        api: getCellAdvancedConfig,
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
              ulMimo: e.editValueRefs.ulMimo,
              dlMimo: e.editValueRefs.dlMimo,
              numOfRxAntenna: e.editValueRefs.numOfRxAntenna,
              numOfTxAntenna: e.editValueRefs.numOfTxAntenna,
              cellIndex: e.cellIndex,
            });
          });
          //TODO 此处将数据提交给服务器保存
          await setCellAdvancedConfig({
            cellAdvancedConfigList: dataList,
          });
          await getCellAdvancedConfig();
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

      return {
        registerTable,
        handleEdit,
        createActions,
      };
    },
  });
</script>
