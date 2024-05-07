import { App, Component, getCurrentInstance } from "vue";
export function withInstall<T extends Component> (options: T) {
  (options as any).install = (app : App) => {
    const { name } = options
    if(name){
      app.component(name , options)
    }
  }
  return options
}

export const extend = Object.assign

export function useExpose<T = Record<string, any>>(apis?: T) {
  const instance = getCurrentInstance();
  if (instance) {
   return extend(instance.proxy as object, apis);
  }
}

export function denounce (callback : () => void , delay: number) {
  let timer: any = null
  const that:any = this
  return (...args: []) => {
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      console.log('callback' ,callback);
      callback && callback.apply(that , args)
    } , delay)
  }
}
/**
 *
 * @param el dom元素
 * @param key 想获取属性值的key
 * @returns 返回一个具体的 string类型的值
 */
export  function getStyleValue(el: Element  , key: keyof CSSStyleDeclaration ) {
  return window.getComputedStyle(el)[key] || ''
}
/**
 *
 * @param value 值
 * @param unit 转换的单位
 * @returns 返回去除完单位之后的value
 */
export function unitToValue (value: string | any , unit: string = 'px') {
  if(!value) return
  const index = String(value).indexOf(unit)
  return index > -1 ? value.substring(0 , index) : value
}

export function isEmpty (val: any) {
  return (typeof val === null) || !val || (Array.isArray(val) && !val.length) || !(Boolean(Object.keys(val)?.length))
}
