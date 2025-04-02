import { useIntersectionObserver } from "./useIntersectionObserver";
import { ref } from "vue";

const defaultHookProps = {
  callback: () => {},
};

interface lazyLoadHookProps {
  callback: () => void;
}

export function useLazyLoad<T extends Element>({ callback }: lazyLoadHookProps = defaultHookProps) {
  const elementRef = ref<T | null>(null);
  const { unobserve } = useIntersectionObserver<T>(elementRef as any, watchElInVisibleRange);

  function watchElInVisibleRange(entries: IntersectionObserverEntry[]) {
    const isIntersecting = entries?.[0]?.isIntersecting;
    if (isIntersecting) {
      console.log("IntersectionObserverEntry", entries);
      console.log("renderPdfPage", isIntersecting);
      callback?.();
    } else {
      unobserve(entries?.[0].target as T);
    }
  }

  return {
    elementRef,
  };
}
