import { App, Component, getCurrentInstance } from "vue";
type ErrorType = "warning" | "error" | "info" | "log";

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

export function withInstall<T extends Component>(options: T) {
  (options as Record<string, unknown>).install = (app: App) => {
    const { name } = options;
    if (name) {
      app.component(name, options);
      // app.component(camelize(`-${name}`), options);
    }
  };

  return options as WithInstall<T>;
}

export const extend = Object.assign;

//错误捕获异常抛出
export function errorCatchCallHandle(errorMesssage: string, type: ErrorType = "warning") {
  if (!errorMesssage) return;
  switch (type) {
    case "warning":
      console.warn(errorMesssage);
      break;
    case "error":
      throw new Error(errorMesssage);
    case "info":
      console.info(errorMesssage);
      break;
    case "log":
      console.log(errorMesssage);
    // eslint-disable-next-line no-fallthrough
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

export const denounce = (callback: () => void, delay: number) => {
  let timer: any = null;
  return (...args: []) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback && callback.apply(this, args);
    }, delay);
  };
};
/**
 *
 * @param el dom元素
 * @param key 想获取属性值的key
 * @returns 返回一个具体的 string类型的值
 */
export function getStyleValue(el: Element, key: keyof CSSStyleDeclaration) {
  return window.getComputedStyle(el)[key] || "";
}
/**
 *
 * @param value 值
 * @param unit 转换的单位
 * @returns 返回去除完单位之后的value
 */
export function unitToValue(value: string | any, unit: string = "px") {
  if (!value) return;
  const index = String(value).indexOf(unit);
  return index > -1 ? value.substring(0, index) : value;
}

export function isEmpty(val: any) {
  return (
    // eslint-disable-next-line valid-typeof
    typeof val === null || !val || (Array.isArray(val) && !val.length) || !Object.keys(val)?.length
  );
}
// 是否为异步函数
export function isAsyncFunction(func: Function) {
  return func && func.constructor && func.constructor.name === "AsyncFunction";
}
/**
 * 将 Blob 转换为 ArrayBuffer
 */
export const blobToArrayBuffer = (blob: Blob) => {
  return new Promise((resolve: (data: Uint8Array<ArrayBuffer>) => void, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      resolve(new Uint8Array(arrayBuffer as any));
    };
    reader.onerror = () => reject(new Error("Failed to read blob as ArrayBuffer"));
    reader.readAsArrayBuffer(blob);
  });
};

export const base64ToBytes = (base64: string) => {
  return Uint8Array.from(window.atob(base64), (m: any) => m.codePointAt(0));
};
