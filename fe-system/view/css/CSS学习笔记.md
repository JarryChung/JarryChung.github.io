# CSS学习笔记

> 在学习CSS的过程中做的一些记录，用于未来的快速回忆。

## HTML常见元素和理解

### head中的元素

- `<meta charset="utf-8">`指定字符集
- `meta name="viewport" content="..."`定义视图大小与设备屏幕大小的比例，用户是否可缩放
- `<base href="/">`指定基准路径

### body中的元素

- a[href, target]
- img[src, alt]
- table td[colspan, rowspan]
- form[target, method, enctype]
- input[type, value]
- button[type]
- select > option[value]
- label[for]

### 如何理解HTML

- HTML用于描述网页的结构，负责页面整体的结构

- 可以使用**http://h5o.github.io/**来分析一个页面的结构
- HTML要强调语义化
- 使用**https://validator.w3.org/check**来检查HTML语法

### HTML5新增内容

- 新的区块标签：section、article、nav、aside
- 表单增强：添加日期时间搜索类型、表单验证、Plaveholder自动聚焦
- 新增语义：header/footer头尾、section/article区域、nav导航、aside不重要的内容、em/strong强调、i为icon

### HTML元素分类

- 按默认样式分：块级block、行内inline（没有尺寸属性width/height等）、inline-block

### HTML元素嵌套关系

- 块级元素可以包含行内元素
- 块级元素不一定能包含块级元素，例如`<p></p>`
- 行内元素一般不能包含块级元素（`a >div` 元素例外）

### HTML元素默认样式

- 使用CSS Reset清除一些默认样式
- 使用**Normalize.css**来修正默认样式（例如修正各浏览器对宽高定义的不一致）

### HTML面试题

- doctype的意义是什么？	
  - 让浏览器以标准模式渲染
  - 让浏览器知道元素的合法性
- HTML XHTML HTML5之间的关系？
  - HTML属于SGML
  - XHTML属于XML，是HTML进行XML严格话的结果
  - HTML5不属于SGML或XML，比XHTML宽松
- HTML5有什么变化？
  - 新的语义化元素、表单增强、新的API（离线、音视频、图形、实时通信、本地存储、设备能力）
- em与i有什么区别？
  - em 是语义化的标签，表强调
  - i 是纯样式的标签，表斜体（一般不在HTML5中用）
- 语义化的意义是什么？
  - 开发者容易理解
  - 机器容易理解结构（搜索引擎、读屏软件）
  - 有助于SEO    
- 哪些元素可以自闭合？
  - input、img、br、hr、meta、link
- HTML和DOM的关系？
  - HTML是静止的
  - DOM是由HTML解析而来的，是活的
  - JS可以维护DOM
- form的作用有哪些？
  - 直接提交表单
  - 使用submit/reset按钮
  - 便于浏览器保存表单
  - 第三方库可以整体提取值

## CSS（Cascading Style Sheet）基础

> 浏览器在解析选择器时是从右到左的。

### 选择器分类

- 元素选择器 `a{}`
- 伪元素选择器 `::before()`
- 类选择器 `.link{}`
- 属性选择器 `[type=radio]{}`
- 伪类选择器 `:hover{}`（伪元素是真实存在的，而伪类是一种状态）
- ID选择器 `#id{}`
- 组合选择器 `[type=checkbox] + label{}`
- 否定选择器 `not(.link){}`
- 通用选择器 `*{}`

### 选择器权重

- 权重计算，相加时不进位
  - ID选择器：+100
  - 类、属性、伪类：+10
  - 元素、伪元素：+1
  - 其他选择器：+0
- `!important`优先级最高
- 元素属性 优先级高
- 相同权重 后写的生效

### 非布局样式

- 字体

  - 字体族（使用时不能加引号）：serif(衬线体)、sans-serif(非衬线体)、monospace(等宽字体)、cursive(手写体)、fantasy(花体)

  - 多字体（使用时需要对每个字体用引号，fallback机制是针对每个字）

  - 网络字体、自定义字体

    ```css
    /* 自定义字体 */
    /* url可使用在线url，若跨域，需要对方服务器允许跨域（对方服务器展示CORS头） */
    @font-face {
        font-family: "JC";
        src: url("./define.ttf")
    }
    .custom-font {
        font-family: JC
    }
    ```

  - iconfont

