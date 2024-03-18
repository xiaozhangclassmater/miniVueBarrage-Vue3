<template>
  <div class="barrage-wapper" ref="barrageWapperRef">
    <div class="top-barrage-wapper" ref="topWapperRef"></div>
    <div class="bottom-barrage-wapper" ref="bottomWapperRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { BarrageManager } from './Factory';
import { BarrageItem } from './types';
export default defineComponent({
  name: 'miniVueBarrage',
  props: {
    barrages: {
      type: Array<BarrageItem>,
      default: ()=>([])
    },
    // 你希望的弹道的行高
    barrageLineBlockHeight: {
      type : Number,
      default: 0
    },
    barrageLineBlockCount: {
      type: Number,
      default: 6
    },
    // 是否需要全屏弹幕
    fullScreen: {
      type : Boolean,
      default : true
    },
    delay: {
      type : Number,
      default: 1
    }
  },
  emits: ["update:barrages"],
  setup(props ,{ expose  }){
    const barrageWapperRef = ref<HTMLDivElement | null>(null)
    const topWapperRef = ref<HTMLDivElement | null>(null)
    const bottomWapperRef = ref<HTMLDivElement | null>(null)
    // const renderBarrages = ref([]) // 负责渲染的弹幕数据
    const BarrageInstance = new BarrageManager()
    function toScriptCreateBarrageItem ({ content }) {
      const barrageElement = document.createElement('div')
      barrageElement.classList.add('item-wapper')
      barrageElement.classList.add('running')
      barrageElement.innerHTML = content
      // barrageElement.style.left = `${barrageWapperRef.value?.clientWidth || 0}px`
      setElementAttrs(barrageElement)
      topWapperRef.value?.appendChild(barrageElement)
    }
    function setElementAttrs (barrageElement: HTMLDivElement){
      barrageElement.style.setProperty('--wapperClientWidth' ,`-${(barrageWapperRef.value?.clientWidth || 0)  + barrageElement.offsetWidth}px`)
    }
    /**
     * 设置初始化数据
     */
    function setInitData() {

    }
    // 循环创建弹幕
    function loopCreate () {
      const renders = BarrageInstance.get()
      console.log('renders' ,renders);
      for (let i = 0; i < renders.length; i++) {
        toScriptCreateBarrageItem({ content : '我是运营弹幕'})
      }
    }
    /**
     * 组件挂在生命周期回调
     */
    function lcMountedCallback (){
      setInitData()
      loopCreate()
    }
    watch(() => props.barrages , (newVal) => {
      // 如果 没有弹幕 则 不操作
      if(newVal?.length === 0) return
      BarrageInstance.set(newVal)
    } , { deep: true , immediate: true })
    onMounted(lcMountedCallback)
    expose({})
    return {
      barrageWapperRef,
      topWapperRef,
      bottomWapperRef
    }
  }
})
</script>

<style scoped lang="less" >
@keyframes moveLeft {
  from{
    transform: translateX(0px);
  }
  to{
    transform: translateX(var(--wapperClientWidth));
  }
}
.barrage-wapper{
  width: 100%;
  height: 300px;
  background-image: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  padding: 20px 0px;
  .top-barrage-wapper,.bottom-barrage-wapper{
    height: 50%;
    :deep(.item-wapper){
      position: absolute;
      right: 0;
      display: inline-flex;
      align-items: center;
      height: 30px;
      font-size: 14px;
      border-radius: 20px;
      padding: 10px;
      box-sizing: border-box;
      // opacity: 0;
      background-color: #ccc;
    }
    :deep(.running){
      animation: linear moveLeft 3s;
    }
  }
}
</style>
