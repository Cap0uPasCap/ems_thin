<template>
  <PageWrapper title="网管配置">
    <template #footer>
      <a-tabs default-active-key="1" @change="tabClick">
        <a-tab-pane key="general" tab="IP配置" />
      </a-tabs>
    </template>
    <IP v-if="currentTabKey === 'IP'" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Divider, Card, Tabs } from 'ant-design-vue';
  import IP from './IP/index.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  export default defineComponent({
    components: {
      PageWrapper,
      IP,
      [Divider.name]: Divider,
      [Card.name]: Card,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      const { t } = useI18n();
      let currentTabKey = ref<string>('IP');
      function tabClick(key) {
        currentTabKey.value = key;
      }

      return {
        t,
        tabClick,
        currentTabKey,
      };
    },
  });
</script>
