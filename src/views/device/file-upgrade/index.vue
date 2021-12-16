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
    <Row
      justify="space-around"
      align="middle"
      class="bg-white"
      :gutter="16"
      style="padding: 50px 100px 150px"
    >
      <Col v-for="item in fileTypeList" :key="item.fileName" :span="9">
        <CollapseContainer :title="item.fileName">
          <Button @click="handleDownloadClick(item.fileName)">
            {{ t('device.fileUpgrade.downloadBtnText') }}
          </Button>
          <Upload
            :headers="headers"
            :multiple="false"
            :before-upload="beforeUpload"
            :action="
              isDev ? '/api/file/upload/deviceConf' : '/restful-agent/file/upload/deviceConf'
            "
            @change="handleChange"
            :file-list="item.fileList"
          >
            <Button @click="handleClick(item)"> {{ t('device.fileUpgrade.uploadBtnText') }}</Button>
          </Upload>
        </CollapseContainer>
      </Col>
    </Row>
  </PageWrapper>
</template>
<script lang="ts">
  import { reboot } from '/@/api/device/command';
  import { useModal } from '/@/components/Modal';
  import { defineComponent, ref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { CollapseContainer } from '/@/components/Container';
  import { PageWrapper } from '/@/components/Page';
  import { Upload, Modal, Col, Row } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { Button } from '/@/components/Button';
  import { download } from '/@/api/device/file-upgrade';
  import { useI18n } from '/@/hooks/web/useI18n';
  const isDev = process.env.NODE_ENV === 'development';
  let isUploaded = false;

  const { t } = useI18n();
  export default defineComponent({
    components: {
      PageWrapper,
      Upload,
      Col,
      Row,
      Button,
      CollapseContainer,
    },
    /*
     * 离开当前页面前询问使用者是否执行重启操作
     * */
    beforeRouteLeave(to, _, next) {
      if (to.params.status) {
        isUploaded = false;
        next();
      } else {
        if (isUploaded) {
          Modal.confirm({
            title: t('device.fileUpgrade.leaveRebootTip'),
            okText: t('device.fileUpgrade.okText'),
            cancelText: t('device.fileUpgrade.cancelText'),
            onOk: async () => {
              await reboot();
              isUploaded = false;
              next();
            },
            onCancel: () => {
              isUploaded = false;
              next();
            },
          });
        } else {
          isUploaded = false;
          next();
        }
      }
    },
    setup() {
      const [registerModal] = useModal();
      const { createMessage } = useMessage();
      let currentSelectFileName = ref<string>('');
      const headers = {
        ['X-ZX-TOKEN']: useUserStore().getToken,
      };
      let fileTypeList = ref<any>([
        {
          fileName: 'TR196_gNodeB_DU_Data_Model.xml',
          fileList: [],
        },
        {
          fileName: 'Proprietary_gNodeB_DU_Data_Model.xml',
          fileList: [],
        },
        {
          fileName: 'TR196_gNodeB_CU_Data_Model.xml',
          fileList: [],
        },
        {
          fileName: 'Proprietary_gNodeB_CU_Data_Model.xml',
          fileList: [],
        },
        {
          fileName: 'start_gnb.sh',
          fileList: [],
        },
        {
          fileName: 'l1_run.sh',
          fileList: [],
        },
        {
          fileName: 'phycfg_radio_sub6_4ant.xml',
          fileList: [],
        },
        {
          fileName: 'phycfg_radio_sub6_2ant.xml',
          fileList: [],
        },
        {
          fileName: 'Monitor_gNodeB_Data.xml',
          fileList: [],
        },
        {
          fileName: 'common.xml',
          fileList: [],
        },
      ]);
      function beforeUpload(file) {
        if (file.name !== currentSelectFileName.value) {
          file = null;
          createMessage.error(t('device.fileUpgrade.uploadFailedTip'));
          return false;
        } else {
          return true;
        }
      }
      function handleClick(file) {
        currentSelectFileName.value = file.fileName;
      }
      async function handleDownloadClick(fileName) {
        let URL = window.URL || window.webkitURL;
        const data = await download(fileName);
        console.log('🚀data👉👉', data);
        let objectUrl = URL.createObjectURL(data);
        let a = document.createElement('a');
        a.href = objectUrl; // 文件流生成的url
        a.download = fileName; // 文件名
        document.body.appendChild(a);
        a.click();
        a.remove();
        // window.open(objectUrl, '_blank');
      }
      function handleChange({ file, fileList }) {
        if (file.name === currentSelectFileName.value) {
          let fileListData = [...fileList];
          fileListData = fileListData.slice(-1);
          fileListData = fileListData.map((file) => {
            if (file.response) {
              file.name = file.response.data;
              createMessage.success(file.response.message);
            }
            return file;
          });
          fileTypeList.value.forEach((e) => {
            if (e.fileName === currentSelectFileName.value) {
              e.fileList = fileListData;
            }
          });
          isUploaded = true;
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
        handleDownloadClick,
        currentSelectFileName,
        fileTypeList,
        registerModal,
        beforeUpload,
        isDev,
        isUploaded,
        headers,
      };
    },
  });
</script>
