<template>
  <div class="barrage">
    danmuliebiai
  </div>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'miniVueBarrage',
  setup(props , context){
    console.log('props' , props);
    console.log('context' , context);
  }
})
</script>

<style scoped lang="less"></style>
