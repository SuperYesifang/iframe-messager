class IframeMessager {
	_packs = {};
	iframe = [];
	constructor({ role, iframe, origin, topEmit }) {
		this.role = role;
		this.origin = origin ?? window.location.origin;
		this.topEmit = topEmit ?? false;
		if (role === "parent") {
			this.addIframe(iframe);
		}
	}
	static isIframe(el) {
		return el && el.tagName === "IFRAME";
	}
	_send(type, args, iframe) {
		iframe.contentWindow.postMessage({ type, args }, this.origin);
	}
	_createProcessMessageHandler(type, cb) {
		return ({ data }) => (data.type === type) && cb(...data.args);
	}
	addIframe(iframe) {
		let iframes;
		if (IframeMessager.isIframe(iframe)) iframes = [iframe];
		if (iframes && (iframes instanceof Array)) {
			for (let i = 0; i < iframes.length; i++) {
				let ifr = iframes[i];
				if (IframeMessager.isIframe(ifr)) {
					if (this.iframe && this.iframe.indexOf(ifr) === -1) {
						this.iframe.push(ifr);
					}
				}
			}
		}
	}
	on(type, cb) {
		if (type && cb) {
			if (typeof type === "string", cb instanceof Function) {
				let handler = this._createProcessMessageHandler(type, cb);
				window.addEventListener("message", handler);
				let removeHandler = () => window.removeEventListener("message", handler);
				let eventPack = { type, handler, removeHandler };
				if (this._packs[type]) {
					this._packs[type].push(eventPack);
				} else {
					this._packs[type] = [eventPack];
				}
				return removeHandler;
			}
		}
	}
	off(type) {
		if (this._packs[type]) {
			this._packs[type].forEach(pack => pack.removeHandler());
		}
	}
	emit() {
		if (arguments.length) {
			let args = [...arguments];
			let type = args.shift();
			if (this.role === "parent") {
				if (this.iframe) {
					if (this.iframe instanceof Array) {
						this.iframe.forEach(iframe => {
							if (IframeMessager.isIframe(iframe)) {
								this._send(type, args, iframe);
							}
						});
					}
				}
			} else if (this.role === "children") {
				let target = this.topEmit ? "top" : "parent";
				window[target].postMessage({ type, args }, this.origin);
			}
		}

	}
}

export default IframeMessager;