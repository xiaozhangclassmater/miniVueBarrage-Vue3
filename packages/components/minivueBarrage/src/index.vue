<template>
  <div class="barrage-wapper" ref="barrageWapperRef">
    <div class="top-barrage-wapper" ref="topWapperRef"></div>
    <div class="bottom-barrage-wapper" ref="bottomWapperRef"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { BarrageManager } from './Factory';
import { BarrageItem } from './types';
import { randomNumber } from './util';
export default defineComponent({
  name: 'miniVueBarrage',
  props: {
    barrages: {
      type: Array<BarrageItem>,
      default: ()=>([])
    },
    // 是否需要全屏弹幕
    fullScreen: {
      type: Boolean,
      default : false
    },
    // 弹幕运行一屏的秒数
    delay: {
      type: Number,
      default: 8
    },
    // 创建频率的秒数
    createFrequencyTime: {
      type: Number,
      default: 0.2
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
    let lastIndex = -1 // 上一次生成的 index
    let clientWidthList: number[] = [] // 计算下一条弹幕应该在哪个弹道上生成
    const baseHeight = 40 // 弹幕默认的高度
    /**
     * @description 通过 js 创建弹幕实例
     * @param itemInstance
     */
    const maxLineCount = computed(() => {
      console.log('barrageWapperRef.value?.clientHeight' ,barrageWapperRef.value?.clientHeight);
      const count = barrageWapperRef.value?.clientHeight && Math.floor(barrageWapperRef.value?.clientHeight / baseHeight) || 0
      return props.fullScreen ? count : Math.ceil(count / 2)
    })
    const appendElement = (instance:HTMLDivElement , currentRowIndex ) => {
      console.log('currentRowIndex' , currentRowIndex);
      if(!props.fullScreen){ // 如果非全屏 则 直接 添加到 上层容器
        return topWapperRef.value?.appendChild(instance)
      }
      currentRowIndex >= maxLineCount.value / 2 ? bottomWapperRef.value?.appendChild(instance) : topWapperRef.value?.appendChild(instance)
    }
    const setElementAttrs = (barrageElement:HTMLDivElement , instance:BarrageItem) => {
      barrageElement.classList.add('item-wapper')
      barrageElement.innerText = instance.content
    }

    function toScriptCreateBarrageItem (itemInstance : BarrageItem , currentRowIndex: number) {
      /**
       * @description 计算添加 弹幕添加到哪个 弹道中
       */
      const calcAppendLineIndex = () => {
        if(!clientWidthList.every(item => item)){
          return currentRowIndex === 1 ? 10 : (baseHeight * currentRowIndex) - ((baseHeight - 10) / (maxLineCount.value - 1))
        }
        const minIndex = clientWidthList.findIndex(item => item === Math.min(...clientWidthList))
        console.log('minIndex' , minIndex);
        // if() return 0
        return minIndex
      }
      const top = currentRowIndex === 1 ? 10 : (baseHeight * currentRowIndex) - ((baseHeight - 10) / (maxLineCount.value - 1))
      const defaultItemInstance = {...itemInstance, top}
      const barrageElement = document.createElement('div')

      setElementAttrs(barrageElement , defaultItemInstance) // 设置元素的属性
      appendElement(barrageElement , currentRowIndex) // 添加弹幕到容器中
      setElementStyleAttrs(barrageElement , defaultItemInstance , currentRowIndex) // 设置弹幕的样式动画属性等
    }
    function setElementStyleAttrs (barrageElement: HTMLDivElement ,instance:BarrageItem , index: number){
      const elStyle = barrageElement.style
      const instanceClientWidth = barrageElement.clientWidth || 0
      const offsetRightValue = randomNumber() + instanceClientWidth
      clientWidthList[index - 1] = clientWidthList[index - 1] + instanceClientWidth // 将弹道的长度添加数组中
      console.log('clientWidthList' , clientWidthList);
      elStyle.right = `${-offsetRightValue}px`
      elStyle.top = `${instance.top}px`
        // 容器宽度 + 最初 right 偏移值的距离
      elStyle.setProperty('--wapperClientWidth' ,`-${(barrageWapperRef.value?.clientWidth || 0)  + offsetRightValue}px`)
      elStyle.animationName = 'moveLeft'
      // 运行一屏的弹幕时间 可以由单个 item 数据对象控制 也可以 用 组件 props 控制
      elStyle.animationDuration = `${instance.delay || props.delay}s`
      elStyle.animationTimingFunction = 'linear' // 设置弹幕的运行方式
    }
    /**
     * 设置初始化数据
     */
    function setInitData() {
      clientWidthList = new Array(maxLineCount.value).fill(0) // 初始化弹道宽度，下一次应该在何处插入
    }
    // 循环创建弹幕
    function loopCreate () {
      const renders = BarrageInstance.get()
      let curCreateIndex = 0 // 当前创建的索引总数 到第几条了
      let currentRowIndex = 1
      let item: BarrageItem | null = null
      const IntervalCallback = () => {
        if(curCreateIndex === renders.length){
          return clearInterval(timerId.value)
        }
        // const createIndexId = () => {
        //   return
        // }
        currentRowIndex = Math.ceil(randomNumber(1 , maxLineCount.value)) // 随机一个弹道生成弹幕
        // if(currentRowIndex === lastIndex){
        //   currentRowIndex = Math.ceil(randomNumber(1 , maxLineCount.value)) // 重新生成，
        // }
        for (let index = 0; index < props.createNum; index ++) {
          item = renders[curCreateIndex]
          toScriptCreateBarrageItem(item , currentRowIndex)
          curCreateIndex +=  1
          currentRowIndex += 1
        }
      }
      timerId.value = setInterval(IntervalCallback , props.createFrequencyTime * 1000)
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
  position: relative;
  width: 100%;
  height: 600px;
  background-image: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  padding: 20px 0px;
  overflow: hidden;

  .top-barrage-wapper,.bottom-barrage-wapper{
    width: 100%;
    height: 50%;

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
      // background-color: #ccc;
      background-image: linear-gradient(to right ,#647eff , #eeb518);
    }
  }
}
</style>