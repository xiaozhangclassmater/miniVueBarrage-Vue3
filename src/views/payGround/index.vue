<template>
  <!-- <miniVueBarrage   v-model="barrages" fullScreen :bgColor="'111'" /> -->
  <div class="views">
    <div class="header">大会上大肆夸奖德哈卡</div>
    <div class="list" ref="bankListRef">
      <ul>
        <li>信用卡</li>
        <li>信用卡</li>
        <li>信用卡</li>
        <li>信用卡</li>
      </ul>
    </div>

    <div @click.stop="clickHandle">111111</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const bankListRef = ref<HTMLElement>();

// import { miniVueBarrage } from '../../../dist/miniVueBarrage';
// import '../../../dist/miniVueBarrage/lib/index.css';

// import { barrageDatas } from '../../../packages/mock/index';
// const barrages = [...barrageDatas]
window.addEventListener("click", (e) => {
  // const el = bankListRef.value?.getBoundingClientRect()
  // if(e.y - el?.top! > bankListRef.value?.clientHeight!){
  //   alert("你点击了外面")
  // }else{
  //   alert("你点击了里面")
  // }
  console.log("e", e.composedPath());
});
const clickHandle = () => {};
</script>

<style scoped lang="less">
.views {
  height: 100vh;
  width: 100%;
  background-color: #cfc;
  .header {
    height: 50px;
  }
  .list {
    background-color: #ddd;
  }
  ul > li {
    display: flex;
    align-items: center;
    height: 50px;
  }
}
</style>
