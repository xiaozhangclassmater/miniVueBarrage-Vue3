<template>
  <miniVueBarrage :barrages="barrages" fullScreen/>
  </template>

<script lang="ts" setup>
import miniVueBarrage from '../../../packages/components/minivueBarrage/src/index.vue';
import { barrageDatas } from '../../mock/index';
const barrages = [...barrageDatas]
</script>

<style scoped lang="less">

</style>
