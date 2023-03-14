# iframe-messager

> This is a tool for the communication between pages and iframes.
> 
> 这是一个用于页面和iframe相互通信的工具。

[中文文档](./docs/zh_CN.md)

<div align="center">
  <a href="https://nodei.co/npm/iframe-messager/"><img src="https://nodei.co/npm/iframe-messager.png?downloads=true&downloadRank=true&stars=true"></a>
</div>

## Run Simple Demo

```shell
$ git clone https://github.com/SuperYesifang/iframe-messager.git
$ cd iframe-messager
$ npm run serve
```

## Usage
`new IframeMessager(options):IframeMessager`

**parent**
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

**child**
```js
let iframeMessager = new IframeMessager({ role:"children" });
iframeMessager.on("say", payload => {
	document.write("Parent page say:" + payload);
	iframeMessager.emit("say", "Hello I'm your children.");
});
```

### 1. Use CDN

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

### 2. Use ESM

```js
import IframeMessager from "iframe-messager";

let iframeMessager = new IframeMessager({
  role: "parent",
  iframe
});
```

### Options
| prop | type | description |
| -- | -- | -- |
| `role` | "parent" \| "children" | current page's role, "parent" or "children". |
| `iframe` | HTMLElement \| HTMLElement[] | parent's child iframe(s). |
| `origin` | String | message communication origin scope(Cross-Origin correlation). default: `window.location.origin` |
| `topEmit` | Boolean | the object of meesage communication target is the top window. when `role="children"`. default: `false` |

## API

### new IframeMessager()
`new IframeMessager(options):IframeMessager`
Instantiate an iframe messager.

### messager.addIframe()
`message.adIframe(iframe:IframeElement|IframeElement[]):void`
Add iframe(s) to parent's event subscription.

### messager.on()
`messager.on(type:string, callback:Function):void`
Register an event listener that is triggered when a child iframe emits an event.

### messager.off()
`messager.off(type):void`
Unregister all event listener.

### messager.emit()
`messager.emit(type:string, payload:any, payload2:any, ...):void`
Emit a event to parent page or child iframe.
