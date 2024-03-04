<template>
  <router-view v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component"></component>
    </KeepAlive>
  </router-view>
</template>

<script lang="ts" setup>
// import miniVueBarrage from '../packages';

</script>

<style scoped></style>
