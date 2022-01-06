<template>
  <div class="p-4">
    <BasicTable @register="registerTable" :dataSource="configData">
      <template #pointA="{ record }">
        <div v-if="record.editable">
          NRArfcn:
          <InputNumber size="small" style="width: 110px" v-model:value="record.nrArfcnDL" />
          <br />
        </div>
        <div v-else>
          NRArfcn:
          <span>{{ record.nrArfcnDL }}</span>
        </div>
        <div>
          <div
            v-if="
              (record.nrArfcnDL > 538000 && record.nrArfcnDL < 600000) ||
              record.nrArfcnDL > 653333 ||
              record.nrArfcnDL < 499200
            "
          >
            <span style="color: #ea7877">请输入有效值</span>
            <br />
          </div>
          <span title="取值范围" style="color: #ea7877">(499200~538000, 600000~653333)</span>
        </div>
      </template>
      <template #nrFreqBand="{ record }">
        <div v-if="record.editable">
          <a-input
            size="small"
            disabled="true"
            style="width: 110px"
            :value="record.nrArfcnDL >= 600000 ? 78 : 41"
          />
        </div>
        <div v-else>
          <span>{{ record.nrArfcnDL >= 600000 ? 78 : 41 }}</span>
        </div>
      </template>

      <template #action="{ record, column }">
        <TableAction :actions="createActions(record, column)" />
      </template>
    </BasicTable>
    <Loading :absolute="compState.absolute" :loading="compState.loading" :tip="compState.tip" />
  </div>
</template>
<script lang="ts">
  import { setCellBaseConfig } from '/@/api/parameter-config';
  import { defineComponent, reactive, ref } from 'vue';
  import { Loading } from '/@/components/Loading';
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';

  import { InputNumber } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getColumns } from './data';
  import { useI18n } from '/@/hooks/web/useI18n';
  export default defineComponent({
    components: { BasicTable, TableAction, InputNumber, Loading },
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
      const currentEditKeyRef = ref('');
      const compState = reactive({
        absolute: true,
        loading: false,
        tip: t('parameter-config.loadingTip'),
      });
      const [registerTable, { getDataSource }] = useTable({
        title: t1('title[0]'),
        columns: getColumns('Basic'),
        showIndexColumn: false,
        showTableSetting: true,
        canResize: false,
        pagination: false,
        tableSetting: { fullScreen: true },
        actionColumn: {
          width: 90,
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function t1(context) {
        const prefix = 'parameter-config.page.basic.';
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
          const data = cloneDeep(getDataSource());
          let dataList: any = [];
          data.forEach((e) => {
            if (e.cellIndex == record.cellIndex) {
              if (
                (e.nrArfcnDL > 538000 && e.nrArfcnDL < 600000) ||
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
                  puschTargetPower: e.editValueRefs.puschTargetPower || e.puschTargetPower,
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
            }
          });
          compState.loading = true;
          const responseInfo = await setCellBaseConfig({
            cellBaseConfigList: dataList,
          });
          compState.loading = false;
          if (responseInfo.status === 1) throw new Error(responseInfo.message);
          emit('reload');
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
