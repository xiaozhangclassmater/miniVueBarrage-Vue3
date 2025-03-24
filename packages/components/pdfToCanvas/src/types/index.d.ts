export interface vuePdfToCanvasProps {
  lazyLoad?: boolean // 是否懒加载
  touchScale?: boolean // 手指触摸放大缩小
  scale?: number // 放大倍数
  url?: string // 文件请求url 地址
  fileStream?: string  // 文件流
  waterMark?: boolean // 是否需要水印
  waterMarkText?: string // 水印内容
}