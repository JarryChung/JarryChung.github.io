# ES6学习笔记

> 在学习ES6的过程中做的一些记录，用于未来的快速回忆。

## let&const

### 作用域的概念

- ES6新增块级作用域的概念（一个大括号括起来的部分就是一个块作用域）
- let与const用于在块级作用域中声明变量，该变量仅在当前块级作用域有效
- ES6强制启用严格模式，变量未声明不允许使用

### 如何使用let与const

- let关键词用于声明变量
- const关键词用于声明常量，声明时必须赋值

- let&const关键词不能在同一个块级作用域内重复声明一个变量
- const定义的基本类型常量不能被修改，但是引用类型常量**内部**的值能被修改，只要不改变常量的引用即可

## 解构赋值

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值。

### 数组解构赋值

```javascript
// 完全解构
//本质上这种写法属于‘模式匹配‘，只要等号两边的模式相同，左边的变量就会被赋予对应的值
let [a,b,c] = [1,2,3];		// a=1,b=2,c=3
let [a,[b]] = [1, [2]];		// a=1,b=[2]
let [,,a] = [1,2,3];		// a=3
let [d,...rest] = [1,2,3,4,5,6];	// d=1,rest=[2,3,4,5,6]
// 解构不成功
// 如果解构不成功，变量的值就等于undefined
let [x,y] = ['xy']	//x='xy',y=undefined
// 不完全解构
let [i,j] = [1,2,3];	// i=1,j=2
//如果等号的右边不是数组，或者说不是可遍历的结构，那么将会报错
let [a] = 1;	// 这里会报错：Uncaught TypeError: 1 is not iterable
```

### 默认值

解构赋值允许有默认值。

```javascript
let [x,y='b'] = ['a'];
console.log(y); //b

let [x,y = 'b'] = ['a',undefined];
console.log(y); //b 
// 数组成员为undefined时，默认值仍会生效
// 因为在ES6内部使用严格相等运算符‘===‘，判断一个位置是否有值，
// 所以当一个数组成员严格等于undefined,默认值才会生效。

let [x,y = 'b'] = ['a',null];
console.log(y); //null
// 如果一个数组成员是null,默认值就不会生效，因为null不严格等于undefined
```

### 对象解构赋值

对象的解构与数组有一个重要的不同，数组的元素是按次序排列的，变量的取值由它的位置决定；而**对象的属性没有次序，变量必须与属性同名，才能取到正确的值**。

```javascript
// 变量名与属性名一致的情况下
let {foo,bar} = {foo : "aaa",bar : "bbb"}
console.log(foo); //aaa
console.log(bar); //bbb
// 实际上 对象的解构赋值是以这样的形式简写的
let {foo : foo ,bar : bar} = {foo : "aaa",bar : "bbb"}
// 变量名与属性名不一致的情况下，必须这样写
let {a : name, b : age} = {a : 'zhangsan', b : 33};
console.log(name); //zhangsan
console.log(age);  //33
```

对象的解构赋值的内部机制，是先找到同名属性，然后再赋值给对应的变量，真正被赋值的是后者，而不是前者，第一个foo/bar 是匹配的模式，对应的foo/bar属性值才是变量，真正被赋值的是属性值（也就是第二个foo/bar)。

### 字符串解构赋值

```javascript
const [a,b,c,d,e] = 'hello';
console.log(a); //h
console.log(b); //e
console.log(c); //l
console.log(d); //l
console.log(e); //o

let { length : len} = 'yahooa';
console.log(len); 
//类似数组的对象都有一个length属性，还可以对这个属性解构赋值
```

### 布尔值/数值解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象，但是等号右边为undefined 和 null时无法转为对象，所以对他们进行解构赋值时，都会报错。

```javascript
let {prop : x } = undefined;
console.log(x);
//报错：Uncaught TypeError: Cannot destructure property `prop` of 'undefined' or 'null'
```

### 函数参数解构赋值

