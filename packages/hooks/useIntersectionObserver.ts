import { computed, Ref, watch } from "vue";
import { isEmpty } from "../utils";

export function useIntersectionObserver<T extends Element>(
  target: Ref<T | null>,
  callback?: (entries: IntersectionObserverEntry[]) => void,
  option?: IntersectionObserverInit,
) {
  let targetObserver: IntersectionObserver | null = null;
  const targetElement = computed(() => {
    return Array.isArray(target.value) ? target.value : [target.value];
  });

  const _init = () => {
    if (isEmpty(target)) {
      console.log("target", target);
      throw Error("The element of observation must be present ");
    }
    _observer();
  };
  function _observer() {
    if (!window.IntersectionObserver) {
      throw Error("The browser does not support lazy loading");
    }
    const IntersectionObserverCallback = callback || function () {};
    targetObserver = new IntersectionObserver(IntersectionObserverCallback, option);
    // 循环监测每一个元素
    if (targetElement.value.length && targetObserver) {
      targetElement.value.forEach((el) => targetObserver!.observe(el));
    }
  }
  watch(
    () => target.value,
    (newVal: T | null) => {
      console.log("元素变化", newVal);
      _init();
    },
    {
      deep: true,
    },
  );
  // 停止观察元素
  function unobserve(target: T) {
    if (Array.isArray(target)) {
      target.forEach((el) => targetObserver?.unobserve(el));
    } else {
      targetObserver && targetObserver.unobserve(target);
    }
  }
  return {
    unobserve,
  };
}
