import { base64ToBytes, blobToArrayBuffer } from "@p/utils";
import axios from "axios";
import { onMounted, Ref, ref } from "vue";
import { useLazyLoad } from "@p/hooks";

interface pdfToCanvasHookProp {
  renderPdfPage: (page: number) => void;
  maxPage: Ref<number>;
}

const defaultHookProp: pdfToCanvasHookProp = {
  renderPdfPage: () => {},
  maxPage: ref(1),
};

export function usePdfToCanvas({ renderPdfPage, maxPage }: pdfToCanvasHookProp = defaultHookProp) {
  const { elementRef: pdfCanvasRef } = useLazyLoad<HTMLCanvasElement>({
    callback: () => {
      // 当 canvas 元素进入视口时，渲染当前页面
      const currentPage = maxPage.value;
      renderPdfPage(currentPage);
    },
  });
  const targetIsVisible = ref(false);

  const sentHttpRequestGetPdf = async (requestUrl: string) => {
    const response = await axios.get(requestUrl, { responseType: "blob" });
    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  };

  // 转换Stream流
  const tramsformStream = (stream: string | Blob) => {
    if (!stream) {
      throw new Error("Please pass in the transformation data");
    }
    return typeof stream === "string" ? base64ToBytes(stream) : blobToArrayBuffer(stream);
  };

  onMounted(() => {
    console.log(pdfCanvasRef.value);
  });

  return {
    pdfCanvasRef,
    sentHttpRequestGetPdf,
    tramsformStream,
    targetIsVisible,
  };
}
