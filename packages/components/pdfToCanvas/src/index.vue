<template>
  <div class="pdf-canvas-root">
    <canvas
      ref="pdfCanvasRef"
      v-for="(item, index) in maxPdfPage"
      :domId="index"
      :key="index"
      class="pdfCanvasEl"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { vuePdfToCanvasProps } from "./types";
import { defineComponent, onMounted, ref } from "vue";
import { callWithErrorHanding } from "../../../common";
import { usePdfToCanvas } from "./hooks";
import { buildProps } from "./utils";
import * as pdfjsLib from "pdfjs-dist";
import * as pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.mjs";
export default defineComponent({
  name: "PdfToCanvas",
  props: buildProps(),
  setup(props: vuePdfToCanvasProps) {
    const { pdfCanvasRef, sentHttpRequestGetPdf, tramsformStream } = usePdfToCanvas();
    let pdfDocInstance: pdfjsLib.PDFDocumentProxy = {} as any;

    const pdfStreamData = ref<string | Blob>("");
    // 最大pdf页面的页数
    const maxPdfPage = ref(1);

    const getPdf = async () => {
      if (props.url) {
        // 如果传入的是url 则发送请求获取数据 默认get 发送请求获取pdf
        const result = await callWithErrorHanding(
          async () => await sentHttpRequestGetPdf(props.url!),
        );
        pdfStreamData.value = result;
        console.log("result", pdfStreamData.value);
      } else {
        //如果直接把流传入 则直接保存
        pdfStreamData.value = props.fileStream || "";
      }
    };
    /**
     * 加载页面
     * @param pdfDocument pdf
     * @param pageNumber 页数
     */
    const renderPdfPage = async (pageNumber: number) => {
      // 获取页面
      const page = await pdfDocInstance.getPage(pageNumber);
      // 获取设备像素比
      const dpr = window.devicePixelRatio || 1;
      // 实际设备宽度
      const deviceWidth = window.innerWidth || 414;

      // 获取原始viewport以计算合适的缩放比例
      const originalViewport = page.getViewport({ scale: 1.0 });
      // 计算适合屏幕宽度的缩放比例
      const fitScale = (deviceWidth * dpr) / originalViewport.width;
      // 设置更高的基础缩放比例以提高清晰度
      const qualityScale = 2.5;

      // 设置画布尺寸，使用较高的缩放比例来提高清晰度
      const viewport = page.getViewport({ scale: fitScale * qualityScale });
      let canvasEls = {} as HTMLCanvasElement;
      // 多个canvas 元素
      if (pdfCanvasRef.value && Array.isArray(pdfCanvasRef.value)) {
        canvasEls = pdfCanvasRef.value[pageNumber - 1];
      } else {
        // 单个 canvas 元素
        canvasEls = pdfCanvasRef.value!;
      }
      console.log("canvasEls", canvasEls);
      const context = canvasEls.getContext("2d", { alpha: false });

      // 设置画布的实际尺寸（考虑设备像素比和质量缩放）
      canvasEls.height = viewport.height;
      canvasEls.width = viewport.width;

      // 设置画布的显示尺寸（使用rem单位）
      canvasEls.style.height = `100%`;
      canvasEls.style.width = `100%`;

      // 启用图像平滑
      if (context) {
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        // 根据设备像素比和质量缩放来调整上下文
        context.scale(1, 1);
      }

      // 渲染页面
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext as any).promise;
      if (maxPdfPage.value > pageNumber) {
        renderPdfPage(pageNumber + 1);
      }
    };

    /**
     * @description pdf 借助 pdfjs 进行处理
     */
    const pdfStreamHandle = async () => {
      // 转换流为 arrayBuffer
      const arrayBuffer = await tramsformStream(pdfStreamData.value);

      // 将 ArrayBuffer 数据加载到 pdfjs-dist
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });

      pdfDocInstance = await loadingTask.promise; // 加载pdf文档

      maxPdfPage.value = pdfDocInstance._pdfInfo.numPages; // 存储最大页数

      // 渲染第一页
      renderPdfPage(1);
    };

    const initPdfJS = async () => {
      const globalWorkerOptions = new pdfjsLib.GlobalWorkerOptions() as any;
      globalWorkerOptions.workerSrc = pdfjsWorker;
      await getPdf();
      pdfStreamHandle();
    };

    // 初始化操作函数
    const initOptions = () => {
      initPdfJS();
    };
    onMounted(() => {
      initOptions();
    });
    return {
      maxPdfPage,
      pdfCanvasRef,
    };
  },
});
</script>

<style scoped lang="less">
.pdf-canvas-root {
  width: 100%;
  height: 100%;
}
</style>
