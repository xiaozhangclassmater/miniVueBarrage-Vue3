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
      default: 0.8
    },
    createNum: {
      type: Number,
      default: 1
    },
    opacity: {
      type: [Number , String],
      default: 1
    },
    showBarrage: {
      type: Boolean,
      default: true
    },
    baseLineHeight: {
      type: Number,
      default: 10
    }
  }
}

