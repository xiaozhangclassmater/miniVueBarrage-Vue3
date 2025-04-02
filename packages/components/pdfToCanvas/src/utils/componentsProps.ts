export const buildProps = () => {
  return {
    lazyLoad: {
      type: Boolean,
      default: true,
    }, // 是否懒加载
    touchScale: {
      type: Boolean,
      default: true,
    }, // 手指触摸放大缩小
    scale: {
      type: Number,
      default: 1,
    }, // 放大倍数
    url: {
      type: String,
      default: "/api/download",
    }, // 文件请求url 地址
    fileStream: {
      type: String,
      default: "",
    }, // 文件流
    waterMark: {
      type: Boolean,
      default: false,
    }, // 是否需要水印
    waterMarkText: {
      type: String,
      default: "waterMarkText",
    }, // 水印内容
  };
};
