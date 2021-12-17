<!--
 * @Description: 设备管理-指令
 * @Author: stay foolish
 * @Date: 2021/12/7/0007
-->
<template>
  <PageWrapper :title="t('device.command.title')" contentBackground>
    <Card
      :active-tab-key="activeKey"
      :tab-list="tabListTitle"
      v-bind="$attrs"
      @tabChange="onTabChange"
    >
      <Button v-if="activeKey === 'factoryReset'" type="default" @click="factoryResetClick">
        {{ t('device.command.tab.factoryReset') }}
      </Button>
      <Button v-if="activeKey === 'reboot'" type="default" @click="rebootClick"
        >{{ t('device.command.tab.reboot') }}
      </Button>
      <Loading :absolute="compState.absolute" :loading="compState.loading" :tip="compState.tip" />
    </Card>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { useMessage } from '/@/hooks/web/useMessage';
  import { reactive, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card } from 'ant-design-vue';
  import { Button } from '/@/components/Button';
  import { Loading } from '/@/components/Loading';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { reboot, factoryReset } from '/@/api/device/command';
  const { createMessage } = useMessage();

  const { t } = useI18n();
  const activeKey = ref('factoryReset');

  const tabListTitle = [
    {
      key: 'factoryReset',
      tab: t('device.command.tab.factoryReset'),
    },
    {
      key: 'reboot',
      tab: t('device.command.tab.reboot'),
    },
  ];

  const compState = reactive({
    absolute: true,
    loading: false,
    tip: t('device.command.loadingTip'),
  });

  function onTabChange(key) {
    activeKey.value = key;
  }
  /**
   * @desc   重启按钮触发
   */
  async function rebootClick() {
    compState.loading = true;
    const data = await reboot();
    const { status, message } = data.data;
    if (status === 1) {
      createMessage.success(message);
    } else {
      createMessage.error(message);
    }
    compState.loading = false;
  }

  /**
   * @desc   恢复出厂设置按钮触发
   */
  async function factoryResetClick() {
    compState.loading = true;
    const data = await factoryReset();
    const { status, message } = data.data;
    if (status === 1) {
      createMessage.success(message);
    } else {
      createMessage.error(message);
    }
    compState.loading = false;
  }
</script>
