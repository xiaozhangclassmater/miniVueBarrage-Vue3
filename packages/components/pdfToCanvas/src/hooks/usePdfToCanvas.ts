import { ref } from "vue";

export function usePdfToCanvas() {
  const pdfCanvasRef = ref<HTMLCanvasElement>();
  return {
    pdfCanvasRef,
  };
}