- 行高

  - line-height会撑起line-box的高度，以line-height最大的为准
  - 字体渲染时默认以base-line（基线）为准，可通过修改`vertical-align`来修改对齐方式或基线位置
  - 图片空白
    - 原因：img行内元素，以inline的方式排版，渲染时默认以字体对齐的base-line为准
    - 偏差大小：以字体大小为依据
    - 修正：①将图片style设置为`vertical-align: bottom`；②`display: block`; 

- 背景

  - 纯色背景：使用颜色名或`rgb`或`rgba`(带透明度)或`hsl`(色相)或`hsla`(带透明度的色相)指定
  - 渐变色背景：
    - 线性渐变
      - 简单写法：`linear-gradient(to right, red, green)`，`to right`指明**从左到右**，也可使角度`30deg`
      - 也可添加多颜色以及控制颜色位置`linear-gradient(30deg, red 0, green 10%, yellow 50%, green 100%)`
    - 放射性渐变
  - 多背景叠加
    - 背景①：`linear-gradient(135deg, transparent 0, transparent 45.5%, green 45.5%, green 55.5%, transparent 55.5%, transparent 100%)`
    - 背景②：`linear-gradient(45deg, transparent 0, transparent 45.5%, red 45.5%, red 55.5%, transparent 55.5%, transparent 100%)`
    - 设定背景大小可以让背景颜色循环出现`background-size: 30px 30px`
  - 背景图片和属性（雪碧图）
    - 使用`backgorund-repeat`可以控制图片是否平铺以及在哪个方向循环平铺
    - 使用`background-position`来指定图片的位置，如`background:center center`为居中，也可是使用像素
    - 使用`background-size`来控制图片大小
    - 雪碧图（性能优化的一种）制作
      - 就是将很多图片合成一张图片（下载时只需要一次http请求），使用时将某部分显示出来即可
      - 使用div来放置图片，使用`background`来引入图片，使用`width`/`height`来拟合图标的大小，使用`backgroung-position`来在雪碧图中找到图标，使用`background-size`来缩放图标大小
  - base64和性能优化
    - 常用于小图标
    - 文件会增大（①图片体积会增大1/3；②CSS文件会变大）
    - 会变慢（浏览器需要将base64解码）
  - 多分辨率适配
    - 对于高分辨率的屏幕，需要制作更大尺寸的图标，然后使用`background-size`将其缩小，以解决高分屏模糊的问题

- 边框

  - 边框的属性：线型、大小、颜色

  - 边框背景图`border-img: url(./border.png) 30 round`

  - 边框衔接（CSS实现三角形）

    ```css
    .div-class {
        width: 0px;
        height: 200px;
        border-bottom: 30px solid red;
        border-left: 30px solid transpatrnt;
        border-right: 30px solid transpatrnt;
        /* 添加圆角可以将三角形变成扇形 */
    }
    ```

- 滚动

  - 滚动行为与滚动条
    - visivle： 滚动条隐藏（会超出容器）
    - hidden： 滚动条隐藏（不会超出容器）
    - scroll： 滚动条显示
    - auto： 滚动条自动显示

- 文本折行

  - overflow-wrap（旧写为word-wrap，通用换行控制）：是否保留单词

  - word-break（针对多字节文字）：是否把单词/中文句子/文字看作一个单位

  - white-space：空白处是否断行

    ```css
    /* 这是一个示例,不对单词换行、单个中文字为单位 */
    .div-class {
        overflow-wrap: normal;
        word-break: normal;
        white-space: normal;
    }
    ```

- 装饰性属性

  - 字重：font-weight
  - 斜体： font-style:itatic
  - 下划线： text-decoration
  - 指针： cursor

- hack

  - hack（不合法但生效的写法）：在特定浏览器生效，为了处理兼容性
  - hack写在标准属性后面
  - 缺点：难理解、难维护、易维护
  - 替代方案：特性检测、针对性添加class

