function handleError(error: any) {
  console.log("err", error);
}
export function callWithErrorHanding(fn: Function) {
  try {
    if (typeof fn !== "function") {
      return new Error("Pass in a callback function");
    }
    return fn && fn();
  } catch (error) {
    handleError(error);
  }
}
