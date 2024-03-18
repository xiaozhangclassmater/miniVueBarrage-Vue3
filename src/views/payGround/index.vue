<template>
  <miniVueBarrage :barrages="barrages"/>
</template>

<script lang="ts" setup>
import miniVueBarrage from '../../../packages/components/minivueBarrage/src/index.vue';
const barrages = [
  {
    content: '的撒好看的'
  }
]
</script>

<style scoped></style>
