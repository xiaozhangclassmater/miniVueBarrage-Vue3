<template>
  <div class="barrage-wapper" ref="barrageWapperRef" :style="barrageWapperStyle">
    <div class="top-barrage-wapper" ref="topWapperRef"></div>
    <div class="bottom-barrage-wapper" ref="bottomWapperRef" ></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, render, watch } from 'vue';
import { denounce, errorCatchCallHandle, getStyleValue, isEmpty, unitToValue, useExpose } from '../../../utils';
import { CSSKEY, KEYGROUP, PLAYSTATEGROUP } from './constant';
import { BarrageManager, buildProps } from './Factory';
import { BarrageItem } from './types';
import { randomNumber } from './util';
export default defineComponent({
  name: 'miniVueBarrage',
  props: buildProps() ,
  emits: ["update:barrages" , "change" , "complete"],
  setup(props , { slots , expose , emit}){
    const baseBatchDestoryNum = 50 // 批量删除弹幕数量的基准值
    let curentFinishRunningNum = 0 // 当前弹幕完成运行的总数
    const barrageWapperRef = ref<HTMLDivElement | null>(null)
    const topWapperRef = ref<HTMLDivElement | null>(null)
    const bottomWapperRef = ref<HTMLDivElement | null>(null)
    let barrageElement: HTMLDivElement = document.createElement('div')
    let barrageIconElement: HTMLDivElement = document.createElement('div')
    const BarrageInstance = new BarrageManager()
    const timerId = ref<any>(null)
    let lastIndex = -1 // 上一次生成的 index
    let lastRecordIndex = -1
    let clientWidthList: number[] = [] // 计算下一条弹幕应该在哪个弹道上生成
    const baseHeight = 40 // 弹幕默认的高度
    const calcOpacity = computed(() => {
      if(!props.opacity) return '0'
      const opacityValue = Number(props.opacity) || 1
      return `${opacityValue > 1 ? opacityValue / 100 : opacityValue}`
    })
    const barrageWapperStyle = computed(() => {
      return props.showBarrage ? { display: 'block'} : { display: 'none' }
    })
    /**
     * @description 通过 js 创建弹幕实例
     * @param itemInstance
    */
    const maxLineCount = computed(() => {
      const paddingTopValue = Number(unitToValue(getStyleValue(barrageWapperRef.value! , 'paddingTop')))
      const paddingBottomValue = Number(unitToValue(getStyleValue(barrageWapperRef.value! , 'paddingBottom')))
      const paddigHeight = paddingTopValue + paddingBottomValue
      const count = barrageWapperRef.value?.clientHeight && Math.floor((barrageWapperRef.value?.clientHeight - paddigHeight) / baseHeight) || 0
      return props.fullScreen ? count : Math.ceil(count / 2)
    })
    const clearData = () => {
      emit("change" , { renderCount: 0 })
      lastIndex = -1
      lastRecordIndex = -1,
      clientWidthList = []
      curentFinishRunningNum = 0
      timerId.value = null
    }
    // 清空 弹幕
    const clear = () => {
      removeAllChildrenEl()
      timerId.value && clearInterval(timerId.value)
      clearData()
    }
    // 弹幕创建
    const create = (instance: BarrageItem) => {
      if(isEmpty(instance)){ // 传入的实例数据不存在 则 无法添加
        return
      }
      // 找到最小的数字弹道 进行添加
      let minIndex = clientWidthList.findIndex((item => (item === Math.min(...clientWidthList)))) || 1
      if(minIndex === lastIndex){  //如果 刚刚添加的位置 跟此 次查找的最小距离位置 相等 ，则 再找一个更合适的
        minIndex = clientWidthList.findIndex(((item , index) => (item === Math.min(...clientWidthList) && index !== lastIndex)))
      }
      lastIndex = minIndex
      toScriptCreateBarrageItem(instance , minIndex)
    }
    // 批量删除 弹幕元素
    const batchRemoveBarrageEl = () => {
      const allBarrages = [...topWapperRef.value?.childNodes!, ...bottomWapperRef.value?.childNodes!] as HTMLDivElement[]
      if(!allBarrages.length) return // 如果没有 子节点 则不操作
      const awaitDestoryEls = allBarrages.filter(item  => item.getAttribute(KEYGROUP.RUNNINGSTATE) === PLAYSTATEGROUP.END) // 等待被批量删除的 弹幕元素数组
      for (const el of awaitDestoryEls) {
        el.remove()
      }
      //批量删除完成后 重置 当前完成运行的总数
      curentFinishRunningNum = 0
    }
    // 暂停所有弹幕
    const pausedAllBarrage = () => {
      const allBarrages = [...topWapperRef.value?.childNodes!, ...bottomWapperRef.value?.childNodes!] as HTMLDivElement[]
      if(!allBarrages.length) return // 如果没有 子节点 则不操作
      for (const el of allBarrages) {
        el.style.animationPlayState = props.pausedFlag ? PLAYSTATEGROUP.PAUSED : PLAYSTATEGROUP.RUNNING
      }
      if(props.pausedFlag){
        clearInterval(timerId.value)
      }else{
        loopCreate(lastRecordIndex)
      }
    }
    // 改变弹幕颜色
    const changeColor = (colorStr: string , id: number) => {
      if(typeof colorStr !== 'string'){
        return errorCatchCallHandle("请传入字符串类型" , 'warning')
      }
      const allBarrages = [...topWapperRef.value?.childNodes!, ...bottomWapperRef.value?.childNodes!] as HTMLDivElement[]
      if(!allBarrages.length) return // 如果没有 子节点 则 不要设置 颜色
      if(id){
        const renderDatas = BarrageInstance.get() // 获取所有弹幕数据
        const elementIndex = renderDatas.findIndex(item => item.id === id)
        const elementNode = allBarrages[elementIndex]  || null
        if(!elementNode) return
        elementNode.style.setProperty(CSSKEY.COLOR , `${colorStr || props.color}`)
      }else{
        for (const el of allBarrages) {
          // 循环设置 每个节点的 透明度
          el.style.setProperty(CSSKEY.COLOR , `${colorStr || props.color}`)
        }
      }
    }
    // 关闭弹幕
    const close = () => {
      timerId.value && clearInterval(timerId.value)
      BarrageInstance._close()
    }
    // 重置弹幕
    const reset = () => {
      emit("change" , { renderCount: 0 })
      removeAllChildrenEl()
      clearInterval(timerId.value)
      clearData()
      _init()
    }
    const start = () => {
      if(!timerId.value){
        clearData()
        _init()
      }
    }
    // 移除所有 弹幕 children 元素
    function removeAllChildrenEl () {
      const allBarrages = [...topWapperRef.value?.childNodes!, ...bottomWapperRef.value?.childNodes!] as HTMLDivElement[]
      if(!allBarrages.length) return // 如果没有 子节点 则不操作
      for (const item of allBarrages) {
        item.remove()
      }
    }
    /**
     *
     * @param id 设置透明度 弹幕的id
     * @param opacity 设置的透明度的值 max 1 ,  min 0
     * @description
     * setBarrageOpacity 函数 提供设置所有节点透明度 和单一节点透明度作用
     */
    const setBarrageOpacity = (id?: number , opacity?: number | string  ) => {
      const allBarrages = [...topWapperRef.value?.childNodes!, ...bottomWapperRef.value?.childNodes!] as HTMLDivElement[]
      if(!allBarrages.length) return // 如果没有 子节点 则 不要设置 透明属性
      if(id){ // 设置单个节点 透明度
        const renderDatas = BarrageInstance.get() // 获取所有弹幕数据
        const elementIndex = renderDatas.findIndex(item => item.id === id)
        const elementNode = allBarrages[elementIndex]  || null
        if(!elementNode) return
        elementNode.style.setProperty(CSSKEY.OPACITY , `${opacity || props.opacity}`)
      }else{
        for (const el of allBarrages) {
          // 循环设置 每个节点的 透明度
          el.style.setProperty(CSSKEY.OPACITY , calcOpacity.value)
        }
      }
    }
    const appendElement = (currentRowIndex :number) => {
      if(!props.fullScreen){ // 如果非全屏 则 直接 添加到 上层容器
        topWapperRef.value?.appendChild(barrageElement)
        barrageElement.appendChild(barrageIconElement)
        return
      }
      currentRowIndex >= maxLineCount.value / 2 ? bottomWapperRef.value?.appendChild(barrageElement) : topWapperRef.value?.appendChild(barrageElement)
      barrageElement.appendChild(barrageIconElement)
    }
    /**
     * 添加每个 dom的 监听事件
     */
    const elAddEventListener = () => {
      /**
       *鼠标移入弹幕时 进行弹幕暂停
       */
      const mouseenterCallback = (e: MouseEvent) => {
        const currentClickDom = e.target as HTMLDivElement
        currentClickDom.style.animationPlayState = PLAYSTATEGROUP.PAUSED
      }
      const mouseLeaveCallback = (e: MouseEvent) => {
        const currentClickDom = e.target as HTMLDivElement
        currentClickDom.style.animationPlayState = PLAYSTATEGROUP.RUNNING
      }
      const animationendCallback = (e: AnimationEvent) => {
        const el = e.target as HTMLElement
        if(!props.batchDestroy){
          return el?.remove() //移除本身
        }
        curentFinishRunningNum += 1
        // 当前完成运行的总数 等于 设置的基准值时进行弹幕的批量删除
        el.setAttribute(KEYGROUP.RUNNINGSTATE , PLAYSTATEGROUP.END)
        curentFinishRunningNum === baseBatchDestoryNum && batchRemoveBarrageEl()
      }
      barrageElement.addEventListener('mouseenter' , mouseenterCallback)
      barrageElement.addEventListener('mouseleave' , mouseLeaveCallback)
      barrageElement.addEventListener('animationend' , animationendCallback)
    }

    const setElementAttrs = (instance :BarrageItem) => {
      // 如果每个icon链接存在证明需要显示icon
      if(instance.iconUrl && props.iconUrlInShow) {
        barrageIconElement.classList.add('iconLink-style') // 添加链接形式Icon的类名样式
        barrageIconElement.style.background = `url(${instance.iconUrl}) no-repeat center center / cover`
      }
      barrageElement.innerText = instance.content
      barrageElement.setAttribute(KEYGROUP.RUNNINGSTATE , PLAYSTATEGROUP.RUNNING) // 设置 初始化运行状态
      barrageElement.classList.add('item-wapper')
      props.startIcon && barrageElement.classList.add('reverse-icon')
      instance.type === 'user' && barrageElement.classList.add('my-user-item-wapper-style')

    }
    /**
     * @description 计算添加 弹幕添加到哪个 弹道中
     */
    const calcAppendLineIndex = (): number => clientWidthList.findIndex(item => item === Math.min(...clientWidthList))

    function toScriptCreateBarrageItem (itemInstance : BarrageItem , currentRowIndex: number) {
      const top = (currentRowIndex === 0) ? props.baseLineHeight : (baseHeight * currentRowIndex + props.baseLineHeight)
      const defaultItemInstance = {...itemInstance, top}
      barrageElement = document.createElement('div')
      barrageIconElement = document.createElement('div')
      // 如果 vnode元素存在的话 则 渲染成真实dom 挂载到 元素身上
      if(slots?.icon){
        const createIconInstance = slots.icon as Function
        const iconVnode = createIconInstance()?.[0]
        render(iconVnode , barrageIconElement)
      }
      setElementAttrs(defaultItemInstance) // 设置元素的属性
      appendElement(currentRowIndex) // 添加弹幕到容器中
      setElementStyleAttrs(defaultItemInstance , currentRowIndex) // 设置弹幕的样式动画属性等
      elAddEventListener()
    }
    function setElementStyleAttrs (instance: BarrageItem , index: number) {
      const elStyle = barrageElement.style
      const instanceClientWidth = barrageElement?.clientWidth || 0
      const offsetRightValue = randomNumber() + instanceClientWidth
      clientWidthList[index] = clientWidthList[index] + instanceClientWidth // 将弹道的长度添加数组中
      elStyle.backgroundColor = instance.bgColor ||  props.bgColor
      elStyle.right = `${-offsetRightValue}px`
      elStyle.top = `${instance.top}px`
      elStyle.opacity = `${calcOpacity.value}`
      elStyle.color = instance.color ||  props.color
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
      clientWidthList = new Array(maxLineCount.value) // 初始化弹道宽度，下一次应该在何处插入
      for( let i = 0; i < clientWidthList.length; i++ ){
        clientWidthList[i] = randomNumber(1 , 100) // 初始化的时候 来随机 弹道的长度 方便 找到最小插入的地方
      };
    }
    // 循环创建弹幕
    function loopCreate (recordIndex?: number) {
      const renders = BarrageInstance.get()
      let curCreateIndex = recordIndex || 0 // 当前创建的索引总数 到第几条了
      let currentRowIndex = 1
      let item: BarrageItem | null = null
      const IntervalCallback = () => {
        if(curCreateIndex === renders.length){
          //运行完一屏 触发 complete 事件
          emit('complete')
          return clearInterval(timerId.value)
        }
        currentRowIndex = calcAppendLineIndex()
        for (let index = 0; index < props.createNum; index ++) {
          item = renders[curCreateIndex]
          toScriptCreateBarrageItem(item , currentRowIndex)
          curCreateIndex +=  1
          currentRowIndex += 1
          lastRecordIndex = curCreateIndex // 记住上一次取得index
          emit('change', { renderCount: curCreateIndex })
        }
      }
      timerId.value = setInterval(IntervalCallback , props.createFrequencyTime * 1000)
    }
    function _init () {
      setInitData()
      loopCreate()
    }
    const lcMountedCallback = () => _init()
    const barragesWatchCallback = (newVal:BarrageItem[]) => {
       // 如果 没有弹幕 则 不操作
       if(!newVal?.length){
        // 如果没数据 则判断定时器是否存在 ， 存在则 清除(实现无数据时 清空弹幕功能) 定时去 反之 不处理
        timerId.value && clearInterval(timerId.value)
      }else{
        BarrageInstance.set(newVal) // 设置数据到 管理类中统一管理
      }
    }
    const opacityWatchCallback = denounce(() => setBarrageOpacity() , 200)
    const showBarrageWatchCallback = (newVal: boolean) => newVal ? start(): clear()
    watch(() => props.modelValue , barragesWatchCallback , { deep: true , immediate: true })
    watch(() => props.opacity , opacityWatchCallback , { immediate: true })
    watch(() => props.pausedFlag , () => pausedAllBarrage() )
    watch(() => props.showBarrage , showBarrageWatchCallback)
    onMounted(lcMountedCallback)
    expose(useExpose())
    return {
      barrageWapperStyle,
      barrageWapperRef,
      topWapperRef,
      bottomWapperRef,
      create,
      reset,
      clear,
      close,
      start,
      changeColor
    }
  }
})
</script>
<style  lang="less">
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
    .reverse-icon{
      flex-direction: row-reverse;
    }
    .item-wapper{
      position: absolute;
      right: -100px;
      display: inline-flex;
      align-items: center;
      height: 35px;
      cursor: pointer;
      font-size: 14px;
      border-radius: 20px;
      padding: 10px;
      box-sizing: border-box;
      background-color: #fec821;
      // background-image: linear-gradient(to right ,#647eff , #eeb518);
      .icon{
        margin-right: 5px;
      }
    }
    .my-user-item-wapper-style{
      border: 2px solid #ff0000 !important;
    }
    .iconLink-style{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 22px;
      height: 22px;
      margin-right: 5px;
      background-size: 100% 100%;
    }
  }
}
</style>