```javascript
function move({x = 0,y = 0} = { }){
    return [x,y];
 }
console.log(move({x : 3,y : 4})); //[3,4]
console.log(move({x : 3})); //[3,0]
console.log(move({})); //[0,0]
console.log(move()); //[0,0]
// move()的参数是一个对象，通过对这个对象进行解构，得到变量x、y的值，如果解构失败，x和y 等于默认值
function move2({x,y} = {x : 1, y : 2 }){
    return [x,y];
}
console.log(move2({x : 6,y : 8})); //[6,8]
console.log(move2({})); //[undefined,undefined]
console.log(move2()); //[1,2]
// move2() 是为函数move的参数指定默认值，而不是为变量x和y指定默认值，
// 所以与前一种写法的结果不太一样，undefined 就会触发函数的默认值
```

### 解构作用

- 改变变量的值

  ```javascript
  let x = 1;
  let y = 2;
  [x,y] = [y,x];	// x=2, y=1
  ```

- 从方法返回多个值

  ```javascript
  function example(){
    return {
        foo : 'a',
        bar : 'b'
    }
  } 
  let {foo,bar} = example();	// foo='a',bar='b'
  function example222(){
    return [1,2,3,4,5];
  } 
  let [a,,...b] = example222();	// a=1, b=[3,4,5]
  ```

- 函数参数的定义

  ```javascript
  //参数是一组有次序的值
  function example([x,y,z]){
      return x + y + z;
  }
  example([1,2,3])
  console.log(example([1,2,3])); //6
  //参数是一组无次序的值
  function f({x,y,z}){
      return x + y + z;
  }
  f({x : 'a', z : 'b', y : 'c' });
  console.log(f({x : 'a', z : 'b', y : 'c' })); //acb
  ```

- 提取JSON数据

- 函数参数的默认值

- 输入模块的指定用法

## 正则扩展

### 构造函数的变化

```javascript
// ES5 的方式
let reg = new RegExp('xyz', 'i');
let reg2 = new RegExp(/xyz/i);
reg.test('xyz123');		// true
reg.test('xyz123');		// true
// ES6 方式的变化，可以有第二个参数用作修饰符
// 这种方式，第二个参数的修饰符会覆盖第一个正则表达式的修饰符
let reg3 = new RegExp(/xyz/ig, 'i')
reg3.flags		// i
```

### u修饰符

```javascript
// u -> unicode，用于处理unicode编码的正则匹配
// unicode中4个字节 = 一个字母
/^\uD83D/.test('\uD83D\uDC2A');	 	// true \uD83D\uDC2A 被当做两个字母来处理
/^\uD83D/u.test('\uD83D\uDC2A');	// false，\uD83D\uDC2A 被当作一个字母来处理
// 正则中，大括号里面若是unicode编码，需添加u修饰符才能被识别
/\u{61}/.test('a');		// false
/\u{61}/u.test('a');	// true
// 用'.'操作符识别大于两个字节的字符需要加上u修饰符
// '.'操作符不能处理换行符/回车符/行分隔符/段分隔符
/^.$/.test('吉')；	// false
/^.$/u.test('吉')；	// true
/吉{2}/.test('吉吉');	// false
/吉{2}/u.test('吉吉');	// true
// 凡是超过两个字节的匹配都需要添加 u 修饰符
```

### y修饰符

```javascript
let s = 'bbb_bb_b';
let a1 = /b+/g;
let a2 = /b+/y;
a1.exec(s);		// g修饰符全局匹配，不强调从下一个字符开始匹配，只要接下来的字符能匹配成功就ok
a2.exec(s);		// y修饰符全局匹配，必须紧跟着下一个字符开始匹配
// sticky属性用于判断是否开启了y修饰符
a1.sticky;		// false
a2.sticky;		// true
```

### s修饰符

未实现，仅作为提案

```javascript
// '.'操作符不能处理换行符/回车符/行分隔符/段分隔符
// 但添加 s 修饰符就可以
```

## 字符串扩展

### Unicode表示法

```javascript
console.log(`\u0061`);			// a
console.log(`\u20887`);			// []7，会将20087拆成2008 / 7
console.log(`\u{20887}`);		// 𠢇， 大括号括起来后，将作为一个字符处理

// 每两个字节为一个单位长度
// ES5 不能很好的处理长度超过两个字节的字符
let s = '𠢇';
s.length;		// 2
'a'.length;		// 1
s.codePointAt(0);		// 可以很好的处理长度超过两个字节的字符的码值，将字符转为码值
String.fromCodePoint("0x20087");	// 将码值转为字符
```

