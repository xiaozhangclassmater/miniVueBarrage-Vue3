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