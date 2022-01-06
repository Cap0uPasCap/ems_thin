<template>
  <Cell :configData="configData" @reload="getConfigData" />
  <link-adaptation :configData="configData" @reload="getConfigData" />
  <function-control :configData="configData" @reload="getConfigData" />
</template>
<script lang="ts">
  import { getCellBaseConfig } from '/@/api/parameter-config';
  import { defineComponent, onMounted, ref } from 'vue';
  import Cell from './cell.vue';
  import FunctionControl from './function-control.vue';
  import LinkAdaptation from './link-adaptation.vue';

  export default defineComponent({
    components: { Cell, FunctionControl, LinkAdaptation },
    setup() {
      let configData = ref<any>([]);
      onMounted(() => {
        getConfigData();
      });
      async function getConfigData() {
        configData.value = await getCellBaseConfig();
      }
      return {
        getConfigData,
        configData,
      };
    },
  });
</script>
