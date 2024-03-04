import miniVueBarrage from './src/index.vue';

// (() => {
//     function reSizeEventCallback () {
//       console.log('页面尺寸发生变化');
//       const Navigatory = navigator.userAgent ?? ''
//       const isMobile = !!Navigatory.match(/Mobile/g)?.length
//       const cssLinkDom = document.querySelector('.barrage-style-link') as LinkHTMLAttributes
//       if(cssLinkDom){
//         if(isMobile){
//           cssLinkDom.href = 'mobileCss.less'
//         }else{
//           cssLinkDom.href = 'pcCss.less'
//         }
//       }else{
//         const cssLinkElement = document.createElement('link')
//         cssLinkElement.className ='barrage-style-link'
//         cssLinkElement.type = 'text/css'
//         cssLinkElement.rel = 'stylesheet'
//         // cssLinkElement
//         if(isMobile){
//           cssLinkElement.href = 'mobileCss.less'
//         }else{
//           cssLinkElement.href = 'pcCss.less'
//         }
//         const headElement = document.querySelector('head')
//         headElement?.appendChild(cssLinkElement)
//       }
      
//     }
//     window.addEventListener('resize' , debounce(reSizeEventCallback , 200))
// })()
export default miniVueBarrage