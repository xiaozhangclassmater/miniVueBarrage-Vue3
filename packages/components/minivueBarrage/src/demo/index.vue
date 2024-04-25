<template>
  <div>
    <miniVueBarrage :barrages="barrages" fullScreen>
      <template #icon>
        <div class="icon"></div>
      </template>
    </miniVueBarrage>
  </div>
</template>

<script lang="ts" setup>
import { barrageDatas } from '../../../../mock';
import miniVueBarrage from '../index.vue';
const barrages = [...barrageDatas]
</script>

<style scoped lang="less">
.icon{
  width:22px;
  height: 22px;
  background: url('../assets/vue.png') no-repeat center center;
  background-size: 100% 100%
}
</style>
