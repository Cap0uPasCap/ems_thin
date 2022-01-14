<template>
  <NetworkCard />
  <IPHost />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import NetworkCard from './network-card.vue';
  import IPHost from './IP-host.vue';

  export default defineComponent({
    components: { NetworkCard, IPHost },
  });
</script>
