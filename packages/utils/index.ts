import { AppContext, getCurrentInstance, Plugin } from "vue";
type ErrorType =  'warning' | 'error' | 'info' | 'log'

export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}


export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E
) => {
  ;(main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}


export const extend = Object.assign

//错误捕获异常抛出
export function errorCatchCallHandle (errorMesssage: string , type:  ErrorType = 'warning' ) {
  if(!errorMesssage) return
  switch (type) {
    case 'warning':
      console.warn(errorMesssage)
      break;
    case 'error':
      throw new Error(errorMesssage)
    case 'info':
    console.info(errorMesssage)
    break
    case 'log':
    console.log(errorMesssage);
    default:
      break;
  }
}

export function useExpose<T = Record<string, any>>(apis?: T) {
  const instance = getCurrentInstance();
  if (instance) {
   return extend(instance.proxy as object, apis);
  }
}

export const denounce = (callback : () => void , delay: number) => {
  let timer: any = null
  return (...args: []) => {
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      callback && callback.apply(this , args)
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
