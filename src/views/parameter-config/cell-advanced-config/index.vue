<template>
  <div class="p-4">
    <Advanced />
  </div>
  <div class="p-4">
    <Pattern1 :configData="cellTimeslot1ConfigList" @reload="getConfigData" />
  </div>
  <div class="p-4">
    <Pattern2 :configData="cellTimeslot2ConfigList" @reload="getConfigData" />
  </div>
</template>
<script lang="ts">
  import { getCellTimeslotConfig } from '/@/api/parameter-config';
  import { defineComponent, onMounted, ref } from 'vue';
  import Advanced from './advanced.vue';
  import Pattern1 from './pattern1.vue';
  import Pattern2 from './pattern2.vue';
  export default defineComponent({
    components: { Advanced, Pattern1, Pattern2 },
    setup() {
      let cellTimeslot1ConfigList = ref<any>([]);
      let cellTimeslot2ConfigList = ref<any>([]);
      onMounted(() => {
        getConfigData();
      });
      async function getConfigData() {
        const data = await getCellTimeslotConfig();
        cellTimeslot1ConfigList.value = changeCellTypeToString(data?.cellTimeslot1ConfigList) || [];
        cellTimeslot2ConfigList.value = changeCellTypeToString(data?.cellTimeslot2ConfigList) || [];
      }

      function changeCellTypeToString(arr) {
        const list = [];
        if (!!arr && arr instanceof Array && arr?.length > 0) {
          arr.forEach((e) => {
            const obj: any = {};
            for (const i in e) {
              obj[i] = e[i] + '';
            }
            list.push(obj);
          });
        }
        return list;
      }
      return {
        getConfigData,
        cellTimeslot1ConfigList,
        cellTimeslot2ConfigList,
      };
    },
  });
</script>