### 遍历接口

```javascript
let str "\u{20bb7}abc";
// ES5的遍历方式，不能很好的处理长度超过两个字节的字符
for(let i=0; i<str.length; i++) {
    console.log(str[i]);
}
// 新的遍历接口，可以自动处理任何字符
for (let code of str) {
    console.log(code);
}
```

### 模板字符串

```javascript
let name = 'list';
let info = 'hello world';
let meg = `This is ${name}, ${info}`;
console.log(meg);
```

## 数值扩展

### 新增方法

```javascript
Number.isFinite();		// 判断是否为有穷数
Number.isNaN();			// 判断是否不是数字
Number.isInteger();		// 判断是否为整数 ， 25/25.0均为true，25.1为false，参数必须为数值
Number.MAX_SAFE_INTEGER		// 数的上限，ES5
Number.MAX_SAFE_INTEGER		// 数的下限，ES5
Number.isSafeInteger();	// 判断一个数是否在有效范围内
Math.trunc();			// 取整数部分
Math.sign();			// 正数返回1，负数返回-1，0返回0
Math.cbrt();			// 求立方根
// 还补充了三角函数方法、对数方法
```

### 方法调整

将ES5中某些全局方法移到对象下面，如`parseInt()`由全局移动到`Number`对象。

## 数组扩展(新增特性)

### `Array.from`

```javascript
// 从类数组中创建数组
// 如页面中有一堆 p 标签
let p = document.querySelectorAll('p');
let pArr = Array.from(p);
// 此时，将集合p转为了数组pArr

// 将数组中的元素按照function的规则处理后并返回一个数组
Array.from([1,3,5], function(item){return item*2});		// [1,6,10]
```

### `Array.of`

```javascript
let arr = Array.of(1,2,3,4,5);		// arr=[1,2,3,4,5]
let emptyArr = Array.of();			// emptyArr=[]\
```

### `copyWithin`

```javascript
let arr = [1,2,3,4,5].copyWithin(0, 3, 5);
// arr = [4, 5, 3, 4, 5]
// 将起始位置3到终止位置5的元素覆盖掉从0开始的元素（不包括下标为5的元素）
let arr2 = [1,2,3,4,5].copyWithin(0, 1, 5);
// arr2 = [2, 3, 4, 5, 5];
```

### `find`/`findIndex`

```javascript
let val = [1,2,3,4,5,6].find(function(item){return item>3});
// val = 4
// find找到一个符合条件的元素就结束，并返回该元素的值
let index = [1,2,3,4,5,6].findIndex(function(item){return item>3});
// index = 3
// findIndex找到一个符合条件的元素就结束，并返回该元素的下标
```

### `fill`

```javascript
let arr = [1,'a',undefined];
arr.fill(6);					// arr=[6,6,6]
// 将起始位置1到终止位置3的元素替换成5(不包括下标为3的位置)
arr.fill(5,1,3);				// arr=[6,5,5]
```

### `entries`/`keys`/`values`

```javascript
for (let index of [1,2,3].keys()){
    console.log(index);					// 0,1,2
}
for (let value of [1,2,3].values()){
    console.log(value);					// 1,2,3
}
for (let [index,value] of [1,2,3].entries()){
    console.log(index, value);			// 0,1;1,2; 2,3
}
```

### `includes`

```javascript
let a = [1,2,NaN].includes(1);		// a = true
let b = [1,2,NaN].includes(NaN);	// b = true
```

## 函数扩展

### 参数默认值

```c++
// 有默认值的参数右边的参数都需要有默认值
function test(x, y='hello world') {
    console.log("默认值："， x, y);
}
test('hhh');			// 触发默认值
test('hhh', 'aaa')；		// 不触发默认值
```

```javascript
// 默认参数的作用域
let x = "test";
function test(x, y=x) {
    console.log(x, y);
}
function test2(c, y=x) {
    console.log(x, y);
}
test("hhh");		// hhh hhh
test2("hhh");		// hhh test
// 采用这种方式传递默认值时，要注意等号右边变量的作用域
// 等号右边的变量的值与最近定义的同名变量的值相同
```

### rest参数

```javascript
// rest参数后不能有其他参数
function test3(...arg) {
    for(let v of arg) {
        console.log('rest:', v)
    }
}
```

