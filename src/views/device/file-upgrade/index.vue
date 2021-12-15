<!--
 * @Description: 设备管理-文件升级
 * @Author: stay foolish
 * @Date: 2021/12/15
-->
<template>
  <PageWrapper :title="t('device.fileUpgrade.title')">
    <template #extra>
      <Button type="primary" @click="rebootClick">
        {{ t('device.fileUpgrade.rebootBtnText') }}
      </Button>
    </template>
    <CollapseContainer
      v-for="fileType in fileTypeList"
      :key="fileType"
      :title="fileType"
      style="padding: 0 35%"
    >
      <a-upload
        :headers="headers"
        :multiple="false"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        action="/api/file/upload/deviceConf"
        name="file"
        @change="handleChange"
      >
        <Button size="small" @click="handleClick(fileType)">
          {{ t('device.fileUpgrade.btnText') }}</Button
        >
      </a-upload>
    </CollapseContainer>
    <AccountModal @register="registerModal" />
  </PageWrapper>
</template>
<script lang="ts">
  import { reboot } from '/@/api/device/command';
  import { useModal } from '/@/components/Modal';
  import { defineComponent, ref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  import { Upload, Modal } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { Button } from '/@/components/Button';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();

  export default defineComponent({
    components: {
      PageWrapper,
      [Upload.name]: Upload,
      Button,
      CollapseContainer,
    },
    /*
     * 离开当前页面前询问使用者是否执行重启操作
     * */
    beforeRouteLeave(to, _, next) {
      if (to.params.status) {
        next();
      } else {
        Modal.confirm({
          title: t('device.fileUpgrade.leaveRebootTip'),
          okText: t('device.fileUpgrade.okText'),
          cancelText: t('device.fileUpgrade.cancelText'),
          onOk: async () => {
            await reboot();
            next();
          },
          onCancel: () => next(),
        });
      }
    },
    setup() {
      const [registerModal] = useModal();
      const { createMessage } = useMessage();
      const currentSelectFileName = ref<string>('');
      const headers = {
        ['X-ZX-TOKEN']: useUserStore().getToken,
      };
      const fileTypeList: String[] = [
        'TR196_gNodeB_DU_Data_Model.xml',
        'Proprietary_gNodeB_DU_Data_Model.xml',
        'TR196_gNodeB_CU_Data_Model.xml',
        'Proprietary_gNodeB_CU_Data_Model.xml',
        'start_gnb.sh',
        'l1_run.sh',
        'phycfg_radio_sub6_4ant.xml',
        'phycfg_radio_sub6_2ant.xml',
        'Monitor_gNodeB_Data.xml',
        'common.xml',
      ];
      function beforeUpload(file) {
        if (file.name !== currentSelectFileName.value) {
          createMessage.error(t('device.fileUpgrade.uploadFailedTip'));
        }
        return file.name === currentSelectFileName.value;
      }
      function handleClick(fileName) {
        currentSelectFileName.value = fileName;
      }
      function handleChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
          delete info.fileList;
        }
        if (info.file.status === 'done') {
          if (info.file.response) {
            console.log('🚀info.file👉👉', info);

            if (info.file.response.status === 0) {
              createMessage.success(info.file.response.message);
            } else {
              createMessage.error(info.file.response.message);
            }
          }
        } else if (info.file.status === 'error') {
          createMessage.error(`${info.file.name} file upload failed.`);
        }
      }
      function rebootClick() {
        Modal.confirm({
          title: t('device.fileUpgrade.rebootTip'),
          okText: t('device.fileUpgrade.okText'),
          cancelText: t('device.fileUpgrade.cancelText'),
          onOk: async () => {
            await reboot();
          },
          onCancel: () => {},
        });
      }
      return {
        t,
        handleChange,
        handleClick,
        rebootClick,
        currentSelectFileName,
        fileTypeList,
        registerModal,
        beforeUpload,
        headers,
      };
    },
  });
</script>
