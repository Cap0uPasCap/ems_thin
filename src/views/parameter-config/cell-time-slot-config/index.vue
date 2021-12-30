<template>
  <div class="p-4">
    <Pattern1 />
  </div>
  <!--  <div class="p-4">-->
  <!--    <Pattern2 />-->
  <!--  </div>-->
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Pattern1 from './pattern1.vue';
  // import Pattern2 from './pattern2.vue';

  export default defineComponent({
    components: { Pattern1 }, //Pattern2
  });
</script>