### 扩展运算符

```javascript
// 扩展运算符会将解构数据
console.log(...[1,2,3]);			// 1;2;3
console.log("a", ...[1,2,3]);		// a;1;2;3
```

### 箭头函数

```javascript
// 单个参数时可以不使用括号，多个参数时需要使用括号将其括起来
// 函数体有多个语句时，使用大括号括起来
let arrow = v => v*2;
arrow(3);					// 6

let arrow2 = () => 5;
arrow2();					// 5
```

### 尾调用

```javascript
// 函数内部的最后一句是另一个函数
// 尾调用可以提升JS的性能
// 下面例子中，fx()就实现了尾调用
function tail(x) {
    console.log(x);
}
function fx(x) {
    return tail(x);
}
fx(123);		// 123
```

## 对象扩展（新增特性）

### 简洁表示法

```javascript
// 当对象中的属性名与变量名相同时，可以只写一个
// 对象里面有方法，在ES6中可以省略function关键字
let o = 1;
let k = 2;
let obj = {
    o,
    k，
    hello () {
    	console.log('hhh');
	}
}
```

### 属性表达式

```javascript
// ES5中，对象中的key是固定的
// ES6中，key是可以用表达式或者变量的
let a = 'b';
let es5_obj = {		// {a:c}
    a: 'c'
}
let es6_obj = {		// {b:c}
    [a]: 'c'
}
```

### 扩展运算符（ES7提案）

```c++
// 不建议使用，支持不好
let {a,b,...c} = {a:'1', b:'2', c:'3', d:'5'};
// a = 1
// b = 2
// c = {c:'3', d: '5'}
```

### Object新增方法

```javascript
Object.is('abc', 'abc');			// 与===的功能相同
Object.assign({a:'1'}, {b:'2'});	// 将第二个对象的内容追加到第一个对象里，浅拷贝
// 只拷贝自身的数据，不拷贝继承的属性以及不可枚举的属性

// 遍历对象
let obj = {a:'1', b:'2'};
for(let [key, value] of Object.entries(test)) {
    console.log([key, value]);
}
```

## Symbol

### Symbol概念

这种数据类型提供一个独一无二的值。

### Symbol的作用

- 声明

  ```javascript
  // 方法1
  let a1 = Symbol();
  let a2 = Symbol();
  console.log(a1 === a2);		// false
  // 方法2
  // 在生成a3前，会检查‘a3’在全局是否存在
  // 若存在，则为取值
  // 若不存在，则为生成一个新的Symbol
  let a3 = Symbol.for('a3')
  ```

- 作用

  ```javascript
  // 可用于处理对象里面的重名，防止冲突
  let a1 = Symbol.for('abc');
  let obj = {
      [a1]: '123',
      'abc': '5',
      'c': '6'
  }
  // 常规循环只能处理非Symbol值
  for(let [key, value] of Object.entries(obj)) {
      console.log(key, value);			// {abc:'5', c:'6'}
  }
  // 这种方式只能处理Symbol值
  Object.getOwnPropertySymbol(obj).foreach(function(item) {
      console.log(obj[item]);				// 123
  })
  // 这种方式能够处理以上两种情况
  Reflect.ownKeys(obj).foreach(function(item) {
      console.log(obj[item]);				// 123，5，6
  })
  ```

## Map & Set 数据结构

### Set

- Set中的元素是不能重复的
- Set可用于数组去重
- Set里面不会自动数据类型转换

```javascript
let list = new Set();
list.add(5);	// 5
list.add(6);	// 5,6
list.size;		// 2

let arr = [1,2,3,4,5];
let list2 = new Set(arr);
list2.size;		// 5

let list3 = new Set([2, '2']);		// 2, '2'

// 几个Set常用方法
let set = new Set([1,2,3]);
set.add(5);		// 添加元素
set.has(2);		// 判断是否有某个元素
set.delete(3);	// 删除元素
set.clear();	// 清空Set

// 遍历Set
let set2 = new Set([2, '2']);
// 使用keys()与values()的效果一样，因为Set中键值一致
// 不使用keys()、values()，直接遍历Set也可以
// 也可以使用entries()
for(let key of set2.keys()) {
    console.log(key);			// 2, '2'
}
for(let value of set2.values()) {
    console.log(value);			// 2, '2'
}
for(let val of set2) {
    console.log(val);			// 2, '2'
}
for(let [key,value] of set2.values()) {
    console.log([key, value]);	// 2, '2'
}
```

