## minivueBarrage(vue3)

 [![License](https://camo.githubusercontent.com/bf6a5f2cde1eaf9204cc31d0f035889b9af767f2799f0b5e91b83a4620ab2196/687474703a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d627269676874677265656e2e737667)](http://opensource.org/licenses/MIT)

This library is based on a set of barrage plug-ins developed by Vue3. You can complete the barrage scrolling function by registering this plug-in. I hope it can help you.

此库基于Vue开发的一套弹幕插件，你可以通过注册该插件，完成弹幕滚动功能,希望它可以帮助到你。



你可以点击这里查阅 [中文文档](https://xiaozhangclassmater.github.io/minivueBarrage-docs-web/#/dashboard)

## Installation 安装

### **Vue2** 安装

~~~shell
# npm Vue2
npm install minivuebarrage@0.3.5

or
# yarn Vue2
yarn add minivuebarrage@0.3.5
~~~

### **Vue3**安装

~~~shell

# yarn Vue3
yarn add minivuebarrage@1.0.1

or
# npm Vue3
npm i minivuebarrage@1.0.1

~~~

## registry

### vue2

**全局注册**

~~~JS
//全局组件
import miniVueBarrage from 'minivuebarrage'
import 'minivuebarrage/lib/mini-vue-barrage.css'
import Vue from 'vue'
Vue.use(miniVueBarrage)
~~~

**局部注册**

~~~js
// 局部组件
import { miniVueBarrage } from "minivuebarrage";
import "minivuebarrage/lib/mini-vue-barrage.css";
export default {
    components:{
        miniVueBarrage
    }
}
~~~

### Vue3

**全局注册**

~~~js
import miniVueBarrage from 'minivuebarrage';
import 'minivuebarrage/lib/index.css';
const app = createApp(App)
app.use(miniVueBarrage)
~~~

**局部注册**

~~~vue
<template>
  <miniVueBarrage v-model="barrages" fullScreen/>
</template>
<script lang="ts" setup>
import { miniVueBarrage } from 'minivuebarrage';
import 'minivuebarrage/lib/index.css';
const barrages = ref([])
</script>
~~~

## Usage

~~~vue
<template>
  <div class="panel-wapper">
        <miniVueBarrage
      v-model="barrages"
      :fullScreen="fullScreenSwitch"
      :showBarrage="showBarrage"
      :opacity="opacityValue"
      :pausedFlag="barragePaused"
      :createFrequencyTime="times"
      :delay="10"
      :color="'#000'"
      :bgColor="'#ddd'"
      ref="barrageRef"
      batchDestroy
      @click="clickHandle"
      @change="changeHandle"
      @complete="completeHandle"
      @mouseenter="mouseenterHandle"
      @mouseleave="mouseleaveHandle"
      >
      <template #icon>
        <div class="icon"></div>
      </template>
    </miniVueBarrage>
   <div/>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { barrageDatas } from '../../../../mock';
import miniVueBarrage from '../index.vue';
const barrages = [...barrageDatas]
const opacityValue = ref(100)
const barrageRef= ref<InstanceType<typeof miniVueBarrage> >()
const barrageHeightValue = ref(35)
const fullScreenSwitch = ref(true)
const showBarrage = ref(true)
const barragePaused = ref(false)
const barrageContent = ref('')
const curRenderCount = ref(0)
const times = ref(1)
export interface BarrageItem {
  id?: number, //弹幕id
  delay?: number, // 当前弹幕运行一屏的时间
  iconUrl?: string, // 弹幕需要图标的 url
  content: string, // 弹幕文本内容
  color?: string, // 当前弹幕的文字颜色
  bgColor?: string // 当前弹幕的背景颜色
  type?: barrrageTypeGroup // 弹幕的类型  如果为user 则 添加 user的样式
}
// 添加弹幕
const addHandle = () => {
  if(!barrageContent.value){
    return
  }
  const item:BarrageItem = {
    content: barrageContent.value,
    id: 1,
    type: 'user'
  }
  barrageRef.value?.create(item)
}
// 重新开始 渲染一屏弹幕
const startHandle = () => {
  barrageRef.value?.start()
}
// 更新当前渲染的弹幕条数
const changeHandle = (params: any) => {
  curRenderCount.value = params.renderCount
}
// 重置弹幕
const resetHandle = () => {
  barrageRef.value?.reset()
}
// 清除弹幕
const clearHandle = () => {
  barrageRef.value?.clear()
}
const clickHandle = (e: MouseEvent , item: object) => {
  console.log('item' , e.target);
}
const completeHandle = () => {
  console.log('弹幕运行完成');
}
const mouseenterHandle = (e: MouseEvent , item: object) => {
  console.log('item' , e.target , item);
}
const mouseleaveHandle = (e: MouseEvent , item: object) => {
  console.log('item' , e.target , item);
}
</script>
~~~



## Configuration

### Attributes

| 参数                | 说明                                                   | 类型             | 可选值       | 默认值  |
| ------------------- | ------------------------------------------------------ | ---------------- | ------------ | ------- |
| modelValue          | 弹幕数组                                               | Array            | --           | []      |
| pausedFlag          | 是否暂停弹幕                                           | Boolean          | --           | false   |
| startIcon           | 图标是否从 开始位置显示 ，反之 末尾显示                | Boolean          | --           | true    |
| fullScreen          | 是否需要全屏弹幕                                       | Boolean          | --           | false   |
| iconUrlInShow       | iconUrl 存在时 是否需要显示 图标                       | Boolean          | --           | true    |
| delay               | 弹幕运行一屏的秒数                                     | Number           | --           | 12      |
| createFrequencyTime | 创建弹幕频率的秒数                                     | Number           | --           | 1       |
| createNum           | 一次定时器触发创建几条                                 | Number           | --           | 1       |
| opacity             | 弹幕的透明度                                           | Number \| String | --           | 1       |
| showBarrage         | 是否显示弹幕                                           | Boolean          | --           | true    |
| baseLineHeight      | 弹幕的基本行高                                         | Number           | --           | 10      |
| color               | 弹幕的文字颜色                                         | String           | --           | #000    |
| heigth              | 弹幕高度                                               | Number \| String | --           | 35px    |
| bgColor             | 弹幕的背景颜色                                         | String           | #xxx \| rgba | #fec821 |
| batchDestroy        | 是否需要批量删除弹幕，一次性销毁，提高性能（可选选项） | Boolean          | 50           | false   |

### Slots

| 插槽名称 | 说明                  |
| -------- | --------------------- |
| icon     | 用于弹幕 显示图标插槽 |

### Events

| 事件名称   | 说明                               |                               |
| ---------- | ---------------------------------- | ----------------------------- |
| change     | 弹幕每次创建或者发生改变时触发     | (params : object) => {}       |
| complete   | 弹幕所有数据运行完成触发           | ()  => {}                     |
| click      | 点击某个弹幕触发的事件             | (e , item: BarrageItem) => {} |
| mouseenter | 鼠标移入某个弹幕的身上时触发该事件 | (e , item: BarrageItem) => {} |
| mouseleave | 鼠标移出某个弹幕的身上时触发该事件 | (e , item: BarrageItem) => {} |

### instance methods

#### instance dataTyps

~~~ts
export type barrrageTypeGroup = 'default' | 'user'
export interface BarrageItem {
  id?: number, //弹幕id
  delay?: number, // 当前弹幕运行一屏的时间
  iconUrl?: string, // 弹幕需要图标的 url
  content: string, // 弹幕文本内容
  color?: string, // 当前弹幕的文字颜色
  bgColor?: string // 当前弹幕的背景颜色
  type?: barrrageTypeGroup // 弹幕的类型  如果为user 则 添加 user的样式
}
~~~



| 方法名称    | 说明                             | 参数              |
| ----------- | -------------------------------- | ----------------- |
| create      | 创建一条弹幕                     | BarrageItem       |
| reset       | 重置弹幕                         | --                |
| clear       | 清屏，将当前屏幕上的弹幕全部清除 | --                |
| close       | 关闭弹幕                         | --                |
| start       | 重新运行一屏弹幕                 | --                |
| changeColor | 改变弹幕的颜色                   | { color: '#fff' } |

## License

MIT

### Keywords

 minivuebarrage , barrage , 弹幕 vuebarrage vueBarrage , BARRAGE
