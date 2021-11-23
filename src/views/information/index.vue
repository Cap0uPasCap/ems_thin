<template>
  <PageWrapper :title="t('information.title.device')">
    <Description
      :bordered="true"
      :column="1"
      :data="info"
      :schema="hardwareSchema"
      :title="t('information.title.hardware')"
      class="enter-y"
      size="small"
    />
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
  import { getInformation } from '/@/api/information';
  import { Description } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { defineComponent, onMounted, ref } from 'vue';
  import { hardwareSchema, runtimeSchema, softwareSchema } from './data';

  export default defineComponent({
    components: { Description, PageWrapper },
    setup() {
      const { t } = useI18n();
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

      async function getInfo() {
        const infoData = await getInformation();
        for (const infoDataKey in infoData) {
          if (infoData.hasOwnProperty(infoDataKey)) {
            info.value[infoDataKey] = infoData[infoDataKey];
          }
        }
      }

      onMounted(() => {
        getInfo();
      });
      return {
        t,
        info,
        hardwareSchema,
        softwareSchema,
        runtimeSchema,
      };
    },
  });
</script>
