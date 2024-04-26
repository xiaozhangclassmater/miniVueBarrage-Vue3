export function randomNumber (min = 1  , max = 100) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function denounce (callback : () => void , delay: number) {
  let timer: any = null
  return (...args: any[]) => {
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      console.log('callback' ,callback);
      callback && callback.apply(this , args)
    } , delay)
  }
}
export  function getPaddingValue (el) {

}
export function isEmpty (val: any) {
  return (typeof val === 'string' && !val) || !(Array.isArray(val) && val.length) || !(Boolean(Object.keys(val)?.length))
}
