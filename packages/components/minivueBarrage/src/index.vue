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
      type: Number,
      default: 0
    },
    barrageLineBlockCount: {
      type: Number,
      default: 6
    },
    // 是否需要全屏弹幕
    fullScreen: {
      type: Boolean,
      default : true
    },
    delay: {
      type: Number,
      default: 1
    },
    // 创建频率的秒数
    createFrequencyTime: {
      type: Number,
      default: 2
    },
    createNum: {
      type: Number,
      default: 1
    }
  } ,
  emits: ["update:barrages"],
  setup(props ,{ expose  }){
    const barrageWapperRef = ref<HTMLDivElement | null>(null)
    const topWapperRef = ref<HTMLDivElement | null>(null)
    const bottomWapperRef = ref<HTMLDivElement | null>(null)
    const BarrageInstance = new BarrageManager()
    const timerId = ref<any>(null)
    function toScriptCreateBarrageItem ({ content }) {
      const barrageElement = document.createElement('div')
      barrageElement.classList.add('item-wapper')
      barrageElement.innerHTML = content
      setElementAttrs(barrageElement)
      topWapperRef.value?.appendChild(barrageElement)
    }
    function setElementAttrs (barrageElement: HTMLDivElement){
      const elStyle = barrageElement.style
      // 容器宽度 + 最初 left 偏移值的距离
      elStyle.setProperty('--wapperClientWidth' ,`-${(barrageWapperRef.value?.clientWidth || 0)  + 100}px`)
      elStyle.animationName = 'moveLeft'
      elStyle.animationDuration = '5s'
      elStyle.animationTimingFunction = 'linear'
    }
    /**
     * 设置初始化数据
     */
    function setInitData() {

    }
    // 循环创建弹幕
    function loopCreate () {
      const renders = BarrageInstance.get()
      let curCreateIndex = 0 // 当前创建的索引总数 到第几条了
      const IntervalCallback = () => {
        if(curCreateIndex === renders.length){
          return clearInterval(timerId.value)
        }
        for (let index = 0; index < props.createNum; index++) {
          const item = renders[curCreateIndex]
          toScriptCreateBarrageItem(item)
          curCreateIndex +=  1
        }
      }
      timerId.value = setInterval(IntervalCallback , props.createFrequencyTime * 1000 )
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
      BarrageInstance.set(newVal) // 设置数据到 管理类中统一管理
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
<style  lang="less" >
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
    position: relative;
    width: 100%;
    height: 50%;
    overflow: hidden;
    .item-wapper{
      position: absolute;
      right: -100px;
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
  }
}
</style>
