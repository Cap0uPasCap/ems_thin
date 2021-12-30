<template>
  <Cell :configData="configData" />
  <link-adaptation :configData="configData" />
  <function-control :configData="configData" />
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import FunctionControl from './function-control.vue';
  import Cell from './cell.vue';
  import LinkAdaptation from './link-adaptation.vue';
  import { getCellBaseConfig } from '/@/api/parameter-config';
  export default defineComponent({
    components: { Cell, FunctionControl, LinkAdaptation },
    setup() {
      let configData = ref<any>([]);
      onMounted(() => {
        getConfigData();
      });
      async function getConfigData() {
        const data = await getCellBaseConfig();
        configData.value = data.data.cellBaseConfigList;
        console.log('🚀data👉👉', data.data.cellBaseConfigList);
      }
      return {
        getConfigData,
        configData,
      };
    },
  });
</script>
