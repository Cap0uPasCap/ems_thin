<template>
  <PageWrapper contentClass="flex" contentFullHeight dense fixedHeight>
    <BasicTable :searchInfo="searchInfo" @register="registerTable">
      <template #toolbar>
        <a-button @click="handleCreate" type="primary">{{ t('system.action.addText') }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="fetchAction(record)" />
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { message } from 'ant-design-vue';
  import { defineComponent, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getList, del, resetUserPassword } from '/@/api/system/user';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import AccountModal from './modal.vue';
  import { getSearchFormSchema, getColumns } from './user.data';
  // import { useGo } from '/@/hooks/web/usePage';

  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, AccountModal, TableAction },
    setup() {
      const { t } = useI18n();
      // const go = useGo();

      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
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
          console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 120,
          title: t('system.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function fetchAction(record) {
        return [
          {
            icon: 'clarity:note-edit-line',
            tooltip: t('system.action.editBtnTip'),
            onClick: handleEdit.bind(null, record),
          },
          {
            icon: 'ant-design:delete-outlined',
            color: 'error',
            tooltip: t('system.action.delBtnTip'),
            popConfirm: {
              title: t('system.action.delBtnConfirm'),
              confirm: handleDelete.bind(null, record),
            },
          },
          // {
          //   icon: 'ant-design:tool',
          //   // color: 'error',
          //   tooltip: t('system.action.editUserBtnTip'),
          //   onClick: handleEditPassword.bind(null, record),
          // },
          {
            icon: 'ant-design:undo',
            // color: 'error',
            tooltip: t('system.action.resetBtnTip'),
            popConfirm: {
              title: t('system.action.resetBtnConfirm'),
              confirm: handleReset.bind(null, record),
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
        console.log(record.id);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }
      // function handleEditPassword(record: Recordable) {
      //   console.log(record.id);
      //   openModal(true, {
      //     record,
      //     isEditPassword: true,
      //   });
      // }

      function handleDelete(record: Recordable) {
        del(record.id);
        message.success(t('system.msg.success'));
        reload();
      }

      function handleReset(record: Recordable) {
        resetUserPassword(record.id);
        message.success(t('system.msg.success'));
        reload();
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          const result = updateTableDataRecord(values.id, values);
          message.success(t('system.msg.success'));
          console.log(result);
        } else {
          reload();
        }
      }

      // function handleView(record: Recordable) {
      //     go('/system/account_detail/' + record.id);
      // }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleReset,
        handleSuccess,
        searchInfo,
        fetchAction,
        t,
      };
    },
  });
</script>