### WeakSet

- WeakSet的元素只能是对象
- WeakSet存储的是弱引用，且不会检测是否被垃圾回收机制回收

```javascript
let weakList = new WeakSet();
let arg = {};
weakList.add(arg);		// arg
// WeakSet没有clear方法、没有size属性、不能遍历
```

### Map

- 任意数据类型都可以作为Map的数据类型

```javascript
let map = new Map();
let arr = ['123'];
map.set(arr, 123);		// ['123']=>123
map.get(arr);			// 123

// Map可以接收一个二维数组作为参数
let map2 = new Map([['a',123],['b',456]]);
console.log(map2);		// 'a'=>123, 'b'=>456
map2.size;				// 2
map2.delete('a')；		// 'b'=>456
map2.clear();			// 清空Map
```

### WeakMap

- WeakMap的key只能是对象
- WeakMap没有clear方法、没有size属性、不能遍历
- WeakMap存储的是弱引用，且不会检测是否被垃圾回收机制回收

```javascript
let weakMap = new WeakMap();
let arg = {};
weakMap.set(arg, 123);
weakMap.get(arg);			// 123
```

### Map和Array的对比

```javascript
let map = new Map();
let array = [];
// add
map.set('t', 1);		// 't'=>1
array.push({t:1});		// {t:1}
// query
let map_exist = map.has('t');					// true
let array_exist = array.find(item=>item.t);		// {t:1}
// modify
map.set('t', 2);								// 't' => 2
array.forEach(item => item.t?item.t=2:'');		// {t:2}
// delete
map.delete('t');
let index = array.findIndex(item => item.t);
array.splice(index, 1);
```

### Set和Array的对比

```javascript
let set = new Set();
let arr = [];
// add
set.add({t:1});
arr.push({t:1});
// query
let set_exist = set.has({t:1});				// false,因为是不同的引用
let arr_exist = array.find(item=>item.t);	// {t:1}
// modify
set.forEach(item => item.t?item.t=2:'');	// 若直接add，则不能修改成功，因为引用不同
arr.forEach(item => item.t?item.t=2:'');	// 这里遍历是确保{t:1}存在
// delete
set.forEach(item => item.t?delete(item):'');
let index = array.findIndex(item => item.t);
array.splice(index, 1);
```

### Map、Set、Object的对比

```javascript
let item = {t:1};
let map = new Map();
let set = new Set();
let obj = {};
// add
map.set('t', 1);
set.add(item);
obj['t'] = 1;
// query
let map_exist = map.has('t');
let set_exist = set.has(item);
let obj_exist = 't' in obj;
// modify
map.set('t', 2);
item.t = 2;				// 这里，set存储的是引用，因此对对象的修改也会修改set里面对应的值
obj['t'] = 2;
// delete
map.delete('t');
set.selete(item);
delete obj['t'];
```

## Proxy与Reflect

### Proxy的使用

```javascript
// Proxy为代理，在用户和对象之间设置代理，防止用户直接操作对象
// 同时，可以在代理上做一些操作来修改查询到的内容
// 或者限制用户对某些属性的修改行为
let obj = {
    time: '2018-11-21',
    name: 'net',
    _r: 123
};
let monitor = new Proxy(obj, {
    // 拦截对象属性的读取
    // 这里，当查询的value中有2018字符串时将其替换成2019
    get (target, key) {
        return target[key].replace('2018', '2019');		// 将2018替换成2019
    },
    // 拦截对象属性的修改
    // 这里只允许对name的修改
    set (target, key, value) {
      if(key === 'name') {
        return target[key] = value;
      } else {
        return target[key];
      }
  	},
    // 拦截key in obj操作，限制暴露哪些属性
    // 此处只允许判断是否存在name这个key，对于其它key一律返回false
    has (target, key) {
      if (key === 'name') {
        return target[key];
      } else {
        return false;
      }
    },
    // 拦截delete
    // 这里只允许删除以下划线开头的属性
    deleteProperty (target, key) {
      if (key.indexOf('_') > -1) {
        delete target[key];
        return true;
      } else {
        return target[key];
      }
    },
    // 拦截Object.keys，Object.getOwnPropertySymbols，Object.getOwnPropertyNames
    // 这里将time属性属性过滤掉
    ownKeys (target) {
      return Object.keys(target).filter(item => item!='time')
    }
});
monitor.time;			// 2019-11-21
monitor.time = '2015-11-21';		// 2018-11-21
monitor.name = 'Chung';				// Chung
'name' in monitor;            // true
'time' in monitor;            // false
```

