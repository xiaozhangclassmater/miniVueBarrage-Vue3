import axios from "axios";
import { ref } from "vue";

export function usePdfToCanvas() {
  const pdfCanvasRef = ref<HTMLCanvasElement | HTMLCanvasElement[]>();
  const sentHttpRequestGetPdf = async (requestUrl: string) => {
    const response = await axios.get(requestUrl, { responseType: "blob" });
    if (response && response.status === 200 && response.data) {
      return response.data;
    }
  };
  return {
    pdfCanvasRef,
    sentHttpRequestGetPdf,
  };
}
