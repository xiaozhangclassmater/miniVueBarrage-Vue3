function handleError(error: any) {
  console.log("err", error);
}
export function callWithErrorHanding(fn: Function): any {
  try {
    if (typeof fn !== "function") {
      throw new Error("Pass in a callback function");
    }
    return fn && fn();
  } catch (error) {
    handleError(error);
  }
}
