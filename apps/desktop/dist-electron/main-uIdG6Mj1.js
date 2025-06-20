import Ku, { app as $r, BrowserWindow as Sc, ipcMain as ze, dialog as Gu, shell as Pc } from "electron";
import { createRequire as Hu } from "node:module";
import { fileURLToPath as Bu } from "node:url";
import Ne from "node:path";
import ut from "node:fs";
import nr from "path";
import Nc from "util";
import ta from "fs";
import Wu from "crypto";
import Ju from "assert";
import Xu from "events";
import Yu from "os";
import { promisify as Qu } from "node:util";
var an = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Zu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var js = { exports: {} }, xu = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Gt = xu, ed = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), td = (e) => !e.some((t) => ed.has(t));
function on(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return td(r) ? r : [];
}
var rd = {
  get(e, t, r) {
    if (!Gt(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = on(t);
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
    if (!Gt(e) || typeof t != "string")
      return e;
    const n = e, s = on(t);
    for (let a = 0; a < s.length; a++) {
      const o = s[a];
      Gt(e[o]) || (e[o] = {}), a === s.length - 1 && (e[o] = r), e = e[o];
    }
    return n;
  },
  delete(e, t) {
    if (!Gt(e) || typeof t != "string")
      return !1;
    const r = on(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !Gt(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Gt(e) || typeof t != "string")
      return !1;
    const r = on(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Gt(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, ra = { exports: {} }, na = { exports: {} }, sa = { exports: {} }, aa = { exports: {} };
const Oc = ta;
aa.exports = (e) => new Promise((t) => {
  Oc.access(e, (r) => {
    t(!r);
  });
});
aa.exports.sync = (e) => {
  try {
    return Oc.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var nd = aa.exports, oa = { exports: {} }, ia = { exports: {} };
const Rc = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
ia.exports = Rc;
ia.exports.default = Rc;
var sd = ia.exports;
const ad = sd, Tc = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (c, l, ...d) => {
    r++;
    const u = ad(c, ...d);
    l(u), u.then(n, n);
  }, a = (c, l, ...d) => {
    r < e ? s(c, l, ...d) : t.push(s.bind(null, c, l, ...d));
  }, o = (c, ...l) => new Promise((d) => a(c, d, ...l));
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
oa.exports = Tc;
oa.exports.default = Tc;
var od = oa.exports;
const si = od;
class Ic extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const id = (e, t) => Promise.resolve(e).then(t), cd = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new Ic(t[0])));
var ld = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = si(r.concurrency), s = [...e].map((o) => [o, n(id, o, t)]), a = si(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((o) => a(cd, o))).then(() => {
  }).catch((o) => o instanceof Ic ? o.value : Promise.reject(o));
};
const jc = nr, Ac = nd, ud = ld;
sa.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), ud(e, (r) => Ac(jc.resolve(t.cwd, r)), t));
sa.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (Ac.sync(jc.resolve(t.cwd, r)))
      return r;
};
var dd = sa.exports;
const bt = nr, kc = dd;
na.exports = (e, t = {}) => {
  const r = bt.resolve(t.cwd || ""), { root: n } = bt.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function o(c) {
      kc(s, { cwd: c }).then((l) => {
        l ? a(bt.join(c, l)) : c === n ? a(null) : o(bt.dirname(c));
      });
    })(r);
  });
};
na.exports.sync = (e, t = {}) => {
  let r = bt.resolve(t.cwd || "");
  const { root: n } = bt.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = kc.sync(s, { cwd: r });
    if (a)
      return bt.join(r, a);
    if (r === n)
      return null;
    r = bt.dirname(r);
  }
};
var fd = na.exports;
const Cc = fd;
ra.exports = async ({ cwd: e } = {}) => Cc("package.json", { cwd: e });
ra.exports.sync = ({ cwd: e } = {}) => Cc.sync("package.json", { cwd: e });
var hd = ra.exports, ca = { exports: {} };
const pe = nr, Dc = Yu, Et = Dc.homedir(), la = Dc.tmpdir(), { env: dr } = process, md = (e) => {
  const t = pe.join(Et, "Library");
  return {
    data: pe.join(t, "Application Support", e),
    config: pe.join(t, "Preferences", e),
    cache: pe.join(t, "Caches", e),
    log: pe.join(t, "Logs", e),
    temp: pe.join(la, e)
  };
}, pd = (e) => {
  const t = dr.APPDATA || pe.join(Et, "AppData", "Roaming"), r = dr.LOCALAPPDATA || pe.join(Et, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: pe.join(r, e, "Data"),
    config: pe.join(t, e, "Config"),
    cache: pe.join(r, e, "Cache"),
    log: pe.join(r, e, "Log"),
    temp: pe.join(la, e)
  };
}, $d = (e) => {
  const t = pe.basename(Et);
  return {
    data: pe.join(dr.XDG_DATA_HOME || pe.join(Et, ".local", "share"), e),
    config: pe.join(dr.XDG_CONFIG_HOME || pe.join(Et, ".config"), e),
    cache: pe.join(dr.XDG_CACHE_HOME || pe.join(Et, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: pe.join(dr.XDG_STATE_HOME || pe.join(Et, ".local", "state"), e),
    temp: pe.join(la, t, e)
  };
}, Mc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? md(e) : process.platform === "win32" ? pd(e) : $d(e);
};
ca.exports = Mc;
ca.exports.default = Mc;
var yd = ca.exports, ot = {}, oe = {};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.NOOP = oe.LIMIT_FILES_DESCRIPTORS = oe.LIMIT_BASENAME_LENGTH = oe.IS_USER_ROOT = oe.IS_POSIX = oe.DEFAULT_TIMEOUT_SYNC = oe.DEFAULT_TIMEOUT_ASYNC = oe.DEFAULT_WRITE_OPTIONS = oe.DEFAULT_READ_OPTIONS = oe.DEFAULT_FOLDER_MODE = oe.DEFAULT_FILE_MODE = oe.DEFAULT_ENCODING = void 0;
const gd = "utf8";
oe.DEFAULT_ENCODING = gd;
const _d = 438;
oe.DEFAULT_FILE_MODE = _d;
const vd = 511;
oe.DEFAULT_FOLDER_MODE = vd;
const wd = {};
oe.DEFAULT_READ_OPTIONS = wd;
const Ed = {};
oe.DEFAULT_WRITE_OPTIONS = Ed;
const bd = 5e3;
oe.DEFAULT_TIMEOUT_ASYNC = bd;
const Sd = 100;
oe.DEFAULT_TIMEOUT_SYNC = Sd;
const Pd = !!process.getuid;
oe.IS_POSIX = Pd;
const Nd = process.getuid ? !process.getuid() : !1;
oe.IS_USER_ROOT = Nd;
const Od = 128;
oe.LIMIT_BASENAME_LENGTH = Od;
const Rd = 1e4;
oe.LIMIT_FILES_DESCRIPTORS = Rd;
const Td = () => {
};
oe.NOOP = Td;
var Xn = {}, yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.attemptifySync = yr.attemptifyAsync = void 0;
const Lc = oe, Id = (e, t = Lc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
yr.attemptifyAsync = Id;
const jd = (e, t = Lc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
yr.attemptifySync = jd;
var ua = {};
Object.defineProperty(ua, "__esModule", { value: !0 });
const Ad = oe, Fc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !Ad.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Fc.isChangeErrorOk(e))
      throw e;
  }
};
ua.default = Fc;
var gr = {}, da = {};
Object.defineProperty(da, "__esModule", { value: !0 });
const kd = oe, ue = {
  interval: 25,
  intervalId: void 0,
  limit: kd.LIMIT_FILES_DESCRIPTORS,
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
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.retryifySync = gr.retryifyAsync = void 0;
const Cd = da, Dd = (e, t) => function(r) {
  return function n() {
    return Cd.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
      if (s(), Date.now() >= r)
        throw a;
      if (t(a)) {
        const o = Math.round(100 + 400 * Math.random());
        return new Promise((l) => setTimeout(l, o)).then(() => n.apply(void 0, arguments));
      }
      throw a;
    }));
  };
};
gr.retryifyAsync = Dd;
const Md = (e, t) => function(r) {
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
gr.retryifySync = Md;
Object.defineProperty(Xn, "__esModule", { value: !0 });
const ie = ta, Ie = Nc, je = yr, ve = ua, De = gr, Ld = {
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
Xn.default = Ld;
var fa = {};
Object.defineProperty(fa, "__esModule", { value: !0 });
const Fd = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
fa.default = Fd;
var ha = {};
Object.defineProperty(ha, "__esModule", { value: !0 });
const cn = {}, As = {
  next: (e) => {
    const t = cn[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => As.next(e)) : delete cn[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = cn[e];
    r || (r = cn[e] = []), r.push(t), !(r.length > 1) && t(() => As.next(e));
  })
};
ha.default = As;
var ma = {};
Object.defineProperty(ma, "__esModule", { value: !0 });
const Vd = nr, ai = oe, oi = Xn, qe = {
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
    const t = Vd.basename(e);
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
const Vc = nr, be = oe, ae = Xn, Ke = fa, zd = ha, St = ma;
function zc(e, t = be.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ke.default.isString(t))
    return zc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : be.DEFAULT_TIMEOUT_ASYNC);
  return ae.default.readFileRetry(n)(e, t);
}
ot.readFile = zc;
function Uc(e, t = be.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ke.default.isString(t))
    return Uc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : be.DEFAULT_TIMEOUT_SYNC);
  return ae.default.readFileSyncRetry(n)(e, t);
}
ot.readFileSync = Uc;
const qc = (e, t, r, n) => {
  if (Ke.default.isFunction(r))
    return qc(e, t, be.DEFAULT_WRITE_OPTIONS, r);
  const s = Kc(e, t, r);
  return n && s.then(n, n), s;
};
ot.writeFile = qc;
const Kc = async (e, t, r = be.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ke.default.isString(r))
    return Kc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : be.DEFAULT_TIMEOUT_ASYNC);
  let a = null, o = null, c = null, l = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), o = await zd.default.schedule(e), e = await ae.default.realpathAttempt(e) || e, [l, c] = St.default.get(e, r.tmpCreate || St.default.create, r.tmpPurge !== !1);
    const u = be.IS_POSIX && Ke.default.isUndefined(r.chown), h = Ke.default.isUndefined(r.mode);
    if (u || h) {
      const g = await ae.default.statAttempt(e);
      g && (r = { ...r }, u && (r.chown = { uid: g.uid, gid: g.gid }), h && (r.mode = g.mode));
    }
    const P = Vc.dirname(e);
    await ae.default.mkdirAttempt(P, {
      mode: be.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await ae.default.openRetry(s)(l, "w", r.mode || be.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(l), Ke.default.isString(t) ? await ae.default.writeRetry(s)(d, t, 0, r.encoding || be.DEFAULT_ENCODING) : Ke.default.isUndefined(t) || await ae.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await ae.default.fsyncRetry(s)(d) : ae.default.fsyncAttempt(d)), await ae.default.closeRetry(s)(d), d = null, r.chown && await ae.default.chownAttempt(l, r.chown.uid, r.chown.gid), r.mode && await ae.default.chmodAttempt(l, r.mode);
    try {
      await ae.default.renameRetry(s)(l, e);
    } catch (g) {
      if (g.code !== "ENAMETOOLONG")
        throw g;
      await ae.default.renameRetry(s)(l, St.default.truncate(e));
    }
    c(), l = null;
  } finally {
    d && await ae.default.closeAttempt(d), l && St.default.purge(l), a && a(), o && o();
  }
}, Gc = (e, t, r = be.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ke.default.isString(r))
    return Gc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : be.DEFAULT_TIMEOUT_SYNC);
  let a = null, o = null, c = null;
  try {
    e = ae.default.realpathSyncAttempt(e) || e, [o, a] = St.default.get(e, r.tmpCreate || St.default.create, r.tmpPurge !== !1);
    const l = be.IS_POSIX && Ke.default.isUndefined(r.chown), d = Ke.default.isUndefined(r.mode);
    if (l || d) {
      const h = ae.default.statSyncAttempt(e);
      h && (r = { ...r }, l && (r.chown = { uid: h.uid, gid: h.gid }), d && (r.mode = h.mode));
    }
    const u = Vc.dirname(e);
    ae.default.mkdirSyncAttempt(u, {
      mode: be.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), c = ae.default.openSyncRetry(s)(o, "w", r.mode || be.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(o), Ke.default.isString(t) ? ae.default.writeSyncRetry(s)(c, t, 0, r.encoding || be.DEFAULT_ENCODING) : Ke.default.isUndefined(t) || ae.default.writeSyncRetry(s)(c, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? ae.default.fsyncSyncRetry(s)(c) : ae.default.fsyncAttempt(c)), ae.default.closeSyncRetry(s)(c), c = null, r.chown && ae.default.chownSyncAttempt(o, r.chown.uid, r.chown.gid), r.mode && ae.default.chmodSyncAttempt(o, r.mode);
    try {
      ae.default.renameSyncRetry(s)(o, e);
    } catch (h) {
      if (h.code !== "ENAMETOOLONG")
        throw h;
      ae.default.renameSyncRetry(s)(o, St.default.truncate(e));
    }
    a(), o = null;
  } finally {
    c && ae.default.closeSyncAttempt(c), o && St.default.purge(o);
  }
};
ot.writeFileSync = Gc;
var ks = { exports: {} }, Hc = {}, xe = {}, _r = {}, Zr = {}, te = {}, Yr = {};
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
      c(N, w[R]), N.push(m[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function o(m, ...w) {
    const N = [g(m[0])];
    let R = 0;
    for (; R < w.length; )
      N.push(a), c(N, w[R]), N.push(a, g(m[++R]));
    return l(N), new n(N);
  }
  e.str = o;
  function c(m, w) {
    w instanceof n ? m.push(...w._items) : w instanceof r ? m.push(w) : m.push(h(w));
  }
  e.addCodeArg = c;
  function l(m) {
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
})(Yr);
var Cs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Yr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(l) {
    l[l.Started = 0] = "Started", l[l.Completed = 1] = "Completed";
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
  class c extends s {
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
  e.ValueScope = c;
})(Cs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Yr, r = Cs;
  var n = Yr;
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
    constructor(i, f, S) {
      super(), this.varKind = i, this.name = f, this.rhs = S;
    }
    render({ es5: i, _n: f }) {
      const S = i ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${S} ${this.name}${j};` + f;
    }
    optimizeNames(i, f) {
      if (i[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, i, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class c extends a {
    constructor(i, f, S) {
      super(), this.lhs = i, this.rhs = f, this.sideEffects = S;
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
  class l extends c {
    constructor(i, f, S, j) {
      super(i, S, j), this.op = f;
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
      return this.nodes.reduce((f, S) => f + S.render(i), "");
    }
    optimizeNodes() {
      const { nodes: i } = this;
      let f = i.length;
      for (; f--; ) {
        const S = i[f].optimizeNodes();
        Array.isArray(S) ? i.splice(f, 1, ...S) : S ? i[f] = S : i.splice(f, 1);
      }
      return i.length > 0 ? this : void 0;
    }
    optimizeNames(i, f) {
      const { nodes: S } = this;
      let j = S.length;
      for (; j--; ) {
        const A = S[j];
        A.optimizeNames(i, f) || (k(i, A.names), S.splice(j, 1));
      }
      return S.length > 0 ? this : void 0;
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
        const S = f.optimizeNodes();
        f = this.else = Array.isArray(S) ? new y(S) : S;
      }
      if (f)
        return i === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(z(i), f instanceof m ? [f] : f.nodes);
      if (!(i === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(i, f) {
      var S;
      if (this.else = (S = this.else) === null || S === void 0 ? void 0 : S.optimizeNames(i, f), !!(super.optimizeNames(i, f) || this.else))
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
    constructor(i, f, S, j) {
      super(), this.varKind = i, this.name = f, this.from = S, this.to = j;
    }
    render(i) {
      const f = i.es5 ? r.varKinds.var : this.varKind, { name: S, from: j, to: A } = this;
      return `for(${f} ${S}=${j}; ${S}<${A}; ${S}++)` + super.render(i);
    }
    get names() {
      const i = fe(super.names, this.from);
      return fe(i, this.to);
    }
  }
  class I extends w {
    constructor(i, f, S, j) {
      super(), this.loop = i, this.varKind = f, this.name = S, this.iterable = j;
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
    constructor(i, f, S) {
      super(), this.name = i, this.args = f, this.async = S;
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
      var S, j;
      return super.optimizeNames(i, f), (S = this.catch) === null || S === void 0 || S.optimizeNames(i, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(i, f), this;
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
      const S = this._extScope.value(i, f);
      return (this._values[S.prefix] || (this._values[S.prefix] = /* @__PURE__ */ new Set())).add(S), S;
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
    _def(i, f, S, j) {
      const A = this._scope.toName(f);
      return S !== void 0 && j && (this._constants[A.str] = S), this._leafNode(new o(i, A, S)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(i, f, S) {
      return this._def(r.varKinds.const, i, f, S);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(i, f, S) {
      return this._def(r.varKinds.let, i, f, S);
    }
    // `var` declaration with optional assignment
    var(i, f, S) {
      return this._def(r.varKinds.var, i, f, S);
    }
    // assignment code
    assign(i, f, S) {
      return this._leafNode(new c(i, f, S));
    }
    // `+=` code
    add(i, f) {
      return this._leafNode(new l(i, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(i) {
      return typeof i == "function" ? i() : i !== t.nil && this._leafNode(new P(i)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...i) {
      const f = ["{"];
      for (const [S, j] of i)
        f.length > 1 && f.push(","), f.push(S), (S !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(i, f, S) {
      if (this._blockNode(new m(i)), f && S)
        this.code(f).else().code(S).endIf();
      else if (f)
        this.code(f).endIf();
      else if (S)
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
    forRange(i, f, S, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(i);
      return this._for(new R(A, q, f, S), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(i, f, S, j = r.varKinds.const) {
      const A = this._scope.toName(i);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), S(A);
        });
      }
      return this._for(new I("of", j, A, f), () => S(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(i, f, S, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(i, (0, t._)`Object.keys(${f})`, S);
      const A = this._scope.toName(i);
      return this._for(new I("in", j, A, f), () => S(A));
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
    try(i, f, S) {
      if (!f && !S)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new de();
      if (this._blockNode(j), this.code(i), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return S && (this._currNode = j.finally = new H(), this.code(S)), this._endBlockNode(V, H);
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
      const S = this._nodes.length - f;
      if (S < 0 || i !== void 0 && S !== i)
        throw new Error(`CodeGen: wrong number of nodes: ${S} vs ${i} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(i, f = t.nil, S, j) {
      return this._blockNode(new U(i, f, S)), j && this.code(j).endFunc(), this;
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
      const S = this._currNode;
      if (S instanceof i || f && S instanceof f)
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
      return S($);
    if (!j($))
      return $;
    return new t._Code($._items.reduce((A, q) => (q instanceof t.Name && (q = S(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function S(A) {
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
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${b($)}`;
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
    return (i, f) => i === t.nil ? f : f === t.nil ? i : (0, t._)`${b(i)} ${$} ${b(f)}`;
  }
  function b($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(te);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ce = te, Ud = Yr;
function qd(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = qd;
function Kd(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Bc(e, t), !Wc(t, e.self.RULES.all));
}
M.alwaysValidSchema = Kd;
function Bc(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Yc(e, `unknown keyword: "${a}"`);
}
M.checkUnknownRules = Bc;
function Wc(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = Wc;
function Gd(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = Gd;
function Hd({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ce._)`${r}`;
  }
  return (0, ce._)`${e}${t}${(0, ce.getProperty)(n)}`;
}
M.schemaRefOrVal = Hd;
function Bd(e) {
  return Jc(decodeURIComponent(e));
}
M.unescapeFragment = Bd;
function Wd(e) {
  return encodeURIComponent(pa(e));
}
M.escapeFragment = Wd;
function pa(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = pa;
function Jc(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = Jc;
function Jd(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = Jd;
function ii({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, o, c) => {
    const l = o === void 0 ? a : o instanceof ce.Name ? (a instanceof ce.Name ? e(s, a, o) : t(s, a, o), o) : a instanceof ce.Name ? (t(s, o, a), a) : r(a, o);
    return c === ce.Name && !(l instanceof ce.Name) ? n(s, l) : l;
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
    resultToName: Xc
  }),
  items: ii({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ce._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ce._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Xc(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ce._)`{}`);
  return t !== void 0 && $a(e, r, t), r;
}
M.evaluatedPropsToName = Xc;
function $a(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ce._)`${t}${(0, ce.getProperty)(n)}`, !0));
}
M.setEvaluated = $a;
const ci = {};
function Xd(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: ci[t.code] || (ci[t.code] = new Ud._Code(t.code))
  });
}
M.useFunc = Xd;
var Ds;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Ds || (M.Type = Ds = {}));
function Yd(e, t, r) {
  if (e instanceof ce.Name) {
    const n = t === Ds.Num;
    return r ? n ? (0, ce._)`"[" + ${e} + "]"` : (0, ce._)`"['" + ${e} + "']"` : n ? (0, ce._)`"/" + ${e}` : (0, ce._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ce.getProperty)(e).toString() : "/" + pa(e);
}
M.getErrorPath = Yd;
function Yc(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = Yc;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
const Oe = te, Qd = {
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
dt.default = Qd;
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
    N ?? (U || B) ? l(I, de) : d(R, (0, t._)`[${de}]`);
  }
  e.reportError = s;
  function a(y, m = e.keywordError, w) {
    const { it: N } = y, { gen: R, compositeRule: I, allErrors: U } = N, B = h(y, m, w);
    l(R, B), I || U || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function o(y, m) {
    y.assign(n.default.errors, m), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(m, () => y.assign((0, t._)`${n.default.vErrors}.length`, m), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function c({ gen: y, keyword: m, schemaValue: w, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const U = y.name("err");
    y.forRange("i", R, n.default.errors, (B) => {
      y.const(U, (0, t._)`${n.default.vErrors}[${B}]`), y.if((0, t._)`${U}.instancePath === undefined`, () => y.assign((0, t._)`${U}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), y.assign((0, t._)`${U}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${m}`), I.opts.verbose && (y.assign((0, t._)`${U}.schema`, w), y.assign((0, t._)`${U}.data`, N));
    });
  }
  e.extendErrors = c;
  function l(y, m) {
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
})(Zr);
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.boolOrEmptySchema = _r.topBoolOrEmptySchema = void 0;
const Zd = Zr, xd = te, ef = dt, tf = {
  message: "boolean schema is false"
};
function rf(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Qc(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(ef.default.data) : (t.assign((0, xd._)`${n}.errors`, null), t.return(!0));
}
_r.topBoolOrEmptySchema = rf;
function nf(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Qc(e)) : r.var(t, !0);
}
_r.boolOrEmptySchema = nf;
function Qc(e, t) {
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
  (0, Zd.reportError)(s, tf, void 0, t);
}
var ge = {}, xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.getRules = xt.isJSONType = void 0;
const sf = ["string", "number", "integer", "boolean", "null", "object", "array"], af = new Set(sf);
function of(e) {
  return typeof e == "string" && af.has(e);
}
xt.isJSONType = of;
function cf() {
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
xt.getRules = cf;
var ht = {};
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.shouldUseRule = ht.shouldUseGroup = ht.schemaHasRulesForType = void 0;
function lf({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Zc(e, n);
}
ht.schemaHasRulesForType = lf;
function Zc(e, t) {
  return t.rules.some((r) => xc(e, r));
}
ht.shouldUseGroup = Zc;
function xc(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
ht.shouldUseRule = xc;
Object.defineProperty(ge, "__esModule", { value: !0 });
ge.reportTypeError = ge.checkDataTypes = ge.checkDataType = ge.coerceAndCheckDataType = ge.getJSONTypes = ge.getSchemaTypes = ge.DataType = void 0;
const uf = xt, df = ht, ff = Zr, X = te, el = M;
var fr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(fr || (ge.DataType = fr = {}));
function hf(e) {
  const t = tl(e.type);
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
ge.getSchemaTypes = hf;
function tl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(uf.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ge.getJSONTypes = tl;
function mf(e, t) {
  const { gen: r, data: n, opts: s } = e, a = pf(t, s.coerceTypes), o = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, df.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const c = ya(t, n, s.strictNumbers, fr.Wrong);
    r.if(c, () => {
      a.length ? $f(e, t, a) : ga(e);
    });
  }
  return o;
}
ge.coerceAndCheckDataType = mf;
const rl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function pf(e, t) {
  return t ? e.filter((r) => rl.has(r) || t === "array" && r === "array") : [];
}
function $f(e, t, r) {
  const { gen: n, data: s, opts: a } = e, o = n.let("dataType", (0, X._)`typeof ${s}`), c = n.let("coerced", (0, X._)`undefined`);
  a.coerceTypes === "array" && n.if((0, X._)`${o} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, X._)`${s}[0]`).assign(o, (0, X._)`typeof ${s}`).if(ya(t, s, a.strictNumbers), () => n.assign(c, s))), n.if((0, X._)`${c} !== undefined`);
  for (const d of r)
    (rl.has(d) || d === "array" && a.coerceTypes === "array") && l(d);
  n.else(), ga(e), n.endIf(), n.if((0, X._)`${c} !== undefined`, () => {
    n.assign(s, c), yf(e, c);
  });
  function l(d) {
    switch (d) {
      case "string":
        n.elseIf((0, X._)`${o} == "number" || ${o} == "boolean"`).assign(c, (0, X._)`"" + ${s}`).elseIf((0, X._)`${s} === null`).assign(c, (0, X._)`""`);
        return;
      case "number":
        n.elseIf((0, X._)`${o} == "boolean" || ${s} === null
              || (${o} == "string" && ${s} && ${s} == +${s})`).assign(c, (0, X._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, X._)`${o} === "boolean" || ${s} === null
              || (${o} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(c, (0, X._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, X._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(c, !1).elseIf((0, X._)`${s} === "true" || ${s} === 1`).assign(c, !0);
        return;
      case "null":
        n.elseIf((0, X._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(c, null);
        return;
      case "array":
        n.elseIf((0, X._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${s} === null`).assign(c, (0, X._)`[${s}]`);
    }
  }
}
function yf({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, X._)`${t} !== undefined`, () => e.assign((0, X._)`${t}[${r}]`, n));
}
function Ms(e, t, r, n = fr.Correct) {
  const s = n === fr.Correct ? X.operators.EQ : X.operators.NEQ;
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
  return n === fr.Correct ? a : (0, X.not)(a);
  function o(c = X.nil) {
    return (0, X.and)((0, X._)`typeof ${t} == "number"`, c, r ? (0, X._)`isFinite(${t})` : X.nil);
  }
}
ge.checkDataType = Ms;
function ya(e, t, r, n) {
  if (e.length === 1)
    return Ms(e[0], t, r, n);
  let s;
  const a = (0, el.toHash)(e);
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
const gf = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, X._)`{type: ${e}}` : (0, X._)`{type: ${t}}`
};
function ga(e) {
  const t = _f(e);
  (0, ff.reportError)(t, gf);
}
ge.reportTypeError = ga;
function _f(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, el.schemaRefOrVal)(e, n, "type");
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
const sr = te, vf = M;
function wf(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      li(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => li(e, a, s.default));
}
Yn.assignDefaults = wf;
function li(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: o } = e;
  if (r === void 0)
    return;
  const c = (0, sr._)`${a}${(0, sr.getProperty)(t)}`;
  if (s) {
    (0, vf.checkStrictMode)(e, `default is ignored for: ${c}`);
    return;
  }
  let l = (0, sr._)`${c} === undefined`;
  o.useDefaults === "empty" && (l = (0, sr._)`${l} || ${c} === null || ${c} === ""`), n.if(l, (0, sr._)`${c} = ${(0, sr.stringify)(r)}`);
}
var it = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.validateUnion = x.validateArray = x.usePattern = x.callValidateCode = x.schemaProperties = x.allSchemaProperties = x.noPropertyInData = x.propertyInData = x.isOwnProperty = x.hasPropFunc = x.reportMissingProp = x.checkMissingProp = x.checkReportMissingProp = void 0;
const he = te, _a = M, gt = dt, Ef = M;
function bf(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(wa(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, he._)`${t}` }, !0), e.error();
  });
}
x.checkReportMissingProp = bf;
function Sf({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, he.or)(...n.map((a) => (0, he.and)(wa(e, t, a, r.ownProperties), (0, he._)`${s} = ${a}`)));
}
x.checkMissingProp = Sf;
function Pf(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
x.reportMissingProp = Pf;
function nl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, he._)`Object.prototype.hasOwnProperty`
  });
}
x.hasPropFunc = nl;
function va(e, t, r) {
  return (0, he._)`${nl(e)}.call(${t}, ${r})`;
}
x.isOwnProperty = va;
function Nf(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} !== undefined`;
  return n ? (0, he._)`${s} && ${va(e, t, r)}` : s;
}
x.propertyInData = Nf;
function wa(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} === undefined`;
  return n ? (0, he.or)(s, (0, he.not)(va(e, t, r))) : s;
}
x.noPropertyInData = wa;
function sl(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
x.allSchemaProperties = sl;
function Of(e, t) {
  return sl(t).filter((r) => !(0, _a.alwaysValidSchema)(e, t[r]));
}
x.schemaProperties = Of;
function Rf({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: o }, c, l, d) {
  const u = d ? (0, he._)`${e}, ${t}, ${n}${s}` : t, h = [
    [gt.default.instancePath, (0, he.strConcat)(gt.default.instancePath, a)],
    [gt.default.parentData, o.parentData],
    [gt.default.parentDataProperty, o.parentDataProperty],
    [gt.default.rootData, gt.default.rootData]
  ];
  o.opts.dynamicRef && h.push([gt.default.dynamicAnchors, gt.default.dynamicAnchors]);
  const P = (0, he._)`${u}, ${r.object(...h)}`;
  return l !== he.nil ? (0, he._)`${c}.call(${l}, ${P})` : (0, he._)`${c}(${P})`;
}
x.callValidateCode = Rf;
const Tf = (0, he._)`new RegExp`;
function If({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, he._)`${s.code === "new RegExp" ? Tf : (0, Ef.useFunc)(e, s)}(${r}, ${n})`
  });
}
x.usePattern = If;
function jf(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const c = t.let("valid", !0);
    return o(() => t.assign(c, !1)), c;
  }
  return t.var(a, !0), o(() => t.break()), a;
  function o(c) {
    const l = t.const("len", (0, he._)`${r}.length`);
    t.forRange("i", 0, l, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: _a.Type.Num
      }, a), t.if((0, he.not)(a), c);
    });
  }
}
x.validateArray = jf;
function Af(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((l) => (0, _a.alwaysValidSchema)(s, l)) && !s.opts.unevaluated)
    return;
  const o = t.let("valid", !1), c = t.name("_valid");
  t.block(() => r.forEach((l, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, c);
    t.assign(o, (0, he._)`${o} || ${c}`), e.mergeValidEvaluated(u, c) || t.if((0, he.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
x.validateUnion = Af;
Object.defineProperty(it, "__esModule", { value: !0 });
it.validateKeywordUsage = it.validSchemaType = it.funcKeywordCode = it.macroKeywordCode = void 0;
const Ae = te, Wt = dt, kf = x, Cf = Zr;
function Df(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: o } = e, c = t.macro.call(o.self, s, a, o), l = al(r, n, c);
  o.opts.validateSchema !== !1 && o.self.validateSchema(c, !0);
  const d = r.name("valid");
  e.subschema({
    schema: c,
    schemaPath: Ae.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: l,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
it.macroKeywordCode = Df;
function Mf(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: o, $data: c, it: l } = e;
  Ff(l, t);
  const d = !c && t.compile ? t.compile.call(l.self, a, o, l) : t.validate, u = al(n, s, d), h = n.let("valid");
  e.block$data(h, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function P() {
    if (t.errors === !1)
      _(), t.modifying && ui(e), y(() => e.error());
    else {
      const m = t.async ? g() : E();
      t.modifying && ui(e), y(() => Lf(e, m));
    }
  }
  function g() {
    const m = n.let("ruleErrs", null);
    return n.try(() => _((0, Ae._)`await `), (w) => n.assign(h, !1).if((0, Ae._)`${w} instanceof ${l.ValidationError}`, () => n.assign(m, (0, Ae._)`${w}.errors`), () => n.throw(w))), m;
  }
  function E() {
    const m = (0, Ae._)`${u}.errors`;
    return n.assign(m, null), _(Ae.nil), m;
  }
  function _(m = t.async ? (0, Ae._)`await ` : Ae.nil) {
    const w = l.opts.passContext ? Wt.default.this : Wt.default.self, N = !("compile" in t && !c || t.schema === !1);
    n.assign(h, (0, Ae._)`${m}${(0, kf.callValidateCode)(e, u, w, N)}`, t.modifying);
  }
  function y(m) {
    var w;
    n.if((0, Ae.not)((w = t.valid) !== null && w !== void 0 ? w : h), m);
  }
}
it.funcKeywordCode = Mf;
function ui(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ae._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Lf(e, t) {
  const { gen: r } = e;
  r.if((0, Ae._)`Array.isArray(${t})`, () => {
    r.assign(Wt.default.vErrors, (0, Ae._)`${Wt.default.vErrors} === null ? ${t} : ${Wt.default.vErrors}.concat(${t})`).assign(Wt.default.errors, (0, Ae._)`${Wt.default.vErrors}.length`), (0, Cf.extendErrors)(e);
  }, () => e.error());
}
function Ff({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function al(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ae.stringify)(r) });
}
function Vf(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
it.validSchemaType = Vf;
function zf({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const o = s.dependencies;
  if (o != null && o.some((c) => !Object.prototype.hasOwnProperty.call(e, c)))
    throw new Error(`parent schema must have dependencies of ${a}: ${o.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const l = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(l);
    else
      throw new Error(l);
  }
}
it.validateKeywordUsage = zf;
var Ot = {};
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.extendSubschemaMode = Ot.extendSubschemaData = Ot.getSubschema = void 0;
const st = te, ol = M;
function Uf(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const c = e.schema[t];
    return r === void 0 ? {
      schema: c,
      schemaPath: (0, st._)`${e.schemaPath}${(0, st.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: c[r],
      schemaPath: (0, st._)`${e.schemaPath}${(0, st.getProperty)(t)}${(0, st.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, ol.escapeFragment)(r)}`
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
Ot.getSubschema = Uf;
function qf(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: o }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: c } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: u, opts: h } = t, P = c.let("data", (0, st._)`${t.data}${(0, st.getProperty)(r)}`, !0);
    l(P), e.errorPath = (0, st.str)`${d}${(0, ol.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, st._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof st.Name ? s : c.let("data", s, !0);
    l(d), o !== void 0 && (e.propertyName = o);
  }
  a && (e.dataTypes = a);
  function l(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Ot.extendSubschemaData = qf;
function Kf(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Ot.extendSubschemaMode = Kf;
var Se = {}, Qn = function e(t, r) {
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
}, il = { exports: {} }, Pt = il.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Nn(t, n, s, e, "", e);
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
function Nn(e, t, r, n, s, a, o, c, l, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, o, c, l, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Pt.arrayKeywords)
          for (var P = 0; P < h.length; P++)
            Nn(e, t, r, h[P], s + "/" + u + "/" + P, a, s, u, n, P);
      } else if (u in Pt.propsKeywords) {
        if (h && typeof h == "object")
          for (var g in h)
            Nn(e, t, r, h[g], s + "/" + u + "/" + Gf(g), a, s, u, n, g);
      } else (u in Pt.keywords || e.allKeys && !(u in Pt.skipKeywords)) && Nn(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, o, c, l, d);
  }
}
function Gf(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Hf = il.exports;
Object.defineProperty(Se, "__esModule", { value: !0 });
Se.getSchemaRefs = Se.resolveUrl = Se.normalizeId = Se._getFullPath = Se.getFullPath = Se.inlineRef = void 0;
const Bf = M, Wf = Qn, Jf = Hf, Xf = /* @__PURE__ */ new Set([
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
function Yf(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Ls(e) : t ? cl(e) <= t : !1;
}
Se.inlineRef = Yf;
const Qf = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Ls(e) {
  for (const t in e) {
    if (Qf.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Ls) || typeof r == "object" && Ls(r))
      return !0;
  }
  return !1;
}
function cl(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Xf.has(r) && (typeof e[r] == "object" && (0, Bf.eachItem)(e[r], (n) => t += cl(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function ll(e, t = "", r) {
  r !== !1 && (t = hr(t));
  const n = e.parse(t);
  return ul(e, n);
}
Se.getFullPath = ll;
function ul(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Se._getFullPath = ul;
const Zf = /#\/?$/;
function hr(e) {
  return e ? e.replace(Zf, "") : "";
}
Se.normalizeId = hr;
function xf(e, t, r) {
  return r = hr(r), e.resolve(t, r);
}
Se.resolveUrl = xf;
const eh = /^[a-z_][-a-z0-9._]*$/i;
function th(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = hr(e[r] || t), a = { "": s }, o = ll(n, s, !1), c = {}, l = /* @__PURE__ */ new Set();
  return Jf(e, { allKeys: !0 }, (h, P, g, E) => {
    if (E === void 0)
      return;
    const _ = o + P;
    let y = a[E];
    typeof h[r] == "string" && (y = m.call(this, h[r])), w.call(this, h.$anchor), w.call(this, h.$dynamicAnchor), a[P] = y;
    function m(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = hr(y ? R(y, N) : N), l.has(N))
        throw u(N);
      l.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(h, I.schema, N) : N !== hr(_) && (N[0] === "#" ? (d(h, c[N], N), c[N] = h) : this.refs[N] = _), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!eh.test(N))
          throw new Error(`invalid anchor "${N}"`);
        m.call(this, `#${N}`);
      }
    }
  }), c;
  function d(h, P, g) {
    if (P !== void 0 && !Wf(h, P))
      throw u(g);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Se.getSchemaRefs = th;
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.getData = xe.KeywordCxt = xe.validateFunctionCode = void 0;
const dl = _r, di = ge, Ea = ht, Mn = ge, rh = Yn, zr = it, ps = Ot, K = te, W = dt, nh = Se, mt = M, Ar = Zr;
function sh(e) {
  if (ml(e) && (pl(e), hl(e))) {
    ih(e);
    return;
  }
  fl(e, () => (0, dl.topBoolOrEmptySchema)(e));
}
xe.validateFunctionCode = sh;
function fl({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, K._)`${W.default.data}, ${W.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${fi(r, s)}`), oh(e, s), e.code(a);
  }) : e.func(t, (0, K._)`${W.default.data}, ${ah(s)}`, n.$async, () => e.code(fi(r, s)).code(a));
}
function ah(e) {
  return (0, K._)`{${W.default.instancePath}="", ${W.default.parentData}, ${W.default.parentDataProperty}, ${W.default.rootData}=${W.default.data}${e.dynamicRef ? (0, K._)`, ${W.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function oh(e, t) {
  e.if(W.default.valCxt, () => {
    e.var(W.default.instancePath, (0, K._)`${W.default.valCxt}.${W.default.instancePath}`), e.var(W.default.parentData, (0, K._)`${W.default.valCxt}.${W.default.parentData}`), e.var(W.default.parentDataProperty, (0, K._)`${W.default.valCxt}.${W.default.parentDataProperty}`), e.var(W.default.rootData, (0, K._)`${W.default.valCxt}.${W.default.rootData}`), t.dynamicRef && e.var(W.default.dynamicAnchors, (0, K._)`${W.default.valCxt}.${W.default.dynamicAnchors}`);
  }, () => {
    e.var(W.default.instancePath, (0, K._)`""`), e.var(W.default.parentData, (0, K._)`undefined`), e.var(W.default.parentDataProperty, (0, K._)`undefined`), e.var(W.default.rootData, W.default.data), t.dynamicRef && e.var(W.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function ih(e) {
  const { schema: t, opts: r, gen: n } = e;
  fl(e, () => {
    r.$comment && t.$comment && yl(e), fh(e), n.let(W.default.vErrors, null), n.let(W.default.errors, 0), r.unevaluated && ch(e), $l(e), ph(e);
  });
}
function ch(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function fi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function lh(e, t) {
  if (ml(e) && (pl(e), hl(e))) {
    uh(e, t);
    return;
  }
  (0, dl.boolOrEmptySchema)(e, t);
}
function hl({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function ml(e) {
  return typeof e.schema != "boolean";
}
function uh(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && yl(e), hh(e), mh(e);
  const a = n.const("_errs", W.default.errors);
  $l(e, a), n.var(t, (0, K._)`${a} === ${W.default.errors}`);
}
function pl(e) {
  (0, mt.checkUnknownRules)(e), dh(e);
}
function $l(e, t) {
  if (e.opts.jtd)
    return hi(e, [], !1, t);
  const r = (0, di.getSchemaTypes)(e.schema), n = (0, di.coerceAndCheckDataType)(e, r);
  hi(e, r, !n, t);
}
function dh(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, mt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function fh(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, mt.checkStrictMode)(e, "default is ignored in the schema root");
}
function hh(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, nh.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function mh(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function yl({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${W.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const o = (0, K.str)`${n}/$comment`, c = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${W.default.self}.opts.$comment(${a}, ${o}, ${c}.schema)`);
  }
}
function ph(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, K._)`${W.default.errors} === 0`, () => t.return(W.default.data), () => t.throw((0, K._)`new ${s}(${W.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, W.default.vErrors), a.unevaluated && $h(e), t.return((0, K._)`${W.default.errors} === 0`));
}
function $h({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function hi(e, t, r, n) {
  const { gen: s, schema: a, data: o, allErrors: c, opts: l, self: d } = e, { RULES: u } = d;
  if (a.$ref && (l.ignoreKeywordsWithRef || !(0, mt.schemaHasRulesButRef)(a, u))) {
    s.block(() => vl(e, "$ref", u.all.$ref.definition));
    return;
  }
  l.jtd || yh(e, t), s.block(() => {
    for (const P of u.rules)
      h(P);
    h(u.post);
  });
  function h(P) {
    (0, Ea.shouldUseGroup)(a, P) && (P.type ? (s.if((0, Mn.checkDataType)(P.type, o, l.strictNumbers)), mi(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Mn.reportTypeError)(e)), s.endIf()) : mi(e, P), c || s.if((0, K._)`${W.default.errors} === ${n || 0}`));
  }
}
function mi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, rh.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, Ea.shouldUseRule)(n, a) && vl(e, a.keyword, a.definition, t.type);
  });
}
function yh(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (gh(e, t), e.opts.allowUnionTypes || _h(e, t), vh(e, e.dataTypes));
}
function gh(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      gl(e.dataTypes, r) || ba(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Eh(e, t);
  }
}
function _h(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && ba(e, "use allowUnionTypes to allow union type keyword");
}
function vh(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Ea.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((o) => wh(t, o)) && ba(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function wh(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function gl(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Eh(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    gl(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function ba(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, mt.checkStrictMode)(e, t, e.opts.strictTypes);
}
let _l = class {
  constructor(t, r, n) {
    if ((0, zr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, mt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", wl(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, zr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Ar.reportExtraError : Ar.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Ar.reportError)(this, this.def.$dataError || Ar.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Ar.resetErrorsCount)(this.gen, this.errsCount);
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
    return (0, K.or)(o(), c());
    function o() {
      if (n.length) {
        if (!(r instanceof K.Name))
          throw new Error("ajv implementation error");
        const l = Array.isArray(n) ? n : [n];
        return (0, K._)`${(0, Mn.checkDataTypes)(l, r, a.opts.strictNumbers, Mn.DataType.Wrong)}`;
      }
      return K.nil;
    }
    function c() {
      if (s.validateSchema) {
        const l = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, K._)`!${l}(${r})`;
      }
      return K.nil;
    }
  }
  subschema(t, r) {
    const n = (0, ps.getSubschema)(this.it, t);
    (0, ps.extendSubschemaData)(n, this.it, t), (0, ps.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return lh(s, r), s;
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
xe.KeywordCxt = _l;
function vl(e, t, r, n) {
  const s = new _l(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, zr.funcKeywordCode)(s, r) : "macro" in r ? (0, zr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, zr.funcKeywordCode)(s, r);
}
const bh = /^\/(?:[^~]|~0|~1)*$/, Sh = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function wl(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return W.default.rootData;
  if (e[0] === "/") {
    if (!bh.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = W.default.rootData;
  } else {
    const d = Sh.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +d[1];
    if (s = d[2], s === "#") {
      if (u >= t)
        throw new Error(l("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(l("data", u));
    if (a = r[t - u], !s)
      return a;
  }
  let o = a;
  const c = s.split("/");
  for (const d of c)
    d && (a = (0, K._)`${a}${(0, K.getProperty)((0, mt.unescapeJsonPointer)(d))}`, o = (0, K._)`${o} && ${a}`);
  return o;
  function l(d, u) {
    return `Cannot access ${d} ${u} levels up, current level is ${t}`;
  }
}
xe.getData = wl;
var xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
let Ph = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
xr.default = Ph;
var br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
const $s = Se;
let Nh = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, $s.resolveUrl)(t, r, n), this.missingSchema = (0, $s.normalizeId)((0, $s.getFullPath)(t, this.missingRef));
  }
};
br.default = Nh;
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.resolveSchema = Fe.getCompilingSchema = Fe.resolveRef = Fe.compileSchema = Fe.SchemaEnv = void 0;
const We = te, Oh = xr, Ht = dt, Qe = Se, pi = M, Rh = xe;
let Zn = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Qe.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Fe.SchemaEnv = Zn;
function Sa(e) {
  const t = El.call(this, e);
  if (t)
    return t;
  const r = (0, Qe.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, o = new We.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let c;
  e.$async && (c = o.scopeValue("Error", {
    ref: Oh.default,
    code: (0, We._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = o.scopeName("validate");
  e.validateName = l;
  const d = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Ht.default.data,
    parentData: Ht.default.parentData,
    parentDataProperty: Ht.default.parentDataProperty,
    dataNames: [Ht.default.data],
    dataPathArr: [We.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, We.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: c,
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
    this._compilations.add(e), (0, Rh.validateFunctionCode)(d), o.optimize(this.opts.code.optimize);
    const h = o.toString();
    u = `${o.scopeRefs(Ht.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const g = new Function(`${Ht.default.self}`, `${Ht.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(l, { ref: g }), g.errors = null, g.schema = e.schema, g.schemaEnv = e, e.$async && (g.$async = !0), this.opts.code.source === !0 && (g.source = { validateName: l, validateCode: h, scopeValues: o._values }), this.opts.unevaluated) {
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
Fe.compileSchema = Sa;
function Th(e, t, r) {
  var n;
  r = (0, Qe.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Ah.call(this, e, r);
  if (a === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: c } = this.opts;
    o && (a = new Zn({ schema: o, schemaId: c, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = Ih.call(this, a);
}
Fe.resolveRef = Th;
function Ih(e) {
  return (0, Qe.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Sa.call(this, e);
}
function El(e) {
  for (const t of this._compilations)
    if (jh(t, e))
      return t;
}
Fe.getCompilingSchema = El;
function jh(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Ah(e, t) {
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
    const c = xn.call(this, e, o);
    return typeof (c == null ? void 0 : c.schema) != "object" ? void 0 : ys.call(this, r, c);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || Sa.call(this, o), a === (0, Qe.normalizeId)(t)) {
      const { schema: c } = o, { schemaId: l } = this.opts, d = c[l];
      return d && (s = (0, Qe.resolveUrl)(this.opts.uriResolver, s, d)), new Zn({ schema: c, schemaId: l, root: e, baseId: s });
    }
    return ys.call(this, r, o);
  }
}
Fe.resolveSchema = xn;
const kh = /* @__PURE__ */ new Set([
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
  for (const c of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const l = r[(0, pi.unescapeFragment)(c)];
    if (l === void 0)
      return;
    r = l;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !kh.has(c) && d && (t = (0, Qe.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, pi.schemaHasRulesButRef)(r, this.RULES)) {
    const c = (0, Qe.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = xn.call(this, n, c);
  }
  const { schemaId: o } = this.opts;
  if (a = a || new Zn({ schema: r, schemaId: o, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Ch = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Dh = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Mh = "object", Lh = [
  "$data"
], Fh = {
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
}, Vh = !1, zh = {
  $id: Ch,
  description: Dh,
  type: Mh,
  required: Lh,
  properties: Fh,
  additionalProperties: Vh
};
var Pa = {}, es = { exports: {} };
const Uh = {
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
var qh = {
  HEX: Uh
};
const { HEX: Kh } = qh, Gh = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
function bl(e) {
  if (Pl(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const t = e.match(Gh) || [], [r] = t;
  return r ? { host: Bh(r, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function $i(e, t = !1) {
  let r = "", n = !0;
  for (const s of e) {
    if (Kh[s] === void 0) return;
    s !== "0" && n === !0 && (n = !1), n || (r += s);
  }
  return t && r.length === 0 && (r = "0"), r;
}
function Hh(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, o = !1, c = !1;
  function l() {
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
        if (o === !0 && (c = !0), !l())
          break;
        if (t++, n.push(":"), t > 7) {
          r.error = !0;
          break;
        }
        d - 1 >= 0 && e[d - 1] === ":" && (o = !0);
        continue;
      } else if (u === "%") {
        if (!l())
          break;
        a = !0;
      } else {
        s.push(u);
        continue;
      }
  }
  return s.length && (a ? r.zone = s.join("") : c ? n.push(s.join("")) : n.push($i(s))), r.address = n.join(""), r;
}
function Sl(e) {
  if (Pl(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = Hh(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, escapedHost: n, isIPV6: !0 };
  }
}
function Bh(e, t) {
  let r = "", n = !0;
  const s = e.length;
  for (let a = 0; a < s; a++) {
    const o = e[a];
    o === "0" && n ? (a + 1 <= s && e[a + 1] === t || a + 1 === s) && (r += o, n = !1) : (o === t ? n = !0 : n = !1, r += o);
  }
  return r;
}
function Pl(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
const yi = /^\.\.?\//u, gi = /^\/\.(?:\/|$)/u, _i = /^\/\.\.(?:\/|$)/u, Wh = /^\/?(?:.|\n)*?(?=\/|$)/u;
function Jh(e) {
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
      const r = e.match(Wh);
      if (r) {
        const n = r[0];
        e = e.slice(n.length), t.push(n);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return t.join("");
}
function Xh(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function Yh(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    const n = bl(r);
    if (n.isIPV4)
      r = n.host;
    else {
      const s = Sl(n.host);
      s.isIPV6 === !0 ? r = `[${s.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Qh = {
  recomposeAuthority: Yh,
  normalizeComponentEncoding: Xh,
  removeDotSegments: Jh,
  normalizeIPv4: bl,
  normalizeIPv6: Sl
};
const Zh = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, xh = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Nl(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function Ol(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Rl(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function em(e) {
  return e.secure = Nl(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function tm(e) {
  if ((e.port === (Nl(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function rm(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(xh);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = Na[s];
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function nm(e, t) {
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = Na[s];
  a && (e = a.serialize(e, t));
  const o = e, c = e.nss;
  return o.path = `${n || t.nid}:${c}`, t.skipEscape = !0, o;
}
function sm(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !Zh.test(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function am(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Tl = {
  scheme: "http",
  domainHost: !0,
  parse: Ol,
  serialize: Rl
}, om = {
  scheme: "https",
  domainHost: Tl.domainHost,
  parse: Ol,
  serialize: Rl
}, On = {
  scheme: "ws",
  domainHost: !0,
  parse: em,
  serialize: tm
}, im = {
  scheme: "wss",
  domainHost: On.domainHost,
  parse: On.parse,
  serialize: On.serialize
}, cm = {
  scheme: "urn",
  parse: rm,
  serialize: nm,
  skipNormalize: !0
}, lm = {
  scheme: "urn:uuid",
  parse: sm,
  serialize: am,
  skipNormalize: !0
}, Na = {
  http: Tl,
  https: om,
  ws: On,
  wss: im,
  urn: cm,
  "urn:uuid": lm
};
var um = Na;
const { normalizeIPv6: dm, normalizeIPv4: fm, removeDotSegments: Lr, recomposeAuthority: hm, normalizeComponentEncoding: ln } = Qh, Oa = um;
function mm(e, t) {
  return typeof e == "string" ? e = ct(yt(e, t), t) : typeof e == "object" && (e = yt(ct(e, t), t)), e;
}
function pm(e, t, r) {
  const n = Object.assign({ scheme: "null" }, r), s = Il(yt(e, n), yt(t, n), n, !0);
  return ct(s, { ...n, skipEscape: !0 });
}
function Il(e, t, r, n) {
  const s = {};
  return n || (e = yt(ct(e, r), r), t = yt(ct(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Lr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Lr(t.path || ""), s.query = t.query) : (t.path ? (t.path.charAt(0) === "/" ? s.path = Lr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Lr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function $m(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ct(ln(yt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ct(ln(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ct(ln(yt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ct(ln(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
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
  const o = hm(r);
  if (o !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(o), r.path && r.path.charAt(0) !== "/" && s.push("/")), r.path !== void 0) {
    let c = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (c = Lr(c)), o === void 0 && (c = c.replace(/^\/\//u, "/%2F")), s.push(c);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const ym = Array.from({ length: 127 }, (e, t) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(t)));
function gm(e) {
  let t = 0;
  for (let r = 0, n = e.length; r < n; ++r)
    if (t = e.charCodeAt(r), t > 126 || ym[t])
      return !0;
  return !1;
}
const _m = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
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
  const o = e.match(_m);
  if (o) {
    if (n.scheme = o[1], n.userinfo = o[3], n.host = o[4], n.port = parseInt(o[5], 10), n.path = o[6] || "", n.query = o[7], n.fragment = o[8], isNaN(n.port) && (n.port = o[5]), n.host) {
      const l = fm(n.host);
      if (l.isIPV4 === !1) {
        const d = dm(l.host);
        n.host = d.host.toLowerCase(), a = d.isIPV6;
      } else
        n.host = l.host, a = !0;
    }
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const c = Oa[(r.scheme || n.scheme || "").toLowerCase()];
    if (!r.unicodeSupport && (!c || !c.unicodeSupport) && n.host && (r.domainHost || c && c.domainHost) && a === !1 && gm(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (l) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + l;
      }
    (!c || c && !c.skipNormalize) && (s && n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), s && n.host !== void 0 && (n.host = unescape(n.host)), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), c && c.parse && c.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Ra = {
  SCHEMES: Oa,
  normalize: mm,
  resolve: pm,
  resolveComponents: Il,
  equal: $m,
  serialize: ct,
  parse: yt
};
es.exports = Ra;
es.exports.default = Ra;
es.exports.fastUri = Ra;
var jl = es.exports;
Object.defineProperty(Pa, "__esModule", { value: !0 });
const Al = jl;
Al.code = 'require("ajv/dist/runtime/uri").default';
Pa.default = Al;
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
  const n = xr, s = br, a = xt, o = Fe, c = te, l = Se, d = ge, u = M, h = zh, P = Pa, g = (v, p) => new RegExp(v, p);
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
    var p, b, $, i, f, S, j, A, q, F, re, Ue, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, zt, Ut, qt;
    const Be = v.strict, Kt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, Ir = Kt === !0 || Kt === void 0 ? 1 : Kt || 0, jr = ($ = (b = v.code) === null || b === void 0 ? void 0 : b.regExp) !== null && $ !== void 0 ? $ : g, ms = (i = v.uriResolver) !== null && i !== void 0 ? i : P.default;
    return {
      strictSchema: (S = (f = v.strictSchema) !== null && f !== void 0 ? f : Be) !== null && S !== void 0 ? S : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (Ue = (re = v.strictTuples) !== null && re !== void 0 ? re : Be) !== null && Ue !== void 0 ? Ue : "log",
      strictRequired: (jt = (It = v.strictRequired) !== null && It !== void 0 ? It : Be) !== null && jt !== void 0 ? jt : !1,
      code: v.code ? { ...v.code, optimize: Ir, regExp: jr } : { optimize: Ir, regExp: jr },
      loopRequired: (At = v.loopRequired) !== null && At !== void 0 ? At : w,
      loopEnum: (kt = v.loopEnum) !== null && kt !== void 0 ? kt : w,
      meta: (Ct = v.meta) !== null && Ct !== void 0 ? Ct : !0,
      messages: (Dt = v.messages) !== null && Dt !== void 0 ? Dt : !0,
      inlineRefs: (Mt = v.inlineRefs) !== null && Mt !== void 0 ? Mt : !0,
      schemaId: (Lt = v.schemaId) !== null && Lt !== void 0 ? Lt : "$id",
      addUsedSchema: (Ft = v.addUsedSchema) !== null && Ft !== void 0 ? Ft : !0,
      validateSchema: (Vt = v.validateSchema) !== null && Vt !== void 0 ? Vt : !0,
      validateFormats: (zt = v.validateFormats) !== null && zt !== void 0 ? zt : !0,
      unicodeRegExp: (Ut = v.unicodeRegExp) !== null && Ut !== void 0 ? Ut : !0,
      int32range: (qt = v.int32range) !== null && qt !== void 0 ? qt : !0,
      uriResolver: ms
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: b, lines: $ } = this.opts.code;
      this.scope = new c.ValueScope({ scope: {}, prefixes: _, es5: b, lines: $ }), this.logger = Q(p.logger);
      const i = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, y, p, "NOT SUPPORTED"), I.call(this, m, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && de.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), B.call(this), p.validateFormats = i;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: b, schemaId: $ } = this.opts;
      let i = h;
      $ === "id" && (i = { ...h }, i.id = i.$id, delete i.$id), b && p && this.addMetaSchema(i, i[$], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: b } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[b] || p : void 0;
    }
    validate(p, b) {
      let $;
      if (typeof p == "string") {
        if ($ = this.getSchema(p), !$)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        $ = this.compile(p);
      const i = $(b);
      return "$async" in $ || (this.errors = $.errors), i;
    }
    compile(p, b) {
      const $ = this._addSchema(p, b);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(p, b) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return i.call(this, p, b);
      async function i(F, re) {
        await f.call(this, F.$schema);
        const Ue = this._addSchema(F, re);
        return Ue.validate || S.call(this, Ue);
      }
      async function f(F) {
        F && !this.getSchema(F) && await i.call(this, { $ref: F }, !0);
      }
      async function S(F) {
        try {
          return this._compileSchemaEnv(F);
        } catch (re) {
          if (!(re instanceof s.default))
            throw re;
          return j.call(this, re), await A.call(this, re.missingSchema), S.call(this, F);
        }
      }
      function j({ missingSchema: F, missingRef: re }) {
        if (this.refs[F])
          throw new Error(`AnySchema ${F} is loaded but ${re} cannot be resolved`);
      }
      async function A(F) {
        const re = await q.call(this, F);
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, b);
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
    addSchema(p, b, $, i = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const S of p)
          this.addSchema(S, void 0, $, i);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: S } = this.opts;
        if (f = p[S], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${S} must be string`);
      }
      return b = (0, l.normalizeId)(b || f), this._checkUnique(b), this.schemas[b] = this._addSchema(p, $, b, i, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, b, $ = this.opts.validateSchema) {
      return this.addSchema(p, b, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, b) {
      if (typeof p == "boolean")
        return !0;
      let $;
      if ($ = p.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const i = this.validate($, p);
      if (!i && b) {
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
      let b;
      for (; typeof (b = U.call(this, p)) == "string"; )
        p = b;
      if (b === void 0) {
        const { schemaId: $ } = this.opts, i = new o.SchemaEnv({ schema: {}, schemaId: $ });
        if (b = o.resolveSchema.call(this, i, p), !b)
          return;
        this.refs[p] = b;
      }
      return b.validate || this._compileSchemaEnv(b);
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
          const b = U.call(this, p);
          return typeof b == "object" && this._cache.delete(b.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const b = p;
          this._cache.delete(b);
          let $ = p[this.opts.schemaId];
          return $ && ($ = (0, l.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const b of p)
        this.addKeyword(b);
      return this;
    }
    addKeyword(p, b) {
      let $;
      if (typeof p == "string")
        $ = p, typeof b == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), b.keyword = $);
      else if (typeof p == "object" && b === void 0) {
        if (b = p, $ = b.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, $, b), !b)
        return (0, u.eachItem)($, (f) => k.call(this, f)), this;
      D.call(this, b);
      const i = {
        ...b,
        type: (0, d.getJSONTypes)(b.type),
        schemaType: (0, d.getJSONTypes)(b.schemaType)
      };
      return (0, u.eachItem)($, i.type.length === 0 ? (f) => k.call(this, f, i) : (f) => i.type.forEach((S) => k.call(this, f, i, S))), this;
    }
    getKeyword(p) {
      const b = this.RULES.all[p];
      return typeof b == "object" ? b.definition : !!b;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: b } = this;
      delete b.keywords[p], delete b.all[p];
      for (const $ of b.rules) {
        const i = $.rules.findIndex((f) => f.keyword === p);
        i >= 0 && $.rules.splice(i, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, b) {
      return typeof b == "string" && (b = new RegExp(b)), this.formats[p] = b, this;
    }
    errorsText(p = this.errors, { separator: b = ", ", dataVar: $ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((i) => `${$}${i.instancePath} ${i.message}`).reduce((i, f) => i + b + f);
    }
    $dataMetaSchema(p, b) {
      const $ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const i of b) {
        const f = i.split("/").slice(1);
        let S = p;
        for (const j of f)
          S = S[j];
        for (const j in $) {
          const A = $[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = S[j];
          q && F && (S[j] = T(F));
        }
      }
      return p;
    }
    _removeAllSchemas(p, b) {
      for (const $ in p) {
        const i = p[$];
        (!b || b.test($)) && (typeof i == "string" ? delete p[$] : i && !i.meta && (this._cache.delete(i.schema), delete p[$]));
      }
    }
    _addSchema(p, b, $, i = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let S;
      const { schemaId: j } = this.opts;
      if (typeof p == "object")
        S = p[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(p);
      if (A !== void 0)
        return A;
      $ = (0, l.normalizeId)(S || $);
      const q = l.getSchemaRefs.call(this, p, $);
      return A = new o.SchemaEnv({ schema: p, schemaId: j, meta: b, baseId: $, localRefs: q }), this._cache.set(A.schema, A), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = A), i && this.validateSchema(p, !0), A;
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
      const b = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, p);
      } finally {
        this.opts = b;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function I(v, p, b, $ = "error") {
    for (const i in v) {
      const f = i;
      f in p && this.logger[$](`${b}: option ${i}. ${v[f]}`);
    }
  }
  function U(v) {
    return v = (0, l.normalizeId)(v), this.schemas[v] || this.refs[v];
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
      const b = v[p];
      b.keyword || (b.keyword = p), this.addKeyword(b);
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
    const { RULES: b } = this;
    if ((0, u.eachItem)(v, ($) => {
      if (b.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!fe.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, b) {
    var $;
    const i = p == null ? void 0 : p.post;
    if (b && i)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let S = i ? f.post : f.rules.find(({ type: A }) => A === b);
    if (S || (S = { type: b, rules: [] }, f.rules.push(S)), f.keywords[v] = !0, !p)
      return;
    const j = {
      keyword: v,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? z.call(this, S, j, p.before) : S.rules.push(j), f.all[v] = j, ($ = p.implements) === null || $ === void 0 || $.forEach((A) => this.addKeyword(A));
  }
  function z(v, p, b) {
    const $ = v.rules.findIndex((i) => i.keyword === b);
    $ >= 0 ? v.rules.splice($, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${b} is not defined`));
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
})(Hc);
var Ta = {}, Ia = {}, ja = {};
Object.defineProperty(ja, "__esModule", { value: !0 });
const vm = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ja.default = vm;
var er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.callRef = er.getValidate = void 0;
const wm = br, vi = x, Me = te, ar = dt, wi = Fe, un = M, Em = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: o, opts: c, self: l } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = wi.resolveRef.call(l, d, s, r);
    if (u === void 0)
      throw new wm.default(n.opts.uriResolver, s, r);
    if (u instanceof wi.SchemaEnv)
      return P(u);
    return g(u);
    function h() {
      if (a === d)
        return Rn(e, o, a, a.$async);
      const E = t.scopeValue("root", { ref: d });
      return Rn(e, (0, Me._)`${E}.validate`, d, d.$async);
    }
    function P(E) {
      const _ = kl(e, E);
      Rn(e, _, E, E.$async);
    }
    function g(E) {
      const _ = t.scopeValue("schema", c.code.source === !0 ? { ref: E, code: (0, Me.stringify)(E) } : { ref: E }), y = t.name("valid"), m = e.subschema({
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
function kl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Me._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
er.getValidate = kl;
function Rn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: o, schemaEnv: c, opts: l } = a, d = l.passContext ? ar.default.this : Me.nil;
  n ? u() : h();
  function u() {
    if (!c.$async)
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
    s.assign(ar.default.vErrors, (0, Me._)`${ar.default.vErrors} === null ? ${_} : ${ar.default.vErrors}.concat(${_})`), s.assign(ar.default.errors, (0, Me._)`${ar.default.vErrors}.length`);
  }
  function g(E) {
    var _;
    if (!a.opts.unevaluated)
      return;
    const y = (_ = r == null ? void 0 : r.validate) === null || _ === void 0 ? void 0 : _.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = un.mergeEvaluated.props(s, y.props, a.props));
      else {
        const m = s.var("props", (0, Me._)`${E}.evaluated.props`);
        a.props = un.mergeEvaluated.props(s, m, a.props, Me.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = un.mergeEvaluated.items(s, y.items, a.items));
      else {
        const m = s.var("items", (0, Me._)`${E}.evaluated.items`);
        a.items = un.mergeEvaluated.items(s, m, a.items, Me.Name);
      }
  }
}
er.callRef = Rn;
er.default = Em;
Object.defineProperty(Ia, "__esModule", { value: !0 });
const bm = ja, Sm = er, Pm = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  bm.default,
  Sm.default
];
Ia.default = Pm;
var Aa = {}, ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const Ln = te, _t = Ln.operators, Fn = {
  maximum: { okStr: "<=", ok: _t.LTE, fail: _t.GT },
  minimum: { okStr: ">=", ok: _t.GTE, fail: _t.LT },
  exclusiveMaximum: { okStr: "<", ok: _t.LT, fail: _t.GTE },
  exclusiveMinimum: { okStr: ">", ok: _t.GT, fail: _t.LTE }
}, Nm = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ln.str)`must be ${Fn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ln._)`{comparison: ${Fn[e].okStr}, limit: ${t}}`
}, Om = {
  keyword: Object.keys(Fn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Nm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Ln._)`${r} ${Fn[t].fail} ${n} || isNaN(${r})`);
  }
};
ka.default = Om;
var Ca = {};
Object.defineProperty(Ca, "__esModule", { value: !0 });
const Ur = te, Rm = {
  message: ({ schemaCode: e }) => (0, Ur.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Ur._)`{multipleOf: ${e}}`
}, Tm = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Rm,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, o = t.let("res"), c = a ? (0, Ur._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${a}` : (0, Ur._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Ur._)`(${n} === 0 || (${o} = ${r}/${n}, ${c}))`);
  }
};
Ca.default = Tm;
var Da = {}, Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
function Cl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ma.default = Cl;
Cl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Da, "__esModule", { value: !0 });
const Jt = te, Im = M, jm = Ma, Am = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Jt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Jt._)`{limit: ${e}}`
}, km = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Am,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Jt.operators.GT : Jt.operators.LT, o = s.opts.unicode === !1 ? (0, Jt._)`${r}.length` : (0, Jt._)`${(0, Im.useFunc)(e.gen, jm.default)}(${r})`;
    e.fail$data((0, Jt._)`${o} ${a} ${n}`);
  }
};
Da.default = km;
var La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
const Cm = x, Vn = te, Dm = {
  message: ({ schemaCode: e }) => (0, Vn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Vn._)`{pattern: ${e}}`
}, Mm = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Dm,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, o = a.opts.unicodeRegExp ? "u" : "", c = r ? (0, Vn._)`(new RegExp(${s}, ${o}))` : (0, Cm.usePattern)(e, n);
    e.fail$data((0, Vn._)`!${c}.test(${t})`);
  }
};
La.default = Mm;
var Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
const qr = te, Lm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, qr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, qr._)`{limit: ${e}}`
}, Fm = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Lm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? qr.operators.GT : qr.operators.LT;
    e.fail$data((0, qr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Fa.default = Fm;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const kr = x, Kr = te, Vm = M, zm = {
  message: ({ params: { missingProperty: e } }) => (0, Kr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Kr._)`{missingProperty: ${e}}`
}, Um = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: zm,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: o } = e, { opts: c } = o;
    if (!a && r.length === 0)
      return;
    const l = r.length >= c.loopRequired;
    if (o.allErrors ? d() : u(), c.strictRequired) {
      const g = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const _ of r)
        if ((g == null ? void 0 : g[_]) === void 0 && !E.has(_)) {
          const y = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${_}" is not defined at "${y}" (strictRequired)`;
          (0, Vm.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function d() {
      if (l || a)
        e.block$data(Kr.nil, h);
      else
        for (const g of r)
          (0, kr.checkReportMissingProp)(e, g);
    }
    function u() {
      const g = t.let("missing");
      if (l || a) {
        const E = t.let("valid", !0);
        e.block$data(E, () => P(g, E)), e.ok(E);
      } else
        t.if((0, kr.checkMissingProp)(e, r, g)), (0, kr.reportMissingProp)(e, g), t.else();
    }
    function h() {
      t.forOf("prop", n, (g) => {
        e.setParams({ missingProperty: g }), t.if((0, kr.noPropertyInData)(t, s, g, c.ownProperties), () => e.error());
      });
    }
    function P(g, E) {
      e.setParams({ missingProperty: g }), t.forOf(g, n, () => {
        t.assign(E, (0, kr.propertyInData)(t, s, g, c.ownProperties)), t.if((0, Kr.not)(E), () => {
          e.error(), t.break();
        });
      }, Kr.nil);
    }
  }
};
Va.default = Um;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const Gr = te, qm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Gr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Gr._)`{limit: ${e}}`
}, Km = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: qm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Gr.operators.GT : Gr.operators.LT;
    e.fail$data((0, Gr._)`${r}.length ${s} ${n}`);
  }
};
za.default = Km;
var Ua = {}, en = {};
Object.defineProperty(en, "__esModule", { value: !0 });
const Dl = Qn;
Dl.code = 'require("ajv/dist/runtime/equal").default';
en.default = Dl;
Object.defineProperty(Ua, "__esModule", { value: !0 });
const gs = ge, we = te, Gm = M, Hm = en, Bm = {
  message: ({ params: { i: e, j: t } }) => (0, we.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, we._)`{i: ${e}, j: ${t}}`
}, Wm = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Bm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: o, it: c } = e;
    if (!n && !s)
      return;
    const l = t.let("valid"), d = a.items ? (0, gs.getSchemaTypes)(a.items) : [];
    e.block$data(l, u, (0, we._)`${o} === false`), e.ok(l);
    function u() {
      const E = t.let("i", (0, we._)`${r}.length`), _ = t.let("j");
      e.setParams({ i: E, j: _ }), t.assign(l, !0), t.if((0, we._)`${E} > 1`, () => (h() ? P : g)(E, _));
    }
    function h() {
      return d.length > 0 && !d.some((E) => E === "object" || E === "array");
    }
    function P(E, _) {
      const y = t.name("item"), m = (0, gs.checkDataTypes)(d, y, c.opts.strictNumbers, gs.DataType.Wrong), w = t.const("indices", (0, we._)`{}`);
      t.for((0, we._)`;${E}--;`, () => {
        t.let(y, (0, we._)`${r}[${E}]`), t.if(m, (0, we._)`continue`), d.length > 1 && t.if((0, we._)`typeof ${y} == "string"`, (0, we._)`${y} += "_"`), t.if((0, we._)`typeof ${w}[${y}] == "number"`, () => {
          t.assign(_, (0, we._)`${w}[${y}]`), e.error(), t.assign(l, !1).break();
        }).code((0, we._)`${w}[${y}] = ${E}`);
      });
    }
    function g(E, _) {
      const y = (0, Gm.useFunc)(t, Hm.default), m = t.name("outer");
      t.label(m).for((0, we._)`;${E}--;`, () => t.for((0, we._)`${_} = ${E}; ${_}--;`, () => t.if((0, we._)`${y}(${r}[${E}], ${r}[${_}])`, () => {
        e.error(), t.assign(l, !1).break(m);
      })));
    }
  }
};
Ua.default = Wm;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const Fs = te, Jm = M, Xm = en, Ym = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Fs._)`{allowedValue: ${e}}`
}, Qm = {
  keyword: "const",
  $data: !0,
  error: Ym,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Fs._)`!${(0, Jm.useFunc)(t, Xm.default)}(${r}, ${s})`) : e.fail((0, Fs._)`${a} !== ${r}`);
  }
};
qa.default = Qm;
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
const Fr = te, Zm = M, xm = en, ep = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Fr._)`{allowedValues: ${e}}`
}, tp = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: ep,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: o } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const c = s.length >= o.opts.loopEnum;
    let l;
    const d = () => l ?? (l = (0, Zm.useFunc)(t, xm.default));
    let u;
    if (c || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const g = t.const("vSchema", a);
      u = (0, Fr.or)(...s.map((E, _) => P(g, _)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (g) => t.if((0, Fr._)`${d()}(${r}, ${g})`, () => t.assign(u, !0).break()));
    }
    function P(g, E) {
      const _ = s[E];
      return typeof _ == "object" && _ !== null ? (0, Fr._)`${d()}(${r}, ${g}[${E}])` : (0, Fr._)`${r} === ${_}`;
    }
  }
};
Ka.default = tp;
Object.defineProperty(Aa, "__esModule", { value: !0 });
const rp = ka, np = Ca, sp = Da, ap = La, op = Fa, ip = Va, cp = za, lp = Ua, up = qa, dp = Ka, fp = [
  // number
  rp.default,
  np.default,
  // string
  sp.default,
  ap.default,
  // object
  op.default,
  ip.default,
  // array
  cp.default,
  lp.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  up.default,
  dp.default
];
Aa.default = fp;
var Ga = {}, Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.validateAdditionalItems = void 0;
const Xt = te, Vs = M, hp = {
  message: ({ params: { len: e } }) => (0, Xt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Xt._)`{limit: ${e}}`
}, mp = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: hp,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Vs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Ml(e, n);
  }
};
function Ml(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: o } = e;
  o.items = !0;
  const c = r.const("len", (0, Xt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Xt._)`${c} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Vs.alwaysValidSchema)(o, n)) {
    const d = r.var("valid", (0, Xt._)`${c} <= ${t.length}`);
    r.if((0, Xt.not)(d), () => l(d)), e.ok(d);
  }
  function l(d) {
    r.forRange("i", t.length, c, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: Vs.Type.Num }, d), o.allErrors || r.if((0, Xt.not)(d), () => r.break());
    });
  }
}
Sr.validateAdditionalItems = Ml;
Sr.default = mp;
var Ha = {}, Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.validateTuple = void 0;
const Ei = te, Tn = M, pp = x, $p = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Ll(e, "additionalItems", t);
    r.items = !0, !(0, Tn.alwaysValidSchema)(r, t) && e.ok((0, pp.validateArray)(e));
  }
};
function Ll(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: o, it: c } = e;
  u(s), c.opts.unevaluated && r.length && c.items !== !0 && (c.items = Tn.mergeEvaluated.items(n, r.length, c.items));
  const l = n.name("valid"), d = n.const("len", (0, Ei._)`${a}.length`);
  r.forEach((h, P) => {
    (0, Tn.alwaysValidSchema)(c, h) || (n.if((0, Ei._)`${d} > ${P}`, () => e.subschema({
      keyword: o,
      schemaProp: P,
      dataProp: P
    }, l)), e.ok(l));
  });
  function u(h) {
    const { opts: P, errSchemaPath: g } = c, E = r.length, _ = E === h.minItems && (E === h.maxItems || h[t] === !1);
    if (P.strictTuples && !_) {
      const y = `"${o}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${g}"`;
      (0, Tn.checkStrictMode)(c, y, P.strictTuples);
    }
  }
}
Pr.validateTuple = Ll;
Pr.default = $p;
Object.defineProperty(Ha, "__esModule", { value: !0 });
const yp = Pr, gp = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, yp.validateTuple)(e, "items")
};
Ha.default = gp;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
const bi = te, _p = M, vp = x, wp = Sr, Ep = {
  message: ({ params: { len: e } }) => (0, bi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, bi._)`{limit: ${e}}`
}, bp = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Ep,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, _p.alwaysValidSchema)(n, t) && (s ? (0, wp.validateAdditionalItems)(e, s) : e.ok((0, vp.validateArray)(e)));
  }
};
Ba.default = bp;
var Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const Ge = te, dn = M, Sp = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge.str)`must contain at least ${e} valid item(s)` : (0, Ge.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge._)`{minContains: ${e}}` : (0, Ge._)`{minContains: ${e}, maxContains: ${t}}`
}, Pp = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Sp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let o, c;
    const { minContains: l, maxContains: d } = n;
    a.opts.next ? (o = l === void 0 ? 1 : l, c = d) : o = 1;
    const u = t.const("len", (0, Ge._)`${s}.length`);
    if (e.setParams({ min: o, max: c }), c === void 0 && o === 0) {
      (0, dn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (c !== void 0 && o > c) {
      (0, dn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, dn.alwaysValidSchema)(a, r)) {
      let _ = (0, Ge._)`${u} >= ${o}`;
      c !== void 0 && (_ = (0, Ge._)`${_} && ${u} <= ${c}`), e.pass(_);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    c === void 0 && o === 1 ? g(h, () => t.if(h, () => t.break())) : o === 0 ? (t.let(h, !0), c !== void 0 && t.if((0, Ge._)`${s}.length > 0`, P)) : (t.let(h, !1), P()), e.result(h, () => e.reset());
    function P() {
      const _ = t.name("_valid"), y = t.let("count", 0);
      g(_, () => t.if(_, () => E(y)));
    }
    function g(_, y) {
      t.forRange("i", 0, u, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: dn.Type.Num,
          compositeRule: !0
        }, _), y();
      });
    }
    function E(_) {
      t.code((0, Ge._)`${_}++`), c === void 0 ? t.if((0, Ge._)`${_} >= ${o}`, () => t.assign(h, !0).break()) : (t.if((0, Ge._)`${_} > ${c}`, () => t.assign(h, !1).break()), o === 1 ? t.assign(h, !0) : t.if((0, Ge._)`${_} >= ${o}`, () => t.assign(h, !0)));
    }
  }
};
Wa.default = Pp;
var Fl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = te, r = M, n = x;
  e.error = {
    message: ({ params: { property: l, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${l} is present`;
    },
    params: ({ params: { property: l, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${l},
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
    code(l) {
      const [d, u] = a(l);
      o(l, d), c(l, u);
    }
  };
  function a({ schema: l }) {
    const d = {}, u = {};
    for (const h in l) {
      if (h === "__proto__")
        continue;
      const P = Array.isArray(l[h]) ? d : u;
      P[h] = l[h];
    }
    return [d, u];
  }
  function o(l, d = l.schema) {
    const { gen: u, data: h, it: P } = l;
    if (Object.keys(d).length === 0)
      return;
    const g = u.let("missing");
    for (const E in d) {
      const _ = d[E];
      if (_.length === 0)
        continue;
      const y = (0, n.propertyInData)(u, h, E, P.opts.ownProperties);
      l.setParams({
        property: E,
        depsCount: _.length,
        deps: _.join(", ")
      }), P.allErrors ? u.if(y, () => {
        for (const m of _)
          (0, n.checkReportMissingProp)(l, m);
      }) : (u.if((0, t._)`${y} && (${(0, n.checkMissingProp)(l, _, g)})`), (0, n.reportMissingProp)(l, g), u.else());
    }
  }
  e.validatePropertyDeps = o;
  function c(l, d = l.schema) {
    const { gen: u, data: h, keyword: P, it: g } = l, E = u.name("valid");
    for (const _ in d)
      (0, r.alwaysValidSchema)(g, d[_]) || (u.if(
        (0, n.propertyInData)(u, h, _, g.opts.ownProperties),
        () => {
          const y = l.subschema({ keyword: P, schemaProp: _ }, E);
          l.mergeValidEvaluated(y, E);
        },
        () => u.var(E, !0)
        // TODO var
      ), l.ok(E));
  }
  e.validateSchemaDeps = c, e.default = s;
})(Fl);
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Vl = te, Np = M, Op = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Vl._)`{propertyName: ${e.propertyName}}`
}, Rp = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Op,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Np.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, a), t.if((0, Vl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Ja.default = Rp;
var ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
const fn = x, Xe = te, Tp = dt, hn = M, Ip = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Xe._)`{additionalProperty: ${e.additionalProperty}}`
}, jp = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Ip,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: o } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: c, opts: l } = o;
    if (o.props = !0, l.removeAdditional !== "all" && (0, hn.alwaysValidSchema)(o, r))
      return;
    const d = (0, fn.allSchemaProperties)(n.properties), u = (0, fn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Xe._)`${a} === ${Tp.default.errors}`);
    function h() {
      t.forIn("key", s, (y) => {
        !d.length && !u.length ? E(y) : t.if(P(y), () => E(y));
      });
    }
    function P(y) {
      let m;
      if (d.length > 8) {
        const w = (0, hn.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, fn.isOwnProperty)(t, w, y);
      } else d.length ? m = (0, Xe.or)(...d.map((w) => (0, Xe._)`${y} === ${w}`)) : m = Xe.nil;
      return u.length && (m = (0, Xe.or)(m, ...u.map((w) => (0, Xe._)`${(0, fn.usePattern)(e, w)}.test(${y})`))), (0, Xe.not)(m);
    }
    function g(y) {
      t.code((0, Xe._)`delete ${s}[${y}]`);
    }
    function E(y) {
      if (l.removeAdditional === "all" || l.removeAdditional && r === !1) {
        g(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), c || t.break();
        return;
      }
      if (typeof r == "object" && !(0, hn.alwaysValidSchema)(o, r)) {
        const m = t.name("valid");
        l.removeAdditional === "failing" ? (_(y, m, !1), t.if((0, Xe.not)(m), () => {
          e.reset(), g(y);
        })) : (_(y, m), c || t.if((0, Xe.not)(m), () => t.break()));
      }
    }
    function _(y, m, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: hn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, m);
    }
  }
};
ts.default = jp;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
const Ap = xe, Si = x, _s = M, Pi = ts, kp = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Pi.default.code(new Ap.KeywordCxt(a, Pi.default, "additionalProperties"));
    const o = (0, Si.allSchemaProperties)(r);
    for (const h of o)
      a.definedProperties.add(h);
    a.opts.unevaluated && o.length && a.props !== !0 && (a.props = _s.mergeEvaluated.props(t, (0, _s.toHash)(o), a.props));
    const c = o.filter((h) => !(0, _s.alwaysValidSchema)(a, r[h]));
    if (c.length === 0)
      return;
    const l = t.name("valid");
    for (const h of c)
      d(h) ? u(h) : (t.if((0, Si.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(l);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, l);
    }
  }
};
Xa.default = kp;
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
const Ni = x, mn = te, Oi = M, Ri = M, Cp = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: o } = a, c = (0, Ni.allSchemaProperties)(r), l = c.filter((_) => (0, Oi.alwaysValidSchema)(a, r[_]));
    if (c.length === 0 || l.length === c.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = o.strictSchema && !o.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof mn.Name) && (a.props = (0, Ri.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    P();
    function P() {
      for (const _ of c)
        d && g(_), a.allErrors ? E(_) : (t.var(u, !0), E(_), t.if(u));
    }
    function g(_) {
      for (const y in d)
        new RegExp(_).test(y) && (0, Oi.checkStrictMode)(a, `property ${y} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function E(_) {
      t.forIn("key", n, (y) => {
        t.if((0, mn._)`${(0, Ni.usePattern)(e, _)}.test(${y})`, () => {
          const m = l.includes(_);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: y,
            dataPropType: Ri.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, mn._)`${h}[${y}]`, !0) : !m && !a.allErrors && t.if((0, mn.not)(u), () => t.break());
        });
      });
    }
  }
};
Ya.default = Cp;
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const Dp = M, Mp = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Dp.alwaysValidSchema)(n, r)) {
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
Qa.default = Mp;
var Za = {};
Object.defineProperty(Za, "__esModule", { value: !0 });
const Lp = x, Fp = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Lp.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Za.default = Fp;
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const In = te, Vp = M, zp = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, In._)`{passingSchemas: ${e.passing}}`
}, Up = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: zp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, o = t.let("valid", !1), c = t.let("passing", null), l = t.name("_valid");
    e.setParams({ passing: c }), t.block(d), e.result(o, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let P;
        (0, Vp.alwaysValidSchema)(s, u) ? t.var(l, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, l), h > 0 && t.if((0, In._)`${l} && ${o}`).assign(o, !1).assign(c, (0, In._)`[${c}, ${h}]`).else(), t.if(l, () => {
          t.assign(o, !0), t.assign(c, h), P && e.mergeEvaluated(P, In.Name);
        });
      });
    }
  }
};
xa.default = Up;
var eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
const qp = M, Kp = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, o) => {
      if ((0, qp.alwaysValidSchema)(n, a))
        return;
      const c = e.subschema({ keyword: "allOf", schemaProp: o }, s);
      e.ok(s), e.mergeEvaluated(c);
    });
  }
};
eo.default = Kp;
var to = {};
Object.defineProperty(to, "__esModule", { value: !0 });
const zn = te, zl = M, Gp = {
  message: ({ params: e }) => (0, zn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, zn._)`{failingKeyword: ${e.ifClause}}`
}, Hp = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Gp,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, zl.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Ti(n, "then"), a = Ti(n, "else");
    if (!s && !a)
      return;
    const o = t.let("valid", !0), c = t.name("_valid");
    if (l(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(c, d("then", u), d("else", u));
    } else s ? t.if(c, d("then")) : t.if((0, zn.not)(c), d("else"));
    e.pass(o, () => e.error(!0));
    function l() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, c);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const P = e.subschema({ keyword: u }, c);
        t.assign(o, c), e.mergeValidEvaluated(P, o), h ? t.assign(h, (0, zn._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Ti(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, zl.alwaysValidSchema)(e, r);
}
to.default = Hp;
var ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
const Bp = M, Wp = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Bp.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
ro.default = Wp;
Object.defineProperty(Ga, "__esModule", { value: !0 });
const Jp = Sr, Xp = Ha, Yp = Pr, Qp = Ba, Zp = Wa, xp = Fl, e$ = Ja, t$ = ts, r$ = Xa, n$ = Ya, s$ = Qa, a$ = Za, o$ = xa, i$ = eo, c$ = to, l$ = ro;
function u$(e = !1) {
  const t = [
    // any
    s$.default,
    a$.default,
    o$.default,
    i$.default,
    c$.default,
    l$.default,
    // object
    e$.default,
    t$.default,
    xp.default,
    r$.default,
    n$.default
  ];
  return e ? t.push(Xp.default, Qp.default) : t.push(Jp.default, Yp.default), t.push(Zp.default), t;
}
Ga.default = u$;
var no = {}, so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
const $e = te, d$ = {
  message: ({ schemaCode: e }) => (0, $e.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, $e._)`{format: ${e}}`
}, f$ = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: d$,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: o, it: c } = e, { opts: l, errSchemaPath: d, schemaEnv: u, self: h } = c;
    if (!l.validateFormats)
      return;
    s ? P() : g();
    function P() {
      const E = r.scopeValue("formats", {
        ref: h.formats,
        code: l.code.formats
      }), _ = r.const("fDef", (0, $e._)`${E}[${o}]`), y = r.let("fType"), m = r.let("format");
      r.if((0, $e._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => r.assign(y, (0, $e._)`${_}.type || "string"`).assign(m, (0, $e._)`${_}.validate`), () => r.assign(y, (0, $e._)`"string"`).assign(m, _)), e.fail$data((0, $e.or)(w(), N()));
      function w() {
        return l.strictSchema === !1 ? $e.nil : (0, $e._)`${o} && !${m}`;
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
        if (l.strictSchema === !1) {
          h.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const U = I instanceof RegExp ? (0, $e.regexpCode)(I) : l.code.formats ? (0, $e._)`${l.code.formats}${(0, $e.getProperty)(a)}` : void 0, B = r.scopeValue("formats", { key: a, ref: I, code: U });
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
so.default = f$;
Object.defineProperty(no, "__esModule", { value: !0 });
const h$ = so, m$ = [h$.default];
no.default = m$;
var vr = {};
Object.defineProperty(vr, "__esModule", { value: !0 });
vr.contentVocabulary = vr.metadataVocabulary = void 0;
vr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
vr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Ta, "__esModule", { value: !0 });
const p$ = Ia, $$ = Aa, y$ = Ga, g$ = no, Ii = vr, _$ = [
  p$.default,
  $$.default,
  (0, y$.default)(),
  g$.default,
  Ii.metadataVocabulary,
  Ii.contentVocabulary
];
Ta.default = _$;
var ao = {}, rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
rs.DiscrError = void 0;
var ji;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(ji || (rs.DiscrError = ji = {}));
Object.defineProperty(ao, "__esModule", { value: !0 });
const lr = te, zs = rs, Ai = Fe, v$ = br, w$ = M, E$ = {
  message: ({ params: { discrError: e, tagName: t } }) => e === zs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, lr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, b$ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: E$,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: o } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const c = n.propertyName;
    if (typeof c != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const l = t.let("valid", !1), d = t.const("tag", (0, lr._)`${r}${(0, lr.getProperty)(c)}`);
    t.if((0, lr._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: zs.DiscrError.Tag, tag: d, tagName: c })), e.ok(l);
    function u() {
      const g = P();
      t.if(!1);
      for (const E in g)
        t.elseIf((0, lr._)`${d} === ${E}`), t.assign(l, h(g[E]));
      t.else(), e.error(!1, { discrError: zs.DiscrError.Mapping, tag: d, tagName: c }), t.endIf();
    }
    function h(g) {
      const E = t.name("valid"), _ = e.subschema({ keyword: "oneOf", schemaProp: g }, E);
      return e.mergeEvaluated(_, lr.Name), E;
    }
    function P() {
      var g;
      const E = {}, _ = m(s);
      let y = !0;
      for (let R = 0; R < o.length; R++) {
        let I = o[R];
        if (I != null && I.$ref && !(0, w$.schemaHasRulesButRef)(I, a.self.RULES)) {
          const B = I.$ref;
          if (I = Ai.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, B), I instanceof Ai.SchemaEnv && (I = I.schema), I === void 0)
            throw new v$.default(a.opts.uriResolver, a.baseId, B);
        }
        const U = (g = I == null ? void 0 : I.properties) === null || g === void 0 ? void 0 : g[c];
        if (typeof U != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${c}"`);
        y = y && (_ || m(I)), w(U, R);
      }
      if (!y)
        throw new Error(`discriminator: "${c}" must be required`);
      return E;
      function m({ required: R }) {
        return Array.isArray(R) && R.includes(c);
      }
      function w(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const U of R.enum)
            N(U, I);
        else
          throw new Error(`discriminator: "properties/${c}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in E)
          throw new Error(`discriminator: "${c}" values must be unique strings`);
        E[R] = I;
      }
    }
  }
};
ao.default = b$;
const S$ = "http://json-schema.org/draft-07/schema#", P$ = "http://json-schema.org/draft-07/schema#", N$ = "Core schema meta-schema", O$ = {
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
}, R$ = [
  "object",
  "boolean"
], T$ = {
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
}, I$ = {
  $schema: S$,
  $id: P$,
  title: N$,
  definitions: O$,
  type: R$,
  properties: T$,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Hc, n = Ta, s = ao, a = I$, o = ["/properties"], c = "http://json-schema.org/draft-07/schema";
  class l extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(a, o) : a;
      this.addMetaSchema(E, c, !1), this.refs["http://json-schema.org/schema"] = c;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(c) ? c : void 0);
    }
  }
  t.Ajv = l, e.exports = t = l, e.exports.Ajv = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
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
  var h = xr;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var P = br;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(ks, ks.exports);
var j$ = ks.exports, Us = { exports: {} }, Ul = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(V, H) {
    return { validate: V, compare: H };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, o),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(l, d),
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
  const c = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function l(V, H) {
    const se = c.exec(V);
    if (!se)
      return !1;
    const Q = +se[1], fe = +se[2], C = +se[3], k = se[5];
    return (Q <= 23 && fe <= 59 && C <= 59 || Q === 23 && fe === 59 && C === 60) && (!H || k !== "");
  }
  function d(V, H) {
    if (!(V && H))
      return;
    const se = c.exec(V), Q = c.exec(H);
    if (se && Q)
      return V = se[1] + se[2] + se[3] + (se[4] || ""), H = Q[1] + Q[2] + Q[3] + (Q[4] || ""), V > H ? 1 : V < H ? -1 : 0;
  }
  const u = /t|\s/i;
  function h(V) {
    const H = V.split(u);
    return H.length === 2 && a(H[0]) && l(H[1], !0);
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
})(Ul);
var ql = {}, qs = { exports: {} }, Kl = {}, et = {}, wr = {}, tn = {}, Z = {}, Qr = {};
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
      c(N, w[R]), N.push(m[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function o(m, ...w) {
    const N = [g(m[0])];
    let R = 0;
    for (; R < w.length; )
      N.push(a), c(N, w[R]), N.push(a, g(m[++R]));
    return l(N), new n(N);
  }
  e.str = o;
  function c(m, w) {
    w instanceof n ? m.push(...w._items) : w instanceof r ? m.push(w) : m.push(h(w));
  }
  e.addCodeArg = c;
  function l(m) {
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
var Ks = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Qr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(l) {
    l[l.Started = 0] = "Started", l[l.Completed = 1] = "Completed";
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
  class c extends s {
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
  e.ValueScope = c;
})(Ks);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Qr, r = Ks;
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
    constructor(i, f, S) {
      super(), this.varKind = i, this.name = f, this.rhs = S;
    }
    render({ es5: i, _n: f }) {
      const S = i ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${S} ${this.name}${j};` + f;
    }
    optimizeNames(i, f) {
      if (i[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, i, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class c extends a {
    constructor(i, f, S) {
      super(), this.lhs = i, this.rhs = f, this.sideEffects = S;
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
  class l extends c {
    constructor(i, f, S, j) {
      super(i, S, j), this.op = f;
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
      return this.nodes.reduce((f, S) => f + S.render(i), "");
    }
    optimizeNodes() {
      const { nodes: i } = this;
      let f = i.length;
      for (; f--; ) {
        const S = i[f].optimizeNodes();
        Array.isArray(S) ? i.splice(f, 1, ...S) : S ? i[f] = S : i.splice(f, 1);
      }
      return i.length > 0 ? this : void 0;
    }
    optimizeNames(i, f) {
      const { nodes: S } = this;
      let j = S.length;
      for (; j--; ) {
        const A = S[j];
        A.optimizeNames(i, f) || (k(i, A.names), S.splice(j, 1));
      }
      return S.length > 0 ? this : void 0;
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
        const S = f.optimizeNodes();
        f = this.else = Array.isArray(S) ? new y(S) : S;
      }
      if (f)
        return i === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(z(i), f instanceof m ? [f] : f.nodes);
      if (!(i === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(i, f) {
      var S;
      if (this.else = (S = this.else) === null || S === void 0 ? void 0 : S.optimizeNames(i, f), !!(super.optimizeNames(i, f) || this.else))
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
    constructor(i, f, S, j) {
      super(), this.varKind = i, this.name = f, this.from = S, this.to = j;
    }
    render(i) {
      const f = i.es5 ? r.varKinds.var : this.varKind, { name: S, from: j, to: A } = this;
      return `for(${f} ${S}=${j}; ${S}<${A}; ${S}++)` + super.render(i);
    }
    get names() {
      const i = fe(super.names, this.from);
      return fe(i, this.to);
    }
  }
  class I extends w {
    constructor(i, f, S, j) {
      super(), this.loop = i, this.varKind = f, this.name = S, this.iterable = j;
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
    constructor(i, f, S) {
      super(), this.name = i, this.args = f, this.async = S;
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
      var S, j;
      return super.optimizeNames(i, f), (S = this.catch) === null || S === void 0 || S.optimizeNames(i, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(i, f), this;
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
      const S = this._extScope.value(i, f);
      return (this._values[S.prefix] || (this._values[S.prefix] = /* @__PURE__ */ new Set())).add(S), S;
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
    _def(i, f, S, j) {
      const A = this._scope.toName(f);
      return S !== void 0 && j && (this._constants[A.str] = S), this._leafNode(new o(i, A, S)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(i, f, S) {
      return this._def(r.varKinds.const, i, f, S);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(i, f, S) {
      return this._def(r.varKinds.let, i, f, S);
    }
    // `var` declaration with optional assignment
    var(i, f, S) {
      return this._def(r.varKinds.var, i, f, S);
    }
    // assignment code
    assign(i, f, S) {
      return this._leafNode(new c(i, f, S));
    }
    // `+=` code
    add(i, f) {
      return this._leafNode(new l(i, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(i) {
      return typeof i == "function" ? i() : i !== t.nil && this._leafNode(new P(i)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...i) {
      const f = ["{"];
      for (const [S, j] of i)
        f.length > 1 && f.push(","), f.push(S), (S !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(i, f, S) {
      if (this._blockNode(new m(i)), f && S)
        this.code(f).else().code(S).endIf();
      else if (f)
        this.code(f).endIf();
      else if (S)
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
    forRange(i, f, S, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(i);
      return this._for(new R(A, q, f, S), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(i, f, S, j = r.varKinds.const) {
      const A = this._scope.toName(i);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), S(A);
        });
      }
      return this._for(new I("of", j, A, f), () => S(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(i, f, S, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(i, (0, t._)`Object.keys(${f})`, S);
      const A = this._scope.toName(i);
      return this._for(new I("in", j, A, f), () => S(A));
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
    try(i, f, S) {
      if (!f && !S)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new de();
      if (this._blockNode(j), this.code(i), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return S && (this._currNode = j.finally = new H(), this.code(S)), this._endBlockNode(V, H);
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
      const S = this._nodes.length - f;
      if (S < 0 || i !== void 0 && S !== i)
        throw new Error(`CodeGen: wrong number of nodes: ${S} vs ${i} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(i, f = t.nil, S, j) {
      return this._blockNode(new U(i, f, S)), j && this.code(j).endFunc(), this;
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
      const S = this._currNode;
      if (S instanceof i || f && S instanceof f)
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
      return S($);
    if (!j($))
      return $;
    return new t._Code($._items.reduce((A, q) => (q instanceof t.Name && (q = S(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function S(A) {
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
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${b($)}`;
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
    return (i, f) => i === t.nil ? f : f === t.nil ? i : (0, t._)`${b(i)} ${$} ${b(f)}`;
  }
  function b($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(Z);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const le = Z, A$ = Qr;
function k$(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = k$;
function C$(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Gl(e, t), !Hl(t, e.self.RULES.all));
}
L.alwaysValidSchema = C$;
function Gl(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Jl(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = Gl;
function Hl(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = Hl;
function D$(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = D$;
function M$({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, le._)`${r}`;
  }
  return (0, le._)`${e}${t}${(0, le.getProperty)(n)}`;
}
L.schemaRefOrVal = M$;
function L$(e) {
  return Bl(decodeURIComponent(e));
}
L.unescapeFragment = L$;
function F$(e) {
  return encodeURIComponent(oo(e));
}
L.escapeFragment = F$;
function oo(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = oo;
function Bl(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = Bl;
function V$(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = V$;
function ki({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, o, c) => {
    const l = o === void 0 ? a : o instanceof le.Name ? (a instanceof le.Name ? e(s, a, o) : t(s, a, o), o) : a instanceof le.Name ? (t(s, o, a), a) : r(a, o);
    return c === le.Name && !(l instanceof le.Name) ? n(s, l) : l;
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
    resultToName: Wl
  }),
  items: ki({
    mergeNames: (e, t, r) => e.if((0, le._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, le._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, le._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, le._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Wl(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, le._)`{}`);
  return t !== void 0 && io(e, r, t), r;
}
L.evaluatedPropsToName = Wl;
function io(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, le._)`${t}${(0, le.getProperty)(n)}`, !0));
}
L.setEvaluated = io;
const Ci = {};
function z$(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Ci[t.code] || (Ci[t.code] = new A$._Code(t.code))
  });
}
L.useFunc = z$;
var Gs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Gs || (L.Type = Gs = {}));
function U$(e, t, r) {
  if (e instanceof le.Name) {
    const n = t === Gs.Num;
    return r ? n ? (0, le._)`"[" + ${e} + "]"` : (0, le._)`"['" + ${e} + "']"` : n ? (0, le._)`"/" + ${e}` : (0, le._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, le.getProperty)(e).toString() : "/" + oo(e);
}
L.getErrorPath = U$;
function Jl(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = Jl;
var ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
const Re = Z, q$ = {
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
ft.default = q$;
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
    N ?? (U || B) ? l(I, de) : d(R, (0, t._)`[${de}]`);
  }
  e.reportError = s;
  function a(y, m = e.keywordError, w) {
    const { it: N } = y, { gen: R, compositeRule: I, allErrors: U } = N, B = h(y, m, w);
    l(R, B), I || U || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function o(y, m) {
    y.assign(n.default.errors, m), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(m, () => y.assign((0, t._)`${n.default.vErrors}.length`, m), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function c({ gen: y, keyword: m, schemaValue: w, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const U = y.name("err");
    y.forRange("i", R, n.default.errors, (B) => {
      y.const(U, (0, t._)`${n.default.vErrors}[${B}]`), y.if((0, t._)`${U}.instancePath === undefined`, () => y.assign((0, t._)`${U}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), y.assign((0, t._)`${U}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${m}`), I.opts.verbose && (y.assign((0, t._)`${U}.schema`, w), y.assign((0, t._)`${U}.data`, N));
    });
  }
  e.extendErrors = c;
  function l(y, m) {
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
})(tn);
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.boolOrEmptySchema = wr.topBoolOrEmptySchema = void 0;
const K$ = tn, G$ = Z, H$ = ft, B$ = {
  message: "boolean schema is false"
};
function W$(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Xl(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(H$.default.data) : (t.assign((0, G$._)`${n}.errors`, null), t.return(!0));
}
wr.topBoolOrEmptySchema = W$;
function J$(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Xl(e)) : r.var(t, !0);
}
wr.boolOrEmptySchema = J$;
function Xl(e, t) {
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
  (0, K$.reportError)(s, B$, void 0, t);
}
var _e = {}, tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.getRules = tr.isJSONType = void 0;
const X$ = ["string", "number", "integer", "boolean", "null", "object", "array"], Y$ = new Set(X$);
function Q$(e) {
  return typeof e == "string" && Y$.has(e);
}
tr.isJSONType = Q$;
function Z$() {
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
tr.getRules = Z$;
var pt = {};
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.shouldUseRule = pt.shouldUseGroup = pt.schemaHasRulesForType = void 0;
function x$({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Yl(e, n);
}
pt.schemaHasRulesForType = x$;
function Yl(e, t) {
  return t.rules.some((r) => Ql(e, r));
}
pt.shouldUseGroup = Yl;
function Ql(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
pt.shouldUseRule = Ql;
Object.defineProperty(_e, "__esModule", { value: !0 });
_e.reportTypeError = _e.checkDataTypes = _e.checkDataType = _e.coerceAndCheckDataType = _e.getJSONTypes = _e.getSchemaTypes = _e.DataType = void 0;
const ey = tr, ty = pt, ry = tn, Y = Z, Zl = L;
var mr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(mr || (_e.DataType = mr = {}));
function ny(e) {
  const t = xl(e.type);
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
_e.getSchemaTypes = ny;
function xl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(ey.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
_e.getJSONTypes = xl;
function sy(e, t) {
  const { gen: r, data: n, opts: s } = e, a = ay(t, s.coerceTypes), o = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, ty.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const c = co(t, n, s.strictNumbers, mr.Wrong);
    r.if(c, () => {
      a.length ? oy(e, t, a) : lo(e);
    });
  }
  return o;
}
_e.coerceAndCheckDataType = sy;
const eu = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function ay(e, t) {
  return t ? e.filter((r) => eu.has(r) || t === "array" && r === "array") : [];
}
function oy(e, t, r) {
  const { gen: n, data: s, opts: a } = e, o = n.let("dataType", (0, Y._)`typeof ${s}`), c = n.let("coerced", (0, Y._)`undefined`);
  a.coerceTypes === "array" && n.if((0, Y._)`${o} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Y._)`${s}[0]`).assign(o, (0, Y._)`typeof ${s}`).if(co(t, s, a.strictNumbers), () => n.assign(c, s))), n.if((0, Y._)`${c} !== undefined`);
  for (const d of r)
    (eu.has(d) || d === "array" && a.coerceTypes === "array") && l(d);
  n.else(), lo(e), n.endIf(), n.if((0, Y._)`${c} !== undefined`, () => {
    n.assign(s, c), iy(e, c);
  });
  function l(d) {
    switch (d) {
      case "string":
        n.elseIf((0, Y._)`${o} == "number" || ${o} == "boolean"`).assign(c, (0, Y._)`"" + ${s}`).elseIf((0, Y._)`${s} === null`).assign(c, (0, Y._)`""`);
        return;
      case "number":
        n.elseIf((0, Y._)`${o} == "boolean" || ${s} === null
              || (${o} == "string" && ${s} && ${s} == +${s})`).assign(c, (0, Y._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, Y._)`${o} === "boolean" || ${s} === null
              || (${o} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(c, (0, Y._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, Y._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(c, !1).elseIf((0, Y._)`${s} === "true" || ${s} === 1`).assign(c, !0);
        return;
      case "null":
        n.elseIf((0, Y._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(c, null);
        return;
      case "array":
        n.elseIf((0, Y._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${s} === null`).assign(c, (0, Y._)`[${s}]`);
    }
  }
}
function iy({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Y._)`${t} !== undefined`, () => e.assign((0, Y._)`${t}[${r}]`, n));
}
function Hs(e, t, r, n = mr.Correct) {
  const s = n === mr.Correct ? Y.operators.EQ : Y.operators.NEQ;
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
  return n === mr.Correct ? a : (0, Y.not)(a);
  function o(c = Y.nil) {
    return (0, Y.and)((0, Y._)`typeof ${t} == "number"`, c, r ? (0, Y._)`isFinite(${t})` : Y.nil);
  }
}
_e.checkDataType = Hs;
function co(e, t, r, n) {
  if (e.length === 1)
    return Hs(e[0], t, r, n);
  let s;
  const a = (0, Zl.toHash)(e);
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
const cy = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Y._)`{type: ${e}}` : (0, Y._)`{type: ${t}}`
};
function lo(e) {
  const t = ly(e);
  (0, ry.reportError)(t, cy);
}
_e.reportTypeError = lo;
function ly(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Zl.schemaRefOrVal)(e, n, "type");
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
const or = Z, uy = L;
function dy(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Di(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Di(e, a, s.default));
}
ns.assignDefaults = dy;
function Di(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: o } = e;
  if (r === void 0)
    return;
  const c = (0, or._)`${a}${(0, or.getProperty)(t)}`;
  if (s) {
    (0, uy.checkStrictMode)(e, `default is ignored for: ${c}`);
    return;
  }
  let l = (0, or._)`${c} === undefined`;
  o.useDefaults === "empty" && (l = (0, or._)`${l} || ${c} === null || ${c} === ""`), n.if(l, (0, or._)`${c} = ${(0, or.stringify)(r)}`);
}
var lt = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.validateUnion = ee.validateArray = ee.usePattern = ee.callValidateCode = ee.schemaProperties = ee.allSchemaProperties = ee.noPropertyInData = ee.propertyInData = ee.isOwnProperty = ee.hasPropFunc = ee.reportMissingProp = ee.checkMissingProp = ee.checkReportMissingProp = void 0;
const me = Z, uo = L, vt = ft, fy = L;
function hy(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(ho(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, me._)`${t}` }, !0), e.error();
  });
}
ee.checkReportMissingProp = hy;
function my({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, me.or)(...n.map((a) => (0, me.and)(ho(e, t, a, r.ownProperties), (0, me._)`${s} = ${a}`)));
}
ee.checkMissingProp = my;
function py(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ee.reportMissingProp = py;
function tu(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, me._)`Object.prototype.hasOwnProperty`
  });
}
ee.hasPropFunc = tu;
function fo(e, t, r) {
  return (0, me._)`${tu(e)}.call(${t}, ${r})`;
}
ee.isOwnProperty = fo;
function $y(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} !== undefined`;
  return n ? (0, me._)`${s} && ${fo(e, t, r)}` : s;
}
ee.propertyInData = $y;
function ho(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} === undefined`;
  return n ? (0, me.or)(s, (0, me.not)(fo(e, t, r))) : s;
}
ee.noPropertyInData = ho;
function ru(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ee.allSchemaProperties = ru;
function yy(e, t) {
  return ru(t).filter((r) => !(0, uo.alwaysValidSchema)(e, t[r]));
}
ee.schemaProperties = yy;
function gy({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: o }, c, l, d) {
  const u = d ? (0, me._)`${e}, ${t}, ${n}${s}` : t, h = [
    [vt.default.instancePath, (0, me.strConcat)(vt.default.instancePath, a)],
    [vt.default.parentData, o.parentData],
    [vt.default.parentDataProperty, o.parentDataProperty],
    [vt.default.rootData, vt.default.rootData]
  ];
  o.opts.dynamicRef && h.push([vt.default.dynamicAnchors, vt.default.dynamicAnchors]);
  const P = (0, me._)`${u}, ${r.object(...h)}`;
  return l !== me.nil ? (0, me._)`${c}.call(${l}, ${P})` : (0, me._)`${c}(${P})`;
}
ee.callValidateCode = gy;
const _y = (0, me._)`new RegExp`;
function vy({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, me._)`${s.code === "new RegExp" ? _y : (0, fy.useFunc)(e, s)}(${r}, ${n})`
  });
}
ee.usePattern = vy;
function wy(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const c = t.let("valid", !0);
    return o(() => t.assign(c, !1)), c;
  }
  return t.var(a, !0), o(() => t.break()), a;
  function o(c) {
    const l = t.const("len", (0, me._)`${r}.length`);
    t.forRange("i", 0, l, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: uo.Type.Num
      }, a), t.if((0, me.not)(a), c);
    });
  }
}
ee.validateArray = wy;
function Ey(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((l) => (0, uo.alwaysValidSchema)(s, l)) && !s.opts.unevaluated)
    return;
  const o = t.let("valid", !1), c = t.name("_valid");
  t.block(() => r.forEach((l, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, c);
    t.assign(o, (0, me._)`${o} || ${c}`), e.mergeValidEvaluated(u, c) || t.if((0, me.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
ee.validateUnion = Ey;
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.validateKeywordUsage = lt.validSchemaType = lt.funcKeywordCode = lt.macroKeywordCode = void 0;
const ke = Z, Yt = ft, by = ee, Sy = tn;
function Py(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: o } = e, c = t.macro.call(o.self, s, a, o), l = nu(r, n, c);
  o.opts.validateSchema !== !1 && o.self.validateSchema(c, !0);
  const d = r.name("valid");
  e.subschema({
    schema: c,
    schemaPath: ke.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: l,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
lt.macroKeywordCode = Py;
function Ny(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: o, $data: c, it: l } = e;
  Ry(l, t);
  const d = !c && t.compile ? t.compile.call(l.self, a, o, l) : t.validate, u = nu(n, s, d), h = n.let("valid");
  e.block$data(h, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function P() {
    if (t.errors === !1)
      _(), t.modifying && Mi(e), y(() => e.error());
    else {
      const m = t.async ? g() : E();
      t.modifying && Mi(e), y(() => Oy(e, m));
    }
  }
  function g() {
    const m = n.let("ruleErrs", null);
    return n.try(() => _((0, ke._)`await `), (w) => n.assign(h, !1).if((0, ke._)`${w} instanceof ${l.ValidationError}`, () => n.assign(m, (0, ke._)`${w}.errors`), () => n.throw(w))), m;
  }
  function E() {
    const m = (0, ke._)`${u}.errors`;
    return n.assign(m, null), _(ke.nil), m;
  }
  function _(m = t.async ? (0, ke._)`await ` : ke.nil) {
    const w = l.opts.passContext ? Yt.default.this : Yt.default.self, N = !("compile" in t && !c || t.schema === !1);
    n.assign(h, (0, ke._)`${m}${(0, by.callValidateCode)(e, u, w, N)}`, t.modifying);
  }
  function y(m) {
    var w;
    n.if((0, ke.not)((w = t.valid) !== null && w !== void 0 ? w : h), m);
  }
}
lt.funcKeywordCode = Ny;
function Mi(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, ke._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Oy(e, t) {
  const { gen: r } = e;
  r.if((0, ke._)`Array.isArray(${t})`, () => {
    r.assign(Yt.default.vErrors, (0, ke._)`${Yt.default.vErrors} === null ? ${t} : ${Yt.default.vErrors}.concat(${t})`).assign(Yt.default.errors, (0, ke._)`${Yt.default.vErrors}.length`), (0, Sy.extendErrors)(e);
  }, () => e.error());
}
function Ry({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function nu(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, ke.stringify)(r) });
}
function Ty(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
lt.validSchemaType = Ty;
function Iy({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const o = s.dependencies;
  if (o != null && o.some((c) => !Object.prototype.hasOwnProperty.call(e, c)))
    throw new Error(`parent schema must have dependencies of ${a}: ${o.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const l = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(l);
    else
      throw new Error(l);
  }
}
lt.validateKeywordUsage = Iy;
var Rt = {};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.extendSubschemaMode = Rt.extendSubschemaData = Rt.getSubschema = void 0;
const at = Z, su = L;
function jy(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const c = e.schema[t];
    return r === void 0 ? {
      schema: c,
      schemaPath: (0, at._)`${e.schemaPath}${(0, at.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: c[r],
      schemaPath: (0, at._)`${e.schemaPath}${(0, at.getProperty)(t)}${(0, at.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, su.escapeFragment)(r)}`
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
Rt.getSubschema = jy;
function Ay(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: o }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: c } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: u, opts: h } = t, P = c.let("data", (0, at._)`${t.data}${(0, at.getProperty)(r)}`, !0);
    l(P), e.errorPath = (0, at.str)`${d}${(0, su.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, at._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof at.Name ? s : c.let("data", s, !0);
    l(d), o !== void 0 && (e.propertyName = o);
  }
  a && (e.dataTypes = a);
  function l(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Rt.extendSubschemaData = Ay;
function ky(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Rt.extendSubschemaMode = ky;
var Pe = {}, au = { exports: {} }, Nt = au.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  jn(t, n, s, e, "", e);
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
function jn(e, t, r, n, s, a, o, c, l, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, o, c, l, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Nt.arrayKeywords)
          for (var P = 0; P < h.length; P++)
            jn(e, t, r, h[P], s + "/" + u + "/" + P, a, s, u, n, P);
      } else if (u in Nt.propsKeywords) {
        if (h && typeof h == "object")
          for (var g in h)
            jn(e, t, r, h[g], s + "/" + u + "/" + Cy(g), a, s, u, n, g);
      } else (u in Nt.keywords || e.allKeys && !(u in Nt.skipKeywords)) && jn(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, o, c, l, d);
  }
}
function Cy(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Dy = au.exports;
Object.defineProperty(Pe, "__esModule", { value: !0 });
Pe.getSchemaRefs = Pe.resolveUrl = Pe.normalizeId = Pe._getFullPath = Pe.getFullPath = Pe.inlineRef = void 0;
const My = L, Ly = Qn, Fy = Dy, Vy = /* @__PURE__ */ new Set([
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
function zy(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Bs(e) : t ? ou(e) <= t : !1;
}
Pe.inlineRef = zy;
const Uy = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Bs(e) {
  for (const t in e) {
    if (Uy.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Bs) || typeof r == "object" && Bs(r))
      return !0;
  }
  return !1;
}
function ou(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Vy.has(r) && (typeof e[r] == "object" && (0, My.eachItem)(e[r], (n) => t += ou(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function iu(e, t = "", r) {
  r !== !1 && (t = pr(t));
  const n = e.parse(t);
  return cu(e, n);
}
Pe.getFullPath = iu;
function cu(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Pe._getFullPath = cu;
const qy = /#\/?$/;
function pr(e) {
  return e ? e.replace(qy, "") : "";
}
Pe.normalizeId = pr;
function Ky(e, t, r) {
  return r = pr(r), e.resolve(t, r);
}
Pe.resolveUrl = Ky;
const Gy = /^[a-z_][-a-z0-9._]*$/i;
function Hy(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = pr(e[r] || t), a = { "": s }, o = iu(n, s, !1), c = {}, l = /* @__PURE__ */ new Set();
  return Fy(e, { allKeys: !0 }, (h, P, g, E) => {
    if (E === void 0)
      return;
    const _ = o + P;
    let y = a[E];
    typeof h[r] == "string" && (y = m.call(this, h[r])), w.call(this, h.$anchor), w.call(this, h.$dynamicAnchor), a[P] = y;
    function m(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = pr(y ? R(y, N) : N), l.has(N))
        throw u(N);
      l.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(h, I.schema, N) : N !== pr(_) && (N[0] === "#" ? (d(h, c[N], N), c[N] = h) : this.refs[N] = _), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!Gy.test(N))
          throw new Error(`invalid anchor "${N}"`);
        m.call(this, `#${N}`);
      }
    }
  }), c;
  function d(h, P, g) {
    if (P !== void 0 && !Ly(h, P))
      throw u(g);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Pe.getSchemaRefs = Hy;
Object.defineProperty(et, "__esModule", { value: !0 });
et.getData = et.KeywordCxt = et.validateFunctionCode = void 0;
const lu = wr, Li = _e, mo = pt, Un = _e, By = ns, Hr = lt, vs = Rt, G = Z, J = ft, Wy = Pe, $t = L, Cr = tn;
function Jy(e) {
  if (fu(e) && (hu(e), du(e))) {
    Qy(e);
    return;
  }
  uu(e, () => (0, lu.topBoolOrEmptySchema)(e));
}
et.validateFunctionCode = Jy;
function uu({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, G._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${Fi(r, s)}`), Yy(e, s), e.code(a);
  }) : e.func(t, (0, G._)`${J.default.data}, ${Xy(s)}`, n.$async, () => e.code(Fi(r, s)).code(a));
}
function Xy(e) {
  return (0, G._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, G._)`, ${J.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function Yy(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, G._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, G._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, G._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, G._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, G._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, G._)`""`), e.var(J.default.parentData, (0, G._)`undefined`), e.var(J.default.parentDataProperty, (0, G._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function Qy(e) {
  const { schema: t, opts: r, gen: n } = e;
  uu(e, () => {
    r.$comment && t.$comment && pu(e), rg(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && Zy(e), mu(e), ag(e);
  });
}
function Zy(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function Fi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function xy(e, t) {
  if (fu(e) && (hu(e), du(e))) {
    eg(e, t);
    return;
  }
  (0, lu.boolOrEmptySchema)(e, t);
}
function du({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function fu(e) {
  return typeof e.schema != "boolean";
}
function eg(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && pu(e), ng(e), sg(e);
  const a = n.const("_errs", J.default.errors);
  mu(e, a), n.var(t, (0, G._)`${a} === ${J.default.errors}`);
}
function hu(e) {
  (0, $t.checkUnknownRules)(e), tg(e);
}
function mu(e, t) {
  if (e.opts.jtd)
    return Vi(e, [], !1, t);
  const r = (0, Li.getSchemaTypes)(e.schema), n = (0, Li.coerceAndCheckDataType)(e, r);
  Vi(e, r, !n, t);
}
function tg(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, $t.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function rg(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, $t.checkStrictMode)(e, "default is ignored in the schema root");
}
function ng(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Wy.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function sg(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function pu({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${J.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const o = (0, G.str)`${n}/$comment`, c = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${J.default.self}.opts.$comment(${a}, ${o}, ${c}.schema)`);
  }
}
function ag(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, G._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, G._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, J.default.vErrors), a.unevaluated && og(e), t.return((0, G._)`${J.default.errors} === 0`));
}
function og({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function Vi(e, t, r, n) {
  const { gen: s, schema: a, data: o, allErrors: c, opts: l, self: d } = e, { RULES: u } = d;
  if (a.$ref && (l.ignoreKeywordsWithRef || !(0, $t.schemaHasRulesButRef)(a, u))) {
    s.block(() => gu(e, "$ref", u.all.$ref.definition));
    return;
  }
  l.jtd || ig(e, t), s.block(() => {
    for (const P of u.rules)
      h(P);
    h(u.post);
  });
  function h(P) {
    (0, mo.shouldUseGroup)(a, P) && (P.type ? (s.if((0, Un.checkDataType)(P.type, o, l.strictNumbers)), zi(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Un.reportTypeError)(e)), s.endIf()) : zi(e, P), c || s.if((0, G._)`${J.default.errors} === ${n || 0}`));
  }
}
function zi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, By.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, mo.shouldUseRule)(n, a) && gu(e, a.keyword, a.definition, t.type);
  });
}
function ig(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (cg(e, t), e.opts.allowUnionTypes || lg(e, t), ug(e, e.dataTypes));
}
function cg(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      $u(e.dataTypes, r) || po(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), fg(e, t);
  }
}
function lg(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && po(e, "use allowUnionTypes to allow union type keyword");
}
function ug(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, mo.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((o) => dg(t, o)) && po(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function dg(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function $u(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function fg(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    $u(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function po(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, $t.checkStrictMode)(e, t, e.opts.strictTypes);
}
class yu {
  constructor(t, r, n) {
    if ((0, Hr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, $t.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", _u(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Hr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Cr.reportExtraError : Cr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Cr.reportError)(this, this.def.$dataError || Cr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Cr.resetErrorsCount)(this.gen, this.errsCount);
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
    return (0, G.or)(o(), c());
    function o() {
      if (n.length) {
        if (!(r instanceof G.Name))
          throw new Error("ajv implementation error");
        const l = Array.isArray(n) ? n : [n];
        return (0, G._)`${(0, Un.checkDataTypes)(l, r, a.opts.strictNumbers, Un.DataType.Wrong)}`;
      }
      return G.nil;
    }
    function c() {
      if (s.validateSchema) {
        const l = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, G._)`!${l}(${r})`;
      }
      return G.nil;
    }
  }
  subschema(t, r) {
    const n = (0, vs.getSubschema)(this.it, t);
    (0, vs.extendSubschemaData)(n, this.it, t), (0, vs.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return xy(s, r), s;
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
et.KeywordCxt = yu;
function gu(e, t, r, n) {
  const s = new yu(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Hr.funcKeywordCode)(s, r) : "macro" in r ? (0, Hr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Hr.funcKeywordCode)(s, r);
}
const hg = /^\/(?:[^~]|~0|~1)*$/, mg = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function _u(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!hg.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = J.default.rootData;
  } else {
    const d = mg.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +d[1];
    if (s = d[2], s === "#") {
      if (u >= t)
        throw new Error(l("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(l("data", u));
    if (a = r[t - u], !s)
      return a;
  }
  let o = a;
  const c = s.split("/");
  for (const d of c)
    d && (a = (0, G._)`${a}${(0, G.getProperty)((0, $t.unescapeJsonPointer)(d))}`, o = (0, G._)`${o} && ${a}`);
  return o;
  function l(d, u) {
    return `Cannot access ${d} ${u} levels up, current level is ${t}`;
  }
}
et.getData = _u;
var rn = {};
Object.defineProperty(rn, "__esModule", { value: !0 });
class pg extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
rn.default = pg;
var Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
const ws = Pe;
class $g extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, ws.resolveUrl)(t, r, n), this.missingSchema = (0, ws.normalizeId)((0, ws.getFullPath)(t, this.missingRef));
  }
}
Nr.default = $g;
var Ve = {};
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.resolveSchema = Ve.getCompilingSchema = Ve.resolveRef = Ve.compileSchema = Ve.SchemaEnv = void 0;
const Je = Z, yg = rn, Bt = ft, Ze = Pe, Ui = L, gg = et;
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
  const t = vu.call(this, e);
  if (t)
    return t;
  const r = (0, Ze.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, o = new Je.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let c;
  e.$async && (c = o.scopeValue("Error", {
    ref: yg.default,
    code: (0, Je._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = o.scopeName("validate");
  e.validateName = l;
  const d = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Bt.default.data,
    parentData: Bt.default.parentData,
    parentDataProperty: Bt.default.parentDataProperty,
    dataNames: [Bt.default.data],
    dataPathArr: [Je.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Je.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: c,
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
    this._compilations.add(e), (0, gg.validateFunctionCode)(d), o.optimize(this.opts.code.optimize);
    const h = o.toString();
    u = `${o.scopeRefs(Bt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const g = new Function(`${Bt.default.self}`, `${Bt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(l, { ref: g }), g.errors = null, g.schema = e.schema, g.schemaEnv = e, e.$async && (g.$async = !0), this.opts.code.source === !0 && (g.source = { validateName: l, validateCode: h, scopeValues: o._values }), this.opts.unevaluated) {
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
function _g(e, t, r) {
  var n;
  r = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Eg.call(this, e, r);
  if (a === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: c } = this.opts;
    o && (a = new ss({ schema: o, schemaId: c, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = vg.call(this, a);
}
Ve.resolveRef = _g;
function vg(e) {
  return (0, Ze.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : $o.call(this, e);
}
function vu(e) {
  for (const t of this._compilations)
    if (wg(t, e))
      return t;
}
Ve.getCompilingSchema = vu;
function wg(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Eg(e, t) {
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
    const c = as.call(this, e, o);
    return typeof (c == null ? void 0 : c.schema) != "object" ? void 0 : Es.call(this, r, c);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || $o.call(this, o), a === (0, Ze.normalizeId)(t)) {
      const { schema: c } = o, { schemaId: l } = this.opts, d = c[l];
      return d && (s = (0, Ze.resolveUrl)(this.opts.uriResolver, s, d)), new ss({ schema: c, schemaId: l, root: e, baseId: s });
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
  for (const c of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const l = r[(0, Ui.unescapeFragment)(c)];
    if (l === void 0)
      return;
    r = l;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !bg.has(c) && d && (t = (0, Ze.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Ui.schemaHasRulesButRef)(r, this.RULES)) {
    const c = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = as.call(this, n, c);
  }
  const { schemaId: o } = this.opts;
  if (a = a || new ss({ schema: r, schemaId: o, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Sg = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Pg = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Ng = "object", Og = [
  "$data"
], Rg = {
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
}, Tg = !1, Ig = {
  $id: Sg,
  description: Pg,
  type: Ng,
  required: Og,
  properties: Rg,
  additionalProperties: Tg
};
var yo = {};
Object.defineProperty(yo, "__esModule", { value: !0 });
const wu = jl;
wu.code = 'require("ajv/dist/runtime/uri").default';
yo.default = wu;
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
  const n = rn, s = Nr, a = tr, o = Ve, c = Z, l = Pe, d = _e, u = L, h = Ig, P = yo, g = (v, p) => new RegExp(v, p);
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
    var p, b, $, i, f, S, j, A, q, F, re, Ue, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, zt, Ut, qt;
    const Be = v.strict, Kt = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, Ir = Kt === !0 || Kt === void 0 ? 1 : Kt || 0, jr = ($ = (b = v.code) === null || b === void 0 ? void 0 : b.regExp) !== null && $ !== void 0 ? $ : g, ms = (i = v.uriResolver) !== null && i !== void 0 ? i : P.default;
    return {
      strictSchema: (S = (f = v.strictSchema) !== null && f !== void 0 ? f : Be) !== null && S !== void 0 ? S : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (Ue = (re = v.strictTuples) !== null && re !== void 0 ? re : Be) !== null && Ue !== void 0 ? Ue : "log",
      strictRequired: (jt = (It = v.strictRequired) !== null && It !== void 0 ? It : Be) !== null && jt !== void 0 ? jt : !1,
      code: v.code ? { ...v.code, optimize: Ir, regExp: jr } : { optimize: Ir, regExp: jr },
      loopRequired: (At = v.loopRequired) !== null && At !== void 0 ? At : w,
      loopEnum: (kt = v.loopEnum) !== null && kt !== void 0 ? kt : w,
      meta: (Ct = v.meta) !== null && Ct !== void 0 ? Ct : !0,
      messages: (Dt = v.messages) !== null && Dt !== void 0 ? Dt : !0,
      inlineRefs: (Mt = v.inlineRefs) !== null && Mt !== void 0 ? Mt : !0,
      schemaId: (Lt = v.schemaId) !== null && Lt !== void 0 ? Lt : "$id",
      addUsedSchema: (Ft = v.addUsedSchema) !== null && Ft !== void 0 ? Ft : !0,
      validateSchema: (Vt = v.validateSchema) !== null && Vt !== void 0 ? Vt : !0,
      validateFormats: (zt = v.validateFormats) !== null && zt !== void 0 ? zt : !0,
      unicodeRegExp: (Ut = v.unicodeRegExp) !== null && Ut !== void 0 ? Ut : !0,
      int32range: (qt = v.int32range) !== null && qt !== void 0 ? qt : !0,
      uriResolver: ms
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: b, lines: $ } = this.opts.code;
      this.scope = new c.ValueScope({ scope: {}, prefixes: _, es5: b, lines: $ }), this.logger = Q(p.logger);
      const i = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, y, p, "NOT SUPPORTED"), I.call(this, m, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && de.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), B.call(this), p.validateFormats = i;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: b, schemaId: $ } = this.opts;
      let i = h;
      $ === "id" && (i = { ...h }, i.id = i.$id, delete i.$id), b && p && this.addMetaSchema(i, i[$], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: b } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[b] || p : void 0;
    }
    validate(p, b) {
      let $;
      if (typeof p == "string") {
        if ($ = this.getSchema(p), !$)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        $ = this.compile(p);
      const i = $(b);
      return "$async" in $ || (this.errors = $.errors), i;
    }
    compile(p, b) {
      const $ = this._addSchema(p, b);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(p, b) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return i.call(this, p, b);
      async function i(F, re) {
        await f.call(this, F.$schema);
        const Ue = this._addSchema(F, re);
        return Ue.validate || S.call(this, Ue);
      }
      async function f(F) {
        F && !this.getSchema(F) && await i.call(this, { $ref: F }, !0);
      }
      async function S(F) {
        try {
          return this._compileSchemaEnv(F);
        } catch (re) {
          if (!(re instanceof s.default))
            throw re;
          return j.call(this, re), await A.call(this, re.missingSchema), S.call(this, F);
        }
      }
      function j({ missingSchema: F, missingRef: re }) {
        if (this.refs[F])
          throw new Error(`AnySchema ${F} is loaded but ${re} cannot be resolved`);
      }
      async function A(F) {
        const re = await q.call(this, F);
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, b);
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
    addSchema(p, b, $, i = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const S of p)
          this.addSchema(S, void 0, $, i);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: S } = this.opts;
        if (f = p[S], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${S} must be string`);
      }
      return b = (0, l.normalizeId)(b || f), this._checkUnique(b), this.schemas[b] = this._addSchema(p, $, b, i, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, b, $ = this.opts.validateSchema) {
      return this.addSchema(p, b, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, b) {
      if (typeof p == "boolean")
        return !0;
      let $;
      if ($ = p.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const i = this.validate($, p);
      if (!i && b) {
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
      let b;
      for (; typeof (b = U.call(this, p)) == "string"; )
        p = b;
      if (b === void 0) {
        const { schemaId: $ } = this.opts, i = new o.SchemaEnv({ schema: {}, schemaId: $ });
        if (b = o.resolveSchema.call(this, i, p), !b)
          return;
        this.refs[p] = b;
      }
      return b.validate || this._compileSchemaEnv(b);
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
          const b = U.call(this, p);
          return typeof b == "object" && this._cache.delete(b.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const b = p;
          this._cache.delete(b);
          let $ = p[this.opts.schemaId];
          return $ && ($ = (0, l.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const b of p)
        this.addKeyword(b);
      return this;
    }
    addKeyword(p, b) {
      let $;
      if (typeof p == "string")
        $ = p, typeof b == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), b.keyword = $);
      else if (typeof p == "object" && b === void 0) {
        if (b = p, $ = b.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, $, b), !b)
        return (0, u.eachItem)($, (f) => k.call(this, f)), this;
      D.call(this, b);
      const i = {
        ...b,
        type: (0, d.getJSONTypes)(b.type),
        schemaType: (0, d.getJSONTypes)(b.schemaType)
      };
      return (0, u.eachItem)($, i.type.length === 0 ? (f) => k.call(this, f, i) : (f) => i.type.forEach((S) => k.call(this, f, i, S))), this;
    }
    getKeyword(p) {
      const b = this.RULES.all[p];
      return typeof b == "object" ? b.definition : !!b;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: b } = this;
      delete b.keywords[p], delete b.all[p];
      for (const $ of b.rules) {
        const i = $.rules.findIndex((f) => f.keyword === p);
        i >= 0 && $.rules.splice(i, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, b) {
      return typeof b == "string" && (b = new RegExp(b)), this.formats[p] = b, this;
    }
    errorsText(p = this.errors, { separator: b = ", ", dataVar: $ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((i) => `${$}${i.instancePath} ${i.message}`).reduce((i, f) => i + b + f);
    }
    $dataMetaSchema(p, b) {
      const $ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const i of b) {
        const f = i.split("/").slice(1);
        let S = p;
        for (const j of f)
          S = S[j];
        for (const j in $) {
          const A = $[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = S[j];
          q && F && (S[j] = T(F));
        }
      }
      return p;
    }
    _removeAllSchemas(p, b) {
      for (const $ in p) {
        const i = p[$];
        (!b || b.test($)) && (typeof i == "string" ? delete p[$] : i && !i.meta && (this._cache.delete(i.schema), delete p[$]));
      }
    }
    _addSchema(p, b, $, i = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let S;
      const { schemaId: j } = this.opts;
      if (typeof p == "object")
        S = p[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(p);
      if (A !== void 0)
        return A;
      $ = (0, l.normalizeId)(S || $);
      const q = l.getSchemaRefs.call(this, p, $);
      return A = new o.SchemaEnv({ schema: p, schemaId: j, meta: b, baseId: $, localRefs: q }), this._cache.set(A.schema, A), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = A), i && this.validateSchema(p, !0), A;
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
      const b = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, p);
      } finally {
        this.opts = b;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function I(v, p, b, $ = "error") {
    for (const i in v) {
      const f = i;
      f in p && this.logger[$](`${b}: option ${i}. ${v[f]}`);
    }
  }
  function U(v) {
    return v = (0, l.normalizeId)(v), this.schemas[v] || this.refs[v];
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
      const b = v[p];
      b.keyword || (b.keyword = p), this.addKeyword(b);
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
    const { RULES: b } = this;
    if ((0, u.eachItem)(v, ($) => {
      if (b.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!fe.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, b) {
    var $;
    const i = p == null ? void 0 : p.post;
    if (b && i)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let S = i ? f.post : f.rules.find(({ type: A }) => A === b);
    if (S || (S = { type: b, rules: [] }, f.rules.push(S)), f.keywords[v] = !0, !p)
      return;
    const j = {
      keyword: v,
      definition: {
        ...p,
        type: (0, d.getJSONTypes)(p.type),
        schemaType: (0, d.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? z.call(this, S, j, p.before) : S.rules.push(j), f.all[v] = j, ($ = p.implements) === null || $ === void 0 || $.forEach((A) => this.addKeyword(A));
  }
  function z(v, p, b) {
    const $ = v.rules.findIndex((i) => i.keyword === b);
    $ >= 0 ? v.rules.splice($, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${b} is not defined`));
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
})(Kl);
var go = {}, _o = {}, vo = {};
Object.defineProperty(vo, "__esModule", { value: !0 });
const jg = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
vo.default = jg;
var rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.callRef = rr.getValidate = void 0;
const Ag = Nr, qi = ee, Le = Z, ir = ft, Ki = Ve, pn = L, kg = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: o, opts: c, self: l } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = Ki.resolveRef.call(l, d, s, r);
    if (u === void 0)
      throw new Ag.default(n.opts.uriResolver, s, r);
    if (u instanceof Ki.SchemaEnv)
      return P(u);
    return g(u);
    function h() {
      if (a === d)
        return An(e, o, a, a.$async);
      const E = t.scopeValue("root", { ref: d });
      return An(e, (0, Le._)`${E}.validate`, d, d.$async);
    }
    function P(E) {
      const _ = Eu(e, E);
      An(e, _, E, E.$async);
    }
    function g(E) {
      const _ = t.scopeValue("schema", c.code.source === !0 ? { ref: E, code: (0, Le.stringify)(E) } : { ref: E }), y = t.name("valid"), m = e.subschema({
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
function Eu(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Le._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
rr.getValidate = Eu;
function An(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: o, schemaEnv: c, opts: l } = a, d = l.passContext ? ir.default.this : Le.nil;
  n ? u() : h();
  function u() {
    if (!c.$async)
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
    s.assign(ir.default.vErrors, (0, Le._)`${ir.default.vErrors} === null ? ${_} : ${ir.default.vErrors}.concat(${_})`), s.assign(ir.default.errors, (0, Le._)`${ir.default.vErrors}.length`);
  }
  function g(E) {
    var _;
    if (!a.opts.unevaluated)
      return;
    const y = (_ = r == null ? void 0 : r.validate) === null || _ === void 0 ? void 0 : _.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = pn.mergeEvaluated.props(s, y.props, a.props));
      else {
        const m = s.var("props", (0, Le._)`${E}.evaluated.props`);
        a.props = pn.mergeEvaluated.props(s, m, a.props, Le.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = pn.mergeEvaluated.items(s, y.items, a.items));
      else {
        const m = s.var("items", (0, Le._)`${E}.evaluated.items`);
        a.items = pn.mergeEvaluated.items(s, m, a.items, Le.Name);
      }
  }
}
rr.callRef = An;
rr.default = kg;
Object.defineProperty(_o, "__esModule", { value: !0 });
const Cg = vo, Dg = rr, Mg = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Cg.default,
  Dg.default
];
_o.default = Mg;
var wo = {}, Eo = {};
Object.defineProperty(Eo, "__esModule", { value: !0 });
const qn = Z, wt = qn.operators, Kn = {
  maximum: { okStr: "<=", ok: wt.LTE, fail: wt.GT },
  minimum: { okStr: ">=", ok: wt.GTE, fail: wt.LT },
  exclusiveMaximum: { okStr: "<", ok: wt.LT, fail: wt.GTE },
  exclusiveMinimum: { okStr: ">", ok: wt.GT, fail: wt.LTE }
}, Lg = {
  message: ({ keyword: e, schemaCode: t }) => (0, qn.str)`must be ${Kn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, qn._)`{comparison: ${Kn[e].okStr}, limit: ${t}}`
}, Fg = {
  keyword: Object.keys(Kn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Lg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, qn._)`${r} ${Kn[t].fail} ${n} || isNaN(${r})`);
  }
};
Eo.default = Fg;
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const Br = Z, Vg = {
  message: ({ schemaCode: e }) => (0, Br.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Br._)`{multipleOf: ${e}}`
}, zg = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Vg,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, o = t.let("res"), c = a ? (0, Br._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${a}` : (0, Br._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Br._)`(${n} === 0 || (${o} = ${r}/${n}, ${c}))`);
  }
};
bo.default = zg;
var So = {}, Po = {};
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
Object.defineProperty(So, "__esModule", { value: !0 });
const Qt = Z, Ug = L, qg = Po, Kg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Qt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Qt._)`{limit: ${e}}`
}, Gg = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Kg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Qt.operators.GT : Qt.operators.LT, o = s.opts.unicode === !1 ? (0, Qt._)`${r}.length` : (0, Qt._)`${(0, Ug.useFunc)(e.gen, qg.default)}(${r})`;
    e.fail$data((0, Qt._)`${o} ${a} ${n}`);
  }
};
So.default = Gg;
var No = {};
Object.defineProperty(No, "__esModule", { value: !0 });
const Hg = ee, Gn = Z, Bg = {
  message: ({ schemaCode: e }) => (0, Gn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Gn._)`{pattern: ${e}}`
}, Wg = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Bg,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, o = a.opts.unicodeRegExp ? "u" : "", c = r ? (0, Gn._)`(new RegExp(${s}, ${o}))` : (0, Hg.usePattern)(e, n);
    e.fail$data((0, Gn._)`!${c}.test(${t})`);
  }
};
No.default = Wg;
var Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
const Wr = Z, Jg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Wr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Wr._)`{limit: ${e}}`
}, Xg = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Jg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Wr.operators.GT : Wr.operators.LT;
    e.fail$data((0, Wr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Oo.default = Xg;
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const Dr = ee, Jr = Z, Yg = L, Qg = {
  message: ({ params: { missingProperty: e } }) => (0, Jr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Jr._)`{missingProperty: ${e}}`
}, Zg = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Qg,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: o } = e, { opts: c } = o;
    if (!a && r.length === 0)
      return;
    const l = r.length >= c.loopRequired;
    if (o.allErrors ? d() : u(), c.strictRequired) {
      const g = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const _ of r)
        if ((g == null ? void 0 : g[_]) === void 0 && !E.has(_)) {
          const y = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${_}" is not defined at "${y}" (strictRequired)`;
          (0, Yg.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function d() {
      if (l || a)
        e.block$data(Jr.nil, h);
      else
        for (const g of r)
          (0, Dr.checkReportMissingProp)(e, g);
    }
    function u() {
      const g = t.let("missing");
      if (l || a) {
        const E = t.let("valid", !0);
        e.block$data(E, () => P(g, E)), e.ok(E);
      } else
        t.if((0, Dr.checkMissingProp)(e, r, g)), (0, Dr.reportMissingProp)(e, g), t.else();
    }
    function h() {
      t.forOf("prop", n, (g) => {
        e.setParams({ missingProperty: g }), t.if((0, Dr.noPropertyInData)(t, s, g, c.ownProperties), () => e.error());
      });
    }
    function P(g, E) {
      e.setParams({ missingProperty: g }), t.forOf(g, n, () => {
        t.assign(E, (0, Dr.propertyInData)(t, s, g, c.ownProperties)), t.if((0, Jr.not)(E), () => {
          e.error(), t.break();
        });
      }, Jr.nil);
    }
  }
};
Ro.default = Zg;
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
const Xr = Z, xg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Xr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Xr._)`{limit: ${e}}`
}, e_ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: xg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Xr.operators.GT : Xr.operators.LT;
    e.fail$data((0, Xr._)`${r}.length ${s} ${n}`);
  }
};
To.default = e_;
var Io = {}, nn = {};
Object.defineProperty(nn, "__esModule", { value: !0 });
const Su = Qn;
Su.code = 'require("ajv/dist/runtime/equal").default';
nn.default = Su;
Object.defineProperty(Io, "__esModule", { value: !0 });
const bs = _e, Ee = Z, t_ = L, r_ = nn, n_ = {
  message: ({ params: { i: e, j: t } }) => (0, Ee.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ee._)`{i: ${e}, j: ${t}}`
}, s_ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: n_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: o, it: c } = e;
    if (!n && !s)
      return;
    const l = t.let("valid"), d = a.items ? (0, bs.getSchemaTypes)(a.items) : [];
    e.block$data(l, u, (0, Ee._)`${o} === false`), e.ok(l);
    function u() {
      const E = t.let("i", (0, Ee._)`${r}.length`), _ = t.let("j");
      e.setParams({ i: E, j: _ }), t.assign(l, !0), t.if((0, Ee._)`${E} > 1`, () => (h() ? P : g)(E, _));
    }
    function h() {
      return d.length > 0 && !d.some((E) => E === "object" || E === "array");
    }
    function P(E, _) {
      const y = t.name("item"), m = (0, bs.checkDataTypes)(d, y, c.opts.strictNumbers, bs.DataType.Wrong), w = t.const("indices", (0, Ee._)`{}`);
      t.for((0, Ee._)`;${E}--;`, () => {
        t.let(y, (0, Ee._)`${r}[${E}]`), t.if(m, (0, Ee._)`continue`), d.length > 1 && t.if((0, Ee._)`typeof ${y} == "string"`, (0, Ee._)`${y} += "_"`), t.if((0, Ee._)`typeof ${w}[${y}] == "number"`, () => {
          t.assign(_, (0, Ee._)`${w}[${y}]`), e.error(), t.assign(l, !1).break();
        }).code((0, Ee._)`${w}[${y}] = ${E}`);
      });
    }
    function g(E, _) {
      const y = (0, t_.useFunc)(t, r_.default), m = t.name("outer");
      t.label(m).for((0, Ee._)`;${E}--;`, () => t.for((0, Ee._)`${_} = ${E}; ${_}--;`, () => t.if((0, Ee._)`${y}(${r}[${E}], ${r}[${_}])`, () => {
        e.error(), t.assign(l, !1).break(m);
      })));
    }
  }
};
Io.default = s_;
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
const Ws = Z, a_ = L, o_ = nn, i_ = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Ws._)`{allowedValue: ${e}}`
}, c_ = {
  keyword: "const",
  $data: !0,
  error: i_,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Ws._)`!${(0, a_.useFunc)(t, o_.default)}(${r}, ${s})`) : e.fail((0, Ws._)`${a} !== ${r}`);
  }
};
jo.default = c_;
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
const Vr = Z, l_ = L, u_ = nn, d_ = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Vr._)`{allowedValues: ${e}}`
}, f_ = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: d_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: o } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const c = s.length >= o.opts.loopEnum;
    let l;
    const d = () => l ?? (l = (0, l_.useFunc)(t, u_.default));
    let u;
    if (c || n)
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
Ao.default = f_;
Object.defineProperty(wo, "__esModule", { value: !0 });
const h_ = Eo, m_ = bo, p_ = So, $_ = No, y_ = Oo, g_ = Ro, __ = To, v_ = Io, w_ = jo, E_ = Ao, b_ = [
  // number
  h_.default,
  m_.default,
  // string
  p_.default,
  $_.default,
  // object
  y_.default,
  g_.default,
  // array
  __.default,
  v_.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  w_.default,
  E_.default
];
wo.default = b_;
var ko = {}, Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.validateAdditionalItems = void 0;
const Zt = Z, Js = L, S_ = {
  message: ({ params: { len: e } }) => (0, Zt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Zt._)`{limit: ${e}}`
}, P_ = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: S_,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Js.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Pu(e, n);
  }
};
function Pu(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: o } = e;
  o.items = !0;
  const c = r.const("len", (0, Zt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Zt._)`${c} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Js.alwaysValidSchema)(o, n)) {
    const d = r.var("valid", (0, Zt._)`${c} <= ${t.length}`);
    r.if((0, Zt.not)(d), () => l(d)), e.ok(d);
  }
  function l(d) {
    r.forRange("i", t.length, c, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: Js.Type.Num }, d), o.allErrors || r.if((0, Zt.not)(d), () => r.break());
    });
  }
}
Or.validateAdditionalItems = Pu;
Or.default = P_;
var Co = {}, Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.validateTuple = void 0;
const Gi = Z, kn = L, N_ = ee, O_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Nu(e, "additionalItems", t);
    r.items = !0, !(0, kn.alwaysValidSchema)(r, t) && e.ok((0, N_.validateArray)(e));
  }
};
function Nu(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: o, it: c } = e;
  u(s), c.opts.unevaluated && r.length && c.items !== !0 && (c.items = kn.mergeEvaluated.items(n, r.length, c.items));
  const l = n.name("valid"), d = n.const("len", (0, Gi._)`${a}.length`);
  r.forEach((h, P) => {
    (0, kn.alwaysValidSchema)(c, h) || (n.if((0, Gi._)`${d} > ${P}`, () => e.subschema({
      keyword: o,
      schemaProp: P,
      dataProp: P
    }, l)), e.ok(l));
  });
  function u(h) {
    const { opts: P, errSchemaPath: g } = c, E = r.length, _ = E === h.minItems && (E === h.maxItems || h[t] === !1);
    if (P.strictTuples && !_) {
      const y = `"${o}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${g}"`;
      (0, kn.checkStrictMode)(c, y, P.strictTuples);
    }
  }
}
Rr.validateTuple = Nu;
Rr.default = O_;
Object.defineProperty(Co, "__esModule", { value: !0 });
const R_ = Rr, T_ = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, R_.validateTuple)(e, "items")
};
Co.default = T_;
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
const Hi = Z, I_ = L, j_ = ee, A_ = Or, k_ = {
  message: ({ params: { len: e } }) => (0, Hi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Hi._)`{limit: ${e}}`
}, C_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: k_,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, I_.alwaysValidSchema)(n, t) && (s ? (0, A_.validateAdditionalItems)(e, s) : e.ok((0, j_.validateArray)(e)));
  }
};
Do.default = C_;
var Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
const He = Z, $n = L, D_ = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He.str)`must contain at least ${e} valid item(s)` : (0, He.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He._)`{minContains: ${e}}` : (0, He._)`{minContains: ${e}, maxContains: ${t}}`
}, M_ = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: D_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let o, c;
    const { minContains: l, maxContains: d } = n;
    a.opts.next ? (o = l === void 0 ? 1 : l, c = d) : o = 1;
    const u = t.const("len", (0, He._)`${s}.length`);
    if (e.setParams({ min: o, max: c }), c === void 0 && o === 0) {
      (0, $n.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (c !== void 0 && o > c) {
      (0, $n.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, $n.alwaysValidSchema)(a, r)) {
      let _ = (0, He._)`${u} >= ${o}`;
      c !== void 0 && (_ = (0, He._)`${_} && ${u} <= ${c}`), e.pass(_);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    c === void 0 && o === 1 ? g(h, () => t.if(h, () => t.break())) : o === 0 ? (t.let(h, !0), c !== void 0 && t.if((0, He._)`${s}.length > 0`, P)) : (t.let(h, !1), P()), e.result(h, () => e.reset());
    function P() {
      const _ = t.name("_valid"), y = t.let("count", 0);
      g(_, () => t.if(_, () => E(y)));
    }
    function g(_, y) {
      t.forRange("i", 0, u, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: $n.Type.Num,
          compositeRule: !0
        }, _), y();
      });
    }
    function E(_) {
      t.code((0, He._)`${_}++`), c === void 0 ? t.if((0, He._)`${_} >= ${o}`, () => t.assign(h, !0).break()) : (t.if((0, He._)`${_} > ${c}`, () => t.assign(h, !1).break()), o === 1 ? t.assign(h, !0) : t.if((0, He._)`${_} >= ${o}`, () => t.assign(h, !0)));
    }
  }
};
Mo.default = M_;
var Ou = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Z, r = L, n = ee;
  e.error = {
    message: ({ params: { property: l, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${l} is present`;
    },
    params: ({ params: { property: l, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${l},
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
    code(l) {
      const [d, u] = a(l);
      o(l, d), c(l, u);
    }
  };
  function a({ schema: l }) {
    const d = {}, u = {};
    for (const h in l) {
      if (h === "__proto__")
        continue;
      const P = Array.isArray(l[h]) ? d : u;
      P[h] = l[h];
    }
    return [d, u];
  }
  function o(l, d = l.schema) {
    const { gen: u, data: h, it: P } = l;
    if (Object.keys(d).length === 0)
      return;
    const g = u.let("missing");
    for (const E in d) {
      const _ = d[E];
      if (_.length === 0)
        continue;
      const y = (0, n.propertyInData)(u, h, E, P.opts.ownProperties);
      l.setParams({
        property: E,
        depsCount: _.length,
        deps: _.join(", ")
      }), P.allErrors ? u.if(y, () => {
        for (const m of _)
          (0, n.checkReportMissingProp)(l, m);
      }) : (u.if((0, t._)`${y} && (${(0, n.checkMissingProp)(l, _, g)})`), (0, n.reportMissingProp)(l, g), u.else());
    }
  }
  e.validatePropertyDeps = o;
  function c(l, d = l.schema) {
    const { gen: u, data: h, keyword: P, it: g } = l, E = u.name("valid");
    for (const _ in d)
      (0, r.alwaysValidSchema)(g, d[_]) || (u.if(
        (0, n.propertyInData)(u, h, _, g.opts.ownProperties),
        () => {
          const y = l.subschema({ keyword: P, schemaProp: _ }, E);
          l.mergeValidEvaluated(y, E);
        },
        () => u.var(E, !0)
        // TODO var
      ), l.ok(E));
  }
  e.validateSchemaDeps = c, e.default = s;
})(Ou);
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
const Ru = Z, L_ = L, F_ = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Ru._)`{propertyName: ${e.propertyName}}`
}, V_ = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: F_,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, L_.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, a), t.if((0, Ru.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Lo.default = V_;
var os = {};
Object.defineProperty(os, "__esModule", { value: !0 });
const yn = ee, Ye = Z, z_ = ft, gn = L, U_ = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ye._)`{additionalProperty: ${e.additionalProperty}}`
}, q_ = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: U_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: o } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: c, opts: l } = o;
    if (o.props = !0, l.removeAdditional !== "all" && (0, gn.alwaysValidSchema)(o, r))
      return;
    const d = (0, yn.allSchemaProperties)(n.properties), u = (0, yn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Ye._)`${a} === ${z_.default.errors}`);
    function h() {
      t.forIn("key", s, (y) => {
        !d.length && !u.length ? E(y) : t.if(P(y), () => E(y));
      });
    }
    function P(y) {
      let m;
      if (d.length > 8) {
        const w = (0, gn.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, yn.isOwnProperty)(t, w, y);
      } else d.length ? m = (0, Ye.or)(...d.map((w) => (0, Ye._)`${y} === ${w}`)) : m = Ye.nil;
      return u.length && (m = (0, Ye.or)(m, ...u.map((w) => (0, Ye._)`${(0, yn.usePattern)(e, w)}.test(${y})`))), (0, Ye.not)(m);
    }
    function g(y) {
      t.code((0, Ye._)`delete ${s}[${y}]`);
    }
    function E(y) {
      if (l.removeAdditional === "all" || l.removeAdditional && r === !1) {
        g(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), c || t.break();
        return;
      }
      if (typeof r == "object" && !(0, gn.alwaysValidSchema)(o, r)) {
        const m = t.name("valid");
        l.removeAdditional === "failing" ? (_(y, m, !1), t.if((0, Ye.not)(m), () => {
          e.reset(), g(y);
        })) : (_(y, m), c || t.if((0, Ye.not)(m), () => t.break()));
      }
    }
    function _(y, m, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: gn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, m);
    }
  }
};
os.default = q_;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const K_ = et, Bi = ee, Ss = L, Wi = os, G_ = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Wi.default.code(new K_.KeywordCxt(a, Wi.default, "additionalProperties"));
    const o = (0, Bi.allSchemaProperties)(r);
    for (const h of o)
      a.definedProperties.add(h);
    a.opts.unevaluated && o.length && a.props !== !0 && (a.props = Ss.mergeEvaluated.props(t, (0, Ss.toHash)(o), a.props));
    const c = o.filter((h) => !(0, Ss.alwaysValidSchema)(a, r[h]));
    if (c.length === 0)
      return;
    const l = t.name("valid");
    for (const h of c)
      d(h) ? u(h) : (t.if((0, Bi.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(l);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, l);
    }
  }
};
Fo.default = G_;
var Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
const Ji = ee, _n = Z, Xi = L, Yi = L, H_ = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: o } = a, c = (0, Ji.allSchemaProperties)(r), l = c.filter((_) => (0, Xi.alwaysValidSchema)(a, r[_]));
    if (c.length === 0 || l.length === c.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = o.strictSchema && !o.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof _n.Name) && (a.props = (0, Yi.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    P();
    function P() {
      for (const _ of c)
        d && g(_), a.allErrors ? E(_) : (t.var(u, !0), E(_), t.if(u));
    }
    function g(_) {
      for (const y in d)
        new RegExp(_).test(y) && (0, Xi.checkStrictMode)(a, `property ${y} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function E(_) {
      t.forIn("key", n, (y) => {
        t.if((0, _n._)`${(0, Ji.usePattern)(e, _)}.test(${y})`, () => {
          const m = l.includes(_);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: y,
            dataPropType: Yi.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, _n._)`${h}[${y}]`, !0) : !m && !a.allErrors && t.if((0, _n.not)(u), () => t.break());
        });
      });
    }
  }
};
Vo.default = H_;
var zo = {};
Object.defineProperty(zo, "__esModule", { value: !0 });
const B_ = L, W_ = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, B_.alwaysValidSchema)(n, r)) {
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
zo.default = W_;
var Uo = {};
Object.defineProperty(Uo, "__esModule", { value: !0 });
const J_ = ee, X_ = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: J_.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Uo.default = X_;
var qo = {};
Object.defineProperty(qo, "__esModule", { value: !0 });
const Cn = Z, Y_ = L, Q_ = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Cn._)`{passingSchemas: ${e.passing}}`
}, Z_ = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Q_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, o = t.let("valid", !1), c = t.let("passing", null), l = t.name("_valid");
    e.setParams({ passing: c }), t.block(d), e.result(o, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let P;
        (0, Y_.alwaysValidSchema)(s, u) ? t.var(l, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, l), h > 0 && t.if((0, Cn._)`${l} && ${o}`).assign(o, !1).assign(c, (0, Cn._)`[${c}, ${h}]`).else(), t.if(l, () => {
          t.assign(o, !0), t.assign(c, h), P && e.mergeEvaluated(P, Cn.Name);
        });
      });
    }
  }
};
qo.default = Z_;
var Ko = {};
Object.defineProperty(Ko, "__esModule", { value: !0 });
const x_ = L, e0 = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, o) => {
      if ((0, x_.alwaysValidSchema)(n, a))
        return;
      const c = e.subschema({ keyword: "allOf", schemaProp: o }, s);
      e.ok(s), e.mergeEvaluated(c);
    });
  }
};
Ko.default = e0;
var Go = {};
Object.defineProperty(Go, "__esModule", { value: !0 });
const Hn = Z, Tu = L, t0 = {
  message: ({ params: e }) => (0, Hn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Hn._)`{failingKeyword: ${e.ifClause}}`
}, r0 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: t0,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Tu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Qi(n, "then"), a = Qi(n, "else");
    if (!s && !a)
      return;
    const o = t.let("valid", !0), c = t.name("_valid");
    if (l(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(c, d("then", u), d("else", u));
    } else s ? t.if(c, d("then")) : t.if((0, Hn.not)(c), d("else"));
    e.pass(o, () => e.error(!0));
    function l() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, c);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const P = e.subschema({ keyword: u }, c);
        t.assign(o, c), e.mergeValidEvaluated(P, o), h ? t.assign(h, (0, Hn._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Qi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Tu.alwaysValidSchema)(e, r);
}
Go.default = r0;
var Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
const n0 = L, s0 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, n0.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Ho.default = s0;
Object.defineProperty(ko, "__esModule", { value: !0 });
const a0 = Or, o0 = Co, i0 = Rr, c0 = Do, l0 = Mo, u0 = Ou, d0 = Lo, f0 = os, h0 = Fo, m0 = Vo, p0 = zo, $0 = Uo, y0 = qo, g0 = Ko, _0 = Go, v0 = Ho;
function w0(e = !1) {
  const t = [
    // any
    p0.default,
    $0.default,
    y0.default,
    g0.default,
    _0.default,
    v0.default,
    // object
    d0.default,
    f0.default,
    u0.default,
    h0.default,
    m0.default
  ];
  return e ? t.push(o0.default, c0.default) : t.push(a0.default, i0.default), t.push(l0.default), t;
}
ko.default = w0;
var Bo = {}, Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
const ye = Z, E0 = {
  message: ({ schemaCode: e }) => (0, ye.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ye._)`{format: ${e}}`
}, b0 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: E0,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: o, it: c } = e, { opts: l, errSchemaPath: d, schemaEnv: u, self: h } = c;
    if (!l.validateFormats)
      return;
    s ? P() : g();
    function P() {
      const E = r.scopeValue("formats", {
        ref: h.formats,
        code: l.code.formats
      }), _ = r.const("fDef", (0, ye._)`${E}[${o}]`), y = r.let("fType"), m = r.let("format");
      r.if((0, ye._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => r.assign(y, (0, ye._)`${_}.type || "string"`).assign(m, (0, ye._)`${_}.validate`), () => r.assign(y, (0, ye._)`"string"`).assign(m, _)), e.fail$data((0, ye.or)(w(), N()));
      function w() {
        return l.strictSchema === !1 ? ye.nil : (0, ye._)`${o} && !${m}`;
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
        if (l.strictSchema === !1) {
          h.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const U = I instanceof RegExp ? (0, ye.regexpCode)(I) : l.code.formats ? (0, ye._)`${l.code.formats}${(0, ye.getProperty)(a)}` : void 0, B = r.scopeValue("formats", { key: a, ref: I, code: U });
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
const S0 = Wo, P0 = [S0.default];
Bo.default = P0;
var Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.contentVocabulary = Er.metadataVocabulary = void 0;
Er.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Er.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(go, "__esModule", { value: !0 });
const N0 = _o, O0 = wo, R0 = ko, T0 = Bo, Zi = Er, I0 = [
  N0.default,
  O0.default,
  (0, R0.default)(),
  T0.default,
  Zi.metadataVocabulary,
  Zi.contentVocabulary
];
go.default = I0;
var Jo = {}, is = {};
Object.defineProperty(is, "__esModule", { value: !0 });
is.DiscrError = void 0;
var xi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(xi || (is.DiscrError = xi = {}));
Object.defineProperty(Jo, "__esModule", { value: !0 });
const ur = Z, Xs = is, ec = Ve, j0 = Nr, A0 = L, k0 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Xs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, ur._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, C0 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: k0,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: o } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const c = n.propertyName;
    if (typeof c != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const l = t.let("valid", !1), d = t.const("tag", (0, ur._)`${r}${(0, ur.getProperty)(c)}`);
    t.if((0, ur._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: Xs.DiscrError.Tag, tag: d, tagName: c })), e.ok(l);
    function u() {
      const g = P();
      t.if(!1);
      for (const E in g)
        t.elseIf((0, ur._)`${d} === ${E}`), t.assign(l, h(g[E]));
      t.else(), e.error(!1, { discrError: Xs.DiscrError.Mapping, tag: d, tagName: c }), t.endIf();
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
        if (I != null && I.$ref && !(0, A0.schemaHasRulesButRef)(I, a.self.RULES)) {
          const B = I.$ref;
          if (I = ec.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, B), I instanceof ec.SchemaEnv && (I = I.schema), I === void 0)
            throw new j0.default(a.opts.uriResolver, a.baseId, B);
        }
        const U = (g = I == null ? void 0 : I.properties) === null || g === void 0 ? void 0 : g[c];
        if (typeof U != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${c}"`);
        y = y && (_ || m(I)), w(U, R);
      }
      if (!y)
        throw new Error(`discriminator: "${c}" must be required`);
      return E;
      function m({ required: R }) {
        return Array.isArray(R) && R.includes(c);
      }
      function w(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const U of R.enum)
            N(U, I);
        else
          throw new Error(`discriminator: "properties/${c}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in E)
          throw new Error(`discriminator: "${c}" values must be unique strings`);
        E[R] = I;
      }
    }
  }
};
Jo.default = C0;
const D0 = "http://json-schema.org/draft-07/schema#", M0 = "http://json-schema.org/draft-07/schema#", L0 = "Core schema meta-schema", F0 = {
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
}, V0 = [
  "object",
  "boolean"
], z0 = {
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
}, U0 = {
  $schema: D0,
  $id: M0,
  title: L0,
  definitions: F0,
  type: V0,
  properties: z0,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Kl, n = go, s = Jo, a = U0, o = ["/properties"], c = "http://json-schema.org/draft-07/schema";
  class l extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(a, o) : a;
      this.addMetaSchema(E, c, !1), this.refs["http://json-schema.org/schema"] = c;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(c) ? c : void 0);
    }
  }
  t.Ajv = l, e.exports = t = l, e.exports.Ajv = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
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
  var h = rn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var P = Nr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(qs, qs.exports);
var q0 = qs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = q0, r = Z, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: c, schemaCode: l }) => r.str`should be ${s[c].okStr} ${l}`,
    params: ({ keyword: c, schemaCode: l }) => r._`{comparison: ${s[c].okStr}, limit: ${l}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(c) {
      const { gen: l, data: d, schemaCode: u, keyword: h, it: P } = c, { opts: g, self: E } = P;
      if (!g.validateFormats)
        return;
      const _ = new t.KeywordCxt(P, E.RULES.all.format.definition, "format");
      _.$data ? y() : m();
      function y() {
        const N = l.scopeValue("formats", {
          ref: E.formats,
          code: g.code.formats
        }), R = l.const("fmt", r._`${N}[${_.schemaCode}]`);
        c.fail$data(r.or(r._`typeof ${R} != "object"`, r._`${R} instanceof RegExp`, r._`typeof ${R}.compare != "function"`, w(R)));
      }
      function m() {
        const N = _.schema, R = E.formats[N];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${h}": format "${N}" does not define "compare" function`);
        const I = l.scopeValue("formats", {
          key: N,
          ref: R,
          code: g.code.formats ? r._`${g.code.formats}${r.getProperty(N)}` : void 0
        });
        c.fail$data(w(I));
      }
      function w(N) {
        return r._`${N}.compare(${d}, ${u}) ${s[h].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const o = (c) => (c.addKeyword(e.formatLimitDefinition), c);
  e.default = o;
})(ql);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Ul, n = ql, s = Z, a = new s.Name("fullFormats"), o = new s.Name("fastFormats"), c = (d, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return l(d, u, r.fullFormats, a), d;
    const [h, P] = u.mode === "fast" ? [r.fastFormats, o] : [r.fullFormats, a], g = u.formats || r.formatNames;
    return l(d, g, h, P), u.keywords && n.default(d), d;
  };
  c.get = (d, u = "full") => {
    const P = (u === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!P)
      throw new Error(`Unknown format "${d}"`);
    return P;
  };
  function l(d, u, h, P) {
    var g, E;
    (g = (E = d.opts.code).formats) !== null && g !== void 0 || (E.formats = s._`require("ajv-formats/dist/formats").${P}`);
    for (const _ of u)
      d.addFormat(_, h[_]);
  }
  e.exports = t = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
})(Us, Us.exports);
var K0 = Us.exports;
const G0 = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !H0(s, a) && n || Object.defineProperty(e, r, a);
}, H0 = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, B0 = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, W0 = (e, t) => `/* Wrapped ${e}*/
${t}`, J0 = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), X0 = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), Y0 = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = W0.bind(null, n, t.toString());
  Object.defineProperty(s, "name", X0), Object.defineProperty(e, "toString", { ...J0, value: s });
}, Q0 = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    G0(e, t, s, r);
  return B0(e, t), Y0(e, t, n), e;
};
var Z0 = Q0;
const x0 = Z0;
var ev = (e, t = {}) => {
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
  const c = function(...l) {
    const d = this, u = () => {
      a = void 0, s && (o = e.apply(d, l));
    }, h = n && !a;
    return clearTimeout(a), a = setTimeout(u, r), h && (o = e.apply(d, l)), o;
  };
  return x0(c, e), c.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, c;
}, Ys = { exports: {} };
const tv = "2.0.0", Iu = 256, rv = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, nv = 16, sv = Iu - 6, av = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var cs = {
  MAX_LENGTH: Iu,
  MAX_SAFE_COMPONENT_LENGTH: nv,
  MAX_SAFE_BUILD_LENGTH: sv,
  MAX_SAFE_INTEGER: rv,
  RELEASE_TYPES: av,
  SEMVER_SPEC_VERSION: tv,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const ov = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var ls = ov;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = cs, a = ls;
  t = e.exports = {};
  const o = t.re = [], c = t.safeRe = [], l = t.src = [], d = t.safeSrc = [], u = t.t = {};
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
    a(y, R, m), u[y] = R, l[R] = m, d[R] = N, o[R] = new RegExp(m, w ? "g" : void 0), c[R] = new RegExp(N, w ? "g" : void 0);
  };
  _("NUMERICIDENTIFIER", "0|[1-9]\\d*"), _("NUMERICIDENTIFIERLOOSE", "\\d+"), _("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${P}*`), _("MAINVERSION", `(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})`), _("MAINVERSIONLOOSE", `(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASEIDENTIFIER", `(?:${l[u.NONNUMERICIDENTIFIER]}|${l[u.NUMERICIDENTIFIER]})`), _("PRERELEASEIDENTIFIERLOOSE", `(?:${l[u.NONNUMERICIDENTIFIER]}|${l[u.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASE", `(?:-(${l[u.PRERELEASEIDENTIFIER]}(?:\\.${l[u.PRERELEASEIDENTIFIER]})*))`), _("PRERELEASELOOSE", `(?:-?(${l[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[u.PRERELEASEIDENTIFIERLOOSE]})*))`), _("BUILDIDENTIFIER", `${P}+`), _("BUILD", `(?:\\+(${l[u.BUILDIDENTIFIER]}(?:\\.${l[u.BUILDIDENTIFIER]})*))`), _("FULLPLAIN", `v?${l[u.MAINVERSION]}${l[u.PRERELEASE]}?${l[u.BUILD]}?`), _("FULL", `^${l[u.FULLPLAIN]}$`), _("LOOSEPLAIN", `[v=\\s]*${l[u.MAINVERSIONLOOSE]}${l[u.PRERELEASELOOSE]}?${l[u.BUILD]}?`), _("LOOSE", `^${l[u.LOOSEPLAIN]}$`), _("GTLT", "((?:<|>)?=?)"), _("XRANGEIDENTIFIERLOOSE", `${l[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), _("XRANGEIDENTIFIER", `${l[u.NUMERICIDENTIFIER]}|x|X|\\*`), _("XRANGEPLAIN", `[v=\\s]*(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:${l[u.PRERELEASE]})?${l[u.BUILD]}?)?)?`), _("XRANGEPLAINLOOSE", `[v=\\s]*(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:${l[u.PRERELEASELOOSE]})?${l[u.BUILD]}?)?)?`), _("XRANGE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAIN]}$`), _("XRANGELOOSE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAINLOOSE]}$`), _("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), _("COERCE", `${l[u.COERCEPLAIN]}(?:$|[^\\d])`), _("COERCEFULL", l[u.COERCEPLAIN] + `(?:${l[u.PRERELEASE]})?(?:${l[u.BUILD]})?(?:$|[^\\d])`), _("COERCERTL", l[u.COERCE], !0), _("COERCERTLFULL", l[u.COERCEFULL], !0), _("LONETILDE", "(?:~>?)"), _("TILDETRIM", `(\\s*)${l[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", _("TILDE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAIN]}$`), _("TILDELOOSE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAINLOOSE]}$`), _("LONECARET", "(?:\\^)"), _("CARETTRIM", `(\\s*)${l[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", _("CARET", `^${l[u.LONECARET]}${l[u.XRANGEPLAIN]}$`), _("CARETLOOSE", `^${l[u.LONECARET]}${l[u.XRANGEPLAINLOOSE]}$`), _("COMPARATORLOOSE", `^${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]})$|^$`), _("COMPARATOR", `^${l[u.GTLT]}\\s*(${l[u.FULLPLAIN]})$|^$`), _("COMPARATORTRIM", `(\\s*)${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]}|${l[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", _("HYPHENRANGE", `^\\s*(${l[u.XRANGEPLAIN]})\\s+-\\s+(${l[u.XRANGEPLAIN]})\\s*$`), _("HYPHENRANGELOOSE", `^\\s*(${l[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[u.XRANGEPLAINLOOSE]})\\s*$`), _("STAR", "(<|>)?=?\\s*\\*"), _("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), _("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Ys, Ys.exports);
var sn = Ys.exports;
const iv = Object.freeze({ loose: !0 }), cv = Object.freeze({}), lv = (e) => e ? typeof e != "object" ? iv : e : cv;
var Xo = lv;
const tc = /^[0-9]+$/, ju = (e, t) => {
  const r = tc.test(e), n = tc.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, uv = (e, t) => ju(t, e);
var Au = {
  compareIdentifiers: ju,
  rcompareIdentifiers: uv
};
const vn = ls, { MAX_LENGTH: rc, MAX_SAFE_INTEGER: wn } = cs, { safeRe: En, t: bn } = sn, dv = Xo, { compareIdentifiers: cr } = Au;
let fv = class nt {
  constructor(t, r) {
    if (r = dv(r), t instanceof nt) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > rc)
      throw new TypeError(
        `version is longer than ${rc} characters`
      );
    vn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? En[bn.LOOSE] : En[bn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > wn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > wn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > wn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < wn)
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
    if (vn("SemVer.compare", this.version, this.options, t), !(t instanceof nt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new nt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof nt || (t = new nt(t, this.options)), cr(this.major, t.major) || cr(this.minor, t.minor) || cr(this.patch, t.patch);
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
      if (vn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return cr(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof nt || (t = new nt(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (vn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return cr(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? En[bn.PRERELEASELOOSE] : En[bn.PRERELEASE]);
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
          n === !1 && (a = [r]), cr(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ce = fv;
const nc = Ce, hv = (e, t, r = !1) => {
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
var Tr = hv;
const mv = Tr, pv = (e, t) => {
  const r = mv(e, t);
  return r ? r.version : null;
};
var $v = pv;
const yv = Tr, gv = (e, t) => {
  const r = yv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var _v = gv;
const sc = Ce, vv = (e, t, r, n, s) => {
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
var wv = vv;
const ac = Tr, Ev = (e, t) => {
  const r = ac(e, null, !0), n = ac(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, o = a ? r : n, c = a ? n : r, l = !!o.prerelease.length;
  if (!!c.prerelease.length && !l) {
    if (!c.patch && !c.minor)
      return "major";
    if (c.compareMain(o) === 0)
      return c.minor && !c.patch ? "minor" : "patch";
  }
  const u = l ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var bv = Ev;
const Sv = Ce, Pv = (e, t) => new Sv(e, t).major;
var Nv = Pv;
const Ov = Ce, Rv = (e, t) => new Ov(e, t).minor;
var Tv = Rv;
const Iv = Ce, jv = (e, t) => new Iv(e, t).patch;
var Av = jv;
const kv = Tr, Cv = (e, t) => {
  const r = kv(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Dv = Cv;
const oc = Ce, Mv = (e, t, r) => new oc(e, r).compare(new oc(t, r));
var tt = Mv;
const Lv = tt, Fv = (e, t, r) => Lv(t, e, r);
var Vv = Fv;
const zv = tt, Uv = (e, t) => zv(e, t, !0);
var qv = Uv;
const ic = Ce, Kv = (e, t, r) => {
  const n = new ic(e, r), s = new ic(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Yo = Kv;
const Gv = Yo, Hv = (e, t) => e.sort((r, n) => Gv(r, n, t));
var Bv = Hv;
const Wv = Yo, Jv = (e, t) => e.sort((r, n) => Wv(n, r, t));
var Xv = Jv;
const Yv = tt, Qv = (e, t, r) => Yv(e, t, r) > 0;
var us = Qv;
const Zv = tt, xv = (e, t, r) => Zv(e, t, r) < 0;
var Qo = xv;
const ew = tt, tw = (e, t, r) => ew(e, t, r) === 0;
var ku = tw;
const rw = tt, nw = (e, t, r) => rw(e, t, r) !== 0;
var Cu = nw;
const sw = tt, aw = (e, t, r) => sw(e, t, r) >= 0;
var Zo = aw;
const ow = tt, iw = (e, t, r) => ow(e, t, r) <= 0;
var xo = iw;
const cw = ku, lw = Cu, uw = us, dw = Zo, fw = Qo, hw = xo, mw = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return cw(e, r, n);
    case "!=":
      return lw(e, r, n);
    case ">":
      return uw(e, r, n);
    case ">=":
      return dw(e, r, n);
    case "<":
      return fw(e, r, n);
    case "<=":
      return hw(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Du = mw;
const pw = Ce, $w = Tr, { safeRe: Sn, t: Pn } = sn, yw = (e, t) => {
  if (e instanceof pw)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Sn[Pn.COERCEFULL] : Sn[Pn.COERCE]);
  else {
    const l = t.includePrerelease ? Sn[Pn.COERCERTLFULL] : Sn[Pn.COERCERTL];
    let d;
    for (; (d = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), l.lastIndex = d.index + d[1].length + d[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", o = t.includePrerelease && r[5] ? `-${r[5]}` : "", c = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return $w(`${n}.${s}.${a}${o}${c}`, t);
};
var gw = yw;
class _w {
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
var vw = _w, Ps, cc;
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
      const T = this.options.loose, v = T ? l[d.HYPHENRANGELOOSE] : l[d.HYPHENRANGE];
      k = k.replace(v, Q(this.options.includePrerelease)), o("hyphen replace", k), k = k.replace(l[d.COMPARATORTRIM], u), o("comparator trim", k), k = k.replace(l[d.TILDETRIM], h), o("tilde trim", k), k = k.replace(l[d.CARETTRIM], P), o("caret trim", k);
      let p = k.split(" ").map((f) => w(f, this.options)).join(" ").split(/\s+/).map((f) => se(f, this.options));
      T && (p = p.filter((f) => (o("loose invalid filter", f, this.options), !!f.match(l[d.COMPARATORLOOSE])))), o("range list", p);
      const b = /* @__PURE__ */ new Map(), $ = p.map((f) => new a(f, this.options));
      for (const f of $) {
        if (_(f))
          return [f];
        b.set(f.value, f);
      }
      b.size > 1 && b.has("") && b.delete("");
      const i = [...b.values()];
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
          k = new c(k, this.options);
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
  const r = vw, n = new r(), s = Xo, a = ds(), o = ls, c = Ce, {
    safeRe: l,
    t: d,
    comparatorTrimReplace: u,
    tildeTrimReplace: h,
    caretTrimReplace: P
  } = sn, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: E } = cs, _ = (C) => C.value === "<0.0.0-0", y = (C) => C.value === "", m = (C, k) => {
    let z = !0;
    const D = C.slice();
    let O = D.pop();
    for (; z && D.length; )
      z = D.every((T) => O.intersects(T, k)), O = D.pop();
    return z;
  }, w = (C, k) => (o("comp", C, k), C = U(C, k), o("caret", C), C = R(C, k), o("tildes", C), C = de(C, k), o("xrange", C), C = H(C, k), o("stars", C), C), N = (C) => !C || C.toLowerCase() === "x" || C === "*", R = (C, k) => C.trim().split(/\s+/).map((z) => I(z, k)).join(" "), I = (C, k) => {
    const z = k.loose ? l[d.TILDELOOSE] : l[d.TILDE];
    return C.replace(z, (D, O, T, v, p) => {
      o("tilde", C, D, O, T, v, p);
      let b;
      return N(O) ? b = "" : N(T) ? b = `>=${O}.0.0 <${+O + 1}.0.0-0` : N(v) ? b = `>=${O}.${T}.0 <${O}.${+T + 1}.0-0` : p ? (o("replaceTilde pr", p), b = `>=${O}.${T}.${v}-${p} <${O}.${+T + 1}.0-0`) : b = `>=${O}.${T}.${v} <${O}.${+T + 1}.0-0`, o("tilde return", b), b;
    });
  }, U = (C, k) => C.trim().split(/\s+/).map((z) => B(z, k)).join(" "), B = (C, k) => {
    o("caret", C, k);
    const z = k.loose ? l[d.CARETLOOSE] : l[d.CARET], D = k.includePrerelease ? "-0" : "";
    return C.replace(z, (O, T, v, p, b) => {
      o("caret", C, O, T, v, p, b);
      let $;
      return N(T) ? $ = "" : N(v) ? $ = `>=${T}.0.0${D} <${+T + 1}.0.0-0` : N(p) ? T === "0" ? $ = `>=${T}.${v}.0${D} <${T}.${+v + 1}.0-0` : $ = `>=${T}.${v}.0${D} <${+T + 1}.0.0-0` : b ? (o("replaceCaret pr", b), T === "0" ? v === "0" ? $ = `>=${T}.${v}.${p}-${b} <${T}.${v}.${+p + 1}-0` : $ = `>=${T}.${v}.${p}-${b} <${T}.${+v + 1}.0-0` : $ = `>=${T}.${v}.${p}-${b} <${+T + 1}.0.0-0`) : (o("no pr"), T === "0" ? v === "0" ? $ = `>=${T}.${v}.${p}${D} <${T}.${v}.${+p + 1}-0` : $ = `>=${T}.${v}.${p}${D} <${T}.${+v + 1}.0-0` : $ = `>=${T}.${v}.${p} <${+T + 1}.0.0-0`), o("caret return", $), $;
    });
  }, de = (C, k) => (o("replaceXRanges", C, k), C.split(/\s+/).map((z) => V(z, k)).join(" ")), V = (C, k) => {
    C = C.trim();
    const z = k.loose ? l[d.XRANGELOOSE] : l[d.XRANGE];
    return C.replace(z, (D, O, T, v, p, b) => {
      o("xRange", C, D, O, T, v, p, b);
      const $ = N(T), i = $ || N(v), f = i || N(p), S = f;
      return O === "=" && S && (O = ""), b = k.includePrerelease ? "-0" : "", $ ? O === ">" || O === "<" ? D = "<0.0.0-0" : D = "*" : O && S ? (i && (v = 0), p = 0, O === ">" ? (O = ">=", i ? (T = +T + 1, v = 0, p = 0) : (v = +v + 1, p = 0)) : O === "<=" && (O = "<", i ? T = +T + 1 : v = +v + 1), O === "<" && (b = "-0"), D = `${O + T}.${v}.${p}${b}`) : i ? D = `>=${T}.0.0${b} <${+T + 1}.0.0-0` : f && (D = `>=${T}.${v}.0${b} <${T}.${+v + 1}.0-0`), o("xRange return", D), D;
    });
  }, H = (C, k) => (o("replaceStars", C, k), C.trim().replace(l[d.STAR], "")), se = (C, k) => (o("replaceGTE0", C, k), C.trim().replace(l[k.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (C) => (k, z, D, O, T, v, p, b, $, i, f, S) => (N(D) ? z = "" : N(O) ? z = `>=${D}.0.0${C ? "-0" : ""}` : N(T) ? z = `>=${D}.${O}.0${C ? "-0" : ""}` : v ? z = `>=${z}` : z = `>=${z}${C ? "-0" : ""}`, N($) ? b = "" : N(i) ? b = `<${+$ + 1}.0.0-0` : N(f) ? b = `<${$}.${+i + 1}.0-0` : S ? b = `<=${$}.${i}.${f}-${S}` : C ? b = `<${$}.${i}.${+f + 1}-0` : b = `<=${b}`, `${z} ${b}`.trim()), fe = (C, k, z) => {
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
      this.operator = P[1] !== void 0 ? P[1] : "", this.operator === "=" && (this.operator = ""), P[2] ? this.semver = new c(P[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (o("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new c(u, this.options);
        } catch {
          return !1;
        }
      return a(u, this.operator, this.semver, this.options);
    }
    intersects(u, h) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(u.value, h).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new l(this.value, h).test(u.semver) : (h = r(h), h.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || a(this.semver, "<", u.semver, h) && this.operator.startsWith(">") && u.operator.startsWith("<") || a(this.semver, ">", u.semver, h) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  Ns = t;
  const r = Xo, { safeRe: n, t: s } = sn, a = Du, o = ls, c = Ce, l = rt();
  return Ns;
}
const ww = rt(), Ew = (e, t, r) => {
  try {
    t = new ww(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var fs = Ew;
const bw = rt(), Sw = (e, t) => new bw(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var Pw = Sw;
const Nw = Ce, Ow = rt(), Rw = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new Ow(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || s.compare(o) === -1) && (n = o, s = new Nw(n, r));
  }), n;
};
var Tw = Rw;
const Iw = Ce, jw = rt(), Aw = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new jw(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || s.compare(o) === 1) && (n = o, s = new Iw(n, r));
  }), n;
};
var kw = Aw;
const Os = Ce, Cw = rt(), uc = us, Dw = (e, t) => {
  e = new Cw(e, t);
  let r = new Os("0.0.0");
  if (e.test(r) || (r = new Os("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((o) => {
      const c = new Os(o.semver.version);
      switch (o.operator) {
        case ">":
          c.prerelease.length === 0 ? c.patch++ : c.prerelease.push(0), c.raw = c.format();
        case "":
        case ">=":
          (!a || uc(c, a)) && (a = c);
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
var Mw = Dw;
const Lw = rt(), Fw = (e, t) => {
  try {
    return new Lw(e, t).range || "*";
  } catch {
    return null;
  }
};
var Vw = Fw;
const zw = Ce, Mu = ds(), { ANY: Uw } = Mu, qw = rt(), Kw = fs, dc = us, fc = Qo, Gw = xo, Hw = Zo, Bw = (e, t, r, n) => {
  e = new zw(e, n), t = new qw(t, n);
  let s, a, o, c, l;
  switch (r) {
    case ">":
      s = dc, a = Gw, o = fc, c = ">", l = ">=";
      break;
    case "<":
      s = fc, a = Hw, o = dc, c = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (Kw(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const u = t.set[d];
    let h = null, P = null;
    if (u.forEach((g) => {
      g.semver === Uw && (g = new Mu(">=0.0.0")), h = h || g, P = P || g, s(g.semver, h.semver, n) ? h = g : o(g.semver, P.semver, n) && (P = g);
    }), h.operator === c || h.operator === l || (!P.operator || P.operator === c) && a(e, P.semver))
      return !1;
    if (P.operator === l && o(e, P.semver))
      return !1;
  }
  return !0;
};
var ei = Bw;
const Ww = ei, Jw = (e, t, r) => Ww(e, t, ">", r);
var Xw = Jw;
const Yw = ei, Qw = (e, t, r) => Yw(e, t, "<", r);
var Zw = Qw;
const hc = rt(), xw = (e, t, r) => (e = new hc(e, r), t = new hc(t, r), e.intersects(t, r));
var eE = xw;
const tE = fs, rE = tt;
var nE = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const o = e.sort((u, h) => rE(u, h, r));
  for (const u of o)
    tE(u, t, r) ? (a = u, s || (s = u)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const c = [];
  for (const [u, h] of n)
    u === h ? c.push(u) : !h && u === o[0] ? c.push("*") : h ? u === o[0] ? c.push(`<=${h}`) : c.push(`${u} - ${h}`) : c.push(`>=${u}`);
  const l = c.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < d.length ? l : t;
};
const mc = rt(), ti = ds(), { ANY: Rs } = ti, Mr = fs, ri = tt, sE = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new mc(e, r), t = new mc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const o = oE(s, a, r);
      if (n = n || o !== null, o)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, aE = [new ti(">=0.0.0-0")], pc = [new ti(">=0.0.0")], oE = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Rs) {
    if (t.length === 1 && t[0].semver === Rs)
      return !0;
    r.includePrerelease ? e = aE : e = pc;
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
    if (s && !Mr(g, String(s), r) || a && !Mr(g, String(a), r))
      return null;
    for (const E of t)
      if (!Mr(g, String(E), r))
        return !1;
    return !0;
  }
  let c, l, d, u, h = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, P = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  h && h.prerelease.length === 1 && a.operator === "<" && h.prerelease[0] === 0 && (h = !1);
  for (const g of t) {
    if (u = u || g.operator === ">" || g.operator === ">=", d = d || g.operator === "<" || g.operator === "<=", s) {
      if (P && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === P.major && g.semver.minor === P.minor && g.semver.patch === P.patch && (P = !1), g.operator === ">" || g.operator === ">=") {
        if (c = $c(s, g, r), c === g && c !== s)
          return !1;
      } else if (s.operator === ">=" && !Mr(s.semver, String(g), r))
        return !1;
    }
    if (a) {
      if (h && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === h.major && g.semver.minor === h.minor && g.semver.patch === h.patch && (h = !1), g.operator === "<" || g.operator === "<=") {
        if (l = yc(a, g, r), l === g && l !== a)
          return !1;
      } else if (a.operator === "<=" && !Mr(a.semver, String(g), r))
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
var iE = sE;
const Ts = sn, gc = cs, cE = Ce, _c = Au, lE = Tr, uE = $v, dE = _v, fE = wv, hE = bv, mE = Nv, pE = Tv, $E = Av, yE = Dv, gE = tt, _E = Vv, vE = qv, wE = Yo, EE = Bv, bE = Xv, SE = us, PE = Qo, NE = ku, OE = Cu, RE = Zo, TE = xo, IE = Du, jE = gw, AE = ds(), kE = rt(), CE = fs, DE = Pw, ME = Tw, LE = kw, FE = Mw, VE = Vw, zE = ei, UE = Xw, qE = Zw, KE = eE, GE = nE, HE = iE;
var BE = {
  parse: lE,
  valid: uE,
  clean: dE,
  inc: fE,
  diff: hE,
  major: mE,
  minor: pE,
  patch: $E,
  prerelease: yE,
  compare: gE,
  rcompare: _E,
  compareLoose: vE,
  compareBuild: wE,
  sort: EE,
  rsort: bE,
  gt: SE,
  lt: PE,
  eq: NE,
  neq: OE,
  gte: RE,
  lte: TE,
  cmp: IE,
  coerce: jE,
  Comparator: AE,
  Range: kE,
  satisfies: CE,
  toComparators: DE,
  maxSatisfying: ME,
  minSatisfying: LE,
  minVersion: FE,
  validRange: VE,
  outside: zE,
  gtr: UE,
  ltr: qE,
  intersects: KE,
  simplifyRange: GE,
  subset: HE,
  SemVer: cE,
  re: Ts.re,
  src: Ts.src,
  tokens: Ts.t,
  SEMVER_SPEC_VERSION: gc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: gc.RELEASE_TYPES,
  compareIdentifiers: _c.compareIdentifiers,
  rcompareIdentifiers: _c.rcompareIdentifiers
}, hs = { exports: {} }, ni = { exports: {} };
const Lu = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
ni.exports = Lu;
ni.exports.default = Lu;
var WE = ni.exports;
const JE = WE, Bn = /* @__PURE__ */ new WeakMap(), Fu = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...o) {
    if (Bn.set(a, ++n), n === 1)
      r = e.apply(this, o), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return JE(a, e), Bn.set(a, n), a;
};
hs.exports = Fu;
hs.exports.default = Fu;
hs.exports.callCount = (e) => {
  if (!Bn.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Bn.get(e);
};
var XE = hs.exports;
(function(e, t) {
  var r = an && an.__classPrivateFieldSet || function(D, O, T, v, p) {
    if (v === "m") throw new TypeError("Private method is not writable");
    if (v === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof O == "function" ? D !== O || !p : !O.has(D)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return v === "a" ? p.call(D, T) : p ? p.value = T : O.set(D, T), T;
  }, n = an && an.__classPrivateFieldGet || function(D, O, T, v) {
    if (T === "a" && !v) throw new TypeError("Private accessor was defined without a getter");
    if (typeof O == "function" ? D !== O || !v : !O.has(D)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return T === "m" ? v : T === "a" ? v.call(D) : v ? v.value : O.get(D);
  }, s, a, o, c, l, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const u = Nc, h = ta, P = nr, g = Wu, E = Ju, _ = Xu, y = rd, m = hd, w = yd, N = ot, R = j$, I = K0, U = ev, B = BE, de = XE, V = "aes-256-cbc", H = () => /* @__PURE__ */ Object.create(null), se = (D) => D != null;
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
      o.set(this, void 0), c.set(this, void 0), l.set(this, void 0), d.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
      const v = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...O
      }, p = de(() => {
        const f = m.sync({ cwd: Q }), S = f && JSON.parse(h.readFileSync(f, "utf8"));
        return S ?? {};
      });
      if (!v.cwd) {
        if (v.projectName || (v.projectName = p().name), !v.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        v.cwd = w(v.projectName, { suffix: v.projectSuffix }).config;
      }
      if (r(this, l, v, "f"), v.schema) {
        if (typeof v.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const f = new R.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, I.default)(f);
        const S = {
          type: "object",
          properties: v.schema
        };
        r(this, o, f.compile(S), "f");
        for (const [j, A] of Object.entries(v.schema))
          A != null && A.default && (n(this, d, "f")[j] = A.default);
      }
      v.defaults && r(this, d, {
        ...n(this, d, "f"),
        ...v.defaults
      }, "f"), v.serialize && (this._serialize = v.serialize), v.deserialize && (this._deserialize = v.deserialize), this.events = new _.EventEmitter(), r(this, c, v.encryptionKey, "f");
      const b = v.fileExtension ? `.${v.fileExtension}` : "";
      this.path = P.resolve(v.cwd, `${(T = v.configName) !== null && T !== void 0 ? T : "config"}${b}`);
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
      if (n(this, l, "f").accessPropertiesByDotNotation)
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
      const { store: v } = this, p = (b, $) => {
        fe(b, $), n(this, l, "f").accessPropertiesByDotNotation ? y.set(v, b, $) : v[b] = $;
      };
      if (typeof O == "object") {
        const b = O;
        for (const [$, i] of Object.entries(b))
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
      return n(this, l, "f").accessPropertiesByDotNotation ? y.has(this.store, O) : O in this.store;
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
      n(this, l, "f").accessPropertiesByDotNotation ? y.delete(T, O) : delete T[O], this.store = T;
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
        const O = h.readFileSync(this.path, n(this, c, "f") ? null : "utf8"), T = this._encryptData(O), v = this._deserialize(T);
        return this._validate(v), Object.assign(H(), v);
      } catch (O) {
        if ((O == null ? void 0 : O.code) === "ENOENT")
          return this._ensureDirectory(), H();
        if (n(this, l, "f").clearInvalidConfig && O.name === "SyntaxError")
          return H();
        throw O;
      }
    }
    set store(O) {
      this._ensureDirectory(), this._validate(O), this._write(O), this.events.emit("change");
    }
    *[(o = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [O, T] of Object.entries(this.store))
        yield [O, T];
    }
    _encryptData(O) {
      if (!n(this, c, "f"))
        return O.toString();
      try {
        if (n(this, c, "f"))
          try {
            if (O.slice(16, 17).toString() === ":") {
              const T = O.slice(0, 16), v = g.pbkdf2Sync(n(this, c, "f"), T.toString(), 1e4, 32, "sha512"), p = g.createDecipheriv(V, v, T);
              O = Buffer.concat([p.update(Buffer.from(O.slice(17))), p.final()]).toString("utf8");
            } else {
              const T = g.createDecipher(V, n(this, c, "f"));
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
        const b = v, $ = O();
        (0, u.isDeepStrictEqual)($, b) || (v = $, T.call(this, $, b));
      };
      return this.events.on("change", p), () => this.events.removeListener("change", p);
    }
    _validate(O) {
      if (!n(this, o, "f") || n(this, o, "f").call(this, O) || !n(this, o, "f").errors)
        return;
      const v = n(this, o, "f").errors.map(({ instancePath: p, message: b = "" }) => `\`${p.slice(1)}\` ${b}`);
      throw new Error("Config schema violation: " + v.join("; "));
    }
    _ensureDirectory() {
      h.mkdirSync(P.dirname(this.path), { recursive: !0 });
    }
    _write(O) {
      let T = this._serialize(O);
      if (n(this, c, "f")) {
        const v = g.randomBytes(16), p = g.pbkdf2Sync(n(this, c, "f"), v.toString(), 1e4, 32, "sha512"), b = g.createCipheriv(V, p, v);
        T = Buffer.concat([v, Buffer.from(":"), b.update(Buffer.from(T)), b.final()]);
      }
      if (process.env.SNAP)
        h.writeFileSync(this.path, T, { mode: n(this, l, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, T, { mode: n(this, l, "f").configFileMode });
        } catch (v) {
          if ((v == null ? void 0 : v.code) === "EXDEV") {
            h.writeFileSync(this.path, T, { mode: n(this, l, "f").configFileMode });
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
      const b = Object.keys(O).filter((i) => this._shouldPerformMigration(i, p, T));
      let $ = { ...this.store };
      for (const i of b)
        try {
          v && v(this, {
            fromVersion: p,
            toVersion: i,
            finalVersion: T,
            versions: b
          });
          const f = O[i];
          f(this), this._set(k, i), p = i, $ = { ...this.store };
        } catch (f) {
          throw this.store = $, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(p) || !B.eq(p, T)) && this._set(k, T);
    }
    _containsReservedKey(O) {
      return typeof O == "object" && Object.keys(O)[0] === C ? !0 : typeof O != "string" ? !1 : n(this, l, "f").accessPropertiesByDotNotation ? !!O.startsWith(`${C}.`) : !1;
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
var YE = js.exports;
const vc = nr, { app: Dn, ipcMain: Qs, ipcRenderer: wc, shell: QE } = Ku, ZE = YE;
let Ec = !1;
const bc = () => {
  if (!Qs || !Dn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Dn.getPath("userData"),
    appVersion: Dn.getVersion()
  };
  return Ec || (Qs.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Ec = !0), e;
};
class xE extends ZE {
  constructor(t) {
    let r, n;
    if (wc) {
      const s = wc.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else Qs && Dn && ({ defaultCwd: r, appVersion: n } = bc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = vc.isAbsolute(t.cwd) ? t.cwd : vc.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    bc();
  }
  async openInEditor() {
    const t = await QE.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var e1 = xE;
const t1 = /* @__PURE__ */ Zu(e1), Tt = Hu(import.meta.url), Zs = Ne.dirname(Bu(import.meta.url));
let xs;
try {
  xs = Tt("sharp");
} catch {
  console.warn("Sharp not available for thumbnail generation");
}
let Wn = null;
const r1 = async () => {
  try {
    console.log("Attempting to load music-metadata via dynamic import..."), Wn = (await import("./index-CFQAOdfH.js").then((t) => t.X)).parseFile, console.log("music-metadata loaded successfully via dynamic import:", typeof Wn);
  } catch (e) {
    console.warn("Music-metadata not available for audio metadata extraction:", e);
    try {
      console.log("Trying fallback music library..."), Tt("node-id3") && console.log("node-id3 available as fallback");
    } catch {
      console.warn("No audio metadata libraries available");
    }
  }
};
r1();
let Is, Jn;
try {
  Is = Tt("ffmpeg-static"), Jn = Tt("fluent-ffmpeg"), Is && Jn.setFfmpegPath(Is), console.log("ffmpeg library loaded successfully");
} catch (e) {
  console.warn("ffmpeg not available for video thumbnail extraction:", e);
}
process.env.APP_ROOT = Ne.join(Zs, "..");
const ea = process.env.VITE_DEV_SERVER_URL, S1 = Ne.join(process.env.APP_ROOT, "dist-electron"), Vu = Ne.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = ea ? Ne.join(process.env.APP_ROOT, "public") : Vu;
const Te = new t1({
  defaults: {
    downloadPath: $r.getPath("downloads"),
    autoAcceptTransfers: !1,
    theme: "light",
    windowBounds: { width: 1200, height: 800 },
    deviceName: Tt("os").hostname() || "Desktop",
    folderSizeLimit: 10 * 1024 * 1024 * 1024,
    // 10GB default limit
    enableFolderSizeLimit: !1
  }
});
let ne = null;
function zu() {
  const { width: e, height: t } = Te.get("windowBounds");
  ne = new Sc({
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
  }), ea ? ne.loadURL(ea) : ne.loadFile(Ne.join(Vu, "index.html"));
}
$r.on("window-all-closed", () => {
  process.platform !== "darwin" && ($r.quit(), ne = null);
});
$r.on("activate", () => {
  Sc.getAllWindows().length === 0 && zu();
});
$r.whenReady().then(() => {
  zu();
});
ze.handle("store:get", (e, t) => Te.get(t));
ze.handle("store:set", (e, t, r) => (Te.set(t, r), !0));
ze.handle("store:delete", (e, t) => (Te.delete(t), !0));
ze.handle("fs:select-download-folder", async () => {
  if (!ne) return null;
  const e = await Gu.showOpenDialog(ne, {
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
    return await Pc.openPath(t), !0;
  } catch (r) {
    return console.error("Failed to open file:", r), !1;
  }
});
ze.handle("fs:show-in-folder", async (e, t) => {
  try {
    return Pc.showItemInFolder(t), !0;
  } catch (r) {
    return console.error("Failed to show file in folder:", r), !1;
  }
});
const n1 = async (e) => {
  var t, r;
  try {
    if (process.platform === "win32")
      try {
        const { exec: n } = Tt("child_process"), s = Qu(n), a = Ne.parse(e).root.replace("\\", ""), { stdout: o } = await s(`wmic logicaldisk where caption="${a}" get size,freespace /value`), c = o.split(`
`).filter((u) => u.trim().includes("="));
        let l = 0, d = 0;
        for (const u of c) {
          const h = u.trim();
          h.startsWith("Size=") ? l = parseInt(h.split("=")[1]) || 0 : h.startsWith("FreeSpace=") && (d = parseInt(h.split("=")[1]) || 0);
        }
        if (l > 0)
          return { total: l, free: d, used: l - d };
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
}, Uu = async (e) => {
  let t = 0;
  try {
    const r = await ut.promises.readdir(e, { withFileTypes: !0 });
    for (const n of r) {
      const s = Ne.join(e, n.name);
      if (n.isDirectory())
        t += await Uu(s);
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
    const s = await Uu(e);
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
      path: Te.get("downloadPath") || $r.getPath("downloads")
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
            const c = await ut.promises.stat(o), l = Ne.extname(a.name).toLowerCase();
            [".pdf", ".doc", ".docx", ".txt", ".rtf"].includes(l) ? (t.documents.count++, t.documents.size += c.size) : [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"].includes(l) ? (t.photos.count++, t.photos.size += c.size) : [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"].includes(l) ? (t.videos.count++, t.videos.size += c.size) : [".mp3", ".wav", ".flac", ".aac", ".ogg"].includes(l) ? (t.sound.count++, t.sound.size += c.size) : (t.other.count++, t.other.size += c.size);
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
    console.log("=== GET RECENT FILES CALLED ===");
    const r = Te.get("downloadPath");
    console.log("Download path:", r);
    const n = [], s = async (o) => {
      try {
        const c = await ut.promises.readdir(o, { withFileTypes: !0 });
        for (const l of c) {
          const d = Ne.join(o, l.name);
          if (l.isDirectory())
            await s(d);
          else
            try {
              const u = await ut.promises.stat(d), h = Ne.extname(l.name).toLowerCase();
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
                  name: l.name,
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
    await s(r), n.sort((o, c) => new Date(c.modified).getTime() - new Date(o.modified).getTime());
    const a = n.slice(0, t);
    for (const o of a) {
      console.log(`Generating thumbnail for: ${o.name}`);
      const c = await qu(o.path);
      c ? (console.log(`Thumbnail generated for ${o.name}, length: ${c.length}`), o.thumbnail = c) : console.log(`No thumbnail generated for ${o.name}`);
    }
    return console.log("=== RETURNING FILES ==="), console.log("Total files with thumbnails:", a.filter((o) => o.thumbnail).length), console.log("File details:", a.map((o) => {
      var c;
      return {
        name: o.name,
        hasThumbnail: !!o.thumbnail,
        thumbnailLength: (c = o.thumbnail) == null ? void 0 : c.length
      };
    })), a;
  } catch (r) {
    return console.error("Failed to get recent files:", r), [];
  }
});
ze.handle("fs:generate-thumbnail", async (e, t) => {
  try {
    return await qu(t);
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
    if (console.log("Attempting to extract audio thumbnail for:", e), Wn)
      try {
        console.log("Using music-metadata to parse file...");
        const n = await Wn(e);
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
          const a = s.format || "image/jpeg", o = s.data.toString("base64"), c = `data:${a};base64,${o}`;
          return console.log("Generated thumbnail data URL for audio file via music-metadata"), c;
        } else
          console.log("No album art found in audio file");
      } catch (n) {
        console.error("music-metadata failed, trying fallback:", n);
      }
    try {
      console.log("Trying node-id3 as fallback...");
      const s = Tt("node-id3").read(e);
      if (s && s.image) {
        console.log("Found album art via node-id3");
        const a = s.image.imageBuffer, o = s.image.mime || "image/jpeg", c = a.toString("base64"), l = `data:${o};base64,${c}`;
        return console.log("Generated thumbnail data URL for audio file via node-id3"), l;
      } else
        console.log("No album art found via node-id3");
    } catch (n) {
      console.error("node-id3 fallback also failed:", n);
    }
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
    const r = Tt("os").tmpdir(), n = Ne.join(r, `thumb_${Date.now()}.jpg`);
    console.log("ffmpeg library is available, extracting frame..."), Jn(e).seekInput(1).frames(1).size("64x64").output(n).on("end", async () => {
      try {
        console.log("Video frame extracted successfully");
        const o = `data:image/jpeg;base64,${(await ut.promises.readFile(n)).toString("base64")}`;
        try {
          await ut.promises.unlink(n);
        } catch (c) {
          console.warn("Failed to clean up temp file:", c);
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
}), qu = async (e) => {
  const t = Ne.extname(e).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"].includes(t) ? await s1(e) : [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm", ".mkv", ".m4v"].includes(t) ? await o1(e) : [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"].includes(t) ? await a1(e) : null;
};
export {
  S1 as M,
  Vu as R,
  ea as V,
  Zu as g
};
