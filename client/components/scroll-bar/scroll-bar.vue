<template>
  <div class="scroll-bar-wrapper" ref="scrollBarWrapper">
    <div class="content-wrapper" ref="contentWrapper">
      <h2 class="title">这就是命运的锁</h2>
      <h3 class="author">于公谨</h3>
      <p class="paragraph">命运的锁，总是会有着几分执着，带着几分失落，在不断和我的脚步进行交错。并不是梦的悠然，而心中的希望在不断蜿蜒，在不断慢慢浸润着心田。慢慢卷起岁月的珠帘，释放着心中的留恋。淡淡的云烟，画着岁月的缠绵；而心在不断徘徊，敞开了胸怀，想要拥抱着未来。静下心，看着浮云，留下了斑纹，还有时光里面的吻。那些生活如海，激情依旧在不断澎湃；安静地坐在水边，坐在河岸，看着波涛起伏，留下了记忆里面的模糊。</p>
      <p class="paragraph">心中有几分踌躇，因为在灵魂深处，如雾，飘荡着时光里面的犹豫。花开了，蝴蝶飞了，看到那些花瓣在风中舞动，看到岁月里面的轻松，可以看到脚步里面的沉重。江河的水流，滚滚向东永远没有尽头；就像是脑海里面思绪，并不是十分清清楚楚，却不断飘着脚下的路。日子里面的静谧，有着时光里面的迷离，在不断荡着涟漪。那些灿烂，就像是岁月的脸，留下了笑颜，也留下了岁月的容颜，也在不断刻画着时光里面的烂漫。</p>
      <p class="paragraph">风，飘着醉人的歌声，让我保持着清醒；从来就没有花儿一样的轻盈，也没有水浪一样的轻灵，只是轻轻拉开命运的序幕，看到心在不断飞舞。心愿就这样留在了身旁，也留下了曾经的惆怅。有时候回头张望，就可以看到尘霜，可以看到时光里面的悲凉，可以看到岁月所经历的悲怆，也可以看到曾经的激荡，也可以看到激昂。这并不是命运的寂寞，而是时光留下的沉默；并不想就这样踽踽而走，却可以看时光里面的留下了许许多多的忧愁。</p>
      <p class="paragraph">花儿的绽放，可以看到的是美丽的张扬。只是那些红肥绿瘦，是否曾经的拥有。不经意之间可以看到花儿在风中摇曳，可以看到花儿的笑靥。心中的情，在画着岁月的风景，留下了许许多多的沉静。年华从来就没有失去光泽，尽管有着忐忑，尽管有着揣测，还有苦涩，也还有着难以进行的选择。这就是岁月的点缀，也有着心灵曾经的破碎。想要听着时光里面的歌，只是经历了时光里面的坎坷，还有岁月中的折磨，还有那些经历的颠簸。</p>
      <p class="paragraph">风在曼舞，拂动着我的衣服；而时间的眼睛在不断追逐，不断地伴随我的脚步。就这样慢慢地走，就这样慢慢地向前走。这并不是我的无奈，而是轻盈的姿态。红尘的妖娆，留下了时光里面的自豪。看着自己的坚韧，在一天天变得深沉，也在不断开始较真。在遥远的地方，看着岁月的张望，可以闻到花香，可以看到时代里面的芬芳。这就是岁月的思念，也是我的牵连，也是时间里面的牵绊。丝丝缕缕的回忆，屈指数着曾经的失意。</p>
      <p class="paragraph">展开素笺，可以看到时光里面的委婉。就这样慢慢走，就这样经历了十字路口。把记忆化成丝丝缕缕，留下了歌曲，可以看到时光在彷徨，可以看到岁月的河流在慢慢地流淌。留在了朦胧，留在了梦，孤独的身影，留下了平静。这就是命运的锁，就这样看着岁月的蹉跎，却没有看到时光里面的承诺。这是人生的眷恋，这就是人生的思恋。许许多多的希望就这样变得支离破碎，却也会不断地重新在追。看着时光里面的逶迤，留下了心中的诗意。</p>
    </div>
    <div class="vertical-slider-wrapper" ref="verticalSliderWrapper">
      <div class="vertical-slider" ref="verticalSlider" @mousedown="onMouseDownVerticalHandle"></div>
    </div>
    <div class="horizontal-slider-wrapper" ref="horizontalSliderWrapper">
      <div class="horizontal-slider" ref="horizontalSlider" @mousedown="onMouseDownHorizontalHandle"></div>
    </div>
  </div>
</template>

