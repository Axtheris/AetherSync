import { open as bt, stat as Tt } from "node:fs/promises";
import { g as yt } from "./main-uIdG6Mj1.js";
import $e from "tty";
import kt from "util";
import It from "os";
const vt = "End-Of-Stream";
let y = class extends Error {
  constructor() {
    super(vt), this.name = "EndOfStreamError";
  }
};
class je extends Error {
  constructor(e = "The operation was aborted") {
    super(e), this.name = "AbortError";
  }
}
class St {
  constructor() {
    this.resolve = () => null, this.reject = () => null, this.promise = new Promise((e, t) => {
      this.reject = t, this.resolve = e;
    });
  }
}
let de = class {
  constructor() {
    this.endOfStream = !1, this.interrupted = !1, this.peekQueue = [];
  }
  async peek(e, t = !1) {
    const r = await this.read(e, t);
    return this.peekQueue.push(e.subarray(0, r)), r;
  }
  async read(e, t = !1) {
    if (e.length === 0)
      return 0;
    let r = this.readFromPeekBuffer(e);
    if (this.endOfStream || (r += await this.readRemainderFromStream(e.subarray(r), t)), r === 0 && !t)
      throw new y();
    return r;
  }
  /**
   * Read chunk from stream
   * @param buffer - Target Uint8Array (or Buffer) to store data read from stream in
   * @returns Number of bytes read
   */
  readFromPeekBuffer(e) {
    let t = e.length, r = 0;
    for (; this.peekQueue.length > 0 && t > 0; ) {
      const a = this.peekQueue.pop();
      if (!a)
        throw new Error("peekData should be defined");
      const n = Math.min(a.length, t);
      e.set(a.subarray(0, n), r), r += n, t -= n, n < a.length && this.peekQueue.push(a.subarray(n));
    }
    return r;
  }
  async readRemainderFromStream(e, t) {
    let r = 0;
    for (; r < e.length && !this.endOfStream; ) {
      if (this.interrupted)
        throw new je();
      const a = await this.readFromStream(e.subarray(r), t);
      if (a === 0)
        break;
      r += a;
    }
    if (!t && r < e.length)
      throw new y();
    return r;
  }
};
class Ct extends de {
  constructor(e) {
    if (super(), this.s = e, this.deferred = null, !e.read || !e.once)
      throw new Error("Expected an instance of stream.Readable");
    this.s.once("end", () => {
      this.endOfStream = !0, this.deferred && this.deferred.resolve(0);
    }), this.s.once("error", (t) => this.reject(t)), this.s.once("close", () => this.abort());
  }
  /**
   * Read chunk from stream
   * @param buffer Target Uint8Array (or Buffer) to store data read from stream in
   * @param mayBeLess - If true, may fill the buffer partially
   * @returns Number of bytes read
   */
  async readFromStream(e, t) {
    if (e.length === 0)
      return 0;
    const r = this.s.read(e.length);
    if (r)
      return e.set(r), r.length;
    const a = {
      buffer: e,
      mayBeLess: t,
      deferred: new St()
    };
    return this.deferred = a.deferred, this.s.once("readable", () => {
      this.readDeferred(a);
    }), a.deferred.promise;
  }
  /**
   * Process deferred read request
   * @param request Deferred read request
   */
  readDeferred(e) {
    const t = this.s.read(e.buffer.length);
    t ? (e.buffer.set(t), e.deferred.resolve(t.length), this.deferred = null) : this.s.once("readable", () => {
      this.readDeferred(e);
    });
  }
  reject(e) {
    this.interrupted = !0, this.deferred && (this.deferred.reject(e), this.deferred = null);
  }
  async abort() {
    this.reject(new je());
  }
  async close() {
    return this.abort();
  }
}
let At = class extends de {
  constructor(e) {
    super(), this.reader = e;
  }
  async abort() {
    return this.close();
  }
  async close() {
    this.reader.releaseLock();
  }
};
class Et extends At {
  /**
   * Read from stream
   * @param buffer - Target Uint8Array (or Buffer) to store data read from stream in
   * @param mayBeLess - If true, may fill the buffer partially
   * @protected Bytes read
   */
  async readFromStream(e, t) {
    if (e.length === 0)
      return 0;
    const r = await this.reader.read(new Uint8Array(e.length), { min: t ? void 0 : e.length });
    return r.done && (this.endOfStream = r.done), r.value ? (e.set(r.value), r.value.length) : 0;
  }
}
class ke extends de {
  constructor(e) {
    super(), this.reader = e, this.buffer = null;
  }
  /**
   * Copy chunk to target, and store the remainder in this.buffer
   */
  writeChunk(e, t) {
    const r = Math.min(t.length, e.length);
    return e.set(t.subarray(0, r)), r < t.length ? this.buffer = t.subarray(r) : this.buffer = null, r;
  }
  /**
   * Read from stream
   * @param buffer - Target Uint8Array (or Buffer) to store data read from stream in
   * @param mayBeLess - If true, may fill the buffer partially
   * @protected Bytes read
   */
  async readFromStream(e, t) {
    if (e.length === 0)
      return 0;
    let r = 0;
    for (this.buffer && (r += this.writeChunk(e, this.buffer)); r < e.length && !this.endOfStream; ) {
      const a = await this.reader.read();
      if (a.done) {
        this.endOfStream = !0;
        break;
      }
      a.value && (r += this.writeChunk(e.subarray(r), a.value));
    }
    if (!t && r === 0 && this.endOfStream)
      throw new y();
    return r;
  }
  abort() {
    return this.interrupted = !0, this.reader.cancel();
  }
  async close() {
    await this.abort(), this.reader.releaseLock();
  }
}
function Rt(i) {
  try {
    const e = i.getReader({ mode: "byob" });
    return e instanceof ReadableStreamDefaultReader ? new ke(e) : new Et(e);
  } catch (e) {
    if (e instanceof TypeError)
      return new ke(i.getReader());
    throw e;
  }
}
let he = class {
  /**
   * Constructor
   * @param options Tokenizer options
   * @protected
   */
  constructor(e) {
    this.numBuffer = new Uint8Array(8), this.position = 0, this.onClose = e == null ? void 0 : e.onClose, e != null && e.abortSignal && e.abortSignal.addEventListener("abort", () => {
      this.abort();
    });
  }
  /**
   * Read a token from the tokenizer-stream
   * @param token - The token to read
   * @param position - If provided, the desired position in the tokenizer-stream
   * @returns Promise with token data
   */
  async readToken(e, t = this.position) {
    const r = new Uint8Array(e.len);
    if (await this.readBuffer(r, { position: t }) < e.len)
      throw new y();
    return e.get(r, 0);
  }
  /**
   * Peek a token from the tokenizer-stream.
   * @param token - Token to peek from the tokenizer-stream.
   * @param position - Offset where to begin reading within the file. If position is null, data will be read from the current file position.
   * @returns Promise with token data
   */
  async peekToken(e, t = this.position) {
    const r = new Uint8Array(e.len);
    if (await this.peekBuffer(r, { position: t }) < e.len)
      throw new y();
    return e.get(r, 0);
  }
  /**
   * Read a numeric token from the stream
   * @param token - Numeric token
   * @returns Promise with number
   */
  async readNumber(e) {
    if (await this.readBuffer(this.numBuffer, { length: e.len }) < e.len)
      throw new y();
    return e.get(this.numBuffer, 0);
  }
  /**
   * Read a numeric token from the stream
   * @param token - Numeric token
   * @returns Promise with number
   */
  async peekNumber(e) {
    if (await this.peekBuffer(this.numBuffer, { length: e.len }) < e.len)
      throw new y();
    return e.get(this.numBuffer, 0);
  }
  /**
   * Ignore number of bytes, advances the pointer in under tokenizer-stream.
   * @param length - Number of bytes to ignore
   * @return resolves the number of bytes ignored, equals length if this available, otherwise the number of bytes available
   */
  async ignore(e) {
    if (this.fileInfo.size !== void 0) {
      const t = this.fileInfo.size - this.position;
      if (e > t)
        return this.position += t, t;
    }
    return this.position += e, e;
  }
  async close() {
    var e;
    await this.abort(), await ((e = this.onClose) == null ? void 0 : e.call(this));
  }
  normalizeOptions(e, t) {
    if (!this.supportsRandomAccess() && t && t.position !== void 0 && t.position < this.position)
      throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
    return {
      mayBeLess: !1,
      offset: 0,
      length: e.length,
      position: this.position,
      ...t
    };
  }
  abort() {
    return Promise.resolve();
  }
};
const _t = 256e3;
let We = class extends he {
  /**
   * Constructor
   * @param streamReader stream-reader to read from
   * @param options Tokenizer options
   */
  constructor(e, t) {
    super(t), this.streamReader = e, this.fileInfo = (t == null ? void 0 : t.fileInfo) ?? {};
  }
  /**
   * Read buffer from tokenizer
   * @param uint8Array - Target Uint8Array to fill with data read from the tokenizer-stream
   * @param options - Read behaviour options
   * @returns Promise with number of bytes read
   */
  async readBuffer(e, t) {
    const r = this.normalizeOptions(e, t), a = r.position - this.position;
    if (a > 0)
      return await this.ignore(a), this.readBuffer(e, t);
    if (a < 0)
      throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
    if (r.length === 0)
      return 0;
    const n = await this.streamReader.read(e.subarray(0, r.length), r.mayBeLess);
    if (this.position += n, (!t || !t.mayBeLess) && n < r.length)
      throw new y();
    return n;
  }
  /**
   * Peek (read ahead) buffer from tokenizer
   * @param uint8Array - Uint8Array (or Buffer) to write data to
   * @param options - Read behaviour options
   * @returns Promise with number of bytes peeked
   */
  async peekBuffer(e, t) {
    const r = this.normalizeOptions(e, t);
    let a = 0;
    if (r.position) {
      const n = r.position - this.position;
      if (n > 0) {
        const s = new Uint8Array(r.length + n);
        return a = await this.peekBuffer(s, { mayBeLess: r.mayBeLess }), e.set(s.subarray(n)), a - n;
      }
      if (n < 0)
        throw new Error("Cannot peek from a negative offset in a stream");
    }
    if (r.length > 0) {
      try {
        a = await this.streamReader.peek(e.subarray(0, r.length), r.mayBeLess);
      } catch (n) {
        if (t != null && t.mayBeLess && n instanceof y)
          return 0;
        throw n;
      }
      if (!r.mayBeLess && a < r.length)
        throw new y();
    }
    return a;
  }
  async ignore(e) {
    const t = Math.min(_t, e), r = new Uint8Array(t);
    let a = 0;
    for (; a < e; ) {
      const n = e - a, s = await this.readBuffer(r, { length: Math.min(t, n) });
      if (s < 0)
        return s;
      a += s;
    }
    return a;
  }
  abort() {
    return this.streamReader.abort();
  }
  async close() {
    return this.streamReader.close();
  }
  supportsRandomAccess() {
    return !1;
  }
}, Bt = class extends he {
  /**
   * Construct BufferTokenizer
   * @param uint8Array - Uint8Array to tokenize
   * @param options Tokenizer options
   */
  constructor(e, t) {
    super(t), this.uint8Array = e, this.fileInfo = { ...(t == null ? void 0 : t.fileInfo) ?? {}, size: e.length };
  }
  /**
   * Read buffer from tokenizer
   * @param uint8Array - Uint8Array to tokenize
   * @param options - Read behaviour options
   * @returns {Promise<number>}
   */
  async readBuffer(e, t) {
    t != null && t.position && (this.position = t.position);
    const r = await this.peekBuffer(e, t);
    return this.position += r, r;
  }
  /**
   * Peek (read ahead) buffer from tokenizer
   * @param uint8Array
   * @param options - Read behaviour options
   * @returns {Promise<number>}
   */
  async peekBuffer(e, t) {
    const r = this.normalizeOptions(e, t), a = Math.min(this.uint8Array.length - r.position, r.length);
    if (!r.mayBeLess && a < r.length)
      throw new y();
    return e.set(this.uint8Array.subarray(r.position, r.position + a)), a;
  }
  close() {
    return super.close();
  }
  supportsRandomAccess() {
    return !0;
  }
  setPosition(e) {
    this.position = e;
  }
};
function Mt(i, e) {
  const t = new Ct(i), r = e ?? {}, a = r.onClose;
  return r.onClose = async () => {
    if (await t.close(), a)
      return a();
  }, new We(t, r);
}
function Ft(i, e) {
  const t = Rt(i), r = e ?? {}, a = r.onClose;
  return r.onClose = async () => {
    if (await t.close(), a)
      return a();
  }, new We(t, r);
}
function le(i, e) {
  return new Bt(i, e);
}
class xe extends he {
  /**
   * Create tokenizer from provided file path
   * @param sourceFilePath File path
   */
  static async fromFile(e) {
    const t = await bt(e, "r"), r = await t.stat();
    return new xe(t, { fileInfo: { path: e, size: r.size } });
  }
  constructor(e, t) {
    super(t), this.fileHandle = e, this.fileInfo = t.fileInfo;
  }
  /**
   * Read buffer from file
   * @param uint8Array - Uint8Array to write result to
   * @param options - Read behaviour options
   * @returns Promise number of bytes read
   */
  async readBuffer(e, t) {
    const r = this.normalizeOptions(e, t);
    if (this.position = r.position, r.length === 0)
      return 0;
    const a = await this.fileHandle.read(e, 0, r.length, r.position);
    if (this.position += a.bytesRead, a.bytesRead < r.length && (!t || !t.mayBeLess))
      throw new y();
    return a.bytesRead;
  }
  /**
   * Peek buffer from file
   * @param uint8Array - Uint8Array (or Buffer) to write data to
   * @param options - Read behaviour options
   * @returns Promise number of bytes read
   */
  async peekBuffer(e, t) {
    const r = this.normalizeOptions(e, t), a = await this.fileHandle.read(e, 0, r.length, r.position);
    if (!r.mayBeLess && a.bytesRead < r.length)
      throw new y();
    return a.bytesRead;
  }
  async close() {
    return await this.fileHandle.close(), super.close();
  }
  setPosition(e) {
    this.position = e;
  }
  supportsRandomAccess() {
    return !0;
  }
}
async function Ot(i, e) {
  const t = Mt(i, e);
  if (i.path) {
    const r = await Tt(i.path);
    t.fileInfo.path = i.path, t.fileInfo.size = r.size;
  }
  return t;
}
const Dt = xe.fromFile;
var ue = { exports: {} }, G = { exports: {} }, ae, Ie;
function Lt() {
  if (Ie) return ae;
  Ie = 1;
  var i = 1e3, e = i * 60, t = e * 60, r = t * 24, a = r * 7, n = r * 365.25;
  ae = function(m, o) {
    o = o || {};
    var l = typeof m;
    if (l === "string" && m.length > 0)
      return s(m);
    if (l === "number" && isFinite(m))
      return o.long ? c(m) : u(m);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(m)
    );
  };
  function s(m) {
    if (m = String(m), !(m.length > 100)) {
      var o = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        m
      );
      if (o) {
        var l = parseFloat(o[1]), f = (o[2] || "ms").toLowerCase();
        switch (f) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return l * n;
          case "weeks":
          case "week":
          case "w":
            return l * a;
          case "days":
          case "day":
          case "d":
            return l * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return l * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return l * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return l * i;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return l;
          default:
            return;
        }
      }
    }
  }
  function u(m) {
    var o = Math.abs(m);
    return o >= r ? Math.round(m / r) + "d" : o >= t ? Math.round(m / t) + "h" : o >= e ? Math.round(m / e) + "m" : o >= i ? Math.round(m / i) + "s" : m + "ms";
  }
  function c(m) {
    var o = Math.abs(m);
    return o >= r ? p(m, o, r, "day") : o >= t ? p(m, o, t, "hour") : o >= e ? p(m, o, e, "minute") : o >= i ? p(m, o, i, "second") : m + " ms";
  }
  function p(m, o, l, f) {
    var h = o >= l * 1.5;
    return Math.round(m / l) + " " + f + (h ? "s" : "");
  }
  return ae;
}
var ne, ve;
function qe() {
  if (ve) return ne;
  ve = 1;
  function i(e) {
    r.debug = r, r.default = r, r.coerce = p, r.disable = u, r.enable = n, r.enabled = c, r.humanize = Lt(), r.destroy = m, Object.keys(e).forEach((o) => {
      r[o] = e[o];
    }), r.names = [], r.skips = [], r.formatters = {};
    function t(o) {
      let l = 0;
      for (let f = 0; f < o.length; f++)
        l = (l << 5) - l + o.charCodeAt(f), l |= 0;
      return r.colors[Math.abs(l) % r.colors.length];
    }
    r.selectColor = t;
    function r(o) {
      let l, f = null, h, x;
      function w(...b) {
        if (!w.enabled)
          return;
        const E = w, U = Number(/* @__PURE__ */ new Date()), xt = U - (l || U);
        E.diff = xt, E.prev = l, E.curr = U, l = U, b[0] = r.coerce(b[0]), typeof b[0] != "string" && b.unshift("%O");
        let X = 0;
        b[0] = b[0].replace(/%([a-zA-Z%])/g, (re, gt) => {
          if (re === "%%")
            return "%";
          X++;
          const ye = r.formatters[gt];
          if (typeof ye == "function") {
            const wt = b[X];
            re = ye.call(E, wt), b.splice(X, 1), X--;
          }
          return re;
        }), r.formatArgs.call(E, b), (E.log || r.log).apply(E, b);
      }
      return w.namespace = o, w.useColors = r.useColors(), w.color = r.selectColor(o), w.extend = a, w.destroy = r.destroy, Object.defineProperty(w, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => f !== null ? f : (h !== r.namespaces && (h = r.namespaces, x = r.enabled(o)), x),
        set: (b) => {
          f = b;
        }
      }), typeof r.init == "function" && r.init(w), w;
    }
    function a(o, l) {
      const f = r(this.namespace + (typeof l > "u" ? ":" : l) + o);
      return f.log = this.log, f;
    }
    function n(o) {
      r.save(o), r.namespaces = o, r.names = [], r.skips = [];
      const l = (typeof o == "string" ? o : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const f of l)
        f[0] === "-" ? r.skips.push(f.slice(1)) : r.names.push(f);
    }
    function s(o, l) {
      let f = 0, h = 0, x = -1, w = 0;
      for (; f < o.length; )
        if (h < l.length && (l[h] === o[f] || l[h] === "*"))
          l[h] === "*" ? (x = h, w = f, h++) : (f++, h++);
        else if (x !== -1)
          h = x + 1, w++, f = w;
        else
          return !1;
      for (; h < l.length && l[h] === "*"; )
        h++;
      return h === l.length;
    }
    function u() {
      const o = [
        ...r.names,
        ...r.skips.map((l) => "-" + l)
      ].join(",");
      return r.enable(""), o;
    }
    function c(o) {
      for (const l of r.skips)
        if (s(o, l))
          return !1;
      for (const l of r.names)
        if (s(o, l))
          return !0;
      return !1;
    }
    function p(o) {
      return o instanceof Error ? o.stack || o.message : o;
    }
    function m() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return ne = i, ne;
}
var Se;
function Pt() {
  return Se || (Se = 1, function(i, e) {
    e.formatArgs = r, e.save = a, e.load = n, e.useColors = t, e.storage = s(), e.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), e.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function t() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + i.exports.humanize(this.diff), !this.useColors)
        return;
      const p = "color: " + this.color;
      c.splice(1, 0, p, "color: inherit");
      let m = 0, o = 0;
      c[0].replace(/%[a-zA-Z%]/g, (l) => {
        l !== "%%" && (m++, l === "%c" && (o = m));
      }), c.splice(o, 0, p);
    }
    e.log = console.debug || console.log || (() => {
    });
    function a(c) {
      try {
        c ? e.storage.setItem("debug", c) : e.storage.removeItem("debug");
      } catch {
      }
    }
    function n() {
      let c;
      try {
        c = e.storage.getItem("debug") || e.storage.getItem("DEBUG");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function s() {
      try {
        return localStorage;
      } catch {
      }
    }
    i.exports = qe()(e);
    const { formatters: u } = i.exports;
    u.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (p) {
        return "[UnexpectedJSONParseError]: " + p.message;
      }
    };
  }(G, G.exports)), G.exports;
}
var $ = { exports: {} }, se, Ce;
function zt() {
  return Ce || (Ce = 1, se = (i, e = process.argv) => {
    const t = i.startsWith("-") ? "" : i.length === 1 ? "-" : "--", r = e.indexOf(t + i), a = e.indexOf("--");
    return r !== -1 && (a === -1 || r < a);
  }), se;
}
var oe, Ae;
function Nt() {
  if (Ae) return oe;
  Ae = 1;
  const i = It, e = $e, t = zt(), { env: r } = process;
  let a;
  t("no-color") || t("no-colors") || t("color=false") || t("color=never") ? a = 0 : (t("color") || t("colors") || t("color=true") || t("color=always")) && (a = 1), "FORCE_COLOR" in r && (r.FORCE_COLOR === "true" ? a = 1 : r.FORCE_COLOR === "false" ? a = 0 : a = r.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(r.FORCE_COLOR, 10), 3));
  function n(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function s(c, p) {
    if (a === 0)
      return 0;
    if (t("color=16m") || t("color=full") || t("color=truecolor"))
      return 3;
    if (t("color=256"))
      return 2;
    if (c && !p && a === void 0)
      return 0;
    const m = a || 0;
    if (r.TERM === "dumb")
      return m;
    if (process.platform === "win32") {
      const o = i.release().split(".");
      return Number(o[0]) >= 10 && Number(o[2]) >= 10586 ? Number(o[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((o) => o in r) || r.CI_NAME === "codeship" ? 1 : m;
    if ("TEAMCITY_VERSION" in r)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
    if (r.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in r) {
      const o = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (r.TERM_PROGRAM) {
        case "iTerm.app":
          return o >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : m;
  }
  function u(c) {
    const p = s(c, c && c.isTTY);
    return n(p);
  }
  return oe = {
    supportsColor: u,
    stdout: n(s(!0, e.isatty(1))),
    stderr: n(s(!0, e.isatty(2)))
  }, oe;
}
var Ee;
function Ut() {
  return Ee || (Ee = 1, function(i, e) {
    const t = $e, r = kt;
    e.init = m, e.log = u, e.formatArgs = n, e.save = c, e.load = p, e.useColors = a, e.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), e.colors = [6, 2, 3, 4, 5, 1];
    try {
      const l = Nt();
      l && (l.stderr || l).level >= 2 && (e.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    e.inspectOpts = Object.keys(process.env).filter((l) => /^debug_/i.test(l)).reduce((l, f) => {
      const h = f.substring(6).toLowerCase().replace(/_([a-z])/g, (w, b) => b.toUpperCase());
      let x = process.env[f];
      return /^(yes|on|true|enabled)$/i.test(x) ? x = !0 : /^(no|off|false|disabled)$/i.test(x) ? x = !1 : x === "null" ? x = null : x = Number(x), l[h] = x, l;
    }, {});
    function a() {
      return "colors" in e.inspectOpts ? !!e.inspectOpts.colors : t.isatty(process.stderr.fd);
    }
    function n(l) {
      const { namespace: f, useColors: h } = this;
      if (h) {
        const x = this.color, w = "\x1B[3" + (x < 8 ? x : "8;5;" + x), b = `  ${w};1m${f} \x1B[0m`;
        l[0] = b + l[0].split(`
`).join(`
` + b), l.push(w + "m+" + i.exports.humanize(this.diff) + "\x1B[0m");
      } else
        l[0] = s() + f + " " + l[0];
    }
    function s() {
      return e.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function u(...l) {
      return process.stderr.write(r.formatWithOptions(e.inspectOpts, ...l) + `
`);
    }
    function c(l) {
      l ? process.env.DEBUG = l : delete process.env.DEBUG;
    }
    function p() {
      return process.env.DEBUG;
    }
    function m(l) {
      l.inspectOpts = {};
      const f = Object.keys(e.inspectOpts);
      for (let h = 0; h < f.length; h++)
        l.inspectOpts[f[h]] = e.inspectOpts[f[h]];
    }
    i.exports = qe()(e);
    const { formatters: o } = i.exports;
    o.o = function(l) {
      return this.inspectOpts.colors = this.useColors, r.inspect(l, this.inspectOpts).split(`
`).map((f) => f.trim()).join(" ");
    }, o.O = function(l) {
      return this.inspectOpts.colors = this.useColors, r.inspect(l, this.inspectOpts);
    };
  }($, $.exports)), $.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? ue.exports = Pt() : ue.exports = Ut();
var Xt = ue.exports;
const P = /* @__PURE__ */ yt(Xt), Gt = "End-Of-Stream";
class k extends Error {
  constructor() {
    super(Gt);
  }
}
class $t {
  constructor() {
    this.maxStreamReadSize = 1 * 1024 * 1024, this.endOfStream = !1, this.peekQueue = [];
  }
  async peek(e, t, r) {
    const a = await this.read(e, t, r);
    return this.peekQueue.push(e.subarray(t, t + a)), a;
  }
  async read(e, t, r) {
    if (r === 0)
      return 0;
    let a = this.readFromPeekBuffer(e, t, r);
    if (a += await this.readRemainderFromStream(e, t + a, r - a), a === 0)
      throw new k();
    return a;
  }
  /**
   * Read chunk from stream
   * @param buffer - Target Uint8Array (or Buffer) to store data read from stream in
   * @param offset - Offset target
   * @param length - Number of bytes to read
   * @returns Number of bytes read
   */
  readFromPeekBuffer(e, t, r) {
    let a = r, n = 0;
    for (; this.peekQueue.length > 0 && a > 0; ) {
      const s = this.peekQueue.pop();
      if (!s)
        throw new Error("peekData should be defined");
      const u = Math.min(s.length, a);
      e.set(s.subarray(0, u), t + n), n += u, a -= u, u < s.length && this.peekQueue.push(s.subarray(u));
    }
    return n;
  }
  async readRemainderFromStream(e, t, r) {
    let a = r, n = 0;
    for (; a > 0 && !this.endOfStream; ) {
      const s = Math.min(a, this.maxStreamReadSize), u = await this.readFromStream(e, t + n, s);
      if (u === 0)
        break;
      n += u, a -= u;
    }
    return n;
  }
}
class jt extends $t {
  constructor(e) {
    super(), this.reader = e.getReader({ mode: "byob" });
  }
  async readFromStream(e, t, r) {
    if (this.endOfStream)
      throw new k();
    const a = await this.reader.read(new Uint8Array(r));
    return a.done && (this.endOfStream = a.done), a.value ? (e.set(a.value, t), a.value.byteLength) : 0;
  }
  abort() {
    return this.reader.cancel();
  }
  async close() {
    await this.abort(), this.reader.releaseLock();
  }
}
class He {
  /**
   * Constructor
   * @param options Tokenizer options
   * @protected
   */
  constructor(e) {
    this.numBuffer = new Uint8Array(8), this.position = 0, this.onClose = e == null ? void 0 : e.onClose, e != null && e.abortSignal && e.abortSignal.addEventListener("abort", () => {
      this.abort();
    });
  }
  /**
   * Read a token from the tokenizer-stream
   * @param token - The token to read
   * @param position - If provided, the desired position in the tokenizer-stream
   * @returns Promise with token data
   */
  async readToken(e, t = this.position) {
    const r = new Uint8Array(e.len);
    if (await this.readBuffer(r, { position: t }) < e.len)
      throw new k();
    return e.get(r, 0);
  }
  /**
   * Peek a token from the tokenizer-stream.
   * @param token - Token to peek from the tokenizer-stream.
   * @param position - Offset where to begin reading within the file. If position is null, data will be read from the current file position.
   * @returns Promise with token data
   */
  async peekToken(e, t = this.position) {
    const r = new Uint8Array(e.len);
    if (await this.peekBuffer(r, { position: t }) < e.len)
      throw new k();
    return e.get(r, 0);
  }
  /**
   * Read a numeric token from the stream
   * @param token - Numeric token
   * @returns Promise with number
   */
  async readNumber(e) {
    if (await this.readBuffer(this.numBuffer, { length: e.len }) < e.len)
      throw new k();
    return e.get(this.numBuffer, 0);
  }
  /**
   * Read a numeric token from the stream
   * @param token - Numeric token
   * @returns Promise with number
   */
  async peekNumber(e) {
    if (await this.peekBuffer(this.numBuffer, { length: e.len }) < e.len)
      throw new k();
    return e.get(this.numBuffer, 0);
  }
  /**
   * Ignore number of bytes, advances the pointer in under tokenizer-stream.
   * @param length - Number of bytes to ignore
   * @return resolves the number of bytes ignored, equals length if this available, otherwise the number of bytes available
   */
  async ignore(e) {
    if (this.fileInfo.size !== void 0) {
      const t = this.fileInfo.size - this.position;
      if (e > t)
        return this.position += t, t;
    }
    return this.position += e, e;
  }
  async close() {
    var e;
    await this.abort(), await ((e = this.onClose) == null ? void 0 : e.call(this));
  }
  normalizeOptions(e, t) {
    if (t && t.position !== void 0 && t.position < this.position)
      throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
    return t ? {
      mayBeLess: t.mayBeLess === !0,
      offset: t.offset ? t.offset : 0,
      length: t.length ? t.length : e.length - (t.offset ? t.offset : 0),
      position: t.position ? t.position : this.position
    } : {
      mayBeLess: !1,
      offset: 0,
      length: e.length,
      position: this.position
    };
  }
  abort() {
    return Promise.resolve();
  }
}
const Wt = 256e3;
class qt extends He {
  /**
   * Constructor
   * @param streamReader stream-reader to read from
   * @param options Tokenizer options
   */
  constructor(e, t) {
    super(t), this.streamReader = e, this.fileInfo = (t == null ? void 0 : t.fileInfo) ?? {};
  }
  /**
   * Read buffer from tokenizer
   * @param uint8Array - Target Uint8Array to fill with data read from the tokenizer-stream
   * @param options - Read behaviour options
   * @returns Promise with number of bytes read
   */
  async readBuffer(e, t) {
    const r = this.normalizeOptions(e, t), a = r.position - this.position;
    if (a > 0)
      return await this.ignore(a), this.readBuffer(e, t);
    if (a < 0)
      throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
    if (r.length === 0)
      return 0;
    const n = await this.streamReader.read(e, r.offset, r.length);
    if (this.position += n, (!t || !t.mayBeLess) && n < r.length)
      throw new k();
    return n;
  }
  /**
   * Peek (read ahead) buffer from tokenizer
   * @param uint8Array - Uint8Array (or Buffer) to write data to
   * @param options - Read behaviour options
   * @returns Promise with number of bytes peeked
   */
  async peekBuffer(e, t) {
    const r = this.normalizeOptions(e, t);
    let a = 0;
    if (r.position) {
      const n = r.position - this.position;
      if (n > 0) {
        const s = new Uint8Array(r.length + n);
        return a = await this.peekBuffer(s, { mayBeLess: r.mayBeLess }), e.set(s.subarray(n), r.offset), a - n;
      }
      if (n < 0)
        throw new Error("Cannot peek from a negative offset in a stream");
    }
    if (r.length > 0) {
      try {
        a = await this.streamReader.peek(e, r.offset, r.length);
      } catch (n) {
        if (t != null && t.mayBeLess && n instanceof k)
          return 0;
        throw n;
      }
      if (!r.mayBeLess && a < r.length)
        throw new k();
    }
    return a;
  }
  async ignore(e) {
    const t = Math.min(Wt, e), r = new Uint8Array(t);
    let a = 0;
    for (; a < e; ) {
      const n = e - a, s = await this.readBuffer(r, { length: Math.min(t, n) });
      if (s < 0)
        return s;
      a += s;
    }
    return a;
  }
  abort() {
    return this.streamReader.abort();
  }
  supportsRandomAccess() {
    return !1;
  }
}
class Ht extends He {
  /**
   * Construct BufferTokenizer
   * @param uint8Array - Uint8Array to tokenize
   * @param options Tokenizer options
   */
  constructor(e, t) {
    super(t), this.uint8Array = e, this.fileInfo = { ...(t == null ? void 0 : t.fileInfo) ?? {}, size: e.length };
  }
  /**
   * Read buffer from tokenizer
   * @param uint8Array - Uint8Array to tokenize
   * @param options - Read behaviour options
   * @returns {Promise<number>}
   */
  async readBuffer(e, t) {
    if (t != null && t.position) {
      if (t.position < this.position)
        throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
      this.position = t.position;
    }
    const r = await this.peekBuffer(e, t);
    return this.position += r, r;
  }
  /**
   * Peek (read ahead) buffer from tokenizer
   * @param uint8Array
   * @param options - Read behaviour options
   * @returns {Promise<number>}
   */
  async peekBuffer(e, t) {
    const r = this.normalizeOptions(e, t), a = Math.min(this.uint8Array.length - r.position, r.length);
    if (!r.mayBeLess && a < r.length)
      throw new k();
    return e.set(this.uint8Array.subarray(r.position, r.position + a), r.offset), a;
  }
  close() {
    return super.close();
  }
  supportsRandomAccess() {
    return !0;
  }
  setPosition(e) {
    this.position = e;
  }
}
function Yt(i, e) {
  return new qt(new jt(i), e);
}
function Vt(i, e) {
  return new Ht(i, e);
}
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var ee = function(i, e, t, r, a) {
  var n, s, u = a * 8 - r - 1, c = (1 << u) - 1, p = c >> 1, m = -7, o = t ? a - 1 : 0, l = t ? -1 : 1, f = i[e + o];
  for (o += l, n = f & (1 << -m) - 1, f >>= -m, m += u; m > 0; n = n * 256 + i[e + o], o += l, m -= 8)
    ;
  for (s = n & (1 << -m) - 1, n >>= -m, m += r; m > 0; s = s * 256 + i[e + o], o += l, m -= 8)
    ;
  if (n === 0)
    n = 1 - p;
  else {
    if (n === c)
      return s ? NaN : (f ? -1 : 1) * (1 / 0);
    s = s + Math.pow(2, r), n = n - p;
  }
  return (f ? -1 : 1) * s * Math.pow(2, n - r);
}, te = function(i, e, t, r, a, n) {
  var s, u, c, p = n * 8 - a - 1, m = (1 << p) - 1, o = m >> 1, l = a === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = r ? 0 : n - 1, h = r ? 1 : -1, x = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, s = m) : (s = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -s)) < 1 && (s--, c *= 2), s + o >= 1 ? e += l / c : e += l * Math.pow(2, 1 - o), e * c >= 2 && (s++, c /= 2), s + o >= m ? (u = 0, s = m) : s + o >= 1 ? (u = (e * c - 1) * Math.pow(2, a), s = s + o) : (u = e * Math.pow(2, o - 1) * Math.pow(2, a), s = 0)); a >= 8; i[t + f] = u & 255, f += h, u /= 256, a -= 8)
    ;
  for (s = s << a | u, p += a; p > 0; i[t + f] = s & 255, f += h, s /= 256, p -= 8)
    ;
  i[t + f - h] |= x * 128;
};
function d(i) {
  return new DataView(i.buffer, i.byteOffset);
}
const M = {
  len: 1,
  get(i, e) {
    return d(i).getUint8(e);
  },
  put(i, e, t) {
    return d(i).setUint8(e, t), e + 1;
  }
}, C = {
  len: 2,
  get(i, e) {
    return d(i).getUint16(e, !0);
  },
  put(i, e, t) {
    return d(i).setUint16(e, t, !0), e + 2;
  }
}, L = {
  len: 2,
  get(i, e) {
    return d(i).getUint16(e);
  },
  put(i, e, t) {
    return d(i).setUint16(e, t), e + 2;
  }
}, Ye = {
  len: 3,
  get(i, e) {
    const t = d(i);
    return t.getUint8(e) + (t.getUint16(e + 1, !0) << 8);
  },
  put(i, e, t) {
    const r = d(i);
    return r.setUint8(e, t & 255), r.setUint16(e + 1, t >> 8, !0), e + 3;
  }
}, Ve = {
  len: 3,
  get(i, e) {
    const t = d(i);
    return (t.getUint16(e) << 8) + t.getUint8(e + 2);
  },
  put(i, e, t) {
    const r = d(i);
    return r.setUint16(e, t >> 8), r.setUint8(e + 2, t & 255), e + 3;
  }
}, g = {
  len: 4,
  get(i, e) {
    return d(i).getUint32(e, !0);
  },
  put(i, e, t) {
    return d(i).setUint32(e, t, !0), e + 4;
  }
}, V = {
  len: 4,
  get(i, e) {
    return d(i).getUint32(e);
  },
  put(i, e, t) {
    return d(i).setUint32(e, t), e + 4;
  }
}, me = {
  len: 1,
  get(i, e) {
    return d(i).getInt8(e);
  },
  put(i, e, t) {
    return d(i).setInt8(e, t), e + 1;
  }
}, Zt = {
  len: 2,
  get(i, e) {
    return d(i).getInt16(e);
  },
  put(i, e, t) {
    return d(i).setInt16(e, t), e + 2;
  }
}, Kt = {
  len: 2,
  get(i, e) {
    return d(i).getInt16(e, !0);
  },
  put(i, e, t) {
    return d(i).setInt16(e, t, !0), e + 2;
  }
}, Jt = {
  len: 3,
  get(i, e) {
    const t = Ye.get(i, e);
    return t > 8388607 ? t - 16777216 : t;
  },
  put(i, e, t) {
    const r = d(i);
    return r.setUint8(e, t & 255), r.setUint16(e + 1, t >> 8, !0), e + 3;
  }
}, Qt = {
  len: 3,
  get(i, e) {
    const t = Ve.get(i, e);
    return t > 8388607 ? t - 16777216 : t;
  },
  put(i, e, t) {
    const r = d(i);
    return r.setUint16(e, t >> 8), r.setUint8(e + 2, t & 255), e + 3;
  }
}, Ze = {
  len: 4,
  get(i, e) {
    return d(i).getInt32(e);
  },
  put(i, e, t) {
    return d(i).setInt32(e, t), e + 4;
  }
}, ei = {
  len: 4,
  get(i, e) {
    return d(i).getInt32(e, !0);
  },
  put(i, e, t) {
    return d(i).setInt32(e, t, !0), e + 4;
  }
}, Ke = {
  len: 8,
  get(i, e) {
    return d(i).getBigUint64(e, !0);
  },
  put(i, e, t) {
    return d(i).setBigUint64(e, t, !0), e + 8;
  }
}, ti = {
  len: 8,
  get(i, e) {
    return d(i).getBigInt64(e, !0);
  },
  put(i, e, t) {
    return d(i).setBigInt64(e, t, !0), e + 8;
  }
}, ii = {
  len: 8,
  get(i, e) {
    return d(i).getBigUint64(e);
  },
  put(i, e, t) {
    return d(i).setBigUint64(e, t), e + 8;
  }
}, ri = {
  len: 8,
  get(i, e) {
    return d(i).getBigInt64(e);
  },
  put(i, e, t) {
    return d(i).setBigInt64(e, t), e + 8;
  }
}, ai = {
  len: 2,
  get(i, e) {
    return ee(i, e, !1, 10, this.len);
  },
  put(i, e, t) {
    return te(i, t, e, !1, 10, this.len), e + this.len;
  }
}, ni = {
  len: 2,
  get(i, e) {
    return ee(i, e, !0, 10, this.len);
  },
  put(i, e, t) {
    return te(i, t, e, !0, 10, this.len), e + this.len;
  }
}, si = {
  len: 4,
  get(i, e) {
    return d(i).getFloat32(e);
  },
  put(i, e, t) {
    return d(i).setFloat32(e, t), e + 4;
  }
}, oi = {
  len: 4,
  get(i, e) {
    return d(i).getFloat32(e, !0);
  },
  put(i, e, t) {
    return d(i).setFloat32(e, t, !0), e + 4;
  }
}, ci = {
  len: 8,
  get(i, e) {
    return d(i).getFloat64(e);
  },
  put(i, e, t) {
    return d(i).setFloat64(e, t), e + 8;
  }
}, li = {
  len: 8,
  get(i, e) {
    return d(i).getFloat64(e, !0);
  },
  put(i, e, t) {
    return d(i).setFloat64(e, t, !0), e + 8;
  }
}, ui = {
  len: 10,
  get(i, e) {
    return ee(i, e, !1, 63, this.len);
  },
  put(i, e, t) {
    return te(i, t, e, !1, 63, this.len), e + this.len;
  }
}, mi = {
  len: 10,
  get(i, e) {
    return ee(i, e, !0, 63, this.len);
  },
  put(i, e, t) {
    return te(i, t, e, !0, 63, this.len), e + this.len;
  }
};
class pi {
  /**
   * @param len number of bytes to ignore
   */
  constructor(e) {
    this.len = e;
  }
  // ToDo: don't read, but skip data
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  get(e, t) {
  }
}
class Je {
  constructor(e) {
    this.len = e;
  }
  get(e, t) {
    return e.subarray(t, t + this.len);
  }
}
class T {
  constructor(e, t) {
    this.len = e, this.encoding = t, this.textDecoder = new TextDecoder(t);
  }
  get(e, t) {
    return this.textDecoder.decode(e.subarray(t, t + this.len));
  }
}
class fi {
  constructor(e) {
    this.len = e, this.textDecoder = new TextDecoder("windows-1252");
  }
  get(e, t = 0) {
    return this.textDecoder.decode(e.subarray(t, t + this.len));
  }
}
const pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AnsiStringType: fi,
  Float16_BE: ai,
  Float16_LE: ni,
  Float32_BE: si,
  Float32_LE: oi,
  Float64_BE: ci,
  Float64_LE: li,
  Float80_BE: ui,
  Float80_LE: mi,
  INT16_BE: Zt,
  INT16_LE: Kt,
  INT24_BE: Qt,
  INT24_LE: Jt,
  INT32_BE: Ze,
  INT32_LE: ei,
  INT64_BE: ri,
  INT64_LE: ti,
  INT8: me,
  IgnoreType: pi,
  StringType: T,
  UINT16_BE: L,
  UINT16_LE: C,
  UINT24_BE: Ve,
  UINT24_LE: Ye,
  UINT32_BE: V,
  UINT32_LE: g,
  UINT64_BE: ii,
  UINT64_LE: Ke,
  UINT8: M,
  Uint8ArrayType: Je
}, Symbol.toStringTag, { value: "Module" })), di = Object.prototype.toString, hi = "[object Uint8Array]", xi = "[object ArrayBuffer]";
function Qe(i, e, t) {
  return i ? i.constructor === e ? !0 : di.call(i) === t : !1;
}
function et(i) {
  return Qe(i, Uint8Array, hi);
}
function gi(i) {
  return Qe(i, ArrayBuffer, xi);
}
function wi(i) {
  return et(i) || gi(i);
}
function bi(i) {
  if (!et(i))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof i}\``);
}
function Ti(i) {
  if (!wi(i))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof i}\``);
}
const j = {
  utf8: new globalThis.TextDecoder("utf8")
};
function tt(i, e = "utf8") {
  return Ti(i), j[e] ?? (j[e] = new globalThis.TextDecoder(e)), j[e].decode(i);
}
function it(i) {
  if (typeof i != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof i}\``);
}
const yi = new globalThis.TextEncoder();
function ki(i) {
  return it(i), yi.encode(i);
}
const Ii = Array.from({ length: 256 }, (i, e) => e.toString(16).padStart(2, "0"));
function fa(i) {
  bi(i);
  let e = "";
  for (let t = 0; t < i.length; t++)
    e += Ii[i[t]];
  return e;
}
const Re = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15
};
function da(i) {
  if (it(i), i.length % 2 !== 0)
    throw new Error("Invalid Hex string length.");
  const e = i.length / 2, t = new Uint8Array(e);
  for (let r = 0; r < e; r++) {
    const a = Re[i[r * 2]], n = Re[i[r * 2 + 1]];
    if (a === void 0 || n === void 0)
      throw new Error(`Invalid Hex character encountered at position ${r * 2}`);
    t[r] = a << 4 | n;
  }
  return t;
}
function _e(i) {
  const { byteLength: e } = i;
  if (e === 6)
    return i.getUint16(0) * 2 ** 32 + i.getUint32(2);
  if (e === 5)
    return i.getUint8(0) * 2 ** 32 + i.getUint32(1);
  if (e === 4)
    return i.getUint32(0);
  if (e === 3)
    return i.getUint8(0) * 2 ** 16 + i.getUint16(1);
  if (e === 2)
    return i.getUint16(0);
  if (e === 1)
    return i.getUint8(0);
}
function rt(i, e) {
  const t = i.length, r = e.length;
  if (r === 0 || r > t)
    return -1;
  const a = t - r;
  for (let n = 0; n <= a; n++) {
    let s = !0;
    for (let u = 0; u < r; u++)
      if (i[n + u] !== e[u]) {
        s = !1;
        break;
      }
    if (s)
      return n;
  }
  return -1;
}
function vi(i, e) {
  return rt(i, e) !== -1;
}
function Si(i) {
  return [...i].map((e) => e.charCodeAt(0));
}
function Ci(i, e = 0) {
  const t = Number.parseInt(new T(6).get(i, 148).replace(/\0.*$/, "").trim(), 8);
  if (Number.isNaN(t))
    return !1;
  let r = 8 * 32;
  for (let a = e; a < e + 148; a++)
    r += i[a];
  for (let a = e + 156; a < e + 512; a++)
    r += i[a];
  return t === r;
}
const Ai = {
  get: (i, e) => i[e + 3] & 127 | i[e + 2] << 7 | i[e + 1] << 14 | i[e] << 21,
  len: 4
}, Ei = [
  "jpg",
  "png",
  "apng",
  "gif",
  "webp",
  "flif",
  "xcf",
  "cr2",
  "cr3",
  "orf",
  "arw",
  "dng",
  "nef",
  "rw2",
  "raf",
  "tif",
  "bmp",
  "icns",
  "jxr",
  "psd",
  "indd",
  "zip",
  "tar",
  "rar",
  "gz",
  "bz2",
  "7z",
  "dmg",
  "mp4",
  "mid",
  "mkv",
  "webm",
  "mov",
  "avi",
  "mpg",
  "mp2",
  "mp3",
  "m4a",
  "oga",
  "ogg",
  "ogv",
  "opus",
  "flac",
  "wav",
  "spx",
  "amr",
  "pdf",
  "epub",
  "elf",
  "macho",
  "exe",
  "swf",
  "rtf",
  "wasm",
  "woff",
  "woff2",
  "eot",
  "ttf",
  "otf",
  "ico",
  "flv",
  "ps",
  "xz",
  "sqlite",
  "nes",
  "crx",
  "xpi",
  "cab",
  "deb",
  "ar",
  "rpm",
  "Z",
  "lz",
  "cfb",
  "mxf",
  "mts",
  "blend",
  "bpg",
  "docx",
  "pptx",
  "xlsx",
  "3gp",
  "3g2",
  "j2c",
  "jp2",
  "jpm",
  "jpx",
  "mj2",
  "aif",
  "qcp",
  "odt",
  "ods",
  "odp",
  "xml",
  "mobi",
  "heic",
  "cur",
  "ktx",
  "ape",
  "wv",
  "dcm",
  "ics",
  "glb",
  "pcap",
  "dsf",
  "lnk",
  "alias",
  "voc",
  "ac3",
  "m4v",
  "m4p",
  "m4b",
  "f4v",
  "f4p",
  "f4b",
  "f4a",
  "mie",
  "asf",
  "ogm",
  "ogx",
  "mpc",
  "arrow",
  "shp",
  "aac",
  "mp1",
  "it",
  "s3m",
  "xm",
  "ai",
  "skp",
  "avif",
  "eps",
  "lzh",
  "pgp",
  "asar",
  "stl",
  "chm",
  "3mf",
  "zst",
  "jxl",
  "vcf",
  "jls",
  "pst",
  "dwg",
  "parquet",
  "class",
  "arj",
  "cpio",
  "ace",
  "avro",
  "icc",
  "fbx",
  "vsdx",
  "vtt",
  "apk"
], Ri = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/flif",
  "image/x-xcf",
  "image/x-canon-cr2",
  "image/x-canon-cr3",
  "image/tiff",
  "image/bmp",
  "image/vnd.ms-photo",
  "image/vnd.adobe.photoshop",
  "application/x-indesign",
  "application/epub+zip",
  "application/x-xpinstall",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/zip",
  "application/x-tar",
  "application/x-rar-compressed",
  "application/gzip",
  "application/x-bzip2",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-apache-arrow",
  "video/mp4",
  "audio/midi",
  "video/x-matroska",
  "video/webm",
  "video/quicktime",
  "video/vnd.avi",
  "audio/wav",
  "audio/qcelp",
  "audio/x-ms-asf",
  "video/x-ms-asf",
  "application/vnd.ms-asf",
  "video/mpeg",
  "video/3gpp",
  "audio/mpeg",
  "audio/mp4",
  // RFC 4337
  "video/ogg",
  "audio/ogg",
  "audio/ogg; codecs=opus",
  "application/ogg",
  "audio/x-flac",
  "audio/ape",
  "audio/wavpack",
  "audio/amr",
  "application/pdf",
  "application/x-elf",
  "application/x-mach-binary",
  "application/x-msdownload",
  "application/x-shockwave-flash",
  "application/rtf",
  "application/wasm",
  "font/woff",
  "font/woff2",
  "application/vnd.ms-fontobject",
  "font/ttf",
  "font/otf",
  "image/x-icon",
  "video/x-flv",
  "application/postscript",
  "application/eps",
  "application/x-xz",
  "application/x-sqlite3",
  "application/x-nintendo-nes-rom",
  "application/x-google-chrome-extension",
  "application/vnd.ms-cab-compressed",
  "application/x-deb",
  "application/x-unix-archive",
  "application/x-rpm",
  "application/x-compress",
  "application/x-lzip",
  "application/x-cfb",
  "application/x-mie",
  "application/mxf",
  "video/mp2t",
  "application/x-blender",
  "image/bpg",
  "image/j2c",
  "image/jp2",
  "image/jpx",
  "image/jpm",
  "image/mj2",
  "audio/aiff",
  "application/xml",
  "application/x-mobipocket-ebook",
  "image/heif",
  "image/heif-sequence",
  "image/heic",
  "image/heic-sequence",
  "image/icns",
  "image/ktx",
  "application/dicom",
  "audio/x-musepack",
  "text/calendar",
  "text/vcard",
  "text/vtt",
  "model/gltf-binary",
  "application/vnd.tcpdump.pcap",
  "audio/x-dsf",
  // Non-standard
  "application/x.ms.shortcut",
  // Invented by us
  "application/x.apple.alias",
  // Invented by us
  "audio/x-voc",
  "audio/vnd.dolby.dd-raw",
  "audio/x-m4a",
  "image/apng",
  "image/x-olympus-orf",
  "image/x-sony-arw",
  "image/x-adobe-dng",
  "image/x-nikon-nef",
  "image/x-panasonic-rw2",
  "image/x-fujifilm-raf",
  "video/x-m4v",
  "video/3gpp2",
  "application/x-esri-shape",
  "audio/aac",
  "audio/x-it",
  "audio/x-s3m",
  "audio/x-xm",
  "video/MP1S",
  "video/MP2P",
  "application/vnd.sketchup.skp",
  "image/avif",
  "application/x-lzh-compressed",
  "application/pgp-encrypted",
  "application/x-asar",
  "model/stl",
  "application/vnd.ms-htmlhelp",
  "model/3mf",
  "image/jxl",
  "application/zstd",
  "image/jls",
  "application/vnd.ms-outlook",
  "image/vnd.dwg",
  "application/x-parquet",
  "application/java-vm",
  "application/x-arj",
  "application/x-cpio",
  "application/x-ace-compressed",
  "application/avro",
  "application/vnd.iccprofile",
  "application/x.autodesk.fbx",
  // Invented by us
  "application/vnd.visio",
  "application/vnd.android.package-archive"
], Be = 4100;
async function at(i) {
  return new _i().fromBuffer(i);
}
function S(i, e, t) {
  t = {
    offset: 0,
    ...t
  };
  for (const [r, a] of e.entries())
    if (t.mask) {
      if (a !== (t.mask[r] & i[r + t.offset]))
        return !1;
    } else if (a !== i[r + t.offset])
      return !1;
  return !0;
}
class _i {
  constructor(e) {
    this.detectors = e == null ? void 0 : e.customDetectors, this.tokenizerOptions = {
      abortSignal: e == null ? void 0 : e.signal
    }, this.fromTokenizer = this.fromTokenizer.bind(this), this.fromBuffer = this.fromBuffer.bind(this), this.parse = this.parse.bind(this);
  }
  async fromTokenizer(e) {
    const t = e.position;
    for (const r of this.detectors || []) {
      const a = await r(e);
      if (a)
        return a;
      if (t !== e.position)
        return;
    }
    return this.parse(e);
  }
  async fromBuffer(e) {
    if (!(e instanceof Uint8Array || e instanceof ArrayBuffer))
      throw new TypeError(`Expected the \`input\` argument to be of type \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
    const t = e instanceof Uint8Array ? e : new Uint8Array(e);
    if ((t == null ? void 0 : t.length) > 1)
      return this.fromTokenizer(Vt(t, this.tokenizerOptions));
  }
  async fromBlob(e) {
    return this.fromStream(e.stream());
  }
  async fromStream(e) {
    const t = await Yt(e, this.tokenizerOptions);
    try {
      return await this.fromTokenizer(t);
    } finally {
      await t.close();
    }
  }
  async toDetectionStream(e, t) {
    const { sampleSize: r = Be } = t;
    let a, n;
    const s = e.getReader({ mode: "byob" });
    try {
      const { value: p, done: m } = await s.read(new Uint8Array(r));
      if (n = p, !m && p)
        try {
          a = await this.fromBuffer(p.slice(0, r));
        } catch (o) {
          if (!(o instanceof k))
            throw o;
          a = void 0;
        }
      n = p;
    } finally {
      s.releaseLock();
    }
    const u = new TransformStream({
      async start(p) {
        p.enqueue(n);
      },
      transform(p, m) {
        m.enqueue(p);
      }
    }), c = e.pipeThrough(u);
    return c.fileType = a, c;
  }
  check(e, t) {
    return S(this.buffer, e, t);
  }
  checkString(e, t) {
    return this.check(Si(e), t);
  }
  async parse(e) {
    if (this.buffer = new Uint8Array(Be), e.fileInfo.size === void 0 && (e.fileInfo.size = Number.MAX_SAFE_INTEGER), this.tokenizer = e, await e.peekBuffer(this.buffer, { length: 12, mayBeLess: !0 }), this.check([66, 77]))
      return {
        ext: "bmp",
        mime: "image/bmp"
      };
    if (this.check([11, 119]))
      return {
        ext: "ac3",
        mime: "audio/vnd.dolby.dd-raw"
      };
    if (this.check([120, 1]))
      return {
        ext: "dmg",
        mime: "application/x-apple-diskimage"
      };
    if (this.check([77, 90]))
      return {
        ext: "exe",
        mime: "application/x-msdownload"
      };
    if (this.check([37, 33]))
      return await e.peekBuffer(this.buffer, { length: 24, mayBeLess: !0 }), this.checkString("PS-Adobe-", { offset: 2 }) && this.checkString(" EPSF-", { offset: 14 }) ? {
        ext: "eps",
        mime: "application/eps"
      } : {
        ext: "ps",
        mime: "application/postscript"
      };
    if (this.check([31, 160]) || this.check([31, 157]))
      return {
        ext: "Z",
        mime: "application/x-compress"
      };
    if (this.check([199, 113]))
      return {
        ext: "cpio",
        mime: "application/x-cpio"
      };
    if (this.check([96, 234]))
      return {
        ext: "arj",
        mime: "application/x-arj"
      };
    if (this.check([239, 187, 191]))
      return this.tokenizer.ignore(3), this.parse(e);
    if (this.check([71, 73, 70]))
      return {
        ext: "gif",
        mime: "image/gif"
      };
    if (this.check([73, 73, 188]))
      return {
        ext: "jxr",
        mime: "image/vnd.ms-photo"
      };
    if (this.check([31, 139, 8]))
      return {
        ext: "gz",
        mime: "application/gzip"
      };
    if (this.check([66, 90, 104]))
      return {
        ext: "bz2",
        mime: "application/x-bzip2"
      };
    if (this.checkString("ID3")) {
      await e.ignore(6);
      const t = await e.readToken(Ai);
      return e.position + t > e.fileInfo.size ? {
        ext: "mp3",
        mime: "audio/mpeg"
      } : (await e.ignore(t), this.fromTokenizer(e));
    }
    if (this.checkString("MP+"))
      return {
        ext: "mpc",
        mime: "audio/x-musepack"
      };
    if ((this.buffer[0] === 67 || this.buffer[0] === 70) && this.check([87, 83], { offset: 1 }))
      return {
        ext: "swf",
        mime: "application/x-shockwave-flash"
      };
    if (this.check([255, 216, 255]))
      return this.check([247], { offset: 3 }) ? {
        ext: "jls",
        mime: "image/jls"
      } : {
        ext: "jpg",
        mime: "image/jpeg"
      };
    if (this.check([79, 98, 106, 1]))
      return {
        ext: "avro",
        mime: "application/avro"
      };
    if (this.checkString("FLIF"))
      return {
        ext: "flif",
        mime: "image/flif"
      };
    if (this.checkString("8BPS"))
      return {
        ext: "psd",
        mime: "image/vnd.adobe.photoshop"
      };
    if (this.checkString("WEBP", { offset: 8 }))
      return {
        ext: "webp",
        mime: "image/webp"
      };
    if (this.checkString("MPCK"))
      return {
        ext: "mpc",
        mime: "audio/x-musepack"
      };
    if (this.checkString("FORM"))
      return {
        ext: "aif",
        mime: "audio/aiff"
      };
    if (this.checkString("icns", { offset: 0 }))
      return {
        ext: "icns",
        mime: "image/icns"
      };
    if (this.check([80, 75, 3, 4])) {
      try {
        for (; e.position + 30 < e.fileInfo.size; ) {
          await e.readBuffer(this.buffer, { length: 30 });
          const t = new DataView(this.buffer.buffer), r = {
            compressedSize: t.getUint32(18, !0),
            uncompressedSize: t.getUint32(22, !0),
            filenameLength: t.getUint16(26, !0),
            extraFieldLength: t.getUint16(28, !0)
          };
          if (r.filename = await e.readToken(new T(r.filenameLength, "utf-8")), await e.ignore(r.extraFieldLength), /classes\d*\.dex/.test(r.filename))
            return {
              ext: "apk",
              mime: "application/vnd.android.package-archive"
            };
          if (r.filename === "META-INF/mozilla.rsa")
            return {
              ext: "xpi",
              mime: "application/x-xpinstall"
            };
          if (r.filename.endsWith(".rels") || r.filename.endsWith(".xml"))
            switch (r.filename.split("/")[0]) {
              case "_rels":
                break;
              case "word":
                return {
                  ext: "docx",
                  mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                };
              case "ppt":
                return {
                  ext: "pptx",
                  mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                };
              case "xl":
                return {
                  ext: "xlsx",
                  mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                };
              case "visio":
                return {
                  ext: "vsdx",
                  mime: "application/vnd.visio"
                };
              default:
                break;
            }
          if (r.filename.startsWith("xl/"))
            return {
              ext: "xlsx",
              mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            };
          if (r.filename.startsWith("3D/") && r.filename.endsWith(".model"))
            return {
              ext: "3mf",
              mime: "model/3mf"
            };
          if (r.filename === "mimetype" && r.compressedSize === r.uncompressedSize) {
            let a = await e.readToken(new T(r.compressedSize, "utf-8"));
            switch (a = a.trim(), a) {
              case "application/epub+zip":
                return {
                  ext: "epub",
                  mime: "application/epub+zip"
                };
              case "application/vnd.oasis.opendocument.text":
                return {
                  ext: "odt",
                  mime: "application/vnd.oasis.opendocument.text"
                };
              case "application/vnd.oasis.opendocument.spreadsheet":
                return {
                  ext: "ods",
                  mime: "application/vnd.oasis.opendocument.spreadsheet"
                };
              case "application/vnd.oasis.opendocument.presentation":
                return {
                  ext: "odp",
                  mime: "application/vnd.oasis.opendocument.presentation"
                };
              default:
            }
          }
          if (r.compressedSize === 0) {
            let a = -1;
            for (; a < 0 && e.position < e.fileInfo.size; )
              await e.peekBuffer(this.buffer, { mayBeLess: !0 }), a = rt(this.buffer, new Uint8Array([80, 75, 3, 4])), await e.ignore(a >= 0 ? a : this.buffer.length);
          } else
            await e.ignore(r.compressedSize);
        }
      } catch (t) {
        if (!(t instanceof k))
          throw t;
      }
      return {
        ext: "zip",
        mime: "application/zip"
      };
    }
    if (this.checkString("OggS")) {
      await e.ignore(28);
      const t = new Uint8Array(8);
      return await e.readBuffer(t), S(t, [79, 112, 117, 115, 72, 101, 97, 100]) ? {
        ext: "opus",
        mime: "audio/ogg; codecs=opus"
      } : S(t, [128, 116, 104, 101, 111, 114, 97]) ? {
        ext: "ogv",
        mime: "video/ogg"
      } : S(t, [1, 118, 105, 100, 101, 111, 0]) ? {
        ext: "ogm",
        mime: "video/ogg"
      } : S(t, [127, 70, 76, 65, 67]) ? {
        ext: "oga",
        mime: "audio/ogg"
      } : S(t, [83, 112, 101, 101, 120, 32, 32]) ? {
        ext: "spx",
        mime: "audio/ogg"
      } : S(t, [1, 118, 111, 114, 98, 105, 115]) ? {
        ext: "ogg",
        mime: "audio/ogg"
      } : {
        ext: "ogx",
        mime: "application/ogg"
      };
    }
    if (this.check([80, 75]) && (this.buffer[2] === 3 || this.buffer[2] === 5 || this.buffer[2] === 7) && (this.buffer[3] === 4 || this.buffer[3] === 6 || this.buffer[3] === 8))
      return {
        ext: "zip",
        mime: "application/zip"
      };
    if (this.checkString("ftyp", { offset: 4 }) && this.buffer[8] & 96) {
      const t = new T(4, "latin1").get(this.buffer, 8).replace("\0", " ").trim();
      switch (t) {
        case "avif":
        case "avis":
          return { ext: "avif", mime: "image/avif" };
        case "mif1":
          return { ext: "heic", mime: "image/heif" };
        case "msf1":
          return { ext: "heic", mime: "image/heif-sequence" };
        case "heic":
        case "heix":
          return { ext: "heic", mime: "image/heic" };
        case "hevc":
        case "hevx":
          return { ext: "heic", mime: "image/heic-sequence" };
        case "qt":
          return { ext: "mov", mime: "video/quicktime" };
        case "M4V":
        case "M4VH":
        case "M4VP":
          return { ext: "m4v", mime: "video/x-m4v" };
        case "M4P":
          return { ext: "m4p", mime: "video/mp4" };
        case "M4B":
          return { ext: "m4b", mime: "audio/mp4" };
        case "M4A":
          return { ext: "m4a", mime: "audio/x-m4a" };
        case "F4V":
          return { ext: "f4v", mime: "video/mp4" };
        case "F4P":
          return { ext: "f4p", mime: "video/mp4" };
        case "F4A":
          return { ext: "f4a", mime: "audio/mp4" };
        case "F4B":
          return { ext: "f4b", mime: "audio/mp4" };
        case "crx":
          return { ext: "cr3", mime: "image/x-canon-cr3" };
        default:
          return t.startsWith("3g") ? t.startsWith("3g2") ? { ext: "3g2", mime: "video/3gpp2" } : { ext: "3gp", mime: "video/3gpp" } : { ext: "mp4", mime: "video/mp4" };
      }
    }
    if (this.checkString("MThd"))
      return {
        ext: "mid",
        mime: "audio/midi"
      };
    if (this.checkString("wOFF") && (this.check([0, 1, 0, 0], { offset: 4 }) || this.checkString("OTTO", { offset: 4 })))
      return {
        ext: "woff",
        mime: "font/woff"
      };
    if (this.checkString("wOF2") && (this.check([0, 1, 0, 0], { offset: 4 }) || this.checkString("OTTO", { offset: 4 })))
      return {
        ext: "woff2",
        mime: "font/woff2"
      };
    if (this.check([212, 195, 178, 161]) || this.check([161, 178, 195, 212]))
      return {
        ext: "pcap",
        mime: "application/vnd.tcpdump.pcap"
      };
    if (this.checkString("DSD "))
      return {
        ext: "dsf",
        mime: "audio/x-dsf"
        // Non-standard
      };
    if (this.checkString("LZIP"))
      return {
        ext: "lz",
        mime: "application/x-lzip"
      };
    if (this.checkString("fLaC"))
      return {
        ext: "flac",
        mime: "audio/x-flac"
      };
    if (this.check([66, 80, 71, 251]))
      return {
        ext: "bpg",
        mime: "image/bpg"
      };
    if (this.checkString("wvpk"))
      return {
        ext: "wv",
        mime: "audio/wavpack"
      };
    if (this.checkString("%PDF")) {
      try {
        await e.ignore(1350);
        const t = 10 * 1024 * 1024, r = new Uint8Array(Math.min(t, e.fileInfo.size));
        if (await e.readBuffer(r, { mayBeLess: !0 }), vi(r, new TextEncoder().encode("AIPrivateData")))
          return {
            ext: "ai",
            mime: "application/postscript"
          };
      } catch (t) {
        if (!(t instanceof k))
          throw t;
      }
      return {
        ext: "pdf",
        mime: "application/pdf"
      };
    }
    if (this.check([0, 97, 115, 109]))
      return {
        ext: "wasm",
        mime: "application/wasm"
      };
    if (this.check([73, 73])) {
      const t = await this.readTiffHeader(!1);
      if (t)
        return t;
    }
    if (this.check([77, 77])) {
      const t = await this.readTiffHeader(!0);
      if (t)
        return t;
    }
    if (this.checkString("MAC "))
      return {
        ext: "ape",
        mime: "audio/ape"
      };
    if (this.check([26, 69, 223, 163])) {
      async function t() {
        const u = await e.peekNumber(M);
        let c = 128, p = 0;
        for (; !(u & c) && c !== 0; )
          ++p, c >>= 1;
        const m = new Uint8Array(p + 1);
        return await e.readBuffer(m), m;
      }
      async function r() {
        const u = await t(), c = await t();
        c[0] ^= 128 >> c.length - 1;
        const p = Math.min(6, c.length), m = new DataView(u.buffer), o = new DataView(c.buffer, c.length - p, p);
        return {
          id: _e(m),
          len: _e(o)
        };
      }
      async function a(u) {
        for (; u > 0; ) {
          const c = await r();
          if (c.id === 17026)
            return (await e.readToken(new T(c.len))).replaceAll(/\00.*$/g, "");
          await e.ignore(c.len), --u;
        }
      }
      const n = await r();
      switch (await a(n.len)) {
        case "webm":
          return {
            ext: "webm",
            mime: "video/webm"
          };
        case "matroska":
          return {
            ext: "mkv",
            mime: "video/x-matroska"
          };
        default:
          return;
      }
    }
    if (this.check([82, 73, 70, 70])) {
      if (this.check([65, 86, 73], { offset: 8 }))
        return {
          ext: "avi",
          mime: "video/vnd.avi"
        };
      if (this.check([87, 65, 86, 69], { offset: 8 }))
        return {
          ext: "wav",
          mime: "audio/wav"
        };
      if (this.check([81, 76, 67, 77], { offset: 8 }))
        return {
          ext: "qcp",
          mime: "audio/qcelp"
        };
    }
    if (this.checkString("SQLi"))
      return {
        ext: "sqlite",
        mime: "application/x-sqlite3"
      };
    if (this.check([78, 69, 83, 26]))
      return {
        ext: "nes",
        mime: "application/x-nintendo-nes-rom"
      };
    if (this.checkString("Cr24"))
      return {
        ext: "crx",
        mime: "application/x-google-chrome-extension"
      };
    if (this.checkString("MSCF") || this.checkString("ISc("))
      return {
        ext: "cab",
        mime: "application/vnd.ms-cab-compressed"
      };
    if (this.check([237, 171, 238, 219]))
      return {
        ext: "rpm",
        mime: "application/x-rpm"
      };
    if (this.check([197, 208, 211, 198]))
      return {
        ext: "eps",
        mime: "application/eps"
      };
    if (this.check([40, 181, 47, 253]))
      return {
        ext: "zst",
        mime: "application/zstd"
      };
    if (this.check([127, 69, 76, 70]))
      return {
        ext: "elf",
        mime: "application/x-elf"
      };
    if (this.check([33, 66, 68, 78]))
      return {
        ext: "pst",
        mime: "application/vnd.ms-outlook"
      };
    if (this.checkString("PAR1"))
      return {
        ext: "parquet",
        mime: "application/x-parquet"
      };
    if (this.check([207, 250, 237, 254]))
      return {
        ext: "macho",
        mime: "application/x-mach-binary"
      };
    if (this.check([79, 84, 84, 79, 0]))
      return {
        ext: "otf",
        mime: "font/otf"
      };
    if (this.checkString("#!AMR"))
      return {
        ext: "amr",
        mime: "audio/amr"
      };
    if (this.checkString("{\\rtf"))
      return {
        ext: "rtf",
        mime: "application/rtf"
      };
    if (this.check([70, 76, 86, 1]))
      return {
        ext: "flv",
        mime: "video/x-flv"
      };
    if (this.checkString("IMPM"))
      return {
        ext: "it",
        mime: "audio/x-it"
      };
    if (this.checkString("-lh0-", { offset: 2 }) || this.checkString("-lh1-", { offset: 2 }) || this.checkString("-lh2-", { offset: 2 }) || this.checkString("-lh3-", { offset: 2 }) || this.checkString("-lh4-", { offset: 2 }) || this.checkString("-lh5-", { offset: 2 }) || this.checkString("-lh6-", { offset: 2 }) || this.checkString("-lh7-", { offset: 2 }) || this.checkString("-lzs-", { offset: 2 }) || this.checkString("-lz4-", { offset: 2 }) || this.checkString("-lz5-", { offset: 2 }) || this.checkString("-lhd-", { offset: 2 }))
      return {
        ext: "lzh",
        mime: "application/x-lzh-compressed"
      };
    if (this.check([0, 0, 1, 186])) {
      if (this.check([33], { offset: 4, mask: [241] }))
        return {
          ext: "mpg",
          // May also be .ps, .mpeg
          mime: "video/MP1S"
        };
      if (this.check([68], { offset: 4, mask: [196] }))
        return {
          ext: "mpg",
          // May also be .mpg, .m2p, .vob or .sub
          mime: "video/MP2P"
        };
    }
    if (this.checkString("ITSF"))
      return {
        ext: "chm",
        mime: "application/vnd.ms-htmlhelp"
      };
    if (this.check([202, 254, 186, 190]))
      return {
        ext: "class",
        mime: "application/java-vm"
      };
    if (this.check([253, 55, 122, 88, 90, 0]))
      return {
        ext: "xz",
        mime: "application/x-xz"
      };
    if (this.checkString("<?xml "))
      return {
        ext: "xml",
        mime: "application/xml"
      };
    if (this.check([55, 122, 188, 175, 39, 28]))
      return {
        ext: "7z",
        mime: "application/x-7z-compressed"
      };
    if (this.check([82, 97, 114, 33, 26, 7]) && (this.buffer[6] === 0 || this.buffer[6] === 1))
      return {
        ext: "rar",
        mime: "application/x-rar-compressed"
      };
    if (this.checkString("solid "))
      return {
        ext: "stl",
        mime: "model/stl"
      };
    if (this.checkString("AC")) {
      const t = new T(4, "latin1").get(this.buffer, 2);
      if (t.match("^d*") && t >= 1e3 && t <= 1050)
        return {
          ext: "dwg",
          mime: "image/vnd.dwg"
        };
    }
    if (this.checkString("070707"))
      return {
        ext: "cpio",
        mime: "application/x-cpio"
      };
    if (this.checkString("BLENDER"))
      return {
        ext: "blend",
        mime: "application/x-blender"
      };
    if (this.checkString("!<arch>"))
      return await e.ignore(8), await e.readToken(new T(13, "ascii")) === "debian-binary" ? {
        ext: "deb",
        mime: "application/x-deb"
      } : {
        ext: "ar",
        mime: "application/x-unix-archive"
      };
    if (this.checkString("WEBVTT") && // One of LF, CR, tab, space, or end of file must follow "WEBVTT" per the spec (see `fixture/fixture-vtt-*.vtt` for examples). Note that `\0` is technically the null character (there is no such thing as an EOF character). However, checking for `\0` gives us the same result as checking for the end of the stream.
    [`
`, "\r", "	", " ", "\0"].some((t) => this.checkString(t, { offset: 6 })))
      return {
        ext: "vtt",
        mime: "text/vtt"
      };
    if (this.check([137, 80, 78, 71, 13, 10, 26, 10])) {
      await e.ignore(8);
      async function t() {
        return {
          length: await e.readToken(Ze),
          type: await e.readToken(new T(4, "latin1"))
        };
      }
      do {
        const r = await t();
        if (r.length < 0)
          return;
        switch (r.type) {
          case "IDAT":
            return {
              ext: "png",
              mime: "image/png"
            };
          case "acTL":
            return {
              ext: "apng",
              mime: "image/apng"
            };
          default:
            await e.ignore(r.length + 4);
        }
      } while (e.position + 8 < e.fileInfo.size);
      return {
        ext: "png",
        mime: "image/png"
      };
    }
    if (this.check([65, 82, 82, 79, 87, 49, 0, 0]))
      return {
        ext: "arrow",
        mime: "application/x-apache-arrow"
      };
    if (this.check([103, 108, 84, 70, 2, 0, 0, 0]))
      return {
        ext: "glb",
        mime: "model/gltf-binary"
      };
    if (this.check([102, 114, 101, 101], { offset: 4 }) || this.check([109, 100, 97, 116], { offset: 4 }) || this.check([109, 111, 111, 118], { offset: 4 }) || this.check([119, 105, 100, 101], { offset: 4 }))
      return {
        ext: "mov",
        mime: "video/quicktime"
      };
    if (this.check([73, 73, 82, 79, 8, 0, 0, 0, 24]))
      return {
        ext: "orf",
        mime: "image/x-olympus-orf"
      };
    if (this.checkString("gimp xcf "))
      return {
        ext: "xcf",
        mime: "image/x-xcf"
      };
    if (this.check([73, 73, 85, 0, 24, 0, 0, 0, 136, 231, 116, 216]))
      return {
        ext: "rw2",
        mime: "image/x-panasonic-rw2"
      };
    if (this.check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
      async function t() {
        const r = new Uint8Array(16);
        return await e.readBuffer(r), {
          id: r,
          size: Number(await e.readToken(Ke))
        };
      }
      for (await e.ignore(30); e.position + 24 < e.fileInfo.size; ) {
        const r = await t();
        let a = r.size - 24;
        if (S(r.id, [145, 7, 220, 183, 183, 169, 207, 17, 142, 230, 0, 192, 12, 32, 83, 101])) {
          const n = new Uint8Array(16);
          if (a -= await e.readBuffer(n), S(n, [64, 158, 105, 248, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43]))
            return {
              ext: "asf",
              mime: "audio/x-ms-asf"
            };
          if (S(n, [192, 239, 25, 188, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43]))
            return {
              ext: "asf",
              mime: "video/x-ms-asf"
            };
          break;
        }
        await e.ignore(a);
      }
      return {
        ext: "asf",
        mime: "application/vnd.ms-asf"
      };
    }
    if (this.check([171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10]))
      return {
        ext: "ktx",
        mime: "image/ktx"
      };
    if ((this.check([126, 16, 4]) || this.check([126, 24, 4])) && this.check([48, 77, 73, 69], { offset: 4 }))
      return {
        ext: "mie",
        mime: "application/x-mie"
      };
    if (this.check([39, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], { offset: 2 }))
      return {
        ext: "shp",
        mime: "application/x-esri-shape"
      };
    if (this.check([255, 79, 255, 81]))
      return {
        ext: "j2c",
        mime: "image/j2c"
      };
    if (this.check([0, 0, 0, 12, 106, 80, 32, 32, 13, 10, 135, 10]))
      switch (await e.ignore(20), await e.readToken(new T(4, "ascii"))) {
        case "jp2 ":
          return {
            ext: "jp2",
            mime: "image/jp2"
          };
        case "jpx ":
          return {
            ext: "jpx",
            mime: "image/jpx"
          };
        case "jpm ":
          return {
            ext: "jpm",
            mime: "image/jpm"
          };
        case "mjp2":
          return {
            ext: "mj2",
            mime: "image/mj2"
          };
        default:
          return;
      }
    if (this.check([255, 10]) || this.check([0, 0, 0, 12, 74, 88, 76, 32, 13, 10, 135, 10]))
      return {
        ext: "jxl",
        mime: "image/jxl"
      };
    if (this.check([254, 255]))
      return this.check([0, 60, 0, 63, 0, 120, 0, 109, 0, 108], { offset: 2 }) ? {
        ext: "xml",
        mime: "application/xml"
      } : void 0;
    if (this.check([0, 0, 1, 186]) || this.check([0, 0, 1, 179]))
      return {
        ext: "mpg",
        mime: "video/mpeg"
      };
    if (this.check([0, 1, 0, 0, 0]))
      return {
        ext: "ttf",
        mime: "font/ttf"
      };
    if (this.check([0, 0, 1, 0]))
      return {
        ext: "ico",
        mime: "image/x-icon"
      };
    if (this.check([0, 0, 2, 0]))
      return {
        ext: "cur",
        mime: "image/x-icon"
      };
    if (this.check([208, 207, 17, 224, 161, 177, 26, 225]))
      return {
        ext: "cfb",
        mime: "application/x-cfb"
      };
    if (await e.peekBuffer(this.buffer, { length: Math.min(256, e.fileInfo.size), mayBeLess: !0 }), this.check([97, 99, 115, 112], { offset: 36 }))
      return {
        ext: "icc",
        mime: "application/vnd.iccprofile"
      };
    if (this.checkString("**ACE", { offset: 7 }) && this.checkString("**", { offset: 12 }))
      return {
        ext: "ace",
        mime: "application/x-ace-compressed"
      };
    if (this.checkString("BEGIN:")) {
      if (this.checkString("VCARD", { offset: 6 }))
        return {
          ext: "vcf",
          mime: "text/vcard"
        };
      if (this.checkString("VCALENDAR", { offset: 6 }))
        return {
          ext: "ics",
          mime: "text/calendar"
        };
    }
    if (this.checkString("FUJIFILMCCD-RAW"))
      return {
        ext: "raf",
        mime: "image/x-fujifilm-raf"
      };
    if (this.checkString("Extended Module:"))
      return {
        ext: "xm",
        mime: "audio/x-xm"
      };
    if (this.checkString("Creative Voice File"))
      return {
        ext: "voc",
        mime: "audio/x-voc"
      };
    if (this.check([4, 0, 0, 0]) && this.buffer.length >= 16) {
      const t = new DataView(this.buffer.buffer).getUint32(12, !0);
      if (t > 12 && this.buffer.length >= t + 16)
        try {
          const r = new TextDecoder().decode(this.buffer.slice(16, t + 16));
          if (JSON.parse(r).files)
            return {
              ext: "asar",
              mime: "application/x-asar"
            };
        } catch {
        }
    }
    if (this.check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2]))
      return {
        ext: "mxf",
        mime: "application/mxf"
      };
    if (this.checkString("SCRM", { offset: 44 }))
      return {
        ext: "s3m",
        mime: "audio/x-s3m"
      };
    if (this.check([71]) && this.check([71], { offset: 188 }))
      return {
        ext: "mts",
        mime: "video/mp2t"
      };
    if (this.check([71], { offset: 4 }) && this.check([71], { offset: 196 }))
      return {
        ext: "mts",
        mime: "video/mp2t"
      };
    if (this.check([66, 79, 79, 75, 77, 79, 66, 73], { offset: 60 }))
      return {
        ext: "mobi",
        mime: "application/x-mobipocket-ebook"
      };
    if (this.check([68, 73, 67, 77], { offset: 128 }))
      return {
        ext: "dcm",
        mime: "application/dicom"
      };
    if (this.check([76, 0, 0, 0, 1, 20, 2, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0, 0, 0, 70]))
      return {
        ext: "lnk",
        mime: "application/x.ms.shortcut"
        // Invented by us
      };
    if (this.check([98, 111, 111, 107, 0, 0, 0, 0, 109, 97, 114, 107, 0, 0, 0, 0]))
      return {
        ext: "alias",
        mime: "application/x.apple.alias"
        // Invented by us
      };
    if (this.checkString("Kaydara FBX Binary  \0"))
      return {
        ext: "fbx",
        mime: "application/x.autodesk.fbx"
        // Invented by us
      };
    if (this.check([76, 80], { offset: 34 }) && (this.check([0, 0, 1], { offset: 8 }) || this.check([1, 0, 2], { offset: 8 }) || this.check([2, 0, 2], { offset: 8 })))
      return {
        ext: "eot",
        mime: "application/vnd.ms-fontobject"
      };
    if (this.check([6, 6, 237, 245, 216, 29, 70, 229, 189, 49, 239, 231, 254, 116, 183, 29]))
      return {
        ext: "indd",
        mime: "application/x-indesign"
      };
    if (await e.peekBuffer(this.buffer, { length: Math.min(512, e.fileInfo.size), mayBeLess: !0 }), Ci(this.buffer))
      return {
        ext: "tar",
        mime: "application/x-tar"
      };
    if (this.check([255, 254]))
      return this.check([60, 0, 63, 0, 120, 0, 109, 0, 108, 0], { offset: 2 }) ? {
        ext: "xml",
        mime: "application/xml"
      } : this.check([255, 14, 83, 0, 107, 0, 101, 0, 116, 0, 99, 0, 104, 0, 85, 0, 112, 0, 32, 0, 77, 0, 111, 0, 100, 0, 101, 0, 108, 0], { offset: 2 }) ? {
        ext: "skp",
        mime: "application/vnd.sketchup.skp"
      } : void 0;
    if (this.checkString("-----BEGIN PGP MESSAGE-----"))
      return {
        ext: "pgp",
        mime: "application/pgp-encrypted"
      };
    if (this.buffer.length >= 2 && this.check([255, 224], { offset: 0, mask: [255, 224] })) {
      if (this.check([16], { offset: 1, mask: [22] }))
        return this.check([8], { offset: 1, mask: [8] }) ? {
          ext: "aac",
          mime: "audio/aac"
        } : {
          ext: "aac",
          mime: "audio/aac"
        };
      if (this.check([2], { offset: 1, mask: [6] }))
        return {
          ext: "mp3",
          mime: "audio/mpeg"
        };
      if (this.check([4], { offset: 1, mask: [6] }))
        return {
          ext: "mp2",
          mime: "audio/mpeg"
        };
      if (this.check([6], { offset: 1, mask: [6] }))
        return {
          ext: "mp1",
          mime: "audio/mpeg"
        };
    }
  }
  async readTiffTag(e) {
    const t = await this.tokenizer.readToken(e ? L : C);
    switch (this.tokenizer.ignore(10), t) {
      case 50341:
        return {
          ext: "arw",
          mime: "image/x-sony-arw"
        };
      case 50706:
        return {
          ext: "dng",
          mime: "image/x-adobe-dng"
        };
    }
  }
  async readTiffIFD(e) {
    const t = await this.tokenizer.readToken(e ? L : C);
    for (let r = 0; r < t; ++r) {
      const a = await this.readTiffTag(e);
      if (a)
        return a;
    }
  }
  async readTiffHeader(e) {
    const t = (e ? L : C).get(this.buffer, 2), r = (e ? V : g).get(this.buffer, 4);
    if (t === 42) {
      if (r >= 6) {
        if (this.checkString("CR", { offset: 8 }))
          return {
            ext: "cr2",
            mime: "image/x-canon-cr2"
          };
        if (r >= 8 && (this.check([28, 0, 254, 0], { offset: 8 }) || this.check([31, 0, 11, 0], { offset: 8 })))
          return {
            ext: "nef",
            mime: "image/x-nikon-nef"
          };
      }
      return await this.tokenizer.ignore(r), await this.readTiffIFD(e) ?? {
        ext: "tif",
        mime: "image/tiff"
      };
    }
    if (t === 43)
      return {
        ext: "tif",
        mime: "image/tiff"
      };
  }
}
new Set(Ei);
new Set(Ri);
var ge = {};
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var Me = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, Bi = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/, nt = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/, Mi = /\\([\u000b\u0020-\u00ff])/g, Fi = /([\\"])/g, st = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
ge.format = Oi;
ge.parse = Di;
function Oi(i) {
  if (!i || typeof i != "object")
    throw new TypeError("argument obj is required");
  var e = i.parameters, t = i.type;
  if (!t || !st.test(t))
    throw new TypeError("invalid type");
  var r = t;
  if (e && typeof e == "object")
    for (var a, n = Object.keys(e).sort(), s = 0; s < n.length; s++) {
      if (a = n[s], !nt.test(a))
        throw new TypeError("invalid parameter name");
      r += "; " + a + "=" + Pi(e[a]);
    }
  return r;
}
function Di(i) {
  if (!i)
    throw new TypeError("argument string is required");
  var e = typeof i == "object" ? Li(i) : i;
  if (typeof e != "string")
    throw new TypeError("argument string is required to be a string");
  var t = e.indexOf(";"), r = t !== -1 ? e.slice(0, t).trim() : e.trim();
  if (!st.test(r))
    throw new TypeError("invalid media type");
  var a = new zi(r.toLowerCase());
  if (t !== -1) {
    var n, s, u;
    for (Me.lastIndex = t; s = Me.exec(e); ) {
      if (s.index !== t)
        throw new TypeError("invalid parameter format");
      t += s[0].length, n = s[1].toLowerCase(), u = s[2], u.charCodeAt(0) === 34 && (u = u.slice(1, -1), u.indexOf("\\") !== -1 && (u = u.replace(Mi, "$1"))), a.parameters[n] = u;
    }
    if (t !== e.length)
      throw new TypeError("invalid parameter format");
  }
  return a;
}
function Li(i) {
  var e;
  if (typeof i.getHeader == "function" ? e = i.getHeader("content-type") : typeof i.headers == "object" && (e = i.headers && i.headers["content-type"]), typeof e != "string")
    throw new TypeError("content-type header is missing from object");
  return e;
}
function Pi(i) {
  var e = String(i);
  if (nt.test(e))
    return e;
  if (e.length > 0 && !Bi.test(e))
    throw new TypeError("invalid parameter value");
  return '"' + e.replace(Fi, "\\$1") + '"';
}
function zi(i) {
  this.parameters = /* @__PURE__ */ Object.create(null), this.type = i;
}
/*!
 * media-typer
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
var Ni = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/, Ui = Xi;
function Xi(i) {
  if (!i)
    throw new TypeError("argument string is required");
  if (typeof i != "string")
    throw new TypeError("argument string is required to be a string");
  var e = Ni.exec(i.toLowerCase());
  if (!e)
    throw new TypeError("invalid media type");
  var t = e[1], r = e[2], a, n = r.lastIndexOf("+");
  return n !== -1 && (a = r.substr(n + 1), r = r.substr(0, n)), new Gi(t, r, a);
}
function Gi(i, e, t) {
  this.type = i, this.subtype = e, this.suffix = t;
}
var Fe;
(function(i) {
  i[i.shot = 10] = "shot", i[i.scene = 20] = "scene", i[i.track = 30] = "track", i[i.part = 40] = "part", i[i.album = 50] = "album", i[i.edition = 60] = "edition", i[i.collection = 70] = "collection";
})(Fe || (Fe = {}));
var pe;
(function(i) {
  i[i.video = 1] = "video", i[i.audio = 2] = "audio", i[i.complex = 3] = "complex", i[i.logo = 4] = "logo", i[i.subtitle = 17] = "subtitle", i[i.button = 18] = "button", i[i.control = 32] = "control";
})(pe || (pe = {}));
const z = (i) => class extends Error {
  constructor(t) {
    super(t), this.name = i;
  }
};
class $i extends z("CouldNotDetermineFileTypeError") {
}
class ji extends z("UnsupportedFileTypeError") {
}
class Wi extends z("UnexpectedFileContentError") {
  constructor(e, t) {
    super(t), this.fileType = e;
  }
  // Override toString to include file type information.
  toString() {
    return `${this.name} (FileType: ${this.fileType}): ${this.message}`;
  }
}
class we extends z("FieldDecodingError") {
}
class ot extends z("InternalParserError") {
}
const qi = (i) => class extends Wi {
  constructor(e) {
    super(i, e);
  }
};
function D(i, e, t) {
  return (i[e] & 1 << t) !== 0;
}
function Oe(i, e, t, r) {
  let a = e;
  if (r === "utf-16le") {
    for (; i[a] !== 0 || i[a + 1] !== 0; ) {
      if (a >= t)
        return t;
      a += 2;
    }
    return a;
  }
  for (; i[a] !== 0; ) {
    if (a >= t)
      return t;
    a++;
  }
  return a;
}
function Hi(i) {
  const e = i.indexOf("\0");
  return e === -1 ? i : i.substr(0, e);
}
function Yi(i) {
  const e = i.length;
  if (e & 1)
    throw new we("Buffer length must be even");
  for (let t = 0; t < e; t += 2) {
    const r = i[t];
    i[t] = i[t + 1], i[t + 1] = r;
  }
  return i;
}
function fe(i, e) {
  if (i[0] === 255 && i[1] === 254)
    return fe(i.subarray(2), e);
  if (e === "utf-16le" && i[0] === 254 && i[1] === 255) {
    if (i.length & 1)
      throw new we("Expected even number of octets for 16-bit unicode string");
    return fe(Yi(i), e);
  }
  return new T(i.length, e).get(i, 0);
}
function xa(i) {
  return i = i.replace(/^\x00+/g, ""), i = i.replace(/\x00+$/g, ""), i;
}
function ct(i, e, t, r) {
  const a = e + ~~(t / 8), n = t % 8;
  let s = i[a];
  s &= 255 >> n;
  const u = 8 - n, c = r - u;
  return c < 0 ? s >>= 8 - n - r : c > 0 && (s <<= c, s |= ct(i, e, t + u, c)), s;
}
function ga(i, e, t) {
  return ct(i, e, t, 1) === 1;
}
function Vi(i) {
  const e = [];
  for (let t = 0, r = i.length; t < r; t++) {
    const a = Number(i.charCodeAt(t)).toString(16);
    e.push(a.length === 1 ? `0${a}` : a);
  }
  return e.join(" ");
}
function Zi(i) {
  return 10 * Math.log10(i);
}
function Ki(i) {
  return 10 ** (i / 10);
}
function Ji(i) {
  const e = i.split(" ").map((t) => t.trim().toLowerCase());
  if (e.length >= 1) {
    const t = Number.parseFloat(e[0]);
    return e.length === 2 && e[1] === "db" ? {
      dB: t,
      ratio: Ki(t)
    } : {
      dB: Zi(t),
      ratio: t
    };
  }
}
var De;
(function(i) {
  i[i.Other = 0] = "Other", i[i["32x32 pixels 'file icon' (PNG only)"] = 1] = "32x32 pixels 'file icon' (PNG only)", i[i["Other file icon"] = 2] = "Other file icon", i[i["Cover (front)"] = 3] = "Cover (front)", i[i["Cover (back)"] = 4] = "Cover (back)", i[i["Leaflet page"] = 5] = "Leaflet page", i[i["Media (e.g. label side of CD)"] = 6] = "Media (e.g. label side of CD)", i[i["Lead artist/lead performer/soloist"] = 7] = "Lead artist/lead performer/soloist", i[i["Artist/performer"] = 8] = "Artist/performer", i[i.Conductor = 9] = "Conductor", i[i["Band/Orchestra"] = 10] = "Band/Orchestra", i[i.Composer = 11] = "Composer", i[i["Lyricist/text writer"] = 12] = "Lyricist/text writer", i[i["Recording Location"] = 13] = "Recording Location", i[i["During recording"] = 14] = "During recording", i[i["During performance"] = 15] = "During performance", i[i["Movie/video screen capture"] = 16] = "Movie/video screen capture", i[i["A bright coloured fish"] = 17] = "A bright coloured fish", i[i.Illustration = 18] = "Illustration", i[i["Band/artist logotype"] = 19] = "Band/artist logotype", i[i["Publisher/Studio logotype"] = 20] = "Publisher/Studio logotype";
})(De || (De = {}));
var Z;
(function(i) {
  i[i.other = 0] = "other", i[i.lyrics = 1] = "lyrics", i[i.text = 2] = "text", i[i.movement_part = 3] = "movement_part", i[i.events = 4] = "events", i[i.chord = 5] = "chord", i[i.trivia_pop = 6] = "trivia_pop";
})(Z || (Z = {}));
var K;
(function(i) {
  i[i.notSynchronized0 = 0] = "notSynchronized0", i[i.mpegFrameNumber = 1] = "mpegFrameNumber", i[i.milliseconds = 2] = "milliseconds";
})(K || (K = {}));
const Qi = {
  get: (i, e) => i[e + 3] & 127 | i[e + 2] << 7 | i[e + 1] << 14 | i[e] << 21,
  len: 4
}, wa = {
  len: 10,
  get: (i, e) => ({
    // ID3v2/file identifier   "ID3"
    fileIdentifier: new T(3, "ascii").get(i, e),
    // ID3v2 versionIndex
    version: {
      major: me.get(i, e + 3),
      revision: me.get(i, e + 4)
    },
    // ID3v2 flags
    flags: {
      // Unsynchronisation
      unsynchronisation: D(i, e + 5, 7),
      // Extended header
      isExtendedHeader: D(i, e + 5, 6),
      // Experimental indicator
      expIndicator: D(i, e + 5, 5),
      footer: D(i, e + 5, 4)
    },
    size: Qi.get(i, e + 6)
  })
}, ba = {
  len: 10,
  get: (i, e) => ({
    // Extended header size
    size: V.get(i, e),
    // Extended Flags
    extendedFlags: L.get(i, e + 4),
    // Size of padding
    sizeOfPadding: V.get(i, e + 6),
    // CRC data present
    crcDataPresent: D(i, e + 4, 31)
  })
}, er = {
  len: 1,
  get: (i, e) => {
    switch (i[e]) {
      case 0:
        return { encoding: "latin1" };
      case 1:
        return { encoding: "utf-16le", bom: !0 };
      case 2:
        return { encoding: "utf-16le", bom: !1 };
      case 3:
        return { encoding: "utf8", bom: !1 };
      default:
        return { encoding: "utf8", bom: !1 };
    }
  }
}, tr = {
  len: 4,
  get: (i, e) => ({
    encoding: er.get(i, e),
    language: new T(3, "latin1").get(i, e + 1)
  })
}, Ta = {
  len: 6,
  get: (i, e) => {
    const t = tr.get(i, e);
    return {
      encoding: t.encoding,
      language: t.language,
      timeStampFormat: M.get(i, e + 4),
      contentType: M.get(i, e + 5)
    };
  }
}, J = {
  year: { multiple: !1 },
  track: { multiple: !1 },
  disk: { multiple: !1 },
  title: { multiple: !1 },
  artist: { multiple: !1 },
  artists: { multiple: !0, unique: !0 },
  albumartist: { multiple: !1 },
  album: { multiple: !1 },
  date: { multiple: !1 },
  originaldate: { multiple: !1 },
  originalyear: { multiple: !1 },
  releasedate: { multiple: !1 },
  comment: { multiple: !0, unique: !1 },
  genre: { multiple: !0, unique: !0 },
  picture: { multiple: !0, unique: !0 },
  composer: { multiple: !0, unique: !0 },
  lyrics: { multiple: !0, unique: !1 },
  albumsort: { multiple: !1, unique: !0 },
  titlesort: { multiple: !1, unique: !0 },
  work: { multiple: !1, unique: !0 },
  artistsort: { multiple: !1, unique: !0 },
  albumartistsort: { multiple: !1, unique: !0 },
  composersort: { multiple: !1, unique: !0 },
  lyricist: { multiple: !0, unique: !0 },
  writer: { multiple: !0, unique: !0 },
  conductor: { multiple: !0, unique: !0 },
  remixer: { multiple: !0, unique: !0 },
  arranger: { multiple: !0, unique: !0 },
  engineer: { multiple: !0, unique: !0 },
  producer: { multiple: !0, unique: !0 },
  technician: { multiple: !0, unique: !0 },
  djmixer: { multiple: !0, unique: !0 },
  mixer: { multiple: !0, unique: !0 },
  label: { multiple: !0, unique: !0 },
  grouping: { multiple: !1 },
  subtitle: { multiple: !0 },
  discsubtitle: { multiple: !1 },
  totaltracks: { multiple: !1 },
  totaldiscs: { multiple: !1 },
  compilation: { multiple: !1 },
  rating: { multiple: !0 },
  bpm: { multiple: !1 },
  mood: { multiple: !1 },
  media: { multiple: !1 },
  catalognumber: { multiple: !0, unique: !0 },
  tvShow: { multiple: !1 },
  tvShowSort: { multiple: !1 },
  tvSeason: { multiple: !1 },
  tvEpisode: { multiple: !1 },
  tvEpisodeId: { multiple: !1 },
  tvNetwork: { multiple: !1 },
  podcast: { multiple: !1 },
  podcasturl: { multiple: !1 },
  releasestatus: { multiple: !1 },
  releasetype: { multiple: !0 },
  releasecountry: { multiple: !1 },
  script: { multiple: !1 },
  language: { multiple: !1 },
  copyright: { multiple: !1 },
  license: { multiple: !1 },
  encodedby: { multiple: !1 },
  encodersettings: { multiple: !1 },
  gapless: { multiple: !1 },
  barcode: { multiple: !1 },
  isrc: { multiple: !0 },
  asin: { multiple: !1 },
  musicbrainz_recordingid: { multiple: !1 },
  musicbrainz_trackid: { multiple: !1 },
  musicbrainz_albumid: { multiple: !1 },
  musicbrainz_artistid: { multiple: !0 },
  musicbrainz_albumartistid: { multiple: !0 },
  musicbrainz_releasegroupid: { multiple: !1 },
  musicbrainz_workid: { multiple: !1 },
  musicbrainz_trmid: { multiple: !1 },
  musicbrainz_discid: { multiple: !1 },
  acoustid_id: { multiple: !1 },
  acoustid_fingerprint: { multiple: !1 },
  musicip_puid: { multiple: !1 },
  musicip_fingerprint: { multiple: !1 },
  website: { multiple: !1 },
  "performer:instrument": { multiple: !0, unique: !0 },
  averageLevel: { multiple: !1 },
  peakLevel: { multiple: !1 },
  notes: { multiple: !0, unique: !1 },
  key: { multiple: !1 },
  originalalbum: { multiple: !1 },
  originalartist: { multiple: !1 },
  discogs_artist_id: { multiple: !0, unique: !0 },
  discogs_release_id: { multiple: !1 },
  discogs_label_id: { multiple: !1 },
  discogs_master_release_id: { multiple: !1 },
  discogs_votes: { multiple: !1 },
  discogs_rating: { multiple: !1 },
  replaygain_track_peak: { multiple: !1 },
  replaygain_track_gain: { multiple: !1 },
  replaygain_album_peak: { multiple: !1 },
  replaygain_album_gain: { multiple: !1 },
  replaygain_track_minmax: { multiple: !1 },
  replaygain_album_minmax: { multiple: !1 },
  replaygain_undo: { multiple: !1 },
  description: { multiple: !0 },
  longDescription: { multiple: !1 },
  category: { multiple: !0 },
  hdVideo: { multiple: !1 },
  keywords: { multiple: !0 },
  movement: { multiple: !1 },
  movementIndex: { multiple: !1 },
  movementTotal: { multiple: !1 },
  podcastId: { multiple: !1 },
  showMovement: { multiple: !1 },
  stik: { multiple: !1 }
};
function ir(i) {
  return J[i] && !J[i].multiple;
}
function rr(i) {
  return !J[i].multiple || J[i].unique || !1;
}
class I {
  static toIntOrNull(e) {
    const t = Number.parseInt(e, 10);
    return Number.isNaN(t) ? null : t;
  }
  // TODO: a string of 1of1 would fail to be converted
  // converts 1/10 to no : 1, of : 10
  // or 1 to no : 1, of : 0
  static normalizeTrack(e) {
    const t = e.toString().split("/");
    return {
      no: Number.parseInt(t[0], 10) || null,
      of: Number.parseInt(t[1], 10) || null
    };
  }
  constructor(e, t) {
    this.tagTypes = e, this.tagMap = t;
  }
  /**
   * Process and set common tags
   * write common tags to
   * @param tag Native tag
   * @param warnings Register warnings
   * @return common name
   */
  mapGenericTag(e, t) {
    e = { id: e.id, value: e.value }, this.postMap(e, t);
    const r = this.getCommonName(e.id);
    return r ? { id: r, value: e.value } : null;
  }
  /**
   * Convert native tag key to common tag key
   * @param tag Native header tag
   * @return common tag name (alias)
   */
  getCommonName(e) {
    return this.tagMap[e];
  }
  /**
   * Handle post mapping exceptions / correction
   * @param tag Tag e.g. {"©alb", "Buena Vista Social Club")
   * @param warnings Used to register warnings
   */
  postMap(e, t) {
  }
}
I.maxRatingScore = 1;
const ar = {
  title: "title",
  artist: "artist",
  album: "album",
  year: "year",
  comment: "comment",
  track: "track",
  genre: "genre"
};
class nr extends I {
  constructor() {
    super(["ID3v1"], ar);
  }
}
class N extends I {
  constructor(e, t) {
    const r = {};
    for (const a of Object.keys(t))
      r[a.toUpperCase()] = t[a];
    super(e, r);
  }
  /**
   * @tag  Native header tag
   * @return common tag name (alias)
   */
  getCommonName(e) {
    return this.tagMap[e.toUpperCase()];
  }
}
const sr = {
  // id3v2.3
  TIT2: "title",
  TPE1: "artist",
  "TXXX:Artists": "artists",
  TPE2: "albumartist",
  TALB: "album",
  TDRV: "date",
  // [ 'date', 'year' ] ToDo: improve 'year' mapping
  /**
   * Original release year
   */
  TORY: "originalyear",
  TPOS: "disk",
  TCON: "genre",
  APIC: "picture",
  TCOM: "composer",
  USLT: "lyrics",
  TSOA: "albumsort",
  TSOT: "titlesort",
  TOAL: "originalalbum",
  TSOP: "artistsort",
  TSO2: "albumartistsort",
  TSOC: "composersort",
  TEXT: "lyricist",
  "TXXX:Writer": "writer",
  TPE3: "conductor",
  // 'IPLS:instrument': 'performer:instrument', // ToDo
  TPE4: "remixer",
  "IPLS:arranger": "arranger",
  "IPLS:engineer": "engineer",
  "IPLS:producer": "producer",
  "IPLS:DJ-mix": "djmixer",
  "IPLS:mix": "mixer",
  TPUB: "label",
  TIT1: "grouping",
  TIT3: "subtitle",
  TRCK: "track",
  TCMP: "compilation",
  POPM: "rating",
  TBPM: "bpm",
  TMED: "media",
  "TXXX:CATALOGNUMBER": "catalognumber",
  "TXXX:MusicBrainz Album Status": "releasestatus",
  "TXXX:MusicBrainz Album Type": "releasetype",
  /**
   * Release country as documented: https://picard.musicbrainz.org/docs/mappings/#cite_note-0
   */
  "TXXX:MusicBrainz Album Release Country": "releasecountry",
  /**
   * Release country as implemented // ToDo: report
   */
  "TXXX:RELEASECOUNTRY": "releasecountry",
  "TXXX:SCRIPT": "script",
  TLAN: "language",
  TCOP: "copyright",
  WCOP: "license",
  TENC: "encodedby",
  TSSE: "encodersettings",
  "TXXX:BARCODE": "barcode",
  "TXXX:ISRC": "isrc",
  TSRC: "isrc",
  "TXXX:ASIN": "asin",
  "TXXX:originalyear": "originalyear",
  "UFID:http://musicbrainz.org": "musicbrainz_recordingid",
  "TXXX:MusicBrainz Release Track Id": "musicbrainz_trackid",
  "TXXX:MusicBrainz Album Id": "musicbrainz_albumid",
  "TXXX:MusicBrainz Artist Id": "musicbrainz_artistid",
  "TXXX:MusicBrainz Album Artist Id": "musicbrainz_albumartistid",
  "TXXX:MusicBrainz Release Group Id": "musicbrainz_releasegroupid",
  "TXXX:MusicBrainz Work Id": "musicbrainz_workid",
  "TXXX:MusicBrainz TRM Id": "musicbrainz_trmid",
  "TXXX:MusicBrainz Disc Id": "musicbrainz_discid",
  "TXXX:ACOUSTID_ID": "acoustid_id",
  "TXXX:Acoustid Id": "acoustid_id",
  "TXXX:Acoustid Fingerprint": "acoustid_fingerprint",
  "TXXX:MusicIP PUID": "musicip_puid",
  "TXXX:MusicMagic Fingerprint": "musicip_fingerprint",
  WOAR: "website",
  // id3v2.4
  // ToDo: In same sequence as defined at http://id3.org/id3v2.4.0-frames
  TDRC: "date",
  // date YYYY-MM-DD
  TYER: "year",
  TDOR: "originaldate",
  // 'TMCL:instrument': 'performer:instrument',
  "TIPL:arranger": "arranger",
  "TIPL:engineer": "engineer",
  "TIPL:producer": "producer",
  "TIPL:DJ-mix": "djmixer",
  "TIPL:mix": "mixer",
  TMOO: "mood",
  // additional mappings:
  SYLT: "lyrics",
  TSST: "discsubtitle",
  TKEY: "key",
  COMM: "comment",
  TOPE: "originalartist",
  // Windows Media Player
  "PRIV:AverageLevel": "averageLevel",
  "PRIV:PeakLevel": "peakLevel",
  // Discogs
  "TXXX:DISCOGS_ARTIST_ID": "discogs_artist_id",
  "TXXX:DISCOGS_ARTISTS": "artists",
  "TXXX:DISCOGS_ARTIST_NAME": "artists",
  "TXXX:DISCOGS_ALBUM_ARTISTS": "albumartist",
  "TXXX:DISCOGS_CATALOG": "catalognumber",
  "TXXX:DISCOGS_COUNTRY": "releasecountry",
  "TXXX:DISCOGS_DATE": "originaldate",
  "TXXX:DISCOGS_LABEL": "label",
  "TXXX:DISCOGS_LABEL_ID": "discogs_label_id",
  "TXXX:DISCOGS_MASTER_RELEASE_ID": "discogs_master_release_id",
  "TXXX:DISCOGS_RATING": "discogs_rating",
  "TXXX:DISCOGS_RELEASED": "date",
  "TXXX:DISCOGS_RELEASE_ID": "discogs_release_id",
  "TXXX:DISCOGS_VOTES": "discogs_votes",
  "TXXX:CATALOGID": "catalognumber",
  "TXXX:STYLE": "genre",
  "TXXX:REPLAYGAIN_TRACK_PEAK": "replaygain_track_peak",
  "TXXX:REPLAYGAIN_TRACK_GAIN": "replaygain_track_gain",
  "TXXX:REPLAYGAIN_ALBUM_PEAK": "replaygain_album_peak",
  "TXXX:REPLAYGAIN_ALBUM_GAIN": "replaygain_album_gain",
  "TXXX:MP3GAIN_MINMAX": "replaygain_track_minmax",
  "TXXX:MP3GAIN_ALBUM_MINMAX": "replaygain_album_minmax",
  "TXXX:MP3GAIN_UNDO": "replaygain_undo",
  MVNM: "movement",
  MVIN: "movementIndex",
  PCST: "podcast",
  TCAT: "category",
  TDES: "description",
  TDRL: "releasedate",
  TGID: "podcastId",
  TKWD: "keywords",
  WFED: "podcasturl",
  GRP1: "grouping"
};
class be extends N {
  static toRating(e) {
    return {
      source: e.email,
      rating: e.rating > 0 ? (e.rating - 1) / 254 * I.maxRatingScore : void 0
    };
  }
  constructor() {
    super(["ID3v2.3", "ID3v2.4"], sr);
  }
  /**
   * Handle post mapping exceptions / correction
   * @param tag to post map
   * @param warnings Wil be used to register (collect) warnings
   */
  postMap(e, t) {
    switch (e.id) {
      case "UFID":
        {
          const r = e.value;
          r.owner_identifier === "http://musicbrainz.org" && (e.id += `:${r.owner_identifier}`, e.value = fe(r.identifier, "latin1"));
        }
        break;
      case "PRIV":
        {
          const r = e.value;
          switch (r.owner_identifier) {
            case "AverageLevel":
            case "PeakValue":
              e.id += `:${r.owner_identifier}`, e.value = r.data.length === 4 ? g.get(r.data, 0) : null, e.value === null && t.addWarning("Failed to parse PRIV:PeakValue");
              break;
            default:
              t.addWarning(`Unknown PRIV owner-identifier: ${r.data}`);
          }
        }
        break;
      case "POPM":
        e.value = be.toRating(e.value);
        break;
    }
  }
}
const or = {
  Title: "title",
  Author: "artist",
  "WM/AlbumArtist": "albumartist",
  "WM/AlbumTitle": "album",
  "WM/Year": "date",
  // changed to 'year' to 'date' based on Picard mappings; ToDo: check me
  "WM/OriginalReleaseTime": "originaldate",
  "WM/OriginalReleaseYear": "originalyear",
  Description: "comment",
  "WM/TrackNumber": "track",
  "WM/PartOfSet": "disk",
  "WM/Genre": "genre",
  "WM/Composer": "composer",
  "WM/Lyrics": "lyrics",
  "WM/AlbumSortOrder": "albumsort",
  "WM/TitleSortOrder": "titlesort",
  "WM/ArtistSortOrder": "artistsort",
  "WM/AlbumArtistSortOrder": "albumartistsort",
  "WM/ComposerSortOrder": "composersort",
  "WM/Writer": "lyricist",
  "WM/Conductor": "conductor",
  "WM/ModifiedBy": "remixer",
  "WM/Engineer": "engineer",
  "WM/Producer": "producer",
  "WM/DJMixer": "djmixer",
  "WM/Mixer": "mixer",
  "WM/Publisher": "label",
  "WM/ContentGroupDescription": "grouping",
  "WM/SubTitle": "subtitle",
  "WM/SetSubTitle": "discsubtitle",
  // 'WM/PartOfSet': 'totaldiscs',
  "WM/IsCompilation": "compilation",
  "WM/SharedUserRating": "rating",
  "WM/BeatsPerMinute": "bpm",
  "WM/Mood": "mood",
  "WM/Media": "media",
  "WM/CatalogNo": "catalognumber",
  "MusicBrainz/Album Status": "releasestatus",
  "MusicBrainz/Album Type": "releasetype",
  "MusicBrainz/Album Release Country": "releasecountry",
  "WM/Script": "script",
  "WM/Language": "language",
  Copyright: "copyright",
  LICENSE: "license",
  "WM/EncodedBy": "encodedby",
  "WM/EncodingSettings": "encodersettings",
  "WM/Barcode": "barcode",
  "WM/ISRC": "isrc",
  "MusicBrainz/Track Id": "musicbrainz_recordingid",
  "MusicBrainz/Release Track Id": "musicbrainz_trackid",
  "MusicBrainz/Album Id": "musicbrainz_albumid",
  "MusicBrainz/Artist Id": "musicbrainz_artistid",
  "MusicBrainz/Album Artist Id": "musicbrainz_albumartistid",
  "MusicBrainz/Release Group Id": "musicbrainz_releasegroupid",
  "MusicBrainz/Work Id": "musicbrainz_workid",
  "MusicBrainz/TRM Id": "musicbrainz_trmid",
  "MusicBrainz/Disc Id": "musicbrainz_discid",
  "Acoustid/Id": "acoustid_id",
  "Acoustid/Fingerprint": "acoustid_fingerprint",
  "MusicIP/PUID": "musicip_puid",
  "WM/ARTISTS": "artists",
  "WM/InitialKey": "key",
  ASIN: "asin",
  "WM/Work": "work",
  "WM/AuthorURL": "website",
  "WM/Picture": "picture"
};
class Te extends I {
  static toRating(e) {
    return {
      rating: Number.parseFloat(e + 1) / 5
    };
  }
  constructor() {
    super(["asf"], or);
  }
  postMap(e) {
    switch (e.id) {
      case "WM/SharedUserRating": {
        const t = e.id.split(":");
        e.value = Te.toRating(e.value), e.id = t[0];
        break;
      }
    }
  }
}
const cr = {
  TT2: "title",
  TP1: "artist",
  TP2: "albumartist",
  TAL: "album",
  TYE: "year",
  COM: "comment",
  TRK: "track",
  TPA: "disk",
  TCO: "genre",
  PIC: "picture",
  TCM: "composer",
  TOR: "originaldate",
  TOT: "originalalbum",
  TXT: "lyricist",
  TP3: "conductor",
  TPB: "label",
  TT1: "grouping",
  TT3: "subtitle",
  TLA: "language",
  TCR: "copyright",
  WCP: "license",
  TEN: "encodedby",
  TSS: "encodersettings",
  WAR: "website",
  PCS: "podcast",
  TCP: "compilation",
  TDR: "date",
  TS2: "albumartistsort",
  TSA: "albumsort",
  TSC: "composersort",
  TSP: "artistsort",
  TST: "titlesort",
  WFD: "podcasturl",
  TBP: "bpm"
};
class lr extends N {
  constructor() {
    super(["ID3v2.2"], cr);
  }
}
const ur = {
  Title: "title",
  Artist: "artist",
  Artists: "artists",
  "Album Artist": "albumartist",
  Album: "album",
  Year: "date",
  Originalyear: "originalyear",
  Originaldate: "originaldate",
  Releasedate: "releasedate",
  Comment: "comment",
  Track: "track",
  Disc: "disk",
  DISCNUMBER: "disk",
  // ToDo: backwards compatibility', valid tag?
  Genre: "genre",
  "Cover Art (Front)": "picture",
  "Cover Art (Back)": "picture",
  Composer: "composer",
  Lyrics: "lyrics",
  ALBUMSORT: "albumsort",
  TITLESORT: "titlesort",
  WORK: "work",
  ARTISTSORT: "artistsort",
  ALBUMARTISTSORT: "albumartistsort",
  COMPOSERSORT: "composersort",
  Lyricist: "lyricist",
  Writer: "writer",
  Conductor: "conductor",
  // 'Performer=artist (instrument)': 'performer:instrument',
  MixArtist: "remixer",
  Arranger: "arranger",
  Engineer: "engineer",
  Producer: "producer",
  DJMixer: "djmixer",
  Mixer: "mixer",
  Label: "label",
  Grouping: "grouping",
  Subtitle: "subtitle",
  DiscSubtitle: "discsubtitle",
  Compilation: "compilation",
  BPM: "bpm",
  Mood: "mood",
  Media: "media",
  CatalogNumber: "catalognumber",
  MUSICBRAINZ_ALBUMSTATUS: "releasestatus",
  MUSICBRAINZ_ALBUMTYPE: "releasetype",
  RELEASECOUNTRY: "releasecountry",
  Script: "script",
  Language: "language",
  Copyright: "copyright",
  LICENSE: "license",
  EncodedBy: "encodedby",
  EncoderSettings: "encodersettings",
  Barcode: "barcode",
  ISRC: "isrc",
  ASIN: "asin",
  musicbrainz_trackid: "musicbrainz_recordingid",
  musicbrainz_releasetrackid: "musicbrainz_trackid",
  MUSICBRAINZ_ALBUMID: "musicbrainz_albumid",
  MUSICBRAINZ_ARTISTID: "musicbrainz_artistid",
  MUSICBRAINZ_ALBUMARTISTID: "musicbrainz_albumartistid",
  MUSICBRAINZ_RELEASEGROUPID: "musicbrainz_releasegroupid",
  MUSICBRAINZ_WORKID: "musicbrainz_workid",
  MUSICBRAINZ_TRMID: "musicbrainz_trmid",
  MUSICBRAINZ_DISCID: "musicbrainz_discid",
  Acoustid_Id: "acoustid_id",
  ACOUSTID_FINGERPRINT: "acoustid_fingerprint",
  MUSICIP_PUID: "musicip_puid",
  Weblink: "website",
  REPLAYGAIN_TRACK_GAIN: "replaygain_track_gain",
  REPLAYGAIN_TRACK_PEAK: "replaygain_track_peak",
  MP3GAIN_MINMAX: "replaygain_track_minmax",
  MP3GAIN_UNDO: "replaygain_undo"
};
class mr extends N {
  constructor() {
    super(["APEv2"], ur);
  }
}
const pr = {
  "©nam": "title",
  "©ART": "artist",
  aART: "albumartist",
  /**
   * ToDo: Album artist seems to be stored here while Picard documentation says: aART
   */
  "----:com.apple.iTunes:Band": "albumartist",
  "©alb": "album",
  "©day": "date",
  "©cmt": "comment",
  "©com": "comment",
  trkn: "track",
  disk: "disk",
  "©gen": "genre",
  covr: "picture",
  "©wrt": "composer",
  "©lyr": "lyrics",
  soal: "albumsort",
  sonm: "titlesort",
  soar: "artistsort",
  soaa: "albumartistsort",
  soco: "composersort",
  "----:com.apple.iTunes:LYRICIST": "lyricist",
  "----:com.apple.iTunes:CONDUCTOR": "conductor",
  "----:com.apple.iTunes:REMIXER": "remixer",
  "----:com.apple.iTunes:ENGINEER": "engineer",
  "----:com.apple.iTunes:PRODUCER": "producer",
  "----:com.apple.iTunes:DJMIXER": "djmixer",
  "----:com.apple.iTunes:MIXER": "mixer",
  "----:com.apple.iTunes:LABEL": "label",
  "©grp": "grouping",
  "----:com.apple.iTunes:SUBTITLE": "subtitle",
  "----:com.apple.iTunes:DISCSUBTITLE": "discsubtitle",
  cpil: "compilation",
  tmpo: "bpm",
  "----:com.apple.iTunes:MOOD": "mood",
  "----:com.apple.iTunes:MEDIA": "media",
  "----:com.apple.iTunes:CATALOGNUMBER": "catalognumber",
  tvsh: "tvShow",
  tvsn: "tvSeason",
  tves: "tvEpisode",
  sosn: "tvShowSort",
  tven: "tvEpisodeId",
  tvnn: "tvNetwork",
  pcst: "podcast",
  purl: "podcasturl",
  "----:com.apple.iTunes:MusicBrainz Album Status": "releasestatus",
  "----:com.apple.iTunes:MusicBrainz Album Type": "releasetype",
  "----:com.apple.iTunes:MusicBrainz Album Release Country": "releasecountry",
  "----:com.apple.iTunes:SCRIPT": "script",
  "----:com.apple.iTunes:LANGUAGE": "language",
  cprt: "copyright",
  "©cpy": "copyright",
  "----:com.apple.iTunes:LICENSE": "license",
  "©too": "encodedby",
  pgap: "gapless",
  "----:com.apple.iTunes:BARCODE": "barcode",
  "----:com.apple.iTunes:ISRC": "isrc",
  "----:com.apple.iTunes:ASIN": "asin",
  "----:com.apple.iTunes:NOTES": "comment",
  "----:com.apple.iTunes:MusicBrainz Track Id": "musicbrainz_recordingid",
  "----:com.apple.iTunes:MusicBrainz Release Track Id": "musicbrainz_trackid",
  "----:com.apple.iTunes:MusicBrainz Album Id": "musicbrainz_albumid",
  "----:com.apple.iTunes:MusicBrainz Artist Id": "musicbrainz_artistid",
  "----:com.apple.iTunes:MusicBrainz Album Artist Id": "musicbrainz_albumartistid",
  "----:com.apple.iTunes:MusicBrainz Release Group Id": "musicbrainz_releasegroupid",
  "----:com.apple.iTunes:MusicBrainz Work Id": "musicbrainz_workid",
  "----:com.apple.iTunes:MusicBrainz TRM Id": "musicbrainz_trmid",
  "----:com.apple.iTunes:MusicBrainz Disc Id": "musicbrainz_discid",
  "----:com.apple.iTunes:Acoustid Id": "acoustid_id",
  "----:com.apple.iTunes:Acoustid Fingerprint": "acoustid_fingerprint",
  "----:com.apple.iTunes:MusicIP PUID": "musicip_puid",
  "----:com.apple.iTunes:fingerprint": "musicip_fingerprint",
  "----:com.apple.iTunes:replaygain_track_gain": "replaygain_track_gain",
  "----:com.apple.iTunes:replaygain_track_peak": "replaygain_track_peak",
  "----:com.apple.iTunes:replaygain_album_gain": "replaygain_album_gain",
  "----:com.apple.iTunes:replaygain_album_peak": "replaygain_album_peak",
  "----:com.apple.iTunes:replaygain_track_minmax": "replaygain_track_minmax",
  "----:com.apple.iTunes:replaygain_album_minmax": "replaygain_album_minmax",
  "----:com.apple.iTunes:replaygain_undo": "replaygain_undo",
  // Additional mappings:
  gnre: "genre",
  // ToDo: check mapping
  "----:com.apple.iTunes:ALBUMARTISTSORT": "albumartistsort",
  "----:com.apple.iTunes:ARTISTS": "artists",
  "----:com.apple.iTunes:ORIGINALDATE": "originaldate",
  "----:com.apple.iTunes:ORIGINALYEAR": "originalyear",
  "----:com.apple.iTunes:RELEASEDATE": "releasedate",
  // '----:com.apple.iTunes:PERFORMER': 'performer'
  desc: "description",
  ldes: "longDescription",
  "©mvn": "movement",
  "©mvi": "movementIndex",
  "©mvc": "movementTotal",
  "©wrk": "work",
  catg: "category",
  egid: "podcastId",
  hdvd: "hdVideo",
  keyw: "keywords",
  shwm: "showMovement",
  stik: "stik",
  rate: "rating"
}, fr = "iTunes";
class Le extends N {
  constructor() {
    super([fr], pr);
  }
  postMap(e, t) {
    switch (e.id) {
      case "rate":
        e.value = {
          source: void 0,
          rating: Number.parseFloat(e.value) / 100
        };
        break;
    }
  }
}
const dr = {
  TITLE: "title",
  ARTIST: "artist",
  ARTISTS: "artists",
  ALBUMARTIST: "albumartist",
  "ALBUM ARTIST": "albumartist",
  ALBUM: "album",
  DATE: "date",
  ORIGINALDATE: "originaldate",
  ORIGINALYEAR: "originalyear",
  RELEASEDATE: "releasedate",
  COMMENT: "comment",
  TRACKNUMBER: "track",
  DISCNUMBER: "disk",
  GENRE: "genre",
  METADATA_BLOCK_PICTURE: "picture",
  COMPOSER: "composer",
  LYRICS: "lyrics",
  ALBUMSORT: "albumsort",
  TITLESORT: "titlesort",
  WORK: "work",
  ARTISTSORT: "artistsort",
  ALBUMARTISTSORT: "albumartistsort",
  COMPOSERSORT: "composersort",
  LYRICIST: "lyricist",
  WRITER: "writer",
  CONDUCTOR: "conductor",
  // 'PERFORMER=artist (instrument)': 'performer:instrument', // ToDo
  REMIXER: "remixer",
  ARRANGER: "arranger",
  ENGINEER: "engineer",
  PRODUCER: "producer",
  DJMIXER: "djmixer",
  MIXER: "mixer",
  LABEL: "label",
  GROUPING: "grouping",
  SUBTITLE: "subtitle",
  DISCSUBTITLE: "discsubtitle",
  TRACKTOTAL: "totaltracks",
  DISCTOTAL: "totaldiscs",
  COMPILATION: "compilation",
  RATING: "rating",
  BPM: "bpm",
  KEY: "key",
  MOOD: "mood",
  MEDIA: "media",
  CATALOGNUMBER: "catalognumber",
  RELEASESTATUS: "releasestatus",
  RELEASETYPE: "releasetype",
  RELEASECOUNTRY: "releasecountry",
  SCRIPT: "script",
  LANGUAGE: "language",
  COPYRIGHT: "copyright",
  LICENSE: "license",
  ENCODEDBY: "encodedby",
  ENCODERSETTINGS: "encodersettings",
  BARCODE: "barcode",
  ISRC: "isrc",
  ASIN: "asin",
  MUSICBRAINZ_TRACKID: "musicbrainz_recordingid",
  MUSICBRAINZ_RELEASETRACKID: "musicbrainz_trackid",
  MUSICBRAINZ_ALBUMID: "musicbrainz_albumid",
  MUSICBRAINZ_ARTISTID: "musicbrainz_artistid",
  MUSICBRAINZ_ALBUMARTISTID: "musicbrainz_albumartistid",
  MUSICBRAINZ_RELEASEGROUPID: "musicbrainz_releasegroupid",
  MUSICBRAINZ_WORKID: "musicbrainz_workid",
  MUSICBRAINZ_TRMID: "musicbrainz_trmid",
  MUSICBRAINZ_DISCID: "musicbrainz_discid",
  ACOUSTID_ID: "acoustid_id",
  ACOUSTID_ID_FINGERPRINT: "acoustid_fingerprint",
  MUSICIP_PUID: "musicip_puid",
  // 'FINGERPRINT=MusicMagic Fingerprint {fingerprint}': 'musicip_fingerprint', // ToDo
  WEBSITE: "website",
  NOTES: "notes",
  TOTALTRACKS: "totaltracks",
  TOTALDISCS: "totaldiscs",
  // Discogs
  DISCOGS_ARTIST_ID: "discogs_artist_id",
  DISCOGS_ARTISTS: "artists",
  DISCOGS_ARTIST_NAME: "artists",
  DISCOGS_ALBUM_ARTISTS: "albumartist",
  DISCOGS_CATALOG: "catalognumber",
  DISCOGS_COUNTRY: "releasecountry",
  DISCOGS_DATE: "originaldate",
  DISCOGS_LABEL: "label",
  DISCOGS_LABEL_ID: "discogs_label_id",
  DISCOGS_MASTER_RELEASE_ID: "discogs_master_release_id",
  DISCOGS_RATING: "discogs_rating",
  DISCOGS_RELEASED: "date",
  DISCOGS_RELEASE_ID: "discogs_release_id",
  DISCOGS_VOTES: "discogs_votes",
  CATALOGID: "catalognumber",
  STYLE: "genre",
  //
  REPLAYGAIN_TRACK_GAIN: "replaygain_track_gain",
  REPLAYGAIN_TRACK_PEAK: "replaygain_track_peak",
  REPLAYGAIN_ALBUM_GAIN: "replaygain_album_gain",
  REPLAYGAIN_ALBUM_PEAK: "replaygain_album_peak",
  // To Sure if these (REPLAYGAIN_MINMAX, REPLAYGAIN_ALBUM_MINMAX & REPLAYGAIN_UNDO) are used for Vorbis:
  REPLAYGAIN_MINMAX: "replaygain_track_minmax",
  REPLAYGAIN_ALBUM_MINMAX: "replaygain_album_minmax",
  REPLAYGAIN_UNDO: "replaygain_undo"
};
class Q extends I {
  static toRating(e, t, r) {
    return {
      source: e ? e.toLowerCase() : void 0,
      rating: Number.parseFloat(t) / r * I.maxRatingScore
    };
  }
  constructor() {
    super(["vorbis"], dr);
  }
  postMap(e) {
    if (e.id === "RATING")
      e.value = Q.toRating(void 0, e.value, 100);
    else if (e.id.indexOf("RATING:") === 0) {
      const t = e.id.split(":");
      e.value = Q.toRating(t[1], e.value, 1), e.id = t[0];
    }
  }
}
const hr = {
  IART: "artist",
  // Artist
  ICRD: "date",
  // DateCreated
  INAM: "title",
  // Title
  TITL: "title",
  IPRD: "album",
  // Product
  ITRK: "track",
  IPRT: "track",
  // Additional tag for track index
  COMM: "comment",
  // Comments
  ICMT: "comment",
  // Country
  ICNT: "releasecountry",
  GNRE: "genre",
  // Genre
  IWRI: "writer",
  // WrittenBy
  RATE: "rating",
  YEAR: "year",
  ISFT: "encodedby",
  // Software
  CODE: "encodedby",
  // EncodedBy
  TURL: "website",
  // URL,
  IGNR: "genre",
  // Genre
  IENG: "engineer",
  // Engineer
  ITCH: "technician",
  // Technician
  IMED: "media",
  // Original Media
  IRPD: "album"
  // Product, where the file was intended for
};
class xr extends I {
  constructor() {
    super(["exif"], hr);
  }
}
const gr = {
  "segment:title": "title",
  "album:ARTIST": "albumartist",
  "album:ARTISTSORT": "albumartistsort",
  "album:TITLE": "album",
  "album:DATE_RECORDED": "originaldate",
  "album:DATE_RELEASED": "releasedate",
  "album:PART_NUMBER": "disk",
  "album:TOTAL_PARTS": "totaltracks",
  "track:ARTIST": "artist",
  "track:ARTISTSORT": "artistsort",
  "track:TITLE": "title",
  "track:PART_NUMBER": "track",
  "track:MUSICBRAINZ_TRACKID": "musicbrainz_recordingid",
  "track:MUSICBRAINZ_ALBUMID": "musicbrainz_albumid",
  "track:MUSICBRAINZ_ARTISTID": "musicbrainz_artistid",
  "track:PUBLISHER": "label",
  "track:GENRE": "genre",
  "track:ENCODER": "encodedby",
  "track:ENCODER_OPTIONS": "encodersettings",
  "edition:TOTAL_PARTS": "totaldiscs",
  picture: "picture"
};
class wr extends N {
  constructor() {
    super(["matroska"], gr);
  }
}
const br = {
  NAME: "title",
  AUTH: "artist",
  "(c) ": "copyright",
  ANNO: "comment"
};
class Tr extends I {
  constructor() {
    super(["AIFF"], br);
  }
}
class yr {
  constructor() {
    this.tagMappers = {}, [
      new nr(),
      new lr(),
      new be(),
      new Le(),
      new Le(),
      new Q(),
      new mr(),
      new Te(),
      new xr(),
      new wr(),
      new Tr()
    ].forEach((e) => {
      this.registerTagMapper(e);
    });
  }
  /**
   * Convert native to generic (common) tags
   * @param tagType Originating tag format
   * @param tag     Native tag to map to a generic tag id
   * @param warnings
   * @return Generic tag result (output of this function)
   */
  mapTag(e, t, r) {
    if (this.tagMappers[e])
      return this.tagMappers[e].mapGenericTag(t, r);
    throw new ot(`No generic tag mapper defined for tag-format: ${e}`);
  }
  registerTagMapper(e) {
    for (const t of e.tagTypes)
      this.tagMappers[t] = e;
  }
}
function kr(i) {
  const e = i.split(`
`), t = [], r = /\[(\d{2}):(\d{2})\.(\d{2})\]/;
  for (const a of e) {
    const n = a.match(r);
    if (n) {
      const s = Number.parseInt(n[1], 10), u = Number.parseInt(n[2], 10), c = Number.parseInt(n[3], 10), p = (s * 60 + u) * 1e3 + c * 10, m = a.replace(r, "").trim();
      t.push({ timestamp: p, text: m });
    }
  }
  return {
    contentType: Z.lyrics,
    timeStampFormat: K.milliseconds,
    syncText: t
  };
}
const R = P("music-metadata:collector"), Ir = ["matroska", "APEv2", "vorbis", "ID3v2.4", "ID3v2.3", "ID3v2.2", "exif", "asf", "iTunes", "AIFF", "ID3v1"];
class vr {
  constructor(e) {
    this.opts = e, this.format = {
      tagTypes: [],
      trackInfo: []
    }, this.native = {}, this.common = {
      track: { no: null, of: null },
      disk: { no: null, of: null },
      movementIndex: { no: null, of: null }
    }, this.quality = {
      warnings: []
    }, this.commonOrigin = {}, this.originPriority = {}, this.tagMapper = new yr();
    let t = 1;
    for (const r of Ir)
      this.originPriority[r] = t++;
    this.originPriority.artificial = 500, this.originPriority.id3v1 = 600;
  }
  /**
   * @returns {boolean} true if one or more tags have been found
   */
  hasAny() {
    return Object.keys(this.native).length > 0;
  }
  addStreamInfo(e) {
    R(`streamInfo: type=${e.type ? pe[e.type] : "?"}, codec=${e.codecName}`), this.format.trackInfo.push(e);
  }
  setFormat(e, t) {
    var r;
    R(`format: ${e} = ${t}`), this.format[e] = t, (r = this.opts) != null && r.observer && this.opts.observer({ metadata: this, tag: { type: "format", id: e, value: t } });
  }
  async addTag(e, t, r) {
    R(`tag ${e}.${t} = ${r}`), this.native[e] || (this.format.tagTypes.push(e), this.native[e] = []), this.native[e].push({ id: t, value: r }), await this.toCommon(e, t, r);
  }
  addWarning(e) {
    this.quality.warnings.push({ message: e });
  }
  async postMap(e, t) {
    switch (t.id) {
      case "artist":
        if (this.commonOrigin.artist === this.originPriority[e])
          return this.postMap("artificial", { id: "artists", value: t.value });
        this.common.artists || this.setGenericTag("artificial", { id: "artists", value: t.value });
        break;
      case "artists":
        if ((!this.common.artist || this.commonOrigin.artist === this.originPriority.artificial) && (!this.common.artists || this.common.artists.indexOf(t.value) === -1)) {
          const r = (this.common.artists || []).concat([t.value]), n = { id: "artist", value: Sr(r) };
          this.setGenericTag("artificial", n);
        }
        break;
      case "picture":
        return this.postFixPicture(t.value).then((r) => {
          r !== null && (t.value = r, this.setGenericTag(e, t));
        });
      case "totaltracks":
        this.common.track.of = I.toIntOrNull(t.value);
        return;
      case "totaldiscs":
        this.common.disk.of = I.toIntOrNull(t.value);
        return;
      case "movementTotal":
        this.common.movementIndex.of = I.toIntOrNull(t.value);
        return;
      case "track":
      case "disk":
      case "movementIndex": {
        const r = this.common[t.id].of;
        this.common[t.id] = I.normalizeTrack(t.value), this.common[t.id].of = r ?? this.common[t.id].of;
        return;
      }
      case "bpm":
      case "year":
      case "originalyear":
        t.value = Number.parseInt(t.value, 10);
        break;
      case "date": {
        const r = Number.parseInt(t.value.substr(0, 4), 10);
        Number.isNaN(r) || (this.common.year = r);
        break;
      }
      case "discogs_label_id":
      case "discogs_release_id":
      case "discogs_master_release_id":
      case "discogs_artist_id":
      case "discogs_votes":
        t.value = typeof t.value == "string" ? Number.parseInt(t.value, 10) : t.value;
        break;
      case "replaygain_track_gain":
      case "replaygain_track_peak":
      case "replaygain_album_gain":
      case "replaygain_album_peak":
        t.value = Ji(t.value);
        break;
      case "replaygain_track_minmax":
        t.value = t.value.split(",").map((r) => Number.parseInt(r, 10));
        break;
      case "replaygain_undo": {
        const r = t.value.split(",").map((a) => Number.parseInt(a, 10));
        t.value = {
          leftChannel: r[0],
          rightChannel: r[1]
        };
        break;
      }
      case "gapless":
      case "compilation":
      case "podcast":
      case "showMovement":
        t.value = t.value === "1" || t.value === 1;
        break;
      case "isrc": {
        const r = this.common[t.id];
        if (r && r.indexOf(t.value) !== -1)
          return;
        break;
      }
      case "comment":
        typeof t.value == "string" && (t.value = { text: t.value }), t.value.descriptor === "iTunPGAP" && this.setGenericTag(e, { id: "gapless", value: t.value.text === "1" });
        break;
      case "lyrics":
        typeof t.value == "string" && (t.value = kr(t.value));
        break;
    }
    t.value !== null && this.setGenericTag(e, t);
  }
  /**
   * Convert native tags to common tags
   * @returns {IAudioMetadata} Native + common tags
   */
  toCommonMetadata() {
    return {
      format: this.format,
      native: this.native,
      quality: this.quality,
      common: this.common
    };
  }
  /**
   * Fix some common issues with picture object
   * @param picture Picture
   */
  async postFixPicture(e) {
    if (e.data && e.data.length > 0) {
      if (!e.format) {
        const t = await at(Uint8Array.from(e.data));
        if (t)
          e.format = t.mime;
        else
          return null;
      }
      switch (e.format = e.format.toLocaleLowerCase(), e.format) {
        case "image/jpg":
          e.format = "image/jpeg";
      }
      return e;
    }
    return this.addWarning("Empty picture tag found"), null;
  }
  /**
   * Convert native tag to common tags
   */
  async toCommon(e, t, r) {
    const a = { id: t, value: r }, n = this.tagMapper.mapTag(e, a, this);
    n && await this.postMap(e, n);
  }
  /**
   * Set generic tag
   */
  setGenericTag(e, t) {
    var n;
    R(`common.${t.id} = ${t.value}`);
    const r = this.commonOrigin[t.id] || 1e3, a = this.originPriority[e];
    if (ir(t.id))
      if (a <= r)
        this.common[t.id] = t.value, this.commonOrigin[t.id] = a;
      else
        return R(`Ignore native tag (singleton): ${e}.${t.id} = ${t.value}`);
    else if (a === r)
      !rr(t.id) || this.common[t.id].indexOf(t.value) === -1 ? this.common[t.id].push(t.value) : R(`Ignore duplicate value: ${e}.${t.id} = ${t.value}`);
    else if (a < r)
      this.common[t.id] = [t.value], this.commonOrigin[t.id] = a;
    else
      return R(`Ignore native tag (list): ${e}.${t.id} = ${t.value}`);
    (n = this.opts) != null && n.observer && this.opts.observer({ metadata: this, tag: { type: "common", id: t.id, value: t.value } });
  }
}
function Sr(i) {
  return i.length > 2 ? `${i.slice(0, i.length - 1).join(", ")} & ${i[i.length - 1]}` : i.join(" & ");
}
const Cr = {
  parserType: "mpeg",
  extensions: [".mp2", ".mp3", ".m2a", ".aac", "aacp"],
  async load(i, e, t) {
    return new (await import("./MpegParser-CCaeeevl.js")).MpegParser(i, e, t);
  }
}, Ar = {
  parserType: "apev2",
  extensions: [".ape"],
  async load(i, e, t) {
    return new (await Promise.resolve().then(() => $r)).APEv2Parser(i, e, t);
  }
}, Er = {
  parserType: "asf",
  extensions: [".asf"],
  async load(i, e, t) {
    return new (await import("./AsfParser-Dvjg9td6.js")).AsfParser(i, e, t);
  }
}, Rr = {
  parserType: "dsdiff",
  extensions: [".dff"],
  async load(i, e, t) {
    return new (await import("./DsdiffParser-DV8qVjbH.js")).DsdiffParser(i, e, t);
  }
}, _r = {
  parserType: "aiff",
  extensions: [".aif", "aiff", "aifc"],
  async load(i, e, t) {
    return new (await import("./AiffParser-D_wo3S8s.js")).AIFFParser(i, e, t);
  }
}, Br = {
  parserType: "dsf",
  extensions: [".dsf"],
  async load(i, e, t) {
    return new (await import("./DsfParser-DlcnTwDw.js")).DsfParser(i, e, t);
  }
}, Mr = {
  parserType: "flac",
  extensions: [".flac"],
  async load(i, e, t) {
    return new (await import("./FlacParser-vp2C_b36.js")).FlacParser(i, e, t);
  }
}, Fr = {
  parserType: "matroska",
  extensions: [".mka", ".mkv", ".mk3d", ".mks", "webm"],
  async load(i, e, t) {
    return new (await import("./MatroskaParser-DS2aSRUM.js")).MatroskaParser(i, e, t);
  }
}, Or = {
  parserType: "mp4",
  extensions: [".mp4", ".m4a", ".m4b", ".m4pa", "m4v", "m4r", "3gp"],
  async load(i, e, t) {
    return new (await import("./MP4Parser-CQL1KeYm.js")).MP4Parser(i, e, t);
  }
}, Dr = {
  parserType: "musepack",
  extensions: [".mpc"],
  async load(i, e, t) {
    return new (await import("./MusepackParser-DmjoxcCd.js")).MusepackParser(i, e, t);
  }
}, Lr = {
  parserType: "ogg",
  extensions: [".ogg", ".ogv", ".oga", ".ogm", ".ogx", ".opus", ".spx"],
  async load(i, e, t) {
    return new (await import("./OggParser-Bs6V5F43.js")).OggParser(i, e, t);
  }
}, Pr = {
  parserType: "wavpack",
  extensions: [".wv", ".wvp"],
  async load(i, e, t) {
    return new (await import("./WavPackParser-DgICcuyx.js")).WavPackParser(i, e, t);
  }
}, zr = {
  parserType: "riff",
  extensions: [".wav", "wave", ".bwf"],
  async load(i, e, t) {
    return new (await import("./WaveParser-BirQT1e5.js")).WaveParser(i, e, t);
  }
}, B = P("music-metadata:parser:factory");
function Nr(i) {
  const e = ge.parse(i), t = Ui(e.type);
  return {
    type: t.type,
    subtype: t.subtype,
    suffix: t.suffix,
    parameters: e.parameters
  };
}
class lt {
  constructor() {
    this.parsers = [], [
      Mr,
      Cr,
      Ar,
      Or,
      Fr,
      zr,
      Lr,
      Er,
      _r,
      Pr,
      Dr,
      Br,
      Rr
    ].forEach((e) => this.registerParser(e));
  }
  registerParser(e) {
    this.parsers.push(e);
  }
  async parse(e, t, r) {
    if (e.supportsRandomAccess() ? (B("tokenizer supports random-access, scanning for appending headers"), await ht(e, r)) : B("tokenizer does not support random-access, cannot scan for appending headers"), !t) {
      const s = new Uint8Array(4100);
      if (e.fileInfo.mimeType && (t = this.findLoaderForType(Pe(e.fileInfo.mimeType))), !t && e.fileInfo.path && (t = this.findLoaderForExtension(e.fileInfo.path)), !t) {
        B("Guess parser on content..."), await e.peekBuffer(s, { mayBeLess: !0 });
        const u = await at(s);
        if (!u || !u.mime)
          throw new $i("Failed to determine audio format");
        if (B(`Guessed file type is mime=${u.mime}, extension=${u.ext}`), t = this.findLoaderForType(Pe(u.mime)), !t)
          throw new ji(`Guessed MIME-type not supported: ${u.mime}`);
      }
    }
    B(`Loading ${t.parserType} parser...`);
    const a = new vr(r), n = await t.load(a, e, r ?? {});
    return B(`Parser ${t.parserType} loaded`), await n.parse(), a.toCommonMetadata();
  }
  /**
   * @param filePath - Path, filename or extension to audio file
   * @return Parser submodule name
   */
  findLoaderForExtension(e) {
    if (!e)
      return;
    const t = Ur(e).toLocaleLowerCase() || e;
    return this.parsers.find((r) => r.extensions.indexOf(t) !== -1);
  }
  findLoaderForType(e) {
    return e ? this.parsers.find((t) => t.parserType === e) : void 0;
  }
}
function Ur(i) {
  const e = i.lastIndexOf(".");
  return e === -1 ? "" : i.slice(e);
}
function Pe(i) {
  let e;
  if (!i)
    return;
  try {
    e = Nr(i);
  } catch {
    B(`Invalid HTTP Content-Type header value: ${i}`);
    return;
  }
  const t = e.subtype.indexOf("x-") === 0 ? e.subtype.substring(2) : e.subtype;
  switch (e.type) {
    case "audio":
      switch (t) {
        case "mp3":
        case "mpeg":
          return "mpeg";
        case "aac":
        case "aacp":
          return "mpeg";
        case "flac":
          return "flac";
        case "ape":
        case "monkeys-audio":
          return "apev2";
        case "mp4":
        case "m4a":
          return "mp4";
        case "ogg":
        case "opus":
        case "speex":
          return "ogg";
        case "ms-wma":
        case "ms-wmv":
        case "ms-asf":
          return "asf";
        case "aiff":
        case "aif":
        case "aifc":
          return "aiff";
        case "vnd.wave":
        case "wav":
        case "wave":
          return "riff";
        case "wavpack":
          return "wavpack";
        case "musepack":
          return "musepack";
        case "matroska":
        case "webm":
          return "matroska";
        case "dsf":
          return "dsf";
        case "amr":
          return "amr";
      }
      break;
    case "video":
      switch (t) {
        case "ms-asf":
        case "ms-wmv":
          return "asf";
        case "m4v":
        case "mp4":
          return "mp4";
        case "ogg":
          return "ogg";
        case "matroska":
        case "webm":
          return "matroska";
      }
      break;
    case "application":
      switch (t) {
        case "vnd.ms-asf":
          return "asf";
        case "ogg":
          return "ogg";
      }
      break;
  }
}
class ut {
  /**
   * Initialize parser with output (metadata), input (tokenizer) & parsing options (options).
   * @param {INativeMetadataCollector} metadata Output
   * @param {ITokenizer} tokenizer Input
   * @param {IOptions} options Parsing options
   */
  constructor(e, t, r) {
    this.metadata = e, this.tokenizer = t, this.options = r;
  }
}
const Xr = /^[\x21-\x7e©][\x20-\x7e\x00()]{3}/, mt = {
  len: 4,
  get: (i, e) => {
    const t = tt(i.slice(e, e + mt.len), "latin1");
    if (!t.match(Xr))
      throw new we(`FourCC contains invalid characters: ${Vi(t)} "${t}"`);
    return t;
  },
  put: (i, e, t) => {
    const r = ki(t);
    if (r.length !== 4)
      throw new ot("Invalid length");
    return i.set(r, e), e + 4;
  }
};
var O;
(function(i) {
  i[i.text_utf8 = 0] = "text_utf8", i[i.binary = 1] = "binary", i[i.external_info = 2] = "external_info", i[i.reserved = 3] = "reserved";
})(O || (O = {}));
const ze = {
  len: 52,
  get: (i, e) => ({
    // should equal 'MAC '
    ID: mt.get(i, e),
    // versionIndex number * 1000 (3.81 = 3810) (remember that 4-byte alignment causes this to take 4-bytes)
    version: g.get(i, e + 4) / 1e3,
    // the number of descriptor bytes (allows later expansion of this header)
    descriptorBytes: g.get(i, e + 8),
    // the number of header APE_HEADER bytes
    headerBytes: g.get(i, e + 12),
    // the number of header APE_HEADER bytes
    seekTableBytes: g.get(i, e + 16),
    // the number of header data bytes (from original file)
    headerDataBytes: g.get(i, e + 20),
    // the number of bytes of APE frame data
    apeFrameDataBytes: g.get(i, e + 24),
    // the high order number of APE frame data bytes
    apeFrameDataBytesHigh: g.get(i, e + 28),
    // the terminating data of the file (not including tag data)
    terminatingDataBytes: g.get(i, e + 32),
    // the MD5 hash of the file (see notes for usage... it's a little tricky)
    fileMD5: new Je(16).get(i, e + 36)
  })
}, Gr = {
  len: 24,
  get: (i, e) => ({
    // the compression level (see defines I.E. COMPRESSION_LEVEL_FAST)
    compressionLevel: C.get(i, e),
    // any format flags (for future use)
    formatFlags: C.get(i, e + 2),
    // the number of audio blocks in one frame
    blocksPerFrame: g.get(i, e + 4),
    // the number of audio blocks in the final frame
    finalFrameBlocks: g.get(i, e + 8),
    // the total number of frames
    totalFrames: g.get(i, e + 12),
    // the bits per sample (typically 16)
    bitsPerSample: C.get(i, e + 16),
    // the number of channels (1 or 2)
    channel: C.get(i, e + 18),
    // the sample rate (typically 44100)
    sampleRate: g.get(i, e + 20)
  })
}, v = {
  len: 32,
  get: (i, e) => ({
    // should equal 'APETAGEX'
    ID: new T(8, "ascii").get(i, e),
    // equals CURRENT_APE_TAG_VERSION
    version: g.get(i, e + 8),
    // the complete size of the tag, including this footer (excludes header)
    size: g.get(i, e + 12),
    // the number of fields in the tag
    fields: g.get(i, e + 16),
    // reserved for later use (must be zero),
    flags: pt(g.get(i, e + 20))
  })
}, ce = {
  len: 8,
  get: (i, e) => ({
    // Length of assigned value in bytes
    size: g.get(i, e),
    // reserved for later use (must be zero),
    flags: pt(g.get(i, e + 4))
  })
};
function pt(i) {
  return {
    containsHeader: W(i, 31),
    containsFooter: W(i, 30),
    isHeader: W(i, 29),
    readOnly: W(i, 0),
    dataType: (i & 6) >> 1
  };
}
function W(i, e) {
  return (i & 1 << e) !== 0;
}
const _ = P("music-metadata:parser:APEv2"), Ne = "APEv2", Ue = "APETAGEX";
class Y extends qi("APEv2") {
}
class A extends ut {
  constructor() {
    super(...arguments), this.ape = {};
  }
  static tryParseApeHeader(e, t, r) {
    return new A(e, t, r).tryParseApeHeader();
  }
  /**
   * Calculate the media file duration
   * @param ah ApeHeader
   * @return {number} duration in seconds
   */
  static calculateDuration(e) {
    let t = e.totalFrames > 1 ? e.blocksPerFrame * (e.totalFrames - 1) : 0;
    return t += e.finalFrameBlocks, t / e.sampleRate;
  }
  /**
   * Calculates the APEv1 / APEv2 first field offset
   * @param tokenizer
   * @param offset
   */
  static async findApeFooterOffset(e, t) {
    const r = new Uint8Array(v.len), a = e.position;
    await e.readBuffer(r, { position: t - v.len }), e.setPosition(a);
    const n = v.get(r, 0);
    if (n.ID === "APETAGEX")
      return n.flags.isHeader ? _(`APE Header found at offset=${t - v.len}`) : (_(`APE Footer found at offset=${t - v.len}`), t -= n.size), { footer: n, offset: t };
  }
  static parseTagFooter(e, t, r) {
    const a = v.get(t, t.length - v.len);
    if (a.ID !== Ue)
      throw new Y("Unexpected APEv2 Footer ID preamble value");
    return le(t), new A(e, le(t), r).parseTags(a);
  }
  /**
   * Parse APEv1 / APEv2 header if header signature found
   */
  async tryParseApeHeader() {
    if (this.tokenizer.fileInfo.size && this.tokenizer.fileInfo.size - this.tokenizer.position < v.len) {
      _("No APEv2 header found, end-of-file reached");
      return;
    }
    const e = await this.tokenizer.peekToken(v);
    if (e.ID === Ue)
      return await this.tokenizer.ignore(v.len), this.parseTags(e);
    if (_(`APEv2 header not found at offset=${this.tokenizer.position}`), this.tokenizer.fileInfo.size) {
      const t = this.tokenizer.fileInfo.size - this.tokenizer.position, r = new Uint8Array(t);
      return await this.tokenizer.readBuffer(r), A.parseTagFooter(this.metadata, r, this.options);
    }
  }
  async parse() {
    const e = await this.tokenizer.readToken(ze);
    if (e.ID !== "MAC ")
      throw new Y("Unexpected descriptor ID");
    this.ape.descriptor = e;
    const t = e.descriptorBytes - ze.len, r = await (t > 0 ? this.parseDescriptorExpansion(t) : this.parseHeader());
    return await this.tokenizer.ignore(r.forwardBytes), this.tryParseApeHeader();
  }
  async parseTags(e) {
    const t = new Uint8Array(256);
    let r = e.size - v.len;
    _(`Parse APE tags at offset=${this.tokenizer.position}, size=${r}`);
    for (let a = 0; a < e.fields; a++) {
      if (r < ce.len) {
        this.metadata.addWarning(`APEv2 Tag-header: ${e.fields - a} items remaining, but no more tag data to read.`);
        break;
      }
      const n = await this.tokenizer.readToken(ce);
      r -= ce.len + n.size, await this.tokenizer.peekBuffer(t, { length: Math.min(t.length, r) });
      let s = Oe(t, 0, t.length);
      const u = await this.tokenizer.readToken(new T(s, "ascii"));
      switch (await this.tokenizer.ignore(1), r -= u.length + 1, n.flags.dataType) {
        case O.text_utf8: {
          const p = (await this.tokenizer.readToken(new T(n.size, "utf8"))).split(/\x00/g);
          await Promise.all(p.map((m) => this.metadata.addTag(Ne, u, m)));
          break;
        }
        case O.binary:
          if (this.options.skipCovers)
            await this.tokenizer.ignore(n.size);
          else {
            const c = new Uint8Array(n.size);
            await this.tokenizer.readBuffer(c), s = Oe(c, 0, c.length);
            const p = tt(c.slice(0, s)), m = c.slice(s + 1);
            await this.metadata.addTag(Ne, u, {
              description: p,
              data: m
            });
          }
          break;
        case O.external_info:
          _(`Ignore external info ${u}`), await this.tokenizer.ignore(n.size);
          break;
        case O.reserved:
          _(`Ignore external info ${u}`), this.metadata.addWarning(`APEv2 header declares a reserved datatype for "${u}"`), await this.tokenizer.ignore(n.size);
          break;
      }
    }
  }
  async parseDescriptorExpansion(e) {
    return await this.tokenizer.ignore(e), this.parseHeader();
  }
  async parseHeader() {
    const e = await this.tokenizer.readToken(Gr);
    if (this.metadata.setFormat("lossless", !0), this.metadata.setFormat("container", "Monkey's Audio"), this.metadata.setFormat("bitsPerSample", e.bitsPerSample), this.metadata.setFormat("sampleRate", e.sampleRate), this.metadata.setFormat("numberOfChannels", e.channel), this.metadata.setFormat("duration", A.calculateDuration(e)), !this.ape.descriptor)
      throw new Y("Missing APE descriptor");
    return {
      forwardBytes: this.ape.descriptor.seekTableBytes + this.ape.descriptor.headerDataBytes + this.ape.descriptor.apeFrameDataBytes + this.ape.descriptor.terminatingDataBytes
    };
  }
}
const $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APEv2Parser: A,
  ApeContentError: Y
}, Symbol.toStringTag, { value: "Module" })), q = P("music-metadata:parser:ID3v1"), Xe = [
  "Blues",
  "Classic Rock",
  "Country",
  "Dance",
  "Disco",
  "Funk",
  "Grunge",
  "Hip-Hop",
  "Jazz",
  "Metal",
  "New Age",
  "Oldies",
  "Other",
  "Pop",
  "R&B",
  "Rap",
  "Reggae",
  "Rock",
  "Techno",
  "Industrial",
  "Alternative",
  "Ska",
  "Death Metal",
  "Pranks",
  "Soundtrack",
  "Euro-Techno",
  "Ambient",
  "Trip-Hop",
  "Vocal",
  "Jazz+Funk",
  "Fusion",
  "Trance",
  "Classical",
  "Instrumental",
  "Acid",
  "House",
  "Game",
  "Sound Clip",
  "Gospel",
  "Noise",
  "Alt. Rock",
  "Bass",
  "Soul",
  "Punk",
  "Space",
  "Meditative",
  "Instrumental Pop",
  "Instrumental Rock",
  "Ethnic",
  "Gothic",
  "Darkwave",
  "Techno-Industrial",
  "Electronic",
  "Pop-Folk",
  "Eurodance",
  "Dream",
  "Southern Rock",
  "Comedy",
  "Cult",
  "Gangsta Rap",
  "Top 40",
  "Christian Rap",
  "Pop/Funk",
  "Jungle",
  "Native American",
  "Cabaret",
  "New Wave",
  "Psychedelic",
  "Rave",
  "Showtunes",
  "Trailer",
  "Lo-Fi",
  "Tribal",
  "Acid Punk",
  "Acid Jazz",
  "Polka",
  "Retro",
  "Musical",
  "Rock & Roll",
  "Hard Rock",
  "Folk",
  "Folk/Rock",
  "National Folk",
  "Swing",
  "Fast-Fusion",
  "Bebob",
  "Latin",
  "Revival",
  "Celtic",
  "Bluegrass",
  "Avantgarde",
  "Gothic Rock",
  "Progressive Rock",
  "Psychedelic Rock",
  "Symphonic Rock",
  "Slow Rock",
  "Big Band",
  "Chorus",
  "Easy Listening",
  "Acoustic",
  "Humour",
  "Speech",
  "Chanson",
  "Opera",
  "Chamber Music",
  "Sonata",
  "Symphony",
  "Booty Bass",
  "Primus",
  "Porn Groove",
  "Satire",
  "Slow Jam",
  "Club",
  "Tango",
  "Samba",
  "Folklore",
  "Ballad",
  "Power Ballad",
  "Rhythmic Soul",
  "Freestyle",
  "Duet",
  "Punk Rock",
  "Drum Solo",
  "A Cappella",
  "Euro-House",
  "Dance Hall",
  "Goa",
  "Drum & Bass",
  "Club-House",
  "Hardcore",
  "Terror",
  "Indie",
  "BritPop",
  "Negerpunk",
  "Polsk Punk",
  "Beat",
  "Christian Gangsta Rap",
  "Heavy Metal",
  "Black Metal",
  "Crossover",
  "Contemporary Christian",
  "Christian Rock",
  "Merengue",
  "Salsa",
  "Thrash Metal",
  "Anime",
  "JPop",
  "Synthpop",
  "Abstract",
  "Art Rock",
  "Baroque",
  "Bhangra",
  "Big Beat",
  "Breakbeat",
  "Chillout",
  "Downtempo",
  "Dub",
  "EBM",
  "Eclectic",
  "Electro",
  "Electroclash",
  "Emo",
  "Experimental",
  "Garage",
  "Global",
  "IDM",
  "Illbient",
  "Industro-Goth",
  "Jam Band",
  "Krautrock",
  "Leftfield",
  "Lounge",
  "Math Rock",
  "New Romantic",
  "Nu-Breakz",
  "Post-Punk",
  "Post-Rock",
  "Psytrance",
  "Shoegaze",
  "Space Rock",
  "Trop Rock",
  "World Music",
  "Neoclassical",
  "Audiobook",
  "Audio Theatre",
  "Neue Deutsche Welle",
  "Podcast",
  "Indie Rock",
  "G-Funk",
  "Dubstep",
  "Garage Rock",
  "Psybient"
], H = {
  len: 128,
  /**
   * @param buf Buffer possibly holding the 128 bytes ID3v1.1 metadata header
   * @param off Offset in buffer in bytes
   * @returns ID3v1.1 header if first 3 bytes equals 'TAG', otherwise null is returned
   */
  get: (i, e) => {
    const t = new F(3).get(i, e);
    return t === "TAG" ? {
      header: t,
      title: new F(30).get(i, e + 3),
      artist: new F(30).get(i, e + 33),
      album: new F(30).get(i, e + 63),
      year: new F(4).get(i, e + 93),
      comment: new F(28).get(i, e + 97),
      // ID3v1.1 separator for track
      zeroByte: M.get(i, e + 127),
      // track: ID3v1.1 field added by Michael Mutschler
      track: M.get(i, e + 126),
      genre: M.get(i, e + 127)
    } : null;
  }
};
class F {
  constructor(e) {
    this.len = e, this.stringType = new T(e, "latin1");
  }
  get(e, t) {
    let r = this.stringType.get(e, t);
    return r = Hi(r), r = r.trim(), r.length > 0 ? r : void 0;
  }
}
class ft extends ut {
  constructor(e, t, r) {
    super(e, t, r), this.apeHeader = r.apeHeader;
  }
  static getGenre(e) {
    if (e < Xe.length)
      return Xe[e];
  }
  async parse() {
    if (!this.tokenizer.fileInfo.size) {
      q("Skip checking for ID3v1 because the file-size is unknown");
      return;
    }
    this.apeHeader && (this.tokenizer.ignore(this.apeHeader.offset - this.tokenizer.position), await new A(this.metadata, this.tokenizer, this.options).parseTags(this.apeHeader.footer));
    const e = this.tokenizer.fileInfo.size - H.len;
    if (this.tokenizer.position > e) {
      q("Already consumed the last 128 bytes");
      return;
    }
    const t = await this.tokenizer.readToken(H, e);
    if (t) {
      q("ID3v1 header found at: pos=%s", this.tokenizer.fileInfo.size - H.len);
      const r = ["title", "artist", "album", "comment", "track", "year"];
      for (const n of r)
        t[n] && t[n] !== "" && await this.addTag(n, t[n]);
      const a = ft.getGenre(t.genre);
      a && await this.addTag("genre", a);
    } else
      q("ID3v1 header not found at: pos=%s", this.tokenizer.fileInfo.size - H.len);
  }
  async addTag(e, t) {
    await this.metadata.addTag("ID3v1", e, t);
  }
}
async function jr(i) {
  if (i.fileInfo.size >= 128) {
    const e = new Uint8Array(3), t = i.position;
    return await i.readBuffer(e, { position: i.fileInfo.size - 128 }), i.setPosition(t), new TextDecoder("latin1").decode(e) === "TAG";
  }
  return !1;
}
const Wr = "LYRICS200";
async function qr(i) {
  const e = i.fileInfo.size;
  if (e >= 143) {
    const t = new Uint8Array(15), r = i.position;
    await i.readBuffer(t, { position: e - 143 }), i.setPosition(r);
    const a = new TextDecoder("latin1").decode(t);
    if (a.slice(6) === Wr)
      return Number.parseInt(a.slice(0, 6), 10) + 15;
  }
  return 0;
}
async function Hr(i, e = {}) {
  const t = { mimeType: i.type, size: i.size };
  return i instanceof File && (t.path = i.name), dt(i.stream(), t, e);
}
async function dt(i, e, t = {}) {
  const r = Ft(i, { fileInfo: typeof e == "string" ? { mimeType: e } : e });
  try {
    return await ie(r, t);
  } finally {
    await r.close();
  }
}
async function Yr(i, e, t = {}) {
  const r = le(i, { fileInfo: typeof e == "string" ? { mimeType: e } : e });
  return ie(r, t);
}
function ie(i, e) {
  return new lt().parse(i, void 0, e);
}
function Vr(i) {
  const e = {};
  for (const { id: t, value: r } of i)
    e[t] || (e[t] = []), e[t].push(r);
  return e;
}
function Zr(i) {
  return i === void 0 ? 0 : 1 + Math.round(i * 4);
}
function Kr(i) {
  return i ? i.reduce((e, t) => t.name && t.name.toLowerCase() in ["front", "cover", "cover (front)"] ? t : e) : null;
}
async function ht(i, e = {}) {
  let t = i.fileInfo.size;
  if (await jr(i)) {
    t -= 128;
    const r = await qr(i);
    t -= r;
  }
  e.apeHeader = await A.findApeFooterOffset(i, t);
}
const Ge = P("music-metadata:parser");
async function Jr(i, e, t = {}) {
  const r = await Ot(i, { fileInfo: typeof e == "string" ? { mimeType: e } : e });
  try {
    return await ie(r, t);
  } finally {
    await r.close();
  }
}
async function Qr(i, e = {}) {
  Ge(`parseFile: ${i}`);
  const t = await Dt(i), r = new lt();
  try {
    const a = r.findLoaderForExtension(i);
    return a || Ge(" Parser could not be determined by file extension"), await r.parse(t, a, e);
  } finally {
    await t.close();
  }
}
const ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get LyricsContentType() {
    return Z;
  },
  get TimestampFormat() {
    return K;
  },
  orderTags: Vr,
  parseBlob: Hr,
  parseBuffer: Yr,
  parseFile: Qr,
  parseFromTokenizer: ie,
  parseStream: Jr,
  parseWebStream: dt,
  ratingToStars: Zr,
  scanAppendingHeaders: ht,
  selectCover: Kr
}, Symbol.toStringTag, { value: "Module" }));
export {
  De as A,
  ut as B,
  me as C,
  pa as D,
  y as E,
  mt as F,
  tt as G,
  Xe as H,
  Zt as I,
  A as J,
  wa as K,
  ft as L,
  Hi as M,
  Ye as N,
  er as O,
  Oe as P,
  tr as Q,
  Ta as R,
  T as S,
  pe as T,
  V as U,
  ba as V,
  Qi as W,
  ya as X,
  L as a,
  M as b,
  P as c,
  Je as d,
  fe as e,
  g as f,
  ct as g,
  da as h,
  ga as i,
  Ke as j,
  C as k,
  D as l,
  qi as m,
  ri as n,
  le as o,
  ti as p,
  ei as q,
  Ve as r,
  xa as s,
  ci as t,
  fa as u,
  si as v,
  ii as w,
  Fe as x,
  Ze as y,
  Qt as z
};