### Reflect的使用

```javascript
// 使用Reflect有以下好处 
// 1.更加有用的返回值
// 2.函数操作，如判断一个属性是否在该obj里面， Reflect.has(obj, key)
// 3.更加可靠的函数式执行方式
// 4.可变参数形式的构造函数
// 5.控制访问器或者读取器的this
// Reflect用于代替直接操作对象
// 建议使用Reflect来操作对象
let obj = {
    time: '2018-11-21',
    name: 'net',
    _r: 123
};
Reflect.get(obj, 'time');     // 2018-11-21
Reflect.set(obj, 'name', 'Chung');    // name: 'Chung'
Reflect.has(obj, 'name');     // true
```

### 使用场景

```javascript
// 使用Proxy和Reflect实现解耦的数据校验
function validator (target, validator) {
  return new Proxy(target, {
    _validator: validator,
    set (target, key, value, proxy) {
      if (target.hasOwnProperty(key)) {
        let val = this._validator[key];
        if(!!val(value)) {
          return Reflect.set(target, key, value, proxy);
        } else {
          throw Error(`Can not set ${key} to ${value}!`);
        }
      } else {
        throw Error(`${key} not exist!`)
      }
    }
  })
}

const personValidator = {
  name (val) {
    return typeof val === 'string';
  },
  age (val) {
    return typeof val === 'number' && val > 18;
  }
}

class Person {
  constructor (name, age) {
    this.name = name;
    this.age = age;
    return validator(this, personValidator)
  }
}

const person = new Person('hh', 18);
console.info(person);       // {name: 'hh', age: '18'}
person.name = 20;           // 不能设置为20，因为 personValidator 限制name的值只能是string
```

## 类和对象

### 基本定义和生成实例

```javascript
// 定义类
class Person {
  constructor (name='Jarry') {
    this.name = name;
  }
}
// 生成实例
let person = new Person('Chung');
console.log(person);      // Person {name: ‘Chung’}
```

### 继承

```javascript
// 定义类
class Person {
  constructor (name='Jarry') {
    this.name = name;
  }
}
// 使用extends继承
class Student extends Person {
  constructor (name='Sunny') {
    super(name);    // 将子类的参数传递给父类
    // 若子类有自己的属性，则需要将自有属性放在super()下面
  }
}
// 生成实例
let stu = new Student();
console.log(stu);   // Student {name: 'Sunny'}
```

### Getter 和 Setter

```javascript
// 定义类
class Person {
  constructor (name='Jarry') {
    this.name = name;
  }
  // longName是属性而不是方法
  get longName () {
    return 'Good ' + this.name;
  }

  set longName (value) {
    this.name = value;
  }
}
// 生成实例
let person = new Person();
person.longName;          // 'Good Jarry'
person.longName = 'Chung';    // 'Good Chung'
```

### 静态属性和静态方法

```javascript
// 定义类
class Person {
  constructor (name='Jarry') {
    this.name = name;
  }
  // 使用static关键字定义静态方法
  static tell () {
    console.log('hello');
  }
}
// 定义完类后再定义静态属性
Person.age = '18';

// 调用静态方法，使用类名调用而非实例调用
Person.tell();      // 'hello'
Person.age;         // 18
```

## Promise

- Promise是异步编程的一种解决方案

### Promise基本使用

```javascript
// 以回调函数处理异步
let ajax = function(callback) {
  console.log('执行1');
  setTimeout(function() {
    callback && callback.call();
  }, 1000)
}
ajax(function() {
  console.log('Timeout One');
})

// 以Promise处理异步
let ajax = function() {
  console.log("执行2");
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, 1000)
  })
}
ajax().then(function() {
  console.log('Timeout Two');  
})
// 上面的结果为：
// 执行1
// 执行2
// Timeout One
// Timeout Two
```

