<template>
  <PageWrapper contentBackground :title="t('information.title.device')">
    <Description
      :bordered="true"
      :column="1"
      :data="info"
      :schema="hardwareSchema"
      size="small"
      :title="t('information.title.hardware')"
    />
    <Divider />
    <Description
      :bordered="true"
      :column="1"
      :data="info"
      :schema="softwareSchema"
      size="small"
      :title="t('information.title.software')"
    />
    <Divider />
    <Description
      :bordered="true"
      :column="1"
      :data="info"
      :schema="runtimeSchema"
      size="small"
      :title="t('information.title.runtime')"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { getInformation } from '/@/api/information';
  import { Description } from '/@/components/Description';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Divider } from 'ant-design-vue';
  import { defineComponent, onMounted, ref } from 'vue';
  import { hardwareSchema, runtimeSchema, softwareSchema } from './data';

  export default defineComponent({
    components: { Description, PageWrapper, Divider },
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
