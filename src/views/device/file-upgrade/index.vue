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
      :gutter="16"
      align="middle"
      class="bg-white"
      justify="space-around"
      style="padding: 50px 100px 150px"
    >
      <Col v-for="item in fileTypeList" :key="item.fileName" :span="9">
        <CollapseContainer :title="item.fileName">
          <Button @click="handleDownloadClick(item.fileName)">
            {{ t('device.fileUpgrade.downloadBtnText') }}
          </Button>
          <Upload
            :action="
              isDev ? '/api/file/upload/deviceConf' : '/restful-agent/file/upload/deviceConf'
            "
            :before-upload="beforeUpload"
            :file-list="item.fileList"
            :show-upload-list="showUploadList"
            :headers="headers"
            :multiple="false"
            @change="handleChange"
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
  const { createMessage } = useMessage();
  const isDev = process.env.NODE_ENV === 'development';
  let isUploaded = false;
  const showUploadList = { showRemoveIcon: false };
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
              const data = await reboot();
              const { status, message } = data;
              if (status === 1) {
                createMessage.success(message);
              } else {
                createMessage.error(message);
              }
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

      function downloadFn(data, fileName) {
        const b = new Blob([data]);
        const url = URL.createObjectURL(b);
        const isFirefox = navigator.userAgent.toUpperCase().indexOf('FIREFOX') !== -1;
        if (isFirefox) {
          window.open(url, '_blank');
          return null;
        }
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
      }

      /**
       * @desc 根据 FileReader 函数 判断当前data是否为二进制文件流 是直接下载文件 不是则返回提示
       * @param data 二进制文件流
       * @param fileName 文件名
       */
      function downloadSwitch(data, fileName) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            //对于二进制文件json化会报错，这里我用try catch简单捕获异常，不影响正常流程
            const msg = JSON.parse(e.target.result);
            if (msg?.status === 100) {
              useUserStore().setToken(undefined);
              useUserStore().logout(true);
            }
            createMessage.error(msg.message);
          } catch (error) {
            return downloadFn(data, fileName);
          }
        };
        reader.readAsText(data);
      }

      async function handleDownloadClick(fileName) {
        const data = await download(fileName);
        downloadSwitch(data, fileName);
      }

      /**
       * @desc  上传组件文件状态改变的回调函数
       * @param  file 当前操作的文件对象
       * @param  fileList  当前的文件列表
       * @param  event  上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持
       */
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
      /**
       * @desc  对于不经过处理直接返回的接口信息进行处理
       * @param  status 1 代表成功 100 token 失效 其他 错误信息
       * @param  message
       */
      function responseJudgment(status, message) {
        switch (status) {
          case 0:
            createMessage.success(message);
            break;
          case 100:
            createMessage.error(message);
            useUserStore().setToken(undefined);
            useUserStore().logout(true);
            break;
          default:
            createMessage.error(message);
        }
      }

      function rebootClick() {
        Modal.confirm({
          title: t('device.fileUpgrade.rebootTip'),
          okText: t('device.fileUpgrade.okText'),
          cancelText: t('device.fileUpgrade.cancelText'),
          onOk: async () => {
            const data = await reboot();
            const { status, message } = data;
            await responseJudgment(status, message);
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
        showUploadList,
        headers,
      };
    },
  });
</script>
