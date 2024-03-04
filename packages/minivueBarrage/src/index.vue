<template>
  <div class="barrage-wapper"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import { BarrageManager } from './Factory';
import { BarrageItem } from './types';
export default defineComponent({
  name: 'miniVueBarrage',
  props: {
    barrages: {
      type: Array<BarrageItem>,
      default: ()=>([])
    }
  },
  emits: ["update:barrages"],
  setup(props ,{ expose  }){
    const BarrageInstance = new BarrageManager()
    function init () {
      setInitData()
      // resizeAddEventListener()
    }
    /**
     * 设置初始化数据
     */
    function setInitData() {
    }
    /**
     * 组件挂在生命周期回调
     */
    function lcMountedCallback (){
      init()
    }
    watch(() => props.barrages , (newVal) => {
      if(newVal?.length === 0){
        // 如果 没有弹幕 则 不操作
        return
      }
      BarrageInstance.set(newVal)
    })
    onMounted(lcMountedCallback)
    expose({
      
    })
  }
})
</script>

<style scoped lang="less">
.barrage-wapper{
  width: 2rem;
  height: 2rem;
  background-image: -webkit-linear-gradient(315deg, #42d392 25%, #647eff); 
}
</style>