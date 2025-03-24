import { vuePdfToCanvasProps } from "../types";

export const defaultProps: vuePdfToCanvasProps = {
  lazyLoad: true, // 是否懒加载
  touchScale: true, // 手指触摸放大缩小
  scale: 1, // 放大倍数
  url: "/api/download", // 文件请求url 地址
  fileStream: "", // 文件流
  waterMark: false, // 是否需要水印
  waterMarkText: "", // 水印内容
};
