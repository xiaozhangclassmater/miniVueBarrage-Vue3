import { App, Component } from "vue";
export function withInstall<T extends Component> (options: T) {
  (options as any).install = (app : App) => {
    const { name } = options
    if(name){
      app.component(name , options)
    }
  }
  return options
}
// 防抖函数
export function debounce (fn:Function , waitTime: number) {
  let timer: null | number = null
  return (...args : any[]) => {
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this , args)
    }, waitTime);
  }
}