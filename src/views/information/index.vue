<!--
 * @Description: 设备信息
 * @Author: stay foolish
 * @Date: 2021/12/7/0007
-->
<template>
  <PageWrapper :title="t('information.title.device')">
    <div class="vben-collapse-container enter-y">
      <div class="vben-collapse-container__header px-2 py-5">
        <span class="vben-basic-title vben-basic-title-normal">
          {{ t('information.title.hardware') }}
        </span>
        <div class="vben-collapse-container__action"></div>
      </div>
      <div class="p-2">
        <div class="vben-collapse-container__body">
          <div
            class="
              ant-descriptions ant-descriptions-small ant-descriptions-bordered
              vben-description
            "
          >
            <div class="ant-descriptions-view">
              <table>
                <tbody>
                  <tr class="ant-descriptions-row">
                    <th class="ant-descriptions-item-label" colspan="1">
                      <div class="min_width_100">{{ t('information.modelName') }}</div>
                    </th>
                    <td class="ant-descriptions-item-content" colspan="1">
                      <div class="min_width_100">{{ info.modelName }}</div>
                    </td>
                  </tr>
                  <tr class="ant-descriptions-row">
                    <th class="ant-descriptions-item-label" colspan="1">
                      <div class="min_width_100">{{ t('information.manufacturer') }}</div>
                    </th>
                    <td class="ant-descriptions-item-content" colspan="1">
                      <div class="min_width_200">{{ info.manufacturer }}</div>
                    </td>
                  </tr>
                  <tr class="ant-descriptions-row">
                    <th class="ant-descriptions-item-label" colspan="1">
                      <div class="min_width_100">{{ t('information.manufacturerOui') }}</div>
                    </th>
                    <td class="ant-descriptions-item-content" colspan="1">
                      <span v-if="!ouiShow">
                        <span style="margin-right: 5px; float: left; min-width: 70px">
                          {{ info.manufacturerOui }}
                        </span>
                        <EditOutlined
                          style="cursor: pointer"
                          @click="editClick('manufacturerOui', info.manufacturerOui)"
                        />
                      </span>
                      <span v-else>
                        <Input
                          v-model:value="info.manufacturerOui"
                          size="small"
                          style="width: 120px; margin-right: 10px"
                        />
                        <CheckCircleOutlined
                          style="cursor: pointer; transform: scale(1.2); margin-right: 10px"
                          @click="setParameterClick('manufacturerOui', info.manufacturerOui)"
                        />
                        <CloseCircleOutlined
                          style="cursor: pointer; transform: scale(1.2)"
                          @click="cancelClick('manufacturerOui')"
                        /> </span
                    ></td>
                  </tr>
                  <tr class="ant-descriptions-row">
                    <th class="ant-descriptions-item-label" colspan="1">
                      <div class="min_width_100">
                        {{ t('information.serialNumber') }}
                      </div>
                    </th>
                    <td class="ant-descriptions-item-content" colspan="1">
                      <span v-if="!serialShow">
                        <span style="margin-right: 5px; float: left; min-width: 70px">{{
                          info.serialNumber
                        }}</span>
                        <EditOutlined
                          style="cursor: pointer"
                          @click="editClick('serialNumber', info.serialNumber)"
                        />
                      </span>
                      <span v-else>
                        <Input
                          v-model:value="info.serialNumber"
                          size="small"
                          style="width: 120px; margin-right: 10px"
                        />
                        <CheckCircleOutlined
                          style="cursor: pointer; transform: scale(1.2); margin-right: 10px"
                          @click="setParameterClick('serialNumber', info.serialNumber)"
                        />
                        <CloseCircleOutlined
                          style="cursor: pointer; transform: scale(1.2)"
                          @click="cancelClick('serialNumber')"
                        /> </span
                    ></td>
                  </tr>
                  <tr class="ant-descriptions-row">
                    <th class="ant-descriptions-item-label" colspan="1">
                      <div class="min_width_100">{{ t('information.productClass') }}</div>
                    </th>
                    <td class="ant-descriptions-item-content" colspan="1">
                      <div class="min_width_200">{{ info.productClass }}</div>
                    </td>
                  </tr>
                  <tr class="ant-descriptions-row">
                    <th class="ant-descriptions-item-label" colspan="1">
                      <div class="min_width_100">{{ t('information.hardwareVersion') }}</div>
                    </th>
                    <td class="ant-descriptions-item-content" colspan="1">
                      <div class="min_width_200">
                        <span class="ant-tag ant-tag-blue">
                          {{ info.hardwareVersion }}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Description
      :bordered="true"
      :column="1"
      :data="info"
      :schema="softwareSchema"
      :title="t('information.title.software')"
      class="my-4 enter-y"
      size="small"
    />
    <Description
      :bordered="true"
      :column="1"
      :data="info"
      :schema="runtimeSchema"
      :title="t('information.title.runtime')"
      class="enter-y"
      size="small"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { getInformation, setInformation } from '/@/api/information';
  import { Description } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { defineComponent, onMounted, ref } from 'vue';
  import { hardwareSchema, runtimeSchema, softwareSchema } from './data';
  import { EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
  import { Input } from 'ant-design-vue';

  export default defineComponent({
    components: {
      Description,
      PageWrapper,
      EditOutlined,
      CheckCircleOutlined,
      CloseCircleOutlined,
      Input,
    },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();

      const info = ref({
        firstUseDate: '',
        platform: '',
        softwareVersion: '',
        modelName: '',
        manufacturerOui: '',
        manufacturer: '',
        serialNumber: '',
        productClass: '',
        hardwareVersion: '',
      });

      /**
       * @desc   获取设备信息
       * @return {Object} 设备信息
       */
      async function getInfo() {
        const { data } = await getInformation();
        for (const infoDataKey in data) {
          if (data.hasOwnProperty(infoDataKey)) {
            info.value[infoDataKey] = data[infoDataKey];
          }
        }
      }
      /**
       * @desc
       * @param  serialShow 序列号字段输入框是否显示
       * @param  serialFakerValue 序列号原始值
       * @param  ouiShow 厂商OUI字段输入框是否显示
       * @param  ouiFakerValue 厂商OUI原始值
       * @function editClick edit图标点击事件
       * @function cancelClick cancel图标点击事件
       * @function setParameterClick right图标点击事件
       */
      let serialShow = ref<boolean>(false);
      let serialFakerValue = ref<string>('');
      let ouiShow = ref<boolean>(false);
      let ouiFakerValue = ref<string>('');
      function editClick(type, value) {
        if (type === 'serialNumber') {
          serialFakerValue.value = value;
          serialShow.value = true;
        } else {
          ouiFakerValue.value = value;
          ouiShow.value = true;
        }
      }
      function cancelClick(type) {
        if (type === 'serialNumber') {
          info.value.serialNumber = serialFakerValue.value;
          serialShow.value = false;
        } else {
          info.value.manufacturerOui = ouiFakerValue.value;
          ouiShow.value = false;
        }
      }
      async function setParameterClick(type, value) {
        const paramNameOption = {
          manufacturerOui: 'InternetGatewayDevice.DeviceInfo.MU.ManufacturerOUI',
          serialNumber: 'InternetGatewayDevice.DeviceInfo.MU.SerialNumber',
        };
        const data = await setInformation({
          parameterList: [
            {
              name: paramNameOption[type],
              value: value,
            },
          ],
        });
        const { status, message } = data;
        await responseJudgment(status, message);
        if (type === 'serialNumber') {
          serialShow.value = false;
        } else {
          ouiShow.value = false;
        }
        await getInfo();
      }

      /**
       * @desc  对于不经过处理直接返回的接口信息进行处理
       * @param  status 0 代表成功 100 token 失效 其他 错误信息
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

      onMounted(() => {
        getInfo();
      });

      return {
        t,
        info,
        editClick,
        cancelClick,
        ouiShow,
        serialShow,
        ouiFakerValue,
        serialFakerValue,
        hardwareSchema,
        softwareSchema,
        setParameterClick,
        runtimeSchema,
      };
    },
  });
</script>
<style lang="less" scoped>
  .min_width_100 {
    min-width: 100px;
  }

  .min_width_200 {
    min-width: 200px;
  }
</style>
