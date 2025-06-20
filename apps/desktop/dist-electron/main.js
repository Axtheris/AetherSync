import Gu, { app as yr, BrowserWindow as Pc, ipcMain as ze, dialog as Hu, shell as Nc } from "electron";
import { createRequire as Bu } from "node:module";
import { fileURLToPath as Wu } from "node:url";
import Ne from "node:path";
import ut from "node:fs";
import sr from "path";
import Oc from "util";
import ta from "fs";
import Ju from "crypto";
import Xu from "assert";
import Yu from "events";
import Qu from "os";
import { promisify as Zu } from "node:util";
var on = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function xu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var js = { exports: {} }, ed = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Kt = ed, td = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), rd = (e) => !e.some((t) => td.has(t));
function cn(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return rd(r) ? r : [];
}
var nd = {
  get(e, t, r) {
    if (!Kt(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = cn(t);
    if (n.length !== 0) {
      for (let s = 0; s < n.length; s++)
        if (e = e[n[s]], e == null) {
          if (s !== n.length - 1)
            return r;
          break;
        }
      return e === void 0 ? r : e;
    }
  },
  set(e, t, r) {
    if (!Kt(e) || typeof t != "string")
      return e;
    const n = e, s = cn(t);
    for (let a = 0; a < s.length; a++) {
      const o = s[a];
      Kt(e[o]) || (e[o] = {}), a === s.length - 1 && (e[o] = r), e = e[o];
    }
    return n;
  },
  delete(e, t) {
    if (!Kt(e) || typeof t != "string")
      return !1;
    const r = cn(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !Kt(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Kt(e) || typeof t != "string")
      return !1;
    const r = cn(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Kt(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, ra = { exports: {} }, na = { exports: {} }, sa = { exports: {} }, aa = { exports: {} };
const Rc = ta;
aa.exports = (e) => new Promise((t) => {
  Rc.access(e, (r) => {
    t(!r);
  });
});
aa.exports.sync = (e) => {
  try {
    return Rc.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var sd = aa.exports, oa = { exports: {} }, ia = { exports: {} };
const Tc = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
ia.exports = Tc;
ia.exports.default = Tc;
var ad = ia.exports;
const od = ad, Ic = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (l, c, ...d) => {
    r++;
    const u = od(l, ...d);
    c(u), u.then(n, n);
  }, a = (l, c, ...d) => {
    r < e ? s(l, c, ...d) : t.push(s.bind(null, l, c, ...d));
  }, o = (l, ...c) => new Promise((d) => a(l, d, ...c));
  return Object.defineProperties(o, {
    activeCount: {
      get: () => r
    },
    pendingCount: {
      get: () => t.length
    },
    clearQueue: {
      value: () => {
        t.length = 0;
      }
    }
  }), o;
};
oa.exports = Ic;
oa.exports.default = Ic;
var id = oa.exports;
const si = id;
class jc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const cd = (e, t) => Promise.resolve(e).then(t), ld = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new jc(t[0])));
var ud = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = si(r.concurrency), s = [...e].map((o) => [o, n(cd, o, t)]), a = si(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((o) => a(ld, o))).then(() => {
  }).catch((o) => o instanceof jc ? o.value : Promise.reject(o));
};
const Ac = sr, kc = sd, dd = ud;
sa.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), dd(e, (r) => kc(Ac.resolve(t.cwd, r)), t));
sa.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (kc.sync(Ac.resolve(t.cwd, r)))
      return r;
};
var fd = sa.exports;
const St = sr, Cc = fd;
na.exports = (e, t = {}) => {
  const r = St.resolve(t.cwd || ""), { root: n } = St.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function o(l) {
      Cc(s, { cwd: l }).then((c) => {
        c ? a(St.join(l, c)) : l === n ? a(null) : o(St.dirname(l));
      });
    })(r);
  });
};
na.exports.sync = (e, t = {}) => {
  let r = St.resolve(t.cwd || "");
  const { root: n } = St.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = Cc.sync(s, { cwd: r });
    if (a)
      return St.join(r, a);
    if (r === n)
      return null;
    r = St.dirname(r);
  }
};
var hd = na.exports;
const Dc = hd;
ra.exports = async ({ cwd: e } = {}) => Dc("package.json", { cwd: e });
ra.exports.sync = ({ cwd: e } = {}) => Dc.sync("package.json", { cwd: e });
var md = ra.exports, ca = { exports: {} };
const pe = sr, Mc = Qu, Et = Mc.homedir(), la = Mc.tmpdir(), { env: fr } = process, pd = (e) => {
  const t = pe.join(Et, "Library");
  return {
    data: pe.join(t, "Application Support", e),
    config: pe.join(t, "Preferences", e),
    cache: pe.join(t, "Caches", e),
    log: pe.join(t, "Logs", e),
    temp: pe.join(la, e)
  };
}, $d = (e) => {
  const t = fr.APPDATA || pe.join(Et, "AppData", "Roaming"), r = fr.LOCALAPPDATA || pe.join(Et, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: pe.join(r, e, "Data"),
    config: pe.join(t, e, "Config"),
    cache: pe.join(r, e, "Cache"),
    log: pe.join(r, e, "Log"),
    temp: pe.join(la, e)
  };
}, yd = (e) => {
  const t = pe.basename(Et);
  return {
    data: pe.join(fr.XDG_DATA_HOME || pe.join(Et, ".local", "share"), e),
    config: pe.join(fr.XDG_CONFIG_HOME || pe.join(Et, ".config"), e),
    cache: pe.join(fr.XDG_CACHE_HOME || pe.join(Et, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: pe.join(fr.XDG_STATE_HOME || pe.join(Et, ".local", "state"), e),
    temp: pe.join(la, t, e)
  };
}, Lc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? pd(e) : process.platform === "win32" ? $d(e) : yd(e);
};
ca.exports = Lc;
ca.exports.default = Lc;
var gd = ca.exports, ot = {}, oe = {};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.NOOP = oe.LIMIT_FILES_DESCRIPTORS = oe.LIMIT_BASENAME_LENGTH = oe.IS_USER_ROOT = oe.IS_POSIX = oe.DEFAULT_TIMEOUT_SYNC = oe.DEFAULT_TIMEOUT_ASYNC = oe.DEFAULT_WRITE_OPTIONS = oe.DEFAULT_READ_OPTIONS = oe.DEFAULT_FOLDER_MODE = oe.DEFAULT_FILE_MODE = oe.DEFAULT_ENCODING = void 0;
const _d = "utf8";
oe.DEFAULT_ENCODING = _d;
const vd = 438;
oe.DEFAULT_FILE_MODE = vd;
const wd = 511;
oe.DEFAULT_FOLDER_MODE = wd;
const Ed = {};
oe.DEFAULT_READ_OPTIONS = Ed;
const Sd = {};
oe.DEFAULT_WRITE_OPTIONS = Sd;
const bd = 5e3;
oe.DEFAULT_TIMEOUT_ASYNC = bd;
const Pd = 100;
oe.DEFAULT_TIMEOUT_SYNC = Pd;
const Nd = !!process.getuid;
oe.IS_POSIX = Nd;
const Od = process.getuid ? !process.getuid() : !1;
oe.IS_USER_ROOT = Od;
const Rd = 128;
oe.LIMIT_BASENAME_LENGTH = Rd;
const Td = 1e4;
oe.LIMIT_FILES_DESCRIPTORS = Td;
const Id = () => {
};
oe.NOOP = Id;
var Xn = {}, gr = {};
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.attemptifySync = gr.attemptifyAsync = void 0;
const Fc = oe, jd = (e, t = Fc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
gr.attemptifyAsync = jd;
const Ad = (e, t = Fc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
gr.attemptifySync = Ad;
var ua = {};
Object.defineProperty(ua, "__esModule", { value: !0 });
const kd = oe, Vc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !kd.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Vc.isChangeErrorOk(e))
      throw e;
  }
};
ua.default = Vc;
var _r = {}, da = {};
Object.defineProperty(da, "__esModule", { value: !0 });
const Cd = oe, ue = {
  interval: 25,
  intervalId: void 0,
  limit: Cd.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    ue.intervalId || (ue.intervalId = setInterval(ue.tick, ue.interval));
  },
  reset: () => {
    ue.intervalId && (clearInterval(ue.intervalId), delete ue.intervalId);
  },
  add: (e) => {
    ue.queueWaiting.add(e), ue.queueActive.size < ue.limit / 2 ? ue.tick() : ue.init();
  },
  remove: (e) => {
    ue.queueWaiting.delete(e), ue.queueActive.delete(e);
  },
  schedule: () => new Promise((e) => {
    const t = () => ue.remove(r), r = () => e(t);
    ue.add(r);
  }),
  tick: () => {
    if (!(ue.queueActive.size >= ue.limit)) {
      if (!ue.queueWaiting.size)
        return ue.reset();
      for (const e of ue.queueWaiting) {
        if (ue.queueActive.size >= ue.limit)
          break;
        ue.queueWaiting.delete(e), ue.queueActive.add(e), e();
      }
    }
  }
};
da.default = ue;
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.retryifySync = _r.retryifyAsync = void 0;
const Dd = da, Md = (e, t) => function(r) {
  return function n() {
    return Dd.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
      if (s(), Date.now() >= r)
        throw a;
      if (t(a)) {
        const o = Math.round(100 + 400 * Math.random());
        return new Promise((c) => setTimeout(c, o)).then(() => n.apply(void 0, arguments));
      }
      throw a;
    }));
  };
};
_r.retryifyAsync = Md;
const Ld = (e, t) => function(r) {
  return function n() {
    try {
      return e.apply(void 0, arguments);
    } catch (s) {
      if (Date.now() > r)
        throw s;
      if (t(s))
        return n.apply(void 0, arguments);
      throw s;
    }
  };
};
_r.retryifySync = Ld;
Object.defineProperty(Xn, "__esModule", { value: !0 });
const ie = ta, Ie = Oc, je = gr, ve = ua, De = _r, Fd = {
  chmodAttempt: je.attemptifyAsync(Ie.promisify(ie.chmod), ve.default.onChangeError),
  chownAttempt: je.attemptifyAsync(Ie.promisify(ie.chown), ve.default.onChangeError),
  closeAttempt: je.attemptifyAsync(Ie.promisify(ie.close)),
  fsyncAttempt: je.attemptifyAsync(Ie.promisify(ie.fsync)),
  mkdirAttempt: je.attemptifyAsync(Ie.promisify(ie.mkdir)),
  realpathAttempt: je.attemptifyAsync(Ie.promisify(ie.realpath)),
  statAttempt: je.attemptifyAsync(Ie.promisify(ie.stat)),
  unlinkAttempt: je.attemptifyAsync(Ie.promisify(ie.unlink)),
  closeRetry: De.retryifyAsync(Ie.promisify(ie.close), ve.default.isRetriableError),
  fsyncRetry: De.retryifyAsync(Ie.promisify(ie.fsync), ve.default.isRetriableError),
  openRetry: De.retryifyAsync(Ie.promisify(ie.open), ve.default.isRetriableError),
  readFileRetry: De.retryifyAsync(Ie.promisify(ie.readFile), ve.default.isRetriableError),
  renameRetry: De.retryifyAsync(Ie.promisify(ie.rename), ve.default.isRetriableError),
  statRetry: De.retryifyAsync(Ie.promisify(ie.stat), ve.default.isRetriableError),
  writeRetry: De.retryifyAsync(Ie.promisify(ie.write), ve.default.isRetriableError),
  chmodSyncAttempt: je.attemptifySync(ie.chmodSync, ve.default.onChangeError),
  chownSyncAttempt: je.attemptifySync(ie.chownSync, ve.default.onChangeError),
  closeSyncAttempt: je.attemptifySync(ie.closeSync),
  mkdirSyncAttempt: je.attemptifySync(ie.mkdirSync),
  realpathSyncAttempt: je.attemptifySync(ie.realpathSync),
  statSyncAttempt: je.attemptifySync(ie.statSync),
  unlinkSyncAttempt: je.attemptifySync(ie.unlinkSync),
  closeSyncRetry: De.retryifySync(ie.closeSync, ve.default.isRetriableError),
  fsyncSyncRetry: De.retryifySync(ie.fsyncSync, ve.default.isRetriableError),
  openSyncRetry: De.retryifySync(ie.openSync, ve.default.isRetriableError),
  readFileSyncRetry: De.retryifySync(ie.readFileSync, ve.default.isRetriableError),
  renameSyncRetry: De.retryifySync(ie.renameSync, ve.default.isRetriableError),
  statSyncRetry: De.retryifySync(ie.statSync, ve.default.isRetriableError),
  writeSyncRetry: De.retryifySync(ie.writeSync, ve.default.isRetriableError)
};
Xn.default = Fd;
var fa = {};
Object.defineProperty(fa, "__esModule", { value: !0 });
const Vd = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
fa.default = Vd;
var ha = {};
Object.defineProperty(ha, "__esModule", { value: !0 });
const ln = {}, As = {
  next: (e) => {
    const t = ln[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => As.next(e)) : delete ln[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = ln[e];
    r || (r = ln[e] = []), r.push(t), !(r.length > 1) && t(() => As.next(e));
  })
};
ha.default = As;
var ma = {};
Object.defineProperty(ma, "__esModule", { value: !0 });
const zd = sr, ai = oe, oi = Xn, qe = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = qe.truncate(t(e));
    return n in qe.store ? qe.get(e, t, r) : (qe.store[n] = r, [n, () => delete qe.store[n]]);
  },
  purge: (e) => {
    qe.store[e] && (delete qe.store[e], oi.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    qe.store[e] && (delete qe.store[e], oi.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in qe.store)
      qe.purgeSync(e);
  },
  truncate: (e) => {
    const t = zd.basename(e);
    if (t.length <= ai.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - ai.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", qe.purgeSyncAll);
ma.default = qe;
Object.defineProperty(ot, "__esModule", { value: !0 });
ot.writeFileSync = ot.writeFile = ot.readFileSync = ot.readFile = void 0;
const zc = sr, Se = oe, ae = Xn, Ke = fa, Ud = ha, bt = ma;
function Uc(e, t = Se.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ke.default.isString(t))
    return Uc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Se.DEFAULT_TIMEOUT_ASYNC);
  return ae.default.readFileRetry(n)(e, t);
}
ot.readFile = Uc;
function qc(e, t = Se.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ke.default.isString(t))
    return qc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Se.DEFAULT_TIMEOUT_SYNC);
  return ae.default.readFileSyncRetry(n)(e, t);
}
ot.readFileSync = qc;
const Kc = (e, t, r, n) => {
  if (Ke.default.isFunction(r))
    return Kc(e, t, Se.DEFAULT_WRITE_OPTIONS, r);
  const s = Gc(e, t, r);
  return n && s.then(n, n), s;
};
ot.writeFile = Kc;
const Gc = async (e, t, r = Se.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ke.default.isString(r))
    return Gc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Se.DEFAULT_TIMEOUT_ASYNC);
  let a = null, o = null, l = null, c = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), o = await Ud.default.schedule(e), e = await ae.default.realpathAttempt(e) || e, [c, l] = bt.default.get(e, r.tmpCreate || bt.default.create, r.tmpPurge !== !1);
    const u = Se.IS_POSIX && Ke.default.isUndefined(r.chown), h = Ke.default.isUndefined(r.mode);
    if (u || h) {
      const g = await ae.default.statAttempt(e);
      g && (r = { ...r }, u && (r.chown = { uid: g.uid, gid: g.gid }), h && (r.mode = g.mode));
    }
    const P = zc.dirname(e);
    await ae.default.mkdirAttempt(P, {
      mode: Se.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await ae.default.openRetry(s)(c, "w", r.mode || Se.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), Ke.default.isString(t) ? await ae.default.writeRetry(s)(d, t, 0, r.encoding || Se.DEFAULT_ENCODING) : Ke.default.isUndefined(t) || await ae.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await ae.default.fsyncRetry(s)(d) : ae.default.fsyncAttempt(d)), await ae.default.closeRetry(s)(d), d = null, r.chown && await ae.default.chownAttempt(c, r.chown.uid, r.chown.gid), r.mode && await ae.default.chmodAttempt(c, r.mode);
    try {
      await ae.default.renameRetry(s)(c, e);
    } catch (g) {
      if (g.code !== "ENAMETOOLONG")
        throw g;
      await ae.default.renameRetry(s)(c, bt.default.truncate(e));
    }
    l(), c = null;
  } finally {
    d && await ae.default.closeAttempt(d), c && bt.default.purge(c), a && a(), o && o();
  }
}, Hc = (e, t, r = Se.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ke.default.isString(r))
    return Hc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Se.DEFAULT_TIMEOUT_SYNC);
  let a = null, o = null, l = null;
  try {
    e = ae.default.realpathSyncAttempt(e) || e, [o, a] = bt.default.get(e, r.tmpCreate || bt.default.create, r.tmpPurge !== !1);
    const c = Se.IS_POSIX && Ke.default.isUndefined(r.chown), d = Ke.default.isUndefined(r.mode);
    if (c || d) {
      const h = ae.default.statSyncAttempt(e);
      h && (r = { ...r }, c && (r.chown = { uid: h.uid, gid: h.gid }), d && (r.mode = h.mode));
    }
    const u = zc.dirname(e);
    ae.default.mkdirSyncAttempt(u, {
      mode: Se.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), l = ae.default.openSyncRetry(s)(o, "w", r.mode || Se.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(o), Ke.default.isString(t) ? ae.default.writeSyncRetry(s)(l, t, 0, r.encoding || Se.DEFAULT_ENCODING) : Ke.default.isUndefined(t) || ae.default.writeSyncRetry(s)(l, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? ae.default.fsyncSyncRetry(s)(l) : ae.default.fsyncAttempt(l)), ae.default.closeSyncRetry(s)(l), l = null, r.chown && ae.default.chownSyncAttempt(o, r.chown.uid, r.chown.gid), r.mode && ae.default.chmodSyncAttempt(o, r.mode);
    try {
      ae.default.renameSyncRetry(s)(o, e);
    } catch (h) {
      if (h.code !== "ENAMETOOLONG")
        throw h;
      ae.default.renameSyncRetry(s)(o, bt.default.truncate(e));
    }
    a(), o = null;
  } finally {
    l && ae.default.closeSyncAttempt(l), o && bt.default.purge(o);
  }
};
ot.writeFileSync = Hc;
var ks = { exports: {} }, Bc = {}, xe = {}, vr = {}, xr = {}, te = {}, Qr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(m, ...w) {
    const N = [m[0]];
    let R = 0;
    for (; R < w.length; )
      l(N, w[R]), N.push(m[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function o(m, ...w) {
    const N = [g(m[0])];
    let R = 0;
    for (; R < w.length; )
      N.push(a), l(N, w[R]), N.push(a, g(m[++R]));
    return c(N), new n(N);
  }
  e.str = o;
  function l(m, w) {
    w instanceof n ? m.push(...w._items) : w instanceof r ? m.push(w) : m.push(h(w));
  }
  e.addCodeArg = l;
  function c(m) {
    let w = 1;
    for (; w < m.length - 1; ) {
      if (m[w] === a) {
        const N = d(m[w - 1], m[w + 1]);
        if (N !== void 0) {
          m.splice(w - 1, 3, N);
          continue;
        }
        m[w++] = "+";
      }
      w++;
    }
  }
  function d(m, w) {
    if (w === '""')
      return m;
    if (m === '""')
      return w;
    if (typeof m == "string")
      return w instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${m.slice(0, -1)}${w}"` : w[0] === '"' ? m.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(m instanceof r))
      return `"${m}${w.slice(1)}`;
  }
  function u(m, w) {
    return w.emptyStr() ? m : m.emptyStr() ? w : o`${m}${w}`;
  }
  e.strConcat = u;
  function h(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : g(Array.isArray(m) ? m.join(",") : m);
  }
  function P(m) {
    return new n(g(m));
  }
  e.stringify = P;
  function g(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = g;
  function E(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  e.getProperty = E;
  function _(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = _;
  function y(m) {
    return new n(m.toString());
  }
  e.regexpCode = y;
})(Qr);
var Cs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Qr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: u } = {}) {
      this._names = {}, this._prefixes = d, this._parent = u;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const u = this._names[d] || this._nameGroup(d);
      return `${d}${u.index++}`;
    }
    _nameGroup(d) {
      var u, h;
      if (!((h = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, u) {
      super(u), this.prefix = d;
    }
    setValue(d, { property: u, itemIndex: h }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${h}]`;
    }
  }
  e.ValueScopeName = a;
  const o = (0, t._)`\n`;
  class l extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, u) {
      var h;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: g } = P, E = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let _ = this._values[g];
      if (_) {
        const w = _.get(E);
        if (w)
          return w;
      } else
        _ = this._values[g] = /* @__PURE__ */ new Map();
      _.set(E, P);
      const y = this._scope[g] || (this._scope[g] = []), m = y.length;
      return y[m] = u.ref, P.setValue(u, { property: g, itemIndex: m }), P;
    }
    getValue(d, u) {
      const h = this._values[d];
      if (h)
        return h.get(u);
    }
    scopeRefs(d, u = this._values) {
      return this._reduceValues(u, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${d}${h.scopePath}`;
      });
    }
    scopeCode(d = this._values, u, h) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, u, h);
    }
    _reduceValues(d, u, h = {}, P) {
      let g = t.nil;
      for (const E in d) {
        const _ = d[E];
        if (!_)
          continue;
        const y = h[E] = h[E] || /* @__PURE__ */ new Map();
        _.forEach((m) => {
          if (y.has(m))
            return;
          y.set(m, n.Started);
          let w = u(m);
          if (w) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            g = (0, t._)`${g}${N} ${m} = ${w};${this.opts._n}`;
          } else if (w = P == null ? void 0 : P(m))
            g = (0, t._)`${g}${w}${this.opts._n}`;
          else
            throw new r(m);
          y.set(m, n.Completed);
        });
      }
      return g;
    }
  }
  e.ValueScope = l;
})(Cs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Qr, r = Cs;
  var n = Qr;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = Cs;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(i, f) {
      return this;
    }
  }
  class o extends a {
    constructor(i, f, b) {
      super(), this.varKind = i, this.name = f, this.rhs = b;
    }
    render({ es5: i, _n: f }) {
      const b = i ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${j};` + f;
    }
    optimizeNames(i, f) {
      if (i[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, i, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends a {
    constructor(i, f, b) {
      super(), this.lhs = i, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: i }) {
      return `${this.lhs} = ${this.rhs};` + i;
    }
    optimizeNames(i, f) {
      if (!(this.lhs instanceof t.Name && !i[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, i, f), this;
    }
    get names() {
      const i = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return fe(i, this.rhs);
    }
  }
  class c extends l {
    constructor(i, f, b, j) {
      super(i, b, j), this.op = f;
    }
    render({ _n: i }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + i;
    }
  }
  class d extends a {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `${this.label}:` + i;
    }
  }
  class u extends a {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `break${this.label ? ` ${this.label}` : ""};` + i;
    }
  }
  class h extends a {
    constructor(i) {
      super(), this.error = i;
    }
    render({ _n: i }) {
      return `throw ${this.error};` + i;
    }
    get names() {
      return this.error.names;
    }
  }
  class P extends a {
    constructor(i) {
      super(), this.code = i;
    }
    render({ _n: i }) {
      return `${this.code};` + i;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(i, f) {
      return this.code = C(this.code, i, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class g extends a {
    constructor(i = []) {
      super(), this.nodes = i;
    }
    render(i) {
      return this.nodes.reduce((f, b) => f + b.render(i), "");
    }
    optimizeNodes() {
      const { nodes: i } = this;
      let f = i.length;
      for (; f--; ) {
        const b = i[f].optimizeNodes();
        Array.isArray(b) ? i.splice(f, 1, ...b) : b ? i[f] = b : i.splice(f, 1);
      }
      return i.length > 0 ? this : void 0;
    }
    optimizeNames(i, f) {
      const { nodes: b } = this;
      let j = b.length;
      for (; j--; ) {
        const A = b[j];
        A.optimizeNames(i, f) || (k(i, A.names), b.splice(j, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((i, f) => Q(i, f.names), {});
    }
  }
  class E extends g {
    render(i) {
      return "{" + i._n + super.render(i) + "}" + i._n;
    }
  }
  class _ extends g {
  }
  class y extends E {
  }
  y.kind = "else";
  class m extends E {
    constructor(i, f) {
      super(f), this.condition = i;
    }
    render(i) {
      let f = `if(${this.condition})` + super.render(i);
      return this.else && (f += "else " + this.else.render(i)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const i = this.condition;
      if (i === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new y(b) : b;
      }
      if (f)
        return i === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(z(i), f instanceof m ? [f] : f.nodes);
      if (!(i === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(i, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(i, f), !!(super.optimizeNames(i, f) || this.else))
        return this.condition = C(this.condition, i, f), this;
    }
    get names() {
      const i = super.names;
      return fe(i, this.condition), this.else && Q(i, this.else.names), i;
    }
  }
  m.kind = "if";
  class w extends E {
  }
  w.kind = "for";
  class N extends w {
    constructor(i) {
      super(), this.iteration = i;
    }
    render(i) {
      return `for(${this.iteration})` + super.render(i);
    }
    optimizeNames(i, f) {
      if (super.optimizeNames(i, f))
        return this.iteration = C(this.iteration, i, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends w {
    constructor(i, f, b, j) {
      super(), this.varKind = i, this.name = f, this.from = b, this.to = j;
    }
    render(i) {
      const f = i.es5 ? r.varKinds.var : this.varKind, { name: b, from: j, to: A } = this;
      return `for(${f} ${b}=${j}; ${b}<${A}; ${b}++)` + super.render(i);
    }
    get names() {
      const i = fe(super.names, this.from);
      return fe(i, this.to);
    }
  }
  class I extends w {
    constructor(i, f, b, j) {
      super(), this.loop = i, this.varKind = f, this.name = b, this.iterable = j;
    }
    render(i) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(i);
    }
    optimizeNames(i, f) {
      if (super.optimizeNames(i, f))
        return this.iterable = C(this.iterable, i, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class U extends E {
    constructor(i, f, b) {
      super(), this.name = i, this.args = f, this.async = b;
    }
    render(i) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(i);
    }
  }
  U.kind = "func";
  class B extends g {
    render(i) {
      return "return " + super.render(i);
    }
  }
  B.kind = "return";
  class de extends E {
    render(i) {
      let f = "try" + super.render(i);
      return this.catch && (f += this.catch.render(i)), this.finally && (f += this.finally.render(i)), f;
    }
    optimizeNodes() {
      var i, f;
      return super.optimizeNodes(), (i = this.catch) === null || i === void 0 || i.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(i, f) {
      var b, j;
      return super.optimizeNames(i, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(i, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(i, f), this;
    }
    get names() {
      const i = super.names;
      return this.catch && Q(i, this.catch.names), this.finally && Q(i, this.finally.names), i;
    }
  }
  class V extends E {
    constructor(i) {
      super(), this.error = i;
    }
    render(i) {
      return `catch(${this.error})` + super.render(i);
    }
  }
  V.kind = "catch";
  class H extends E {
    render(i) {
      return "finally" + super.render(i);
    }
  }
  H.kind = "finally";
  class se {
    constructor(i, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = i, this._scope = new r.Scope({ parent: i }), this._nodes = [new _()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(i) {
      return this._scope.name(i);
    }
    // reserves unique name in the external scope
    scopeName(i) {
      return this._extScope.name(i);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(i, f) {
      const b = this._extScope.value(i, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(i, f) {
      return this._extScope.getValue(i, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(i) {
      return this._extScope.scopeRefs(i, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(i, f, b, j) {
      const A = this._scope.toName(f);
      return b !== void 0 && j && (this._constants[A.str] = b), this._leafNode(new o(i, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(i, f, b) {
      return this._def(r.varKinds.const, i, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(i, f, b) {
      return this._def(r.varKinds.let, i, f, b);
    }
    // `var` declaration with optional assignment
    var(i, f, b) {
      return this._def(r.varKinds.var, i, f, b);
    }
    // assignment code
    assign(i, f, b) {
      return this._leafNode(new l(i, f, b));
    }
    // `+=` code
    add(i, f) {
      return this._leafNode(new c(i, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(i) {
      return typeof i == "function" ? i() : i !== t.nil && this._leafNode(new P(i)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...i) {
      const f = ["{"];
      for (const [b, j] of i)
        f.length > 1 && f.push(","), f.push(b), (b !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(i, f, b) {
      if (this._blockNode(new m(i)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(i) {
      return this._elseNode(new m(i));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, y);
    }
    _for(i, f) {
      return this._blockNode(i), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(i, f) {
      return this._for(new N(i), f);
    }
    // `for` statement for a range of values
    forRange(i, f, b, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(i);
      return this._for(new R(A, q, f, b), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(i, f, b, j = r.varKinds.const) {
      const A = this._scope.toName(i);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), b(A);
        });
      }
      return this._for(new I("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(i, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(i, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(i);
      return this._for(new I("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(i) {
      return this._leafNode(new d(i));
    }
    // `break` statement
    break(i) {
      return this._leafNode(new u(i));
    }
    // `return` statement
    return(i) {
      const f = new B();
      if (this._blockNode(f), this.code(i), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(B);
    }
    // `try` statement
    try(i, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new de();
      if (this._blockNode(j), this.code(i), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return b && (this._currNode = j.finally = new H(), this.code(b)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(i) {
      return this._leafNode(new h(i));
    }
    // start self-balancing block
    block(i, f) {
      return this._blockStarts.push(this._nodes.length), i && this.code(i).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(i) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || i !== void 0 && b !== i)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${i} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(i, f = t.nil, b, j) {
      return this._blockNode(new U(i, f, b)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(U);
    }
    optimize(i = 1) {
      for (; i-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(i) {
      return this._currNode.nodes.push(i), this;
    }
    _blockNode(i) {
      this._currNode.nodes.push(i), this._nodes.push(i);
    }
    _endBlockNode(i, f) {
      const b = this._currNode;
      if (b instanceof i || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${i.kind}/${f.kind}` : i.kind}"`);
    }
    _elseNode(i) {
      const f = this._currNode;
      if (!(f instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = i, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const i = this._nodes;
      return i[i.length - 1];
    }
    set _currNode(i) {
      const f = this._nodes;
      f[f.length - 1] = i;
    }
  }
  e.CodeGen = se;
  function Q($, i) {
    for (const f in i)
      $[f] = ($[f] || 0) + (i[f] || 0);
    return $;
  }
  function fe($, i) {
    return i instanceof t._CodeOrName ? Q($, i.names) : $;
  }
  function C($, i, f) {
    if ($ instanceof t.Name)
      return b($);
    if (!j($))
      return $;
    return new t._Code($._items.reduce((A, q) => (q instanceof t.Name && (q = b(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function b(A) {
      const q = f[A.str];
      return q === void 0 || i[A.str] !== 1 ? A : (delete i[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && i[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k($, i) {
    for (const f in i)
      $[f] = ($[f] || 0) - (i[f] || 0);
  }
  function z($) {
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${S($)}`;
  }
  e.not = z;
  const D = p(e.operators.AND);
  function O(...$) {
    return $.reduce(D);
  }
  e.and = O;
  const T = p(e.operators.OR);
  function v(...$) {
    return $.reduce(T);
  }
  e.or = v;
  function p($) {
    return (i, f) => i === t.nil ? f : f === t.nil ? i : (0, t._)`${S(i)} ${$} ${S(f)}`;
  }
  function S($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(te);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ce = te, qd = Qr;
function Kd(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = Kd;
function Gd(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Wc(e, t), !Jc(t, e.self.RULES.all));
}
M.alwaysValidSchema = Gd;
function Wc(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Qc(e, `unknown keyword: "${a}"`);
}
M.checkUnknownRules = Wc;
function Jc(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = Jc;
function Hd(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = Hd;
function Bd({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ce._)`${r}`;
  }
  return (0, ce._)`${e}${t}${(0, ce.getProperty)(n)}`;
}
M.schemaRefOrVal = Bd;
function Wd(e) {
  return Xc(decodeURIComponent(e));
}
M.unescapeFragment = Wd;
function Jd(e) {
  return encodeURIComponent(pa(e));
}
M.escapeFragment = Jd;
function pa(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = pa;
function Xc(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = Xc;
function Xd(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = Xd;
function ii({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, o, l) => {
    const c = o === void 0 ? a : o instanceof ce.Name ? (a instanceof ce.Name ? e(s, a, o) : t(s, a, o), o) : a instanceof ce.Name ? (t(s, o, a), a) : r(a, o);
    return l === ce.Name && !(c instanceof ce.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: ii({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ce._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ce._)`${r} || {}`).code((0, ce._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ce._)`${r} || {}`), $a(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Yc
  }),
  items: ii({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ce._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ce._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Yc(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ce._)`{}`);
  return t !== void 0 && $a(e, r, t), r;
}
M.evaluatedPropsToName = Yc;
function $a(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ce._)`${t}${(0, ce.getProperty)(n)}`, !0));
}
M.setEvaluated = $a;
const ci = {};
function Yd(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: ci[t.code] || (ci[t.code] = new qd._Code(t.code))
  });
}
M.useFunc = Yd;
var Ds;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Ds || (M.Type = Ds = {}));
function Qd(e, t, r) {
  if (e instanceof ce.Name) {
    const n = t === Ds.Num;
    return r ? n ? (0, ce._)`"[" + ${e} + "]"` : (0, ce._)`"['" + ${e} + "']"` : n ? (0, ce._)`"/" + ${e}` : (0, ce._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ce.getProperty)(e).toString() : "/" + pa(e);
}
M.getErrorPath = Qd;
function Qc(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = Qc;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
const Oe = te, Zd = {
  // validation function arguments
  data: new Oe.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Oe.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Oe.Name("instancePath"),
  parentData: new Oe.Name("parentData"),
  parentDataProperty: new Oe.Name("parentDataProperty"),
  rootData: new Oe.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Oe.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Oe.Name("vErrors"),
  // null or array of validation errors
  errors: new Oe.Name("errors"),
  // counter of validation errors
  this: new Oe.Name("this"),
  // "globals"
  self: new Oe.Name("self"),
  scope: new Oe.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Oe.Name("json"),
  jsonPos: new Oe.Name("jsonPos"),
  jsonLen: new Oe.Name("jsonLen"),
  jsonPart: new Oe.Name("jsonPart")
};
dt.default = Zd;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = M, n = dt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: m }) => m ? (0, t.str)`"${y}" keyword must be ${m} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, m = e.keywordError, w, N) {
    const { it: R } = y, { gen: I, compositeRule: U, allErrors: B } = R, de = h(y, m, w);
    N ?? (U || B) ? c(I, de) : d(R, (0, t._)`[${de}]`);
  }
  e.reportError = s;
  function a(y, m = e.keywordError, w) {
    const { it: N } = y, { gen: R, compositeRule: I, allErrors: U } = N, B = h(y, m, w);
    c(R, B), I || U || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function o(y, m) {
    y.assign(n.default.errors, m), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(m, () => y.assign((0, t._)`${n.default.vErrors}.length`, m), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function l({ gen: y, keyword: m, schemaValue: w, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const U = y.name("err");
    y.forRange("i", R, n.default.errors, (B) => {
      y.const(U, (0, t._)`${n.default.vErrors}[${B}]`), y.if((0, t._)`${U}.instancePath === undefined`, () => y.assign((0, t._)`${U}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), y.assign((0, t._)`${U}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${m}`), I.opts.verbose && (y.assign((0, t._)`${U}.schema`, w), y.assign((0, t._)`${U}.data`, N));
    });
  }
  e.extendErrors = l;
  function c(y, m) {
    const w = y.const("err", m);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function d(y, m) {
    const { gen: w, validateName: N, schemaEnv: R } = y;
    R.$async ? w.throw((0, t._)`new ${y.ValidationError}(${m})`) : (w.assign((0, t._)`${N}.errors`, m), w.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function h(y, m, w) {
    const { createErrors: N } = y.it;
    return N === !1 ? (0, t._)`{}` : P(y, m, w);
  }
  function P(y, m, w = {}) {
    const { gen: N, it: R } = y, I = [
      g(R, w),
      E(y, w)
    ];
    return _(y, m, I), N.object(...I);
  }
  function g({ errorPath: y }, { instancePath: m }) {
    const w = m ? (0, t.str)`${y}${(0, r.getErrorPath)(m, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function E({ keyword: y, it: { errSchemaPath: m } }, { schemaPath: w, parentSchema: N }) {
    let R = N ? m : (0, t.str)`${m}/${y}`;
    return w && (R = (0, t.str)`${R}${(0, r.getErrorPath)(w, r.Type.Str)}`), [u.schemaPath, R];
  }
  function _(y, { params: m, message: w }, N) {
    const { keyword: R, data: I, schemaValue: U, it: B } = y, { opts: de, propertyName: V, topSchemaRef: H, schemaPath: se } = B;
    N.push([u.keyword, R], [u.params, typeof m == "function" ? m(y) : m || (0, t._)`{}`]), de.messages && N.push([u.message, typeof w == "function" ? w(y) : w]), de.verbose && N.push([u.schema, U], [u.parentSchema, (0, t._)`${H}${se}`], [n.default.data, I]), V && N.push([u.propertyName, V]);
  }
})(xr);
Object.defineProperty(vr, "__esModule", { value: !0 });
vr.boolOrEmptySchema = vr.topBoolOrEmptySchema = void 0;
const xd = xr, ef = te, tf = dt, rf = {
  message: "boolean schema is false"
};
function nf(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Zc(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(tf.default.data) : (t.assign((0, ef._)`${n}.errors`, null), t.return(!0));
}
vr.topBoolOrEmptySchema = nf;
function sf(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Zc(e)) : r.var(t, !0);
}
vr.boolOrEmptySchema = sf;
function Zc(e, t) {
  const { gen: r, data: n } = e, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, xd.reportError)(s, rf, void 0, t);
}
var ge = {}, xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.getRules = xt.isJSONType = void 0;
const af = ["string", "number", "integer", "boolean", "null", "object", "array"], of = new Set(af);
function cf(e) {
  return typeof e == "string" && of.has(e);
}
xt.isJSONType = cf;
function lf() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
xt.getRules = lf;
var ht = {};
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.shouldUseRule = ht.shouldUseGroup = ht.schemaHasRulesForType = void 0;
function uf({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && xc(e, n);
}
ht.schemaHasRulesForType = uf;
function xc(e, t) {
  return t.rules.some((r) => el(e, r));
}
ht.shouldUseGroup = xc;
function el(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
ht.shouldUseRule = el;
Object.defineProperty(ge, "__esModule", { value: !0 });
ge.reportTypeError = ge.checkDataTypes = ge.checkDataType = ge.coerceAndCheckDataType = ge.getJSONTypes = ge.getSchemaTypes = ge.DataType = void 0;
const df = xt, ff = ht, hf = xr, X = te, tl = M;
var hr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(hr || (ge.DataType = hr = {}));
function mf(e) {
  const t = rl(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
ge.getSchemaTypes = mf;
function rl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(df.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ge.getJSONTypes = rl;
function pf(e, t) {
  const { gen: r, data: n, opts: s } = e, a = $f(t, s.coerceTypes), o = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, ff.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const l = ya(t, n, s.strictNumbers, hr.Wrong);
    r.if(l, () => {
      a.length ? yf(e, t, a) : ga(e);
    });
  }
  return o;
}
ge.coerceAndCheckDataType = pf;
const nl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function $f(e, t) {
  return t ? e.filter((r) => nl.has(r) || t === "array" && r === "array") : [];
}
function yf(e, t, r) {
  const { gen: n, data: s, opts: a } = e, o = n.let("dataType", (0, X._)`typeof ${s}`), l = n.let("coerced", (0, X._)`undefined`);
  a.coerceTypes === "array" && n.if((0, X._)`${o} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, X._)`${s}[0]`).assign(o, (0, X._)`typeof ${s}`).if(ya(t, s, a.strictNumbers), () => n.assign(l, s))), n.if((0, X._)`${l} !== undefined`);
  for (const d of r)
    (nl.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), ga(e), n.endIf(), n.if((0, X._)`${l} !== undefined`, () => {
    n.assign(s, l), gf(e, l);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, X._)`${o} == "number" || ${o} == "boolean"`).assign(l, (0, X._)`"" + ${s}`).elseIf((0, X._)`${s} === null`).assign(l, (0, X._)`""`);
        return;
      case "number":
        n.elseIf((0, X._)`${o} == "boolean" || ${s} === null
              || (${o} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, X._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, X._)`${o} === "boolean" || ${s} === null
              || (${o} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, X._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, X._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, X._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, X._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, X._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${s} === null`).assign(l, (0, X._)`[${s}]`);
    }
  }
}
function gf({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, X._)`${t} !== undefined`, () => e.assign((0, X._)`${t}[${r}]`, n));
}
function Ms(e, t, r, n = hr.Correct) {
  const s = n === hr.Correct ? X.operators.EQ : X.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, X._)`${t} ${s} null`;
    case "array":
      a = (0, X._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, X._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = o((0, X._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = o();
      break;
    default:
      return (0, X._)`typeof ${t} ${s} ${e}`;
  }
  return n === hr.Correct ? a : (0, X.not)(a);
  function o(l = X.nil) {
    return (0, X.and)((0, X._)`typeof ${t} == "number"`, l, r ? (0, X._)`isFinite(${t})` : X.nil);
  }
}
ge.checkDataType = Ms;
function ya(e, t, r, n) {
  if (e.length === 1)
    return Ms(e[0], t, r, n);
  let s;
  const a = (0, tl.toHash)(e);
  if (a.array && a.object) {
    const o = (0, X._)`typeof ${t} != "object"`;
    s = a.null ? o : (0, X._)`!${t} || ${o}`, delete a.null, delete a.array, delete a.object;
  } else
    s = X.nil;
  a.number && delete a.integer;
  for (const o in a)
    s = (0, X.and)(s, Ms(o, t, r, n));
  return s;
}
ge.checkDataTypes = ya;
const _f = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, X._)`{type: ${e}}` : (0, X._)`{type: ${t}}`
};
function ga(e) {
  const t = vf(e);
  (0, hf.reportError)(t, _f);
}
ge.reportTypeError = ga;
function vf(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, tl.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var Yn = {};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.assignDefaults = void 0;
const ar = te, wf = M;
function Ef(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      li(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => li(e, a, s.default));
}
Yn.assignDefaults = Ef;
function li(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: o } = e;
  if (r === void 0)
    return;
  const l = (0, ar._)`${a}${(0, ar.getProperty)(t)}`;
  if (s) {
    (0, wf.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, ar._)`${l} === undefined`;
  o.useDefaults === "empty" && (c = (0, ar._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, ar._)`${l} = ${(0, ar.stringify)(r)}`);
}
var it = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.validateUnion = x.validateArray = x.usePattern = x.callValidateCode = x.schemaProperties = x.allSchemaProperties = x.noPropertyInData = x.propertyInData = x.isOwnProperty = x.hasPropFunc = x.reportMissingProp = x.checkMissingProp = x.checkReportMissingProp = void 0;
const he = te, _a = M, gt = dt, Sf = M;
function bf(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(wa(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, he._)`${t}` }, !0), e.error();
  });
}
x.checkReportMissingProp = bf;
function Pf({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, he.or)(...n.map((a) => (0, he.and)(wa(e, t, a, r.ownProperties), (0, he._)`${s} = ${a}`)));
}
x.checkMissingProp = Pf;
function Nf(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
x.reportMissingProp = Nf;
function sl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, he._)`Object.prototype.hasOwnProperty`
  });
}
x.hasPropFunc = sl;
function va(e, t, r) {
  return (0, he._)`${sl(e)}.call(${t}, ${r})`;
}
x.isOwnProperty = va;
function Of(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} !== undefined`;
  return n ? (0, he._)`${s} && ${va(e, t, r)}` : s;
}
x.propertyInData = Of;
function wa(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} === undefined`;
  return n ? (0, he.or)(s, (0, he.not)(va(e, t, r))) : s;
}
x.noPropertyInData = wa;
function al(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
x.allSchemaProperties = al;
function Rf(e, t) {
  return al(t).filter((r) => !(0, _a.alwaysValidSchema)(e, t[r]));
}
x.schemaProperties = Rf;
function Tf({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: o }, l, c, d) {
  const u = d ? (0, he._)`${e}, ${t}, ${n}${s}` : t, h = [
    [gt.default.instancePath, (0, he.strConcat)(gt.default.instancePath, a)],
    [gt.default.parentData, o.parentData],
    [gt.default.parentDataProperty, o.parentDataProperty],
    [gt.default.rootData, gt.default.rootData]
  ];
  o.opts.dynamicRef && h.push([gt.default.dynamicAnchors, gt.default.dynamicAnchors]);
  const P = (0, he._)`${u}, ${r.object(...h)}`;
  return c !== he.nil ? (0, he._)`${l}.call(${c}, ${P})` : (0, he._)`${l}(${P})`;
}
x.callValidateCode = Tf;
const If = (0, he._)`new RegExp`;
function jf({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, he._)`${s.code === "new RegExp" ? If : (0, Sf.useFunc)(e, s)}(${r}, ${n})`
  });
}
x.usePattern = jf;
function Af(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return o(() => t.assign(l, !1)), l;
  }
  return t.var(a, !0), o(() => t.break()), a;
  function o(l) {
    const c = t.const("len", (0, he._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: _a.Type.Num
      }, a), t.if((0, he.not)(a), l);
    });
  }
}
x.validateArray = Af;
function kf(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, _a.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const o = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, l);
    t.assign(o, (0, he._)`${o} || ${l}`), e.mergeValidEvaluated(u, l) || t.if((0, he.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
x.validateUnion = kf;
Object.defineProperty(it, "__esModule", { value: !0 });
it.validateKeywordUsage = it.validSchemaType = it.funcKeywordCode = it.macroKeywordCode = void 0;
const Ae = te, Bt = dt, Cf = x, Df = xr;
function Mf(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: o } = e, l = t.macro.call(o.self, s, a, o), c = ol(r, n, l);
  o.opts.validateSchema !== !1 && o.self.validateSchema(l, !0);
  const d = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: Ae.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
it.macroKeywordCode = Mf;
function Lf(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: o, $data: l, it: c } = e;
  Vf(c, t);
  const d = !l && t.compile ? t.compile.call(c.self, a, o, c) : t.validate, u = ol(n, s, d), h = n.let("valid");
  e.block$data(h, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function P() {
    if (t.errors === !1)
      _(), t.modifying && ui(e), y(() => e.error());
    else {
      const m = t.async ? g() : E();
      t.modifying && ui(e), y(() => Ff(e, m));
    }
  }
  function g() {
    const m = n.let("ruleErrs", null);
    return n.try(() => _((0, Ae._)`await `), (w) => n.assign(h, !1).if((0, Ae._)`${w} instanceof ${c.ValidationError}`, () => n.assign(m, (0, Ae._)`${w}.errors`), () => n.throw(w))), m;
  }
  function E() {
    const m = (0, Ae._)`${u}.errors`;
    return n.assign(m, null), _(Ae.nil), m;
  }
  function _(m = t.async ? (0, Ae._)`await ` : Ae.nil) {
    const w = c.opts.passContext ? Bt.default.this : Bt.default.self, N = !("compile" in t && !l || t.schema === !1);
    n.assign(h, (0, Ae._)`${m}${(0, Cf.callValidateCode)(e, u, w, N)}`, t.modifying);
  }
  function y(m) {
    var w;
    n.if((0, Ae.not)((w = t.valid) !== null && w !== void 0 ? w : h), m);
  }
}
it.funcKeywordCode = Lf;
function ui(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ae._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Ff(e, t) {
  const { gen: r } = e;
  r.if((0, Ae._)`Array.isArray(${t})`, () => {
    r.assign(Bt.default.vErrors, (0, Ae._)`${Bt.default.vErrors} === null ? ${t} : ${Bt.default.vErrors}.concat(${t})`).assign(Bt.default.errors, (0, Ae._)`${Bt.default.vErrors}.length`), (0, Df.extendErrors)(e);
  }, () => e.error());
}
function Vf({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function ol(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ae.stringify)(r) });
}
function zf(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
it.validSchemaType = zf;
function Uf({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const o = s.dependencies;
  if (o != null && o.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${a}: ${o.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
it.validateKeywordUsage = Uf;
var Ot = {};
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.extendSubschemaMode = Ot.extendSubschemaData = Ot.getSubschema = void 0;
const st = te, il = M;
function qf(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, st._)`${e.schemaPath}${(0, st.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, st._)`${e.schemaPath}${(0, st.getProperty)(t)}${(0, st.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, il.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: o,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Ot.getSubschema = qf;
function Kf(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: o }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: u, opts: h } = t, P = l.let("data", (0, st._)`${t.data}${(0, st.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, st.str)`${d}${(0, il.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, st._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof st.Name ? s : l.let("data", s, !0);
    c(d), o !== void 0 && (e.propertyName = o);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Ot.extendSubschemaData = Kf;
function Gf(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Ot.extendSubschemaMode = Gf;
var be = {}, Qn = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, a;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!e(t[s], r[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (a = Object.keys(t), n = a.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, a[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var o = a[s];
      if (!e(t[o], r[o])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, cl = { exports: {} }, Pt = cl.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  On(t, n, s, e, "", e);
};
Pt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Pt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Pt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Pt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function On(e, t, r, n, s, a, o, l, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, o, l, c, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Pt.arrayKeywords)
          for (var P = 0; P < h.length; P++)
            On(e, t, r, h[P], s + "/" + u + "/" + P, a, s, u, n, P);
      } else if (u in Pt.propsKeywords) {
        if (h && typeof h == "object")
          for (var g in h)
            On(e, t, r, h[g], s + "/" + u + "/" + Hf(g), a, s, u, n, g);
      } else (u in Pt.keywords || e.allKeys && !(u in Pt.skipKeywords)) && On(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, o, l, c, d);
  }
}
function Hf(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Bf = cl.exports;
Object.defineProperty(be, "__esModule", { value: !0 });
be.getSchemaRefs = be.resolveUrl = be.normalizeId = be._getFullPath = be.getFullPath = be.inlineRef = void 0;
const Wf = M, Jf = Qn, Xf = Bf, Yf = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function Qf(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Ls(e) : t ? ll(e) <= t : !1;
}
be.inlineRef = Qf;
const Zf = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Ls(e) {
  for (const t in e) {
    if (Zf.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Ls) || typeof r == "object" && Ls(r))
      return !0;
  }
  return !1;
}
function ll(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Yf.has(r) && (typeof e[r] == "object" && (0, Wf.eachItem)(e[r], (n) => t += ll(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function ul(e, t = "", r) {
  r !== !1 && (t = mr(t));
  const n = e.parse(t);
  return dl(e, n);
}
be.getFullPath = ul;
function dl(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
be._getFullPath = dl;
const xf = /#\/?$/;
function mr(e) {
  return e ? e.replace(xf, "") : "";
}
be.normalizeId = mr;
function eh(e, t, r) {
  return r = mr(r), e.resolve(t, r);
}
be.resolveUrl = eh;
const th = /^[a-z_][-a-z0-9._]*$/i;
function rh(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = mr(e[r] || t), a = { "": s }, o = ul(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return Xf(e, { allKeys: !0 }, (h, P, g, E) => {
    if (E === void 0)
      return;
    const _ = o + P;
    let y = a[E];
    typeof h[r] == "string" && (y = m.call(this, h[r])), w.call(this, h.$anchor), w.call(this, h.$dynamicAnchor), a[P] = y;
    function m(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = mr(y ? R(y, N) : N), c.has(N))
        throw u(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(h, I.schema, N) : N !== mr(_) && (N[0] === "#" ? (d(h, l[N], N), l[N] = h) : this.refs[N] = _), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!th.test(N))
          throw new Error(`invalid anchor "${N}"`);
        m.call(this, `#${N}`);
      }
    }
  }), l;
  function d(h, P, g) {
    if (P !== void 0 && !Jf(h, P))
      throw u(g);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
be.getSchemaRefs = rh;
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.getData = xe.KeywordCxt = xe.validateFunctionCode = void 0;
const fl = vr, di = ge, Ea = ht, Ln = ge, nh = Yn, Ur = it, ps = Ot, K = te, W = dt, sh = be, mt = M, kr = xr;
function ah(e) {
  if (pl(e) && ($l(e), ml(e))) {
    ch(e);
    return;
  }
  hl(e, () => (0, fl.topBoolOrEmptySchema)(e));
}
xe.validateFunctionCode = ah;
function hl({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, K._)`${W.default.data}, ${W.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${fi(r, s)}`), ih(e, s), e.code(a);
  }) : e.func(t, (0, K._)`${W.default.data}, ${oh(s)}`, n.$async, () => e.code(fi(r, s)).code(a));
}
function oh(e) {
  return (0, K._)`{${W.default.instancePath}="", ${W.default.parentData}, ${W.default.parentDataProperty}, ${W.default.rootData}=${W.default.data}${e.dynamicRef ? (0, K._)`, ${W.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function ih(e, t) {
  e.if(W.default.valCxt, () => {
    e.var(W.default.instancePath, (0, K._)`${W.default.valCxt}.${W.default.instancePath}`), e.var(W.default.parentData, (0, K._)`${W.default.valCxt}.${W.default.parentData}`), e.var(W.default.parentDataProperty, (0, K._)`${W.default.valCxt}.${W.default.parentDataProperty}`), e.var(W.default.rootData, (0, K._)`${W.default.valCxt}.${W.default.rootData}`), t.dynamicRef && e.var(W.default.dynamicAnchors, (0, K._)`${W.default.valCxt}.${W.default.dynamicAnchors}`);
  }, () => {
    e.var(W.default.instancePath, (0, K._)`""`), e.var(W.default.parentData, (0, K._)`undefined`), e.var(W.default.parentDataProperty, (0, K._)`undefined`), e.var(W.default.rootData, W.default.data), t.dynamicRef && e.var(W.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function ch(e) {
  const { schema: t, opts: r, gen: n } = e;
  hl(e, () => {
    r.$comment && t.$comment && gl(e), hh(e), n.let(W.default.vErrors, null), n.let(W.default.errors, 0), r.unevaluated && lh(e), yl(e), $h(e);
  });
}
function lh(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function fi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function uh(e, t) {
  if (pl(e) && ($l(e), ml(e))) {
    dh(e, t);
    return;
  }
  (0, fl.boolOrEmptySchema)(e, t);
}
function ml({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function pl(e) {
  return typeof e.schema != "boolean";
}
function dh(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && gl(e), mh(e), ph(e);
  const a = n.const("_errs", W.default.errors);
  yl(e, a), n.var(t, (0, K._)`${a} === ${W.default.errors}`);
}
function $l(e) {
  (0, mt.checkUnknownRules)(e), fh(e);
}
function yl(e, t) {
  if (e.opts.jtd)
    return hi(e, [], !1, t);
  const r = (0, di.getSchemaTypes)(e.schema), n = (0, di.coerceAndCheckDataType)(e, r);
  hi(e, r, !n, t);
}
function fh(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, mt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function hh(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, mt.checkStrictMode)(e, "default is ignored in the schema root");
}
function mh(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, sh.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function ph(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function gl({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${W.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const o = (0, K.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${W.default.self}.opts.$comment(${a}, ${o}, ${l}.schema)`);
  }
}
function $h(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, K._)`${W.default.errors} === 0`, () => t.return(W.default.data), () => t.throw((0, K._)`new ${s}(${W.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, W.default.vErrors), a.unevaluated && yh(e), t.return((0, K._)`${W.default.errors} === 0`));
}
function yh({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function hi(e, t, r, n) {
  const { gen: s, schema: a, data: o, allErrors: l, opts: c, self: d } = e, { RULES: u } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, mt.schemaHasRulesButRef)(a, u))) {
    s.block(() => wl(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || gh(e, t), s.block(() => {
    for (const P of u.rules)
      h(P);
    h(u.post);
  });
  function h(P) {
    (0, Ea.shouldUseGroup)(a, P) && (P.type ? (s.if((0, Ln.checkDataType)(P.type, o, c.strictNumbers)), mi(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Ln.reportTypeError)(e)), s.endIf()) : mi(e, P), l || s.if((0, K._)`${W.default.errors} === ${n || 0}`));
  }
}
function mi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, nh.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, Ea.shouldUseRule)(n, a) && wl(e, a.keyword, a.definition, t.type);
  });
}
function gh(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (_h(e, t), e.opts.allowUnionTypes || vh(e, t), wh(e, e.dataTypes));
}
function _h(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      _l(e.dataTypes, r) || Sa(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Sh(e, t);
  }
}
function vh(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Sa(e, "use allowUnionTypes to allow union type keyword");
}
function wh(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Ea.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((o) => Eh(t, o)) && Sa(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function Eh(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function _l(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Sh(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    _l(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Sa(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, mt.checkStrictMode)(e, t, e.opts.strictTypes);
}
let vl = class {
  constructor(t, r, n) {
    if ((0, Ur.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, mt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", El(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Ur.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", W.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, K.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, K.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, K._)`${r} !== undefined && (${(0, K.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? kr.reportExtraError : kr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, kr.reportError)(this, this.def.$dataError || kr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, kr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = K.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = K.nil, r = K.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: o } = this;
    n.if((0, K.or)((0, K._)`${s} === undefined`, r)), t !== K.nil && n.assign(t, !0), (a.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== K.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, K.or)(o(), l());
    function o() {
      if (n.length) {
        if (!(r instanceof K.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, K._)`${(0, Ln.checkDataTypes)(c, r, a.opts.strictNumbers, Ln.DataType.Wrong)}`;
      }
      return K.nil;
    }
    function l() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, K._)`!${c}(${r})`;
      }
      return K.nil;
    }
  }
  subschema(t, r) {
    const n = (0, ps.getSubschema)(this.it, t);
    (0, ps.extendSubschemaData)(n, this.it, t), (0, ps.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return uh(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = mt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = mt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, K.Name)), !0;
  }
};
xe.KeywordCxt = vl;
function wl(e, t, r, n) {
  const s = new vl(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Ur.funcKeywordCode)(s, r) : "macro" in r ? (0, Ur.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Ur.funcKeywordCode)(s, r);
}
const bh = /^\/(?:[^~]|~0|~1)*$/, Ph = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function El(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return W.default.rootData;
  if (e[0] === "/") {
    if (!bh.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = W.default.rootData;
  } else {
    const d = Ph.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +d[1];
    if (s = d[2], s === "#") {
      if (u >= t)
        throw new Error(c("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(c("data", u));
    if (a = r[t - u], !s)
      return a;
  }
  let o = a;
  const l = s.split("/");
  for (const d of l)
    d && (a = (0, K._)`${a}${(0, K.getProperty)((0, mt.unescapeJsonPointer)(d))}`, o = (0, K._)`${o} && ${a}`);
  return o;
  function c(d, u) {
    return `Cannot access ${d} ${u} levels up, current level is ${t}`;
  }
}
xe.getData = El;
var en = {};
Object.defineProperty(en, "__esModule", { value: !0 });
let Nh = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
en.default = Nh;
var br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
const $s = be;
let Oh = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, $s.resolveUrl)(t, r, n), this.missingSchema = (0, $s.normalizeId)((0, $s.getFullPath)(t, this.missingRef));
  }
};
br.default = Oh;
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.resolveSchema = Fe.getCompilingSchema = Fe.resolveRef = Fe.compileSchema = Fe.SchemaEnv = void 0;
const We = te, Rh = en, Gt = dt, Qe = be, pi = M, Th = xe;
let Zn = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Qe.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Fe.SchemaEnv = Zn;
function ba(e) {
  const t = Sl.call(this, e);
  if (t)
    return t;
  const r = (0, Qe.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, o = new We.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let l;
  e.$async && (l = o.scopeValue("Error", {
    ref: Rh.default,
    code: (0, We._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = o.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Gt.default.data,
    parentData: Gt.default.parentData,
    parentDataProperty: Gt.default.parentDataProperty,
    dataNames: [Gt.default.data],
    dataPathArr: [We.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, We.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: We.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, We._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, Th.validateFunctionCode)(d), o.optimize(this.opts.code.optimize);
    const h = o.toString();
    u = `${o.scopeRefs(Gt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const g = new Function(`${Gt.default.self}`, `${Gt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: g }), g.errors = null, g.schema = e.schema, g.schemaEnv = e, e.$async && (g.$async = !0), this.opts.code.source === !0 && (g.source = { validateName: c, validateCode: h, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: E, items: _ } = d;
      g.evaluated = {
        props: E instanceof We.Name ? void 0 : E,
        items: _ instanceof We.Name ? void 0 : _,
        dynamicProps: E instanceof We.Name,
        dynamicItems: _ instanceof We.Name
      }, g.source && (g.source.evaluated = (0, We.stringify)(g.evaluated));
    }
    return e.validate = g, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
Fe.compileSchema = ba;
function Ih(e, t, r) {
  var n;
  r = (0, Qe.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = kh.call(this, e, r);
  if (a === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    o && (a = new Zn({ schema: o, schemaId: l, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = jh.call(this, a);
}
Fe.resolveRef = Ih;
function jh(e) {
  return (0, Qe.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : ba.call(this, e);
}
function Sl(e) {
  for (const t of this._compilations)
    if (Ah(t, e))
      return t;
}
Fe.getCompilingSchema = Sl;
function Ah(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function kh(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || xn.call(this, e, t);
}
function xn(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Qe._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Qe.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return ys.call(this, r, e);
  const a = (0, Qe.normalizeId)(n), o = this.refs[a] || this.schemas[a];
  if (typeof o == "string") {
    const l = xn.call(this, e, o);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : ys.call(this, r, l);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || ba.call(this, o), a === (0, Qe.normalizeId)(t)) {
      const { schema: l } = o, { schemaId: c } = this.opts, d = l[c];
      return d && (s = (0, Qe.resolveUrl)(this.opts.uriResolver, s, d)), new Zn({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return ys.call(this, r, o);
  }
}
Fe.resolveSchema = xn;
const Ch = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function ys(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, pi.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !Ch.has(l) && d && (t = (0, Qe.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, pi.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, Qe.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = xn.call(this, n, l);
  }
  const { schemaId: o } = this.opts;
  if (a = a || new Zn({ schema: r, schemaId: o, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Dh = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Mh = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Lh = "object", Fh = [
  "$data"
], Vh = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, zh = !1, Uh = {
  $id: Dh,
  description: Mh,
  type: Lh,
  required: Fh,
  properties: Vh,
  additionalProperties: zh
};
var Pa = {}, es = { exports: {} };
const qh = {
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
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
var Kh = {
  HEX: qh
};
const { HEX: Gh } = Kh, Hh = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
function bl(e) {
  if (Nl(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const t = e.match(Hh) || [], [r] = t;
  return r ? { host: Wh(r, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function $i(e, t = !1) {
  let r = "", n = !0;
  for (const s of e) {
    if (Gh[s] === void 0) return;
    s !== "0" && n === !0 && (n = !1), n || (r += s);
  }
  return t && r.length === 0 && (r = "0"), r;
}
function Bh(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, o = !1, l = !1;
  function c() {
    if (s.length) {
      if (a === !1) {
        const d = $i(s);
        if (d !== void 0)
          n.push(d);
        else
          return r.error = !0, !1;
      }
      s.length = 0;
    }
    return !0;
  }
  for (let d = 0; d < e.length; d++) {
    const u = e[d];
    if (!(u === "[" || u === "]"))
      if (u === ":") {
        if (o === !0 && (l = !0), !c())
          break;
        if (t++, n.push(":"), t > 7) {
          r.error = !0;
          break;
        }
        d - 1 >= 0 && e[d - 1] === ":" && (o = !0);
        continue;
      } else if (u === "%") {
        if (!c())
          break;
        a = !0;
      } else {
        s.push(u);
        continue;
      }
  }
  return s.length && (a ? r.zone = s.join("") : l ? n.push(s.join("")) : n.push($i(s))), r.address = n.join(""), r;
}
function Pl(e) {
  if (Nl(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = Bh(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, escapedHost: n, isIPV6: !0 };
  }
}
function Wh(e, t) {
  let r = "", n = !0;
  const s = e.length;
  for (let a = 0; a < s; a++) {
    const o = e[a];
    o === "0" && n ? (a + 1 <= s && e[a + 1] === t || a + 1 === s) && (r += o, n = !1) : (o === t ? n = !0 : n = !1, r += o);
  }
  return r;
}
function Nl(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
const yi = /^\.\.?\//u, gi = /^\/\.(?:\/|$)/u, _i = /^\/\.\.(?:\/|$)/u, Jh = /^\/?(?:.|\n)*?(?=\/|$)/u;
function Xh(e) {
  const t = [];
  for (; e.length; )
    if (e.match(yi))
      e = e.replace(yi, "");
    else if (e.match(gi))
      e = e.replace(gi, "/");
    else if (e.match(_i))
      e = e.replace(_i, "/"), t.pop();
    else if (e === "." || e === "..")
      e = "";
    else {
      const r = e.match(Jh);
      if (r) {
        const n = r[0];
        e = e.slice(n.length), t.push(n);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return t.join("");
}
function Yh(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function Qh(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    const n = bl(r);
    if (n.isIPV4)
      r = n.host;
    else {
      const s = Pl(n.host);
      s.isIPV6 === !0 ? r = `[${s.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Zh = {
  recomposeAuthority: Qh,
  normalizeComponentEncoding: Yh,
  removeDotSegments: Xh,
  normalizeIPv4: bl,
  normalizeIPv6: Pl
};
const xh = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, em = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Ol(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function Rl(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Tl(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function tm(e) {
  return e.secure = Ol(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function rm(e) {
  if ((e.port === (Ol(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function nm(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(em);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = Na[s];
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function sm(e, t) {
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = Na[s];
  a && (e = a.serialize(e, t));
  const o = e, l = e.nss;
  return o.path = `${n || t.nid}:${l}`, t.skipEscape = !0, o;
}
function am(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !xh.test(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function om(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Il = {
  scheme: "http",
  domainHost: !0,
  parse: Rl,
  serialize: Tl
}, im = {
  scheme: "https",
  domainHost: Il.domainHost,
  parse: Rl,
  serialize: Tl
}, Rn = {
  scheme: "ws",
  domainHost: !0,
  parse: tm,
  serialize: rm
}, cm = {
  scheme: "wss",
  domainHost: Rn.domainHost,
  parse: Rn.parse,
  serialize: Rn.serialize
}, lm = {
  scheme: "urn",
  parse: nm,
  serialize: sm,
  skipNormalize: !0
}, um = {
  scheme: "urn:uuid",
  parse: am,
  serialize: om,
  skipNormalize: !0
}, Na = {
  http: Il,
  https: im,
  ws: Rn,
  wss: cm,
  urn: lm,
  "urn:uuid": um
};
var dm = Na;
const { normalizeIPv6: fm, normalizeIPv4: hm, removeDotSegments: Fr, recomposeAuthority: mm, normalizeComponentEncoding: un } = Zh, Oa = dm;
function pm(e, t) {
  return typeof e == "string" ? e = ct(yt(e, t), t) : typeof e == "object" && (e = yt(ct(e, t), t)), e;
}
function $m(e, t, r) {
  const n = Object.assign({ scheme: "null" }, r), s = jl(yt(e, n), yt(t, n), n, !0);
  return ct(s, { ...n, skipEscape: !0 });
}
function jl(e, t, r, n) {
  const s = {};
  return n || (e = yt(ct(e, r), r), t = yt(ct(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Fr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Fr(t.path || ""), s.query = t.query) : (t.path ? (t.path.charAt(0) === "/" ? s.path = Fr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Fr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function ym(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ct(un(yt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ct(un(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ct(un(yt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ct(un(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function ct(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), s = [], a = Oa[(n.scheme || r.scheme || "").toLowerCase()];
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const o = mm(r);
  if (o !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(o), r.path && r.path.charAt(0) !== "/" && s.push("/")), r.path !== void 0) {
    let l = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (l = Fr(l)), o === void 0 && (l = l.replace(/^\/\//u, "/%2F")), s.push(l);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const gm = Array.from({ length: 127 }, (e, t) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(t)));
function _m(e) {
  let t = 0;
  for (let r = 0, n = e.length; r < n; ++r)
    if (t = e.charCodeAt(r), t > 126 || gm[t])
      return !0;
  return !1;
}
const vm = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function yt(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  }, s = e.indexOf("%") !== -1;
  let a = !1;
  r.reference === "suffix" && (e = (r.scheme ? r.scheme + ":" : "") + "//" + e);
  const o = e.match(vm);
  if (o) {
    if (n.scheme = o[1], n.userinfo = o[3], n.host = o[4], n.port = parseInt(o[5], 10), n.path = o[6] || "", n.query = o[7], n.fragment = o[8], isNaN(n.port) && (n.port = o[5]), n.host) {
      const c = hm(n.host);
      if (c.isIPV4 === !1) {
        const d = fm(c.host);
        n.host = d.host.toLowerCase(), a = d.isIPV6;
      } else
        n.host = c.host, a = !0;
    }
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const l = Oa[(r.scheme || n.scheme || "").toLowerCase()];
    if (!r.unicodeSupport && (!l || !l.unicodeSupport) && n.host && (r.domainHost || l && l.domainHost) && a === !1 && _m(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (c) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + c;
      }
    (!l || l && !l.skipNormalize) && (s && n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), s && n.host !== void 0 && (n.host = unescape(n.host)), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), l && l.parse && l.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Ra = {
  SCHEMES: Oa,
  normalize: pm,
  resolve: $m,
  resolveComponents: jl,
  equal: ym,
  serialize: ct,
  parse: yt
};
es.exports = Ra;
es.exports.default = Ra;
es.exports.fastUri = Ra;
var Al = es.exports;
Object.defineProperty(Pa, "__esModule", { value: !0 });
const kl = Al;
kl.code = 'require("ajv/dist/runtime/uri").default';
Pa.default = kl;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = xe;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = te;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = en, s = br, a = xt, o = Fe, l = te, c = be, d = ge, u = M, h = Uh, P = Pa, g = (v, p) => new RegExp(v, p);
  g.code = "new RegExp";
  const E = ["removeAdditional", "useDefaults", "coerceTypes"], _ = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), y = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function N(v) {
    var p, S, $, i, f, b, j, A, q, F, re, Ue, Tt, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, zt, Ut;
    const Be = v.strict, qt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, jr = qt === !0 || qt === void 0 ? 1 : qt || 0, Ar = ($ = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : g, ms = (i = v.uriResolver) !== null && i !== void 0 ? i : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : Be) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (Ue = (re = v.strictTuples) !== null && re !== void 0 ? re : Be) !== null && Ue !== void 0 ? Ue : "log",
      strictRequired: (It = (Tt = v.strictRequired) !== null && Tt !== void 0 ? Tt : Be) !== null && It !== void 0 ? It : !1,
      code: v.code ? { ...v.code, optimize: jr, regExp: Ar } : { optimize: jr, regExp: Ar },
      loopRequired: (jt = v.loopRequired) !== null && jt !== void 0 ? jt : w,
      loopEnum: (At = v.loopEnum) !== null && At !== void 0 ? At : w,
      meta: (kt = v.meta) !== null && kt !== void 0 ? kt : !0,
      messages: (Ct = v.messages) !== null && Ct !== void 0 ? Ct : !0,
      inlineRefs: (Dt = v.inlineRefs) !== null && Dt !== void 0 ? Dt : !0,
      schemaId: (Mt = v.schemaId) !== null && Mt !== void 0 ? Mt : "$id",
      addUsedSchema: (Lt = v.addUsedSchema) !== null && Lt !== void 0 ? Lt : !0,
      validateSchema: (Ft = v.validateSchema) !== null && Ft !== void 0 ? Ft : !0,
      validateFormats: (Vt = v.validateFormats) !== null && Vt !== void 0 ? Vt : !0,
      unicodeRegExp: (zt = v.unicodeRegExp) !== null && zt !== void 0 ? zt : !0,
      int32range: (Ut = v.int32range) !== null && Ut !== void 0 ? Ut : !0,
      uriResolver: ms
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: $ } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: _, es5: S, lines: $ }), this.logger = Q(p.logger);
      const i = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, y, p, "NOT SUPPORTED"), I.call(this, m, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && de.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), B.call(this), p.validateFormats = i;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: $ } = this.opts;
      let i = h;
      $ === "id" && (i = { ...h }, i.id = i.$id, delete i.$id), S && p && this.addMetaSchema(i, i[$], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[S] || p : void 0;
    }
    validate(p, S) {
      let $;
      if (typeof p == "string") {
        if ($ = this.getSchema(p), !$)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        $ = this.compile(p);
      const i = $(S);
      return "$async" in $ || (this.errors = $.errors), i;
    }
    compile(p, S) {
      const $ = this._addSchema(p, S);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return i.call(this, p, S);
      async function i(F, re) {
        await f.call(this, F.$schema);
        const Ue = this._addSchema(F, re);
        return Ue.validate || b.call(this, Ue);
      }
      async function f(F) {
        F && !this.getSchema(F) && await i.call(this, { $ref: F }, !0);
      }
      async function b(F) {
        try {
          return this._compileSchemaEnv(F);
        } catch (re) {
          if (!(re instanceof s.default))
            throw re;
          return j.call(this, re), await A.call(this, re.missingSchema), b.call(this, F);
        }
      }
      function j({ missingSchema: F, missingRef: re }) {
        if (this.refs[F])
          throw new Error(`AnySchema ${F} is loaded but ${re} cannot be resolved`);
      }
      async function A(F) {
        const re = await q.call(this, F);
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, S);
      }
      async function q(F) {
        const re = this._loading[F];
        if (re)
          return re;
        try {
          return await (this._loading[F] = $(F));
        } finally {
          delete this._loading[F];
        }
      }
    }
    // Adds schema to the instance
    addSchema(p, S, $, i = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, $, i);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, $, S, i, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, S, $ = this.opts.validateSchema) {
      return this.addSchema(p, S, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, S) {
      if (typeof p == "boolean")
        return !0;
      let $;
      if ($ = p.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const i = this.validate($, p);
      if (!i && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return i;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = U.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: $ } = this.opts, i = new o.SchemaEnv({ schema: {}, schemaId: $ });
        if (S = o.resolveSchema.call(this, i, p), !S)
          return;
        this.refs[p] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(p) {
      if (p instanceof RegExp)
        return this._removeAllSchemas(this.schemas, p), this._removeAllSchemas(this.refs, p), this;
      switch (typeof p) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = U.call(this, p);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const S = p;
          this._cache.delete(S);
          let $ = p[this.opts.schemaId];
          return $ && ($ = (0, c.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const S of p)
        this.addKeyword(S);
      return this;
    }
    addKeyword(p, S) {
      let $;
      if (typeof p == "string")
        $ = p, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = $);
      else if (typeof p == "object" && S === void 0) {
        if (S = p, $ = S.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, $, S), !S)
        return (0, u.eachItem)($, (f) => k.call(this, f)), this;
      D.call(this, S);
      const i = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, u.eachItem)($, i.type.length === 0 ? (f) => k.call(this, f, i) : (f) => i.type.forEach((b) => k.call(this, f, i, b))), this;
    }
    getKeyword(p) {
      const S = this.RULES.all[p];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: S } = this;
      delete S.keywords[p], delete S.all[p];
      for (const $ of S.rules) {
        const i = $.rules.findIndex((f) => f.keyword === p);
        i >= 0 && $.rules.splice(i, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: $ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((i) => `${$}${i.instancePath} ${i.message}`).reduce((i, f) => i + S + f);
    }
    $dataMetaSchema(p, S) {
      const $ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const i of S) {
        const f = i.split("/").slice(1);
        let b = p;
        for (const j of f)
          b = b[j];
        for (const j in $) {
          const A = $[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = b[j];
          q && F && (b[j] = T(F));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const $ in p) {
        const i = p[$];
        (!S || S.test($)) && (typeof i == "string" ? delete p[$] : i && !i.meta && (this._cache.delete(i.schema), delete p[$]));
      }
    }
    _addSchema(p, S, $, i = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let b;
      const { schemaId: j } = this.opts;
      if (typeof p == "object")
        b = p[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(p);
      if (A !== void 0)
        return A;
      $ = (0, c.normalizeId)(b || $);
      const q = c.getSchemaRefs.call(this, p, $);
      return A = new o.SchemaEnv({ schema: p, schemaId: j, meta: S, baseId: $, localRefs: q }), this._cache.set(A.schema, A), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = A), i && this.validateSchema(p, !0), A;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : o.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function I(v, p, S, $ = "error") {
    for (const i in v) {
      const f = i;
      f in p && this.logger[$](`${S}: option ${i}. ${v[f]}`);
    }
  }
  function U(v) {
    return v = (0, c.normalizeId)(v), this.schemas[v] || this.refs[v];
  }
  function B() {
    const v = this.opts.schemas;
    if (v)
      if (Array.isArray(v))
        this.addSchema(v);
      else
        for (const p in v)
          this.addSchema(v[p], p);
  }
  function de() {
    for (const v in this.opts.formats) {
      const p = this.opts.formats[v];
      p && this.addFormat(v, p);
    }
  }
  function V(v) {
    if (Array.isArray(v)) {
      this.addVocabulary(v);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in v) {
      const S = v[p];
      S.keyword || (S.keyword = p), this.addKeyword(S);
    }
  }
  function H() {
    const v = { ...this.opts };
    for (const p of E)
      delete v[p];
    return v;
  }
  const se = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(v) {
    if (v === !1)
      return se;
    if (v === void 0)
      return console;
    if (v.log && v.warn && v.error)
      return v;
    throw new Error("logger must implement log, warn and error methods");
  }
  const fe = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(v, p) {
    const { RULES: S } = this;
    if ((0, u.eachItem)(v, ($) => {
      if (S.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!fe.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, S) {
    var $;
    const i = p == null ? void 0 : p.post;
    if (S && i)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = i ? f.post : f.rules.find(({ type: A }) => A === S);
    if (b || (b = { type: S, rules: [] }, f.rules.push(b)), f.keywords[v] = !0, !p)
      return;
    const j = {
      keyword: v,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? z.call(this, b, j, p.before) : b.rules.push(j), f.all[v] = j, ($ = p.implements) === null || $ === void 0 || $.forEach((A) => this.addKeyword(A));
  }
  function z(v, p, S) {
    const $ = v.rules.findIndex((i) => i.keyword === S);
    $ >= 0 ? v.rules.splice($, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: p } = v;
    p !== void 0 && (v.$data && this.opts.$data && (p = T(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(v) {
    return { anyOf: [v, O] };
  }
})(Bc);
var Ta = {}, Ia = {}, ja = {};
Object.defineProperty(ja, "__esModule", { value: !0 });
const wm = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ja.default = wm;
var er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.callRef = er.getValidate = void 0;
const Em = br, vi = x, Me = te, or = dt, wi = Fe, dn = M, Sm = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: o, opts: l, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = wi.resolveRef.call(c, d, s, r);
    if (u === void 0)
      throw new Em.default(n.opts.uriResolver, s, r);
    if (u instanceof wi.SchemaEnv)
      return P(u);
    return g(u);
    function h() {
      if (a === d)
        return Tn(e, o, a, a.$async);
      const E = t.scopeValue("root", { ref: d });
      return Tn(e, (0, Me._)`${E}.validate`, d, d.$async);
    }
    function P(E) {
      const _ = Cl(e, E);
      Tn(e, _, E, E.$async);
    }
    function g(E) {
      const _ = t.scopeValue("schema", l.code.source === !0 ? { ref: E, code: (0, Me.stringify)(E) } : { ref: E }), y = t.name("valid"), m = e.subschema({
        schema: E,
        dataTypes: [],
        schemaPath: Me.nil,
        topSchemaRef: _,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(m), e.ok(y);
    }
  }
};
function Cl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Me._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
er.getValidate = Cl;
function Tn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: o, schemaEnv: l, opts: c } = a, d = c.passContext ? or.default.this : Me.nil;
  n ? u() : h();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const E = s.let("valid");
    s.try(() => {
      s.code((0, Me._)`await ${(0, vi.callValidateCode)(e, t, d)}`), g(t), o || s.assign(E, !0);
    }, (_) => {
      s.if((0, Me._)`!(${_} instanceof ${a.ValidationError})`, () => s.throw(_)), P(_), o || s.assign(E, !1);
    }), e.ok(E);
  }
  function h() {
    e.result((0, vi.callValidateCode)(e, t, d), () => g(t), () => P(t));
  }
  function P(E) {
    const _ = (0, Me._)`${E}.errors`;
    s.assign(or.default.vErrors, (0, Me._)`${or.default.vErrors} === null ? ${_} : ${or.default.vErrors}.concat(${_})`), s.assign(or.default.errors, (0, Me._)`${or.default.vErrors}.length`);
  }
  function g(E) {
    var _;
    if (!a.opts.unevaluated)
      return;
    const y = (_ = r == null ? void 0 : r.validate) === null || _ === void 0 ? void 0 : _.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = dn.mergeEvaluated.props(s, y.props, a.props));
      else {
        const m = s.var("props", (0, Me._)`${E}.evaluated.props`);
        a.props = dn.mergeEvaluated.props(s, m, a.props, Me.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = dn.mergeEvaluated.items(s, y.items, a.items));
      else {
        const m = s.var("items", (0, Me._)`${E}.evaluated.items`);
        a.items = dn.mergeEvaluated.items(s, m, a.items, Me.Name);
      }
  }
}
er.callRef = Tn;
er.default = Sm;
Object.defineProperty(Ia, "__esModule", { value: !0 });
const bm = ja, Pm = er, Nm = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  bm.default,
  Pm.default
];
Ia.default = Nm;
var Aa = {}, ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const Fn = te, _t = Fn.operators, Vn = {
  maximum: { okStr: "<=", ok: _t.LTE, fail: _t.GT },
  minimum: { okStr: ">=", ok: _t.GTE, fail: _t.LT },
  exclusiveMaximum: { okStr: "<", ok: _t.LT, fail: _t.GTE },
  exclusiveMinimum: { okStr: ">", ok: _t.GT, fail: _t.LTE }
}, Om = {
  message: ({ keyword: e, schemaCode: t }) => (0, Fn.str)`must be ${Vn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Fn._)`{comparison: ${Vn[e].okStr}, limit: ${t}}`
}, Rm = {
  keyword: Object.keys(Vn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Om,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Fn._)`${r} ${Vn[t].fail} ${n} || isNaN(${r})`);
  }
};
ka.default = Rm;
var Ca = {};
Object.defineProperty(Ca, "__esModule", { value: !0 });
const qr = te, Tm = {
  message: ({ schemaCode: e }) => (0, qr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, qr._)`{multipleOf: ${e}}`
}, Im = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Tm,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, o = t.let("res"), l = a ? (0, qr._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${a}` : (0, qr._)`${o} !== parseInt(${o})`;
    e.fail$data((0, qr._)`(${n} === 0 || (${o} = ${r}/${n}, ${l}))`);
  }
};
Ca.default = Im;
var Da = {}, Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
function Dl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ma.default = Dl;
Dl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Da, "__esModule", { value: !0 });
const Wt = te, jm = M, Am = Ma, km = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Wt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Wt._)`{limit: ${e}}`
}, Cm = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: km,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Wt.operators.GT : Wt.operators.LT, o = s.opts.unicode === !1 ? (0, Wt._)`${r}.length` : (0, Wt._)`${(0, jm.useFunc)(e.gen, Am.default)}(${r})`;
    e.fail$data((0, Wt._)`${o} ${a} ${n}`);
  }
};
Da.default = Cm;
var La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
const Dm = x, zn = te, Mm = {
  message: ({ schemaCode: e }) => (0, zn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, zn._)`{pattern: ${e}}`
}, Lm = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Mm,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, o = a.opts.unicodeRegExp ? "u" : "", l = r ? (0, zn._)`(new RegExp(${s}, ${o}))` : (0, Dm.usePattern)(e, n);
    e.fail$data((0, zn._)`!${l}.test(${t})`);
  }
};
La.default = Lm;
var Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
const Kr = te, Fm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Kr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Kr._)`{limit: ${e}}`
}, Vm = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Fm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Kr.operators.GT : Kr.operators.LT;
    e.fail$data((0, Kr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Fa.default = Vm;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const Cr = x, Gr = te, zm = M, Um = {
  message: ({ params: { missingProperty: e } }) => (0, Gr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Gr._)`{missingProperty: ${e}}`
}, qm = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Um,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: o } = e, { opts: l } = o;
    if (!a && r.length === 0)
      return;
    const c = r.length >= l.loopRequired;
    if (o.allErrors ? d() : u(), l.strictRequired) {
      const g = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const _ of r)
        if ((g == null ? void 0 : g[_]) === void 0 && !E.has(_)) {
          const y = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${_}" is not defined at "${y}" (strictRequired)`;
          (0, zm.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Gr.nil, h);
      else
        for (const g of r)
          (0, Cr.checkReportMissingProp)(e, g);
    }
    function u() {
      const g = t.let("missing");
      if (c || a) {
        const E = t.let("valid", !0);
        e.block$data(E, () => P(g, E)), e.ok(E);
      } else
        t.if((0, Cr.checkMissingProp)(e, r, g)), (0, Cr.reportMissingProp)(e, g), t.else();
    }
    function h() {
      t.forOf("prop", n, (g) => {
        e.setParams({ missingProperty: g }), t.if((0, Cr.noPropertyInData)(t, s, g, l.ownProperties), () => e.error());
      });
    }
    function P(g, E) {
      e.setParams({ missingProperty: g }), t.forOf(g, n, () => {
        t.assign(E, (0, Cr.propertyInData)(t, s, g, l.ownProperties)), t.if((0, Gr.not)(E), () => {
          e.error(), t.break();
        });
      }, Gr.nil);
    }
  }
};
Va.default = qm;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const Hr = te, Km = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Hr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Hr._)`{limit: ${e}}`
}, Gm = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Km,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Hr.operators.GT : Hr.operators.LT;
    e.fail$data((0, Hr._)`${r}.length ${s} ${n}`);
  }
};
za.default = Gm;
var Ua = {}, tn = {};
Object.defineProperty(tn, "__esModule", { value: !0 });
const Ml = Qn;
Ml.code = 'require("ajv/dist/runtime/equal").default';
tn.default = Ml;
Object.defineProperty(Ua, "__esModule", { value: !0 });
const gs = ge, we = te, Hm = M, Bm = tn, Wm = {
  message: ({ params: { i: e, j: t } }) => (0, we.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, we._)`{i: ${e}, j: ${t}}`
}, Jm = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Wm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: o, it: l } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, gs.getSchemaTypes)(a.items) : [];
    e.block$data(c, u, (0, we._)`${o} === false`), e.ok(c);
    function u() {
      const E = t.let("i", (0, we._)`${r}.length`), _ = t.let("j");
      e.setParams({ i: E, j: _ }), t.assign(c, !0), t.if((0, we._)`${E} > 1`, () => (h() ? P : g)(E, _));
    }
    function h() {
      return d.length > 0 && !d.some((E) => E === "object" || E === "array");
    }
    function P(E, _) {
      const y = t.name("item"), m = (0, gs.checkDataTypes)(d, y, l.opts.strictNumbers, gs.DataType.Wrong), w = t.const("indices", (0, we._)`{}`);
      t.for((0, we._)`;${E}--;`, () => {
        t.let(y, (0, we._)`${r}[${E}]`), t.if(m, (0, we._)`continue`), d.length > 1 && t.if((0, we._)`typeof ${y} == "string"`, (0, we._)`${y} += "_"`), t.if((0, we._)`typeof ${w}[${y}] == "number"`, () => {
          t.assign(_, (0, we._)`${w}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, we._)`${w}[${y}] = ${E}`);
      });
    }
    function g(E, _) {
      const y = (0, Hm.useFunc)(t, Bm.default), m = t.name("outer");
      t.label(m).for((0, we._)`;${E}--;`, () => t.for((0, we._)`${_} = ${E}; ${_}--;`, () => t.if((0, we._)`${y}(${r}[${E}], ${r}[${_}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
Ua.default = Jm;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const Fs = te, Xm = M, Ym = tn, Qm = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Fs._)`{allowedValue: ${e}}`
}, Zm = {
  keyword: "const",
  $data: !0,
  error: Qm,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Fs._)`!${(0, Xm.useFunc)(t, Ym.default)}(${r}, ${s})`) : e.fail((0, Fs._)`${a} !== ${r}`);
  }
};
qa.default = Zm;
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
const Vr = te, xm = M, ep = tn, tp = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Vr._)`{allowedValues: ${e}}`
}, rp = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: tp,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: o } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= o.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, xm.useFunc)(t, ep.default));
    let u;
    if (l || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const g = t.const("vSchema", a);
      u = (0, Vr.or)(...s.map((E, _) => P(g, _)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (g) => t.if((0, Vr._)`${d()}(${r}, ${g})`, () => t.assign(u, !0).break()));
    }
    function P(g, E) {
      const _ = s[E];
      return typeof _ == "object" && _ !== null ? (0, Vr._)`${d()}(${r}, ${g}[${E}])` : (0, Vr._)`${r} === ${_}`;
    }
  }
};
Ka.default = rp;
Object.defineProperty(Aa, "__esModule", { value: !0 });
const np = ka, sp = Ca, ap = Da, op = La, ip = Fa, cp = Va, lp = za, up = Ua, dp = qa, fp = Ka, hp = [
  // number
  np.default,
  sp.default,
  // string
  ap.default,
  op.default,
  // object
  ip.default,
  cp.default,
  // array
  lp.default,
  up.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  dp.default,
  fp.default
];
Aa.default = hp;
var Ga = {}, Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.validateAdditionalItems = void 0;
const Jt = te, Vs = M, mp = {
  message: ({ params: { len: e } }) => (0, Jt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Jt._)`{limit: ${e}}`
}, pp = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: mp,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Vs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Ll(e, n);
  }
};
function Ll(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: o } = e;
  o.items = !0;
  const l = r.const("len", (0, Jt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Jt._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Vs.alwaysValidSchema)(o, n)) {
    const d = r.var("valid", (0, Jt._)`${l} <= ${t.length}`);
    r.if((0, Jt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: Vs.Type.Num }, d), o.allErrors || r.if((0, Jt.not)(d), () => r.break());
    });
  }
}
Pr.validateAdditionalItems = Ll;
Pr.default = pp;
var Ha = {}, Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.validateTuple = void 0;
const Ei = te, In = M, $p = x, yp = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Fl(e, "additionalItems", t);
    r.items = !0, !(0, In.alwaysValidSchema)(r, t) && e.ok((0, $p.validateArray)(e));
  }
};
function Fl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: o, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = In.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), d = n.const("len", (0, Ei._)`${a}.length`);
  r.forEach((h, P) => {
    (0, In.alwaysValidSchema)(l, h) || (n.if((0, Ei._)`${d} > ${P}`, () => e.subschema({
      keyword: o,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function u(h) {
    const { opts: P, errSchemaPath: g } = l, E = r.length, _ = E === h.minItems && (E === h.maxItems || h[t] === !1);
    if (P.strictTuples && !_) {
      const y = `"${o}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${g}"`;
      (0, In.checkStrictMode)(l, y, P.strictTuples);
    }
  }
}
Nr.validateTuple = Fl;
Nr.default = yp;
Object.defineProperty(Ha, "__esModule", { value: !0 });
const gp = Nr, _p = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, gp.validateTuple)(e, "items")
};
Ha.default = _p;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
const Si = te, vp = M, wp = x, Ep = Pr, Sp = {
  message: ({ params: { len: e } }) => (0, Si.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Si._)`{limit: ${e}}`
}, bp = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Sp,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, vp.alwaysValidSchema)(n, t) && (s ? (0, Ep.validateAdditionalItems)(e, s) : e.ok((0, wp.validateArray)(e)));
  }
};
Ba.default = bp;
var Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const Ge = te, fn = M, Pp = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge.str)`must contain at least ${e} valid item(s)` : (0, Ge.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge._)`{minContains: ${e}}` : (0, Ge._)`{minContains: ${e}, maxContains: ${t}}`
}, Np = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Pp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let o, l;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (o = c === void 0 ? 1 : c, l = d) : o = 1;
    const u = t.const("len", (0, Ge._)`${s}.length`);
    if (e.setParams({ min: o, max: l }), l === void 0 && o === 0) {
      (0, fn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && o > l) {
      (0, fn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, fn.alwaysValidSchema)(a, r)) {
      let _ = (0, Ge._)`${u} >= ${o}`;
      l !== void 0 && (_ = (0, Ge._)`${_} && ${u} <= ${l}`), e.pass(_);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    l === void 0 && o === 1 ? g(h, () => t.if(h, () => t.break())) : o === 0 ? (t.let(h, !0), l !== void 0 && t.if((0, Ge._)`${s}.length > 0`, P)) : (t.let(h, !1), P()), e.result(h, () => e.reset());
    function P() {
      const _ = t.name("_valid"), y = t.let("count", 0);
      g(_, () => t.if(_, () => E(y)));
    }
    function g(_, y) {
      t.forRange("i", 0, u, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: fn.Type.Num,
          compositeRule: !0
        }, _), y();
      });
    }
    function E(_) {
      t.code((0, Ge._)`${_}++`), l === void 0 ? t.if((0, Ge._)`${_} >= ${o}`, () => t.assign(h, !0).break()) : (t.if((0, Ge._)`${_} > ${l}`, () => t.assign(h, !1).break()), o === 1 ? t.assign(h, !0) : t.if((0, Ge._)`${_} >= ${o}`, () => t.assign(h, !0)));
    }
  }
};
Wa.default = Np;
var Vl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = te, r = M, n = x;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${c},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, u] = a(c);
      o(c, d), l(c, u);
    }
  };
  function a({ schema: c }) {
    const d = {}, u = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const P = Array.isArray(c[h]) ? d : u;
      P[h] = c[h];
    }
    return [d, u];
  }
  function o(c, d = c.schema) {
    const { gen: u, data: h, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const g = u.let("missing");
    for (const E in d) {
      const _ = d[E];
      if (_.length === 0)
        continue;
      const y = (0, n.propertyInData)(u, h, E, P.opts.ownProperties);
      c.setParams({
        property: E,
        depsCount: _.length,
        deps: _.join(", ")
      }), P.allErrors ? u.if(y, () => {
        for (const m of _)
          (0, n.checkReportMissingProp)(c, m);
      }) : (u.if((0, t._)`${y} && (${(0, n.checkMissingProp)(c, _, g)})`), (0, n.reportMissingProp)(c, g), u.else());
    }
  }
  e.validatePropertyDeps = o;
  function l(c, d = c.schema) {
    const { gen: u, data: h, keyword: P, it: g } = c, E = u.name("valid");
    for (const _ in d)
      (0, r.alwaysValidSchema)(g, d[_]) || (u.if(
        (0, n.propertyInData)(u, h, _, g.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: P, schemaProp: _ }, E);
          c.mergeValidEvaluated(y, E);
        },
        () => u.var(E, !0)
        // TODO var
      ), c.ok(E));
  }
  e.validateSchemaDeps = l, e.default = s;
})(Vl);
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
const zl = te, Op = M, Rp = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, zl._)`{propertyName: ${e.propertyName}}`
}, Tp = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Rp,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Op.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, a), t.if((0, zl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Ja.default = Tp;
var ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
const hn = x, Xe = te, Ip = dt, mn = M, jp = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Xe._)`{additionalProperty: ${e.additionalProperty}}`
}, Ap = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: jp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: o } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = o;
    if (o.props = !0, c.removeAdditional !== "all" && (0, mn.alwaysValidSchema)(o, r))
      return;
    const d = (0, hn.allSchemaProperties)(n.properties), u = (0, hn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Xe._)`${a} === ${Ip.default.errors}`);
    function h() {
      t.forIn("key", s, (y) => {
        !d.length && !u.length ? E(y) : t.if(P(y), () => E(y));
      });
    }
    function P(y) {
      let m;
      if (d.length > 8) {
        const w = (0, mn.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, hn.isOwnProperty)(t, w, y);
      } else d.length ? m = (0, Xe.or)(...d.map((w) => (0, Xe._)`${y} === ${w}`)) : m = Xe.nil;
      return u.length && (m = (0, Xe.or)(m, ...u.map((w) => (0, Xe._)`${(0, hn.usePattern)(e, w)}.test(${y})`))), (0, Xe.not)(m);
    }
    function g(y) {
      t.code((0, Xe._)`delete ${s}[${y}]`);
    }
    function E(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        g(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, mn.alwaysValidSchema)(o, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? (_(y, m, !1), t.if((0, Xe.not)(m), () => {
          e.reset(), g(y);
        })) : (_(y, m), l || t.if((0, Xe.not)(m), () => t.break()));
      }
    }
    function _(y, m, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: mn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, m);
    }
  }
};
ts.default = Ap;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
const kp = xe, bi = x, _s = M, Pi = ts, Cp = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Pi.default.code(new kp.KeywordCxt(a, Pi.default, "additionalProperties"));
    const o = (0, bi.allSchemaProperties)(r);
    for (const h of o)
      a.definedProperties.add(h);
    a.opts.unevaluated && o.length && a.props !== !0 && (a.props = _s.mergeEvaluated.props(t, (0, _s.toHash)(o), a.props));
    const l = o.filter((h) => !(0, _s.alwaysValidSchema)(a, r[h]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const h of l)
      d(h) ? u(h) : (t.if((0, bi.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, c);
    }
  }
};
Xa.default = Cp;
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
const Ni = x, pn = te, Oi = M, Ri = M, Dp = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: o } = a, l = (0, Ni.allSchemaProperties)(r), c = l.filter((_) => (0, Oi.alwaysValidSchema)(a, r[_]));
    if (l.length === 0 || c.length === l.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = o.strictSchema && !o.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof pn.Name) && (a.props = (0, Ri.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    P();
    function P() {
      for (const _ of l)
        d && g(_), a.allErrors ? E(_) : (t.var(u, !0), E(_), t.if(u));
    }
    function g(_) {
      for (const y in d)
        new RegExp(_).test(y) && (0, Oi.checkStrictMode)(a, `property ${y} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function E(_) {
      t.forIn("key", n, (y) => {
        t.if((0, pn._)`${(0, Ni.usePattern)(e, _)}.test(${y})`, () => {
          const m = c.includes(_);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: y,
            dataPropType: Ri.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, pn._)`${h}[${y}]`, !0) : !m && !a.allErrors && t.if((0, pn.not)(u), () => t.break());
        });
      });
    }
  }
};
Ya.default = Dp;
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const Mp = M, Lp = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Mp.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Qa.default = Lp;
var Za = {};
Object.defineProperty(Za, "__esModule", { value: !0 });
const Fp = x, Vp = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Fp.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Za.default = Vp;
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const jn = te, zp = M, Up = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, jn._)`{passingSchemas: ${e.passing}}`
}, qp = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Up,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, o = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(d), e.result(o, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let P;
        (0, zp.alwaysValidSchema)(s, u) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, jn._)`${c} && ${o}`).assign(o, !1).assign(l, (0, jn._)`[${l}, ${h}]`).else(), t.if(c, () => {
          t.assign(o, !0), t.assign(l, h), P && e.mergeEvaluated(P, jn.Name);
        });
      });
    }
  }
};
xa.default = qp;
var eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
const Kp = M, Gp = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, o) => {
      if ((0, Kp.alwaysValidSchema)(n, a))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: o }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
eo.default = Gp;
var to = {};
Object.defineProperty(to, "__esModule", { value: !0 });
const Un = te, Ul = M, Hp = {
  message: ({ params: e }) => (0, Un.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Un._)`{failingKeyword: ${e.ifClause}}`
}, Bp = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Hp,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Ul.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Ti(n, "then"), a = Ti(n, "else");
    if (!s && !a)
      return;
    const o = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, d("then", u), d("else", u));
    } else s ? t.if(l, d("then")) : t.if((0, Un.not)(l), d("else"));
    e.pass(o, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const P = e.subschema({ keyword: u }, l);
        t.assign(o, l), e.mergeValidEvaluated(P, o), h ? t.assign(h, (0, Un._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Ti(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Ul.alwaysValidSchema)(e, r);
}
to.default = Bp;
var ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
const Wp = M, Jp = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Wp.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
ro.default = Jp;
Object.defineProperty(Ga, "__esModule", { value: !0 });
const Xp = Pr, Yp = Ha, Qp = Nr, Zp = Ba, xp = Wa, e$ = Vl, t$ = Ja, r$ = ts, n$ = Xa, s$ = Ya, a$ = Qa, o$ = Za, i$ = xa, c$ = eo, l$ = to, u$ = ro;
function d$(e = !1) {
  const t = [
    // any
    a$.default,
    o$.default,
    i$.default,
    c$.default,
    l$.default,
    u$.default,
    // object
    t$.default,
    r$.default,
    e$.default,
    n$.default,
    s$.default
  ];
  return e ? t.push(Yp.default, Zp.default) : t.push(Xp.default, Qp.default), t.push(xp.default), t;
}
Ga.default = d$;
var no = {}, so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
const $e = te, f$ = {
  message: ({ schemaCode: e }) => (0, $e.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, $e._)`{format: ${e}}`
}, h$ = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: f$,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: o, it: l } = e, { opts: c, errSchemaPath: d, schemaEnv: u, self: h } = l;
    if (!c.validateFormats)
      return;
    s ? P() : g();
    function P() {
      const E = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), _ = r.const("fDef", (0, $e._)`${E}[${o}]`), y = r.let("fType"), m = r.let("format");
      r.if((0, $e._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => r.assign(y, (0, $e._)`${_}.type || "string"`).assign(m, (0, $e._)`${_}.validate`), () => r.assign(y, (0, $e._)`"string"`).assign(m, _)), e.fail$data((0, $e.or)(w(), N()));
      function w() {
        return c.strictSchema === !1 ? $e.nil : (0, $e._)`${o} && !${m}`;
      }
      function N() {
        const R = u.$async ? (0, $e._)`(${_}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, $e._)`${m}(${n})`, I = (0, $e._)`(typeof ${m} == "function" ? ${R} : ${m}.test(${n}))`;
        return (0, $e._)`${m} && ${m} !== true && ${y} === ${t} && !${I}`;
      }
    }
    function g() {
      const E = h.formats[a];
      if (!E) {
        w();
        return;
      }
      if (E === !0)
        return;
      const [_, y, m] = N(E);
      _ === t && e.pass(R());
      function w() {
        if (c.strictSchema === !1) {
          h.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const U = I instanceof RegExp ? (0, $e.regexpCode)(I) : c.code.formats ? (0, $e._)`${c.code.formats}${(0, $e.getProperty)(a)}` : void 0, B = r.scopeValue("formats", { key: a, ref: I, code: U });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, $e._)`${B}.validate`] : ["string", I, B];
      }
      function R() {
        if (typeof E == "object" && !(E instanceof RegExp) && E.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, $e._)`await ${m}(${n})`;
        }
        return typeof y == "function" ? (0, $e._)`${m}(${n})` : (0, $e._)`${m}.test(${n})`;
      }
    }
  }
};
so.default = h$;
Object.defineProperty(no, "__esModule", { value: !0 });
const m$ = so, p$ = [m$.default];
no.default = p$;
var wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.contentVocabulary = wr.metadataVocabulary = void 0;
wr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
wr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Ta, "__esModule", { value: !0 });
const $$ = Ia, y$ = Aa, g$ = Ga, _$ = no, Ii = wr, v$ = [
  $$.default,
  y$.default,
  (0, g$.default)(),
  _$.default,
  Ii.metadataVocabulary,
  Ii.contentVocabulary
];
Ta.default = v$;
var ao = {}, rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
rs.DiscrError = void 0;
var ji;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(ji || (rs.DiscrError = ji = {}));
Object.defineProperty(ao, "__esModule", { value: !0 });
const ur = te, zs = rs, Ai = Fe, w$ = br, E$ = M, S$ = {
  message: ({ params: { discrError: e, tagName: t } }) => e === zs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, ur._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, b$ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: S$,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: o } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, ur._)`${r}${(0, ur.getProperty)(l)}`);
    t.if((0, ur._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: zs.DiscrError.Tag, tag: d, tagName: l })), e.ok(c);
    function u() {
      const g = P();
      t.if(!1);
      for (const E in g)
        t.elseIf((0, ur._)`${d} === ${E}`), t.assign(c, h(g[E]));
      t.else(), e.error(!1, { discrError: zs.DiscrError.Mapping, tag: d, tagName: l }), t.endIf();
    }
    function h(g) {
      const E = t.name("valid"), _ = e.subschema({ keyword: "oneOf", schemaProp: g }, E);
      return e.mergeEvaluated(_, ur.Name), E;
    }
    function P() {
      var g;
      const E = {}, _ = m(s);
      let y = !0;
      for (let R = 0; R < o.length; R++) {
        let I = o[R];
        if (I != null && I.$ref && !(0, E$.schemaHasRulesButRef)(I, a.self.RULES)) {
          const B = I.$ref;
          if (I = Ai.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, B), I instanceof Ai.SchemaEnv && (I = I.schema), I === void 0)
            throw new w$.default(a.opts.uriResolver, a.baseId, B);
        }
        const U = (g = I == null ? void 0 : I.properties) === null || g === void 0 ? void 0 : g[l];
        if (typeof U != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        y = y && (_ || m(I)), w(U, R);
      }
      if (!y)
        throw new Error(`discriminator: "${l}" must be required`);
      return E;
      function m({ required: R }) {
        return Array.isArray(R) && R.includes(l);
      }
      function w(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const U of R.enum)
            N(U, I);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in E)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        E[R] = I;
      }
    }
  }
};
ao.default = b$;
const P$ = "http://json-schema.org/draft-07/schema#", N$ = "http://json-schema.org/draft-07/schema#", O$ = "Core schema meta-schema", R$ = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, T$ = [
  "object",
  "boolean"
], I$ = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, j$ = {
  $schema: P$,
  $id: N$,
  title: O$,
  definitions: R$,
  type: T$,
  properties: I$,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Bc, n = Ta, s = ao, a = j$, o = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(a, o) : a;
      this.addMetaSchema(E, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = xe;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = te;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var h = en;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var P = br;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(ks, ks.exports);
var A$ = ks.exports, Us = { exports: {} }, ql = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(V, H) {
    return { validate: V, compare: H };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, o),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c, d),
    "date-time": t(h, P),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: _,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: de,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: m,
    // signed 32 bit integer
    int32: { type: "number", validate: R },
    // signed 64 bit integer
    int64: { type: "number", validate: I },
    // C-type float
    float: { type: "number", validate: U },
    // C-type double
    double: { type: "number", validate: U },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, o),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, d),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, P),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(V) {
    return V % 4 === 0 && (V % 100 !== 0 || V % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(V) {
    const H = n.exec(V);
    if (!H)
      return !1;
    const se = +H[1], Q = +H[2], fe = +H[3];
    return Q >= 1 && Q <= 12 && fe >= 1 && fe <= (Q === 2 && r(se) ? 29 : s[Q]);
  }
  function o(V, H) {
    if (V && H)
      return V > H ? 1 : V < H ? -1 : 0;
  }
  const l = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(V, H) {
    const se = l.exec(V);
    if (!se)
      return !1;
    const Q = +se[1], fe = +se[2], C = +se[3], k = se[5];
    return (Q <= 23 && fe <= 59 && C <= 59 || Q === 23 && fe === 59 && C === 60) && (!H || k !== "");
  }
  function d(V, H) {
    if (!(V && H))
      return;
    const se = l.exec(V), Q = l.exec(H);
    if (se && Q)
      return V = se[1] + se[2] + se[3] + (se[4] || ""), H = Q[1] + Q[2] + Q[3] + (Q[4] || ""), V > H ? 1 : V < H ? -1 : 0;
  }
  const u = /t|\s/i;
  function h(V) {
    const H = V.split(u);
    return H.length === 2 && a(H[0]) && c(H[1], !0);
  }
  function P(V, H) {
    if (!(V && H))
      return;
    const [se, Q] = V.split(u), [fe, C] = H.split(u), k = o(se, fe);
    if (k !== void 0)
      return k || d(Q, C);
  }
  const g = /\/|:/, E = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function _(V) {
    return g.test(V) && E.test(V);
  }
  const y = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function m(V) {
    return y.lastIndex = 0, y.test(V);
  }
  const w = -2147483648, N = 2 ** 31 - 1;
  function R(V) {
    return Number.isInteger(V) && V <= N && V >= w;
  }
  function I(V) {
    return Number.isInteger(V);
  }
  function U() {
    return !0;
  }
  const B = /[^\\]\\Z/;
  function de(V) {
    if (B.test(V))
      return !1;
    try {
      return new RegExp(V), !0;
    } catch {
      return !1;
    }
  }
})(ql);
var Kl = {}, qs = { exports: {} }, Gl = {}, et = {}, Er = {}, rn = {}, Z = {}, Zr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(m, ...w) {
    const N = [m[0]];
    let R = 0;
    for (; R < w.length; )
      l(N, w[R]), N.push(m[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function o(m, ...w) {
    const N = [g(m[0])];
    let R = 0;
    for (; R < w.length; )
      N.push(a), l(N, w[R]), N.push(a, g(m[++R]));
    return c(N), new n(N);
  }
  e.str = o;
  function l(m, w) {
    w instanceof n ? m.push(...w._items) : w instanceof r ? m.push(w) : m.push(h(w));
  }
  e.addCodeArg = l;
  function c(m) {
    let w = 1;
    for (; w < m.length - 1; ) {
      if (m[w] === a) {
        const N = d(m[w - 1], m[w + 1]);
        if (N !== void 0) {
          m.splice(w - 1, 3, N);
          continue;
        }
        m[w++] = "+";
      }
      w++;
    }
  }
  function d(m, w) {
    if (w === '""')
      return m;
    if (m === '""')
      return w;
    if (typeof m == "string")
      return w instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${m.slice(0, -1)}${w}"` : w[0] === '"' ? m.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(m instanceof r))
      return `"${m}${w.slice(1)}`;
  }
  function u(m, w) {
    return w.emptyStr() ? m : m.emptyStr() ? w : o`${m}${w}`;
  }
  e.strConcat = u;
  function h(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : g(Array.isArray(m) ? m.join(",") : m);
  }
  function P(m) {
    return new n(g(m));
  }
  e.stringify = P;
  function g(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = g;
  function E(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  e.getProperty = E;
  function _(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = _;
  function y(m) {
    return new n(m.toString());
  }
  e.regexpCode = y;
})(Zr);
var Ks = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Zr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: u } = {}) {
      this._names = {}, this._prefixes = d, this._parent = u;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const u = this._names[d] || this._nameGroup(d);
      return `${d}${u.index++}`;
    }
    _nameGroup(d) {
      var u, h;
      if (!((h = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, u) {
      super(u), this.prefix = d;
    }
    setValue(d, { property: u, itemIndex: h }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${h}]`;
    }
  }
  e.ValueScopeName = a;
  const o = (0, t._)`\n`;
  class l extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, u) {
      var h;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: g } = P, E = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let _ = this._values[g];
      if (_) {
        const w = _.get(E);
        if (w)
          return w;
      } else
        _ = this._values[g] = /* @__PURE__ */ new Map();
      _.set(E, P);
      const y = this._scope[g] || (this._scope[g] = []), m = y.length;
      return y[m] = u.ref, P.setValue(u, { property: g, itemIndex: m }), P;
    }
    getValue(d, u) {
      const h = this._values[d];
      if (h)
        return h.get(u);
    }
    scopeRefs(d, u = this._values) {
      return this._reduceValues(u, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${d}${h.scopePath}`;
      });
    }
    scopeCode(d = this._values, u, h) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, u, h);
    }
    _reduceValues(d, u, h = {}, P) {
      let g = t.nil;
      for (const E in d) {
        const _ = d[E];
        if (!_)
          continue;
        const y = h[E] = h[E] || /* @__PURE__ */ new Map();
        _.forEach((m) => {
          if (y.has(m))
            return;
          y.set(m, n.Started);
          let w = u(m);
          if (w) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            g = (0, t._)`${g}${N} ${m} = ${w};${this.opts._n}`;
          } else if (w = P == null ? void 0 : P(m))
            g = (0, t._)`${g}${w}${this.opts._n}`;
          else
            throw new r(m);
          y.set(m, n.Completed);
        });
      }
      return g;
    }
  }
  e.ValueScope = l;
})(Ks);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Zr, r = Ks;
  var n = Zr;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = Ks;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(i, f) {
      return this;
    }
  }
  class o extends a {
    constructor(i, f, b) {
      super(), this.varKind = i, this.name = f, this.rhs = b;
    }
    render({ es5: i, _n: f }) {
      const b = i ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${j};` + f;
    }
    optimizeNames(i, f) {
      if (i[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, i, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends a {
    constructor(i, f, b) {
      super(), this.lhs = i, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: i }) {
      return `${this.lhs} = ${this.rhs};` + i;
    }
    optimizeNames(i, f) {
      if (!(this.lhs instanceof t.Name && !i[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, i, f), this;
    }
    get names() {
      const i = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return fe(i, this.rhs);
    }
  }
  class c extends l {
    constructor(i, f, b, j) {
      super(i, b, j), this.op = f;
    }
    render({ _n: i }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + i;
    }
  }
  class d extends a {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `${this.label}:` + i;
    }
  }
  class u extends a {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `break${this.label ? ` ${this.label}` : ""};` + i;
    }
  }
  class h extends a {
    constructor(i) {
      super(), this.error = i;
    }
    render({ _n: i }) {
      return `throw ${this.error};` + i;
    }
    get names() {
      return this.error.names;
    }
  }
  class P extends a {
    constructor(i) {
      super(), this.code = i;
    }
    render({ _n: i }) {
      return `${this.code};` + i;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(i, f) {
      return this.code = C(this.code, i, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class g extends a {
    constructor(i = []) {
      super(), this.nodes = i;
    }
    render(i) {
      return this.nodes.reduce((f, b) => f + b.render(i), "");
    }
    optimizeNodes() {
      const { nodes: i } = this;
      let f = i.length;
      for (; f--; ) {
        const b = i[f].optimizeNodes();
        Array.isArray(b) ? i.splice(f, 1, ...b) : b ? i[f] = b : i.splice(f, 1);
      }
      return i.length > 0 ? this : void 0;
    }
    optimizeNames(i, f) {
      const { nodes: b } = this;
      let j = b.length;
      for (; j--; ) {
        const A = b[j];
        A.optimizeNames(i, f) || (k(i, A.names), b.splice(j, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((i, f) => Q(i, f.names), {});
    }
  }
  class E extends g {
    render(i) {
      return "{" + i._n + super.render(i) + "}" + i._n;
    }
  }
  class _ extends g {
  }
  class y extends E {
  }
  y.kind = "else";
  class m extends E {
    constructor(i, f) {
      super(f), this.condition = i;
    }
    render(i) {
      let f = `if(${this.condition})` + super.render(i);
      return this.else && (f += "else " + this.else.render(i)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const i = this.condition;
      if (i === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new y(b) : b;
      }
      if (f)
        return i === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(z(i), f instanceof m ? [f] : f.nodes);
      if (!(i === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(i, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(i, f), !!(super.optimizeNames(i, f) || this.else))
        return this.condition = C(this.condition, i, f), this;
    }
    get names() {
      const i = super.names;
      return fe(i, this.condition), this.else && Q(i, this.else.names), i;
    }
  }
  m.kind = "if";
  class w extends E {
  }
  w.kind = "for";
  class N extends w {
    constructor(i) {
      super(), this.iteration = i;
    }
    render(i) {
      return `for(${this.iteration})` + super.render(i);
    }
    optimizeNames(i, f) {
      if (super.optimizeNames(i, f))
        return this.iteration = C(this.iteration, i, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends w {
    constructor(i, f, b, j) {
      super(), this.varKind = i, this.name = f, this.from = b, this.to = j;
    }
    render(i) {
      const f = i.es5 ? r.varKinds.var : this.varKind, { name: b, from: j, to: A } = this;
      return `for(${f} ${b}=${j}; ${b}<${A}; ${b}++)` + super.render(i);
    }
    get names() {
      const i = fe(super.names, this.from);
      return fe(i, this.to);
    }
  }
  class I extends w {
    constructor(i, f, b, j) {
      super(), this.loop = i, this.varKind = f, this.name = b, this.iterable = j;
    }
    render(i) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(i);
    }
    optimizeNames(i, f) {
      if (super.optimizeNames(i, f))
        return this.iterable = C(this.iterable, i, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class U extends E {
    constructor(i, f, b) {
      super(), this.name = i, this.args = f, this.async = b;
    }
    render(i) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(i);
    }
  }
  U.kind = "func";
  class B extends g {
    render(i) {
      return "return " + super.render(i);
    }
  }
  B.kind = "return";
  class de extends E {
    render(i) {
      let f = "try" + super.render(i);
      return this.catch && (f += this.catch.render(i)), this.finally && (f += this.finally.render(i)), f;
    }
    optimizeNodes() {
      var i, f;
      return super.optimizeNodes(), (i = this.catch) === null || i === void 0 || i.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(i, f) {
      var b, j;
      return super.optimizeNames(i, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(i, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(i, f), this;
    }
    get names() {
      const i = super.names;
      return this.catch && Q(i, this.catch.names), this.finally && Q(i, this.finally.names), i;
    }
  }
  class V extends E {
    constructor(i) {
      super(), this.error = i;
    }
    render(i) {
      return `catch(${this.error})` + super.render(i);
    }
  }
  V.kind = "catch";
  class H extends E {
    render(i) {
      return "finally" + super.render(i);
    }
  }
  H.kind = "finally";
  class se {
    constructor(i, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = i, this._scope = new r.Scope({ parent: i }), this._nodes = [new _()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(i) {
      return this._scope.name(i);
    }
    // reserves unique name in the external scope
    scopeName(i) {
      return this._extScope.name(i);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(i, f) {
      const b = this._extScope.value(i, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(i, f) {
      return this._extScope.getValue(i, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(i) {
      return this._extScope.scopeRefs(i, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(i, f, b, j) {
      const A = this._scope.toName(f);
      return b !== void 0 && j && (this._constants[A.str] = b), this._leafNode(new o(i, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(i, f, b) {
      return this._def(r.varKinds.const, i, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(i, f, b) {
      return this._def(r.varKinds.let, i, f, b);
    }
    // `var` declaration with optional assignment
    var(i, f, b) {
      return this._def(r.varKinds.var, i, f, b);
    }
    // assignment code
    assign(i, f, b) {
      return this._leafNode(new l(i, f, b));
    }
    // `+=` code
    add(i, f) {
      return this._leafNode(new c(i, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(i) {
      return typeof i == "function" ? i() : i !== t.nil && this._leafNode(new P(i)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...i) {
      const f = ["{"];
      for (const [b, j] of i)
        f.length > 1 && f.push(","), f.push(b), (b !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(i, f, b) {
      if (this._blockNode(new m(i)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(i) {
      return this._elseNode(new m(i));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, y);
    }
    _for(i, f) {
      return this._blockNode(i), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(i, f) {
      return this._for(new N(i), f);
    }
    // `for` statement for a range of values
    forRange(i, f, b, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(i);
      return this._for(new R(A, q, f, b), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(i, f, b, j = r.varKinds.const) {
      const A = this._scope.toName(i);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), b(A);
        });
      }
      return this._for(new I("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(i, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(i, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(i);
      return this._for(new I("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(i) {
      return this._leafNode(new d(i));
    }
    // `break` statement
    break(i) {
      return this._leafNode(new u(i));
    }
    // `return` statement
    return(i) {
      const f = new B();
      if (this._blockNode(f), this.code(i), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(B);
    }
    // `try` statement
    try(i, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new de();
      if (this._blockNode(j), this.code(i), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return b && (this._currNode = j.finally = new H(), this.code(b)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(i) {
      return this._leafNode(new h(i));
    }
    // start self-balancing block
    block(i, f) {
      return this._blockStarts.push(this._nodes.length), i && this.code(i).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(i) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || i !== void 0 && b !== i)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${i} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(i, f = t.nil, b, j) {
      return this._blockNode(new U(i, f, b)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(U);
    }
    optimize(i = 1) {
      for (; i-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(i) {
      return this._currNode.nodes.push(i), this;
    }
    _blockNode(i) {
      this._currNode.nodes.push(i), this._nodes.push(i);
    }
    _endBlockNode(i, f) {
      const b = this._currNode;
      if (b instanceof i || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${i.kind}/${f.kind}` : i.kind}"`);
    }
    _elseNode(i) {
      const f = this._currNode;
      if (!(f instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = i, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const i = this._nodes;
      return i[i.length - 1];
    }
    set _currNode(i) {
      const f = this._nodes;
      f[f.length - 1] = i;
    }
  }
  e.CodeGen = se;
  function Q($, i) {
    for (const f in i)
      $[f] = ($[f] || 0) + (i[f] || 0);
    return $;
  }
  function fe($, i) {
    return i instanceof t._CodeOrName ? Q($, i.names) : $;
  }
  function C($, i, f) {
    if ($ instanceof t.Name)
      return b($);
    if (!j($))
      return $;
    return new t._Code($._items.reduce((A, q) => (q instanceof t.Name && (q = b(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function b(A) {
      const q = f[A.str];
      return q === void 0 || i[A.str] !== 1 ? A : (delete i[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && i[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k($, i) {
    for (const f in i)
      $[f] = ($[f] || 0) - (i[f] || 0);
  }
  function z($) {
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${S($)}`;
  }
  e.not = z;
  const D = p(e.operators.AND);
  function O(...$) {
    return $.reduce(D);
  }
  e.and = O;
  const T = p(e.operators.OR);
  function v(...$) {
    return $.reduce(T);
  }
  e.or = v;
  function p($) {
    return (i, f) => i === t.nil ? f : f === t.nil ? i : (0, t._)`${S(i)} ${$} ${S(f)}`;
  }
  function S($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(Z);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const le = Z, k$ = Zr;
function C$(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = C$;
function D$(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Hl(e, t), !Bl(t, e.self.RULES.all));
}
L.alwaysValidSchema = D$;
function Hl(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Xl(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = Hl;
function Bl(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = Bl;
function M$(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = M$;
function L$({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, le._)`${r}`;
  }
  return (0, le._)`${e}${t}${(0, le.getProperty)(n)}`;
}
L.schemaRefOrVal = L$;
function F$(e) {
  return Wl(decodeURIComponent(e));
}
L.unescapeFragment = F$;
function V$(e) {
  return encodeURIComponent(oo(e));
}
L.escapeFragment = V$;
function oo(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = oo;
function Wl(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = Wl;
function z$(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = z$;
function ki({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, o, l) => {
    const c = o === void 0 ? a : o instanceof le.Name ? (a instanceof le.Name ? e(s, a, o) : t(s, a, o), o) : a instanceof le.Name ? (t(s, o, a), a) : r(a, o);
    return l === le.Name && !(c instanceof le.Name) ? n(s, c) : c;
  };
}
L.mergeEvaluated = {
  props: ki({
    mergeNames: (e, t, r) => e.if((0, le._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, le._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, le._)`${r} || {}`).code((0, le._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, le._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, le._)`${r} || {}`), io(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Jl
  }),
  items: ki({
    mergeNames: (e, t, r) => e.if((0, le._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, le._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, le._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, le._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Jl(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, le._)`{}`);
  return t !== void 0 && io(e, r, t), r;
}
L.evaluatedPropsToName = Jl;
function io(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, le._)`${t}${(0, le.getProperty)(n)}`, !0));
}
L.setEvaluated = io;
const Ci = {};
function U$(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Ci[t.code] || (Ci[t.code] = new k$._Code(t.code))
  });
}
L.useFunc = U$;
var Gs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Gs || (L.Type = Gs = {}));
function q$(e, t, r) {
  if (e instanceof le.Name) {
    const n = t === Gs.Num;
    return r ? n ? (0, le._)`"[" + ${e} + "]"` : (0, le._)`"['" + ${e} + "']"` : n ? (0, le._)`"/" + ${e}` : (0, le._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, le.getProperty)(e).toString() : "/" + oo(e);
}
L.getErrorPath = q$;
function Xl(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = Xl;
var ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
const Re = Z, K$ = {
  // validation function arguments
  data: new Re.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Re.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Re.Name("instancePath"),
  parentData: new Re.Name("parentData"),
  parentDataProperty: new Re.Name("parentDataProperty"),
  rootData: new Re.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Re.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Re.Name("vErrors"),
  // null or array of validation errors
  errors: new Re.Name("errors"),
  // counter of validation errors
  this: new Re.Name("this"),
  // "globals"
  self: new Re.Name("self"),
  scope: new Re.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Re.Name("json"),
  jsonPos: new Re.Name("jsonPos"),
  jsonLen: new Re.Name("jsonLen"),
  jsonPart: new Re.Name("jsonPart")
};
ft.default = K$;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Z, r = L, n = ft;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: m }) => m ? (0, t.str)`"${y}" keyword must be ${m} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, m = e.keywordError, w, N) {
    const { it: R } = y, { gen: I, compositeRule: U, allErrors: B } = R, de = h(y, m, w);
    N ?? (U || B) ? c(I, de) : d(R, (0, t._)`[${de}]`);
  }
  e.reportError = s;
  function a(y, m = e.keywordError, w) {
    const { it: N } = y, { gen: R, compositeRule: I, allErrors: U } = N, B = h(y, m, w);
    c(R, B), I || U || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function o(y, m) {
    y.assign(n.default.errors, m), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(m, () => y.assign((0, t._)`${n.default.vErrors}.length`, m), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function l({ gen: y, keyword: m, schemaValue: w, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const U = y.name("err");
    y.forRange("i", R, n.default.errors, (B) => {
      y.const(U, (0, t._)`${n.default.vErrors}[${B}]`), y.if((0, t._)`${U}.instancePath === undefined`, () => y.assign((0, t._)`${U}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), y.assign((0, t._)`${U}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${m}`), I.opts.verbose && (y.assign((0, t._)`${U}.schema`, w), y.assign((0, t._)`${U}.data`, N));
    });
  }
  e.extendErrors = l;
  function c(y, m) {
    const w = y.const("err", m);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function d(y, m) {
    const { gen: w, validateName: N, schemaEnv: R } = y;
    R.$async ? w.throw((0, t._)`new ${y.ValidationError}(${m})`) : (w.assign((0, t._)`${N}.errors`, m), w.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function h(y, m, w) {
    const { createErrors: N } = y.it;
    return N === !1 ? (0, t._)`{}` : P(y, m, w);
  }
  function P(y, m, w = {}) {
    const { gen: N, it: R } = y, I = [
      g(R, w),
      E(y, w)
    ];
    return _(y, m, I), N.object(...I);
  }
  function g({ errorPath: y }, { instancePath: m }) {
    const w = m ? (0, t.str)`${y}${(0, r.getErrorPath)(m, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function E({ keyword: y, it: { errSchemaPath: m } }, { schemaPath: w, parentSchema: N }) {
    let R = N ? m : (0, t.str)`${m}/${y}`;
    return w && (R = (0, t.str)`${R}${(0, r.getErrorPath)(w, r.Type.Str)}`), [u.schemaPath, R];
  }
  function _(y, { params: m, message: w }, N) {
    const { keyword: R, data: I, schemaValue: U, it: B } = y, { opts: de, propertyName: V, topSchemaRef: H, schemaPath: se } = B;
    N.push([u.keyword, R], [u.params, typeof m == "function" ? m(y) : m || (0, t._)`{}`]), de.messages && N.push([u.message, typeof w == "function" ? w(y) : w]), de.verbose && N.push([u.schema, U], [u.parentSchema, (0, t._)`${H}${se}`], [n.default.data, I]), V && N.push([u.propertyName, V]);
  }
})(rn);
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.boolOrEmptySchema = Er.topBoolOrEmptySchema = void 0;
const G$ = rn, H$ = Z, B$ = ft, W$ = {
  message: "boolean schema is false"
};
function J$(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Yl(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(B$.default.data) : (t.assign((0, H$._)`${n}.errors`, null), t.return(!0));
}
Er.topBoolOrEmptySchema = J$;
function X$(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Yl(e)) : r.var(t, !0);
}
Er.boolOrEmptySchema = X$;
function Yl(e, t) {
  const { gen: r, data: n } = e, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, G$.reportError)(s, W$, void 0, t);
}
var _e = {}, tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.getRules = tr.isJSONType = void 0;
const Y$ = ["string", "number", "integer", "boolean", "null", "object", "array"], Q$ = new Set(Y$);
function Z$(e) {
  return typeof e == "string" && Q$.has(e);
}
tr.isJSONType = Z$;
function x$() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
tr.getRules = x$;
var pt = {};
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.shouldUseRule = pt.shouldUseGroup = pt.schemaHasRulesForType = void 0;
function ey({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Ql(e, n);
}
pt.schemaHasRulesForType = ey;
function Ql(e, t) {
  return t.rules.some((r) => Zl(e, r));
}
pt.shouldUseGroup = Ql;
function Zl(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
pt.shouldUseRule = Zl;
Object.defineProperty(_e, "__esModule", { value: !0 });
_e.reportTypeError = _e.checkDataTypes = _e.checkDataType = _e.coerceAndCheckDataType = _e.getJSONTypes = _e.getSchemaTypes = _e.DataType = void 0;
const ty = tr, ry = pt, ny = rn, Y = Z, xl = L;
var pr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(pr || (_e.DataType = pr = {}));
function sy(e) {
  const t = eu(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
_e.getSchemaTypes = sy;
function eu(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(ty.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
_e.getJSONTypes = eu;
function ay(e, t) {
  const { gen: r, data: n, opts: s } = e, a = oy(t, s.coerceTypes), o = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, ry.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const l = co(t, n, s.strictNumbers, pr.Wrong);
    r.if(l, () => {
      a.length ? iy(e, t, a) : lo(e);
    });
  }
  return o;
}
_e.coerceAndCheckDataType = ay;
const tu = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function oy(e, t) {
  return t ? e.filter((r) => tu.has(r) || t === "array" && r === "array") : [];
}
function iy(e, t, r) {
  const { gen: n, data: s, opts: a } = e, o = n.let("dataType", (0, Y._)`typeof ${s}`), l = n.let("coerced", (0, Y._)`undefined`);
  a.coerceTypes === "array" && n.if((0, Y._)`${o} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Y._)`${s}[0]`).assign(o, (0, Y._)`typeof ${s}`).if(co(t, s, a.strictNumbers), () => n.assign(l, s))), n.if((0, Y._)`${l} !== undefined`);
  for (const d of r)
    (tu.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), lo(e), n.endIf(), n.if((0, Y._)`${l} !== undefined`, () => {
    n.assign(s, l), cy(e, l);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, Y._)`${o} == "number" || ${o} == "boolean"`).assign(l, (0, Y._)`"" + ${s}`).elseIf((0, Y._)`${s} === null`).assign(l, (0, Y._)`""`);
        return;
      case "number":
        n.elseIf((0, Y._)`${o} == "boolean" || ${s} === null
              || (${o} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, Y._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, Y._)`${o} === "boolean" || ${s} === null
              || (${o} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, Y._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, Y._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, Y._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, Y._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, Y._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${s} === null`).assign(l, (0, Y._)`[${s}]`);
    }
  }
}
function cy({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Y._)`${t} !== undefined`, () => e.assign((0, Y._)`${t}[${r}]`, n));
}
function Hs(e, t, r, n = pr.Correct) {
  const s = n === pr.Correct ? Y.operators.EQ : Y.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, Y._)`${t} ${s} null`;
    case "array":
      a = (0, Y._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, Y._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = o((0, Y._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = o();
      break;
    default:
      return (0, Y._)`typeof ${t} ${s} ${e}`;
  }
  return n === pr.Correct ? a : (0, Y.not)(a);
  function o(l = Y.nil) {
    return (0, Y.and)((0, Y._)`typeof ${t} == "number"`, l, r ? (0, Y._)`isFinite(${t})` : Y.nil);
  }
}
_e.checkDataType = Hs;
function co(e, t, r, n) {
  if (e.length === 1)
    return Hs(e[0], t, r, n);
  let s;
  const a = (0, xl.toHash)(e);
  if (a.array && a.object) {
    const o = (0, Y._)`typeof ${t} != "object"`;
    s = a.null ? o : (0, Y._)`!${t} || ${o}`, delete a.null, delete a.array, delete a.object;
  } else
    s = Y.nil;
  a.number && delete a.integer;
  for (const o in a)
    s = (0, Y.and)(s, Hs(o, t, r, n));
  return s;
}
_e.checkDataTypes = co;
const ly = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Y._)`{type: ${e}}` : (0, Y._)`{type: ${t}}`
};
function lo(e) {
  const t = uy(e);
  (0, ny.reportError)(t, ly);
}
_e.reportTypeError = lo;
function uy(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, xl.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
ns.assignDefaults = void 0;
const ir = Z, dy = L;
function fy(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Di(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Di(e, a, s.default));
}
ns.assignDefaults = fy;
function Di(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: o } = e;
  if (r === void 0)
    return;
  const l = (0, ir._)`${a}${(0, ir.getProperty)(t)}`;
  if (s) {
    (0, dy.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, ir._)`${l} === undefined`;
  o.useDefaults === "empty" && (c = (0, ir._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, ir._)`${l} = ${(0, ir.stringify)(r)}`);
}
var lt = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.validateUnion = ee.validateArray = ee.usePattern = ee.callValidateCode = ee.schemaProperties = ee.allSchemaProperties = ee.noPropertyInData = ee.propertyInData = ee.isOwnProperty = ee.hasPropFunc = ee.reportMissingProp = ee.checkMissingProp = ee.checkReportMissingProp = void 0;
const me = Z, uo = L, vt = ft, hy = L;
function my(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(ho(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, me._)`${t}` }, !0), e.error();
  });
}
ee.checkReportMissingProp = my;
function py({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, me.or)(...n.map((a) => (0, me.and)(ho(e, t, a, r.ownProperties), (0, me._)`${s} = ${a}`)));
}
ee.checkMissingProp = py;
function $y(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ee.reportMissingProp = $y;
function ru(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, me._)`Object.prototype.hasOwnProperty`
  });
}
ee.hasPropFunc = ru;
function fo(e, t, r) {
  return (0, me._)`${ru(e)}.call(${t}, ${r})`;
}
ee.isOwnProperty = fo;
function yy(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} !== undefined`;
  return n ? (0, me._)`${s} && ${fo(e, t, r)}` : s;
}
ee.propertyInData = yy;
function ho(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} === undefined`;
  return n ? (0, me.or)(s, (0, me.not)(fo(e, t, r))) : s;
}
ee.noPropertyInData = ho;
function nu(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ee.allSchemaProperties = nu;
function gy(e, t) {
  return nu(t).filter((r) => !(0, uo.alwaysValidSchema)(e, t[r]));
}
ee.schemaProperties = gy;
function _y({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: o }, l, c, d) {
  const u = d ? (0, me._)`${e}, ${t}, ${n}${s}` : t, h = [
    [vt.default.instancePath, (0, me.strConcat)(vt.default.instancePath, a)],
    [vt.default.parentData, o.parentData],
    [vt.default.parentDataProperty, o.parentDataProperty],
    [vt.default.rootData, vt.default.rootData]
  ];
  o.opts.dynamicRef && h.push([vt.default.dynamicAnchors, vt.default.dynamicAnchors]);
  const P = (0, me._)`${u}, ${r.object(...h)}`;
  return c !== me.nil ? (0, me._)`${l}.call(${c}, ${P})` : (0, me._)`${l}(${P})`;
}
ee.callValidateCode = _y;
const vy = (0, me._)`new RegExp`;
function wy({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, me._)`${s.code === "new RegExp" ? vy : (0, hy.useFunc)(e, s)}(${r}, ${n})`
  });
}
ee.usePattern = wy;
function Ey(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return o(() => t.assign(l, !1)), l;
  }
  return t.var(a, !0), o(() => t.break()), a;
  function o(l) {
    const c = t.const("len", (0, me._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: uo.Type.Num
      }, a), t.if((0, me.not)(a), l);
    });
  }
}
ee.validateArray = Ey;
function Sy(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, uo.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const o = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, l);
    t.assign(o, (0, me._)`${o} || ${l}`), e.mergeValidEvaluated(u, l) || t.if((0, me.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
ee.validateUnion = Sy;
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.validateKeywordUsage = lt.validSchemaType = lt.funcKeywordCode = lt.macroKeywordCode = void 0;
const ke = Z, Xt = ft, by = ee, Py = rn;
function Ny(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: o } = e, l = t.macro.call(o.self, s, a, o), c = su(r, n, l);
  o.opts.validateSchema !== !1 && o.self.validateSchema(l, !0);
  const d = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: ke.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
lt.macroKeywordCode = Ny;
function Oy(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: o, $data: l, it: c } = e;
  Ty(c, t);
  const d = !l && t.compile ? t.compile.call(c.self, a, o, c) : t.validate, u = su(n, s, d), h = n.let("valid");
  e.block$data(h, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function P() {
    if (t.errors === !1)
      _(), t.modifying && Mi(e), y(() => e.error());
    else {
      const m = t.async ? g() : E();
      t.modifying && Mi(e), y(() => Ry(e, m));
    }
  }
  function g() {
    const m = n.let("ruleErrs", null);
    return n.try(() => _((0, ke._)`await `), (w) => n.assign(h, !1).if((0, ke._)`${w} instanceof ${c.ValidationError}`, () => n.assign(m, (0, ke._)`${w}.errors`), () => n.throw(w))), m;
  }
  function E() {
    const m = (0, ke._)`${u}.errors`;
    return n.assign(m, null), _(ke.nil), m;
  }
  function _(m = t.async ? (0, ke._)`await ` : ke.nil) {
    const w = c.opts.passContext ? Xt.default.this : Xt.default.self, N = !("compile" in t && !l || t.schema === !1);
    n.assign(h, (0, ke._)`${m}${(0, by.callValidateCode)(e, u, w, N)}`, t.modifying);
  }
  function y(m) {
    var w;
    n.if((0, ke.not)((w = t.valid) !== null && w !== void 0 ? w : h), m);
  }
}
lt.funcKeywordCode = Oy;
function Mi(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, ke._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Ry(e, t) {
  const { gen: r } = e;
  r.if((0, ke._)`Array.isArray(${t})`, () => {
    r.assign(Xt.default.vErrors, (0, ke._)`${Xt.default.vErrors} === null ? ${t} : ${Xt.default.vErrors}.concat(${t})`).assign(Xt.default.errors, (0, ke._)`${Xt.default.vErrors}.length`), (0, Py.extendErrors)(e);
  }, () => e.error());
}
function Ty({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function su(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, ke.stringify)(r) });
}
function Iy(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
lt.validSchemaType = Iy;
function jy({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const o = s.dependencies;
  if (o != null && o.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${a}: ${o.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
lt.validateKeywordUsage = jy;
var Rt = {};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.extendSubschemaMode = Rt.extendSubschemaData = Rt.getSubschema = void 0;
const at = Z, au = L;
function Ay(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, at._)`${e.schemaPath}${(0, at.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, at._)`${e.schemaPath}${(0, at.getProperty)(t)}${(0, at.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, au.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: o,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Rt.getSubschema = Ay;
function ky(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: o }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: u, opts: h } = t, P = l.let("data", (0, at._)`${t.data}${(0, at.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, at.str)`${d}${(0, au.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, at._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof at.Name ? s : l.let("data", s, !0);
    c(d), o !== void 0 && (e.propertyName = o);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Rt.extendSubschemaData = ky;
function Cy(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Rt.extendSubschemaMode = Cy;
var Pe = {}, ou = { exports: {} }, Nt = ou.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  An(t, n, s, e, "", e);
};
Nt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Nt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Nt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Nt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function An(e, t, r, n, s, a, o, l, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, o, l, c, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Nt.arrayKeywords)
          for (var P = 0; P < h.length; P++)
            An(e, t, r, h[P], s + "/" + u + "/" + P, a, s, u, n, P);
      } else if (u in Nt.propsKeywords) {
        if (h && typeof h == "object")
          for (var g in h)
            An(e, t, r, h[g], s + "/" + u + "/" + Dy(g), a, s, u, n, g);
      } else (u in Nt.keywords || e.allKeys && !(u in Nt.skipKeywords)) && An(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, o, l, c, d);
  }
}
function Dy(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var My = ou.exports;
Object.defineProperty(Pe, "__esModule", { value: !0 });
Pe.getSchemaRefs = Pe.resolveUrl = Pe.normalizeId = Pe._getFullPath = Pe.getFullPath = Pe.inlineRef = void 0;
const Ly = L, Fy = Qn, Vy = My, zy = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function Uy(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Bs(e) : t ? iu(e) <= t : !1;
}
Pe.inlineRef = Uy;
const qy = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Bs(e) {
  for (const t in e) {
    if (qy.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Bs) || typeof r == "object" && Bs(r))
      return !0;
  }
  return !1;
}
function iu(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !zy.has(r) && (typeof e[r] == "object" && (0, Ly.eachItem)(e[r], (n) => t += iu(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function cu(e, t = "", r) {
  r !== !1 && (t = $r(t));
  const n = e.parse(t);
  return lu(e, n);
}
Pe.getFullPath = cu;
function lu(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Pe._getFullPath = lu;
const Ky = /#\/?$/;
function $r(e) {
  return e ? e.replace(Ky, "") : "";
}
Pe.normalizeId = $r;
function Gy(e, t, r) {
  return r = $r(r), e.resolve(t, r);
}
Pe.resolveUrl = Gy;
const Hy = /^[a-z_][-a-z0-9._]*$/i;
function By(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = $r(e[r] || t), a = { "": s }, o = cu(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return Vy(e, { allKeys: !0 }, (h, P, g, E) => {
    if (E === void 0)
      return;
    const _ = o + P;
    let y = a[E];
    typeof h[r] == "string" && (y = m.call(this, h[r])), w.call(this, h.$anchor), w.call(this, h.$dynamicAnchor), a[P] = y;
    function m(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = $r(y ? R(y, N) : N), c.has(N))
        throw u(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(h, I.schema, N) : N !== $r(_) && (N[0] === "#" ? (d(h, l[N], N), l[N] = h) : this.refs[N] = _), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!Hy.test(N))
          throw new Error(`invalid anchor "${N}"`);
        m.call(this, `#${N}`);
      }
    }
  }), l;
  function d(h, P, g) {
    if (P !== void 0 && !Fy(h, P))
      throw u(g);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Pe.getSchemaRefs = By;
Object.defineProperty(et, "__esModule", { value: !0 });
et.getData = et.KeywordCxt = et.validateFunctionCode = void 0;
const uu = Er, Li = _e, mo = pt, qn = _e, Wy = ns, Br = lt, vs = Rt, G = Z, J = ft, Jy = Pe, $t = L, Dr = rn;
function Xy(e) {
  if (hu(e) && (mu(e), fu(e))) {
    Zy(e);
    return;
  }
  du(e, () => (0, uu.topBoolOrEmptySchema)(e));
}
et.validateFunctionCode = Xy;
function du({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, G._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${Fi(r, s)}`), Qy(e, s), e.code(a);
  }) : e.func(t, (0, G._)`${J.default.data}, ${Yy(s)}`, n.$async, () => e.code(Fi(r, s)).code(a));
}
function Yy(e) {
  return (0, G._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, G._)`, ${J.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function Qy(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, G._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, G._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, G._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, G._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, G._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, G._)`""`), e.var(J.default.parentData, (0, G._)`undefined`), e.var(J.default.parentDataProperty, (0, G._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function Zy(e) {
  const { schema: t, opts: r, gen: n } = e;
  du(e, () => {
    r.$comment && t.$comment && $u(e), ng(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && xy(e), pu(e), og(e);
  });
}
function xy(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function Fi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function eg(e, t) {
  if (hu(e) && (mu(e), fu(e))) {
    tg(e, t);
    return;
  }
  (0, uu.boolOrEmptySchema)(e, t);
}
function fu({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function hu(e) {
  return typeof e.schema != "boolean";
}
function tg(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && $u(e), sg(e), ag(e);
  const a = n.const("_errs", J.default.errors);
  pu(e, a), n.var(t, (0, G._)`${a} === ${J.default.errors}`);
}
function mu(e) {
  (0, $t.checkUnknownRules)(e), rg(e);
}
function pu(e, t) {
  if (e.opts.jtd)
    return Vi(e, [], !1, t);
  const r = (0, Li.getSchemaTypes)(e.schema), n = (0, Li.coerceAndCheckDataType)(e, r);
  Vi(e, r, !n, t);
}
function rg(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, $t.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function ng(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, $t.checkStrictMode)(e, "default is ignored in the schema root");
}
function sg(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Jy.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function ag(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function $u({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${J.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const o = (0, G.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${J.default.self}.opts.$comment(${a}, ${o}, ${l}.schema)`);
  }
}
function og(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, G._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, G._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, J.default.vErrors), a.unevaluated && ig(e), t.return((0, G._)`${J.default.errors} === 0`));
}
function ig({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function Vi(e, t, r, n) {
  const { gen: s, schema: a, data: o, allErrors: l, opts: c, self: d } = e, { RULES: u } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, $t.schemaHasRulesButRef)(a, u))) {
    s.block(() => _u(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || cg(e, t), s.block(() => {
    for (const P of u.rules)
      h(P);
    h(u.post);
  });
  function h(P) {
    (0, mo.shouldUseGroup)(a, P) && (P.type ? (s.if((0, qn.checkDataType)(P.type, o, c.strictNumbers)), zi(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, qn.reportTypeError)(e)), s.endIf()) : zi(e, P), l || s.if((0, G._)`${J.default.errors} === ${n || 0}`));
  }
}
function zi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, Wy.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, mo.shouldUseRule)(n, a) && _u(e, a.keyword, a.definition, t.type);
  });
}
function cg(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (lg(e, t), e.opts.allowUnionTypes || ug(e, t), dg(e, e.dataTypes));
}
function lg(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      yu(e.dataTypes, r) || po(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), hg(e, t);
  }
}
function ug(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && po(e, "use allowUnionTypes to allow union type keyword");
}
function dg(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, mo.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((o) => fg(t, o)) && po(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function fg(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function yu(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function hg(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    yu(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function po(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, $t.checkStrictMode)(e, t, e.opts.strictTypes);
}
class gu {
  constructor(t, r, n) {
    if ((0, Br.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, $t.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", vu(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Br.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", J.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, G.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, G.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, G._)`${r} !== undefined && (${(0, G.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Dr.reportExtraError : Dr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Dr.reportError)(this, this.def.$dataError || Dr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Dr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = G.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = G.nil, r = G.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: o } = this;
    n.if((0, G.or)((0, G._)`${s} === undefined`, r)), t !== G.nil && n.assign(t, !0), (a.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== G.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, G.or)(o(), l());
    function o() {
      if (n.length) {
        if (!(r instanceof G.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, G._)`${(0, qn.checkDataTypes)(c, r, a.opts.strictNumbers, qn.DataType.Wrong)}`;
      }
      return G.nil;
    }
    function l() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, G._)`!${c}(${r})`;
      }
      return G.nil;
    }
  }
  subschema(t, r) {
    const n = (0, vs.getSubschema)(this.it, t);
    (0, vs.extendSubschemaData)(n, this.it, t), (0, vs.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return eg(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = $t.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = $t.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, G.Name)), !0;
  }
}
et.KeywordCxt = gu;
function _u(e, t, r, n) {
  const s = new gu(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Br.funcKeywordCode)(s, r) : "macro" in r ? (0, Br.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Br.funcKeywordCode)(s, r);
}
const mg = /^\/(?:[^~]|~0|~1)*$/, pg = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function vu(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!mg.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = J.default.rootData;
  } else {
    const d = pg.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +d[1];
    if (s = d[2], s === "#") {
      if (u >= t)
        throw new Error(c("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(c("data", u));
    if (a = r[t - u], !s)
      return a;
  }
  let o = a;
  const l = s.split("/");
  for (const d of l)
    d && (a = (0, G._)`${a}${(0, G.getProperty)((0, $t.unescapeJsonPointer)(d))}`, o = (0, G._)`${o} && ${a}`);
  return o;
  function c(d, u) {
    return `Cannot access ${d} ${u} levels up, current level is ${t}`;
  }
}
et.getData = vu;
var nn = {};
Object.defineProperty(nn, "__esModule", { value: !0 });
class $g extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
nn.default = $g;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
const ws = Pe;
class yg extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, ws.resolveUrl)(t, r, n), this.missingSchema = (0, ws.normalizeId)((0, ws.getFullPath)(t, this.missingRef));
  }
}
Or.default = yg;
var Ve = {};
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.resolveSchema = Ve.getCompilingSchema = Ve.resolveRef = Ve.compileSchema = Ve.SchemaEnv = void 0;
const Je = Z, gg = nn, Ht = ft, Ze = Pe, Ui = L, _g = et;
class ss {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Ze.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Ve.SchemaEnv = ss;
function $o(e) {
  const t = wu.call(this, e);
  if (t)
    return t;
  const r = (0, Ze.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, o = new Je.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let l;
  e.$async && (l = o.scopeValue("Error", {
    ref: gg.default,
    code: (0, Je._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = o.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Ht.default.data,
    parentData: Ht.default.parentData,
    parentDataProperty: Ht.default.parentDataProperty,
    dataNames: [Ht.default.data],
    dataPathArr: [Je.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Je.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Je.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Je._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, _g.validateFunctionCode)(d), o.optimize(this.opts.code.optimize);
    const h = o.toString();
    u = `${o.scopeRefs(Ht.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const g = new Function(`${Ht.default.self}`, `${Ht.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: g }), g.errors = null, g.schema = e.schema, g.schemaEnv = e, e.$async && (g.$async = !0), this.opts.code.source === !0 && (g.source = { validateName: c, validateCode: h, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: E, items: _ } = d;
      g.evaluated = {
        props: E instanceof Je.Name ? void 0 : E,
        items: _ instanceof Je.Name ? void 0 : _,
        dynamicProps: E instanceof Je.Name,
        dynamicItems: _ instanceof Je.Name
      }, g.source && (g.source.evaluated = (0, Je.stringify)(g.evaluated));
    }
    return e.validate = g, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
Ve.compileSchema = $o;
function vg(e, t, r) {
  var n;
  r = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Sg.call(this, e, r);
  if (a === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    o && (a = new ss({ schema: o, schemaId: l, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = wg.call(this, a);
}
Ve.resolveRef = vg;
function wg(e) {
  return (0, Ze.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : $o.call(this, e);
}
function wu(e) {
  for (const t of this._compilations)
    if (Eg(t, e))
      return t;
}
Ve.getCompilingSchema = wu;
function Eg(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Sg(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || as.call(this, e, t);
}
function as(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Ze._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Ze.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Es.call(this, r, e);
  const a = (0, Ze.normalizeId)(n), o = this.refs[a] || this.schemas[a];
  if (typeof o == "string") {
    const l = as.call(this, e, o);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : Es.call(this, r, l);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || $o.call(this, o), a === (0, Ze.normalizeId)(t)) {
      const { schema: l } = o, { schemaId: c } = this.opts, d = l[c];
      return d && (s = (0, Ze.resolveUrl)(this.opts.uriResolver, s, d)), new ss({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return Es.call(this, r, o);
  }
}
Ve.resolveSchema = as;
const bg = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Es(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Ui.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !bg.has(l) && d && (t = (0, Ze.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Ui.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = as.call(this, n, l);
  }
  const { schemaId: o } = this.opts;
  if (a = a || new ss({ schema: r, schemaId: o, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Pg = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Ng = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Og = "object", Rg = [
  "$data"
], Tg = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, Ig = !1, jg = {
  $id: Pg,
  description: Ng,
  type: Og,
  required: Rg,
  properties: Tg,
  additionalProperties: Ig
};
var yo = {};
Object.defineProperty(yo, "__esModule", { value: !0 });
const Eu = Al;
Eu.code = 'require("ajv/dist/runtime/uri").default';
yo.default = Eu;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = et;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = Z;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = nn, s = Or, a = tr, o = Ve, l = Z, c = Pe, d = _e, u = L, h = jg, P = yo, g = (v, p) => new RegExp(v, p);
  g.code = "new RegExp";
  const E = ["removeAdditional", "useDefaults", "coerceTypes"], _ = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), y = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function N(v) {
    var p, S, $, i, f, b, j, A, q, F, re, Ue, Tt, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, zt, Ut;
    const Be = v.strict, qt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, jr = qt === !0 || qt === void 0 ? 1 : qt || 0, Ar = ($ = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : g, ms = (i = v.uriResolver) !== null && i !== void 0 ? i : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : Be) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (Ue = (re = v.strictTuples) !== null && re !== void 0 ? re : Be) !== null && Ue !== void 0 ? Ue : "log",
      strictRequired: (It = (Tt = v.strictRequired) !== null && Tt !== void 0 ? Tt : Be) !== null && It !== void 0 ? It : !1,
      code: v.code ? { ...v.code, optimize: jr, regExp: Ar } : { optimize: jr, regExp: Ar },
      loopRequired: (jt = v.loopRequired) !== null && jt !== void 0 ? jt : w,
      loopEnum: (At = v.loopEnum) !== null && At !== void 0 ? At : w,
      meta: (kt = v.meta) !== null && kt !== void 0 ? kt : !0,
      messages: (Ct = v.messages) !== null && Ct !== void 0 ? Ct : !0,
      inlineRefs: (Dt = v.inlineRefs) !== null && Dt !== void 0 ? Dt : !0,
      schemaId: (Mt = v.schemaId) !== null && Mt !== void 0 ? Mt : "$id",
      addUsedSchema: (Lt = v.addUsedSchema) !== null && Lt !== void 0 ? Lt : !0,
      validateSchema: (Ft = v.validateSchema) !== null && Ft !== void 0 ? Ft : !0,
      validateFormats: (Vt = v.validateFormats) !== null && Vt !== void 0 ? Vt : !0,
      unicodeRegExp: (zt = v.unicodeRegExp) !== null && zt !== void 0 ? zt : !0,
      int32range: (Ut = v.int32range) !== null && Ut !== void 0 ? Ut : !0,
      uriResolver: ms
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: $ } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: _, es5: S, lines: $ }), this.logger = Q(p.logger);
      const i = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, y, p, "NOT SUPPORTED"), I.call(this, m, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && de.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), B.call(this), p.validateFormats = i;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: $ } = this.opts;
      let i = h;
      $ === "id" && (i = { ...h }, i.id = i.$id, delete i.$id), S && p && this.addMetaSchema(i, i[$], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[S] || p : void 0;
    }
    validate(p, S) {
      let $;
      if (typeof p == "string") {
        if ($ = this.getSchema(p), !$)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        $ = this.compile(p);
      const i = $(S);
      return "$async" in $ || (this.errors = $.errors), i;
    }
    compile(p, S) {
      const $ = this._addSchema(p, S);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return i.call(this, p, S);
      async function i(F, re) {
        await f.call(this, F.$schema);
        const Ue = this._addSchema(F, re);
        return Ue.validate || b.call(this, Ue);
      }
      async function f(F) {
        F && !this.getSchema(F) && await i.call(this, { $ref: F }, !0);
      }
      async function b(F) {
        try {
          return this._compileSchemaEnv(F);
        } catch (re) {
          if (!(re instanceof s.default))
            throw re;
          return j.call(this, re), await A.call(this, re.missingSchema), b.call(this, F);
        }
      }
      function j({ missingSchema: F, missingRef: re }) {
        if (this.refs[F])
          throw new Error(`AnySchema ${F} is loaded but ${re} cannot be resolved`);
      }
      async function A(F) {
        const re = await q.call(this, F);
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, S);
      }
      async function q(F) {
        const re = this._loading[F];
        if (re)
          return re;
        try {
          return await (this._loading[F] = $(F));
        } finally {
          delete this._loading[F];
        }
      }
    }
    // Adds schema to the instance
    addSchema(p, S, $, i = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, $, i);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, $, S, i, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, S, $ = this.opts.validateSchema) {
      return this.addSchema(p, S, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, S) {
      if (typeof p == "boolean")
        return !0;
      let $;
      if ($ = p.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const i = this.validate($, p);
      if (!i && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return i;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = U.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: $ } = this.opts, i = new o.SchemaEnv({ schema: {}, schemaId: $ });
        if (S = o.resolveSchema.call(this, i, p), !S)
          return;
        this.refs[p] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(p) {
      if (p instanceof RegExp)
        return this._removeAllSchemas(this.schemas, p), this._removeAllSchemas(this.refs, p), this;
      switch (typeof p) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = U.call(this, p);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const S = p;
          this._cache.delete(S);
          let $ = p[this.opts.schemaId];
          return $ && ($ = (0, c.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const S of p)
        this.addKeyword(S);
      return this;
    }
    addKeyword(p, S) {
      let $;
      if (typeof p == "string")
        $ = p, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = $);
      else if (typeof p == "object" && S === void 0) {
        if (S = p, $ = S.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, $, S), !S)
        return (0, u.eachItem)($, (f) => k.call(this, f)), this;
      D.call(this, S);
      const i = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, u.eachItem)($, i.type.length === 0 ? (f) => k.call(this, f, i) : (f) => i.type.forEach((b) => k.call(this, f, i, b))), this;
    }
    getKeyword(p) {
      const S = this.RULES.all[p];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: S } = this;
      delete S.keywords[p], delete S.all[p];
      for (const $ of S.rules) {
        const i = $.rules.findIndex((f) => f.keyword === p);
        i >= 0 && $.rules.splice(i, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: $ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((i) => `${$}${i.instancePath} ${i.message}`).reduce((i, f) => i + S + f);
    }
    $dataMetaSchema(p, S) {
      const $ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const i of S) {
        const f = i.split("/").slice(1);
        let b = p;
        for (const j of f)
          b = b[j];
        for (const j in $) {
          const A = $[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = b[j];
          q && F && (b[j] = T(F));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const $ in p) {
        const i = p[$];
        (!S || S.test($)) && (typeof i == "string" ? delete p[$] : i && !i.meta && (this._cache.delete(i.schema), delete p[$]));
      }
    }
    _addSchema(p, S, $, i = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let b;
      const { schemaId: j } = this.opts;
      if (typeof p == "object")
        b = p[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(p);
      if (A !== void 0)
        return A;
      $ = (0, c.normalizeId)(b || $);
      const q = c.getSchemaRefs.call(this, p, $);
      return A = new o.SchemaEnv({ schema: p, schemaId: j, meta: S, baseId: $, localRefs: q }), this._cache.set(A.schema, A), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = A), i && this.validateSchema(p, !0), A;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : o.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function I(v, p, S, $ = "error") {
    for (const i in v) {
      const f = i;
      f in p && this.logger[$](`${S}: option ${i}. ${v[f]}`);
    }
  }
  function U(v) {
    return v = (0, c.normalizeId)(v), this.schemas[v] || this.refs[v];
  }
  function B() {
    const v = this.opts.schemas;
    if (v)
      if (Array.isArray(v))
        this.addSchema(v);
      else
        for (const p in v)
          this.addSchema(v[p], p);
  }
  function de() {
    for (const v in this.opts.formats) {
      const p = this.opts.formats[v];
      p && this.addFormat(v, p);
    }
  }
  function V(v) {
    if (Array.isArray(v)) {
      this.addVocabulary(v);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in v) {
      const S = v[p];
      S.keyword || (S.keyword = p), this.addKeyword(S);
    }
  }
  function H() {
    const v = { ...this.opts };
    for (const p of E)
      delete v[p];
    return v;
  }
  const se = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(v) {
    if (v === !1)
      return se;
    if (v === void 0)
      return console;
    if (v.log && v.warn && v.error)
      return v;
    throw new Error("logger must implement log, warn and error methods");
  }
  const fe = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(v, p) {
    const { RULES: S } = this;
    if ((0, u.eachItem)(v, ($) => {
      if (S.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!fe.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, S) {
    var $;
    const i = p == null ? void 0 : p.post;
    if (S && i)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = i ? f.post : f.rules.find(({ type: A }) => A === S);
    if (b || (b = { type: S, rules: [] }, f.rules.push(b)), f.keywords[v] = !0, !p)
      return;
    const j = {
      keyword: v,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? z.call(this, b, j, p.before) : b.rules.push(j), f.all[v] = j, ($ = p.implements) === null || $ === void 0 || $.forEach((A) => this.addKeyword(A));
  }
  function z(v, p, S) {
    const $ = v.rules.findIndex((i) => i.keyword === S);
    $ >= 0 ? v.rules.splice($, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: p } = v;
    p !== void 0 && (v.$data && this.opts.$data && (p = T(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(v) {
    return { anyOf: [v, O] };
  }
})(Gl);
var go = {}, _o = {}, vo = {};
Object.defineProperty(vo, "__esModule", { value: !0 });
const Ag = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
vo.default = Ag;
var rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.callRef = rr.getValidate = void 0;
const kg = Or, qi = ee, Le = Z, cr = ft, Ki = Ve, $n = L, Cg = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: o, opts: l, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = Ki.resolveRef.call(c, d, s, r);
    if (u === void 0)
      throw new kg.default(n.opts.uriResolver, s, r);
    if (u instanceof Ki.SchemaEnv)
      return P(u);
    return g(u);
    function h() {
      if (a === d)
        return kn(e, o, a, a.$async);
      const E = t.scopeValue("root", { ref: d });
      return kn(e, (0, Le._)`${E}.validate`, d, d.$async);
    }
    function P(E) {
      const _ = Su(e, E);
      kn(e, _, E, E.$async);
    }
    function g(E) {
      const _ = t.scopeValue("schema", l.code.source === !0 ? { ref: E, code: (0, Le.stringify)(E) } : { ref: E }), y = t.name("valid"), m = e.subschema({
        schema: E,
        dataTypes: [],
        schemaPath: Le.nil,
        topSchemaRef: _,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(m), e.ok(y);
    }
  }
};
function Su(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Le._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
rr.getValidate = Su;
function kn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: o, schemaEnv: l, opts: c } = a, d = c.passContext ? cr.default.this : Le.nil;
  n ? u() : h();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const E = s.let("valid");
    s.try(() => {
      s.code((0, Le._)`await ${(0, qi.callValidateCode)(e, t, d)}`), g(t), o || s.assign(E, !0);
    }, (_) => {
      s.if((0, Le._)`!(${_} instanceof ${a.ValidationError})`, () => s.throw(_)), P(_), o || s.assign(E, !1);
    }), e.ok(E);
  }
  function h() {
    e.result((0, qi.callValidateCode)(e, t, d), () => g(t), () => P(t));
  }
  function P(E) {
    const _ = (0, Le._)`${E}.errors`;
    s.assign(cr.default.vErrors, (0, Le._)`${cr.default.vErrors} === null ? ${_} : ${cr.default.vErrors}.concat(${_})`), s.assign(cr.default.errors, (0, Le._)`${cr.default.vErrors}.length`);
  }
  function g(E) {
    var _;
    if (!a.opts.unevaluated)
      return;
    const y = (_ = r == null ? void 0 : r.validate) === null || _ === void 0 ? void 0 : _.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = $n.mergeEvaluated.props(s, y.props, a.props));
      else {
        const m = s.var("props", (0, Le._)`${E}.evaluated.props`);
        a.props = $n.mergeEvaluated.props(s, m, a.props, Le.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = $n.mergeEvaluated.items(s, y.items, a.items));
      else {
        const m = s.var("items", (0, Le._)`${E}.evaluated.items`);
        a.items = $n.mergeEvaluated.items(s, m, a.items, Le.Name);
      }
  }
}
rr.callRef = kn;
rr.default = Cg;
Object.defineProperty(_o, "__esModule", { value: !0 });
const Dg = vo, Mg = rr, Lg = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Dg.default,
  Mg.default
];
_o.default = Lg;
var wo = {}, Eo = {};
Object.defineProperty(Eo, "__esModule", { value: !0 });
const Kn = Z, wt = Kn.operators, Gn = {
  maximum: { okStr: "<=", ok: wt.LTE, fail: wt.GT },
  minimum: { okStr: ">=", ok: wt.GTE, fail: wt.LT },
  exclusiveMaximum: { okStr: "<", ok: wt.LT, fail: wt.GTE },
  exclusiveMinimum: { okStr: ">", ok: wt.GT, fail: wt.LTE }
}, Fg = {
  message: ({ keyword: e, schemaCode: t }) => (0, Kn.str)`must be ${Gn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Kn._)`{comparison: ${Gn[e].okStr}, limit: ${t}}`
}, Vg = {
  keyword: Object.keys(Gn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Fg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Kn._)`${r} ${Gn[t].fail} ${n} || isNaN(${r})`);
  }
};
Eo.default = Vg;
var So = {};
Object.defineProperty(So, "__esModule", { value: !0 });
const Wr = Z, zg = {
  message: ({ schemaCode: e }) => (0, Wr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Wr._)`{multipleOf: ${e}}`
}, Ug = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: zg,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, o = t.let("res"), l = a ? (0, Wr._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${a}` : (0, Wr._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Wr._)`(${n} === 0 || (${o} = ${r}/${n}, ${l}))`);
  }
};
So.default = Ug;
var bo = {}, Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
function bu(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Po.default = bu;
bu.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(bo, "__esModule", { value: !0 });
const Yt = Z, qg = L, Kg = Po, Gg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Yt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Yt._)`{limit: ${e}}`
}, Hg = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Gg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Yt.operators.GT : Yt.operators.LT, o = s.opts.unicode === !1 ? (0, Yt._)`${r}.length` : (0, Yt._)`${(0, qg.useFunc)(e.gen, Kg.default)}(${r})`;
    e.fail$data((0, Yt._)`${o} ${a} ${n}`);
  }
};
bo.default = Hg;
var No = {};
Object.defineProperty(No, "__esModule", { value: !0 });
const Bg = ee, Hn = Z, Wg = {
  message: ({ schemaCode: e }) => (0, Hn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Hn._)`{pattern: ${e}}`
}, Jg = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Wg,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, o = a.opts.unicodeRegExp ? "u" : "", l = r ? (0, Hn._)`(new RegExp(${s}, ${o}))` : (0, Bg.usePattern)(e, n);
    e.fail$data((0, Hn._)`!${l}.test(${t})`);
  }
};
No.default = Jg;
var Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
const Jr = Z, Xg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Jr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Jr._)`{limit: ${e}}`
}, Yg = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Xg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Jr.operators.GT : Jr.operators.LT;
    e.fail$data((0, Jr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Oo.default = Yg;
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const Mr = ee, Xr = Z, Qg = L, Zg = {
  message: ({ params: { missingProperty: e } }) => (0, Xr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Xr._)`{missingProperty: ${e}}`
}, xg = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Zg,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: o } = e, { opts: l } = o;
    if (!a && r.length === 0)
      return;
    const c = r.length >= l.loopRequired;
    if (o.allErrors ? d() : u(), l.strictRequired) {
      const g = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const _ of r)
        if ((g == null ? void 0 : g[_]) === void 0 && !E.has(_)) {
          const y = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${_}" is not defined at "${y}" (strictRequired)`;
          (0, Qg.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Xr.nil, h);
      else
        for (const g of r)
          (0, Mr.checkReportMissingProp)(e, g);
    }
    function u() {
      const g = t.let("missing");
      if (c || a) {
        const E = t.let("valid", !0);
        e.block$data(E, () => P(g, E)), e.ok(E);
      } else
        t.if((0, Mr.checkMissingProp)(e, r, g)), (0, Mr.reportMissingProp)(e, g), t.else();
    }
    function h() {
      t.forOf("prop", n, (g) => {
        e.setParams({ missingProperty: g }), t.if((0, Mr.noPropertyInData)(t, s, g, l.ownProperties), () => e.error());
      });
    }
    function P(g, E) {
      e.setParams({ missingProperty: g }), t.forOf(g, n, () => {
        t.assign(E, (0, Mr.propertyInData)(t, s, g, l.ownProperties)), t.if((0, Xr.not)(E), () => {
          e.error(), t.break();
        });
      }, Xr.nil);
    }
  }
};
Ro.default = xg;
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
const Yr = Z, e_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Yr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Yr._)`{limit: ${e}}`
}, t_ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: e_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Yr.operators.GT : Yr.operators.LT;
    e.fail$data((0, Yr._)`${r}.length ${s} ${n}`);
  }
};
To.default = t_;
var Io = {}, sn = {};
Object.defineProperty(sn, "__esModule", { value: !0 });
const Pu = Qn;
Pu.code = 'require("ajv/dist/runtime/equal").default';
sn.default = Pu;
Object.defineProperty(Io, "__esModule", { value: !0 });
const Ss = _e, Ee = Z, r_ = L, n_ = sn, s_ = {
  message: ({ params: { i: e, j: t } }) => (0, Ee.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ee._)`{i: ${e}, j: ${t}}`
}, a_ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: s_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: o, it: l } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, Ss.getSchemaTypes)(a.items) : [];
    e.block$data(c, u, (0, Ee._)`${o} === false`), e.ok(c);
    function u() {
      const E = t.let("i", (0, Ee._)`${r}.length`), _ = t.let("j");
      e.setParams({ i: E, j: _ }), t.assign(c, !0), t.if((0, Ee._)`${E} > 1`, () => (h() ? P : g)(E, _));
    }
    function h() {
      return d.length > 0 && !d.some((E) => E === "object" || E === "array");
    }
    function P(E, _) {
      const y = t.name("item"), m = (0, Ss.checkDataTypes)(d, y, l.opts.strictNumbers, Ss.DataType.Wrong), w = t.const("indices", (0, Ee._)`{}`);
      t.for((0, Ee._)`;${E}--;`, () => {
        t.let(y, (0, Ee._)`${r}[${E}]`), t.if(m, (0, Ee._)`continue`), d.length > 1 && t.if((0, Ee._)`typeof ${y} == "string"`, (0, Ee._)`${y} += "_"`), t.if((0, Ee._)`typeof ${w}[${y}] == "number"`, () => {
          t.assign(_, (0, Ee._)`${w}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ee._)`${w}[${y}] = ${E}`);
      });
    }
    function g(E, _) {
      const y = (0, r_.useFunc)(t, n_.default), m = t.name("outer");
      t.label(m).for((0, Ee._)`;${E}--;`, () => t.for((0, Ee._)`${_} = ${E}; ${_}--;`, () => t.if((0, Ee._)`${y}(${r}[${E}], ${r}[${_}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
Io.default = a_;
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
const Ws = Z, o_ = L, i_ = sn, c_ = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Ws._)`{allowedValue: ${e}}`
}, l_ = {
  keyword: "const",
  $data: !0,
  error: c_,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Ws._)`!${(0, o_.useFunc)(t, i_.default)}(${r}, ${s})`) : e.fail((0, Ws._)`${a} !== ${r}`);
  }
};
jo.default = l_;
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
const zr = Z, u_ = L, d_ = sn, f_ = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, zr._)`{allowedValues: ${e}}`
}, h_ = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: f_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: o } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= o.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, u_.useFunc)(t, d_.default));
    let u;
    if (l || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const g = t.const("vSchema", a);
      u = (0, zr.or)(...s.map((E, _) => P(g, _)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (g) => t.if((0, zr._)`${d()}(${r}, ${g})`, () => t.assign(u, !0).break()));
    }
    function P(g, E) {
      const _ = s[E];
      return typeof _ == "object" && _ !== null ? (0, zr._)`${d()}(${r}, ${g}[${E}])` : (0, zr._)`${r} === ${_}`;
    }
  }
};
Ao.default = h_;
Object.defineProperty(wo, "__esModule", { value: !0 });
const m_ = Eo, p_ = So, $_ = bo, y_ = No, g_ = Oo, __ = Ro, v_ = To, w_ = Io, E_ = jo, S_ = Ao, b_ = [
  // number
  m_.default,
  p_.default,
  // string
  $_.default,
  y_.default,
  // object
  g_.default,
  __.default,
  // array
  v_.default,
  w_.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  E_.default,
  S_.default
];
wo.default = b_;
var ko = {}, Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.validateAdditionalItems = void 0;
const Qt = Z, Js = L, P_ = {
  message: ({ params: { len: e } }) => (0, Qt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Qt._)`{limit: ${e}}`
}, N_ = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: P_,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Js.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Nu(e, n);
  }
};
function Nu(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: o } = e;
  o.items = !0;
  const l = r.const("len", (0, Qt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Qt._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Js.alwaysValidSchema)(o, n)) {
    const d = r.var("valid", (0, Qt._)`${l} <= ${t.length}`);
    r.if((0, Qt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: Js.Type.Num }, d), o.allErrors || r.if((0, Qt.not)(d), () => r.break());
    });
  }
}
Rr.validateAdditionalItems = Nu;
Rr.default = N_;
var Co = {}, Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.validateTuple = void 0;
const Gi = Z, Cn = L, O_ = ee, R_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Ou(e, "additionalItems", t);
    r.items = !0, !(0, Cn.alwaysValidSchema)(r, t) && e.ok((0, O_.validateArray)(e));
  }
};
function Ou(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: o, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = Cn.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), d = n.const("len", (0, Gi._)`${a}.length`);
  r.forEach((h, P) => {
    (0, Cn.alwaysValidSchema)(l, h) || (n.if((0, Gi._)`${d} > ${P}`, () => e.subschema({
      keyword: o,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function u(h) {
    const { opts: P, errSchemaPath: g } = l, E = r.length, _ = E === h.minItems && (E === h.maxItems || h[t] === !1);
    if (P.strictTuples && !_) {
      const y = `"${o}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${g}"`;
      (0, Cn.checkStrictMode)(l, y, P.strictTuples);
    }
  }
}
Tr.validateTuple = Ou;
Tr.default = R_;
Object.defineProperty(Co, "__esModule", { value: !0 });
const T_ = Tr, I_ = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, T_.validateTuple)(e, "items")
};
Co.default = I_;
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
const Hi = Z, j_ = L, A_ = ee, k_ = Rr, C_ = {
  message: ({ params: { len: e } }) => (0, Hi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Hi._)`{limit: ${e}}`
}, D_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: C_,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, j_.alwaysValidSchema)(n, t) && (s ? (0, k_.validateAdditionalItems)(e, s) : e.ok((0, A_.validateArray)(e)));
  }
};
Do.default = D_;
var Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
const He = Z, yn = L, M_ = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He.str)`must contain at least ${e} valid item(s)` : (0, He.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He._)`{minContains: ${e}}` : (0, He._)`{minContains: ${e}, maxContains: ${t}}`
}, L_ = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: M_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let o, l;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (o = c === void 0 ? 1 : c, l = d) : o = 1;
    const u = t.const("len", (0, He._)`${s}.length`);
    if (e.setParams({ min: o, max: l }), l === void 0 && o === 0) {
      (0, yn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && o > l) {
      (0, yn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, yn.alwaysValidSchema)(a, r)) {
      let _ = (0, He._)`${u} >= ${o}`;
      l !== void 0 && (_ = (0, He._)`${_} && ${u} <= ${l}`), e.pass(_);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    l === void 0 && o === 1 ? g(h, () => t.if(h, () => t.break())) : o === 0 ? (t.let(h, !0), l !== void 0 && t.if((0, He._)`${s}.length > 0`, P)) : (t.let(h, !1), P()), e.result(h, () => e.reset());
    function P() {
      const _ = t.name("_valid"), y = t.let("count", 0);
      g(_, () => t.if(_, () => E(y)));
    }
    function g(_, y) {
      t.forRange("i", 0, u, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: yn.Type.Num,
          compositeRule: !0
        }, _), y();
      });
    }
    function E(_) {
      t.code((0, He._)`${_}++`), l === void 0 ? t.if((0, He._)`${_} >= ${o}`, () => t.assign(h, !0).break()) : (t.if((0, He._)`${_} > ${l}`, () => t.assign(h, !1).break()), o === 1 ? t.assign(h, !0) : t.if((0, He._)`${_} >= ${o}`, () => t.assign(h, !0)));
    }
  }
};
Mo.default = L_;
var Ru = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Z, r = L, n = ee;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${c},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, u] = a(c);
      o(c, d), l(c, u);
    }
  };
  function a({ schema: c }) {
    const d = {}, u = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const P = Array.isArray(c[h]) ? d : u;
      P[h] = c[h];
    }
    return [d, u];
  }
  function o(c, d = c.schema) {
    const { gen: u, data: h, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const g = u.let("missing");
    for (const E in d) {
      const _ = d[E];
      if (_.length === 0)
        continue;
      const y = (0, n.propertyInData)(u, h, E, P.opts.ownProperties);
      c.setParams({
        property: E,
        depsCount: _.length,
        deps: _.join(", ")
      }), P.allErrors ? u.if(y, () => {
        for (const m of _)
          (0, n.checkReportMissingProp)(c, m);
      }) : (u.if((0, t._)`${y} && (${(0, n.checkMissingProp)(c, _, g)})`), (0, n.reportMissingProp)(c, g), u.else());
    }
  }
  e.validatePropertyDeps = o;
  function l(c, d = c.schema) {
    const { gen: u, data: h, keyword: P, it: g } = c, E = u.name("valid");
    for (const _ in d)
      (0, r.alwaysValidSchema)(g, d[_]) || (u.if(
        (0, n.propertyInData)(u, h, _, g.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: P, schemaProp: _ }, E);
          c.mergeValidEvaluated(y, E);
        },
        () => u.var(E, !0)
        // TODO var
      ), c.ok(E));
  }
  e.validateSchemaDeps = l, e.default = s;
})(Ru);
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
const Tu = Z, F_ = L, V_ = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Tu._)`{propertyName: ${e.propertyName}}`
}, z_ = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: V_,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, F_.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, a), t.if((0, Tu.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Lo.default = z_;
var os = {};
Object.defineProperty(os, "__esModule", { value: !0 });
const gn = ee, Ye = Z, U_ = ft, _n = L, q_ = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ye._)`{additionalProperty: ${e.additionalProperty}}`
}, K_ = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: q_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: o } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = o;
    if (o.props = !0, c.removeAdditional !== "all" && (0, _n.alwaysValidSchema)(o, r))
      return;
    const d = (0, gn.allSchemaProperties)(n.properties), u = (0, gn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Ye._)`${a} === ${U_.default.errors}`);
    function h() {
      t.forIn("key", s, (y) => {
        !d.length && !u.length ? E(y) : t.if(P(y), () => E(y));
      });
    }
    function P(y) {
      let m;
      if (d.length > 8) {
        const w = (0, _n.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, gn.isOwnProperty)(t, w, y);
      } else d.length ? m = (0, Ye.or)(...d.map((w) => (0, Ye._)`${y} === ${w}`)) : m = Ye.nil;
      return u.length && (m = (0, Ye.or)(m, ...u.map((w) => (0, Ye._)`${(0, gn.usePattern)(e, w)}.test(${y})`))), (0, Ye.not)(m);
    }
    function g(y) {
      t.code((0, Ye._)`delete ${s}[${y}]`);
    }
    function E(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        g(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, _n.alwaysValidSchema)(o, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? (_(y, m, !1), t.if((0, Ye.not)(m), () => {
          e.reset(), g(y);
        })) : (_(y, m), l || t.if((0, Ye.not)(m), () => t.break()));
      }
    }
    function _(y, m, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: _n.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, m);
    }
  }
};
os.default = K_;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const G_ = et, Bi = ee, bs = L, Wi = os, H_ = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Wi.default.code(new G_.KeywordCxt(a, Wi.default, "additionalProperties"));
    const o = (0, Bi.allSchemaProperties)(r);
    for (const h of o)
      a.definedProperties.add(h);
    a.opts.unevaluated && o.length && a.props !== !0 && (a.props = bs.mergeEvaluated.props(t, (0, bs.toHash)(o), a.props));
    const l = o.filter((h) => !(0, bs.alwaysValidSchema)(a, r[h]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const h of l)
      d(h) ? u(h) : (t.if((0, Bi.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, c);
    }
  }
};
Fo.default = H_;
var Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
const Ji = ee, vn = Z, Xi = L, Yi = L, B_ = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: o } = a, l = (0, Ji.allSchemaProperties)(r), c = l.filter((_) => (0, Xi.alwaysValidSchema)(a, r[_]));
    if (l.length === 0 || c.length === l.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = o.strictSchema && !o.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof vn.Name) && (a.props = (0, Yi.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    P();
    function P() {
      for (const _ of l)
        d && g(_), a.allErrors ? E(_) : (t.var(u, !0), E(_), t.if(u));
    }
    function g(_) {
      for (const y in d)
        new RegExp(_).test(y) && (0, Xi.checkStrictMode)(a, `property ${y} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function E(_) {
      t.forIn("key", n, (y) => {
        t.if((0, vn._)`${(0, Ji.usePattern)(e, _)}.test(${y})`, () => {
          const m = c.includes(_);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: y,
            dataPropType: Yi.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, vn._)`${h}[${y}]`, !0) : !m && !a.allErrors && t.if((0, vn.not)(u), () => t.break());
        });
      });
    }
  }
};
Vo.default = B_;
var zo = {};
Object.defineProperty(zo, "__esModule", { value: !0 });
const W_ = L, J_ = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, W_.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
zo.default = J_;
var Uo = {};
Object.defineProperty(Uo, "__esModule", { value: !0 });
const X_ = ee, Y_ = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: X_.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Uo.default = Y_;
var qo = {};
Object.defineProperty(qo, "__esModule", { value: !0 });
const Dn = Z, Q_ = L, Z_ = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Dn._)`{passingSchemas: ${e.passing}}`
}, x_ = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Z_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, o = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(d), e.result(o, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let P;
        (0, Q_.alwaysValidSchema)(s, u) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, Dn._)`${c} && ${o}`).assign(o, !1).assign(l, (0, Dn._)`[${l}, ${h}]`).else(), t.if(c, () => {
          t.assign(o, !0), t.assign(l, h), P && e.mergeEvaluated(P, Dn.Name);
        });
      });
    }
  }
};
qo.default = x_;
var Ko = {};
Object.defineProperty(Ko, "__esModule", { value: !0 });
const e0 = L, t0 = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, o) => {
      if ((0, e0.alwaysValidSchema)(n, a))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: o }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
Ko.default = t0;
var Go = {};
Object.defineProperty(Go, "__esModule", { value: !0 });
const Bn = Z, Iu = L, r0 = {
  message: ({ params: e }) => (0, Bn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Bn._)`{failingKeyword: ${e.ifClause}}`
}, n0 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: r0,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Iu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Qi(n, "then"), a = Qi(n, "else");
    if (!s && !a)
      return;
    const o = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, d("then", u), d("else", u));
    } else s ? t.if(l, d("then")) : t.if((0, Bn.not)(l), d("else"));
    e.pass(o, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const P = e.subschema({ keyword: u }, l);
        t.assign(o, l), e.mergeValidEvaluated(P, o), h ? t.assign(h, (0, Bn._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Qi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Iu.alwaysValidSchema)(e, r);
}
Go.default = n0;
var Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
const s0 = L, a0 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, s0.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Ho.default = a0;
Object.defineProperty(ko, "__esModule", { value: !0 });
const o0 = Rr, i0 = Co, c0 = Tr, l0 = Do, u0 = Mo, d0 = Ru, f0 = Lo, h0 = os, m0 = Fo, p0 = Vo, $0 = zo, y0 = Uo, g0 = qo, _0 = Ko, v0 = Go, w0 = Ho;
function E0(e = !1) {
  const t = [
    // any
    $0.default,
    y0.default,
    g0.default,
    _0.default,
    v0.default,
    w0.default,
    // object
    f0.default,
    h0.default,
    d0.default,
    m0.default,
    p0.default
  ];
  return e ? t.push(i0.default, l0.default) : t.push(o0.default, c0.default), t.push(u0.default), t;
}
ko.default = E0;
var Bo = {}, Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
const ye = Z, S0 = {
  message: ({ schemaCode: e }) => (0, ye.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ye._)`{format: ${e}}`
}, b0 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: S0,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: o, it: l } = e, { opts: c, errSchemaPath: d, schemaEnv: u, self: h } = l;
    if (!c.validateFormats)
      return;
    s ? P() : g();
    function P() {
      const E = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), _ = r.const("fDef", (0, ye._)`${E}[${o}]`), y = r.let("fType"), m = r.let("format");
      r.if((0, ye._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => r.assign(y, (0, ye._)`${_}.type || "string"`).assign(m, (0, ye._)`${_}.validate`), () => r.assign(y, (0, ye._)`"string"`).assign(m, _)), e.fail$data((0, ye.or)(w(), N()));
      function w() {
        return c.strictSchema === !1 ? ye.nil : (0, ye._)`${o} && !${m}`;
      }
      function N() {
        const R = u.$async ? (0, ye._)`(${_}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, ye._)`${m}(${n})`, I = (0, ye._)`(typeof ${m} == "function" ? ${R} : ${m}.test(${n}))`;
        return (0, ye._)`${m} && ${m} !== true && ${y} === ${t} && !${I}`;
      }
    }
    function g() {
      const E = h.formats[a];
      if (!E) {
        w();
        return;
      }
      if (E === !0)
        return;
      const [_, y, m] = N(E);
      _ === t && e.pass(R());
      function w() {
        if (c.strictSchema === !1) {
          h.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const U = I instanceof RegExp ? (0, ye.regexpCode)(I) : c.code.formats ? (0, ye._)`${c.code.formats}${(0, ye.getProperty)(a)}` : void 0, B = r.scopeValue("formats", { key: a, ref: I, code: U });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, ye._)`${B}.validate`] : ["string", I, B];
      }
      function R() {
        if (typeof E == "object" && !(E instanceof RegExp) && E.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, ye._)`await ${m}(${n})`;
        }
        return typeof y == "function" ? (0, ye._)`${m}(${n})` : (0, ye._)`${m}.test(${n})`;
      }
    }
  }
};
Wo.default = b0;
Object.defineProperty(Bo, "__esModule", { value: !0 });
const P0 = Wo, N0 = [P0.default];
Bo.default = N0;
var Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.contentVocabulary = Sr.metadataVocabulary = void 0;
Sr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Sr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(go, "__esModule", { value: !0 });
const O0 = _o, R0 = wo, T0 = ko, I0 = Bo, Zi = Sr, j0 = [
  O0.default,
  R0.default,
  (0, T0.default)(),
  I0.default,
  Zi.metadataVocabulary,
  Zi.contentVocabulary
];
go.default = j0;
var Jo = {}, is = {};
Object.defineProperty(is, "__esModule", { value: !0 });
is.DiscrError = void 0;
var xi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(xi || (is.DiscrError = xi = {}));
Object.defineProperty(Jo, "__esModule", { value: !0 });
const dr = Z, Xs = is, ec = Ve, A0 = Or, k0 = L, C0 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Xs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, dr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, D0 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: C0,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: o } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, dr._)`${r}${(0, dr.getProperty)(l)}`);
    t.if((0, dr._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: Xs.DiscrError.Tag, tag: d, tagName: l })), e.ok(c);
    function u() {
      const g = P();
      t.if(!1);
      for (const E in g)
        t.elseIf((0, dr._)`${d} === ${E}`), t.assign(c, h(g[E]));
      t.else(), e.error(!1, { discrError: Xs.DiscrError.Mapping, tag: d, tagName: l }), t.endIf();
    }
    function h(g) {
      const E = t.name("valid"), _ = e.subschema({ keyword: "oneOf", schemaProp: g }, E);
      return e.mergeEvaluated(_, dr.Name), E;
    }
    function P() {
      var g;
      const E = {}, _ = m(s);
      let y = !0;
      for (let R = 0; R < o.length; R++) {
        let I = o[R];
        if (I != null && I.$ref && !(0, k0.schemaHasRulesButRef)(I, a.self.RULES)) {
          const B = I.$ref;
          if (I = ec.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, B), I instanceof ec.SchemaEnv && (I = I.schema), I === void 0)
            throw new A0.default(a.opts.uriResolver, a.baseId, B);
        }
        const U = (g = I == null ? void 0 : I.properties) === null || g === void 0 ? void 0 : g[l];
        if (typeof U != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        y = y && (_ || m(I)), w(U, R);
      }
      if (!y)
        throw new Error(`discriminator: "${l}" must be required`);
      return E;
      function m({ required: R }) {
        return Array.isArray(R) && R.includes(l);
      }
      function w(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const U of R.enum)
            N(U, I);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in E)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        E[R] = I;
      }
    }
  }
};
Jo.default = D0;
const M0 = "http://json-schema.org/draft-07/schema#", L0 = "http://json-schema.org/draft-07/schema#", F0 = "Core schema meta-schema", V0 = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, z0 = [
  "object",
  "boolean"
], U0 = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, q0 = {
  $schema: M0,
  $id: L0,
  title: F0,
  definitions: V0,
  type: z0,
  properties: U0,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Gl, n = go, s = Jo, a = q0, o = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(a, o) : a;
      this.addMetaSchema(E, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = et;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = Z;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var h = nn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var P = Or;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(qs, qs.exports);
var K0 = qs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = K0, r = Z, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: l, schemaCode: c }) => r.str`should be ${s[l].okStr} ${c}`,
    params: ({ keyword: l, schemaCode: c }) => r._`{comparison: ${s[l].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(l) {
      const { gen: c, data: d, schemaCode: u, keyword: h, it: P } = l, { opts: g, self: E } = P;
      if (!g.validateFormats)
        return;
      const _ = new t.KeywordCxt(P, E.RULES.all.format.definition, "format");
      _.$data ? y() : m();
      function y() {
        const N = c.scopeValue("formats", {
          ref: E.formats,
          code: g.code.formats
        }), R = c.const("fmt", r._`${N}[${_.schemaCode}]`);
        l.fail$data(r.or(r._`typeof ${R} != "object"`, r._`${R} instanceof RegExp`, r._`typeof ${R}.compare != "function"`, w(R)));
      }
      function m() {
        const N = _.schema, R = E.formats[N];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${h}": format "${N}" does not define "compare" function`);
        const I = c.scopeValue("formats", {
          key: N,
          ref: R,
          code: g.code.formats ? r._`${g.code.formats}${r.getProperty(N)}` : void 0
        });
        l.fail$data(w(I));
      }
      function w(N) {
        return r._`${N}.compare(${d}, ${u}) ${s[h].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const o = (l) => (l.addKeyword(e.formatLimitDefinition), l);
  e.default = o;
})(Kl);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = ql, n = Kl, s = Z, a = new s.Name("fullFormats"), o = new s.Name("fastFormats"), l = (d, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return c(d, u, r.fullFormats, a), d;
    const [h, P] = u.mode === "fast" ? [r.fastFormats, o] : [r.fullFormats, a], g = u.formats || r.formatNames;
    return c(d, g, h, P), u.keywords && n.default(d), d;
  };
  l.get = (d, u = "full") => {
    const P = (u === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!P)
      throw new Error(`Unknown format "${d}"`);
    return P;
  };
  function c(d, u, h, P) {
    var g, E;
    (g = (E = d.opts.code).formats) !== null && g !== void 0 || (E.formats = s._`require("ajv-formats/dist/formats").${P}`);
    for (const _ of u)
      d.addFormat(_, h[_]);
  }
  e.exports = t = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
})(Us, Us.exports);
var G0 = Us.exports;
const H0 = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !B0(s, a) && n || Object.defineProperty(e, r, a);
}, B0 = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, W0 = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, J0 = (e, t) => `/* Wrapped ${e}*/
${t}`, X0 = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), Y0 = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), Q0 = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = J0.bind(null, n, t.toString());
  Object.defineProperty(s, "name", Y0), Object.defineProperty(e, "toString", { ...X0, value: s });
}, Z0 = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    H0(e, t, s, r);
  return W0(e, t), Q0(e, t, n), e;
};
var x0 = Z0;
const ev = x0;
var tv = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    before: n = !1,
    after: s = !0
  } = t;
  if (!n && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let a, o;
  const l = function(...c) {
    const d = this, u = () => {
      a = void 0, s && (o = e.apply(d, c));
    }, h = n && !a;
    return clearTimeout(a), a = setTimeout(u, r), h && (o = e.apply(d, c)), o;
  };
  return ev(l, e), l.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, l;
}, Ys = { exports: {} };
const rv = "2.0.0", ju = 256, nv = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, sv = 16, av = ju - 6, ov = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var cs = {
  MAX_LENGTH: ju,
  MAX_SAFE_COMPONENT_LENGTH: sv,
  MAX_SAFE_BUILD_LENGTH: av,
  MAX_SAFE_INTEGER: nv,
  RELEASE_TYPES: ov,
  SEMVER_SPEC_VERSION: rv,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const iv = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var ls = iv;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = cs, a = ls;
  t = e.exports = {};
  const o = t.re = [], l = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], u = t.t = {};
  let h = 0;
  const P = "[a-zA-Z0-9-]", g = [
    ["\\s", 1],
    ["\\d", s],
    [P, n]
  ], E = (y) => {
    for (const [m, w] of g)
      y = y.split(`${m}*`).join(`${m}{0,${w}}`).split(`${m}+`).join(`${m}{1,${w}}`);
    return y;
  }, _ = (y, m, w) => {
    const N = E(m), R = h++;
    a(y, R, m), u[y] = R, c[R] = m, d[R] = N, o[R] = new RegExp(m, w ? "g" : void 0), l[R] = new RegExp(N, w ? "g" : void 0);
  };
  _("NUMERICIDENTIFIER", "0|[1-9]\\d*"), _("NUMERICIDENTIFIERLOOSE", "\\d+"), _("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${P}*`), _("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), _("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASEIDENTIFIER", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), _("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), _("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), _("BUILDIDENTIFIER", `${P}+`), _("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), _("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), _("FULL", `^${c[u.FULLPLAIN]}$`), _("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), _("LOOSE", `^${c[u.LOOSEPLAIN]}$`), _("GTLT", "((?:<|>)?=?)"), _("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), _("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), _("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), _("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), _("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), _("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), _("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), _("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), _("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), _("COERCERTL", c[u.COERCE], !0), _("COERCERTLFULL", c[u.COERCEFULL], !0), _("LONETILDE", "(?:~>?)"), _("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", _("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), _("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), _("LONECARET", "(?:\\^)"), _("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", _("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), _("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), _("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), _("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), _("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", _("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), _("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), _("STAR", "(<|>)?=?\\s*\\*"), _("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), _("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Ys, Ys.exports);
var an = Ys.exports;
const cv = Object.freeze({ loose: !0 }), lv = Object.freeze({}), uv = (e) => e ? typeof e != "object" ? cv : e : lv;
var Xo = uv;
const tc = /^[0-9]+$/, Au = (e, t) => {
  const r = tc.test(e), n = tc.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, dv = (e, t) => Au(t, e);
var ku = {
  compareIdentifiers: Au,
  rcompareIdentifiers: dv
};
const wn = ls, { MAX_LENGTH: rc, MAX_SAFE_INTEGER: En } = cs, { safeRe: Sn, t: bn } = an, fv = Xo, { compareIdentifiers: lr } = ku;
let hv = class nt {
  constructor(t, r) {
    if (r = fv(r), t instanceof nt) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > rc)
      throw new TypeError(
        `version is longer than ${rc} characters`
      );
    wn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Sn[bn.LOOSE] : Sn[bn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > En || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > En || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > En || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < En)
          return a;
      }
      return s;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (wn("SemVer.compare", this.version, this.options, t), !(t instanceof nt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new nt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof nt || (t = new nt(t, this.options)), lr(this.major, t.major) || lr(this.minor, t.minor) || lr(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof nt || (t = new nt(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (wn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return lr(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof nt || (t = new nt(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (wn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return lr(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? Sn[bn.PRERELEASELOOSE] : Sn[bn.PRERELEASE]);
        if (!s || s[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const s = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [s];
        else {
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(s);
          }
        }
        if (r) {
          let a = [r, s];
          n === !1 && (a = [r]), lr(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ce = hv;
const nc = Ce, mv = (e, t, r = !1) => {
  if (e instanceof nc)
    return e;
  try {
    return new nc(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Ir = mv;
const pv = Ir, $v = (e, t) => {
  const r = pv(e, t);
  return r ? r.version : null;
};
var yv = $v;
const gv = Ir, _v = (e, t) => {
  const r = gv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var vv = _v;
const sc = Ce, wv = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new sc(
      e instanceof sc ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var Ev = wv;
const ac = Ir, Sv = (e, t) => {
  const r = ac(e, null, !0), n = ac(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, o = a ? r : n, l = a ? n : r, c = !!o.prerelease.length;
  if (!!l.prerelease.length && !c) {
    if (!l.patch && !l.minor)
      return "major";
    if (l.compareMain(o) === 0)
      return l.minor && !l.patch ? "minor" : "patch";
  }
  const u = c ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var bv = Sv;
const Pv = Ce, Nv = (e, t) => new Pv(e, t).major;
var Ov = Nv;
const Rv = Ce, Tv = (e, t) => new Rv(e, t).minor;
var Iv = Tv;
const jv = Ce, Av = (e, t) => new jv(e, t).patch;
var kv = Av;
const Cv = Ir, Dv = (e, t) => {
  const r = Cv(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Mv = Dv;
const oc = Ce, Lv = (e, t, r) => new oc(e, r).compare(new oc(t, r));
var tt = Lv;
const Fv = tt, Vv = (e, t, r) => Fv(t, e, r);
var zv = Vv;
const Uv = tt, qv = (e, t) => Uv(e, t, !0);
var Kv = qv;
const ic = Ce, Gv = (e, t, r) => {
  const n = new ic(e, r), s = new ic(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Yo = Gv;
const Hv = Yo, Bv = (e, t) => e.sort((r, n) => Hv(r, n, t));
var Wv = Bv;
const Jv = Yo, Xv = (e, t) => e.sort((r, n) => Jv(n, r, t));
var Yv = Xv;
const Qv = tt, Zv = (e, t, r) => Qv(e, t, r) > 0;
var us = Zv;
const xv = tt, ew = (e, t, r) => xv(e, t, r) < 0;
var Qo = ew;
const tw = tt, rw = (e, t, r) => tw(e, t, r) === 0;
var Cu = rw;
const nw = tt, sw = (e, t, r) => nw(e, t, r) !== 0;
var Du = sw;
const aw = tt, ow = (e, t, r) => aw(e, t, r) >= 0;
var Zo = ow;
const iw = tt, cw = (e, t, r) => iw(e, t, r) <= 0;
var xo = cw;
const lw = Cu, uw = Du, dw = us, fw = Zo, hw = Qo, mw = xo, pw = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return lw(e, r, n);
    case "!=":
      return uw(e, r, n);
    case ">":
      return dw(e, r, n);
    case ">=":
      return fw(e, r, n);
    case "<":
      return hw(e, r, n);
    case "<=":
      return mw(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Mu = pw;
const $w = Ce, yw = Ir, { safeRe: Pn, t: Nn } = an, gw = (e, t) => {
  if (e instanceof $w)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Pn[Nn.COERCEFULL] : Pn[Nn.COERCE]);
  else {
    const c = t.includePrerelease ? Pn[Nn.COERCERTLFULL] : Pn[Nn.COERCERTL];
    let d;
    for (; (d = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), c.lastIndex = d.index + d[1].length + d[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", o = t.includePrerelease && r[5] ? `-${r[5]}` : "", l = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return yw(`${n}.${s}.${a}${o}${l}`, t);
};
var _w = gw;
class vw {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const s = this.map.keys().next().value;
        this.delete(s);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var ww = vw, Ps, cc;
function rt() {
  if (cc) return Ps;
  cc = 1;
  const e = /\s+/g;
  class t {
    constructor(k, z) {
      if (z = s(z), k instanceof t)
        return k.loose === !!z.loose && k.includePrerelease === !!z.includePrerelease ? k : new t(k.raw, z);
      if (k instanceof a)
        return this.raw = k.value, this.set = [[k]], this.formatted = void 0, this;
      if (this.options = z, this.loose = !!z.loose, this.includePrerelease = !!z.includePrerelease, this.raw = k.trim().replace(e, " "), this.set = this.raw.split("||").map((D) => this.parseRange(D.trim())).filter((D) => D.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const D = this.set[0];
        if (this.set = this.set.filter((O) => !_(O[0])), this.set.length === 0)
          this.set = [D];
        else if (this.set.length > 1) {
          for (const O of this.set)
            if (O.length === 1 && y(O[0])) {
              this.set = [O];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let k = 0; k < this.set.length; k++) {
          k > 0 && (this.formatted += "||");
          const z = this.set[k];
          for (let D = 0; D < z.length; D++)
            D > 0 && (this.formatted += " "), this.formatted += z[D].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(k) {
      const D = ((this.options.includePrerelease && g) | (this.options.loose && E)) + ":" + k, O = n.get(D);
      if (O)
        return O;
      const T = this.options.loose, v = T ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      k = k.replace(v, Q(this.options.includePrerelease)), o("hyphen replace", k), k = k.replace(c[d.COMPARATORTRIM], u), o("comparator trim", k), k = k.replace(c[d.TILDETRIM], h), o("tilde trim", k), k = k.replace(c[d.CARETTRIM], P), o("caret trim", k);
      let p = k.split(" ").map((f) => w(f, this.options)).join(" ").split(/\s+/).map((f) => se(f, this.options));
      T && (p = p.filter((f) => (o("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), o("range list", p);
      const S = /* @__PURE__ */ new Map(), $ = p.map((f) => new a(f, this.options));
      for (const f of $) {
        if (_(f))
          return [f];
        S.set(f.value, f);
      }
      S.size > 1 && S.has("") && S.delete("");
      const i = [...S.values()];
      return n.set(D, i), i;
    }
    intersects(k, z) {
      if (!(k instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((D) => m(D, z) && k.set.some((O) => m(O, z) && D.every((T) => O.every((v) => T.intersects(v, z)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(k) {
      if (!k)
        return !1;
      if (typeof k == "string")
        try {
          k = new l(k, this.options);
        } catch {
          return !1;
        }
      for (let z = 0; z < this.set.length; z++)
        if (fe(this.set[z], k, this.options))
          return !0;
      return !1;
    }
  }
  Ps = t;
  const r = ww, n = new r(), s = Xo, a = ds(), o = ls, l = Ce, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: u,
    tildeTrimReplace: h,
    caretTrimReplace: P
  } = an, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: E } = cs, _ = (C) => C.value === "<0.0.0-0", y = (C) => C.value === "", m = (C, k) => {
    let z = !0;
    const D = C.slice();
    let O = D.pop();
    for (; z && D.length; )
      z = D.every((T) => O.intersects(T, k)), O = D.pop();
    return z;
  }, w = (C, k) => (o("comp", C, k), C = U(C, k), o("caret", C), C = R(C, k), o("tildes", C), C = de(C, k), o("xrange", C), C = H(C, k), o("stars", C), C), N = (C) => !C || C.toLowerCase() === "x" || C === "*", R = (C, k) => C.trim().split(/\s+/).map((z) => I(z, k)).join(" "), I = (C, k) => {
    const z = k.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return C.replace(z, (D, O, T, v, p) => {
      o("tilde", C, D, O, T, v, p);
      let S;
      return N(O) ? S = "" : N(T) ? S = `>=${O}.0.0 <${+O + 1}.0.0-0` : N(v) ? S = `>=${O}.${T}.0 <${O}.${+T + 1}.0-0` : p ? (o("replaceTilde pr", p), S = `>=${O}.${T}.${v}-${p} <${O}.${+T + 1}.0-0`) : S = `>=${O}.${T}.${v} <${O}.${+T + 1}.0-0`, o("tilde return", S), S;
    });
  }, U = (C, k) => C.trim().split(/\s+/).map((z) => B(z, k)).join(" "), B = (C, k) => {
    o("caret", C, k);
    const z = k.loose ? c[d.CARETLOOSE] : c[d.CARET], D = k.includePrerelease ? "-0" : "";
    return C.replace(z, (O, T, v, p, S) => {
      o("caret", C, O, T, v, p, S);
      let $;
      return N(T) ? $ = "" : N(v) ? $ = `>=${T}.0.0${D} <${+T + 1}.0.0-0` : N(p) ? T === "0" ? $ = `>=${T}.${v}.0${D} <${T}.${+v + 1}.0-0` : $ = `>=${T}.${v}.0${D} <${+T + 1}.0.0-0` : S ? (o("replaceCaret pr", S), T === "0" ? v === "0" ? $ = `>=${T}.${v}.${p}-${S} <${T}.${v}.${+p + 1}-0` : $ = `>=${T}.${v}.${p}-${S} <${T}.${+v + 1}.0-0` : $ = `>=${T}.${v}.${p}-${S} <${+T + 1}.0.0-0`) : (o("no pr"), T === "0" ? v === "0" ? $ = `>=${T}.${v}.${p}${D} <${T}.${v}.${+p + 1}-0` : $ = `>=${T}.${v}.${p}${D} <${T}.${+v + 1}.0-0` : $ = `>=${T}.${v}.${p} <${+T + 1}.0.0-0`), o("caret return", $), $;
    });
  }, de = (C, k) => (o("replaceXRanges", C, k), C.split(/\s+/).map((z) => V(z, k)).join(" ")), V = (C, k) => {
    C = C.trim();
    const z = k.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return C.replace(z, (D, O, T, v, p, S) => {
      o("xRange", C, D, O, T, v, p, S);
      const $ = N(T), i = $ || N(v), f = i || N(p), b = f;
      return O === "=" && b && (O = ""), S = k.includePrerelease ? "-0" : "", $ ? O === ">" || O === "<" ? D = "<0.0.0-0" : D = "*" : O && b ? (i && (v = 0), p = 0, O === ">" ? (O = ">=", i ? (T = +T + 1, v = 0, p = 0) : (v = +v + 1, p = 0)) : O === "<=" && (O = "<", i ? T = +T + 1 : v = +v + 1), O === "<" && (S = "-0"), D = `${O + T}.${v}.${p}${S}`) : i ? D = `>=${T}.0.0${S} <${+T + 1}.0.0-0` : f && (D = `>=${T}.${v}.0${S} <${T}.${+v + 1}.0-0`), o("xRange return", D), D;
    });
  }, H = (C, k) => (o("replaceStars", C, k), C.trim().replace(c[d.STAR], "")), se = (C, k) => (o("replaceGTE0", C, k), C.trim().replace(c[k.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (C) => (k, z, D, O, T, v, p, S, $, i, f, b) => (N(D) ? z = "" : N(O) ? z = `>=${D}.0.0${C ? "-0" : ""}` : N(T) ? z = `>=${D}.${O}.0${C ? "-0" : ""}` : v ? z = `>=${z}` : z = `>=${z}${C ? "-0" : ""}`, N($) ? S = "" : N(i) ? S = `<${+$ + 1}.0.0-0` : N(f) ? S = `<${$}.${+i + 1}.0-0` : b ? S = `<=${$}.${i}.${f}-${b}` : C ? S = `<${$}.${i}.${+f + 1}-0` : S = `<=${S}`, `${z} ${S}`.trim()), fe = (C, k, z) => {
    for (let D = 0; D < C.length; D++)
      if (!C[D].test(k))
        return !1;
    if (k.prerelease.length && !z.includePrerelease) {
      for (let D = 0; D < C.length; D++)
        if (o(C[D].semver), C[D].semver !== a.ANY && C[D].semver.prerelease.length > 0) {
          const O = C[D].semver;
          if (O.major === k.major && O.minor === k.minor && O.patch === k.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ps;
}
var Ns, lc;
function ds() {
  if (lc) return Ns;
  lc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(u, h) {
      if (h = r(h), u instanceof t) {
        if (u.loose === !!h.loose)
          return u;
        u = u.value;
      }
      u = u.trim().split(/\s+/).join(" "), o("comparator", u, h), this.options = h, this.loose = !!h.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(u) {
      const h = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], P = u.match(h);
      if (!P)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = P[1] !== void 0 ? P[1] : "", this.operator === "=" && (this.operator = ""), P[2] ? this.semver = new l(P[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (o("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new l(u, this.options);
        } catch {
          return !1;
        }
      return a(u, this.operator, this.semver, this.options);
    }
    intersects(u, h) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(u.value, h).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new c(this.value, h).test(u.semver) : (h = r(h), h.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || a(this.semver, "<", u.semver, h) && this.operator.startsWith(">") && u.operator.startsWith("<") || a(this.semver, ">", u.semver, h) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  Ns = t;
  const r = Xo, { safeRe: n, t: s } = an, a = Mu, o = ls, l = Ce, c = rt();
  return Ns;
}
const Ew = rt(), Sw = (e, t, r) => {
  try {
    t = new Ew(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var fs = Sw;
const bw = rt(), Pw = (e, t) => new bw(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var Nw = Pw;
const Ow = Ce, Rw = rt(), Tw = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new Rw(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || s.compare(o) === -1) && (n = o, s = new Ow(n, r));
  }), n;
};
var Iw = Tw;
const jw = Ce, Aw = rt(), kw = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new Aw(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || s.compare(o) === 1) && (n = o, s = new jw(n, r));
  }), n;
};
var Cw = kw;
const Os = Ce, Dw = rt(), uc = us, Mw = (e, t) => {
  e = new Dw(e, t);
  let r = new Os("0.0.0");
  if (e.test(r) || (r = new Os("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((o) => {
      const l = new Os(o.semver.version);
      switch (o.operator) {
        case ">":
          l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
        case "":
        case ">=":
          (!a || uc(l, a)) && (a = l);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), a && (!r || uc(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var Lw = Mw;
const Fw = rt(), Vw = (e, t) => {
  try {
    return new Fw(e, t).range || "*";
  } catch {
    return null;
  }
};
var zw = Vw;
const Uw = Ce, Lu = ds(), { ANY: qw } = Lu, Kw = rt(), Gw = fs, dc = us, fc = Qo, Hw = xo, Bw = Zo, Ww = (e, t, r, n) => {
  e = new Uw(e, n), t = new Kw(t, n);
  let s, a, o, l, c;
  switch (r) {
    case ">":
      s = dc, a = Hw, o = fc, l = ">", c = ">=";
      break;
    case "<":
      s = fc, a = Bw, o = dc, l = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (Gw(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const u = t.set[d];
    let h = null, P = null;
    if (u.forEach((g) => {
      g.semver === qw && (g = new Lu(">=0.0.0")), h = h || g, P = P || g, s(g.semver, h.semver, n) ? h = g : o(g.semver, P.semver, n) && (P = g);
    }), h.operator === l || h.operator === c || (!P.operator || P.operator === l) && a(e, P.semver))
      return !1;
    if (P.operator === c && o(e, P.semver))
      return !1;
  }
  return !0;
};
var ei = Ww;
const Jw = ei, Xw = (e, t, r) => Jw(e, t, ">", r);
var Yw = Xw;
const Qw = ei, Zw = (e, t, r) => Qw(e, t, "<", r);
var xw = Zw;
const hc = rt(), eE = (e, t, r) => (e = new hc(e, r), t = new hc(t, r), e.intersects(t, r));
var tE = eE;
const rE = fs, nE = tt;
var sE = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const o = e.sort((u, h) => nE(u, h, r));
  for (const u of o)
    rE(u, t, r) ? (a = u, s || (s = u)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const l = [];
  for (const [u, h] of n)
    u === h ? l.push(u) : !h && u === o[0] ? l.push("*") : h ? u === o[0] ? l.push(`<=${h}`) : l.push(`${u} - ${h}`) : l.push(`>=${u}`);
  const c = l.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const mc = rt(), ti = ds(), { ANY: Rs } = ti, Lr = fs, ri = tt, aE = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new mc(e, r), t = new mc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const o = iE(s, a, r);
      if (n = n || o !== null, o)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, oE = [new ti(">=0.0.0-0")], pc = [new ti(">=0.0.0")], iE = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Rs) {
    if (t.length === 1 && t[0].semver === Rs)
      return !0;
    r.includePrerelease ? e = oE : e = pc;
  }
  if (t.length === 1 && t[0].semver === Rs) {
    if (r.includePrerelease)
      return !0;
    t = pc;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? s = $c(s, g, r) : g.operator === "<" || g.operator === "<=" ? a = yc(a, g, r) : n.add(g.semver);
  if (n.size > 1)
    return null;
  let o;
  if (s && a) {
    if (o = ri(s.semver, a.semver, r), o > 0)
      return null;
    if (o === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const g of n) {
    if (s && !Lr(g, String(s), r) || a && !Lr(g, String(a), r))
      return null;
    for (const E of t)
      if (!Lr(g, String(E), r))
        return !1;
    return !0;
  }
  let l, c, d, u, h = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, P = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  h && h.prerelease.length === 1 && a.operator === "<" && h.prerelease[0] === 0 && (h = !1);
  for (const g of t) {
    if (u = u || g.operator === ">" || g.operator === ">=", d = d || g.operator === "<" || g.operator === "<=", s) {
      if (P && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === P.major && g.semver.minor === P.minor && g.semver.patch === P.patch && (P = !1), g.operator === ">" || g.operator === ">=") {
        if (l = $c(s, g, r), l === g && l !== s)
          return !1;
      } else if (s.operator === ">=" && !Lr(s.semver, String(g), r))
        return !1;
    }
    if (a) {
      if (h && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === h.major && g.semver.minor === h.minor && g.semver.patch === h.patch && (h = !1), g.operator === "<" || g.operator === "<=") {
        if (c = yc(a, g, r), c === g && c !== a)
          return !1;
      } else if (a.operator === "<=" && !Lr(a.semver, String(g), r))
        return !1;
    }
    if (!g.operator && (a || s) && o !== 0)
      return !1;
  }
  return !(s && d && !a && o !== 0 || a && u && !s && o !== 0 || P || h);
}, $c = (e, t, r) => {
  if (!e)
    return t;
  const n = ri(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, yc = (e, t, r) => {
  if (!e)
    return t;
  const n = ri(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var cE = aE;
const Ts = an, gc = cs, lE = Ce, _c = ku, uE = Ir, dE = yv, fE = vv, hE = Ev, mE = bv, pE = Ov, $E = Iv, yE = kv, gE = Mv, _E = tt, vE = zv, wE = Kv, EE = Yo, SE = Wv, bE = Yv, PE = us, NE = Qo, OE = Cu, RE = Du, TE = Zo, IE = xo, jE = Mu, AE = _w, kE = ds(), CE = rt(), DE = fs, ME = Nw, LE = Iw, FE = Cw, VE = Lw, zE = zw, UE = ei, qE = Yw, KE = xw, GE = tE, HE = sE, BE = cE;
var WE = {
  parse: uE,
  valid: dE,
  clean: fE,
  inc: hE,
  diff: mE,
  major: pE,
  minor: $E,
  patch: yE,
  prerelease: gE,
  compare: _E,
  rcompare: vE,
  compareLoose: wE,
  compareBuild: EE,
  sort: SE,
  rsort: bE,
  gt: PE,
  lt: NE,
  eq: OE,
  neq: RE,
  gte: TE,
  lte: IE,
  cmp: jE,
  coerce: AE,
  Comparator: kE,
  Range: CE,
  satisfies: DE,
  toComparators: ME,
  maxSatisfying: LE,
  minSatisfying: FE,
  minVersion: VE,
  validRange: zE,
  outside: UE,
  gtr: qE,
  ltr: KE,
  intersects: GE,
  simplifyRange: HE,
  subset: BE,
  SemVer: lE,
  re: Ts.re,
  src: Ts.src,
  tokens: Ts.t,
  SEMVER_SPEC_VERSION: gc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: gc.RELEASE_TYPES,
  compareIdentifiers: _c.compareIdentifiers,
  rcompareIdentifiers: _c.rcompareIdentifiers
}, hs = { exports: {} }, ni = { exports: {} };
const Fu = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
ni.exports = Fu;
ni.exports.default = Fu;
var JE = ni.exports;
const XE = JE, Wn = /* @__PURE__ */ new WeakMap(), Vu = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...o) {
    if (Wn.set(a, ++n), n === 1)
      r = e.apply(this, o), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return XE(a, e), Wn.set(a, n), a;
};
hs.exports = Vu;
hs.exports.default = Vu;
hs.exports.callCount = (e) => {
  if (!Wn.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Wn.get(e);
};
var YE = hs.exports;
(function(e, t) {
  var r = on && on.__classPrivateFieldSet || function(D, O, T, v, p) {
    if (v === "m") throw new TypeError("Private method is not writable");
    if (v === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof O == "function" ? D !== O || !p : !O.has(D)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return v === "a" ? p.call(D, T) : p ? p.value = T : O.set(D, T), T;
  }, n = on && on.__classPrivateFieldGet || function(D, O, T, v) {
    if (T === "a" && !v) throw new TypeError("Private accessor was defined without a getter");
    if (typeof O == "function" ? D !== O || !v : !O.has(D)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return T === "m" ? v : T === "a" ? v.call(D) : v ? v.value : O.get(D);
  }, s, a, o, l, c, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const u = Oc, h = ta, P = sr, g = Ju, E = Xu, _ = Yu, y = nd, m = md, w = gd, N = ot, R = A$, I = G0, U = tv, B = WE, de = YE, V = "aes-256-cbc", H = () => /* @__PURE__ */ Object.create(null), se = (D) => D != null;
  let Q = "";
  try {
    delete require.cache[__filename], Q = P.dirname((a = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && a !== void 0 ? a : ".");
  } catch {
  }
  const fe = (D, O) => {
    const T = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), v = typeof O;
    if (T.has(v))
      throw new TypeError(`Setting a value of type \`${v}\` for key \`${D}\` is not allowed as it's not supported by JSON`);
  }, C = "__internal__", k = `${C}.migrations.version`;
  class z {
    constructor(O = {}) {
      var T;
      o.set(this, void 0), l.set(this, void 0), c.set(this, void 0), d.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
      const v = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...O
      }, p = de(() => {
        const f = m.sync({ cwd: Q }), b = f && JSON.parse(h.readFileSync(f, "utf8"));
        return b ?? {};
      });
      if (!v.cwd) {
        if (v.projectName || (v.projectName = p().name), !v.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        v.cwd = w(v.projectName, { suffix: v.projectSuffix }).config;
      }
      if (r(this, c, v, "f"), v.schema) {
        if (typeof v.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const f = new R.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, I.default)(f);
        const b = {
          type: "object",
          properties: v.schema
        };
        r(this, o, f.compile(b), "f");
        for (const [j, A] of Object.entries(v.schema))
          A != null && A.default && (n(this, d, "f")[j] = A.default);
      }
      v.defaults && r(this, d, {
        ...n(this, d, "f"),
        ...v.defaults
      }, "f"), v.serialize && (this._serialize = v.serialize), v.deserialize && (this._deserialize = v.deserialize), this.events = new _.EventEmitter(), r(this, l, v.encryptionKey, "f");
      const S = v.fileExtension ? `.${v.fileExtension}` : "";
      this.path = P.resolve(v.cwd, `${(T = v.configName) !== null && T !== void 0 ? T : "config"}${S}`);
      const $ = this.store, i = Object.assign(H(), v.defaults, $);
      this._validate(i);
      try {
        E.deepEqual($, i);
      } catch {
        this.store = i;
      }
      if (v.watch && this._watch(), v.migrations) {
        if (v.projectVersion || (v.projectVersion = p().version), !v.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(v.migrations, v.projectVersion, v.beforeEachMigration);
      }
    }
    get(O, T) {
      if (n(this, c, "f").accessPropertiesByDotNotation)
        return this._get(O, T);
      const { store: v } = this;
      return O in v ? v[O] : T;
    }
    set(O, T) {
      if (typeof O != "string" && typeof O != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof O}`);
      if (typeof O != "object" && T === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(O))
        throw new TypeError(`Please don't use the ${C} key, as it's used to manage this module internal operations.`);
      const { store: v } = this, p = (S, $) => {
        fe(S, $), n(this, c, "f").accessPropertiesByDotNotation ? y.set(v, S, $) : v[S] = $;
      };
      if (typeof O == "object") {
        const S = O;
        for (const [$, i] of Object.entries(S))
          p($, i);
      } else
        p(O, T);
      this.store = v;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(O) {
      return n(this, c, "f").accessPropertiesByDotNotation ? y.has(this.store, O) : O in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...O) {
      for (const T of O)
        se(n(this, d, "f")[T]) && this.set(T, n(this, d, "f")[T]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(O) {
      const { store: T } = this;
      n(this, c, "f").accessPropertiesByDotNotation ? y.delete(T, O) : delete T[O], this.store = T;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = H();
      for (const O of Object.keys(n(this, d, "f")))
        this.reset(O);
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(O, T) {
      if (typeof O != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof O}`);
      if (typeof T != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof T}`);
      return this._handleChange(() => this.get(O), T);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(O) {
      if (typeof O != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof O}`);
      return this._handleChange(() => this.store, O);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const O = h.readFileSync(this.path, n(this, l, "f") ? null : "utf8"), T = this._encryptData(O), v = this._deserialize(T);
        return this._validate(v), Object.assign(H(), v);
      } catch (O) {
        if ((O == null ? void 0 : O.code) === "ENOENT")
          return this._ensureDirectory(), H();
        if (n(this, c, "f").clearInvalidConfig && O.name === "SyntaxError")
          return H();
        throw O;
      }
    }
    set store(O) {
      this._ensureDirectory(), this._validate(O), this._write(O), this.events.emit("change");
    }
    *[(o = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [O, T] of Object.entries(this.store))
        yield [O, T];
    }
    _encryptData(O) {
      if (!n(this, l, "f"))
        return O.toString();
      try {
        if (n(this, l, "f"))
          try {
            if (O.slice(16, 17).toString() === ":") {
              const T = O.slice(0, 16), v = g.pbkdf2Sync(n(this, l, "f"), T.toString(), 1e4, 32, "sha512"), p = g.createDecipheriv(V, v, T);
              O = Buffer.concat([p.update(Buffer.from(O.slice(17))), p.final()]).toString("utf8");
            } else {
              const T = g.createDecipher(V, n(this, l, "f"));
              O = Buffer.concat([T.update(Buffer.from(O)), T.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return O.toString();
    }
    _handleChange(O, T) {
      let v = O();
      const p = () => {
        const S = v, $ = O();
        (0, u.isDeepStrictEqual)($, S) || (v = $, T.call(this, $, S));
      };
      return this.events.on("change", p), () => this.events.removeListener("change", p);
    }
    _validate(O) {
      if (!n(this, o, "f") || n(this, o, "f").call(this, O) || !n(this, o, "f").errors)
        return;
      const v = n(this, o, "f").errors.map(({ instancePath: p, message: S = "" }) => `\`${p.slice(1)}\` ${S}`);
      throw new Error("Config schema violation: " + v.join("; "));
    }
    _ensureDirectory() {
      h.mkdirSync(P.dirname(this.path), { recursive: !0 });
    }
    _write(O) {
      let T = this._serialize(O);
      if (n(this, l, "f")) {
        const v = g.randomBytes(16), p = g.pbkdf2Sync(n(this, l, "f"), v.toString(), 1e4, 32, "sha512"), S = g.createCipheriv(V, p, v);
        T = Buffer.concat([v, Buffer.from(":"), S.update(Buffer.from(T)), S.final()]);
      }
      if (process.env.SNAP)
        h.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
        } catch (v) {
          if ((v == null ? void 0 : v.code) === "EXDEV") {
            h.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
            return;
          }
          throw v;
        }
    }
    _watch() {
      this._ensureDirectory(), h.existsSync(this.path) || this._write(H()), process.platform === "win32" ? h.watch(this.path, { persistent: !1 }, U(() => {
        this.events.emit("change");
      }, { wait: 100 })) : h.watchFile(this.path, { persistent: !1 }, U(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(O, T, v) {
      let p = this._get(k, "0.0.0");
      const S = Object.keys(O).filter((i) => this._shouldPerformMigration(i, p, T));
      let $ = { ...this.store };
      for (const i of S)
        try {
          v && v(this, {
            fromVersion: p,
            toVersion: i,
            finalVersion: T,
            versions: S
          });
          const f = O[i];
          f(this), this._set(k, i), p = i, $ = { ...this.store };
        } catch (f) {
          throw this.store = $, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(p) || !B.eq(p, T)) && this._set(k, T);
    }
    _containsReservedKey(O) {
      return typeof O == "object" && Object.keys(O)[0] === C ? !0 : typeof O != "string" ? !1 : n(this, c, "f").accessPropertiesByDotNotation ? !!O.startsWith(`${C}.`) : !1;
    }
    _isVersionInRangeFormat(O) {
      return B.clean(O) === null;
    }
    _shouldPerformMigration(O, T, v) {
      return this._isVersionInRangeFormat(O) ? T !== "0.0.0" && B.satisfies(T, O) ? !1 : B.satisfies(v, O) : !(B.lte(O, T) || B.gt(O, v));
    }
    _get(O, T) {
      return y.get(this.store, O, T);
    }
    _set(O, T) {
      const { store: v } = this;
      y.set(v, O, T), this.store = v;
    }
  }
  t.default = z, e.exports = z, e.exports.default = z;
})(js, js.exports);
var QE = js.exports;
const vc = sr, { app: Mn, ipcMain: Qs, ipcRenderer: wc, shell: ZE } = Gu, xE = QE;
let Ec = !1;
const Sc = () => {
  if (!Qs || !Mn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Mn.getPath("userData"),
    appVersion: Mn.getVersion()
  };
  return Ec || (Qs.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Ec = !0), e;
};
class e1 extends xE {
  constructor(t) {
    let r, n;
    if (wc) {
      const s = wc.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else Qs && Mn && ({ defaultCwd: r, appVersion: n } = Sc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = vc.isAbsolute(t.cwd) ? t.cwd : vc.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Sc();
  }
  async openInEditor() {
    const t = await ZE.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var t1 = e1;
const r1 = /* @__PURE__ */ xu(t1), nr = Bu(import.meta.url), Zs = Ne.dirname(Wu(import.meta.url));
let xs;
try {
  xs = nr("sharp");
} catch {
  console.warn("Sharp not available for thumbnail generation");
}
let Zt = null;
var bc;
try {
  const e = nr("music-metadata");
  Zt = e.parseFile, console.log("music-metadata library loaded successfully:", typeof e, typeof Zt), Zt || (Zt = (bc = e.default) == null ? void 0 : bc.parseFile, console.log("Trying default.parseFile:", typeof Zt));
} catch (e) {
  console.warn("Music-metadata not available for audio metadata extraction:", e);
}
let Is, Jn;
try {
  Is = nr("ffmpeg-static"), Jn = nr("fluent-ffmpeg"), Is && Jn.setFfmpegPath(Is), console.log("ffmpeg library loaded successfully");
} catch (e) {
  console.warn("ffmpeg not available for video thumbnail extraction:", e);
}
process.env.APP_ROOT = Ne.join(Zs, "..");
const ea = process.env.VITE_DEV_SERVER_URL, b1 = Ne.join(process.env.APP_ROOT, "dist-electron"), zu = Ne.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = ea ? Ne.join(process.env.APP_ROOT, "public") : zu;
const Te = new r1({
  defaults: {
    downloadPath: yr.getPath("downloads"),
    autoAcceptTransfers: !1,
    theme: "light",
    windowBounds: { width: 1200, height: 800 },
    deviceName: nr("os").hostname() || "Desktop",
    folderSizeLimit: 10 * 1024 * 1024 * 1024,
    // 10GB default limit
    enableFolderSizeLimit: !1
  }
});
let ne = null;
function Uu() {
  const { width: e, height: t } = Te.get("windowBounds");
  ne = new Pc({
    width: e,
    height: t,
    minWidth: 900,
    minHeight: 600,
    icon: Ne.join(process.env.VITE_PUBLIC || Zs, "electron-vite.svg"),
    webPreferences: {
      preload: Ne.join(Zs, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    },
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 20, y: 20 },
    backgroundColor: "#f0f8ff",
    show: !1
    // Don't show until ready
  }), ne.once("ready-to-show", () => {
    ne == null || ne.show();
  }), ne.on("resize", () => {
    ne && Te.set("windowBounds", ne.getBounds());
  }), ne.on("move", () => {
    ne && Te.set("windowBounds", ne.getBounds());
  }), ne.webContents.on("did-finish-load", () => {
    ne == null || ne.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), ea ? ne.loadURL(ea) : ne.loadFile(Ne.join(zu, "index.html"));
}
yr.on("window-all-closed", () => {
  process.platform !== "darwin" && (yr.quit(), ne = null);
});
yr.on("activate", () => {
  Pc.getAllWindows().length === 0 && Uu();
});
yr.whenReady().then(() => {
  Uu();
});
ze.handle("store:get", (e, t) => Te.get(t));
ze.handle("store:set", (e, t, r) => (Te.set(t, r), !0));
ze.handle("store:delete", (e, t) => (Te.delete(t), !0));
ze.handle("fs:select-download-folder", async () => {
  if (!ne) return null;
  const e = await Hu.showOpenDialog(ne, {
    properties: ["openDirectory"],
    title: "Select Download Folder"
  });
  if (!e.canceled && e.filePaths.length > 0) {
    const t = e.filePaths[0];
    return Te.set("downloadPath", t), t;
  }
  return null;
});
ze.handle("fs:get-download-path", () => Te.get("downloadPath"));
ze.handle("fs:open-file", async (e, t) => {
  try {
    return await Nc.openPath(t), !0;
  } catch (r) {
    return console.error("Failed to open file:", r), !1;
  }
});
ze.handle("fs:show-in-folder", async (e, t) => {
  try {
    return Nc.showItemInFolder(t), !0;
  } catch (r) {
    return console.error("Failed to show file in folder:", r), !1;
  }
});
const n1 = async (e) => {
  var t, r;
  try {
    if (process.platform === "win32")
      try {
        const { exec: n } = nr("child_process"), s = Zu(n), a = Ne.parse(e).root.replace("\\", ""), { stdout: o } = await s(`wmic logicaldisk where caption="${a}" get size,freespace /value`), l = o.split(`
`).filter((u) => u.trim().includes("="));
        let c = 0, d = 0;
        for (const u of l) {
          const h = u.trim();
          h.startsWith("Size=") ? c = parseInt(h.split("=")[1]) || 0 : h.startsWith("FreeSpace=") && (d = parseInt(h.split("=")[1]) || 0);
        }
        if (c > 0)
          return { total: c, free: d, used: c - d };
      } catch (n) {
        console.log("Windows disk space detection failed:", n);
      }
    try {
      const n = await ((r = (t = ut.promises) == null ? void 0 : t.statfs) == null ? void 0 : r.call(t, e));
      if (n && n.blocks && n.frsize) {
        const s = n.blocks * n.frsize, a = n.bavail * n.frsize, o = s - a;
        if (s > 0)
          return { total: s, free: a, used: o };
      }
    } catch (n) {
      console.log("Unix disk space detection failed:", n);
    }
    return console.log("Using fallback disk space values"), {
      total: 500 * 1024 * 1024 * 1024,
      // 500GB
      free: 250 * 1024 * 1024 * 1024,
      // 250GB
      used: 250 * 1024 * 1024 * 1024
      // 250GB
    };
  } catch (n) {
    return console.error("Failed to get disk usage:", n), {
      total: 500 * 1024 * 1024 * 1024,
      free: 250 * 1024 * 1024 * 1024,
      used: 250 * 1024 * 1024 * 1024
    };
  }
}, qu = async (e) => {
  let t = 0;
  try {
    const r = await ut.promises.readdir(e, { withFileTypes: !0 });
    for (const n of r) {
      const s = Ne.join(e, n.name);
      if (n.isDirectory())
        t += await qu(s);
      else
        try {
          const a = await ut.promises.stat(s);
          t += a.size;
        } catch {
        }
    }
  } catch {
  }
  return t;
};
ze.handle("fs:get-storage-info", async () => {
  try {
    const e = Te.get("downloadPath"), t = Te.get("folderSizeLimit") || 10 * 1024 * 1024 * 1024, r = Te.get("enableFolderSizeLimit");
    console.log("Getting storage info for:", e);
    const n = await n1(e);
    console.log("Disk usage:", n);
    const s = await qu(e);
    console.log("Folder size:", s);
    const a = r && t > 0 ? Math.min(s / t * 100, 100) : 0, o = {
      drive: {
        total: n.total || 0,
        used: n.used || 0,
        free: n.free || 0
      },
      folder: {
        size: s || 0,
        limit: t,
        limitEnabled: r || !1,
        percentUsed: Math.round(a * 10) / 10
        // Round to 1 decimal place
      },
      path: e
    };
    return console.log("Storage info result:", o), o;
  } catch (e) {
    console.error("Failed to get storage info:", e);
    const t = 10 * 1024 * 1024 * 1024;
    return {
      drive: {
        total: 500 * 1024 * 1024 * 1024,
        used: 250 * 1024 * 1024 * 1024,
        free: 250 * 1024 * 1024 * 1024
      },
      folder: {
        size: 0,
        limit: Te.get("folderSizeLimit") || t,
        limitEnabled: Te.get("enableFolderSizeLimit") || !1,
        percentUsed: 0
      },
      path: Te.get("downloadPath") || yr.getPath("downloads")
    };
  }
});
ze.handle("fs:analyze-files", async () => {
  try {
    const e = Te.get("downloadPath"), t = {
      documents: { count: 0, size: 0 },
      photos: { count: 0, size: 0 },
      videos: { count: 0, size: 0 },
      sound: { count: 0, size: 0 },
      other: { count: 0, size: 0 }
    }, r = async (n) => {
      try {
        const s = await ut.promises.readdir(n, { withFileTypes: !0 });
        for (const a of s) {
          const o = Ne.join(n, a.name);
          if (a.isDirectory())
            await r(o);
          else {
            const l = await ut.promises.stat(o), c = Ne.extname(a.name).toLowerCase();
            [".pdf", ".doc", ".docx", ".txt", ".rtf"].includes(c) ? (t.documents.count++, t.documents.size += l.size) : [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"].includes(c) ? (t.photos.count++, t.photos.size += l.size) : [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"].includes(c) ? (t.videos.count++, t.videos.size += l.size) : [".mp3", ".wav", ".flac", ".aac", ".ogg"].includes(c) ? (t.sound.count++, t.sound.size += l.size) : (t.other.count++, t.other.size += l.size);
          }
        }
      } catch {
      }
    };
    return await r(e), t;
  } catch (e) {
    return console.error("Failed to analyze files:", e), {
      documents: { count: 0, size: 0 },
      photos: { count: 0, size: 0 },
      videos: { count: 0, size: 0 },
      sound: { count: 0, size: 0 },
      other: { count: 0, size: 0 }
    };
  }
});
ze.handle("fs:get-recent-files", async (e, t = 20) => {
  try {
    const r = Te.get("downloadPath"), n = [], s = async (o) => {
      try {
        const l = await ut.promises.readdir(o, { withFileTypes: !0 });
        for (const c of l) {
          const d = Ne.join(o, c.name);
          if (c.isDirectory())
            await s(d);
          else
            try {
              const u = await ut.promises.stat(d), h = Ne.extname(c.name).toLowerCase();
              if ([
                ".jpg",
                ".jpeg",
                ".png",
                ".gif",
                ".bmp",
                ".webp",
                ".svg",
                ".mp4",
                ".avi",
                ".mov",
                ".wmv",
                ".flv",
                ".webm",
                ".mkv",
                ".mp3",
                ".wav",
                ".flac",
                ".aac",
                ".ogg",
                ".m4a",
                ".pdf",
                ".doc",
                ".docx",
                ".txt",
                ".rtf"
              ].includes(h)) {
                let P = "application/octet-stream";
                [".jpg", ".jpeg"].includes(h) ? P = "image/jpeg" : h === ".png" ? P = "image/png" : h === ".gif" ? P = "image/gif" : h === ".webp" ? P = "image/webp" : [".mp4"].includes(h) ? P = "video/mp4" : [".mp3"].includes(h) ? P = "audio/mp3" : h === ".pdf" && (P = "application/pdf"), n.push({
                  id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  name: c.name,
                  type: "file",
                  size: u.size,
                  modified: u.mtime.toLocaleDateString(),
                  path: d,
                  mimeType: P
                });
              }
            } catch {
            }
        }
      } catch {
      }
    };
    await s(r), n.sort((o, l) => new Date(l.modified).getTime() - new Date(o.modified).getTime());
    const a = n.slice(0, t);
    for (const o of a) {
      console.log(`Generating thumbnail for: ${o.name}`);
      const l = await Ku(o.path);
      l ? (console.log(`Thumbnail generated for ${o.name}, length: ${l.length}`), o.thumbnail = l) : console.log(`No thumbnail generated for ${o.name}`);
    }
    return a;
  } catch (r) {
    return console.error("Failed to get recent files:", r), [];
  }
});
ze.handle("fs:generate-thumbnail", async (e, t) => {
  try {
    return await Ku(t);
  } catch (r) {
    return console.error("Failed to generate thumbnail:", r), null;
  }
});
ze.handle("window:minimize", () => {
  ne == null || ne.minimize();
});
ze.handle("window:maximize", () => {
  ne != null && ne.isMaximized() ? ne.unmaximize() : ne == null || ne.maximize();
});
ze.handle("window:close", () => {
  ne == null || ne.close();
});
const s1 = async (e) => {
  try {
    if (xs)
      return `data:image/jpeg;base64,${(await xs(e).resize(64, 64, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer()).toString("base64")}`;
    {
      const t = await ut.promises.readFile(e), r = Ne.extname(e).toLowerCase();
      if ([".jpg", ".jpeg"].includes(r))
        return `data:image/jpeg;base64,${t.toString("base64")}`;
      if (r === ".png")
        return `data:image/png;base64,${t.toString("base64")}`;
      if (r === ".gif")
        return `data:image/gif;base64,${t.toString("base64")}`;
      if (r === ".webp")
        return `data:image/webp;base64,${t.toString("base64")}`;
    }
  } catch (t) {
    console.error("Failed to generate thumbnail for:", e, t);
  }
  return null;
}, a1 = async (e) => {
  var t, r;
  try {
    if (console.log("Attempting to extract audio thumbnail for:", e), !Zt)
      return console.warn("music-metadata parseFile function not available"), null;
    console.log("parseFile function is available, parsing file...");
    const n = await Zt(e);
    console.log("Metadata parsed successfully:", {
      title: n.common.title,
      artist: n.common.artist,
      hasPicture: !!((t = n.common.picture) != null && t.length)
    });
    const s = (r = n.common.picture) == null ? void 0 : r[0];
    if (s) {
      console.log("Found album art:", {
        format: s.format,
        dataSize: s.data.length
      });
      const a = s.format || "image/jpeg", o = s.data.toString("base64"), l = `data:${a};base64,${o}`;
      return console.log("Generated thumbnail data URL for audio file"), l;
    } else
      console.log("No album art found in audio file");
  } catch (n) {
    console.error("Failed to extract audio metadata for:", e, n);
  }
  return null;
}, o1 = async (e) => new Promise((t) => {
  try {
    if (console.log("Attempting to extract video thumbnail for:", e), !Jn) {
      console.warn("ffmpeg library not available"), t(null);
      return;
    }
    const r = nr("os").tmpdir(), n = Ne.join(r, `thumb_${Date.now()}.jpg`);
    console.log("ffmpeg library is available, extracting frame..."), Jn(e).seekInput(1).frames(1).size("64x64").output(n).on("end", async () => {
      try {
        console.log("Video frame extracted successfully");
        const o = `data:image/jpeg;base64,${(await ut.promises.readFile(n)).toString("base64")}`;
        try {
          await ut.promises.unlink(n);
        } catch (l) {
          console.warn("Failed to clean up temp file:", l);
        }
        console.log("Generated thumbnail data URL for video file"), t(o);
      } catch (s) {
        console.error("Failed to read video thumbnail:", s), t(null);
      }
    }).on("error", (s) => {
      console.error("Failed to extract video thumbnail:", s), t(null);
    }).run();
  } catch (r) {
    console.error("Failed to process video thumbnail:", r), t(null);
  }
}), Ku = async (e) => {
  const t = Ne.extname(e).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"].includes(t) ? await s1(e) : [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm", ".mkv", ".m4v"].includes(t) ? await o1(e) : [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"].includes(t) ? await a1(e) : null;
};
export {
  b1 as MAIN_DIST,
  zu as RENDERER_DIST,
  ea as VITE_DEV_SERVER_URL
};