### Promise使用场景

```javascript
// 所有图片加载完再添加到页面
function loadImg(src) {
  return new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = src;
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject(err)
    }
  })
}

function showImgs(imgs) {
  imgs.forEach(function(img) {
    document.body.append(img)
  })
}
// all 将多个promise当作一个，全部加载完后才执行resolve
Promise.all([
  loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
  loadImg('http://i4.buimg.com/567571/df1ef0720bea6833.png')
]).then(showImgs)
// race, 数组中某一个执行完就马上执行resolve
Promise.race([
  loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
  loadImg('http://i4.buimg.com/567571/df1ef0720bea6833.png')
]).then(showImgs)
```

## Iterator

- `for...of`本质上是使用Iterator接口

```javascript
let arr = [1,2];
let map = arr[Symbol.iterator]();
map.next();         // {value:1, done:false}
map.next();         // {value:2, done:false}
map.next();         // {value:undefined, done:true}

// 为对象实现iterator接口并指定遍历方式
let obj = {
  start: [1,2,3],
  end: [7,8,9],
  [Symbol.iterator] () {
    let seft = this;
    let index = 0;
    let arr = seft.start.concat(self.end);
    let len = arr.length;
    return {
      next () {
        if (index < len) {
          return {
            value: arr[index++],
            done: false
          }
        } else {
          return {
            value: arr[index++],
            done: true
          }
        }
      }
    }
  }
}

for(let key of obj) {
  console.log(key);         // 1,2,3,7,8,9
}
```

## Generator

 ### Generator基本定义与使用

```javascript
let tell = function* () {
  yield 'a';
  yield 'b';
  return 'c';
}
let k = tell();
k.next();         // {value:'a', done:false}
k.next();         // {value:'b', done:false}
k.next();         // {value:'c', done:true}
k.next();         // {value:'undefined', done:true}

let obj = {};
obj[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
}
for(let value of obj) {
  console.log(value);         // 1,2,3
}
```

### 实例

```javascript
// 应用1：状态机
// 假设某一事物只有三种状态，该事物仅在这三种状态中转换
// 以下生成器使得state仅在A、B、C间转换
let state = function* () {
  while(1) {
    yield 'A';
    yield 'B';
    yield 'C';
  }
}

// 应用2：限制抽奖次数
let draw = function(count) {
  // 此处为具体的抽奖逻辑
  console.log(`Remain ${count}`);
}

let residue = function* (count) {
  while (count>0) {
    count --;
    yield draw(count);
  }
}

// 应用3：长轮询
let ajax = function* () {
  yield new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve({code:0});
    }, 200);
  })
}

let pull = function() {
  let generator = ajax();
  let step = generator.next();
  step.value.then(function(val) {
    if(val.code !== 0) {
      setTimeout(() => {
        console.log('wait');
        pull();
      }, 1000);
    } else {
      console.log(val);
    }
  })
}

pull();
```

## Decorator

- 修饰器是一个函数，用来修改类的类型
- 第三方库**core-decorators**提供了现成的修饰器
- 解决了两个问题
  - 不同类间共享方法
  - **编译期**对类和方法的行为进行改变
- 参数
  - target - 目标类
  - name - 属性
  - descriptor - 属性描述符

```javascript
// *修饰器特性在将来的ES版本可能会被移除
let readonly = function (target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Test{
  @readonly
  time () {
    return '2018-11-21';
  }
}
let t = new Test();
t.time = function(){};      // 会报错，因为修饰器不允许对该方法进行修改

// 也可修饰整个类
let typename = function (target, name, descriptor) {
  target.myname = 'hello';
}
@typename
class Name{}
console.log(Name.myname);

// 实例：日志系统的埋点
let log = (type) => {
  return function (target, name, descriptor) {
    let src_method = descriptor.value;
    descriptor.value = (...arg) => {
      src_method.apply(target, arg);
      console.log(`log ${type}`);
    }
  }
}

class AD{
  @log('show')
  show () {
    console.info('ad is shown');
  }
  @@log('click')
  click () {
    console.log('ad is clicked')
  }
}
```