- 面试题

  - CSS样式（选择器）的优先级？
    - 权重的计算（叠加不进位）
    - !important优先级最高
    - 内联样式高
    - 后写的优先级高
  - 雪碧图的作用
    - 减少HTTP请求数，提高加载性能
    - 在一些情况下可以减少图片的大小
  - 自定义字体的使用场景
    - 宣传/品牌/banner等固定文案 
    - 字体图标
  - base64的使用
    - 将图片变成文本
    - 减少HTTP请求数
    - 适用于小图片
  - 伪元素与伪类的区别
    - 伪类表状态 
    - 伪元素是真的有元素
    - 前者单冒号，后者双冒号（由于历史问题，考虑兼容性时before/after可能需要使用单冒号）
  - 如何美化checkbox
    -  label[for]和id
    - 隐藏原生input
    - input:checked + label

## CSS（Cascading Style Sheet）布局

### CSS布局历史

- 早期以table为主（简单）
- 后来以技巧性布局为主（难）
- 现在有flexbox/grid布局（偏简单）
- 响应式布局是必备知识

### 常用布局方法

- table表格布局
- float浮动 + margin
- inline-block布局
- flexbox布局

### table表格布局

```html
<!-- 常规表格布局 -->
<table>
	<tr>
    	<td class="left">左</td>
    	<td class="right">右</td>
    </tr>
</table>
<!-- 模拟表格布局 -->
<div class="table">
    <div class="table-row">
        <div class="left table-cell">左</div>
        <div class="right table-cell">右</div>
    </div>
</div>
```

```css
.table {
    display: table;
    width: 900px;
    height: 100px;
}
.table-row {
    display: table-row;
}
.table-cell {
    display: table-cell;
    vertical-align: center;
}
```

### 一些布局属性

- 盒子模型
  - content、 padding、border、margin
  - 两种：W3C标准模型、IE标准模型
- display/position
  - `display`确定元素的显示类型：block/inline/inline-block
  - `position`确定元素的位置：static（默认）/relative/absolute/fixed
    - `static`默认值，文档流
    - `relative`相对位置，是相对于元素本身原来的位置，该值不会改变元素原来占用的空间
    - `absolute`绝对位置，脱离文档流，不影响文档流的其他元素，相对于最近的`relative`或`absolute`元素
    - `fixed`，脱离文档流，不影响文档流中的其他元素，相对于屏幕可视区域来固定
- 层级
  - 使用z-index来设置层级（`relative`，`absolute`，`fixed`这三种可以设置`z-index`）
  - 默认后出现的元素在上层

### flexbox布局（现代化布局）

- 基本知识
  - 是弹性盒子
  - 盒子本来就是并列的
  - 指定宽度即可（可使用`flex:1`与`width:20px`两种方式）
- 兼容性问题：IE完全不支持flex

### float布局

- 特性

  - 元素“浮动”
  - 脱离文档流，不脱离文本流

- 对自身的影响

  - 形成“块（block）”（BFC）
  - 位置尽量靠上
  - 位置尽量靠左（右）

- 对兄弟元素的影响

  - 上面贴非float元素，旁边贴float元素
  - 不影响其他块级元素的位置，影响其他块级元素的文本

- 对父级元素的影响

  - 从布局上“消失”
  - 高度塌陷

- float三栏布局示例

  ```css
  .left {
      float: left;
      width: 200px;
  }
  .right {
      float: right;
      width: 200px;
  }
  .middle {
      margin-left： 200px;
      margin-right： 200px;
  }
  /* 注意，这里应该将left与right元素放在上面，然后再放middle */
  ```

### inline-block布局

- 特性

  - 像文本一样排列block元素
  - 没有清除浮动的问题
  - 需要处理间隙问题

- 处理inline-block的间隙问题（就好比文字之间有间隙，inline-block同样有这个问题）

  - 父元素中将`font-size`设置为0；子元素中再将`font-size`设置回来（推荐使用这种方式）

  - 间隙是因为两个div尾部与头部之间的空间造成的，解决方式：

    ```html
    <!-- 解决方式① -->
    <div>
        <div>left</div><div>
        right</div>
    </div>
    
    <!-- 解决方式② -->
    <div>
        <div>left</div><!--
        --><div>right</div>
    </div>
    ```

### 响应式布局

