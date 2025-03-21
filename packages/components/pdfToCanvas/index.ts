import { withInstall } from "../../utils";
import pdfToCanvas from "./src/index.vue";

declare module "vue" {
  export interface GlobalComponents {
    pdfToCanvas: typeof pdfToCanvas;
  }
}
export const vuePdfToCanvas = withInstall(pdfToCanvas);

export default vuePdfToCanvas;
