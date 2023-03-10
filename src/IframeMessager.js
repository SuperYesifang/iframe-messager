class IframeMessager {
	_packs = {};
	constructor({ role, iframe }) {
		this.role = role;
		if (role === "parent") {
			this.addIframe(iframe);
		}
	}
	static isIframe(el) {
		return el && el.tagName === "IFRAME";
	}
	_send(type, payload, iframe) {
		iframe.contentWindow.postMessage({ type, payload });
	}
	_createProcessMessageHandler(type, cb) {
		return ({ data }) => (data.type === type) && cb(data.payload);
	}
	addIframe(iframe) {
		let iframes;
		if (IframeMessager.isIframe(iframe)) iframes = [iframe];
		if (iframes && (iframes instanceof Array)) {
			iframes = iframes.filter(IframeMessager.isIframe);
			if (this.iframe && (this.iframe instanceof Array)) {
				this.iframe.push(...iframes);
			}  else {
				this.iframe = iframes;
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
	emit(type, payload, iframe) {
		if (this.role === "parent") {
			let iframes = iframe ?? this.iframe;
			if (iframes) {
				if (IframeMessager.isIframe(iframes)) iframes = [iframes];
				if (iframes instanceof Array) {
					iframes.forEach(iframe => {
						if (IframeMessager.isIframe(iframe)) {
							this._send(type, payload, iframe);
						}
					});
				}
			}
		} else if (this.role === "children") {
			window.parent.postMessage({ type, payload });
		}
	}
}

export default IframeMessager;