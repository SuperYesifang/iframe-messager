# iframe-messager

> This is a tool for the communication between pages and iframes.
> 
> 这是一个用于页面和iframe相互通信的工具。

[英文文档](../README.md)

<div align="center">
  <a href="https://nodei.co/npm/iframe-messager/"><img src="https://nodei.co/npm/iframe-messager.png?downloads=true&downloadRank=true&stars=true"></a>
</div>

## 运行简单示例

```shell
$ git clone https://github.com/SuperYesifang/iframe-messager.git
$ cd iframe-messager
$ npm run serve
```

## 使用
`new IframeMessager(options):IframeMessager`

**父**
```js
let iframe = document.getElementById("iframe");
let iframeMessager = new IframeMessager({ role:"parent", iframe });
iframeMessager.on("say", payload => {
	console.log("Children iframe say:" + payload);
});
iframe.contentWindow.onload = function() {
	iframeMessager.emit("say", "Hello I'am your parent.");
};
```

**子**
```js
let iframeMessager = new IframeMessager({ role:"children" });
iframeMessager.on("say", payload => {
	document.write("Parent page say:" + payload);
	iframeMessager.emit("say", "Hello I'm your children.");
});
```

### 1. 使用CDN

```html
<iframe id="iframe" src="/child.html"></iframe>
<script src="https://raw.githubusercontent.com/SuperYesifang/iframe-messager/master/dist/IframeMessager.cdn.js"></script>
<script>
	let iframe = document.getElementById("iframe");
	new IframeMessager({
	  role: "parent",
	  iframe
	});
</script>
```

### 2. 使用ESM

```js
import IframeMessager from "iframe-messager";

let iframeMessager = new IframeMessager({
  role: "parent",
  iframe
});
```

### 选项
| prop | type | description |
| -- | -- | -- |
| `role` | "parent" \| "children" | 当前页面的角色, 为"parent" 或者 "children". |
| `iframe` | HTMLElement \| HTMLElement[] | 父页面的子ifram(s). |

## API

### new IframeMessager()
`new IframeMessager(options):IframeMessager`
实例化一个iframe消息传送器。

### messager.addIframe()
`message.adIframe(iframe:IframeElement|IframeElement[]):void`
将iframe(s)添加入事件订阅。

### messager.on()
`messager.on(type:string, callback:Function):void`
注册一个事件监听器，当子iframe发射对应事件时触发。

### messager.off()
`messager.off(type):void`
注销所有事件监听器

### messager.emit()
`messager.emit(type:string, payload:any):void`
向父页面或子iframe发射一个事件。
