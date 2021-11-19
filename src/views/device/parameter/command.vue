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
  import { reactive, ref } from 'vue';
  import { Card, Button } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Loading } from '/@/components/Loading';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { reboot, factoryReset } from '/@/api/device/command';

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

  async function rebootClick() {
    compState.loading = true;
    await reboot();
    compState.loading = false;
  }

  async function factoryResetClick() {
    compState.loading = true;
    await factoryReset();
    compState.loading = false;
  }
</script>
