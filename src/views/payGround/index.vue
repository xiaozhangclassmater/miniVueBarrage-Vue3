<template>
  <miniVueBarrage :barrages="barrages"/>
  </template>

<script lang="ts" setup>
import miniVueBarrage from '../../../packages/components/minivueBarrage/src/index.vue';
const barrages = [
  {
    content: '的撒好看的'
  },{
    content: '1'
  },{
    content: '2'
  },{
    content: '3'
  },{
    content: '4s'
  }
]
</script>

<style scoped lang="less">

</style>
