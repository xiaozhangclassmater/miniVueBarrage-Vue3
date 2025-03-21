<template>
  <div class="pdf-canvas-root">
    <canvas ref="pdfCanvasRef" class="pdfCanvasEl"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { usePdfToCanvas } from "./hooks";
const { pdfCanvasRef } = usePdfToCanvas();
</script>

<style scoped lang="less">
.pdf-canvas-root {
  width: 100%;
  height: 100%;
}
</style>
