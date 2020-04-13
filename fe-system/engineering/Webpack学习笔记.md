# Webpack学习笔记

> 在学习Webpack的过程中做的一些记录，用于未来的快速回忆。

## 基础知识准备

### JS模块化的方案-进化过程

**Webpack支持三种模块化方案：AMD，ES Module（推荐），CommonJS**

- 命名空间（本质上是一个对象）

  ```javascript
  var nameSpace = {};
  nameSpace.type = nameSpace.type || {};
  nameSpace.type.method = function() {}
  ```

- CommonsJS（仅用于服务器端）

  通过`module.exports`暴露模块接口，通过`require`引入模块，同步执行，在NodeJS上运行

- AMD（Async Module Definition）

  ```javascript
   // 第一个参数为模块名，第二个参数为依赖， 第三个参数输出模块
   define('moduleName', ['require', 'exports', 'beta'], 
          function(require, exports, beta) {
            exports.verb = function() {
              return beta.verb();
              // or
              return require("beta").beta;
            }
   });
  ```

  - 一个文件为一个模块
  - 使用`define`定义模块，使用`require`加载模块
  - 典型代表：**RequireJS**
  - 依赖前置，提前执行（某个依赖里面的模块可能用不到，但还是会被执行）

- CMD（Common Module Definition）

  ```javascript
  define(function(require, exports, module) {
    // 通过 require 引入依赖
    var $ = require('jquery');
    // 通过 exports 对外提供接口
    exports.doSomathing = ...
    // 或者通过 module.exports 对外提供整个接口
    module.exports = ...
  });
  ```

  - 一个文件为一个模块
  - 使用`define`定义模块，使用`require`加载模块
  - 典型代表：**SeaJS**
  - 尽可能懒执行

- UMD（Universal Module Definition）

  - 通用解决方案
  - UMD的三个步骤
    - 判断是否支持AMD
    - 判断是否支持CommonJS
    - 若都不支持，则定义为全局变量

- ES6 module

  ```javascript
  // 引入默认 export 的内容以及名字为 name1、name2 的内容
  import theDefault, { name1, name2 } from 'src/mylib';
  // 可以进行重命名操作（export也可以进行同样的操作）
  import { name1 as newName1, name2 } from 'src/mylib';
  // 引入所有 export 的内容
  import * as mylib from 'src/mylib';
  // 只加载（load）， 不引用（import）
  import 'src/mylib';
  ```

  - 一个文件为一个模块
  - 使用`import`引入模块，使用`export`暴露模块

### CSS模块化（或者称为CSS设计模式）

- OOCSS（设计与结构分离）
- SMACSS（base+layout+module+state+theme分开定义）
- Atomic CSS（原子性思想，如`.h-12`中仅有`height=12`一个样式语句）
- MCSS（多层的CSS）
- AMCSS（针对属性进行编码，不使用class）
- BEN（Block + Element + Modifier）
- CSS Module

## 环境需要

- 命令行工具

- Node + Npm
- Webpack

## Webpack核心概念 

```javascript
// 示例
const webpack = require('webpack');
module.exports = {
  entry: {
    index: 'index.js',
    vendor: 'vendor.js'
  },
  output: {
    filename: '[name].min.[hash:5].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
```

- Entry（打包入口）
  - 代码的入口、打包的入口
  - 可以是一个或多个
- Output（打包出口）
  - 打包生成的文件（bundle）
  - 可以是一个或多个
  - 自定义规格
  - 配合CDN

- Loaders（负责处理其他（JS除外）类型资源文件）
  - 处理文件
  - 转化为模块
- Plugins（插件）
  - 参与打包整个过程
  - 打包优化和压缩
  - 配置编译时的变量

## 使用Webpack

### 使用Webpack的几种方式

- Webpack命令
  - `webpack -h`查看帮助信息
  - `webpack <entry> [<wntry>] <output>`打包
  - 可以使用**Webpack-cli**的命令来接管项目、迁移项目版本
- Webpack配置（常用）
  - 通过`webpack --config webpack.config.js`指定webpack打包时所用的配置
- 第三方脚手架
  - vue-cli
  - angular-cli
  - react-starter

### 编译ES6

直接上配置文件

```javascript
module.exports = {
  entry: {
    app: 'app.js'
  },
  output: {
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/presets-env', {
                targets: {
                  browsers: ['last 2 versions']
                }
              }]
            ]
          }
        },
        exclude: '/node_modules/'
      }
    ]
  }
}
```

### 编译TypeScript

同上，需要编辑`webpack.config.js`与`tsconfig.js`

### 提交公共代码

- 使用`webpack.optimize.CommonsChunkPlugin`来提取公共代码

- 配置

  ```javascript
  {
      plugins: [
          new webpack.optimize.CommonsChunkPlugin(options)
      ]
  }
  
  // options 说明
  options.name or options.names	// 定义chunk的名称
  options.filename		// 指定打包后的文件名
  options.minChunks		// 以数字 | 函数逻辑来指定提取哪些代码
  options.children		// 在子模块中查找依赖
  options.deepChildren	// 在所有子模块中查找依赖
  options.async			// 创建一个异步的公共代码块
  ```

- 场景
  - 单页应用
  - 单页应用 + 第三方依赖
  - 多页应用 + 第三方依赖 + webpack生成代码

### 代码分割和懒加载

- 通过`require.ensure`来动态加载依赖
  - 参数
    - []: dependencies（只加载，不执行，`require`之后才执行）
    - callback（在这里才真正执行）
    - errorCallback
    - chunkName
- 通过`require.include`也可以动态加载依赖（只加载，不执行）
- 代码分割的场景
  - 分离业务代码和第三方依赖
  - 分离业务代码和业务公共代码和第三方依赖
  - 分离首次加载和访问后加载的代码

###  处理CSS

- 引入CSS：使用style-loader、css-loader

### 文件处理

- 图片处理
  - 使用file-loader、url-loader、img-loader、postcss-sprite来处理图片
  - file-loader直接处理图片，以link的方式使用图片
  - url-loader将指定大小范围的图片打包为base64编码 
  - img-loader可用于压缩图片
  - postcss-loader、postcss-sprite合成雪碧图
- 字体文件
  - 使用file-loader、url-loader来处理图片
- 第三方JS库
  - 通过`webpack.providePlugin`
  - 通过imports-loader

