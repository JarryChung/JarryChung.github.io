(function () {
  const books = [
    {
      title: 'Papilon',
      info: 'Vue CLI自定义版本，基于官方预设，可选初始化Axios、Lodash等',
      url: 'https://www.npmjs.com/package/papilon',
      img: './assets/images/papilon.png',
      btn: 'More'
    }, {
      title: '前端知识体系',
      info: '将前端内容划分为三大板块：视图层、网络层、工程化。',
      url: '/fe-system/',
      img: './assets/images/fe-system.png',
      btn: 'Read Now'
    }, {
      title: '计算机基础',
      info: '主要包含了计算机的一些基础内容，如算法、数据结构、编码等。',
      url: '/computer-basics/',
      img: './assets/images/computer-basics.png',
      btn: 'Read Now'
    }, {
      title: '动手',
      info: '这里包含了一些技术或组件或有趣想法的实现思路。',
      url: '/practice/',
      img: './assets/images/practice.png',
      btn: 'Read Now'
    }, {
      title: '前端面试题集',
      info: '搜集一些前端面试问题，以问答的方式呈现。',
      url: '/interview/',
      img: './assets/images/interview.png',
      btn: 'Read Now'
    }, {
      title: '胡言乱语',
      info: '爱说胡话、喜欢自言自语、与影子对话。',
      url: '/express/',
      img: './assets/images/express.png',
      btn: 'Read Now'
    }
  ]

  // 挂载到全局下的 _page_
  window._page_ = {
    books
  }
})()
