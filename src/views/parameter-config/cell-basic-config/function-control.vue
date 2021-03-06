<template>
  <div class="p-4">
    <BasicTable :dataSource="configData" @register="registerTable">
      <template #action="{ record, column }">
        <TableAction :actions="createActions(record, column)" />
      </template>
      <template #puschEnable="{ record }">
        <Select v-if="record.editable" v-model:value="record.puschEnable" style="width: 120px">
          <select-item value="1">开启</select-item>
          <select-item value="0">关闭</select-item>
        </Select>
        <span v-else>{{ record.puschEnable === '1' ? '开启' : '关闭' }}</span>
      </template>
      <template #p0NominalWithGrant="{ record }">
        <div v-if="record.editable">
          <Tooltip
            :visible="record.p0NominalWithGrant > 24 || record.p0NominalWithGrant < -202"
            color="#fff"
          >
            <template #title>
              <span style="color: #ed6f6f">
                P0NominalWithGrant: minInclusive: -202, maxInclusive: 24
              </span>
            </template>
            <Input
              v-model:value="record.p0NominalWithGrant"
              :disabled="record.puschEnable === '1'"
              class="width_110"
              size="small"
            />
          </Tooltip>
        </div>
        <span v-else :class="record.puschEnable === '1' ? 'disabled' : ''">
          {{ record.p0NominalWithGrant }}
        </span>
      </template>
      <template #puschTargetPower="{ record }">
        <Input
          v-if="record.editable"
          v-model:value="record.puschTargetPower"
          :disabled="record.puschEnable === '0'"
          class="width_110"
          size="small"
        />
        <span v-else :class="record.puschEnable === '0' ? 'disabled' : ''">
          {{ record.puschTargetPower }}
        </span>
      </template>
      <template #toolbar>
        <Tooltip>
          <template #title> {{ t('parameter-config.redo') }}</template>
          <RedoOutlined @click="reload" />
        </Tooltip>
      </template>
    </BasicTable>
    <Loading :absolute="compState.absolute" :loading="compState.loading" :tip="compState.tip" />
  </div>
</template>
<script lang="ts">
  import { setCellBaseConfig } from '/@/api/parameter-config';
  import SelectItem from '/@/layouts/default/setting/components/SelectItem.vue';
  import { defineComponent, reactive, ref } from 'vue';
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';

  import { cloneDeep } from 'lodash-es';
  import { Loading } from '/@/components/Loading';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getColumns } from './data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { RedoOutlined } from '@ant-design/icons-vue';

  import { Input, Select, Tooltip } from 'ant-design-vue';

  export default defineComponent({
    components: {
      SelectItem,
      BasicTable,
      TableAction,
      Loading,
      Input,
      Select,
      Tooltip,
      RedoOutlined,
    },
    props: {
      configData: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    emits: ['reloadData'],
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
        title: t1('title[2]'),
        columns: getColumns('FunctionControl'),
        showIndexColumn: false,
        showTableSetting: true,
        canResize: false,
        pagination: false,
        tableSetting: {
          size: false,
          setting: false,
          redo: false,
        },
        actionColumn: {
          width: 40,
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

      function reload() {
        emit('reloadData');
      }

      function handleCancel(record: EditRecordRow) {
        currentEditKeyRef.value = '';
        record.onEdit?.(false, false);
      }

      async function handleSave(record: EditRecordRow) {
        const valid = await record.onValid?.();
        if (valid) {
          try {
            const data = cloneDeep(getDataSource());
            let dataList: any = [];
            data.forEach((e) => {
              if (e.cellIndex == record.cellIndex) {
                if (
                  (e.nrArfcnDL >= 538000 && e.nrArfcnDL < 600000) ||
                  e.nrArfcnDL > 653333 ||
                  e.nrArfcnDL < 499200
                ) {
                  msg.error({
                    content: 'PointA 请输入有效值',
                    key: 'saving',
                  });
                  throw Error('PointA 请输入有效值');
                } else if (
                  e.puschEnable === '0' &&
                  (e.p0NominalWithGrant > 24 || e.p0NominalWithGrant < -202)
                ) {
                  msg.error({
                    content: 'P0NominalWithGrant: minInclusive: -202, maxInclusive: 24',
                    key: 'saving',
                  });
                  throw Error('P0NominalWithGrant: minInclusive: -202, maxInclusive: 24');
                } else {
                  dataList.push({
                    hoppingId: e.editValueRefs.hoppingId || e.hoppingId,
                    phyCellID: e.editValueRefs.phyCellID || e.phyCellID,
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
            emit('reloadData');
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
        compState,
        reload,
        registerTable,
        handleEdit,
        createActions,
      };
    },
  });
</script>
<style scoped>
  .disabled {
    color: #d1d1d1 !important;
  }

  .width_110 {
    width: 110px;
  }
</style>