<script>
const load = require('../../utils/imageLoader.js')
load({images: [{src: 'sss'}, {src: 'ssss'}]})
const COMPONENT_NAME = "scroll-bar"
export default {
  name: COMPONENT_NAME,
  props: {
  },
  data () {
    return {
      scrollStartY: 0,  // 开始移动的垂直方向位置
      scrollStartX: 0,  // 开始移动的水平方向位置
      scrollBarRealHeight: undefined, // 整个滚动区域的实际高度
      scrollBarRealWidth: undefined,  // 整个滚动区域的实际宽度
      scrollHeight: undefined,  // 内容区可滚动的高度
      scrollWidth: undefined,   // 内容区可滚动的宽度
      verticalSliderRealHeight: undefined, // 垂直滚动栏实际高度
      verticalSliderScrollHeight: undefined, // 垂直滑块可滚动的高度
      horizontalSliderRealWidth: undefined, // 水平滚动栏实际宽度
      horizontalSliderScrollWidth: undefined, // 水平滑块可移动的距离
      scrollTop: 0, // 内容区在垂直方向上已经滚动的距离（距离顶部，这里是translateY）
      sliderScrollTop: 0, // 垂直滑块已经移动的距离 （这里是top值）
      scrollLeft: 0,  // 内容区在水平方向上已经滚动的距离 （translateX）
      sliderScrollLeft:0  // 水平滑块已经移动的距离
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.__init()
    })
  },
  methods: {
    __init () {
      let scrollBarWrapper = this.$refs.scrollBarWrapper
      this.contentWrapper = this.$refs.contentWrapper
      let verticalSliderWrapper = this.$refs.verticalSliderWrapper
      this.verticalSlider = this.$refs.verticalSlider
      let horizontalSliderWrapper = this.$refs.horizontalSliderWrapper
      this.horizontalSlider = this.$refs.horizontalSlider
      // 垂直方向
      // 获取内容实际高度
      this.scrollBarRealHeight = scrollBarWrapper.scrollHeight
      // 计算内容可滚动高度 clientHeight: 可视区域的高度
      this.scrollHeight = Math.max(scrollBarWrapper.clientHeight, this.scrollBarRealHeight) - scrollBarWrapper.clientHeight
      // 获取垂直滚动条实际高度
      this.verticalSliderRealHeight = verticalSliderWrapper.scrollHeight
      // 获取垂直滚动条可滚动高度
      this.verticalSliderScrollHeight = this.verticalSliderRealHeight - this.verticalSlider.scrollHeight
      // 水平方向
      // 获取水平方向实际宽度
      this.scrollBarRealWidth = scrollBarWrapper.scrollWidth
      // 计算内容可移动的距离
      this.scrollWidth = Math.max(scrollBarWrapper.clientWidth, this.scrollBarRealWidth) - scrollBarWrapper.clientWidth
      // 获取水平滚动条实际宽度
      this.horizontalSliderRealWidth = horizontalSliderWrapper.scrollWidth
      // 获取水平滑块可移动的距离
      this.horizontalSliderScrollWidth = this.horizontalSliderRealWidth - this.horizontalSlider.scrollWidth
    },
    onMouseDownVerticalHandle (e) {
      if (!e) return
      this.scrollStartY = e.pageY
      this.$dom.on(document, 'mousemove', this.onMouseMoveVerticalHandle)
      this.$dom.on(document, 'mouseup', this.onMouseUpVerticalHandle)
    },
    onMouseMoveVerticalHandle (e) {
      if (!e) return
      // 获取滑块移动的距离
      let moveY = e.pageY - this.scrollStartY
      /* 处理滑块
       * x = ( 内容滚动距离 (scrollY) * 滑块可滚动高度 ) / 内容可滚动高度 = 滑块可滚动高度 * 百分比 (ch / cwh)
       */
      // let sliderScrollY = Math.min(this.verticalSliderScrollHeight, this.sliderScrollTop + this.verticalSliderScrollHeight * this.__getContentScrollHeightRate(this.scrollHeight * this.__getVericalScrollHeightRate(moveY)))
      let sliderScrollY = Math.min(this.verticalSliderScrollHeight, this.sliderScrollTop + moveY)
      sliderScrollY = Math.max(0, sliderScrollY)
      /* 计算内容移动的距离
       * 公式：设内容移动的距离为x
       * x / 内容可滚动的距离 = 滑块滚动的距离 (vh) / 滑块滚动的高度 (vwh)
       * x = ( 内容可滚动的距离 * 滑块移动的距离 ) / 滑块可滚动的高度 = 内容可滚动的距离 * 百分比 (vh / vwh)  + 已经滚动的距离
       */
      let scrollY = Math.abs(this.scrollTop) + this.scrollHeight * this.__getVericalScrollHeightRate(moveY)
      scrollY = Math.min(this.scrollHeight, scrollY)
      if (sliderScrollY === 0) scrollY = 0 // 滑块已经滚到底
      this.contentWrapper.style.transform = `translate3d(-${this.scrollLeft}px, -${scrollY}px, 0px)`
      this.verticalSlider.style['top'] = sliderScrollY + 'px'
    },
    onMouseUpVerticalHandle (e) {
      this.scrollTop = this.__getTranslate3dArgument(this.contentWrapper)[1]
      this.sliderScrollTop = this.__getTopArgument(this.verticalSlider)
      this.$dom.off(document, 'mousemove', this.onMouseMoveVerticalHandle)
      this.$dom.off(document, 'mouseup', this.onMouseUpVerticalHandle)
    },
    onMouseDownHorizontalHandle (e) {
      if (!e) return
      // 记录起始位置
      this.scrollStartX = e.pageX
      this.$dom.on(document, 'mousemove', this.onMouseMoveHorizontalHandle)
      this.$dom.on(document, 'mouseup', this.onMouseUpHorizontalHandle)
    },
    onMouseMoveHorizontalHandle (e) {
      if (!e) return
      // 滑块水平方向上移动的距离
      let moveX = e.pageX - this.scrollStartX
      // 处置滑块移动
      let sliderScrollX = Math.min(this.horizontalSliderScrollWidth, this.sliderScrollLeft + moveX)
      sliderScrollX = Math.max(0, sliderScrollX)
      // 处理内容区域的移动
      let scrollX = Math.abs(this.scrollLeft) + this.scrollWidth * (moveX / this.horizontalSliderScrollWidth)
      scrollX = Math.min(this.scrollWidth, scrollX)
      if (sliderScrollX === 0) scrollX = 0
      console.log(scrollX)
      this.contentWrapper.style.transform = `translate3d(-${scrollX}px, -${this.scrollTop}px, 0px)`
      this.horizontalSlider.style['left'] = sliderScrollX + 'px'
    },
    onMouseUpHorizontalHandle (e) {
      if (!e) return
      // 记录滑块已经移动的距离
      this.sliderScrollLeft = this.__getLeftArgument(this.horizontalSlider)
      // 记录内容区移动的距离
      this.scrollLeft = this.__getTranslate3dArgument(this.contentWrapper)[0]
      this.$dom.off(document, 'mousemove', this.onMouseMoveHorizontalHandle)
      this.$dom.off(document, 'mouseup', this.onMouseUpHorizontalHandle)
    },
    __getVericalScrollHeightRate (moveY) {
      if (this.verticalSliderScrollHeight === undefined) return null
      return moveY / this.verticalSliderScrollHeight
    },
    __getContentScrollHeightRate (moveY) {
      if (this.scrollHeight === undefined) return null
      return moveY / this.scrollHeight
    },
    __getTranslate3dArgument (dom) {
      if (!dom) return null
      let args = []
      let transformStyle = dom.style['transform']
      let matcher = transformStyle.match(/translate3d\((-?[\d\.]+)px,\s*(-?[\d\.]+)px,\s*(-?[\d\.]+)px\)/)
      if (!matcher) return [0, 0, 0]
      args.push(Number(matcher[1]))
      args.push(Number(matcher[2]))
      args.push(Number(matcher[3]))
      return args
    },
    __getTopArgument (dom) {
      if (!dom) return 0
      let topStyle = dom.style['top']
      let matcher = topStyle.match(/(-?[\d\.]+)px/)
      if (!matcher) return 0
      return Number(matcher[1])
    },
    __getLeftArgument (dom) {
      if (!dom) return 0
      let leftStyle = dom.style['left']
      let matcher = leftStyle.match(/(-?[\d\.]+)px/)
      if (!matcher) return 0
      return Number(matcher[1])
    },
    __getTranslateArgument (dom, d = 'Y') {
      if (!dom) return 0
      let transformStyle = dom.style['transform']
      let matcher = transformStyle.match(new RegExp('translate' + d +'\\((-?[\\d\\.]+)px\\)'))
      if (!matcher) return 0
      return Number(matcher[1])
    }
  }
}
</script>

<style lang="scss" scoped>
  .scroll-bar-wrapper {
    width: 200px;
    // 测试
    height: 320px;
    overflow: hidden;
    position: relative;
    margin: 30px auto;
    background: rgb(199, 237, 204);
    .content-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      padding: 5px 0;
      width: 315px;
      // background: #fff;
      background: rgb(199, 237, 204);
      box-sizing: border-box;
      user-select: none;
    }
    .vertical-slider-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      width: 5px;
      height: 100%;
      background: #d9d9d9;
      .vertical-slider {
        position: absolute;
        width: 5px;
        height: 20px;
        background: #fff;
      }
    }
    .horizontal-slider-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: #d9d9d9;
      .horizontal-slider {
        position: absolute;
        width: 20px;
        height: 5px;
        background: #fff;
      }
    }
  }
</style>