- 在不同设备上正常使用
- 一般主要处理屏幕大小问题
- 主要方法
  - 第一步在`head`中添加`viewport`的内容为`width=device-width`
  - 隐藏 + 折行 + 自适应空间
  - rem / viewport / media query
  - 媒体查询中，范围大的放在上面

### 面试题

- 实现两栏/三栏布局的方法
  - 表格布局
  - float + margin布局
  - inline-block布局
  - flexbox布局
- position:absolute/fixed有什么区别？
  - 前者相对最近的absolute
  - 后者相对于屏幕（viewport）
- display:inline-block的间隙
  - 原因：字符间隙
  - 处理：消灭字符或者消灭字符
- 如何清除浮动？
  - 为什么需要清除：浮动的元素不会占据父元素的布局空间
  - 让盒子负责自己的布局
  - overflow: hidden(auto)
  - ::after(clear:both)（或者使用单独一个元素）
- 如何适配移动端的页面？
  - 添加viewport
  - rem / viewport / media query
  - 设计上：隐藏 折行 自适应

## CSS（Cascading Style Sheet）效果

### box-shadow

![视频播放.jpg](https://i.loli.net/2018/11/22/5bf692bd4613d.jpg)

- 默认为外阴影
- 末尾添加`inset`表示外阴影
- 阴影的形状与原来的图形一致
- 作用
  - 营造层次感（立体感）
  - 充当没有宽度的边框
  - 实现特殊效果

### text-shadow

- 作用：立体感 / 品质感
- `text-shadow:Apx Bpx Cpx #000`
  - A-向右偏移；B-向下偏移；C-模糊

### border-radius

- 作用：圆角矩形 / 圆形(50%) / 半圆 / 扇形

- 有边框时，使用百分数更合理，使用像素时计算的是添加边框宽度后的半径

- `border-radius: A B C D / E F G H`:ABCD为水平方向的半径，EFGH为垂直方向的半径

- 扇形示例

  ```css
  .container {
      width: 100px;
      height: 100px;
      background: red;
      border-top-left-radius: 100px;
      border-top-right-radius: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
  }
  ```

- 左上角水平方向10px，垂直方向20px：`border-top-left-radius: 10px 20px`

### background

- 作用：纹理 / 图案 / 渐变
- 小技巧：雪碧图动画 / 背景图尺寸适应
- 雪碧图动图
  - 将两个图标放在同一个图片中，利用`:hover`在鼠标飘过时改变`background-position`的值并添加过度
- `background-repeat`指定是否循环
- `background-size`
  -  `cover`保持图片长宽比不变，覆盖整个容器，多余的部分不显示
  - `contain`保持图片长宽比不变，显示整个图片，容易多余的部分变为空白

### clip-path

- 对容器进行裁剪（常见几个图形 / 自定义路径）
  - `clip-path: inset(100px, 50px)`裁剪成长100px宽50px的矩形 =
- `clip-path`不改变容器内的定位

### 3D-transform

- 属性有：translate / scale / skew / rotate9
- 属性出现的顺序会影响效果

### 面试题

- 如何用一个div画XXX？
  - box-shadow无限投影
  - ::before
  - ::after
- 如何产生不占空间的边框
  - box-shadow
  - outline
- 如何实现圆形元素
  - border-radius：50%
- 如何实现IOS图标的圆角
  - clip-path：(svg)
- 如何实现半圆、扇形等图形
  - border-radius组合 ：有无边框 / 边框粗细 / 圆角半径
- 如何实现背景图居中显示 / 不重复 / 改变大小
  - background-position
  - background-repeat
  - background-size（cover / contain）（如果是百分数，则其是相对于容器的大小）

- 如何实现3D效果
  - perspective：500px
  - transform-style：preserve-3d
  - transform： translate / rotate

## CSS（Cascading Style Sheet）动画

### 概述

- 原理
  - 大脑暂存动画
- 作用
  - 愉悦感 / 引起注意 / 反馈 / 掩饰

### transition补间动画

- 位置-平移（left / right / margin / transform）
- 方位-旋转（transform）
- 大小-缩放（transform）
- 透明度（opacity）
- 其他-线性变换（transform）
- 属性
  - transition-delay：延迟多久才执行补间动画
  - transition-timing-function：定义动画进度和时间的关系
- 可在devtools/elements/animatiom查看动画
- 可在**https://www.w3cways.com/css3-animation-tool**上定制动画

### keyframes关键帧动画

- 相当于多个补间动画，与元素状态的变化无关，定义更加灵活

- 属性名：animation

- 具体属性名

  - `animation-direction`定义方向
  - `animation-iteration-count`定义动画循环次数
  - `animation-play-state`设置动画状态（可结合JS来实现更加酷炫的应用）
  - `animation-fill-mode`设置动画完成后的状态

- 定义动画

  ```css
  /* from/to可以使用百分数 */
  @keyframes animation-run{
      from{ width：100px; }
      to{ width:800px }
  }
  ```

### 逐帧动画

- 特点：适用于无法补间计算的动画 / 资源较大
- 使用`animation- timing-function：steps(1)`

### 面试题

- CSS动画的语法
  - 参考以上笔记
- CSS动画的实现方式有几种
  - transition
  - keyframes（animation）

- 过渡动画与关键帧动画的区别
  - 过渡动画需要有状态变化
  - 关键帧动画不需要状态变化
  - 关键帧动画能控制得更精细
- CSS动画的性能
  - 性能不坏
  - 部分情况下优于JS
  - 但JS可以做得更好
  - 部分高危属性性能较差，如bax-shadow

## CSS（Cascading Style Sheet）预处理器

### 概述

- 特点
  - 基于CSS的另一种语言
  - 可以通过工具将其编译成CSS
  - 添加了很多CSS不具备的特性，如变量等
  - 能提升CSS文件的组织
- 目前主流：Less / Sass
- 功能
  - 嵌套，反映层级和约束
  - 变量和计算，减少重复代码
  - Extend和Mixin，代码片段
  - 循环，适用于复杂有规律的样式
  - import，CSS文件模块化

### Sass嵌套

后缀名为`.scss`。

```scss
.outter {
	background: red;
    .inner{
		background: green;
    }
}
```

### Sass变量

变量是可以计算的。

```scss
/* 变量定义 */
$fontSize: 20px;
$bgColor: red;
/* 变量使用 */
.content {
    background: $bgColor;
    font-size: $fontsize;
}
```

### Sass Mixin

类似于JS的方法。

```scss
$fontSize: 20px;
/* Mixin 定义 */
@mixin block($fontSize) {
    font-size: $fontSize;
    color: red;
}
/* Mixin 使用 */
.content {
    @include block($fontSize);
    .inner {
        @include block($fontSize + 5px);
    }
}
```

### Sass extend

复用代码块

```scss
$fontSize: 20px;
@mixin block($fontSize) {
    font-size: $fontSize;
    color: red;
}
/* extend 定义 */
.block {
    font-size: $fontSize;
    color: red;
}
/* extend 使用 */
.content {
    @extend .block；
    background： green；
}
```

### Sass loop

循环

```scss
/* 示例生成网格系统 */
/* 循环 定义(利用mixin递归) */
@mixin gen-col($n) {
    @if $n > 0 {
        @include gen-col($n - 1);
        .col-#{$n} {
            width: 1000px / 12 * $n;
        }
    }
}
/* 循环 使用 */
@include gen-col(12);
/* 循环 定义(利用for)并使用 */
@for $i from 1 through 12 {
    .col-#{$i} {
        width: 1000px / 12 * $i;
    }
}
```

### Sass import

```scss
/* Sass中使用 @import 引入文件 */
/* 不同文件的变量、mixin等在被import到同一个文件后可以跨文件调用 */
@import "./a-scss"
@import "./b-scss"
```

### CSS预处理器框架

- SASS - Compass
- Less - Lesshat / EST
- 提供现成的mixin

### 面试题

- 预处理器的作用
  - 帮助开发者更好的组织CSS代码
  - 提高代码复用率
  - 提升可维护性
- 预处理器的能力
  - 嵌套，反映层级和约束
  - 变量和计算，减少重复代码
  - Extend和Mixin，代码片段
  - 循环，适用于复杂有规律的样式
  - import，CSS文件模块化
- 预处理器的优缺点
  - 优点：提高代码复用率和可维护性
  - 缺点：需要引入编译过程，有学习成本
