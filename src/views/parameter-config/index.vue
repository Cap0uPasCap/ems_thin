<template>
  <PageWrapper :title="t('parameter-config.title')">
    <template #footer>
      <a-tabs default-active-key="1" @change="tabClick">
        <a-tab-pane key="general" :tab="t('parameter-config.tab.tabName.general')" />
        <a-tab-pane
          key="cell-basic-config"
          :tab="t('parameter-config.tab.tabName.cellBasicConfig')"
        />
        <a-tab-pane
          key="cell-advanced-config"
          :tab="t('parameter-config.tab.tabName.cellAdvancedConfig')"
        />
      </a-tabs>
    </template>
    <General v-if="currentTabKey === 'general'" />
    <cell-basic-config v-if="currentTabKey === 'cell-basic-config'" />
    <cell-advanced-config v-if="currentTabKey === 'cell-advanced-config'" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Divider, Card, Tabs } from 'ant-design-vue';
  import General from './general/index.vue';
  import CellBasicConfig from './cell-basic-config/index.vue';
  import CellAdvancedConfig from './cell-advanced-config/index.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  export default defineComponent({
    components: {
      PageWrapper,
      General,
      CellBasicConfig,
      CellAdvancedConfig,
      [Divider.name]: Divider,
      [Card.name]: Card,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      const { t } = useI18n();
      let currentTabKey = ref<string>('general');
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
