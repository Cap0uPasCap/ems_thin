<!--
 * @Description: 系统管理->用户管理
 * @Author: cap
 * @Date: 2021/11/23 15:00
-->
<template>
  <PageWrapper contentClass="flex" contentFullHeight dense fixedHeight>
    <BasicTable :searchInfo="searchInfo" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">{{ t('system.action.addText') }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="fetchAction(record)" />
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { message, Modal } from 'ant-design-vue';
  import { defineComponent, reactive, ref, createVNode } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getList, del, resetUserPassword, updateUserPassword } from '/@/api/system/user';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import AccountModal from './modal.vue';
  import { getSearchFormSchema, getColumns } from './data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, AccountModal, TableAction },
    setup() {
      const password = ref('');
      const { t } = useI18n();
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, setLoading }] = useTable({
        // updateTableDataRecord
        title: t('system.title'),
        api: getList,
        rowKey: 'id',
        columns: getColumns(),
        formConfig: {
          labelWidth: 120,
          schemas: getSearchFormSchema(),
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          return info;
        },
        actionColumn: {
          width: 120,
          title: t('system.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      async function changeLoading(fn) {
        setLoading(true);
        const data = await fn;
        message.success(data.message);
        setLoading(false);
      }

      function fetchAction(record) {
        return [
          {
            icon: 'clarity:note-edit-line',
            tooltip: t('system.action.editBtnTip'),
            onClick: handleEdit.bind(null, record),
            ifShow: (_column) => {
              return record.sysMark !== 1;
            },
          },
          {
            icon: 'ant-design:delete-outlined',
            color: 'error',
            tooltip: t('system.action.delBtnTip'),
            popConfirm: {
              title: t('system.action.delBtnConfirm'),
              confirm: handleDelete.bind(null, record),
            },
            ifShow: (_column) => {
              return record.sysMark !== 1;
            },
          },
          {
            icon: 'ant-design:tool',
            // color: 'error',
            tooltip: t('system.action.editUserBtnTip'),
            onClick: handleEditPassword.bind(null, record),
          },
          {
            icon: 'ant-design:undo',
            // color: 'error',
            tooltip: t('system.action.resetBtnTip'),
            popConfirm: {
              title: t('system.action.resetBtnConfirm'),
              confirm: handleReset.bind(null, record),
            },
            ifShow: (_column) => {
              return record.sysMark !== 1;
            },
          },
        ];
      }

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleEditPassword(record: Recordable) {
        Modal.confirm({
          title: t('system.action.updatePassWordTitle'),
          content: () =>
            createVNode('input', {
              value: password.value,
              type: 'text',
              style: 'border: 1px solid;width: 90%;',
              onChange: (e) => {
                password.value = e.target.value;
              },
            }),
          okText: t('system.action.okText'),
          cancelText: t('system.action.cancelText'),
          onOk: () => {
            if (!!password.value) {
              changeLoading(updateUserPassword(password.value, record.id));
              password.value = '';
            } else {
              message.error(t('system.action.updatePassWordTip'));
            }
          },
          onCancel: () => (password.value = ''),
        });
      }

      function handleDelete(record: Recordable) {
        changeLoading(del(record.id));
        reload();
      }

      function handleReset(record: Recordable) {
        changeLoading(resetUserPassword(record.id));
        reload();
      }

      function handleSuccess({ data, fn }) {
        changeLoading(fn(data));
        reload();
        // if (isUpdate) {
        //   // 演示不刷新表格直接更新内部数据。
        //   // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
        //   updateTableDataRecord(values.id, values);
        // } else {
        //   reload();
        // }
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleReset,
        handleSuccess,
        changeLoading,
        searchInfo,
        fetchAction,
        t,
        password,
      };
    },
  });
</script>
<style scoped>
  input[type='text'] {
    border: 1px solid #aaa !important;
  }
</style>
