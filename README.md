## minivueBarrage(vue3)

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

## Usage

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
  <miniVueBarrage v-model="barrages"fullScreen/>
</template>
<script lang="ts" setup>
import { miniVueBarrage } from 'minivuebarrage';
import 'minivuebarrage/lib/index.css';
const barrages = ref([])
</script>
~~~

## Configuration

There are some useful options



| 参数                | 说明                                    | 类型             | 可选值       | 默认值  |
| ------------------- | --------------------------------------- | ---------------- | ------------ | ------- |
| modelValue          | 弹幕数组                                | Array            | --           | []      |
| pausedFlag          | 是否暂停弹幕                            | Boolean          | --           | false   |
| startIcon           | 图标是否从 开始位置显示 ，反之 末尾显示 | Boolean          | --           | true    |
| fullScreen          | 是否需要全屏弹幕                        | Boolean          | --           | false   |
| iconUrlInShow       | iconUrl 存在时 是否需要显示 图标        | Boolean          | --           | true    |
| delay               | 弹幕运行一屏的秒数                      | Number           | --           | 12      |
| createFrequencyTime | 创建弹幕频率的秒数                      | Number           | --           | 1       |
| createNum           | 一次定时器触发创建几条                  | Number           | --           | 1       |
| opacity             | 弹幕的透明度                            | Number \| String | --           | 1       |
| showBarrage         | 是否显示弹幕                            | Boolean          | --           | true    |
| baseLineHeight      | 弹幕的基本行高                          | Number           | --           | 10      |
| color               | 弹幕的文字颜色                          | String           | --           | #000    |
| heigth              | 弹幕高度                                | Number \| String | --           | 35px    |
| bgColor             | 弹幕的背景颜色                          | String           | #xxx \| rgba | #fec821 |

