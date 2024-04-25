<template>
  <miniVueBarrage :barrages="barrages" fullScreen/>
  </template>

<script lang="ts" setup>
import { miniVueBarrage } from '../../../dist/miniVueBarrage';
import '../../../dist/miniVueBarrage/assets/minivueBarrage.css';

// import { miniVueBarrage } from '../../../dist/miniVueBarrage';

import { barrageDatas } from '../../../packages/mock/index';
const barrages = [...barrageDatas]
// console.log('miniVueBarrage' , miniVueBarrage);
</script>

<style scoped lang="less">

</style>
