import { BarrageItem } from '../types'

export * as Barrage from './barrage'
export { default as BarrageManager } from './barrageManager'

export const buildProps = <T>() => {
  return {
    modelValue: {
      type: Array<BarrageItem>,
      default: ()=>([])
    },
    // 是否暂停
    pausedFlag: {
      type: Boolean,
      default: false
    },
    // 是否批量删除弹幕 开启此选项可以对页面性能有进一步的提升
    batchDestroy:{
      type: Boolean,
      default: false
    },
    // 图标是否从 开始位置显示 ，反之 末尾显示
    startIcon: {
      type: Boolean,
      default: true
    },
    // 是否需要全屏弹幕
    fullScreen: {
      type: Boolean,
      default : false
    },
    //iconUrl 存在时 是否需要显示 图标
    iconUrlInShow: {
      type: Boolean,
      default : true
    },
    // 弹幕运行一屏的秒数
    delay: {
      type: Number,
      default: 12
    },
    // 创建频率的秒数
    createFrequencyTime: {
      type: Number,
      default: 1
    },
    //一次性 创建几条
    createNum: {
      type: Number,
      default: 1
    },
    // 弹幕的透明度
    opacity: {
      type: [Number , String],
      default: 1
    },
    //是否显示弹幕
    showBarrage: {
      type: Boolean,
      default: true
    },
    //弹幕的基本行高
    baseLineHeight: {
      type: Number,
      default: 10
    },
    // 弹幕的颜色
    color: {
      type: String,
      default: '#000'
    },
    // 弹幕的背景颜色
    bgColor:{
      type: String,
      default: '#fec821'
    },
    // 弹幕高度
    heigth: {
      type: [String , Number],
      default: '35px'
    }
  }
}

