import Fu, { app as mr, BrowserWindow as gc, ipcMain as He, dialog as Vu, shell as vc } from "electron";
import { createRequire as zu } from "node:module";
import { fileURLToPath as Uu } from "node:url";
import Ge from "node:path";
import Jr from "node:fs";
import tr from "path";
import wc from "util";
import Ys from "fs";
import qu from "crypto";
import Ku from "assert";
import Gu from "events";
import Hu from "os";
import { promisify as Bu } from "node:util";
var sn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Os = { exports: {} }, Ju = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const qt = Ju, Xu = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), Yu = (e) => !e.some((t) => Xu.has(t));
function an(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return Yu(r) ? r : [];
}
var Qu = {
  get(e, t, r) {
    if (!qt(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = an(t);
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
    if (!qt(e) || typeof t != "string")
      return e;
    const n = e, s = an(t);
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      qt(e[i]) || (e[i] = {}), a === s.length - 1 && (e[i] = r), e = e[i];
    }
    return n;
  },
  delete(e, t) {
    if (!qt(e) || typeof t != "string")
      return !1;
    const r = an(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !qt(e))
        return !1;
    }
  },
  has(e, t) {
    if (!qt(e) || typeof t != "string")
      return !1;
    const r = an(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (qt(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, Qs = { exports: {} }, Zs = { exports: {} }, xs = { exports: {} }, ea = { exports: {} };
const Ec = Ys;
ea.exports = (e) => new Promise((t) => {
  Ec.access(e, (r) => {
    t(!r);
  });
});
ea.exports.sync = (e) => {
  try {
    return Ec.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var Zu = ea.exports, ta = { exports: {} }, ra = { exports: {} };
const Sc = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
ra.exports = Sc;
ra.exports.default = Sc;
var xu = ra.exports;
const ed = xu, bc = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (u, c, ...d) => {
    r++;
    const l = ed(u, ...d);
    c(l), l.then(n, n);
  }, a = (u, c, ...d) => {
    r < e ? s(u, c, ...d) : t.push(s.bind(null, u, c, ...d));
  }, i = (u, ...c) => new Promise((d) => a(u, d, ...c));
  return Object.defineProperties(i, {
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
  }), i;
};
ta.exports = bc;
ta.exports.default = bc;
var td = ta.exports;
const xo = td;
class Pc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const rd = (e, t) => Promise.resolve(e).then(t), nd = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new Pc(t[0])));
var sd = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = xo(r.concurrency), s = [...e].map((i) => [i, n(rd, i, t)]), a = xo(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((i) => a(nd, i))).then(() => {
  }).catch((i) => i instanceof Pc ? i.value : Promise.reject(i));
};
const Nc = tr, Oc = Zu, ad = sd;
xs.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), ad(e, (r) => Oc(Nc.resolve(t.cwd, r)), t));
xs.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (Oc.sync(Nc.resolve(t.cwd, r)))
      return r;
};
var od = xs.exports;
const Et = tr, Rc = od;
Zs.exports = (e, t = {}) => {
  const r = Et.resolve(t.cwd || ""), { root: n } = Et.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function i(u) {
      Rc(s, { cwd: u }).then((c) => {
        c ? a(Et.join(u, c)) : u === n ? a(null) : i(Et.dirname(u));
      });
    })(r);
  });
};
Zs.exports.sync = (e, t = {}) => {
  let r = Et.resolve(t.cwd || "");
  const { root: n } = Et.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = Rc.sync(s, { cwd: r });
    if (a)
      return Et.join(r, a);
    if (r === n)
      return null;
    r = Et.dirname(r);
  }
};
var id = Zs.exports;
const Ic = id;
Qs.exports = async ({ cwd: e } = {}) => Ic("package.json", { cwd: e });
Qs.exports.sync = ({ cwd: e } = {}) => Ic.sync("package.json", { cwd: e });
var cd = Qs.exports, na = { exports: {} };
const pe = tr, Tc = Hu, wt = Tc.homedir(), sa = Tc.tmpdir(), { env: lr } = process, ld = (e) => {
  const t = pe.join(wt, "Library");
  return {
    data: pe.join(t, "Application Support", e),
    config: pe.join(t, "Preferences", e),
    cache: pe.join(t, "Caches", e),
    log: pe.join(t, "Logs", e),
    temp: pe.join(sa, e)
  };
}, ud = (e) => {
  const t = lr.APPDATA || pe.join(wt, "AppData", "Roaming"), r = lr.LOCALAPPDATA || pe.join(wt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: pe.join(r, e, "Data"),
    config: pe.join(t, e, "Config"),
    cache: pe.join(r, e, "Cache"),
    log: pe.join(r, e, "Log"),
    temp: pe.join(sa, e)
  };
}, dd = (e) => {
  const t = pe.basename(wt);
  return {
    data: pe.join(lr.XDG_DATA_HOME || pe.join(wt, ".local", "share"), e),
    config: pe.join(lr.XDG_CONFIG_HOME || pe.join(wt, ".config"), e),
    cache: pe.join(lr.XDG_CACHE_HOME || pe.join(wt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: pe.join(lr.XDG_STATE_HOME || pe.join(wt, ".local", "state"), e),
    temp: pe.join(sa, t, e)
  };
}, jc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? ld(e) : process.platform === "win32" ? ud(e) : dd(e);
};
na.exports = jc;
na.exports.default = jc;
var fd = na.exports, ot = {}, oe = {};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.NOOP = oe.LIMIT_FILES_DESCRIPTORS = oe.LIMIT_BASENAME_LENGTH = oe.IS_USER_ROOT = oe.IS_POSIX = oe.DEFAULT_TIMEOUT_SYNC = oe.DEFAULT_TIMEOUT_ASYNC = oe.DEFAULT_WRITE_OPTIONS = oe.DEFAULT_READ_OPTIONS = oe.DEFAULT_FOLDER_MODE = oe.DEFAULT_FILE_MODE = oe.DEFAULT_ENCODING = void 0;
const hd = "utf8";
oe.DEFAULT_ENCODING = hd;
const md = 438;
oe.DEFAULT_FILE_MODE = md;
const pd = 511;
oe.DEFAULT_FOLDER_MODE = pd;
const $d = {};
oe.DEFAULT_READ_OPTIONS = $d;
const yd = {};
oe.DEFAULT_WRITE_OPTIONS = yd;
const _d = 5e3;
oe.DEFAULT_TIMEOUT_ASYNC = _d;
const gd = 100;
oe.DEFAULT_TIMEOUT_SYNC = gd;
const vd = !!process.getuid;
oe.IS_POSIX = vd;
const wd = process.getuid ? !process.getuid() : !1;
oe.IS_USER_ROOT = wd;
const Ed = 128;
oe.LIMIT_BASENAME_LENGTH = Ed;
const Sd = 1e4;
oe.LIMIT_FILES_DESCRIPTORS = Sd;
const bd = () => {
};
oe.NOOP = bd;
var Bn = {}, pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.attemptifySync = pr.attemptifyAsync = void 0;
const Ac = oe, Pd = (e, t = Ac.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
pr.attemptifyAsync = Pd;
const Nd = (e, t = Ac.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
pr.attemptifySync = Nd;
var aa = {};
Object.defineProperty(aa, "__esModule", { value: !0 });
const Od = oe, kc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !Od.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!kc.isChangeErrorOk(e))
      throw e;
  }
};
aa.default = kc;
var $r = {}, oa = {};
Object.defineProperty(oa, "__esModule", { value: !0 });
const Rd = oe, ue = {
  interval: 25,
  intervalId: void 0,
  limit: Rd.LIMIT_FILES_DESCRIPTORS,
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
oa.default = ue;
Object.defineProperty($r, "__esModule", { value: !0 });
$r.retryifySync = $r.retryifyAsync = void 0;
const Id = oa, Td = (e, t) => function(r) {
  return function n() {
    return Id.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
      if (s(), Date.now() >= r)
        throw a;
      if (t(a)) {
        const i = Math.round(100 + 400 * Math.random());
        return new Promise((c) => setTimeout(c, i)).then(() => n.apply(void 0, arguments));
      }
      throw a;
    }));
  };
};
$r.retryifyAsync = Td;
const jd = (e, t) => function(r) {
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
$r.retryifySync = jd;
Object.defineProperty(Bn, "__esModule", { value: !0 });
const ie = Ys, Re = wc, Ie = pr, ve = aa, Ce = $r, Ad = {
  chmodAttempt: Ie.attemptifyAsync(Re.promisify(ie.chmod), ve.default.onChangeError),
  chownAttempt: Ie.attemptifyAsync(Re.promisify(ie.chown), ve.default.onChangeError),
  closeAttempt: Ie.attemptifyAsync(Re.promisify(ie.close)),
  fsyncAttempt: Ie.attemptifyAsync(Re.promisify(ie.fsync)),
  mkdirAttempt: Ie.attemptifyAsync(Re.promisify(ie.mkdir)),
  realpathAttempt: Ie.attemptifyAsync(Re.promisify(ie.realpath)),
  statAttempt: Ie.attemptifyAsync(Re.promisify(ie.stat)),
  unlinkAttempt: Ie.attemptifyAsync(Re.promisify(ie.unlink)),
  closeRetry: Ce.retryifyAsync(Re.promisify(ie.close), ve.default.isRetriableError),
  fsyncRetry: Ce.retryifyAsync(Re.promisify(ie.fsync), ve.default.isRetriableError),
  openRetry: Ce.retryifyAsync(Re.promisify(ie.open), ve.default.isRetriableError),
  readFileRetry: Ce.retryifyAsync(Re.promisify(ie.readFile), ve.default.isRetriableError),
  renameRetry: Ce.retryifyAsync(Re.promisify(ie.rename), ve.default.isRetriableError),
  statRetry: Ce.retryifyAsync(Re.promisify(ie.stat), ve.default.isRetriableError),
  writeRetry: Ce.retryifyAsync(Re.promisify(ie.write), ve.default.isRetriableError),
  chmodSyncAttempt: Ie.attemptifySync(ie.chmodSync, ve.default.onChangeError),
  chownSyncAttempt: Ie.attemptifySync(ie.chownSync, ve.default.onChangeError),
  closeSyncAttempt: Ie.attemptifySync(ie.closeSync),
  mkdirSyncAttempt: Ie.attemptifySync(ie.mkdirSync),
  realpathSyncAttempt: Ie.attemptifySync(ie.realpathSync),
  statSyncAttempt: Ie.attemptifySync(ie.statSync),
  unlinkSyncAttempt: Ie.attemptifySync(ie.unlinkSync),
  closeSyncRetry: Ce.retryifySync(ie.closeSync, ve.default.isRetriableError),
  fsyncSyncRetry: Ce.retryifySync(ie.fsyncSync, ve.default.isRetriableError),
  openSyncRetry: Ce.retryifySync(ie.openSync, ve.default.isRetriableError),
  readFileSyncRetry: Ce.retryifySync(ie.readFileSync, ve.default.isRetriableError),
  renameSyncRetry: Ce.retryifySync(ie.renameSync, ve.default.isRetriableError),
  statSyncRetry: Ce.retryifySync(ie.statSync, ve.default.isRetriableError),
  writeSyncRetry: Ce.retryifySync(ie.writeSync, ve.default.isRetriableError)
};
Bn.default = Ad;
var ia = {};
Object.defineProperty(ia, "__esModule", { value: !0 });
const kd = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
ia.default = kd;
var ca = {};
Object.defineProperty(ca, "__esModule", { value: !0 });
const on = {}, Rs = {
  next: (e) => {
    const t = on[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => Rs.next(e)) : delete on[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = on[e];
    r || (r = on[e] = []), r.push(t), !(r.length > 1) && t(() => Rs.next(e));
  })
};
ca.default = Rs;
var la = {};
Object.defineProperty(la, "__esModule", { value: !0 });
const Cd = tr, ei = oe, ti = Bn, ze = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = ze.truncate(t(e));
    return n in ze.store ? ze.get(e, t, r) : (ze.store[n] = r, [n, () => delete ze.store[n]]);
  },
  purge: (e) => {
    ze.store[e] && (delete ze.store[e], ti.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    ze.store[e] && (delete ze.store[e], ti.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in ze.store)
      ze.purgeSync(e);
  },
  truncate: (e) => {
    const t = Cd.basename(e);
    if (t.length <= ei.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - ei.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", ze.purgeSyncAll);
la.default = ze;
Object.defineProperty(ot, "__esModule", { value: !0 });
ot.writeFileSync = ot.writeFile = ot.readFileSync = ot.readFile = void 0;
const Cc = tr, Se = oe, ae = Bn, Ue = ia, Dd = ca, St = la;
function Dc(e, t = Se.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ue.default.isString(t))
    return Dc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Se.DEFAULT_TIMEOUT_ASYNC);
  return ae.default.readFileRetry(n)(e, t);
}
ot.readFile = Dc;
function Mc(e, t = Se.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ue.default.isString(t))
    return Mc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Se.DEFAULT_TIMEOUT_SYNC);
  return ae.default.readFileSyncRetry(n)(e, t);
}
ot.readFileSync = Mc;
const Lc = (e, t, r, n) => {
  if (Ue.default.isFunction(r))
    return Lc(e, t, Se.DEFAULT_WRITE_OPTIONS, r);
  const s = Fc(e, t, r);
  return n && s.then(n, n), s;
};
ot.writeFile = Lc;
const Fc = async (e, t, r = Se.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ue.default.isString(r))
    return Fc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Se.DEFAULT_TIMEOUT_ASYNC);
  let a = null, i = null, u = null, c = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), i = await Dd.default.schedule(e), e = await ae.default.realpathAttempt(e) || e, [c, u] = St.default.get(e, r.tmpCreate || St.default.create, r.tmpPurge !== !1);
    const l = Se.IS_POSIX && Ue.default.isUndefined(r.chown), h = Ue.default.isUndefined(r.mode);
    if (l || h) {
      const _ = await ae.default.statAttempt(e);
      _ && (r = { ...r }, l && (r.chown = { uid: _.uid, gid: _.gid }), h && (r.mode = _.mode));
    }
    const P = Cc.dirname(e);
    await ae.default.mkdirAttempt(P, {
      mode: Se.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await ae.default.openRetry(s)(c, "w", r.mode || Se.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), Ue.default.isString(t) ? await ae.default.writeRetry(s)(d, t, 0, r.encoding || Se.DEFAULT_ENCODING) : Ue.default.isUndefined(t) || await ae.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await ae.default.fsyncRetry(s)(d) : ae.default.fsyncAttempt(d)), await ae.default.closeRetry(s)(d), d = null, r.chown && await ae.default.chownAttempt(c, r.chown.uid, r.chown.gid), r.mode && await ae.default.chmodAttempt(c, r.mode);
    try {
      await ae.default.renameRetry(s)(c, e);
    } catch (_) {
      if (_.code !== "ENAMETOOLONG")
        throw _;
      await ae.default.renameRetry(s)(c, St.default.truncate(e));
    }
    u(), c = null;
  } finally {
    d && await ae.default.closeAttempt(d), c && St.default.purge(c), a && a(), i && i();
  }
}, Vc = (e, t, r = Se.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ue.default.isString(r))
    return Vc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Se.DEFAULT_TIMEOUT_SYNC);
  let a = null, i = null, u = null;
  try {
    e = ae.default.realpathSyncAttempt(e) || e, [i, a] = St.default.get(e, r.tmpCreate || St.default.create, r.tmpPurge !== !1);
    const c = Se.IS_POSIX && Ue.default.isUndefined(r.chown), d = Ue.default.isUndefined(r.mode);
    if (c || d) {
      const h = ae.default.statSyncAttempt(e);
      h && (r = { ...r }, c && (r.chown = { uid: h.uid, gid: h.gid }), d && (r.mode = h.mode));
    }
    const l = Cc.dirname(e);
    ae.default.mkdirSyncAttempt(l, {
      mode: Se.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), u = ae.default.openSyncRetry(s)(i, "w", r.mode || Se.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(i), Ue.default.isString(t) ? ae.default.writeSyncRetry(s)(u, t, 0, r.encoding || Se.DEFAULT_ENCODING) : Ue.default.isUndefined(t) || ae.default.writeSyncRetry(s)(u, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? ae.default.fsyncSyncRetry(s)(u) : ae.default.fsyncAttempt(u)), ae.default.closeSyncRetry(s)(u), u = null, r.chown && ae.default.chownSyncAttempt(i, r.chown.uid, r.chown.gid), r.mode && ae.default.chmodSyncAttempt(i, r.mode);
    try {
      ae.default.renameSyncRetry(s)(i, e);
    } catch (h) {
      if (h.code !== "ENAMETOOLONG")
        throw h;
      ae.default.renameSyncRetry(s)(i, St.default.truncate(e));
    }
    a(), i = null;
  } finally {
    u && ae.default.closeSyncAttempt(u), i && St.default.purge(i);
  }
};
ot.writeFileSync = Vc;
var Is = { exports: {} }, zc = {}, xe = {}, yr = {}, Qr = {}, te = {}, Xr = {};
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
      u(N, w[R]), N.push(m[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(m, ...w) {
    const N = [_(m[0])];
    let R = 0;
    for (; R < w.length; )
      N.push(a), u(N, w[R]), N.push(a, _(m[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function u(m, w) {
    w instanceof n ? m.push(...w._items) : w instanceof r ? m.push(w) : m.push(h(w));
  }
  e.addCodeArg = u;
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
  function l(m, w) {
    return w.emptyStr() ? m : m.emptyStr() ? w : i`${m}${w}`;
  }
  e.strConcat = l;
  function h(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : _(Array.isArray(m) ? m.join(",") : m);
  }
  function P(m) {
    return new n(_(m));
  }
  e.stringify = P;
  function _(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function E(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  e.getProperty = E;
  function g(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function y(m) {
    return new n(m.toString());
  }
  e.regexpCode = y;
})(Xr);
var Ts = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Xr;
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
    constructor({ prefixes: d, parent: l } = {}) {
      this._names = {}, this._prefixes = d, this._parent = l;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const l = this._names[d] || this._nameGroup(d);
      return `${d}${l.index++}`;
    }
    _nameGroup(d) {
      var l, h;
      if (!((h = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, l) {
      super(l), this.prefix = d;
    }
    setValue(d, { property: l, itemIndex: h }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(l)}[${h}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class u extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, l) {
      var h;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: _ } = P, E = (h = l.key) !== null && h !== void 0 ? h : l.ref;
      let g = this._values[_];
      if (g) {
        const w = g.get(E);
        if (w)
          return w;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(E, P);
      const y = this._scope[_] || (this._scope[_] = []), m = y.length;
      return y[m] = l.ref, P.setValue(l, { property: _, itemIndex: m }), P;
    }
    getValue(d, l) {
      const h = this._values[d];
      if (h)
        return h.get(l);
    }
    scopeRefs(d, l = this._values) {
      return this._reduceValues(l, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${d}${h.scopePath}`;
      });
    }
    scopeCode(d = this._values, l, h) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, l, h);
    }
    _reduceValues(d, l, h = {}, P) {
      let _ = t.nil;
      for (const E in d) {
        const g = d[E];
        if (!g)
          continue;
        const y = h[E] = h[E] || /* @__PURE__ */ new Map();
        g.forEach((m) => {
          if (y.has(m))
            return;
          y.set(m, n.Started);
          let w = l(m);
          if (w) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${N} ${m} = ${w};${this.opts._n}`;
          } else if (w = P == null ? void 0 : P(m))
            _ = (0, t._)`${_}${w}${this.opts._n}`;
          else
            throw new r(m);
          y.set(m, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = u;
})(Ts);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Xr, r = Ts;
  var n = Xr;
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
  var s = Ts;
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
    optimizeNames(o, f) {
      return this;
    }
  }
  class i extends a {
    constructor(o, f, b) {
      super(), this.varKind = o, this.name = f, this.rhs = b;
    }
    render({ es5: o, _n: f }) {
      const b = o ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${j};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class u extends a {
    constructor(o, f, b) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return fe(o, this.rhs);
    }
  }
  class c extends u {
    constructor(o, f, b, j) {
      super(o, b, j), this.op = f;
    }
    render({ _n: o }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + o;
    }
  }
  class d extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `${this.label}:` + o;
    }
  }
  class l extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `break${this.label ? ` ${this.label}` : ""};` + o;
    }
  }
  class h extends a {
    constructor(o) {
      super(), this.error = o;
    }
    render({ _n: o }) {
      return `throw ${this.error};` + o;
    }
    get names() {
      return this.error.names;
    }
  }
  class P extends a {
    constructor(o) {
      super(), this.code = o;
    }
    render({ _n: o }) {
      return `${this.code};` + o;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(o, f) {
      return this.code = C(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends a {
    constructor(o = []) {
      super(), this.nodes = o;
    }
    render(o) {
      return this.nodes.reduce((f, b) => f + b.render(o), "");
    }
    optimizeNodes() {
      const { nodes: o } = this;
      let f = o.length;
      for (; f--; ) {
        const b = o[f].optimizeNodes();
        Array.isArray(b) ? o.splice(f, 1, ...b) : b ? o[f] = b : o.splice(f, 1);
      }
      return o.length > 0 ? this : void 0;
    }
    optimizeNames(o, f) {
      const { nodes: b } = this;
      let j = b.length;
      for (; j--; ) {
        const A = b[j];
        A.optimizeNames(o, f) || (k(o, A.names), b.splice(j, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Q(o, f.names), {});
    }
  }
  class E extends _ {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends _ {
  }
  class y extends E {
  }
  y.kind = "else";
  class m extends E {
    constructor(o, f) {
      super(f), this.condition = o;
    }
    render(o) {
      let f = `if(${this.condition})` + super.render(o);
      return this.else && (f += "else " + this.else.render(o)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const o = this.condition;
      if (o === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new y(b) : b;
      }
      if (f)
        return o === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(z(o), f instanceof m ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = C(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return fe(o, this.condition), this.else && Q(o, this.else.names), o;
    }
  }
  m.kind = "if";
  class w extends E {
  }
  w.kind = "for";
  class N extends w {
    constructor(o) {
      super(), this.iteration = o;
    }
    render(o) {
      return `for(${this.iteration})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iteration = C(this.iteration, o, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends w {
    constructor(o, f, b, j) {
      super(), this.varKind = o, this.name = f, this.from = b, this.to = j;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: b, from: j, to: A } = this;
      return `for(${f} ${b}=${j}; ${b}<${A}; ${b}++)` + super.render(o);
    }
    get names() {
      const o = fe(super.names, this.from);
      return fe(o, this.to);
    }
  }
  class T extends w {
    constructor(o, f, b, j) {
      super(), this.loop = o, this.varKind = f, this.name = b, this.iterable = j;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = C(this.iterable, o, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class U extends E {
    constructor(o, f, b) {
      super(), this.name = o, this.args = f, this.async = b;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  U.kind = "func";
  class B extends _ {
    render(o) {
      return "return " + super.render(o);
    }
  }
  B.kind = "return";
  class de extends E {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var b, j;
      return super.optimizeNames(o, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(o, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Q(o, this.catch.names), this.finally && Q(o, this.finally.names), o;
    }
  }
  class V extends E {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  V.kind = "catch";
  class H extends E {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  H.kind = "finally";
  class se {
    constructor(o, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = o, this._scope = new r.Scope({ parent: o }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(o) {
      return this._scope.name(o);
    }
    // reserves unique name in the external scope
    scopeName(o) {
      return this._extScope.name(o);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(o, f) {
      const b = this._extScope.value(o, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(o, f) {
      return this._extScope.getValue(o, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(o) {
      return this._extScope.scopeRefs(o, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(o, f, b, j) {
      const A = this._scope.toName(f);
      return b !== void 0 && j && (this._constants[A.str] = b), this._leafNode(new i(o, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(o, f, b) {
      return this._def(r.varKinds.const, o, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(o, f, b) {
      return this._def(r.varKinds.let, o, f, b);
    }
    // `var` declaration with optional assignment
    var(o, f, b) {
      return this._def(r.varKinds.var, o, f, b);
    }
    // assignment code
    assign(o, f, b) {
      return this._leafNode(new u(o, f, b));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new c(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new P(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [b, j] of o)
        f.length > 1 && f.push(","), f.push(b), (b !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(o, f, b) {
      if (this._blockNode(new m(o)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(o) {
      return this._elseNode(new m(o));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, y);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, b, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(o);
      return this._for(new R(A, q, f, b), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, b, j = r.varKinds.const) {
      const A = this._scope.toName(o);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), b(A);
        });
      }
      return this._for(new T("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(o);
      return this._for(new T("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(o) {
      return this._leafNode(new d(o));
    }
    // `break` statement
    break(o) {
      return this._leafNode(new l(o));
    }
    // `return` statement
    return(o) {
      const f = new B();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(B);
    }
    // `try` statement
    try(o, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new de();
      if (this._blockNode(j), this.code(o), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return b && (this._currNode = j.finally = new H(), this.code(b)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(o) {
      return this._leafNode(new h(o));
    }
    // start self-balancing block
    block(o, f) {
      return this._blockStarts.push(this._nodes.length), o && this.code(o).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(o) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || o !== void 0 && b !== o)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${o} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(o, f = t.nil, b, j) {
      return this._blockNode(new U(o, f, b)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(U);
    }
    optimize(o = 1) {
      for (; o-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(o) {
      return this._currNode.nodes.push(o), this;
    }
    _blockNode(o) {
      this._currNode.nodes.push(o), this._nodes.push(o);
    }
    _endBlockNode(o, f) {
      const b = this._currNode;
      if (b instanceof o || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${o.kind}/${f.kind}` : o.kind}"`);
    }
    _elseNode(o) {
      const f = this._currNode;
      if (!(f instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = o, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const o = this._nodes;
      return o[o.length - 1];
    }
    set _currNode(o) {
      const f = this._nodes;
      f[f.length - 1] = o;
    }
  }
  e.CodeGen = se;
  function Q($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) + (o[f] || 0);
    return $;
  }
  function fe($, o) {
    return o instanceof t._CodeOrName ? Q($, o.names) : $;
  }
  function C($, o, f) {
    if ($ instanceof t.Name)
      return b($);
    if (!j($))
      return $;
    return new t._Code($._items.reduce((A, q) => (q instanceof t.Name && (q = b(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function b(A) {
      const q = f[A.str];
      return q === void 0 || o[A.str] !== 1 ? A : (delete o[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && o[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) - (o[f] || 0);
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
  const I = p(e.operators.OR);
  function v(...$) {
    return $.reduce(I);
  }
  e.or = v;
  function p($) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${S(o)} ${$} ${S(f)}`;
  }
  function S($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(te);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ce = te, Md = Xr;
function Ld(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = Ld;
function Fd(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Uc(e, t), !qc(t, e.self.RULES.all));
}
M.alwaysValidSchema = Fd;
function Uc(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Hc(e, `unknown keyword: "${a}"`);
}
M.checkUnknownRules = Uc;
function qc(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = qc;
function Vd(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = Vd;
function zd({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ce._)`${r}`;
  }
  return (0, ce._)`${e}${t}${(0, ce.getProperty)(n)}`;
}
M.schemaRefOrVal = zd;
function Ud(e) {
  return Kc(decodeURIComponent(e));
}
M.unescapeFragment = Ud;
function qd(e) {
  return encodeURIComponent(ua(e));
}
M.escapeFragment = qd;
function ua(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = ua;
function Kc(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = Kc;
function Kd(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = Kd;
function ri({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ce.Name ? (a instanceof ce.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ce.Name ? (t(s, i, a), a) : r(a, i);
    return u === ce.Name && !(c instanceof ce.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: ri({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ce._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ce._)`${r} || {}`).code((0, ce._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ce._)`${r} || {}`), da(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Gc
  }),
  items: ri({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ce._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ce._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Gc(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ce._)`{}`);
  return t !== void 0 && da(e, r, t), r;
}
M.evaluatedPropsToName = Gc;
function da(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ce._)`${t}${(0, ce.getProperty)(n)}`, !0));
}
M.setEvaluated = da;
const ni = {};
function Gd(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: ni[t.code] || (ni[t.code] = new Md._Code(t.code))
  });
}
M.useFunc = Gd;
var js;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(js || (M.Type = js = {}));
function Hd(e, t, r) {
  if (e instanceof ce.Name) {
    const n = t === js.Num;
    return r ? n ? (0, ce._)`"[" + ${e} + "]"` : (0, ce._)`"['" + ${e} + "']"` : n ? (0, ce._)`"/" + ${e}` : (0, ce._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ce.getProperty)(e).toString() : "/" + ua(e);
}
M.getErrorPath = Hd;
function Hc(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = Hc;
var ut = {};
Object.defineProperty(ut, "__esModule", { value: !0 });
const Ne = te, Bd = {
  // validation function arguments
  data: new Ne.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Ne.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Ne.Name("instancePath"),
  parentData: new Ne.Name("parentData"),
  parentDataProperty: new Ne.Name("parentDataProperty"),
  rootData: new Ne.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Ne.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Ne.Name("vErrors"),
  // null or array of validation errors
  errors: new Ne.Name("errors"),
  // counter of validation errors
  this: new Ne.Name("this"),
  // "globals"
  self: new Ne.Name("self"),
  scope: new Ne.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Ne.Name("json"),
  jsonPos: new Ne.Name("jsonPos"),
  jsonLen: new Ne.Name("jsonLen"),
  jsonPart: new Ne.Name("jsonPart")
};
ut.default = Bd;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = M, n = ut;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: m }) => m ? (0, t.str)`"${y}" keyword must be ${m} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, m = e.keywordError, w, N) {
    const { it: R } = y, { gen: T, compositeRule: U, allErrors: B } = R, de = h(y, m, w);
    N ?? (U || B) ? c(T, de) : d(R, (0, t._)`[${de}]`);
  }
  e.reportError = s;
  function a(y, m = e.keywordError, w) {
    const { it: N } = y, { gen: R, compositeRule: T, allErrors: U } = N, B = h(y, m, w);
    c(R, B), T || U || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(y, m) {
    y.assign(n.default.errors, m), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(m, () => y.assign((0, t._)`${n.default.vErrors}.length`, m), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: y, keyword: m, schemaValue: w, data: N, errsCount: R, it: T }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const U = y.name("err");
    y.forRange("i", R, n.default.errors, (B) => {
      y.const(U, (0, t._)`${n.default.vErrors}[${B}]`), y.if((0, t._)`${U}.instancePath === undefined`, () => y.assign((0, t._)`${U}.instancePath`, (0, t.strConcat)(n.default.instancePath, T.errorPath))), y.assign((0, t._)`${U}.schemaPath`, (0, t.str)`${T.errSchemaPath}/${m}`), T.opts.verbose && (y.assign((0, t._)`${U}.schema`, w), y.assign((0, t._)`${U}.data`, N));
    });
  }
  e.extendErrors = u;
  function c(y, m) {
    const w = y.const("err", m);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function d(y, m) {
    const { gen: w, validateName: N, schemaEnv: R } = y;
    R.$async ? w.throw((0, t._)`new ${y.ValidationError}(${m})`) : (w.assign((0, t._)`${N}.errors`, m), w.return(!1));
  }
  const l = {
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
    const { gen: N, it: R } = y, T = [
      _(R, w),
      E(y, w)
    ];
    return g(y, m, T), N.object(...T);
  }
  function _({ errorPath: y }, { instancePath: m }) {
    const w = m ? (0, t.str)`${y}${(0, r.getErrorPath)(m, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function E({ keyword: y, it: { errSchemaPath: m } }, { schemaPath: w, parentSchema: N }) {
    let R = N ? m : (0, t.str)`${m}/${y}`;
    return w && (R = (0, t.str)`${R}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g(y, { params: m, message: w }, N) {
    const { keyword: R, data: T, schemaValue: U, it: B } = y, { opts: de, propertyName: V, topSchemaRef: H, schemaPath: se } = B;
    N.push([l.keyword, R], [l.params, typeof m == "function" ? m(y) : m || (0, t._)`{}`]), de.messages && N.push([l.message, typeof w == "function" ? w(y) : w]), de.verbose && N.push([l.schema, U], [l.parentSchema, (0, t._)`${H}${se}`], [n.default.data, T]), V && N.push([l.propertyName, V]);
  }
})(Qr);
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.boolOrEmptySchema = yr.topBoolOrEmptySchema = void 0;
const Wd = Qr, Jd = te, Xd = ut, Yd = {
  message: "boolean schema is false"
};
function Qd(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Bc(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(Xd.default.data) : (t.assign((0, Jd._)`${n}.errors`, null), t.return(!0));
}
yr.topBoolOrEmptySchema = Qd;
function Zd(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Bc(e)) : r.var(t, !0);
}
yr.boolOrEmptySchema = Zd;
function Bc(e, t) {
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
  (0, Wd.reportError)(s, Yd, void 0, t);
}
var _e = {}, Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.getRules = Qt.isJSONType = void 0;
const xd = ["string", "number", "integer", "boolean", "null", "object", "array"], ef = new Set(xd);
function tf(e) {
  return typeof e == "string" && ef.has(e);
}
Qt.isJSONType = tf;
function rf() {
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
Qt.getRules = rf;
var ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.shouldUseRule = ft.shouldUseGroup = ft.schemaHasRulesForType = void 0;
function nf({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Wc(e, n);
}
ft.schemaHasRulesForType = nf;
function Wc(e, t) {
  return t.rules.some((r) => Jc(e, r));
}
ft.shouldUseGroup = Wc;
function Jc(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
ft.shouldUseRule = Jc;
Object.defineProperty(_e, "__esModule", { value: !0 });
_e.reportTypeError = _e.checkDataTypes = _e.checkDataType = _e.coerceAndCheckDataType = _e.getJSONTypes = _e.getSchemaTypes = _e.DataType = void 0;
const sf = Qt, af = ft, of = Qr, X = te, Xc = M;
var ur;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(ur || (_e.DataType = ur = {}));
function cf(e) {
  const t = Yc(e.type);
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
_e.getSchemaTypes = cf;
function Yc(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(sf.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
_e.getJSONTypes = Yc;
function lf(e, t) {
  const { gen: r, data: n, opts: s } = e, a = uf(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, af.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = fa(t, n, s.strictNumbers, ur.Wrong);
    r.if(u, () => {
      a.length ? df(e, t, a) : ha(e);
    });
  }
  return i;
}
_e.coerceAndCheckDataType = lf;
const Qc = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function uf(e, t) {
  return t ? e.filter((r) => Qc.has(r) || t === "array" && r === "array") : [];
}
function df(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, X._)`typeof ${s}`), u = n.let("coerced", (0, X._)`undefined`);
  a.coerceTypes === "array" && n.if((0, X._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, X._)`${s}[0]`).assign(i, (0, X._)`typeof ${s}`).if(fa(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, X._)`${u} !== undefined`);
  for (const d of r)
    (Qc.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), ha(e), n.endIf(), n.if((0, X._)`${u} !== undefined`, () => {
    n.assign(s, u), ff(e, u);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, X._)`${i} == "number" || ${i} == "boolean"`).assign(u, (0, X._)`"" + ${s}`).elseIf((0, X._)`${s} === null`).assign(u, (0, X._)`""`);
        return;
      case "number":
        n.elseIf((0, X._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(u, (0, X._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, X._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(u, (0, X._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, X._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(u, !1).elseIf((0, X._)`${s} === "true" || ${s} === 1`).assign(u, !0);
        return;
      case "null":
        n.elseIf((0, X._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(u, null);
        return;
      case "array":
        n.elseIf((0, X._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(u, (0, X._)`[${s}]`);
    }
  }
}
function ff({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, X._)`${t} !== undefined`, () => e.assign((0, X._)`${t}[${r}]`, n));
}
function As(e, t, r, n = ur.Correct) {
  const s = n === ur.Correct ? X.operators.EQ : X.operators.NEQ;
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
      a = i((0, X._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, X._)`typeof ${t} ${s} ${e}`;
  }
  return n === ur.Correct ? a : (0, X.not)(a);
  function i(u = X.nil) {
    return (0, X.and)((0, X._)`typeof ${t} == "number"`, u, r ? (0, X._)`isFinite(${t})` : X.nil);
  }
}
_e.checkDataType = As;
function fa(e, t, r, n) {
  if (e.length === 1)
    return As(e[0], t, r, n);
  let s;
  const a = (0, Xc.toHash)(e);
  if (a.array && a.object) {
    const i = (0, X._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, X._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = X.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, X.and)(s, As(i, t, r, n));
  return s;
}
_e.checkDataTypes = fa;
const hf = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, X._)`{type: ${e}}` : (0, X._)`{type: ${t}}`
};
function ha(e) {
  const t = mf(e);
  (0, of.reportError)(t, hf);
}
_e.reportTypeError = ha;
function mf(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Xc.schemaRefOrVal)(e, n, "type");
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
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.assignDefaults = void 0;
const rr = te, pf = M;
function $f(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      si(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => si(e, a, s.default));
}
Wn.assignDefaults = $f;
function si(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, rr._)`${a}${(0, rr.getProperty)(t)}`;
  if (s) {
    (0, pf.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, rr._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, rr._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, rr._)`${u} = ${(0, rr.stringify)(r)}`);
}
var it = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.validateUnion = x.validateArray = x.usePattern = x.callValidateCode = x.schemaProperties = x.allSchemaProperties = x.noPropertyInData = x.propertyInData = x.isOwnProperty = x.hasPropFunc = x.reportMissingProp = x.checkMissingProp = x.checkReportMissingProp = void 0;
const he = te, ma = M, yt = ut, yf = M;
function _f(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if($a(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, he._)`${t}` }, !0), e.error();
  });
}
x.checkReportMissingProp = _f;
function gf({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, he.or)(...n.map((a) => (0, he.and)($a(e, t, a, r.ownProperties), (0, he._)`${s} = ${a}`)));
}
x.checkMissingProp = gf;
function vf(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
x.reportMissingProp = vf;
function Zc(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, he._)`Object.prototype.hasOwnProperty`
  });
}
x.hasPropFunc = Zc;
function pa(e, t, r) {
  return (0, he._)`${Zc(e)}.call(${t}, ${r})`;
}
x.isOwnProperty = pa;
function wf(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} !== undefined`;
  return n ? (0, he._)`${s} && ${pa(e, t, r)}` : s;
}
x.propertyInData = wf;
function $a(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} === undefined`;
  return n ? (0, he.or)(s, (0, he.not)(pa(e, t, r))) : s;
}
x.noPropertyInData = $a;
function xc(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
x.allSchemaProperties = xc;
function Ef(e, t) {
  return xc(t).filter((r) => !(0, ma.alwaysValidSchema)(e, t[r]));
}
x.schemaProperties = Ef;
function Sf({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, he._)`${e}, ${t}, ${n}${s}` : t, h = [
    [yt.default.instancePath, (0, he.strConcat)(yt.default.instancePath, a)],
    [yt.default.parentData, i.parentData],
    [yt.default.parentDataProperty, i.parentDataProperty],
    [yt.default.rootData, yt.default.rootData]
  ];
  i.opts.dynamicRef && h.push([yt.default.dynamicAnchors, yt.default.dynamicAnchors]);
  const P = (0, he._)`${l}, ${r.object(...h)}`;
  return c !== he.nil ? (0, he._)`${u}.call(${c}, ${P})` : (0, he._)`${u}(${P})`;
}
x.callValidateCode = Sf;
const bf = (0, he._)`new RegExp`;
function Pf({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, he._)`${s.code === "new RegExp" ? bf : (0, yf.useFunc)(e, s)}(${r}, ${n})`
  });
}
x.usePattern = Pf;
function Nf(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const u = t.let("valid", !0);
    return i(() => t.assign(u, !1)), u;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(u) {
    const c = t.const("len", (0, he._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: ma.Type.Num
      }, a), t.if((0, he.not)(a), u);
    });
  }
}
x.validateArray = Nf;
function Of(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, ma.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), u = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, u);
    t.assign(i, (0, he._)`${i} || ${u}`), e.mergeValidEvaluated(l, u) || t.if((0, he.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
x.validateUnion = Of;
Object.defineProperty(it, "__esModule", { value: !0 });
it.validateKeywordUsage = it.validSchemaType = it.funcKeywordCode = it.macroKeywordCode = void 0;
const Te = te, Ht = ut, Rf = x, If = Qr;
function Tf(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = el(r, n, u);
  i.opts.validateSchema !== !1 && i.self.validateSchema(u, !0);
  const d = r.name("valid");
  e.subschema({
    schema: u,
    schemaPath: Te.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
it.macroKeywordCode = Tf;
function jf(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  kf(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = el(n, s, d), h = n.let("valid");
  e.block$data(h, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && ai(e), y(() => e.error());
    else {
      const m = t.async ? _() : E();
      t.modifying && ai(e), y(() => Af(e, m));
    }
  }
  function _() {
    const m = n.let("ruleErrs", null);
    return n.try(() => g((0, Te._)`await `), (w) => n.assign(h, !1).if((0, Te._)`${w} instanceof ${c.ValidationError}`, () => n.assign(m, (0, Te._)`${w}.errors`), () => n.throw(w))), m;
  }
  function E() {
    const m = (0, Te._)`${l}.errors`;
    return n.assign(m, null), g(Te.nil), m;
  }
  function g(m = t.async ? (0, Te._)`await ` : Te.nil) {
    const w = c.opts.passContext ? Ht.default.this : Ht.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(h, (0, Te._)`${m}${(0, Rf.callValidateCode)(e, l, w, N)}`, t.modifying);
  }
  function y(m) {
    var w;
    n.if((0, Te.not)((w = t.valid) !== null && w !== void 0 ? w : h), m);
  }
}
it.funcKeywordCode = jf;
function ai(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Te._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Af(e, t) {
  const { gen: r } = e;
  r.if((0, Te._)`Array.isArray(${t})`, () => {
    r.assign(Ht.default.vErrors, (0, Te._)`${Ht.default.vErrors} === null ? ${t} : ${Ht.default.vErrors}.concat(${t})`).assign(Ht.default.errors, (0, Te._)`${Ht.default.vErrors}.length`), (0, If.extendErrors)(e);
  }, () => e.error());
}
function kf({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function el(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Te.stringify)(r) });
}
function Cf(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
it.validSchemaType = Cf;
function Df({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((u) => !Object.prototype.hasOwnProperty.call(e, u)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
it.validateKeywordUsage = Df;
var Nt = {};
Object.defineProperty(Nt, "__esModule", { value: !0 });
Nt.extendSubschemaMode = Nt.extendSubschemaData = Nt.getSubschema = void 0;
const st = te, tl = M;
function Mf(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const u = e.schema[t];
    return r === void 0 ? {
      schema: u,
      schemaPath: (0, st._)`${e.schemaPath}${(0, st.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: u[r],
      schemaPath: (0, st._)`${e.schemaPath}${(0, st.getProperty)(t)}${(0, st.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, tl.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Nt.getSubschema = Mf;
function Lf(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: h } = t, P = u.let("data", (0, st._)`${t.data}${(0, st.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, st.str)`${d}${(0, tl.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, st._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof st.Name ? s : u.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Nt.extendSubschemaData = Lf;
function Ff(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Nt.extendSubschemaMode = Ff;
var be = {}, Jn = function e(t, r) {
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
      var i = a[s];
      if (!e(t[i], r[i])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, rl = { exports: {} }, bt = rl.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Pn(t, n, s, e, "", e);
};
bt.keywords = {
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
bt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
bt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
bt.skipKeywords = {
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
function Pn(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var h = n[l];
      if (Array.isArray(h)) {
        if (l in bt.arrayKeywords)
          for (var P = 0; P < h.length; P++)
            Pn(e, t, r, h[P], s + "/" + l + "/" + P, a, s, l, n, P);
      } else if (l in bt.propsKeywords) {
        if (h && typeof h == "object")
          for (var _ in h)
            Pn(e, t, r, h[_], s + "/" + l + "/" + Vf(_), a, s, l, n, _);
      } else (l in bt.keywords || e.allKeys && !(l in bt.skipKeywords)) && Pn(e, t, r, h, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function Vf(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var zf = rl.exports;
Object.defineProperty(be, "__esModule", { value: !0 });
be.getSchemaRefs = be.resolveUrl = be.normalizeId = be._getFullPath = be.getFullPath = be.inlineRef = void 0;
const Uf = M, qf = Jn, Kf = zf, Gf = /* @__PURE__ */ new Set([
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
function Hf(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !ks(e) : t ? nl(e) <= t : !1;
}
be.inlineRef = Hf;
const Bf = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function ks(e) {
  for (const t in e) {
    if (Bf.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(ks) || typeof r == "object" && ks(r))
      return !0;
  }
  return !1;
}
function nl(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Gf.has(r) && (typeof e[r] == "object" && (0, Uf.eachItem)(e[r], (n) => t += nl(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function sl(e, t = "", r) {
  r !== !1 && (t = dr(t));
  const n = e.parse(t);
  return al(e, n);
}
be.getFullPath = sl;
function al(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
be._getFullPath = al;
const Wf = /#\/?$/;
function dr(e) {
  return e ? e.replace(Wf, "") : "";
}
be.normalizeId = dr;
function Jf(e, t, r) {
  return r = dr(r), e.resolve(t, r);
}
be.resolveUrl = Jf;
const Xf = /^[a-z_][-a-z0-9._]*$/i;
function Yf(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = dr(e[r] || t), a = { "": s }, i = sl(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return Kf(e, { allKeys: !0 }, (h, P, _, E) => {
    if (E === void 0)
      return;
    const g = i + P;
    let y = a[E];
    typeof h[r] == "string" && (y = m.call(this, h[r])), w.call(this, h.$anchor), w.call(this, h.$dynamicAnchor), a[P] = y;
    function m(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = dr(y ? R(y, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let T = this.refs[N];
      return typeof T == "string" && (T = this.refs[T]), typeof T == "object" ? d(h, T.schema, N) : N !== dr(g) && (N[0] === "#" ? (d(h, u[N], N), u[N] = h) : this.refs[N] = g), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!Xf.test(N))
          throw new Error(`invalid anchor "${N}"`);
        m.call(this, `#${N}`);
      }
    }
  }), u;
  function d(h, P, _) {
    if (P !== void 0 && !qf(h, P))
      throw l(_);
  }
  function l(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
be.getSchemaRefs = Yf;
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.getData = xe.KeywordCxt = xe.validateFunctionCode = void 0;
const ol = yr, oi = _e, ya = ft, Dn = _e, Qf = Wn, Fr = it, fs = Nt, K = te, W = ut, Zf = be, ht = M, Tr = Qr;
function xf(e) {
  if (ll(e) && (ul(e), cl(e))) {
    rh(e);
    return;
  }
  il(e, () => (0, ol.topBoolOrEmptySchema)(e));
}
xe.validateFunctionCode = xf;
function il({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, K._)`${W.default.data}, ${W.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${ii(r, s)}`), th(e, s), e.code(a);
  }) : e.func(t, (0, K._)`${W.default.data}, ${eh(s)}`, n.$async, () => e.code(ii(r, s)).code(a));
}
function eh(e) {
  return (0, K._)`{${W.default.instancePath}="", ${W.default.parentData}, ${W.default.parentDataProperty}, ${W.default.rootData}=${W.default.data}${e.dynamicRef ? (0, K._)`, ${W.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function th(e, t) {
  e.if(W.default.valCxt, () => {
    e.var(W.default.instancePath, (0, K._)`${W.default.valCxt}.${W.default.instancePath}`), e.var(W.default.parentData, (0, K._)`${W.default.valCxt}.${W.default.parentData}`), e.var(W.default.parentDataProperty, (0, K._)`${W.default.valCxt}.${W.default.parentDataProperty}`), e.var(W.default.rootData, (0, K._)`${W.default.valCxt}.${W.default.rootData}`), t.dynamicRef && e.var(W.default.dynamicAnchors, (0, K._)`${W.default.valCxt}.${W.default.dynamicAnchors}`);
  }, () => {
    e.var(W.default.instancePath, (0, K._)`""`), e.var(W.default.parentData, (0, K._)`undefined`), e.var(W.default.parentDataProperty, (0, K._)`undefined`), e.var(W.default.rootData, W.default.data), t.dynamicRef && e.var(W.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function rh(e) {
  const { schema: t, opts: r, gen: n } = e;
  il(e, () => {
    r.$comment && t.$comment && fl(e), ih(e), n.let(W.default.vErrors, null), n.let(W.default.errors, 0), r.unevaluated && nh(e), dl(e), uh(e);
  });
}
function nh(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function ii(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function sh(e, t) {
  if (ll(e) && (ul(e), cl(e))) {
    ah(e, t);
    return;
  }
  (0, ol.boolOrEmptySchema)(e, t);
}
function cl({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function ll(e) {
  return typeof e.schema != "boolean";
}
function ah(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && fl(e), ch(e), lh(e);
  const a = n.const("_errs", W.default.errors);
  dl(e, a), n.var(t, (0, K._)`${a} === ${W.default.errors}`);
}
function ul(e) {
  (0, ht.checkUnknownRules)(e), oh(e);
}
function dl(e, t) {
  if (e.opts.jtd)
    return ci(e, [], !1, t);
  const r = (0, oi.getSchemaTypes)(e.schema), n = (0, oi.coerceAndCheckDataType)(e, r);
  ci(e, r, !n, t);
}
function oh(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, ht.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function ih(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, ht.checkStrictMode)(e, "default is ignored in the schema root");
}
function ch(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Zf.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function lh(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function fl({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${W.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, K.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${W.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function uh(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, K._)`${W.default.errors} === 0`, () => t.return(W.default.data), () => t.throw((0, K._)`new ${s}(${W.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, W.default.vErrors), a.unevaluated && dh(e), t.return((0, K._)`${W.default.errors} === 0`));
}
function dh({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function ci(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, ht.schemaHasRulesButRef)(a, l))) {
    s.block(() => pl(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || fh(e, t), s.block(() => {
    for (const P of l.rules)
      h(P);
    h(l.post);
  });
  function h(P) {
    (0, ya.shouldUseGroup)(a, P) && (P.type ? (s.if((0, Dn.checkDataType)(P.type, i, c.strictNumbers)), li(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, Dn.reportTypeError)(e)), s.endIf()) : li(e, P), u || s.if((0, K._)`${W.default.errors} === ${n || 0}`));
  }
}
function li(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, Qf.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, ya.shouldUseRule)(n, a) && pl(e, a.keyword, a.definition, t.type);
  });
}
function fh(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (hh(e, t), e.opts.allowUnionTypes || mh(e, t), ph(e, e.dataTypes));
}
function hh(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      hl(e.dataTypes, r) || _a(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), yh(e, t);
  }
}
function mh(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && _a(e, "use allowUnionTypes to allow union type keyword");
}
function ph(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, ya.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => $h(t, i)) && _a(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function $h(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function hl(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function yh(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    hl(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function _a(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, ht.checkStrictMode)(e, t, e.opts.strictTypes);
}
let ml = class {
  constructor(t, r, n) {
    if ((0, Fr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, ht.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", $l(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Fr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Tr.reportExtraError : Tr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Tr.reportError)(this, this.def.$dataError || Tr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Tr.resetErrorsCount)(this.gen, this.errsCount);
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
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, K.or)((0, K._)`${s} === undefined`, r)), t !== K.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== K.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, K.or)(i(), u());
    function i() {
      if (n.length) {
        if (!(r instanceof K.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, K._)`${(0, Dn.checkDataTypes)(c, r, a.opts.strictNumbers, Dn.DataType.Wrong)}`;
      }
      return K.nil;
    }
    function u() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, K._)`!${c}(${r})`;
      }
      return K.nil;
    }
  }
  subschema(t, r) {
    const n = (0, fs.getSubschema)(this.it, t);
    (0, fs.extendSubschemaData)(n, this.it, t), (0, fs.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return sh(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = ht.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = ht.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, K.Name)), !0;
  }
};
xe.KeywordCxt = ml;
function pl(e, t, r, n) {
  const s = new ml(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Fr.funcKeywordCode)(s, r) : "macro" in r ? (0, Fr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Fr.funcKeywordCode)(s, r);
}
const _h = /^\/(?:[^~]|~0|~1)*$/, gh = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function $l(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return W.default.rootData;
  if (e[0] === "/") {
    if (!_h.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = W.default.rootData;
  } else {
    const d = gh.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +d[1];
    if (s = d[2], s === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (a = r[t - l], !s)
      return a;
  }
  let i = a;
  const u = s.split("/");
  for (const d of u)
    d && (a = (0, K._)`${a}${(0, K.getProperty)((0, ht.unescapeJsonPointer)(d))}`, i = (0, K._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
xe.getData = $l;
var Zr = {};
Object.defineProperty(Zr, "__esModule", { value: !0 });
let vh = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
Zr.default = vh;
var wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
const hs = be;
let wh = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, hs.resolveUrl)(t, r, n), this.missingSchema = (0, hs.normalizeId)((0, hs.getFullPath)(t, this.missingRef));
  }
};
wr.default = wh;
var Le = {};
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.resolveSchema = Le.getCompilingSchema = Le.resolveRef = Le.compileSchema = Le.SchemaEnv = void 0;
const We = te, Eh = Zr, Kt = ut, Qe = be, ui = M, Sh = xe;
let Xn = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Qe.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Le.SchemaEnv = Xn;
function ga(e) {
  const t = yl.call(this, e);
  if (t)
    return t;
  const r = (0, Qe.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new We.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: Eh.default,
    code: (0, We._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Kt.default.data,
    parentData: Kt.default.parentData,
    parentDataProperty: Kt.default.parentDataProperty,
    dataNames: [Kt.default.data],
    dataPathArr: [We.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, We.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: u,
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
  let l;
  try {
    this._compilations.add(e), (0, Sh.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const h = i.toString();
    l = `${i.scopeRefs(Kt.default.scope)}return ${h}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${Kt.default.self}`, `${Kt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: h, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: E, items: g } = d;
      _.evaluated = {
        props: E instanceof We.Name ? void 0 : E,
        items: g instanceof We.Name ? void 0 : g,
        dynamicProps: E instanceof We.Name,
        dynamicItems: g instanceof We.Name
      }, _.source && (_.source.evaluated = (0, We.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), h;
  } finally {
    this._compilations.delete(e);
  }
}
Le.compileSchema = ga;
function bh(e, t, r) {
  var n;
  r = (0, Qe.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Oh.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new Xn({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = Ph.call(this, a);
}
Le.resolveRef = bh;
function Ph(e) {
  return (0, Qe.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : ga.call(this, e);
}
function yl(e) {
  for (const t of this._compilations)
    if (Nh(t, e))
      return t;
}
Le.getCompilingSchema = yl;
function Nh(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Oh(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Yn.call(this, e, t);
}
function Yn(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Qe._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Qe.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return ms.call(this, r, e);
  const a = (0, Qe.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = Yn.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : ms.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || ga.call(this, i), a === (0, Qe.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, Qe.resolveUrl)(this.opts.uriResolver, s, d)), new Xn({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return ms.call(this, r, i);
  }
}
Le.resolveSchema = Yn;
const Rh = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function ms(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, ui.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !Rh.has(u) && d && (t = (0, Qe.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, ui.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, Qe.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Yn.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Xn({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Ih = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Th = "Meta-schema for $data reference (JSON AnySchema extension proposal)", jh = "object", Ah = [
  "$data"
], kh = {
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
}, Ch = !1, Dh = {
  $id: Ih,
  description: Th,
  type: jh,
  required: Ah,
  properties: kh,
  additionalProperties: Ch
};
var va = {}, Qn = { exports: {} };
const Mh = {
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
var Lh = {
  HEX: Mh
};
const { HEX: Fh } = Lh, Vh = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
function _l(e) {
  if (vl(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const t = e.match(Vh) || [], [r] = t;
  return r ? { host: Uh(r, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function di(e, t = !1) {
  let r = "", n = !0;
  for (const s of e) {
    if (Fh[s] === void 0) return;
    s !== "0" && n === !0 && (n = !1), n || (r += s);
  }
  return t && r.length === 0 && (r = "0"), r;
}
function zh(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, u = !1;
  function c() {
    if (s.length) {
      if (a === !1) {
        const d = di(s);
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
    const l = e[d];
    if (!(l === "[" || l === "]"))
      if (l === ":") {
        if (i === !0 && (u = !0), !c())
          break;
        if (t++, n.push(":"), t > 7) {
          r.error = !0;
          break;
        }
        d - 1 >= 0 && e[d - 1] === ":" && (i = !0);
        continue;
      } else if (l === "%") {
        if (!c())
          break;
        a = !0;
      } else {
        s.push(l);
        continue;
      }
  }
  return s.length && (a ? r.zone = s.join("") : u ? n.push(s.join("")) : n.push(di(s))), r.address = n.join(""), r;
}
function gl(e) {
  if (vl(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = zh(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, escapedHost: n, isIPV6: !0 };
  }
}
function Uh(e, t) {
  let r = "", n = !0;
  const s = e.length;
  for (let a = 0; a < s; a++) {
    const i = e[a];
    i === "0" && n ? (a + 1 <= s && e[a + 1] === t || a + 1 === s) && (r += i, n = !1) : (i === t ? n = !0 : n = !1, r += i);
  }
  return r;
}
function vl(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
const fi = /^\.\.?\//u, hi = /^\/\.(?:\/|$)/u, mi = /^\/\.\.(?:\/|$)/u, qh = /^\/?(?:.|\n)*?(?=\/|$)/u;
function Kh(e) {
  const t = [];
  for (; e.length; )
    if (e.match(fi))
      e = e.replace(fi, "");
    else if (e.match(hi))
      e = e.replace(hi, "/");
    else if (e.match(mi))
      e = e.replace(mi, "/"), t.pop();
    else if (e === "." || e === "..")
      e = "";
    else {
      const r = e.match(qh);
      if (r) {
        const n = r[0];
        e = e.slice(n.length), t.push(n);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return t.join("");
}
function Gh(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function Hh(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    const n = _l(r);
    if (n.isIPV4)
      r = n.host;
    else {
      const s = gl(n.host);
      s.isIPV6 === !0 ? r = `[${s.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Bh = {
  recomposeAuthority: Hh,
  normalizeComponentEncoding: Gh,
  removeDotSegments: Kh,
  normalizeIPv4: _l,
  normalizeIPv6: gl
};
const Wh = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, Jh = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function wl(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function El(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Sl(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function Xh(e) {
  return e.secure = wl(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function Yh(e) {
  if ((e.port === (wl(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function Qh(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(Jh);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = wa[s];
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function Zh(e, t) {
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = wa[s];
  a && (e = a.serialize(e, t));
  const i = e, u = e.nss;
  return i.path = `${n || t.nid}:${u}`, t.skipEscape = !0, i;
}
function xh(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !Wh.test(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function em(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const bl = {
  scheme: "http",
  domainHost: !0,
  parse: El,
  serialize: Sl
}, tm = {
  scheme: "https",
  domainHost: bl.domainHost,
  parse: El,
  serialize: Sl
}, Nn = {
  scheme: "ws",
  domainHost: !0,
  parse: Xh,
  serialize: Yh
}, rm = {
  scheme: "wss",
  domainHost: Nn.domainHost,
  parse: Nn.parse,
  serialize: Nn.serialize
}, nm = {
  scheme: "urn",
  parse: Qh,
  serialize: Zh,
  skipNormalize: !0
}, sm = {
  scheme: "urn:uuid",
  parse: xh,
  serialize: em,
  skipNormalize: !0
}, wa = {
  http: bl,
  https: tm,
  ws: Nn,
  wss: rm,
  urn: nm,
  "urn:uuid": sm
};
var am = wa;
const { normalizeIPv6: om, normalizeIPv4: im, removeDotSegments: Dr, recomposeAuthority: cm, normalizeComponentEncoding: cn } = Bh, Ea = am;
function lm(e, t) {
  return typeof e == "string" ? e = ct($t(e, t), t) : typeof e == "object" && (e = $t(ct(e, t), t)), e;
}
function um(e, t, r) {
  const n = Object.assign({ scheme: "null" }, r), s = Pl($t(e, n), $t(t, n), n, !0);
  return ct(s, { ...n, skipEscape: !0 });
}
function Pl(e, t, r, n) {
  const s = {};
  return n || (e = $t(ct(e, r), r), t = $t(ct(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Dr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Dr(t.path || ""), s.query = t.query) : (t.path ? (t.path.charAt(0) === "/" ? s.path = Dr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Dr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function dm(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ct(cn($t(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ct(cn(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ct(cn($t(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ct(cn(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
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
  }, n = Object.assign({}, t), s = [], a = Ea[(n.scheme || r.scheme || "").toLowerCase()];
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = cm(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path.charAt(0) !== "/" && s.push("/")), r.path !== void 0) {
    let u = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (u = Dr(u)), i === void 0 && (u = u.replace(/^\/\//u, "/%2F")), s.push(u);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const fm = Array.from({ length: 127 }, (e, t) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(t)));
function hm(e) {
  let t = 0;
  for (let r = 0, n = e.length; r < n; ++r)
    if (t = e.charCodeAt(r), t > 126 || fm[t])
      return !0;
  return !1;
}
const mm = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function $t(e, t) {
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
  const i = e.match(mm);
  if (i) {
    if (n.scheme = i[1], n.userinfo = i[3], n.host = i[4], n.port = parseInt(i[5], 10), n.path = i[6] || "", n.query = i[7], n.fragment = i[8], isNaN(n.port) && (n.port = i[5]), n.host) {
      const c = im(n.host);
      if (c.isIPV4 === !1) {
        const d = om(c.host);
        n.host = d.host.toLowerCase(), a = d.isIPV6;
      } else
        n.host = c.host, a = !0;
    }
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const u = Ea[(r.scheme || n.scheme || "").toLowerCase()];
    if (!r.unicodeSupport && (!u || !u.unicodeSupport) && n.host && (r.domainHost || u && u.domainHost) && a === !1 && hm(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (c) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + c;
      }
    (!u || u && !u.skipNormalize) && (s && n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), s && n.host !== void 0 && (n.host = unescape(n.host)), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), u && u.parse && u.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Sa = {
  SCHEMES: Ea,
  normalize: lm,
  resolve: um,
  resolveComponents: Pl,
  equal: dm,
  serialize: ct,
  parse: $t
};
Qn.exports = Sa;
Qn.exports.default = Sa;
Qn.exports.fastUri = Sa;
var Nl = Qn.exports;
Object.defineProperty(va, "__esModule", { value: !0 });
const Ol = Nl;
Ol.code = 'require("ajv/dist/runtime/uri").default';
va.default = Ol;
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
  const n = Zr, s = wr, a = Qt, i = Le, u = te, c = be, d = _e, l = M, h = Dh, P = va, _ = (v, p) => new RegExp(v, p);
  _.code = "new RegExp";
  const E = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
    var p, S, $, o, f, b, j, A, q, F, re, Ve, Rt, It, Tt, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, zt;
    const Be = v.strict, Ut = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, Rr = Ut === !0 || Ut === void 0 ? 1 : Ut || 0, Ir = ($ = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : _, ds = (o = v.uriResolver) !== null && o !== void 0 ? o : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : Be) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (Ve = (re = v.strictTuples) !== null && re !== void 0 ? re : Be) !== null && Ve !== void 0 ? Ve : "log",
      strictRequired: (It = (Rt = v.strictRequired) !== null && Rt !== void 0 ? Rt : Be) !== null && It !== void 0 ? It : !1,
      code: v.code ? { ...v.code, optimize: Rr, regExp: Ir } : { optimize: Rr, regExp: Ir },
      loopRequired: (Tt = v.loopRequired) !== null && Tt !== void 0 ? Tt : w,
      loopEnum: (jt = v.loopEnum) !== null && jt !== void 0 ? jt : w,
      meta: (At = v.meta) !== null && At !== void 0 ? At : !0,
      messages: (kt = v.messages) !== null && kt !== void 0 ? kt : !0,
      inlineRefs: (Ct = v.inlineRefs) !== null && Ct !== void 0 ? Ct : !0,
      schemaId: (Dt = v.schemaId) !== null && Dt !== void 0 ? Dt : "$id",
      addUsedSchema: (Mt = v.addUsedSchema) !== null && Mt !== void 0 ? Mt : !0,
      validateSchema: (Lt = v.validateSchema) !== null && Lt !== void 0 ? Lt : !0,
      validateFormats: (Ft = v.validateFormats) !== null && Ft !== void 0 ? Ft : !0,
      unicodeRegExp: (Vt = v.unicodeRegExp) !== null && Vt !== void 0 ? Vt : !0,
      int32range: (zt = v.int32range) !== null && zt !== void 0 ? zt : !0,
      uriResolver: ds
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: $ } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: $ }), this.logger = Q(p.logger);
      const o = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), T.call(this, y, p, "NOT SUPPORTED"), T.call(this, m, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && de.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), B.call(this), p.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: $ } = this.opts;
      let o = h;
      $ === "id" && (o = { ...h }, o.id = o.$id, delete o.$id), S && p && this.addMetaSchema(o, o[$], !1);
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
      const o = $(S);
      return "$async" in $ || (this.errors = $.errors), o;
    }
    compile(p, S) {
      const $ = this._addSchema(p, S);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return o.call(this, p, S);
      async function o(F, re) {
        await f.call(this, F.$schema);
        const Ve = this._addSchema(F, re);
        return Ve.validate || b.call(this, Ve);
      }
      async function f(F) {
        F && !this.getSchema(F) && await o.call(this, { $ref: F }, !0);
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
    addSchema(p, S, $, o = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, $, o);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, $, S, o, !0), this;
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
      const o = this.validate($, p);
      if (!o && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return o;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = U.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: $ } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: $ });
        if (S = i.resolveSchema.call(this, o, p), !S)
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
        return (0, l.eachItem)($, (f) => k.call(this, f)), this;
      D.call(this, S);
      const o = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, l.eachItem)($, o.type.length === 0 ? (f) => k.call(this, f, o) : (f) => o.type.forEach((b) => k.call(this, f, o, b))), this;
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
        const o = $.rules.findIndex((f) => f.keyword === p);
        o >= 0 && $.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: $ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((o) => `${$}${o.instancePath} ${o.message}`).reduce((o, f) => o + S + f);
    }
    $dataMetaSchema(p, S) {
      const $ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const o of S) {
        const f = o.split("/").slice(1);
        let b = p;
        for (const j of f)
          b = b[j];
        for (const j in $) {
          const A = $[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = b[j];
          q && F && (b[j] = I(F));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const $ in p) {
        const o = p[$];
        (!S || S.test($)) && (typeof o == "string" ? delete p[$] : o && !o.meta && (this._cache.delete(o.schema), delete p[$]));
      }
    }
    _addSchema(p, S, $, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
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
      return A = new i.SchemaEnv({ schema: p, schemaId: j, meta: S, baseId: $, localRefs: q }), this._cache.set(A.schema, A), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = A), o && this.validateSchema(p, !0), A;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : i.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function T(v, p, S, $ = "error") {
    for (const o in v) {
      const f = o;
      f in p && this.logger[$](`${S}: option ${o}. ${v[f]}`);
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
    if ((0, l.eachItem)(v, ($) => {
      if (S.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!fe.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, S) {
    var $;
    const o = p == null ? void 0 : p.post;
    if (S && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = o ? f.post : f.rules.find(({ type: A }) => A === S);
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
    const $ = v.rules.findIndex((o) => o.keyword === S);
    $ >= 0 ? v.rules.splice($, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: p } = v;
    p !== void 0 && (v.$data && this.opts.$data && (p = I(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function I(v) {
    return { anyOf: [v, O] };
  }
})(zc);
var ba = {}, Pa = {}, Na = {};
Object.defineProperty(Na, "__esModule", { value: !0 });
const pm = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Na.default = pm;
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.callRef = Zt.getValidate = void 0;
const $m = wr, pi = x, De = te, nr = ut, $i = Le, ln = M, ym = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const l = $i.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new $m.default(n.opts.uriResolver, s, r);
    if (l instanceof $i.SchemaEnv)
      return P(l);
    return _(l);
    function h() {
      if (a === d)
        return On(e, i, a, a.$async);
      const E = t.scopeValue("root", { ref: d });
      return On(e, (0, De._)`${E}.validate`, d, d.$async);
    }
    function P(E) {
      const g = Rl(e, E);
      On(e, g, E, E.$async);
    }
    function _(E) {
      const g = t.scopeValue("schema", u.code.source === !0 ? { ref: E, code: (0, De.stringify)(E) } : { ref: E }), y = t.name("valid"), m = e.subschema({
        schema: E,
        dataTypes: [],
        schemaPath: De.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(m), e.ok(y);
    }
  }
};
function Rl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, De._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Zt.getValidate = Rl;
function On(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? nr.default.this : De.nil;
  n ? l() : h();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const E = s.let("valid");
    s.try(() => {
      s.code((0, De._)`await ${(0, pi.callValidateCode)(e, t, d)}`), _(t), i || s.assign(E, !0);
    }, (g) => {
      s.if((0, De._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), P(g), i || s.assign(E, !1);
    }), e.ok(E);
  }
  function h() {
    e.result((0, pi.callValidateCode)(e, t, d), () => _(t), () => P(t));
  }
  function P(E) {
    const g = (0, De._)`${E}.errors`;
    s.assign(nr.default.vErrors, (0, De._)`${nr.default.vErrors} === null ? ${g} : ${nr.default.vErrors}.concat(${g})`), s.assign(nr.default.errors, (0, De._)`${nr.default.vErrors}.length`);
  }
  function _(E) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const y = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = ln.mergeEvaluated.props(s, y.props, a.props));
      else {
        const m = s.var("props", (0, De._)`${E}.evaluated.props`);
        a.props = ln.mergeEvaluated.props(s, m, a.props, De.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = ln.mergeEvaluated.items(s, y.items, a.items));
      else {
        const m = s.var("items", (0, De._)`${E}.evaluated.items`);
        a.items = ln.mergeEvaluated.items(s, m, a.items, De.Name);
      }
  }
}
Zt.callRef = On;
Zt.default = ym;
Object.defineProperty(Pa, "__esModule", { value: !0 });
const _m = Na, gm = Zt, vm = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  _m.default,
  gm.default
];
Pa.default = vm;
var Oa = {}, Ra = {};
Object.defineProperty(Ra, "__esModule", { value: !0 });
const Mn = te, _t = Mn.operators, Ln = {
  maximum: { okStr: "<=", ok: _t.LTE, fail: _t.GT },
  minimum: { okStr: ">=", ok: _t.GTE, fail: _t.LT },
  exclusiveMaximum: { okStr: "<", ok: _t.LT, fail: _t.GTE },
  exclusiveMinimum: { okStr: ">", ok: _t.GT, fail: _t.LTE }
}, wm = {
  message: ({ keyword: e, schemaCode: t }) => (0, Mn.str)`must be ${Ln[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Mn._)`{comparison: ${Ln[e].okStr}, limit: ${t}}`
}, Em = {
  keyword: Object.keys(Ln),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: wm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Mn._)`${r} ${Ln[t].fail} ${n} || isNaN(${r})`);
  }
};
Ra.default = Em;
var Ia = {};
Object.defineProperty(Ia, "__esModule", { value: !0 });
const Vr = te, Sm = {
  message: ({ schemaCode: e }) => (0, Vr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Vr._)`{multipleOf: ${e}}`
}, bm = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Sm,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Vr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Vr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Vr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
Ia.default = bm;
var Ta = {}, ja = {};
Object.defineProperty(ja, "__esModule", { value: !0 });
function Il(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
ja.default = Il;
Il.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ta, "__esModule", { value: !0 });
const Bt = te, Pm = M, Nm = ja, Om = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Bt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Bt._)`{limit: ${e}}`
}, Rm = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Om,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Bt.operators.GT : Bt.operators.LT, i = s.opts.unicode === !1 ? (0, Bt._)`${r}.length` : (0, Bt._)`${(0, Pm.useFunc)(e.gen, Nm.default)}(${r})`;
    e.fail$data((0, Bt._)`${i} ${a} ${n}`);
  }
};
Ta.default = Rm;
var Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
const Im = x, Fn = te, Tm = {
  message: ({ schemaCode: e }) => (0, Fn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Fn._)`{pattern: ${e}}`
}, jm = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Tm,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, Fn._)`(new RegExp(${s}, ${i}))` : (0, Im.usePattern)(e, n);
    e.fail$data((0, Fn._)`!${u}.test(${t})`);
  }
};
Aa.default = jm;
var ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const zr = te, Am = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, zr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, zr._)`{limit: ${e}}`
}, km = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Am,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? zr.operators.GT : zr.operators.LT;
    e.fail$data((0, zr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
ka.default = km;
var Ca = {};
Object.defineProperty(Ca, "__esModule", { value: !0 });
const jr = x, Ur = te, Cm = M, Dm = {
  message: ({ params: { missingProperty: e } }) => (0, Ur.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Ur._)`{missingProperty: ${e}}`
}, Mm = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Dm,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !E.has(g)) {
          const y = i.schemaEnv.baseId + i.errSchemaPath, m = `required property "${g}" is not defined at "${y}" (strictRequired)`;
          (0, Cm.checkStrictMode)(i, m, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Ur.nil, h);
      else
        for (const _ of r)
          (0, jr.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const E = t.let("valid", !0);
        e.block$data(E, () => P(_, E)), e.ok(E);
      } else
        t.if((0, jr.checkMissingProp)(e, r, _)), (0, jr.reportMissingProp)(e, _), t.else();
    }
    function h() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, jr.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function P(_, E) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(E, (0, jr.propertyInData)(t, s, _, u.ownProperties)), t.if((0, Ur.not)(E), () => {
          e.error(), t.break();
        });
      }, Ur.nil);
    }
  }
};
Ca.default = Mm;
var Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
const qr = te, Lm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, qr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, qr._)`{limit: ${e}}`
}, Fm = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Lm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? qr.operators.GT : qr.operators.LT;
    e.fail$data((0, qr._)`${r}.length ${s} ${n}`);
  }
};
Da.default = Fm;
var Ma = {}, xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
const Tl = Jn;
Tl.code = 'require("ajv/dist/runtime/equal").default';
xr.default = Tl;
Object.defineProperty(Ma, "__esModule", { value: !0 });
const ps = _e, we = te, Vm = M, zm = xr, Um = {
  message: ({ params: { i: e, j: t } }) => (0, we.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, we._)`{i: ${e}, j: ${t}}`
}, qm = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Um,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, ps.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, we._)`${i} === false`), e.ok(c);
    function l() {
      const E = t.let("i", (0, we._)`${r}.length`), g = t.let("j");
      e.setParams({ i: E, j: g }), t.assign(c, !0), t.if((0, we._)`${E} > 1`, () => (h() ? P : _)(E, g));
    }
    function h() {
      return d.length > 0 && !d.some((E) => E === "object" || E === "array");
    }
    function P(E, g) {
      const y = t.name("item"), m = (0, ps.checkDataTypes)(d, y, u.opts.strictNumbers, ps.DataType.Wrong), w = t.const("indices", (0, we._)`{}`);
      t.for((0, we._)`;${E}--;`, () => {
        t.let(y, (0, we._)`${r}[${E}]`), t.if(m, (0, we._)`continue`), d.length > 1 && t.if((0, we._)`typeof ${y} == "string"`, (0, we._)`${y} += "_"`), t.if((0, we._)`typeof ${w}[${y}] == "number"`, () => {
          t.assign(g, (0, we._)`${w}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, we._)`${w}[${y}] = ${E}`);
      });
    }
    function _(E, g) {
      const y = (0, Vm.useFunc)(t, zm.default), m = t.name("outer");
      t.label(m).for((0, we._)`;${E}--;`, () => t.for((0, we._)`${g} = ${E}; ${g}--;`, () => t.if((0, we._)`${y}(${r}[${E}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
Ma.default = qm;
var La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
const Cs = te, Km = M, Gm = xr, Hm = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Cs._)`{allowedValue: ${e}}`
}, Bm = {
  keyword: "const",
  $data: !0,
  error: Hm,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Cs._)`!${(0, Km.useFunc)(t, Gm.default)}(${r}, ${s})`) : e.fail((0, Cs._)`${a} !== ${r}`);
  }
};
La.default = Bm;
var Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
const Mr = te, Wm = M, Jm = xr, Xm = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Mr._)`{allowedValues: ${e}}`
}, Ym = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Xm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, Wm.useFunc)(t, Jm.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, Mr.or)(...s.map((E, g) => P(_, g)));
    }
    e.pass(l);
    function h() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, Mr._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function P(_, E) {
      const g = s[E];
      return typeof g == "object" && g !== null ? (0, Mr._)`${d()}(${r}, ${_}[${E}])` : (0, Mr._)`${r} === ${g}`;
    }
  }
};
Fa.default = Ym;
Object.defineProperty(Oa, "__esModule", { value: !0 });
const Qm = Ra, Zm = Ia, xm = Ta, ep = Aa, tp = ka, rp = Ca, np = Da, sp = Ma, ap = La, op = Fa, ip = [
  // number
  Qm.default,
  Zm.default,
  // string
  xm.default,
  ep.default,
  // object
  tp.default,
  rp.default,
  // array
  np.default,
  sp.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  ap.default,
  op.default
];
Oa.default = ip;
var Va = {}, Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.validateAdditionalItems = void 0;
const Wt = te, Ds = M, cp = {
  message: ({ params: { len: e } }) => (0, Wt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Wt._)`{limit: ${e}}`
}, lp = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: cp,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ds.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    jl(e, n);
  }
};
function jl(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Wt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Wt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ds.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Wt._)`${u} <= ${t.length}`);
    r.if((0, Wt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Ds.Type.Num }, d), i.allErrors || r.if((0, Wt.not)(d), () => r.break());
    });
  }
}
Er.validateAdditionalItems = jl;
Er.default = lp;
var za = {}, Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.validateTuple = void 0;
const yi = te, Rn = M, up = x, dp = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Al(e, "additionalItems", t);
    r.items = !0, !(0, Rn.alwaysValidSchema)(r, t) && e.ok((0, up.validateArray)(e));
  }
};
function Al(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = Rn.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, yi._)`${a}.length`);
  r.forEach((h, P) => {
    (0, Rn.alwaysValidSchema)(u, h) || (n.if((0, yi._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function l(h) {
    const { opts: P, errSchemaPath: _ } = u, E = r.length, g = E === h.minItems && (E === h.maxItems || h[t] === !1);
    if (P.strictTuples && !g) {
      const y = `"${i}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, Rn.checkStrictMode)(u, y, P.strictTuples);
    }
  }
}
Sr.validateTuple = Al;
Sr.default = dp;
Object.defineProperty(za, "__esModule", { value: !0 });
const fp = Sr, hp = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, fp.validateTuple)(e, "items")
};
za.default = hp;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const _i = te, mp = M, pp = x, $p = Er, yp = {
  message: ({ params: { len: e } }) => (0, _i.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, _i._)`{limit: ${e}}`
}, _p = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: yp,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, mp.alwaysValidSchema)(n, t) && (s ? (0, $p.validateAdditionalItems)(e, s) : e.ok((0, pp.validateArray)(e)));
  }
};
Ua.default = _p;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const qe = te, un = M, gp = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, qe.str)`must contain at least ${e} valid item(s)` : (0, qe.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, qe._)`{minContains: ${e}}` : (0, qe._)`{minContains: ${e}, maxContains: ${t}}`
}, vp = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: gp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, qe._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, un.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, un.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, un.alwaysValidSchema)(a, r)) {
      let g = (0, qe._)`${l} >= ${i}`;
      u !== void 0 && (g = (0, qe._)`${g} && ${l} <= ${u}`), e.pass(g);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    u === void 0 && i === 1 ? _(h, () => t.if(h, () => t.break())) : i === 0 ? (t.let(h, !0), u !== void 0 && t.if((0, qe._)`${s}.length > 0`, P)) : (t.let(h, !1), P()), e.result(h, () => e.reset());
    function P() {
      const g = t.name("_valid"), y = t.let("count", 0);
      _(g, () => t.if(g, () => E(y)));
    }
    function _(g, y) {
      t.forRange("i", 0, l, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: un.Type.Num,
          compositeRule: !0
        }, g), y();
      });
    }
    function E(g) {
      t.code((0, qe._)`${g}++`), u === void 0 ? t.if((0, qe._)`${g} >= ${i}`, () => t.assign(h, !0).break()) : (t.if((0, qe._)`${g} > ${u}`, () => t.assign(h, !1).break()), i === 1 ? t.assign(h, !0) : t.if((0, qe._)`${g} >= ${i}`, () => t.assign(h, !0)));
    }
  }
};
qa.default = vp;
var kl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = te, r = M, n = x;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: l } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: l, missingProperty: h } }) => (0, t._)`{property: ${c},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${l}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, l] = a(c);
      i(c, d), u(c, l);
    }
  };
  function a({ schema: c }) {
    const d = {}, l = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const P = Array.isArray(c[h]) ? d : l;
      P[h] = c[h];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: h, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = l.let("missing");
    for (const E in d) {
      const g = d[E];
      if (g.length === 0)
        continue;
      const y = (0, n.propertyInData)(l, h, E, P.opts.ownProperties);
      c.setParams({
        property: E,
        depsCount: g.length,
        deps: g.join(", ")
      }), P.allErrors ? l.if(y, () => {
        for (const m of g)
          (0, n.checkReportMissingProp)(c, m);
      }) : (l.if((0, t._)`${y} && (${(0, n.checkMissingProp)(c, g, _)})`), (0, n.reportMissingProp)(c, _), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function u(c, d = c.schema) {
    const { gen: l, data: h, keyword: P, it: _ } = c, E = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, h, g, _.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: P, schemaProp: g }, E);
          c.mergeValidEvaluated(y, E);
        },
        () => l.var(E, !0)
        // TODO var
      ), c.ok(E));
  }
  e.validateSchemaDeps = u, e.default = s;
})(kl);
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
const Cl = te, wp = M, Ep = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Cl._)`{propertyName: ${e.propertyName}}`
}, Sp = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Ep,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, wp.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Cl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Ka.default = Sp;
var Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
const dn = x, Xe = te, bp = ut, fn = M, Pp = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Xe._)`{additionalProperty: ${e.additionalProperty}}`
}, Np = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Pp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, fn.alwaysValidSchema)(i, r))
      return;
    const d = (0, dn.allSchemaProperties)(n.properties), l = (0, dn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Xe._)`${a} === ${bp.default.errors}`);
    function h() {
      t.forIn("key", s, (y) => {
        !d.length && !l.length ? E(y) : t.if(P(y), () => E(y));
      });
    }
    function P(y) {
      let m;
      if (d.length > 8) {
        const w = (0, fn.schemaRefOrVal)(i, n.properties, "properties");
        m = (0, dn.isOwnProperty)(t, w, y);
      } else d.length ? m = (0, Xe.or)(...d.map((w) => (0, Xe._)`${y} === ${w}`)) : m = Xe.nil;
      return l.length && (m = (0, Xe.or)(m, ...l.map((w) => (0, Xe._)`${(0, dn.usePattern)(e, w)}.test(${y})`))), (0, Xe.not)(m);
    }
    function _(y) {
      t.code((0, Xe._)`delete ${s}[${y}]`);
    }
    function E(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, fn.alwaysValidSchema)(i, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? (g(y, m, !1), t.if((0, Xe.not)(m), () => {
          e.reset(), _(y);
        })) : (g(y, m), u || t.if((0, Xe.not)(m), () => t.break()));
      }
    }
    function g(y, m, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: fn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, m);
    }
  }
};
Zn.default = Np;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const Op = xe, gi = x, $s = M, vi = Zn, Rp = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && vi.default.code(new Op.KeywordCxt(a, vi.default, "additionalProperties"));
    const i = (0, gi.allSchemaProperties)(r);
    for (const h of i)
      a.definedProperties.add(h);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = $s.mergeEvaluated.props(t, (0, $s.toHash)(i), a.props));
    const u = i.filter((h) => !(0, $s.alwaysValidSchema)(a, r[h]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const h of u)
      d(h) ? l(h) : (t.if((0, gi.propertyInData)(t, s, h, a.opts.ownProperties)), l(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function l(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, c);
    }
  }
};
Ga.default = Rp;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const wi = x, hn = te, Ei = M, Si = M, Ip = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, wi.allSchemaProperties)(r), c = u.filter((g) => (0, Ei.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof hn.Name) && (a.props = (0, Si.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    P();
    function P() {
      for (const g of u)
        d && _(g), a.allErrors ? E(g) : (t.var(l, !0), E(g), t.if(l));
    }
    function _(g) {
      for (const y in d)
        new RegExp(g).test(y) && (0, Ei.checkStrictMode)(a, `property ${y} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function E(g) {
      t.forIn("key", n, (y) => {
        t.if((0, hn._)`${(0, wi.usePattern)(e, g)}.test(${y})`, () => {
          const m = c.includes(g);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: y,
            dataPropType: Si.Type.Str
          }, l), a.opts.unevaluated && h !== !0 ? t.assign((0, hn._)`${h}[${y}]`, !0) : !m && !a.allErrors && t.if((0, hn.not)(l), () => t.break());
        });
      });
    }
  }
};
Ha.default = Ip;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
const Tp = M, jp = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Tp.alwaysValidSchema)(n, r)) {
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
Ba.default = jp;
var Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const Ap = x, kp = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Ap.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Wa.default = kp;
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
const In = te, Cp = M, Dp = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, In._)`{passingSchemas: ${e.passing}}`
}, Mp = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Dp,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), u = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: u }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((l, h) => {
        let P;
        (0, Cp.alwaysValidSchema)(s, l) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, In._)`${c} && ${i}`).assign(i, !1).assign(u, (0, In._)`[${u}, ${h}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, h), P && e.mergeEvaluated(P, In.Name);
        });
      });
    }
  }
};
Ja.default = Mp;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
const Lp = M, Fp = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, Lp.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
Xa.default = Fp;
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
const Vn = te, Dl = M, Vp = {
  message: ({ params: e }) => (0, Vn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Vn._)`{failingKeyword: ${e.ifClause}}`
}, zp = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Vp,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Dl.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = bi(n, "then"), a = bi(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Vn.not)(u), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, u);
      e.mergeEvaluated(l);
    }
    function d(l, h) {
      return () => {
        const P = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(P, i), h ? t.assign(h, (0, Vn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function bi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Dl.alwaysValidSchema)(e, r);
}
Ya.default = zp;
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const Up = M, qp = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Up.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Qa.default = qp;
Object.defineProperty(Va, "__esModule", { value: !0 });
const Kp = Er, Gp = za, Hp = Sr, Bp = Ua, Wp = qa, Jp = kl, Xp = Ka, Yp = Zn, Qp = Ga, Zp = Ha, xp = Ba, e$ = Wa, t$ = Ja, r$ = Xa, n$ = Ya, s$ = Qa;
function a$(e = !1) {
  const t = [
    // any
    xp.default,
    e$.default,
    t$.default,
    r$.default,
    n$.default,
    s$.default,
    // object
    Xp.default,
    Yp.default,
    Jp.default,
    Qp.default,
    Zp.default
  ];
  return e ? t.push(Gp.default, Bp.default) : t.push(Kp.default, Hp.default), t.push(Wp.default), t;
}
Va.default = a$;
var Za = {}, xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const $e = te, o$ = {
  message: ({ schemaCode: e }) => (0, $e.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, $e._)`{format: ${e}}`
}, i$ = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: o$,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: h } = u;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const E = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, $e._)`${E}[${i}]`), y = r.let("fType"), m = r.let("format");
      r.if((0, $e._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(y, (0, $e._)`${g}.type || "string"`).assign(m, (0, $e._)`${g}.validate`), () => r.assign(y, (0, $e._)`"string"`).assign(m, g)), e.fail$data((0, $e.or)(w(), N()));
      function w() {
        return c.strictSchema === !1 ? $e.nil : (0, $e._)`${i} && !${m}`;
      }
      function N() {
        const R = l.$async ? (0, $e._)`(${g}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, $e._)`${m}(${n})`, T = (0, $e._)`(typeof ${m} == "function" ? ${R} : ${m}.test(${n}))`;
        return (0, $e._)`${m} && ${m} !== true && ${y} === ${t} && !${T}`;
      }
    }
    function _() {
      const E = h.formats[a];
      if (!E) {
        w();
        return;
      }
      if (E === !0)
        return;
      const [g, y, m] = N(E);
      g === t && e.pass(R());
      function w() {
        if (c.strictSchema === !1) {
          h.logger.warn(T());
          return;
        }
        throw new Error(T());
        function T() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(T) {
        const U = T instanceof RegExp ? (0, $e.regexpCode)(T) : c.code.formats ? (0, $e._)`${c.code.formats}${(0, $e.getProperty)(a)}` : void 0, B = r.scopeValue("formats", { key: a, ref: T, code: U });
        return typeof T == "object" && !(T instanceof RegExp) ? [T.type || "string", T.validate, (0, $e._)`${B}.validate`] : ["string", T, B];
      }
      function R() {
        if (typeof E == "object" && !(E instanceof RegExp) && E.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, $e._)`await ${m}(${n})`;
        }
        return typeof y == "function" ? (0, $e._)`${m}(${n})` : (0, $e._)`${m}.test(${n})`;
      }
    }
  }
};
xa.default = i$;
Object.defineProperty(Za, "__esModule", { value: !0 });
const c$ = xa, l$ = [c$.default];
Za.default = l$;
var _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.contentVocabulary = _r.metadataVocabulary = void 0;
_r.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
_r.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(ba, "__esModule", { value: !0 });
const u$ = Pa, d$ = Oa, f$ = Va, h$ = Za, Pi = _r, m$ = [
  u$.default,
  d$.default,
  (0, f$.default)(),
  h$.default,
  Pi.metadataVocabulary,
  Pi.contentVocabulary
];
ba.default = m$;
var eo = {}, xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
xn.DiscrError = void 0;
var Ni;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Ni || (xn.DiscrError = Ni = {}));
Object.defineProperty(eo, "__esModule", { value: !0 });
const ir = te, Ms = xn, Oi = Le, p$ = wr, $$ = M, y$ = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Ms.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, ir._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, _$ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: y$,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const u = n.propertyName;
    if (typeof u != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, ir._)`${r}${(0, ir.getProperty)(u)}`);
    t.if((0, ir._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: Ms.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = P();
      t.if(!1);
      for (const E in _)
        t.elseIf((0, ir._)`${d} === ${E}`), t.assign(c, h(_[E]));
      t.else(), e.error(!1, { discrError: Ms.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function h(_) {
      const E = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, E);
      return e.mergeEvaluated(g, ir.Name), E;
    }
    function P() {
      var _;
      const E = {}, g = m(s);
      let y = !0;
      for (let R = 0; R < i.length; R++) {
        let T = i[R];
        if (T != null && T.$ref && !(0, $$.schemaHasRulesButRef)(T, a.self.RULES)) {
          const B = T.$ref;
          if (T = Oi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, B), T instanceof Oi.SchemaEnv && (T = T.schema), T === void 0)
            throw new p$.default(a.opts.uriResolver, a.baseId, B);
        }
        const U = (_ = T == null ? void 0 : T.properties) === null || _ === void 0 ? void 0 : _[u];
        if (typeof U != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        y = y && (g || m(T)), w(U, R);
      }
      if (!y)
        throw new Error(`discriminator: "${u}" must be required`);
      return E;
      function m({ required: R }) {
        return Array.isArray(R) && R.includes(u);
      }
      function w(R, T) {
        if (R.const)
          N(R.const, T);
        else if (R.enum)
          for (const U of R.enum)
            N(U, T);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(R, T) {
        if (typeof R != "string" || R in E)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        E[R] = T;
      }
    }
  }
};
eo.default = _$;
const g$ = "http://json-schema.org/draft-07/schema#", v$ = "http://json-schema.org/draft-07/schema#", w$ = "Core schema meta-schema", E$ = {
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
}, S$ = [
  "object",
  "boolean"
], b$ = {
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
}, P$ = {
  $schema: g$,
  $id: v$,
  title: w$,
  definitions: E$,
  type: S$,
  properties: b$,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = zc, n = ba, s = eo, a = P$, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(E, u, !1), this.refs["http://json-schema.org/schema"] = u;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = xe;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var l = te;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var h = Zr;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var P = wr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Is, Is.exports);
var N$ = Is.exports, Ls = { exports: {} }, Ml = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(V, H) {
    return { validate: V, compare: H };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, i),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c, d),
    "date-time": t(h, P),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: g,
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
    int64: { type: "number", validate: T },
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
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
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
  function i(V, H) {
    if (V && H)
      return V > H ? 1 : V < H ? -1 : 0;
  }
  const u = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(V, H) {
    const se = u.exec(V);
    if (!se)
      return !1;
    const Q = +se[1], fe = +se[2], C = +se[3], k = se[5];
    return (Q <= 23 && fe <= 59 && C <= 59 || Q === 23 && fe === 59 && C === 60) && (!H || k !== "");
  }
  function d(V, H) {
    if (!(V && H))
      return;
    const se = u.exec(V), Q = u.exec(H);
    if (se && Q)
      return V = se[1] + se[2] + se[3] + (se[4] || ""), H = Q[1] + Q[2] + Q[3] + (Q[4] || ""), V > H ? 1 : V < H ? -1 : 0;
  }
  const l = /t|\s/i;
  function h(V) {
    const H = V.split(l);
    return H.length === 2 && a(H[0]) && c(H[1], !0);
  }
  function P(V, H) {
    if (!(V && H))
      return;
    const [se, Q] = V.split(l), [fe, C] = H.split(l), k = i(se, fe);
    if (k !== void 0)
      return k || d(Q, C);
  }
  const _ = /\/|:/, E = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(V) {
    return _.test(V) && E.test(V);
  }
  const y = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function m(V) {
    return y.lastIndex = 0, y.test(V);
  }
  const w = -2147483648, N = 2 ** 31 - 1;
  function R(V) {
    return Number.isInteger(V) && V <= N && V >= w;
  }
  function T(V) {
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
})(Ml);
var Ll = {}, Fs = { exports: {} }, Fl = {}, et = {}, gr = {}, en = {}, Z = {}, Yr = {};
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
      u(N, w[R]), N.push(m[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(m, ...w) {
    const N = [_(m[0])];
    let R = 0;
    for (; R < w.length; )
      N.push(a), u(N, w[R]), N.push(a, _(m[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function u(m, w) {
    w instanceof n ? m.push(...w._items) : w instanceof r ? m.push(w) : m.push(h(w));
  }
  e.addCodeArg = u;
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
  function l(m, w) {
    return w.emptyStr() ? m : m.emptyStr() ? w : i`${m}${w}`;
  }
  e.strConcat = l;
  function h(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : _(Array.isArray(m) ? m.join(",") : m);
  }
  function P(m) {
    return new n(_(m));
  }
  e.stringify = P;
  function _(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function E(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  e.getProperty = E;
  function g(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function y(m) {
    return new n(m.toString());
  }
  e.regexpCode = y;
})(Yr);
var Vs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Yr;
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
    constructor({ prefixes: d, parent: l } = {}) {
      this._names = {}, this._prefixes = d, this._parent = l;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const l = this._names[d] || this._nameGroup(d);
      return `${d}${l.index++}`;
    }
    _nameGroup(d) {
      var l, h;
      if (!((h = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, l) {
      super(l), this.prefix = d;
    }
    setValue(d, { property: l, itemIndex: h }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(l)}[${h}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class u extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, l) {
      var h;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const P = this.toName(d), { prefix: _ } = P, E = (h = l.key) !== null && h !== void 0 ? h : l.ref;
      let g = this._values[_];
      if (g) {
        const w = g.get(E);
        if (w)
          return w;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(E, P);
      const y = this._scope[_] || (this._scope[_] = []), m = y.length;
      return y[m] = l.ref, P.setValue(l, { property: _, itemIndex: m }), P;
    }
    getValue(d, l) {
      const h = this._values[d];
      if (h)
        return h.get(l);
    }
    scopeRefs(d, l = this._values) {
      return this._reduceValues(l, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${d}${h.scopePath}`;
      });
    }
    scopeCode(d = this._values, l, h) {
      return this._reduceValues(d, (P) => {
        if (P.value === void 0)
          throw new Error(`CodeGen: name "${P}" has no value`);
        return P.value.code;
      }, l, h);
    }
    _reduceValues(d, l, h = {}, P) {
      let _ = t.nil;
      for (const E in d) {
        const g = d[E];
        if (!g)
          continue;
        const y = h[E] = h[E] || /* @__PURE__ */ new Map();
        g.forEach((m) => {
          if (y.has(m))
            return;
          y.set(m, n.Started);
          let w = l(m);
          if (w) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${N} ${m} = ${w};${this.opts._n}`;
          } else if (w = P == null ? void 0 : P(m))
            _ = (0, t._)`${_}${w}${this.opts._n}`;
          else
            throw new r(m);
          y.set(m, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = u;
})(Vs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Yr, r = Vs;
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
  var s = Vs;
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
    optimizeNames(o, f) {
      return this;
    }
  }
  class i extends a {
    constructor(o, f, b) {
      super(), this.varKind = o, this.name = f, this.rhs = b;
    }
    render({ es5: o, _n: f }) {
      const b = o ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${j};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class u extends a {
    constructor(o, f, b) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = b;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return fe(o, this.rhs);
    }
  }
  class c extends u {
    constructor(o, f, b, j) {
      super(o, b, j), this.op = f;
    }
    render({ _n: o }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + o;
    }
  }
  class d extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `${this.label}:` + o;
    }
  }
  class l extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `break${this.label ? ` ${this.label}` : ""};` + o;
    }
  }
  class h extends a {
    constructor(o) {
      super(), this.error = o;
    }
    render({ _n: o }) {
      return `throw ${this.error};` + o;
    }
    get names() {
      return this.error.names;
    }
  }
  class P extends a {
    constructor(o) {
      super(), this.code = o;
    }
    render({ _n: o }) {
      return `${this.code};` + o;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(o, f) {
      return this.code = C(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends a {
    constructor(o = []) {
      super(), this.nodes = o;
    }
    render(o) {
      return this.nodes.reduce((f, b) => f + b.render(o), "");
    }
    optimizeNodes() {
      const { nodes: o } = this;
      let f = o.length;
      for (; f--; ) {
        const b = o[f].optimizeNodes();
        Array.isArray(b) ? o.splice(f, 1, ...b) : b ? o[f] = b : o.splice(f, 1);
      }
      return o.length > 0 ? this : void 0;
    }
    optimizeNames(o, f) {
      const { nodes: b } = this;
      let j = b.length;
      for (; j--; ) {
        const A = b[j];
        A.optimizeNames(o, f) || (k(o, A.names), b.splice(j, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Q(o, f.names), {});
    }
  }
  class E extends _ {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends _ {
  }
  class y extends E {
  }
  y.kind = "else";
  class m extends E {
    constructor(o, f) {
      super(f), this.condition = o;
    }
    render(o) {
      let f = `if(${this.condition})` + super.render(o);
      return this.else && (f += "else " + this.else.render(o)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const o = this.condition;
      if (o === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const b = f.optimizeNodes();
        f = this.else = Array.isArray(b) ? new y(b) : b;
      }
      if (f)
        return o === !1 ? f instanceof m ? f : f.nodes : this.nodes.length ? this : new m(z(o), f instanceof m ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = C(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return fe(o, this.condition), this.else && Q(o, this.else.names), o;
    }
  }
  m.kind = "if";
  class w extends E {
  }
  w.kind = "for";
  class N extends w {
    constructor(o) {
      super(), this.iteration = o;
    }
    render(o) {
      return `for(${this.iteration})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iteration = C(this.iteration, o, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends w {
    constructor(o, f, b, j) {
      super(), this.varKind = o, this.name = f, this.from = b, this.to = j;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: b, from: j, to: A } = this;
      return `for(${f} ${b}=${j}; ${b}<${A}; ${b}++)` + super.render(o);
    }
    get names() {
      const o = fe(super.names, this.from);
      return fe(o, this.to);
    }
  }
  class T extends w {
    constructor(o, f, b, j) {
      super(), this.loop = o, this.varKind = f, this.name = b, this.iterable = j;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = C(this.iterable, o, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class U extends E {
    constructor(o, f, b) {
      super(), this.name = o, this.args = f, this.async = b;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  U.kind = "func";
  class B extends _ {
    render(o) {
      return "return " + super.render(o);
    }
  }
  B.kind = "return";
  class de extends E {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var b, j;
      return super.optimizeNames(o, f), (b = this.catch) === null || b === void 0 || b.optimizeNames(o, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Q(o, this.catch.names), this.finally && Q(o, this.finally.names), o;
    }
  }
  class V extends E {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  V.kind = "catch";
  class H extends E {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  H.kind = "finally";
  class se {
    constructor(o, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = o, this._scope = new r.Scope({ parent: o }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(o) {
      return this._scope.name(o);
    }
    // reserves unique name in the external scope
    scopeName(o) {
      return this._extScope.name(o);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(o, f) {
      const b = this._extScope.value(o, f);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(o, f) {
      return this._extScope.getValue(o, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(o) {
      return this._extScope.scopeRefs(o, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(o, f, b, j) {
      const A = this._scope.toName(f);
      return b !== void 0 && j && (this._constants[A.str] = b), this._leafNode(new i(o, A, b)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(o, f, b) {
      return this._def(r.varKinds.const, o, f, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(o, f, b) {
      return this._def(r.varKinds.let, o, f, b);
    }
    // `var` declaration with optional assignment
    var(o, f, b) {
      return this._def(r.varKinds.var, o, f, b);
    }
    // assignment code
    assign(o, f, b) {
      return this._leafNode(new u(o, f, b));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new c(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new P(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [b, j] of o)
        f.length > 1 && f.push(","), f.push(b), (b !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(o, f, b) {
      if (this._blockNode(new m(o)), f && b)
        this.code(f).else().code(b).endIf();
      else if (f)
        this.code(f).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(o) {
      return this._elseNode(new m(o));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, y);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, b, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(o);
      return this._for(new R(A, q, f, b), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, b, j = r.varKinds.const) {
      const A = this._scope.toName(o);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), b(A);
        });
      }
      return this._for(new T("of", j, A, f), () => b(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, b, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, b);
      const A = this._scope.toName(o);
      return this._for(new T("in", j, A, f), () => b(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(o) {
      return this._leafNode(new d(o));
    }
    // `break` statement
    break(o) {
      return this._leafNode(new l(o));
    }
    // `return` statement
    return(o) {
      const f = new B();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(B);
    }
    // `try` statement
    try(o, f, b) {
      if (!f && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new de();
      if (this._blockNode(j), this.code(o), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return b && (this._currNode = j.finally = new H(), this.code(b)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(o) {
      return this._leafNode(new h(o));
    }
    // start self-balancing block
    block(o, f) {
      return this._blockStarts.push(this._nodes.length), o && this.code(o).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(o) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - f;
      if (b < 0 || o !== void 0 && b !== o)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${o} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(o, f = t.nil, b, j) {
      return this._blockNode(new U(o, f, b)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(U);
    }
    optimize(o = 1) {
      for (; o-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(o) {
      return this._currNode.nodes.push(o), this;
    }
    _blockNode(o) {
      this._currNode.nodes.push(o), this._nodes.push(o);
    }
    _endBlockNode(o, f) {
      const b = this._currNode;
      if (b instanceof o || f && b instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${o.kind}/${f.kind}` : o.kind}"`);
    }
    _elseNode(o) {
      const f = this._currNode;
      if (!(f instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = o, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const o = this._nodes;
      return o[o.length - 1];
    }
    set _currNode(o) {
      const f = this._nodes;
      f[f.length - 1] = o;
    }
  }
  e.CodeGen = se;
  function Q($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) + (o[f] || 0);
    return $;
  }
  function fe($, o) {
    return o instanceof t._CodeOrName ? Q($, o.names) : $;
  }
  function C($, o, f) {
    if ($ instanceof t.Name)
      return b($);
    if (!j($))
      return $;
    return new t._Code($._items.reduce((A, q) => (q instanceof t.Name && (q = b(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function b(A) {
      const q = f[A.str];
      return q === void 0 || o[A.str] !== 1 ? A : (delete o[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && o[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) - (o[f] || 0);
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
  const I = p(e.operators.OR);
  function v(...$) {
    return $.reduce(I);
  }
  e.or = v;
  function p($) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${S(o)} ${$} ${S(f)}`;
  }
  function S($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(Z);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const le = Z, O$ = Yr;
function R$(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = R$;
function I$(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Vl(e, t), !zl(t, e.self.RULES.all));
}
L.alwaysValidSchema = I$;
function Vl(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Kl(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = Vl;
function zl(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = zl;
function T$(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = T$;
function j$({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, le._)`${r}`;
  }
  return (0, le._)`${e}${t}${(0, le.getProperty)(n)}`;
}
L.schemaRefOrVal = j$;
function A$(e) {
  return Ul(decodeURIComponent(e));
}
L.unescapeFragment = A$;
function k$(e) {
  return encodeURIComponent(to(e));
}
L.escapeFragment = k$;
function to(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = to;
function Ul(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = Ul;
function C$(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = C$;
function Ri({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof le.Name ? (a instanceof le.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof le.Name ? (t(s, i, a), a) : r(a, i);
    return u === le.Name && !(c instanceof le.Name) ? n(s, c) : c;
  };
}
L.mergeEvaluated = {
  props: Ri({
    mergeNames: (e, t, r) => e.if((0, le._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, le._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, le._)`${r} || {}`).code((0, le._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, le._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, le._)`${r} || {}`), ro(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: ql
  }),
  items: Ri({
    mergeNames: (e, t, r) => e.if((0, le._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, le._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, le._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, le._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function ql(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, le._)`{}`);
  return t !== void 0 && ro(e, r, t), r;
}
L.evaluatedPropsToName = ql;
function ro(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, le._)`${t}${(0, le.getProperty)(n)}`, !0));
}
L.setEvaluated = ro;
const Ii = {};
function D$(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Ii[t.code] || (Ii[t.code] = new O$._Code(t.code))
  });
}
L.useFunc = D$;
var zs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(zs || (L.Type = zs = {}));
function M$(e, t, r) {
  if (e instanceof le.Name) {
    const n = t === zs.Num;
    return r ? n ? (0, le._)`"[" + ${e} + "]"` : (0, le._)`"['" + ${e} + "']"` : n ? (0, le._)`"/" + ${e}` : (0, le._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, le.getProperty)(e).toString() : "/" + to(e);
}
L.getErrorPath = M$;
function Kl(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = Kl;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
const Oe = Z, L$ = {
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
dt.default = L$;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Z, r = L, n = dt;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: m }) => m ? (0, t.str)`"${y}" keyword must be ${m} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function s(y, m = e.keywordError, w, N) {
    const { it: R } = y, { gen: T, compositeRule: U, allErrors: B } = R, de = h(y, m, w);
    N ?? (U || B) ? c(T, de) : d(R, (0, t._)`[${de}]`);
  }
  e.reportError = s;
  function a(y, m = e.keywordError, w) {
    const { it: N } = y, { gen: R, compositeRule: T, allErrors: U } = N, B = h(y, m, w);
    c(R, B), T || U || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(y, m) {
    y.assign(n.default.errors, m), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(m, () => y.assign((0, t._)`${n.default.vErrors}.length`, m), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: y, keyword: m, schemaValue: w, data: N, errsCount: R, it: T }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const U = y.name("err");
    y.forRange("i", R, n.default.errors, (B) => {
      y.const(U, (0, t._)`${n.default.vErrors}[${B}]`), y.if((0, t._)`${U}.instancePath === undefined`, () => y.assign((0, t._)`${U}.instancePath`, (0, t.strConcat)(n.default.instancePath, T.errorPath))), y.assign((0, t._)`${U}.schemaPath`, (0, t.str)`${T.errSchemaPath}/${m}`), T.opts.verbose && (y.assign((0, t._)`${U}.schema`, w), y.assign((0, t._)`${U}.data`, N));
    });
  }
  e.extendErrors = u;
  function c(y, m) {
    const w = y.const("err", m);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function d(y, m) {
    const { gen: w, validateName: N, schemaEnv: R } = y;
    R.$async ? w.throw((0, t._)`new ${y.ValidationError}(${m})`) : (w.assign((0, t._)`${N}.errors`, m), w.return(!1));
  }
  const l = {
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
    const { gen: N, it: R } = y, T = [
      _(R, w),
      E(y, w)
    ];
    return g(y, m, T), N.object(...T);
  }
  function _({ errorPath: y }, { instancePath: m }) {
    const w = m ? (0, t.str)`${y}${(0, r.getErrorPath)(m, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function E({ keyword: y, it: { errSchemaPath: m } }, { schemaPath: w, parentSchema: N }) {
    let R = N ? m : (0, t.str)`${m}/${y}`;
    return w && (R = (0, t.str)`${R}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g(y, { params: m, message: w }, N) {
    const { keyword: R, data: T, schemaValue: U, it: B } = y, { opts: de, propertyName: V, topSchemaRef: H, schemaPath: se } = B;
    N.push([l.keyword, R], [l.params, typeof m == "function" ? m(y) : m || (0, t._)`{}`]), de.messages && N.push([l.message, typeof w == "function" ? w(y) : w]), de.verbose && N.push([l.schema, U], [l.parentSchema, (0, t._)`${H}${se}`], [n.default.data, T]), V && N.push([l.propertyName, V]);
  }
})(en);
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.boolOrEmptySchema = gr.topBoolOrEmptySchema = void 0;
const F$ = en, V$ = Z, z$ = dt, U$ = {
  message: "boolean schema is false"
};
function q$(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Gl(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(z$.default.data) : (t.assign((0, V$._)`${n}.errors`, null), t.return(!0));
}
gr.topBoolOrEmptySchema = q$;
function K$(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Gl(e)) : r.var(t, !0);
}
gr.boolOrEmptySchema = K$;
function Gl(e, t) {
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
  (0, F$.reportError)(s, U$, void 0, t);
}
var ge = {}, xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.getRules = xt.isJSONType = void 0;
const G$ = ["string", "number", "integer", "boolean", "null", "object", "array"], H$ = new Set(G$);
function B$(e) {
  return typeof e == "string" && H$.has(e);
}
xt.isJSONType = B$;
function W$() {
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
xt.getRules = W$;
var mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.shouldUseRule = mt.shouldUseGroup = mt.schemaHasRulesForType = void 0;
function J$({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Hl(e, n);
}
mt.schemaHasRulesForType = J$;
function Hl(e, t) {
  return t.rules.some((r) => Bl(e, r));
}
mt.shouldUseGroup = Hl;
function Bl(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
mt.shouldUseRule = Bl;
Object.defineProperty(ge, "__esModule", { value: !0 });
ge.reportTypeError = ge.checkDataTypes = ge.checkDataType = ge.coerceAndCheckDataType = ge.getJSONTypes = ge.getSchemaTypes = ge.DataType = void 0;
const X$ = xt, Y$ = mt, Q$ = en, Y = Z, Wl = L;
var fr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(fr || (ge.DataType = fr = {}));
function Z$(e) {
  const t = Jl(e.type);
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
ge.getSchemaTypes = Z$;
function Jl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(X$.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ge.getJSONTypes = Jl;
function x$(e, t) {
  const { gen: r, data: n, opts: s } = e, a = ey(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, Y$.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = no(t, n, s.strictNumbers, fr.Wrong);
    r.if(u, () => {
      a.length ? ty(e, t, a) : so(e);
    });
  }
  return i;
}
ge.coerceAndCheckDataType = x$;
const Xl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function ey(e, t) {
  return t ? e.filter((r) => Xl.has(r) || t === "array" && r === "array") : [];
}
function ty(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, Y._)`typeof ${s}`), u = n.let("coerced", (0, Y._)`undefined`);
  a.coerceTypes === "array" && n.if((0, Y._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Y._)`${s}[0]`).assign(i, (0, Y._)`typeof ${s}`).if(no(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, Y._)`${u} !== undefined`);
  for (const d of r)
    (Xl.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), so(e), n.endIf(), n.if((0, Y._)`${u} !== undefined`, () => {
    n.assign(s, u), ry(e, u);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, Y._)`${i} == "number" || ${i} == "boolean"`).assign(u, (0, Y._)`"" + ${s}`).elseIf((0, Y._)`${s} === null`).assign(u, (0, Y._)`""`);
        return;
      case "number":
        n.elseIf((0, Y._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(u, (0, Y._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, Y._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(u, (0, Y._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, Y._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(u, !1).elseIf((0, Y._)`${s} === "true" || ${s} === 1`).assign(u, !0);
        return;
      case "null":
        n.elseIf((0, Y._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(u, null);
        return;
      case "array":
        n.elseIf((0, Y._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(u, (0, Y._)`[${s}]`);
    }
  }
}
function ry({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Y._)`${t} !== undefined`, () => e.assign((0, Y._)`${t}[${r}]`, n));
}
function Us(e, t, r, n = fr.Correct) {
  const s = n === fr.Correct ? Y.operators.EQ : Y.operators.NEQ;
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
      a = i((0, Y._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, Y._)`typeof ${t} ${s} ${e}`;
  }
  return n === fr.Correct ? a : (0, Y.not)(a);
  function i(u = Y.nil) {
    return (0, Y.and)((0, Y._)`typeof ${t} == "number"`, u, r ? (0, Y._)`isFinite(${t})` : Y.nil);
  }
}
ge.checkDataType = Us;
function no(e, t, r, n) {
  if (e.length === 1)
    return Us(e[0], t, r, n);
  let s;
  const a = (0, Wl.toHash)(e);
  if (a.array && a.object) {
    const i = (0, Y._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, Y._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = Y.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, Y.and)(s, Us(i, t, r, n));
  return s;
}
ge.checkDataTypes = no;
const ny = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Y._)`{type: ${e}}` : (0, Y._)`{type: ${t}}`
};
function so(e) {
  const t = sy(e);
  (0, Q$.reportError)(t, ny);
}
ge.reportTypeError = so;
function sy(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Wl.schemaRefOrVal)(e, n, "type");
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
var es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
es.assignDefaults = void 0;
const sr = Z, ay = L;
function oy(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Ti(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Ti(e, a, s.default));
}
es.assignDefaults = oy;
function Ti(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, sr._)`${a}${(0, sr.getProperty)(t)}`;
  if (s) {
    (0, ay.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, sr._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, sr._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, sr._)`${u} = ${(0, sr.stringify)(r)}`);
}
var lt = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.validateUnion = ee.validateArray = ee.usePattern = ee.callValidateCode = ee.schemaProperties = ee.allSchemaProperties = ee.noPropertyInData = ee.propertyInData = ee.isOwnProperty = ee.hasPropFunc = ee.reportMissingProp = ee.checkMissingProp = ee.checkReportMissingProp = void 0;
const me = Z, ao = L, gt = dt, iy = L;
function cy(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(io(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, me._)`${t}` }, !0), e.error();
  });
}
ee.checkReportMissingProp = cy;
function ly({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, me.or)(...n.map((a) => (0, me.and)(io(e, t, a, r.ownProperties), (0, me._)`${s} = ${a}`)));
}
ee.checkMissingProp = ly;
function uy(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ee.reportMissingProp = uy;
function Yl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, me._)`Object.prototype.hasOwnProperty`
  });
}
ee.hasPropFunc = Yl;
function oo(e, t, r) {
  return (0, me._)`${Yl(e)}.call(${t}, ${r})`;
}
ee.isOwnProperty = oo;
function dy(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} !== undefined`;
  return n ? (0, me._)`${s} && ${oo(e, t, r)}` : s;
}
ee.propertyInData = dy;
function io(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} === undefined`;
  return n ? (0, me.or)(s, (0, me.not)(oo(e, t, r))) : s;
}
ee.noPropertyInData = io;
function Ql(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ee.allSchemaProperties = Ql;
function fy(e, t) {
  return Ql(t).filter((r) => !(0, ao.alwaysValidSchema)(e, t[r]));
}
ee.schemaProperties = fy;
function hy({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, me._)`${e}, ${t}, ${n}${s}` : t, h = [
    [gt.default.instancePath, (0, me.strConcat)(gt.default.instancePath, a)],
    [gt.default.parentData, i.parentData],
    [gt.default.parentDataProperty, i.parentDataProperty],
    [gt.default.rootData, gt.default.rootData]
  ];
  i.opts.dynamicRef && h.push([gt.default.dynamicAnchors, gt.default.dynamicAnchors]);
  const P = (0, me._)`${l}, ${r.object(...h)}`;
  return c !== me.nil ? (0, me._)`${u}.call(${c}, ${P})` : (0, me._)`${u}(${P})`;
}
ee.callValidateCode = hy;
const my = (0, me._)`new RegExp`;
function py({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, me._)`${s.code === "new RegExp" ? my : (0, iy.useFunc)(e, s)}(${r}, ${n})`
  });
}
ee.usePattern = py;
function $y(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const u = t.let("valid", !0);
    return i(() => t.assign(u, !1)), u;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(u) {
    const c = t.const("len", (0, me._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: ao.Type.Num
      }, a), t.if((0, me.not)(a), u);
    });
  }
}
ee.validateArray = $y;
function yy(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, ao.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), u = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, u);
    t.assign(i, (0, me._)`${i} || ${u}`), e.mergeValidEvaluated(l, u) || t.if((0, me.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
ee.validateUnion = yy;
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.validateKeywordUsage = lt.validSchemaType = lt.funcKeywordCode = lt.macroKeywordCode = void 0;
const je = Z, Jt = dt, _y = ee, gy = en;
function vy(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = Zl(r, n, u);
  i.opts.validateSchema !== !1 && i.self.validateSchema(u, !0);
  const d = r.name("valid");
  e.subschema({
    schema: u,
    schemaPath: je.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
lt.macroKeywordCode = vy;
function wy(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  Sy(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = Zl(n, s, d), h = n.let("valid");
  e.block$data(h, P), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function P() {
    if (t.errors === !1)
      g(), t.modifying && ji(e), y(() => e.error());
    else {
      const m = t.async ? _() : E();
      t.modifying && ji(e), y(() => Ey(e, m));
    }
  }
  function _() {
    const m = n.let("ruleErrs", null);
    return n.try(() => g((0, je._)`await `), (w) => n.assign(h, !1).if((0, je._)`${w} instanceof ${c.ValidationError}`, () => n.assign(m, (0, je._)`${w}.errors`), () => n.throw(w))), m;
  }
  function E() {
    const m = (0, je._)`${l}.errors`;
    return n.assign(m, null), g(je.nil), m;
  }
  function g(m = t.async ? (0, je._)`await ` : je.nil) {
    const w = c.opts.passContext ? Jt.default.this : Jt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(h, (0, je._)`${m}${(0, _y.callValidateCode)(e, l, w, N)}`, t.modifying);
  }
  function y(m) {
    var w;
    n.if((0, je.not)((w = t.valid) !== null && w !== void 0 ? w : h), m);
  }
}
lt.funcKeywordCode = wy;
function ji(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, je._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Ey(e, t) {
  const { gen: r } = e;
  r.if((0, je._)`Array.isArray(${t})`, () => {
    r.assign(Jt.default.vErrors, (0, je._)`${Jt.default.vErrors} === null ? ${t} : ${Jt.default.vErrors}.concat(${t})`).assign(Jt.default.errors, (0, je._)`${Jt.default.vErrors}.length`), (0, gy.extendErrors)(e);
  }, () => e.error());
}
function Sy({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Zl(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, je.stringify)(r) });
}
function by(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
lt.validSchemaType = by;
function Py({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((u) => !Object.prototype.hasOwnProperty.call(e, u)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
lt.validateKeywordUsage = Py;
var Ot = {};
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.extendSubschemaMode = Ot.extendSubschemaData = Ot.getSubschema = void 0;
const at = Z, xl = L;
function Ny(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const u = e.schema[t];
    return r === void 0 ? {
      schema: u,
      schemaPath: (0, at._)`${e.schemaPath}${(0, at.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: u[r],
      schemaPath: (0, at._)`${e.schemaPath}${(0, at.getProperty)(t)}${(0, at.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, xl.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Ot.getSubschema = Ny;
function Oy(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: h } = t, P = u.let("data", (0, at._)`${t.data}${(0, at.getProperty)(r)}`, !0);
    c(P), e.errorPath = (0, at.str)`${d}${(0, xl.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, at._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof at.Name ? s : u.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Ot.extendSubschemaData = Oy;
function Ry(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Ot.extendSubschemaMode = Ry;
var Pe = {}, eu = { exports: {} }, Pt = eu.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Tn(t, n, s, e, "", e);
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
function Tn(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var h = n[l];
      if (Array.isArray(h)) {
        if (l in Pt.arrayKeywords)
          for (var P = 0; P < h.length; P++)
            Tn(e, t, r, h[P], s + "/" + l + "/" + P, a, s, l, n, P);
      } else if (l in Pt.propsKeywords) {
        if (h && typeof h == "object")
          for (var _ in h)
            Tn(e, t, r, h[_], s + "/" + l + "/" + Iy(_), a, s, l, n, _);
      } else (l in Pt.keywords || e.allKeys && !(l in Pt.skipKeywords)) && Tn(e, t, r, h, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function Iy(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Ty = eu.exports;
Object.defineProperty(Pe, "__esModule", { value: !0 });
Pe.getSchemaRefs = Pe.resolveUrl = Pe.normalizeId = Pe._getFullPath = Pe.getFullPath = Pe.inlineRef = void 0;
const jy = L, Ay = Jn, ky = Ty, Cy = /* @__PURE__ */ new Set([
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
function Dy(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !qs(e) : t ? tu(e) <= t : !1;
}
Pe.inlineRef = Dy;
const My = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function qs(e) {
  for (const t in e) {
    if (My.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(qs) || typeof r == "object" && qs(r))
      return !0;
  }
  return !1;
}
function tu(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Cy.has(r) && (typeof e[r] == "object" && (0, jy.eachItem)(e[r], (n) => t += tu(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function ru(e, t = "", r) {
  r !== !1 && (t = hr(t));
  const n = e.parse(t);
  return nu(e, n);
}
Pe.getFullPath = ru;
function nu(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Pe._getFullPath = nu;
const Ly = /#\/?$/;
function hr(e) {
  return e ? e.replace(Ly, "") : "";
}
Pe.normalizeId = hr;
function Fy(e, t, r) {
  return r = hr(r), e.resolve(t, r);
}
Pe.resolveUrl = Fy;
const Vy = /^[a-z_][-a-z0-9._]*$/i;
function zy(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = hr(e[r] || t), a = { "": s }, i = ru(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return ky(e, { allKeys: !0 }, (h, P, _, E) => {
    if (E === void 0)
      return;
    const g = i + P;
    let y = a[E];
    typeof h[r] == "string" && (y = m.call(this, h[r])), w.call(this, h.$anchor), w.call(this, h.$dynamicAnchor), a[P] = y;
    function m(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = hr(y ? R(y, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let T = this.refs[N];
      return typeof T == "string" && (T = this.refs[T]), typeof T == "object" ? d(h, T.schema, N) : N !== hr(g) && (N[0] === "#" ? (d(h, u[N], N), u[N] = h) : this.refs[N] = g), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!Vy.test(N))
          throw new Error(`invalid anchor "${N}"`);
        m.call(this, `#${N}`);
      }
    }
  }), u;
  function d(h, P, _) {
    if (P !== void 0 && !Ay(h, P))
      throw l(_);
  }
  function l(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Pe.getSchemaRefs = zy;
Object.defineProperty(et, "__esModule", { value: !0 });
et.getData = et.KeywordCxt = et.validateFunctionCode = void 0;
const su = gr, Ai = ge, co = mt, zn = ge, Uy = es, Kr = lt, ys = Ot, G = Z, J = dt, qy = Pe, pt = L, Ar = en;
function Ky(e) {
  if (iu(e) && (cu(e), ou(e))) {
    By(e);
    return;
  }
  au(e, () => (0, su.topBoolOrEmptySchema)(e));
}
et.validateFunctionCode = Ky;
function au({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, G._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${ki(r, s)}`), Hy(e, s), e.code(a);
  }) : e.func(t, (0, G._)`${J.default.data}, ${Gy(s)}`, n.$async, () => e.code(ki(r, s)).code(a));
}
function Gy(e) {
  return (0, G._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, G._)`, ${J.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function Hy(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, G._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, G._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, G._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, G._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, G._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, G._)`""`), e.var(J.default.parentData, (0, G._)`undefined`), e.var(J.default.parentDataProperty, (0, G._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function By(e) {
  const { schema: t, opts: r, gen: n } = e;
  au(e, () => {
    r.$comment && t.$comment && uu(e), Qy(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && Wy(e), lu(e), e_(e);
  });
}
function Wy(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function ki(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function Jy(e, t) {
  if (iu(e) && (cu(e), ou(e))) {
    Xy(e, t);
    return;
  }
  (0, su.boolOrEmptySchema)(e, t);
}
function ou({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function iu(e) {
  return typeof e.schema != "boolean";
}
function Xy(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && uu(e), Zy(e), xy(e);
  const a = n.const("_errs", J.default.errors);
  lu(e, a), n.var(t, (0, G._)`${a} === ${J.default.errors}`);
}
function cu(e) {
  (0, pt.checkUnknownRules)(e), Yy(e);
}
function lu(e, t) {
  if (e.opts.jtd)
    return Ci(e, [], !1, t);
  const r = (0, Ai.getSchemaTypes)(e.schema), n = (0, Ai.coerceAndCheckDataType)(e, r);
  Ci(e, r, !n, t);
}
function Yy(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, pt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function Qy(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, pt.checkStrictMode)(e, "default is ignored in the schema root");
}
function Zy(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, qy.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function xy(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function uu({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${J.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, G.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${J.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function e_(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, G._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, G._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, J.default.vErrors), a.unevaluated && t_(e), t.return((0, G._)`${J.default.errors} === 0`));
}
function t_({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function Ci(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, pt.schemaHasRulesButRef)(a, l))) {
    s.block(() => hu(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || r_(e, t), s.block(() => {
    for (const P of l.rules)
      h(P);
    h(l.post);
  });
  function h(P) {
    (0, co.shouldUseGroup)(a, P) && (P.type ? (s.if((0, zn.checkDataType)(P.type, i, c.strictNumbers)), Di(e, P), t.length === 1 && t[0] === P.type && r && (s.else(), (0, zn.reportTypeError)(e)), s.endIf()) : Di(e, P), u || s.if((0, G._)`${J.default.errors} === ${n || 0}`));
  }
}
function Di(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, Uy.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, co.shouldUseRule)(n, a) && hu(e, a.keyword, a.definition, t.type);
  });
}
function r_(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (n_(e, t), e.opts.allowUnionTypes || s_(e, t), a_(e, e.dataTypes));
}
function n_(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      du(e.dataTypes, r) || lo(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), i_(e, t);
  }
}
function s_(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && lo(e, "use allowUnionTypes to allow union type keyword");
}
function a_(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, co.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => o_(t, i)) && lo(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function o_(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function du(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function i_(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    du(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function lo(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, pt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class fu {
  constructor(t, r, n) {
    if ((0, Kr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, pt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", mu(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Kr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
  block$data(t, r, n = G.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = G.nil, r = G.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, G.or)((0, G._)`${s} === undefined`, r)), t !== G.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== G.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, G.or)(i(), u());
    function i() {
      if (n.length) {
        if (!(r instanceof G.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, G._)`${(0, zn.checkDataTypes)(c, r, a.opts.strictNumbers, zn.DataType.Wrong)}`;
      }
      return G.nil;
    }
    function u() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, G._)`!${c}(${r})`;
      }
      return G.nil;
    }
  }
  subschema(t, r) {
    const n = (0, ys.getSubschema)(this.it, t);
    (0, ys.extendSubschemaData)(n, this.it, t), (0, ys.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return Jy(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = pt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = pt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, G.Name)), !0;
  }
}
et.KeywordCxt = fu;
function hu(e, t, r, n) {
  const s = new fu(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Kr.funcKeywordCode)(s, r) : "macro" in r ? (0, Kr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Kr.funcKeywordCode)(s, r);
}
const c_ = /^\/(?:[^~]|~0|~1)*$/, l_ = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function mu(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!c_.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = J.default.rootData;
  } else {
    const d = l_.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +d[1];
    if (s = d[2], s === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (a = r[t - l], !s)
      return a;
  }
  let i = a;
  const u = s.split("/");
  for (const d of u)
    d && (a = (0, G._)`${a}${(0, G.getProperty)((0, pt.unescapeJsonPointer)(d))}`, i = (0, G._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
et.getData = mu;
var tn = {};
Object.defineProperty(tn, "__esModule", { value: !0 });
class u_ extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
tn.default = u_;
var br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
const _s = Pe;
class d_ extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, _s.resolveUrl)(t, r, n), this.missingSchema = (0, _s.normalizeId)((0, _s.getFullPath)(t, this.missingRef));
  }
}
br.default = d_;
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.resolveSchema = Fe.getCompilingSchema = Fe.resolveRef = Fe.compileSchema = Fe.SchemaEnv = void 0;
const Je = Z, f_ = tn, Gt = dt, Ze = Pe, Mi = L, h_ = et;
class ts {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Ze.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Fe.SchemaEnv = ts;
function uo(e) {
  const t = pu.call(this, e);
  if (t)
    return t;
  const r = (0, Ze.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Je.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: f_.default,
    code: (0, Je._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Gt.default.data,
    parentData: Gt.default.parentData,
    parentDataProperty: Gt.default.parentDataProperty,
    dataNames: [Gt.default.data],
    dataPathArr: [Je.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Je.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: u,
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
  let l;
  try {
    this._compilations.add(e), (0, h_.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const h = i.toString();
    l = `${i.scopeRefs(Gt.default.scope)}return ${h}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${Gt.default.self}`, `${Gt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: h, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: E, items: g } = d;
      _.evaluated = {
        props: E instanceof Je.Name ? void 0 : E,
        items: g instanceof Je.Name ? void 0 : g,
        dynamicProps: E instanceof Je.Name,
        dynamicItems: g instanceof Je.Name
      }, _.source && (_.source.evaluated = (0, Je.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), h;
  } finally {
    this._compilations.delete(e);
  }
}
Fe.compileSchema = uo;
function m_(e, t, r) {
  var n;
  r = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = y_.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new ts({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = p_.call(this, a);
}
Fe.resolveRef = m_;
function p_(e) {
  return (0, Ze.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : uo.call(this, e);
}
function pu(e) {
  for (const t of this._compilations)
    if ($_(t, e))
      return t;
}
Fe.getCompilingSchema = pu;
function $_(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function y_(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || rs.call(this, e, t);
}
function rs(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Ze._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Ze.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return gs.call(this, r, e);
  const a = (0, Ze.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = rs.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : gs.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || uo.call(this, i), a === (0, Ze.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, Ze.resolveUrl)(this.opts.uriResolver, s, d)), new ts({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return gs.call(this, r, i);
  }
}
Fe.resolveSchema = rs;
const __ = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function gs(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Mi.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !__.has(u) && d && (t = (0, Ze.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Mi.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = rs.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new ts({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const g_ = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", v_ = "Meta-schema for $data reference (JSON AnySchema extension proposal)", w_ = "object", E_ = [
  "$data"
], S_ = {
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
}, b_ = !1, P_ = {
  $id: g_,
  description: v_,
  type: w_,
  required: E_,
  properties: S_,
  additionalProperties: b_
};
var fo = {};
Object.defineProperty(fo, "__esModule", { value: !0 });
const $u = Nl;
$u.code = 'require("ajv/dist/runtime/uri").default';
fo.default = $u;
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
  const n = tn, s = br, a = xt, i = Fe, u = Z, c = Pe, d = ge, l = L, h = P_, P = fo, _ = (v, p) => new RegExp(v, p);
  _.code = "new RegExp";
  const E = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
    var p, S, $, o, f, b, j, A, q, F, re, Ve, Rt, It, Tt, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, zt;
    const Be = v.strict, Ut = (p = v.code) === null || p === void 0 ? void 0 : p.optimize, Rr = Ut === !0 || Ut === void 0 ? 1 : Ut || 0, Ir = ($ = (S = v.code) === null || S === void 0 ? void 0 : S.regExp) !== null && $ !== void 0 ? $ : _, ds = (o = v.uriResolver) !== null && o !== void 0 ? o : P.default;
    return {
      strictSchema: (b = (f = v.strictSchema) !== null && f !== void 0 ? f : Be) !== null && b !== void 0 ? b : !0,
      strictNumbers: (A = (j = v.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = v.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (Ve = (re = v.strictTuples) !== null && re !== void 0 ? re : Be) !== null && Ve !== void 0 ? Ve : "log",
      strictRequired: (It = (Rt = v.strictRequired) !== null && Rt !== void 0 ? Rt : Be) !== null && It !== void 0 ? It : !1,
      code: v.code ? { ...v.code, optimize: Rr, regExp: Ir } : { optimize: Rr, regExp: Ir },
      loopRequired: (Tt = v.loopRequired) !== null && Tt !== void 0 ? Tt : w,
      loopEnum: (jt = v.loopEnum) !== null && jt !== void 0 ? jt : w,
      meta: (At = v.meta) !== null && At !== void 0 ? At : !0,
      messages: (kt = v.messages) !== null && kt !== void 0 ? kt : !0,
      inlineRefs: (Ct = v.inlineRefs) !== null && Ct !== void 0 ? Ct : !0,
      schemaId: (Dt = v.schemaId) !== null && Dt !== void 0 ? Dt : "$id",
      addUsedSchema: (Mt = v.addUsedSchema) !== null && Mt !== void 0 ? Mt : !0,
      validateSchema: (Lt = v.validateSchema) !== null && Lt !== void 0 ? Lt : !0,
      validateFormats: (Ft = v.validateFormats) !== null && Ft !== void 0 ? Ft : !0,
      unicodeRegExp: (Vt = v.unicodeRegExp) !== null && Vt !== void 0 ? Vt : !0,
      int32range: (zt = v.int32range) !== null && zt !== void 0 ? zt : !0,
      uriResolver: ds
    };
  }
  class R {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...N(p) };
      const { es5: S, lines: $ } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: $ }), this.logger = Q(p.logger);
      const o = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), T.call(this, y, p, "NOT SUPPORTED"), T.call(this, m, p, "DEPRECATED", "warn"), this._metaOpts = H.call(this), p.formats && de.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && V.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), B.call(this), p.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: $ } = this.opts;
      let o = h;
      $ === "id" && (o = { ...h }, o.id = o.$id, delete o.$id), S && p && this.addMetaSchema(o, o[$], !1);
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
      const o = $(S);
      return "$async" in $ || (this.errors = $.errors), o;
    }
    compile(p, S) {
      const $ = this._addSchema(p, S);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return o.call(this, p, S);
      async function o(F, re) {
        await f.call(this, F.$schema);
        const Ve = this._addSchema(F, re);
        return Ve.validate || b.call(this, Ve);
      }
      async function f(F) {
        F && !this.getSchema(F) && await o.call(this, { $ref: F }, !0);
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
    addSchema(p, S, $, o = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, $, o);
        return this;
      }
      let f;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (f = p[b], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(p, $, S, o, !0), this;
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
      const o = this.validate($, p);
      if (!o && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return o;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = U.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: $ } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: $ });
        if (S = i.resolveSchema.call(this, o, p), !S)
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
        return (0, l.eachItem)($, (f) => k.call(this, f)), this;
      D.call(this, S);
      const o = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, l.eachItem)($, o.type.length === 0 ? (f) => k.call(this, f, o) : (f) => o.type.forEach((b) => k.call(this, f, o, b))), this;
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
        const o = $.rules.findIndex((f) => f.keyword === p);
        o >= 0 && $.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: $ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((o) => `${$}${o.instancePath} ${o.message}`).reduce((o, f) => o + S + f);
    }
    $dataMetaSchema(p, S) {
      const $ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const o of S) {
        const f = o.split("/").slice(1);
        let b = p;
        for (const j of f)
          b = b[j];
        for (const j in $) {
          const A = $[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = b[j];
          q && F && (b[j] = I(F));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const $ in p) {
        const o = p[$];
        (!S || S.test($)) && (typeof o == "string" ? delete p[$] : o && !o.meta && (this._cache.delete(o.schema), delete p[$]));
      }
    }
    _addSchema(p, S, $, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
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
      return A = new i.SchemaEnv({ schema: p, schemaId: j, meta: S, baseId: $, localRefs: q }), this._cache.set(A.schema, A), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = A), o && this.validateSchema(p, !0), A;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : i.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function T(v, p, S, $ = "error") {
    for (const o in v) {
      const f = o;
      f in p && this.logger[$](`${S}: option ${o}. ${v[f]}`);
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
    if ((0, l.eachItem)(v, ($) => {
      if (S.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!fe.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(v, p, S) {
    var $;
    const o = p == null ? void 0 : p.post;
    if (S && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let b = o ? f.post : f.rules.find(({ type: A }) => A === S);
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
    const $ = v.rules.findIndex((o) => o.keyword === S);
    $ >= 0 ? v.rules.splice($, 0, p) : (v.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(v) {
    let { metaSchema: p } = v;
    p !== void 0 && (v.$data && this.opts.$data && (p = I(p)), v.validateSchema = this.compile(p, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function I(v) {
    return { anyOf: [v, O] };
  }
})(Fl);
var ho = {}, mo = {}, po = {};
Object.defineProperty(po, "__esModule", { value: !0 });
const N_ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
po.default = N_;
var er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.callRef = er.getValidate = void 0;
const O_ = br, Li = ee, Me = Z, ar = dt, Fi = Fe, mn = L, R_ = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const l = Fi.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new O_.default(n.opts.uriResolver, s, r);
    if (l instanceof Fi.SchemaEnv)
      return P(l);
    return _(l);
    function h() {
      if (a === d)
        return jn(e, i, a, a.$async);
      const E = t.scopeValue("root", { ref: d });
      return jn(e, (0, Me._)`${E}.validate`, d, d.$async);
    }
    function P(E) {
      const g = yu(e, E);
      jn(e, g, E, E.$async);
    }
    function _(E) {
      const g = t.scopeValue("schema", u.code.source === !0 ? { ref: E, code: (0, Me.stringify)(E) } : { ref: E }), y = t.name("valid"), m = e.subschema({
        schema: E,
        dataTypes: [],
        schemaPath: Me.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(m), e.ok(y);
    }
  }
};
function yu(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Me._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
er.getValidate = yu;
function jn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? ar.default.this : Me.nil;
  n ? l() : h();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const E = s.let("valid");
    s.try(() => {
      s.code((0, Me._)`await ${(0, Li.callValidateCode)(e, t, d)}`), _(t), i || s.assign(E, !0);
    }, (g) => {
      s.if((0, Me._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), P(g), i || s.assign(E, !1);
    }), e.ok(E);
  }
  function h() {
    e.result((0, Li.callValidateCode)(e, t, d), () => _(t), () => P(t));
  }
  function P(E) {
    const g = (0, Me._)`${E}.errors`;
    s.assign(ar.default.vErrors, (0, Me._)`${ar.default.vErrors} === null ? ${g} : ${ar.default.vErrors}.concat(${g})`), s.assign(ar.default.errors, (0, Me._)`${ar.default.vErrors}.length`);
  }
  function _(E) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const y = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (a.props = mn.mergeEvaluated.props(s, y.props, a.props));
      else {
        const m = s.var("props", (0, Me._)`${E}.evaluated.props`);
        a.props = mn.mergeEvaluated.props(s, m, a.props, Me.Name);
      }
    if (a.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (a.items = mn.mergeEvaluated.items(s, y.items, a.items));
      else {
        const m = s.var("items", (0, Me._)`${E}.evaluated.items`);
        a.items = mn.mergeEvaluated.items(s, m, a.items, Me.Name);
      }
  }
}
er.callRef = jn;
er.default = R_;
Object.defineProperty(mo, "__esModule", { value: !0 });
const I_ = po, T_ = er, j_ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  I_.default,
  T_.default
];
mo.default = j_;
var $o = {}, yo = {};
Object.defineProperty(yo, "__esModule", { value: !0 });
const Un = Z, vt = Un.operators, qn = {
  maximum: { okStr: "<=", ok: vt.LTE, fail: vt.GT },
  minimum: { okStr: ">=", ok: vt.GTE, fail: vt.LT },
  exclusiveMaximum: { okStr: "<", ok: vt.LT, fail: vt.GTE },
  exclusiveMinimum: { okStr: ">", ok: vt.GT, fail: vt.LTE }
}, A_ = {
  message: ({ keyword: e, schemaCode: t }) => (0, Un.str)`must be ${qn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Un._)`{comparison: ${qn[e].okStr}, limit: ${t}}`
}, k_ = {
  keyword: Object.keys(qn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: A_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Un._)`${r} ${qn[t].fail} ${n} || isNaN(${r})`);
  }
};
yo.default = k_;
var _o = {};
Object.defineProperty(_o, "__esModule", { value: !0 });
const Gr = Z, C_ = {
  message: ({ schemaCode: e }) => (0, Gr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Gr._)`{multipleOf: ${e}}`
}, D_ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: C_,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Gr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Gr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Gr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
_o.default = D_;
var go = {}, vo = {};
Object.defineProperty(vo, "__esModule", { value: !0 });
function _u(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
vo.default = _u;
_u.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(go, "__esModule", { value: !0 });
const Xt = Z, M_ = L, L_ = vo, F_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Xt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Xt._)`{limit: ${e}}`
}, V_ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: F_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Xt.operators.GT : Xt.operators.LT, i = s.opts.unicode === !1 ? (0, Xt._)`${r}.length` : (0, Xt._)`${(0, M_.useFunc)(e.gen, L_.default)}(${r})`;
    e.fail$data((0, Xt._)`${i} ${a} ${n}`);
  }
};
go.default = V_;
var wo = {};
Object.defineProperty(wo, "__esModule", { value: !0 });
const z_ = ee, Kn = Z, U_ = {
  message: ({ schemaCode: e }) => (0, Kn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Kn._)`{pattern: ${e}}`
}, q_ = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: U_,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, Kn._)`(new RegExp(${s}, ${i}))` : (0, z_.usePattern)(e, n);
    e.fail$data((0, Kn._)`!${u}.test(${t})`);
  }
};
wo.default = q_;
var Eo = {};
Object.defineProperty(Eo, "__esModule", { value: !0 });
const Hr = Z, K_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Hr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Hr._)`{limit: ${e}}`
}, G_ = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: K_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Hr.operators.GT : Hr.operators.LT;
    e.fail$data((0, Hr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Eo.default = G_;
var So = {};
Object.defineProperty(So, "__esModule", { value: !0 });
const kr = ee, Br = Z, H_ = L, B_ = {
  message: ({ params: { missingProperty: e } }) => (0, Br.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Br._)`{missingProperty: ${e}}`
}, W_ = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: B_,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !E.has(g)) {
          const y = i.schemaEnv.baseId + i.errSchemaPath, m = `required property "${g}" is not defined at "${y}" (strictRequired)`;
          (0, H_.checkStrictMode)(i, m, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Br.nil, h);
      else
        for (const _ of r)
          (0, kr.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const E = t.let("valid", !0);
        e.block$data(E, () => P(_, E)), e.ok(E);
      } else
        t.if((0, kr.checkMissingProp)(e, r, _)), (0, kr.reportMissingProp)(e, _), t.else();
    }
    function h() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, kr.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function P(_, E) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(E, (0, kr.propertyInData)(t, s, _, u.ownProperties)), t.if((0, Br.not)(E), () => {
          e.error(), t.break();
        });
      }, Br.nil);
    }
  }
};
So.default = W_;
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const Wr = Z, J_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Wr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Wr._)`{limit: ${e}}`
}, X_ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: J_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Wr.operators.GT : Wr.operators.LT;
    e.fail$data((0, Wr._)`${r}.length ${s} ${n}`);
  }
};
bo.default = X_;
var Po = {}, rn = {};
Object.defineProperty(rn, "__esModule", { value: !0 });
const gu = Jn;
gu.code = 'require("ajv/dist/runtime/equal").default';
rn.default = gu;
Object.defineProperty(Po, "__esModule", { value: !0 });
const vs = ge, Ee = Z, Y_ = L, Q_ = rn, Z_ = {
  message: ({ params: { i: e, j: t } }) => (0, Ee.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ee._)`{i: ${e}, j: ${t}}`
}, x_ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Z_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, vs.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, Ee._)`${i} === false`), e.ok(c);
    function l() {
      const E = t.let("i", (0, Ee._)`${r}.length`), g = t.let("j");
      e.setParams({ i: E, j: g }), t.assign(c, !0), t.if((0, Ee._)`${E} > 1`, () => (h() ? P : _)(E, g));
    }
    function h() {
      return d.length > 0 && !d.some((E) => E === "object" || E === "array");
    }
    function P(E, g) {
      const y = t.name("item"), m = (0, vs.checkDataTypes)(d, y, u.opts.strictNumbers, vs.DataType.Wrong), w = t.const("indices", (0, Ee._)`{}`);
      t.for((0, Ee._)`;${E}--;`, () => {
        t.let(y, (0, Ee._)`${r}[${E}]`), t.if(m, (0, Ee._)`continue`), d.length > 1 && t.if((0, Ee._)`typeof ${y} == "string"`, (0, Ee._)`${y} += "_"`), t.if((0, Ee._)`typeof ${w}[${y}] == "number"`, () => {
          t.assign(g, (0, Ee._)`${w}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ee._)`${w}[${y}] = ${E}`);
      });
    }
    function _(E, g) {
      const y = (0, Y_.useFunc)(t, Q_.default), m = t.name("outer");
      t.label(m).for((0, Ee._)`;${E}--;`, () => t.for((0, Ee._)`${g} = ${E}; ${g}--;`, () => t.if((0, Ee._)`${y}(${r}[${E}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
Po.default = x_;
var No = {};
Object.defineProperty(No, "__esModule", { value: !0 });
const Ks = Z, e0 = L, t0 = rn, r0 = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Ks._)`{allowedValue: ${e}}`
}, n0 = {
  keyword: "const",
  $data: !0,
  error: r0,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Ks._)`!${(0, e0.useFunc)(t, t0.default)}(${r}, ${s})`) : e.fail((0, Ks._)`${a} !== ${r}`);
  }
};
No.default = n0;
var Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
const Lr = Z, s0 = L, a0 = rn, o0 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Lr._)`{allowedValues: ${e}}`
}, i0 = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: o0,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, s0.useFunc)(t, a0.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, Lr.or)(...s.map((E, g) => P(_, g)));
    }
    e.pass(l);
    function h() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, Lr._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function P(_, E) {
      const g = s[E];
      return typeof g == "object" && g !== null ? (0, Lr._)`${d()}(${r}, ${_}[${E}])` : (0, Lr._)`${r} === ${g}`;
    }
  }
};
Oo.default = i0;
Object.defineProperty($o, "__esModule", { value: !0 });
const c0 = yo, l0 = _o, u0 = go, d0 = wo, f0 = Eo, h0 = So, m0 = bo, p0 = Po, $0 = No, y0 = Oo, _0 = [
  // number
  c0.default,
  l0.default,
  // string
  u0.default,
  d0.default,
  // object
  f0.default,
  h0.default,
  // array
  m0.default,
  p0.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  $0.default,
  y0.default
];
$o.default = _0;
var Ro = {}, Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.validateAdditionalItems = void 0;
const Yt = Z, Gs = L, g0 = {
  message: ({ params: { len: e } }) => (0, Yt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Yt._)`{limit: ${e}}`
}, v0 = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: g0,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Gs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    vu(e, n);
  }
};
function vu(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Yt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Yt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Gs.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Yt._)`${u} <= ${t.length}`);
    r.if((0, Yt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Gs.Type.Num }, d), i.allErrors || r.if((0, Yt.not)(d), () => r.break());
    });
  }
}
Pr.validateAdditionalItems = vu;
Pr.default = v0;
var Io = {}, Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.validateTuple = void 0;
const Vi = Z, An = L, w0 = ee, E0 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return wu(e, "additionalItems", t);
    r.items = !0, !(0, An.alwaysValidSchema)(r, t) && e.ok((0, w0.validateArray)(e));
  }
};
function wu(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = An.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, Vi._)`${a}.length`);
  r.forEach((h, P) => {
    (0, An.alwaysValidSchema)(u, h) || (n.if((0, Vi._)`${d} > ${P}`, () => e.subschema({
      keyword: i,
      schemaProp: P,
      dataProp: P
    }, c)), e.ok(c));
  });
  function l(h) {
    const { opts: P, errSchemaPath: _ } = u, E = r.length, g = E === h.minItems && (E === h.maxItems || h[t] === !1);
    if (P.strictTuples && !g) {
      const y = `"${i}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, An.checkStrictMode)(u, y, P.strictTuples);
    }
  }
}
Nr.validateTuple = wu;
Nr.default = E0;
Object.defineProperty(Io, "__esModule", { value: !0 });
const S0 = Nr, b0 = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, S0.validateTuple)(e, "items")
};
Io.default = b0;
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
const zi = Z, P0 = L, N0 = ee, O0 = Pr, R0 = {
  message: ({ params: { len: e } }) => (0, zi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, zi._)`{limit: ${e}}`
}, I0 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: R0,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, P0.alwaysValidSchema)(n, t) && (s ? (0, O0.validateAdditionalItems)(e, s) : e.ok((0, N0.validateArray)(e)));
  }
};
To.default = I0;
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
const Ke = Z, pn = L, T0 = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ke.str)`must contain at least ${e} valid item(s)` : (0, Ke.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ke._)`{minContains: ${e}}` : (0, Ke._)`{minContains: ${e}, maxContains: ${t}}`
}, j0 = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: T0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, Ke._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, pn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, pn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, pn.alwaysValidSchema)(a, r)) {
      let g = (0, Ke._)`${l} >= ${i}`;
      u !== void 0 && (g = (0, Ke._)`${g} && ${l} <= ${u}`), e.pass(g);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    u === void 0 && i === 1 ? _(h, () => t.if(h, () => t.break())) : i === 0 ? (t.let(h, !0), u !== void 0 && t.if((0, Ke._)`${s}.length > 0`, P)) : (t.let(h, !1), P()), e.result(h, () => e.reset());
    function P() {
      const g = t.name("_valid"), y = t.let("count", 0);
      _(g, () => t.if(g, () => E(y)));
    }
    function _(g, y) {
      t.forRange("i", 0, l, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: pn.Type.Num,
          compositeRule: !0
        }, g), y();
      });
    }
    function E(g) {
      t.code((0, Ke._)`${g}++`), u === void 0 ? t.if((0, Ke._)`${g} >= ${i}`, () => t.assign(h, !0).break()) : (t.if((0, Ke._)`${g} > ${u}`, () => t.assign(h, !1).break()), i === 1 ? t.assign(h, !0) : t.if((0, Ke._)`${g} >= ${i}`, () => t.assign(h, !0)));
    }
  }
};
jo.default = j0;
var Eu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Z, r = L, n = ee;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: l } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: l, missingProperty: h } }) => (0, t._)`{property: ${c},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${l}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, l] = a(c);
      i(c, d), u(c, l);
    }
  };
  function a({ schema: c }) {
    const d = {}, l = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const P = Array.isArray(c[h]) ? d : l;
      P[h] = c[h];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: h, it: P } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = l.let("missing");
    for (const E in d) {
      const g = d[E];
      if (g.length === 0)
        continue;
      const y = (0, n.propertyInData)(l, h, E, P.opts.ownProperties);
      c.setParams({
        property: E,
        depsCount: g.length,
        deps: g.join(", ")
      }), P.allErrors ? l.if(y, () => {
        for (const m of g)
          (0, n.checkReportMissingProp)(c, m);
      }) : (l.if((0, t._)`${y} && (${(0, n.checkMissingProp)(c, g, _)})`), (0, n.reportMissingProp)(c, _), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function u(c, d = c.schema) {
    const { gen: l, data: h, keyword: P, it: _ } = c, E = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, h, g, _.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: P, schemaProp: g }, E);
          c.mergeValidEvaluated(y, E);
        },
        () => l.var(E, !0)
        // TODO var
      ), c.ok(E));
  }
  e.validateSchemaDeps = u, e.default = s;
})(Eu);
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
const Su = Z, A0 = L, k0 = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Su._)`{propertyName: ${e.propertyName}}`
}, C0 = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: k0,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, A0.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Su.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Ao.default = C0;
var ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
const $n = ee, Ye = Z, D0 = dt, yn = L, M0 = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ye._)`{additionalProperty: ${e.additionalProperty}}`
}, L0 = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: M0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, yn.alwaysValidSchema)(i, r))
      return;
    const d = (0, $n.allSchemaProperties)(n.properties), l = (0, $n.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Ye._)`${a} === ${D0.default.errors}`);
    function h() {
      t.forIn("key", s, (y) => {
        !d.length && !l.length ? E(y) : t.if(P(y), () => E(y));
      });
    }
    function P(y) {
      let m;
      if (d.length > 8) {
        const w = (0, yn.schemaRefOrVal)(i, n.properties, "properties");
        m = (0, $n.isOwnProperty)(t, w, y);
      } else d.length ? m = (0, Ye.or)(...d.map((w) => (0, Ye._)`${y} === ${w}`)) : m = Ye.nil;
      return l.length && (m = (0, Ye.or)(m, ...l.map((w) => (0, Ye._)`${(0, $n.usePattern)(e, w)}.test(${y})`))), (0, Ye.not)(m);
    }
    function _(y) {
      t.code((0, Ye._)`delete ${s}[${y}]`);
    }
    function E(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, yn.alwaysValidSchema)(i, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? (g(y, m, !1), t.if((0, Ye.not)(m), () => {
          e.reset(), _(y);
        })) : (g(y, m), u || t.if((0, Ye.not)(m), () => t.break()));
      }
    }
    function g(y, m, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: yn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, m);
    }
  }
};
ns.default = L0;
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
const F0 = et, Ui = ee, ws = L, qi = ns, V0 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && qi.default.code(new F0.KeywordCxt(a, qi.default, "additionalProperties"));
    const i = (0, Ui.allSchemaProperties)(r);
    for (const h of i)
      a.definedProperties.add(h);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = ws.mergeEvaluated.props(t, (0, ws.toHash)(i), a.props));
    const u = i.filter((h) => !(0, ws.alwaysValidSchema)(a, r[h]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const h of u)
      d(h) ? l(h) : (t.if((0, Ui.propertyInData)(t, s, h, a.opts.ownProperties)), l(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function l(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, c);
    }
  }
};
ko.default = V0;
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const Ki = ee, _n = Z, Gi = L, Hi = L, z0 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, Ki.allSchemaProperties)(r), c = u.filter((g) => (0, Gi.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof _n.Name) && (a.props = (0, Hi.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    P();
    function P() {
      for (const g of u)
        d && _(g), a.allErrors ? E(g) : (t.var(l, !0), E(g), t.if(l));
    }
    function _(g) {
      for (const y in d)
        new RegExp(g).test(y) && (0, Gi.checkStrictMode)(a, `property ${y} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function E(g) {
      t.forIn("key", n, (y) => {
        t.if((0, _n._)`${(0, Ki.usePattern)(e, g)}.test(${y})`, () => {
          const m = c.includes(g);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: y,
            dataPropType: Hi.Type.Str
          }, l), a.opts.unevaluated && h !== !0 ? t.assign((0, _n._)`${h}[${y}]`, !0) : !m && !a.allErrors && t.if((0, _n.not)(l), () => t.break());
        });
      });
    }
  }
};
Co.default = z0;
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
const U0 = L, q0 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, U0.alwaysValidSchema)(n, r)) {
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
Do.default = q0;
var Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
const K0 = ee, G0 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: K0.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Mo.default = G0;
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
const kn = Z, H0 = L, B0 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, kn._)`{passingSchemas: ${e.passing}}`
}, W0 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: B0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), u = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: u }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((l, h) => {
        let P;
        (0, H0.alwaysValidSchema)(s, l) ? t.var(c, !0) : P = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, kn._)`${c} && ${i}`).assign(i, !1).assign(u, (0, kn._)`[${u}, ${h}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, h), P && e.mergeEvaluated(P, kn.Name);
        });
      });
    }
  }
};
Lo.default = W0;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const J0 = L, X0 = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, J0.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
Fo.default = X0;
var Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
const Gn = Z, bu = L, Y0 = {
  message: ({ params: e }) => (0, Gn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Gn._)`{failingKeyword: ${e.ifClause}}`
}, Q0 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Y0,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, bu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Bi(n, "then"), a = Bi(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Gn.not)(u), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, u);
      e.mergeEvaluated(l);
    }
    function d(l, h) {
      return () => {
        const P = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(P, i), h ? t.assign(h, (0, Gn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Bi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, bu.alwaysValidSchema)(e, r);
}
Vo.default = Q0;
var zo = {};
Object.defineProperty(zo, "__esModule", { value: !0 });
const Z0 = L, x0 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Z0.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
zo.default = x0;
Object.defineProperty(Ro, "__esModule", { value: !0 });
const eg = Pr, tg = Io, rg = Nr, ng = To, sg = jo, ag = Eu, og = Ao, ig = ns, cg = ko, lg = Co, ug = Do, dg = Mo, fg = Lo, hg = Fo, mg = Vo, pg = zo;
function $g(e = !1) {
  const t = [
    // any
    ug.default,
    dg.default,
    fg.default,
    hg.default,
    mg.default,
    pg.default,
    // object
    og.default,
    ig.default,
    ag.default,
    cg.default,
    lg.default
  ];
  return e ? t.push(tg.default, ng.default) : t.push(eg.default, rg.default), t.push(sg.default), t;
}
Ro.default = $g;
var Uo = {}, qo = {};
Object.defineProperty(qo, "__esModule", { value: !0 });
const ye = Z, yg = {
  message: ({ schemaCode: e }) => (0, ye.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ye._)`{format: ${e}}`
}, _g = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: yg,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: h } = u;
    if (!c.validateFormats)
      return;
    s ? P() : _();
    function P() {
      const E = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, ye._)`${E}[${i}]`), y = r.let("fType"), m = r.let("format");
      r.if((0, ye._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(y, (0, ye._)`${g}.type || "string"`).assign(m, (0, ye._)`${g}.validate`), () => r.assign(y, (0, ye._)`"string"`).assign(m, g)), e.fail$data((0, ye.or)(w(), N()));
      function w() {
        return c.strictSchema === !1 ? ye.nil : (0, ye._)`${i} && !${m}`;
      }
      function N() {
        const R = l.$async ? (0, ye._)`(${g}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, ye._)`${m}(${n})`, T = (0, ye._)`(typeof ${m} == "function" ? ${R} : ${m}.test(${n}))`;
        return (0, ye._)`${m} && ${m} !== true && ${y} === ${t} && !${T}`;
      }
    }
    function _() {
      const E = h.formats[a];
      if (!E) {
        w();
        return;
      }
      if (E === !0)
        return;
      const [g, y, m] = N(E);
      g === t && e.pass(R());
      function w() {
        if (c.strictSchema === !1) {
          h.logger.warn(T());
          return;
        }
        throw new Error(T());
        function T() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(T) {
        const U = T instanceof RegExp ? (0, ye.regexpCode)(T) : c.code.formats ? (0, ye._)`${c.code.formats}${(0, ye.getProperty)(a)}` : void 0, B = r.scopeValue("formats", { key: a, ref: T, code: U });
        return typeof T == "object" && !(T instanceof RegExp) ? [T.type || "string", T.validate, (0, ye._)`${B}.validate`] : ["string", T, B];
      }
      function R() {
        if (typeof E == "object" && !(E instanceof RegExp) && E.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, ye._)`await ${m}(${n})`;
        }
        return typeof y == "function" ? (0, ye._)`${m}(${n})` : (0, ye._)`${m}.test(${n})`;
      }
    }
  }
};
qo.default = _g;
Object.defineProperty(Uo, "__esModule", { value: !0 });
const gg = qo, vg = [gg.default];
Uo.default = vg;
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
Object.defineProperty(ho, "__esModule", { value: !0 });
const wg = mo, Eg = $o, Sg = Ro, bg = Uo, Wi = vr, Pg = [
  wg.default,
  Eg.default,
  (0, Sg.default)(),
  bg.default,
  Wi.metadataVocabulary,
  Wi.contentVocabulary
];
ho.default = Pg;
var Ko = {}, ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
ss.DiscrError = void 0;
var Ji;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Ji || (ss.DiscrError = Ji = {}));
Object.defineProperty(Ko, "__esModule", { value: !0 });
const cr = Z, Hs = ss, Xi = Fe, Ng = br, Og = L, Rg = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Hs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, cr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, Ig = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: Rg,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const u = n.propertyName;
    if (typeof u != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, cr._)`${r}${(0, cr.getProperty)(u)}`);
    t.if((0, cr._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: Hs.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = P();
      t.if(!1);
      for (const E in _)
        t.elseIf((0, cr._)`${d} === ${E}`), t.assign(c, h(_[E]));
      t.else(), e.error(!1, { discrError: Hs.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function h(_) {
      const E = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, E);
      return e.mergeEvaluated(g, cr.Name), E;
    }
    function P() {
      var _;
      const E = {}, g = m(s);
      let y = !0;
      for (let R = 0; R < i.length; R++) {
        let T = i[R];
        if (T != null && T.$ref && !(0, Og.schemaHasRulesButRef)(T, a.self.RULES)) {
          const B = T.$ref;
          if (T = Xi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, B), T instanceof Xi.SchemaEnv && (T = T.schema), T === void 0)
            throw new Ng.default(a.opts.uriResolver, a.baseId, B);
        }
        const U = (_ = T == null ? void 0 : T.properties) === null || _ === void 0 ? void 0 : _[u];
        if (typeof U != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        y = y && (g || m(T)), w(U, R);
      }
      if (!y)
        throw new Error(`discriminator: "${u}" must be required`);
      return E;
      function m({ required: R }) {
        return Array.isArray(R) && R.includes(u);
      }
      function w(R, T) {
        if (R.const)
          N(R.const, T);
        else if (R.enum)
          for (const U of R.enum)
            N(U, T);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(R, T) {
        if (typeof R != "string" || R in E)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        E[R] = T;
      }
    }
  }
};
Ko.default = Ig;
const Tg = "http://json-schema.org/draft-07/schema#", jg = "http://json-schema.org/draft-07/schema#", Ag = "Core schema meta-schema", kg = {
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
}, Cg = [
  "object",
  "boolean"
], Dg = {
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
}, Mg = {
  $schema: Tg,
  $id: jg,
  title: Ag,
  definitions: kg,
  type: Cg,
  properties: Dg,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Fl, n = ho, s = Ko, a = Mg, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(E, u, !1), this.refs["http://json-schema.org/schema"] = u;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = et;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var l = Z;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var h = tn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var P = br;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return P.default;
  } });
})(Fs, Fs.exports);
var Lg = Fs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = Lg, r = Z, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: u, schemaCode: c }) => r.str`should be ${s[u].okStr} ${c}`,
    params: ({ keyword: u, schemaCode: c }) => r._`{comparison: ${s[u].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(u) {
      const { gen: c, data: d, schemaCode: l, keyword: h, it: P } = u, { opts: _, self: E } = P;
      if (!_.validateFormats)
        return;
      const g = new t.KeywordCxt(P, E.RULES.all.format.definition, "format");
      g.$data ? y() : m();
      function y() {
        const N = c.scopeValue("formats", {
          ref: E.formats,
          code: _.code.formats
        }), R = c.const("fmt", r._`${N}[${g.schemaCode}]`);
        u.fail$data(r.or(r._`typeof ${R} != "object"`, r._`${R} instanceof RegExp`, r._`typeof ${R}.compare != "function"`, w(R)));
      }
      function m() {
        const N = g.schema, R = E.formats[N];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${h}": format "${N}" does not define "compare" function`);
        const T = c.scopeValue("formats", {
          key: N,
          ref: R,
          code: _.code.formats ? r._`${_.code.formats}${r.getProperty(N)}` : void 0
        });
        u.fail$data(w(T));
      }
      function w(N) {
        return r._`${N}.compare(${d}, ${l}) ${s[h].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (u) => (u.addKeyword(e.formatLimitDefinition), u);
  e.default = i;
})(Ll);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Ml, n = Ll, s = Z, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), u = (d, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(d, l, r.fullFormats, a), d;
    const [h, P] = l.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, a], _ = l.formats || r.formatNames;
    return c(d, _, h, P), l.keywords && n.default(d), d;
  };
  u.get = (d, l = "full") => {
    const P = (l === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!P)
      throw new Error(`Unknown format "${d}"`);
    return P;
  };
  function c(d, l, h, P) {
    var _, E;
    (_ = (E = d.opts.code).formats) !== null && _ !== void 0 || (E.formats = s._`require("ajv-formats/dist/formats").${P}`);
    for (const g of l)
      d.addFormat(g, h[g]);
  }
  e.exports = t = u, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = u;
})(Ls, Ls.exports);
var Fg = Ls.exports;
const Vg = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !zg(s, a) && n || Object.defineProperty(e, r, a);
}, zg = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, Ug = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, qg = (e, t) => `/* Wrapped ${e}*/
${t}`, Kg = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), Gg = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), Hg = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = qg.bind(null, n, t.toString());
  Object.defineProperty(s, "name", Gg), Object.defineProperty(e, "toString", { ...Kg, value: s });
}, Bg = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    Vg(e, t, s, r);
  return Ug(e, t), Hg(e, t, n), e;
};
var Wg = Bg;
const Jg = Wg;
var Xg = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    before: n = !1,
    after: s = !0
  } = t;
  if (!n && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let a, i;
  const u = function(...c) {
    const d = this, l = () => {
      a = void 0, s && (i = e.apply(d, c));
    }, h = n && !a;
    return clearTimeout(a), a = setTimeout(l, r), h && (i = e.apply(d, c)), i;
  };
  return Jg(u, e), u.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, u;
}, Bs = { exports: {} };
const Yg = "2.0.0", Pu = 256, Qg = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Zg = 16, xg = Pu - 6, ev = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var as = {
  MAX_LENGTH: Pu,
  MAX_SAFE_COMPONENT_LENGTH: Zg,
  MAX_SAFE_BUILD_LENGTH: xg,
  MAX_SAFE_INTEGER: Qg,
  RELEASE_TYPES: ev,
  SEMVER_SPEC_VERSION: Yg,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const tv = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var os = tv;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = as, a = os;
  t = e.exports = {};
  const i = t.re = [], u = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], l = t.t = {};
  let h = 0;
  const P = "[a-zA-Z0-9-]", _ = [
    ["\\s", 1],
    ["\\d", s],
    [P, n]
  ], E = (y) => {
    for (const [m, w] of _)
      y = y.split(`${m}*`).join(`${m}{0,${w}}`).split(`${m}+`).join(`${m}{1,${w}}`);
    return y;
  }, g = (y, m, w) => {
    const N = E(m), R = h++;
    a(y, R, m), l[y] = R, c[R] = m, d[R] = N, i[R] = new RegExp(m, w ? "g" : void 0), u[R] = new RegExp(N, w ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${P}*`), g("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${P}+`), g("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), g("FULL", `^${c[l.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), g("LOOSE", `^${c[l.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), g("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", c[l.COERCE], !0), g("COERCERTLFULL", c[l.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Bs, Bs.exports);
var nn = Bs.exports;
const rv = Object.freeze({ loose: !0 }), nv = Object.freeze({}), sv = (e) => e ? typeof e != "object" ? rv : e : nv;
var Go = sv;
const Yi = /^[0-9]+$/, Nu = (e, t) => {
  const r = Yi.test(e), n = Yi.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, av = (e, t) => Nu(t, e);
var Ou = {
  compareIdentifiers: Nu,
  rcompareIdentifiers: av
};
const gn = os, { MAX_LENGTH: Qi, MAX_SAFE_INTEGER: vn } = as, { safeRe: wn, t: En } = nn, ov = Go, { compareIdentifiers: or } = Ou;
let iv = class nt {
  constructor(t, r) {
    if (r = ov(r), t instanceof nt) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Qi)
      throw new TypeError(
        `version is longer than ${Qi} characters`
      );
    gn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? wn[En.LOOSE] : wn[En.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > vn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > vn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > vn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < vn)
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
    if (gn("SemVer.compare", this.version, this.options, t), !(t instanceof nt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new nt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof nt || (t = new nt(t, this.options)), or(this.major, t.major) || or(this.minor, t.minor) || or(this.patch, t.patch);
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
      if (gn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return or(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof nt || (t = new nt(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (gn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return or(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? wn[En.PRERELEASELOOSE] : wn[En.PRERELEASE]);
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
          n === !1 && (a = [r]), or(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var ke = iv;
const Zi = ke, cv = (e, t, r = !1) => {
  if (e instanceof Zi)
    return e;
  try {
    return new Zi(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Or = cv;
const lv = Or, uv = (e, t) => {
  const r = lv(e, t);
  return r ? r.version : null;
};
var dv = uv;
const fv = Or, hv = (e, t) => {
  const r = fv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var mv = hv;
const xi = ke, pv = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new xi(
      e instanceof xi ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var $v = pv;
const ec = Or, yv = (e, t) => {
  const r = ec(e, null, !0), n = ec(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, i = a ? r : n, u = a ? n : r, c = !!i.prerelease.length;
  if (!!u.prerelease.length && !c) {
    if (!u.patch && !u.minor)
      return "major";
    if (u.compareMain(i) === 0)
      return u.minor && !u.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var _v = yv;
const gv = ke, vv = (e, t) => new gv(e, t).major;
var wv = vv;
const Ev = ke, Sv = (e, t) => new Ev(e, t).minor;
var bv = Sv;
const Pv = ke, Nv = (e, t) => new Pv(e, t).patch;
var Ov = Nv;
const Rv = Or, Iv = (e, t) => {
  const r = Rv(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Tv = Iv;
const tc = ke, jv = (e, t, r) => new tc(e, r).compare(new tc(t, r));
var tt = jv;
const Av = tt, kv = (e, t, r) => Av(t, e, r);
var Cv = kv;
const Dv = tt, Mv = (e, t) => Dv(e, t, !0);
var Lv = Mv;
const rc = ke, Fv = (e, t, r) => {
  const n = new rc(e, r), s = new rc(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Ho = Fv;
const Vv = Ho, zv = (e, t) => e.sort((r, n) => Vv(r, n, t));
var Uv = zv;
const qv = Ho, Kv = (e, t) => e.sort((r, n) => qv(n, r, t));
var Gv = Kv;
const Hv = tt, Bv = (e, t, r) => Hv(e, t, r) > 0;
var is = Bv;
const Wv = tt, Jv = (e, t, r) => Wv(e, t, r) < 0;
var Bo = Jv;
const Xv = tt, Yv = (e, t, r) => Xv(e, t, r) === 0;
var Ru = Yv;
const Qv = tt, Zv = (e, t, r) => Qv(e, t, r) !== 0;
var Iu = Zv;
const xv = tt, ew = (e, t, r) => xv(e, t, r) >= 0;
var Wo = ew;
const tw = tt, rw = (e, t, r) => tw(e, t, r) <= 0;
var Jo = rw;
const nw = Ru, sw = Iu, aw = is, ow = Wo, iw = Bo, cw = Jo, lw = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return nw(e, r, n);
    case "!=":
      return sw(e, r, n);
    case ">":
      return aw(e, r, n);
    case ">=":
      return ow(e, r, n);
    case "<":
      return iw(e, r, n);
    case "<=":
      return cw(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Tu = lw;
const uw = ke, dw = Or, { safeRe: Sn, t: bn } = nn, fw = (e, t) => {
  if (e instanceof uw)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Sn[bn.COERCEFULL] : Sn[bn.COERCE]);
  else {
    const c = t.includePrerelease ? Sn[bn.COERCERTLFULL] : Sn[bn.COERCERTL];
    let d;
    for (; (d = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), c.lastIndex = d.index + d[1].length + d[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", i = t.includePrerelease && r[5] ? `-${r[5]}` : "", u = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return dw(`${n}.${s}.${a}${i}${u}`, t);
};
var hw = fw;
class mw {
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
var pw = mw, Es, nc;
function rt() {
  if (nc) return Es;
  nc = 1;
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
        if (this.set = this.set.filter((O) => !g(O[0])), this.set.length === 0)
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
      const D = ((this.options.includePrerelease && _) | (this.options.loose && E)) + ":" + k, O = n.get(D);
      if (O)
        return O;
      const I = this.options.loose, v = I ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      k = k.replace(v, Q(this.options.includePrerelease)), i("hyphen replace", k), k = k.replace(c[d.COMPARATORTRIM], l), i("comparator trim", k), k = k.replace(c[d.TILDETRIM], h), i("tilde trim", k), k = k.replace(c[d.CARETTRIM], P), i("caret trim", k);
      let p = k.split(" ").map((f) => w(f, this.options)).join(" ").split(/\s+/).map((f) => se(f, this.options));
      I && (p = p.filter((f) => (i("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), i("range list", p);
      const S = /* @__PURE__ */ new Map(), $ = p.map((f) => new a(f, this.options));
      for (const f of $) {
        if (g(f))
          return [f];
        S.set(f.value, f);
      }
      S.size > 1 && S.has("") && S.delete("");
      const o = [...S.values()];
      return n.set(D, o), o;
    }
    intersects(k, z) {
      if (!(k instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((D) => m(D, z) && k.set.some((O) => m(O, z) && D.every((I) => O.every((v) => I.intersects(v, z)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(k) {
      if (!k)
        return !1;
      if (typeof k == "string")
        try {
          k = new u(k, this.options);
        } catch {
          return !1;
        }
      for (let z = 0; z < this.set.length; z++)
        if (fe(this.set[z], k, this.options))
          return !0;
      return !1;
    }
  }
  Es = t;
  const r = pw, n = new r(), s = Go, a = cs(), i = os, u = ke, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: l,
    tildeTrimReplace: h,
    caretTrimReplace: P
  } = nn, { FLAG_INCLUDE_PRERELEASE: _, FLAG_LOOSE: E } = as, g = (C) => C.value === "<0.0.0-0", y = (C) => C.value === "", m = (C, k) => {
    let z = !0;
    const D = C.slice();
    let O = D.pop();
    for (; z && D.length; )
      z = D.every((I) => O.intersects(I, k)), O = D.pop();
    return z;
  }, w = (C, k) => (i("comp", C, k), C = U(C, k), i("caret", C), C = R(C, k), i("tildes", C), C = de(C, k), i("xrange", C), C = H(C, k), i("stars", C), C), N = (C) => !C || C.toLowerCase() === "x" || C === "*", R = (C, k) => C.trim().split(/\s+/).map((z) => T(z, k)).join(" "), T = (C, k) => {
    const z = k.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return C.replace(z, (D, O, I, v, p) => {
      i("tilde", C, D, O, I, v, p);
      let S;
      return N(O) ? S = "" : N(I) ? S = `>=${O}.0.0 <${+O + 1}.0.0-0` : N(v) ? S = `>=${O}.${I}.0 <${O}.${+I + 1}.0-0` : p ? (i("replaceTilde pr", p), S = `>=${O}.${I}.${v}-${p} <${O}.${+I + 1}.0-0`) : S = `>=${O}.${I}.${v} <${O}.${+I + 1}.0-0`, i("tilde return", S), S;
    });
  }, U = (C, k) => C.trim().split(/\s+/).map((z) => B(z, k)).join(" "), B = (C, k) => {
    i("caret", C, k);
    const z = k.loose ? c[d.CARETLOOSE] : c[d.CARET], D = k.includePrerelease ? "-0" : "";
    return C.replace(z, (O, I, v, p, S) => {
      i("caret", C, O, I, v, p, S);
      let $;
      return N(I) ? $ = "" : N(v) ? $ = `>=${I}.0.0${D} <${+I + 1}.0.0-0` : N(p) ? I === "0" ? $ = `>=${I}.${v}.0${D} <${I}.${+v + 1}.0-0` : $ = `>=${I}.${v}.0${D} <${+I + 1}.0.0-0` : S ? (i("replaceCaret pr", S), I === "0" ? v === "0" ? $ = `>=${I}.${v}.${p}-${S} <${I}.${v}.${+p + 1}-0` : $ = `>=${I}.${v}.${p}-${S} <${I}.${+v + 1}.0-0` : $ = `>=${I}.${v}.${p}-${S} <${+I + 1}.0.0-0`) : (i("no pr"), I === "0" ? v === "0" ? $ = `>=${I}.${v}.${p}${D} <${I}.${v}.${+p + 1}-0` : $ = `>=${I}.${v}.${p}${D} <${I}.${+v + 1}.0-0` : $ = `>=${I}.${v}.${p} <${+I + 1}.0.0-0`), i("caret return", $), $;
    });
  }, de = (C, k) => (i("replaceXRanges", C, k), C.split(/\s+/).map((z) => V(z, k)).join(" ")), V = (C, k) => {
    C = C.trim();
    const z = k.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return C.replace(z, (D, O, I, v, p, S) => {
      i("xRange", C, D, O, I, v, p, S);
      const $ = N(I), o = $ || N(v), f = o || N(p), b = f;
      return O === "=" && b && (O = ""), S = k.includePrerelease ? "-0" : "", $ ? O === ">" || O === "<" ? D = "<0.0.0-0" : D = "*" : O && b ? (o && (v = 0), p = 0, O === ">" ? (O = ">=", o ? (I = +I + 1, v = 0, p = 0) : (v = +v + 1, p = 0)) : O === "<=" && (O = "<", o ? I = +I + 1 : v = +v + 1), O === "<" && (S = "-0"), D = `${O + I}.${v}.${p}${S}`) : o ? D = `>=${I}.0.0${S} <${+I + 1}.0.0-0` : f && (D = `>=${I}.${v}.0${S} <${I}.${+v + 1}.0-0`), i("xRange return", D), D;
    });
  }, H = (C, k) => (i("replaceStars", C, k), C.trim().replace(c[d.STAR], "")), se = (C, k) => (i("replaceGTE0", C, k), C.trim().replace(c[k.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (C) => (k, z, D, O, I, v, p, S, $, o, f, b) => (N(D) ? z = "" : N(O) ? z = `>=${D}.0.0${C ? "-0" : ""}` : N(I) ? z = `>=${D}.${O}.0${C ? "-0" : ""}` : v ? z = `>=${z}` : z = `>=${z}${C ? "-0" : ""}`, N($) ? S = "" : N(o) ? S = `<${+$ + 1}.0.0-0` : N(f) ? S = `<${$}.${+o + 1}.0-0` : b ? S = `<=${$}.${o}.${f}-${b}` : C ? S = `<${$}.${o}.${+f + 1}-0` : S = `<=${S}`, `${z} ${S}`.trim()), fe = (C, k, z) => {
    for (let D = 0; D < C.length; D++)
      if (!C[D].test(k))
        return !1;
    if (k.prerelease.length && !z.includePrerelease) {
      for (let D = 0; D < C.length; D++)
        if (i(C[D].semver), C[D].semver !== a.ANY && C[D].semver.prerelease.length > 0) {
          const O = C[D].semver;
          if (O.major === k.major && O.minor === k.minor && O.patch === k.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Es;
}
var Ss, sc;
function cs() {
  if (sc) return Ss;
  sc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, h) {
      if (h = r(h), l instanceof t) {
        if (l.loose === !!h.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), i("comparator", l, h), this.options = h, this.loose = !!h.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(l) {
      const h = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], P = l.match(h);
      if (!P)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = P[1] !== void 0 ? P[1] : "", this.operator === "=" && (this.operator = ""), P[2] ? this.semver = new u(P[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (i("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new u(l, this.options);
        } catch {
          return !1;
        }
      return a(l, this.operator, this.semver, this.options);
    }
    intersects(l, h) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, h).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, h).test(l.semver) : (h = r(h), h.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || a(this.semver, "<", l.semver, h) && this.operator.startsWith(">") && l.operator.startsWith("<") || a(this.semver, ">", l.semver, h) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Ss = t;
  const r = Go, { safeRe: n, t: s } = nn, a = Tu, i = os, u = ke, c = rt();
  return Ss;
}
const $w = rt(), yw = (e, t, r) => {
  try {
    t = new $w(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ls = yw;
const _w = rt(), gw = (e, t) => new _w(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var vw = gw;
const ww = ke, Ew = rt(), Sw = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new Ew(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === -1) && (n = i, s = new ww(n, r));
  }), n;
};
var bw = Sw;
const Pw = ke, Nw = rt(), Ow = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new Nw(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === 1) && (n = i, s = new Pw(n, r));
  }), n;
};
var Rw = Ow;
const bs = ke, Iw = rt(), ac = is, Tw = (e, t) => {
  e = new Iw(e, t);
  let r = new bs("0.0.0");
  if (e.test(r) || (r = new bs("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((i) => {
      const u = new bs(i.semver.version);
      switch (i.operator) {
        case ">":
          u.prerelease.length === 0 ? u.patch++ : u.prerelease.push(0), u.raw = u.format();
        case "":
        case ">=":
          (!a || ac(u, a)) && (a = u);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${i.operator}`);
      }
    }), a && (!r || ac(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var jw = Tw;
const Aw = rt(), kw = (e, t) => {
  try {
    return new Aw(e, t).range || "*";
  } catch {
    return null;
  }
};
var Cw = kw;
const Dw = ke, ju = cs(), { ANY: Mw } = ju, Lw = rt(), Fw = ls, oc = is, ic = Bo, Vw = Jo, zw = Wo, Uw = (e, t, r, n) => {
  e = new Dw(e, n), t = new Lw(t, n);
  let s, a, i, u, c;
  switch (r) {
    case ">":
      s = oc, a = Vw, i = ic, u = ">", c = ">=";
      break;
    case "<":
      s = ic, a = zw, i = oc, u = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (Fw(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const l = t.set[d];
    let h = null, P = null;
    if (l.forEach((_) => {
      _.semver === Mw && (_ = new ju(">=0.0.0")), h = h || _, P = P || _, s(_.semver, h.semver, n) ? h = _ : i(_.semver, P.semver, n) && (P = _);
    }), h.operator === u || h.operator === c || (!P.operator || P.operator === u) && a(e, P.semver))
      return !1;
    if (P.operator === c && i(e, P.semver))
      return !1;
  }
  return !0;
};
var Xo = Uw;
const qw = Xo, Kw = (e, t, r) => qw(e, t, ">", r);
var Gw = Kw;
const Hw = Xo, Bw = (e, t, r) => Hw(e, t, "<", r);
var Ww = Bw;
const cc = rt(), Jw = (e, t, r) => (e = new cc(e, r), t = new cc(t, r), e.intersects(t, r));
var Xw = Jw;
const Yw = ls, Qw = tt;
var Zw = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const i = e.sort((l, h) => Qw(l, h, r));
  for (const l of i)
    Yw(l, t, r) ? (a = l, s || (s = l)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const u = [];
  for (const [l, h] of n)
    l === h ? u.push(l) : !h && l === i[0] ? u.push("*") : h ? l === i[0] ? u.push(`<=${h}`) : u.push(`${l} - ${h}`) : u.push(`>=${l}`);
  const c = u.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const lc = rt(), Yo = cs(), { ANY: Ps } = Yo, Cr = ls, Qo = tt, xw = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new lc(e, r), t = new lc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const i = tE(s, a, r);
      if (n = n || i !== null, i)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, eE = [new Yo(">=0.0.0-0")], uc = [new Yo(">=0.0.0")], tE = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Ps) {
    if (t.length === 1 && t[0].semver === Ps)
      return !0;
    r.includePrerelease ? e = eE : e = uc;
  }
  if (t.length === 1 && t[0].semver === Ps) {
    if (r.includePrerelease)
      return !0;
    t = uc;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const _ of e)
    _.operator === ">" || _.operator === ">=" ? s = dc(s, _, r) : _.operator === "<" || _.operator === "<=" ? a = fc(a, _, r) : n.add(_.semver);
  if (n.size > 1)
    return null;
  let i;
  if (s && a) {
    if (i = Qo(s.semver, a.semver, r), i > 0)
      return null;
    if (i === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const _ of n) {
    if (s && !Cr(_, String(s), r) || a && !Cr(_, String(a), r))
      return null;
    for (const E of t)
      if (!Cr(_, String(E), r))
        return !1;
    return !0;
  }
  let u, c, d, l, h = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, P = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  h && h.prerelease.length === 1 && a.operator === "<" && h.prerelease[0] === 0 && (h = !1);
  for (const _ of t) {
    if (l = l || _.operator === ">" || _.operator === ">=", d = d || _.operator === "<" || _.operator === "<=", s) {
      if (P && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === P.major && _.semver.minor === P.minor && _.semver.patch === P.patch && (P = !1), _.operator === ">" || _.operator === ">=") {
        if (u = dc(s, _, r), u === _ && u !== s)
          return !1;
      } else if (s.operator === ">=" && !Cr(s.semver, String(_), r))
        return !1;
    }
    if (a) {
      if (h && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === h.major && _.semver.minor === h.minor && _.semver.patch === h.patch && (h = !1), _.operator === "<" || _.operator === "<=") {
        if (c = fc(a, _, r), c === _ && c !== a)
          return !1;
      } else if (a.operator === "<=" && !Cr(a.semver, String(_), r))
        return !1;
    }
    if (!_.operator && (a || s) && i !== 0)
      return !1;
  }
  return !(s && d && !a && i !== 0 || a && l && !s && i !== 0 || P || h);
}, dc = (e, t, r) => {
  if (!e)
    return t;
  const n = Qo(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, fc = (e, t, r) => {
  if (!e)
    return t;
  const n = Qo(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var rE = xw;
const Ns = nn, hc = as, nE = ke, mc = Ou, sE = Or, aE = dv, oE = mv, iE = $v, cE = _v, lE = wv, uE = bv, dE = Ov, fE = Tv, hE = tt, mE = Cv, pE = Lv, $E = Ho, yE = Uv, _E = Gv, gE = is, vE = Bo, wE = Ru, EE = Iu, SE = Wo, bE = Jo, PE = Tu, NE = hw, OE = cs(), RE = rt(), IE = ls, TE = vw, jE = bw, AE = Rw, kE = jw, CE = Cw, DE = Xo, ME = Gw, LE = Ww, FE = Xw, VE = Zw, zE = rE;
var UE = {
  parse: sE,
  valid: aE,
  clean: oE,
  inc: iE,
  diff: cE,
  major: lE,
  minor: uE,
  patch: dE,
  prerelease: fE,
  compare: hE,
  rcompare: mE,
  compareLoose: pE,
  compareBuild: $E,
  sort: yE,
  rsort: _E,
  gt: gE,
  lt: vE,
  eq: wE,
  neq: EE,
  gte: SE,
  lte: bE,
  cmp: PE,
  coerce: NE,
  Comparator: OE,
  Range: RE,
  satisfies: IE,
  toComparators: TE,
  maxSatisfying: jE,
  minSatisfying: AE,
  minVersion: kE,
  validRange: CE,
  outside: DE,
  gtr: ME,
  ltr: LE,
  intersects: FE,
  simplifyRange: VE,
  subset: zE,
  SemVer: nE,
  re: Ns.re,
  src: Ns.src,
  tokens: Ns.t,
  SEMVER_SPEC_VERSION: hc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: hc.RELEASE_TYPES,
  compareIdentifiers: mc.compareIdentifiers,
  rcompareIdentifiers: mc.rcompareIdentifiers
}, us = { exports: {} }, Zo = { exports: {} };
const Au = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
Zo.exports = Au;
Zo.exports.default = Au;
var qE = Zo.exports;
const KE = qE, Hn = /* @__PURE__ */ new WeakMap(), ku = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...i) {
    if (Hn.set(a, ++n), n === 1)
      r = e.apply(this, i), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return KE(a, e), Hn.set(a, n), a;
};
us.exports = ku;
us.exports.default = ku;
us.exports.callCount = (e) => {
  if (!Hn.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Hn.get(e);
};
var GE = us.exports;
(function(e, t) {
  var r = sn && sn.__classPrivateFieldSet || function(D, O, I, v, p) {
    if (v === "m") throw new TypeError("Private method is not writable");
    if (v === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
    if (typeof O == "function" ? D !== O || !p : !O.has(D)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return v === "a" ? p.call(D, I) : p ? p.value = I : O.set(D, I), I;
  }, n = sn && sn.__classPrivateFieldGet || function(D, O, I, v) {
    if (I === "a" && !v) throw new TypeError("Private accessor was defined without a getter");
    if (typeof O == "function" ? D !== O || !v : !O.has(D)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return I === "m" ? v : I === "a" ? v.call(D) : v ? v.value : O.get(D);
  }, s, a, i, u, c, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const l = wc, h = Ys, P = tr, _ = qu, E = Ku, g = Gu, y = Qu, m = cd, w = fd, N = ot, R = N$, T = Fg, U = Xg, B = UE, de = GE, V = "aes-256-cbc", H = () => /* @__PURE__ */ Object.create(null), se = (D) => D != null;
  let Q = "";
  try {
    delete require.cache[__filename], Q = P.dirname((a = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && a !== void 0 ? a : ".");
  } catch {
  }
  const fe = (D, O) => {
    const I = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), v = typeof O;
    if (I.has(v))
      throw new TypeError(`Setting a value of type \`${v}\` for key \`${D}\` is not allowed as it's not supported by JSON`);
  }, C = "__internal__", k = `${C}.migrations.version`;
  class z {
    constructor(O = {}) {
      var I;
      i.set(this, void 0), u.set(this, void 0), c.set(this, void 0), d.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
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
        (0, T.default)(f);
        const b = {
          type: "object",
          properties: v.schema
        };
        r(this, i, f.compile(b), "f");
        for (const [j, A] of Object.entries(v.schema))
          A != null && A.default && (n(this, d, "f")[j] = A.default);
      }
      v.defaults && r(this, d, {
        ...n(this, d, "f"),
        ...v.defaults
      }, "f"), v.serialize && (this._serialize = v.serialize), v.deserialize && (this._deserialize = v.deserialize), this.events = new g.EventEmitter(), r(this, u, v.encryptionKey, "f");
      const S = v.fileExtension ? `.${v.fileExtension}` : "";
      this.path = P.resolve(v.cwd, `${(I = v.configName) !== null && I !== void 0 ? I : "config"}${S}`);
      const $ = this.store, o = Object.assign(H(), v.defaults, $);
      this._validate(o);
      try {
        E.deepEqual($, o);
      } catch {
        this.store = o;
      }
      if (v.watch && this._watch(), v.migrations) {
        if (v.projectVersion || (v.projectVersion = p().version), !v.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(v.migrations, v.projectVersion, v.beforeEachMigration);
      }
    }
    get(O, I) {
      if (n(this, c, "f").accessPropertiesByDotNotation)
        return this._get(O, I);
      const { store: v } = this;
      return O in v ? v[O] : I;
    }
    set(O, I) {
      if (typeof O != "string" && typeof O != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof O}`);
      if (typeof O != "object" && I === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(O))
        throw new TypeError(`Please don't use the ${C} key, as it's used to manage this module internal operations.`);
      const { store: v } = this, p = (S, $) => {
        fe(S, $), n(this, c, "f").accessPropertiesByDotNotation ? y.set(v, S, $) : v[S] = $;
      };
      if (typeof O == "object") {
        const S = O;
        for (const [$, o] of Object.entries(S))
          p($, o);
      } else
        p(O, I);
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
      for (const I of O)
        se(n(this, d, "f")[I]) && this.set(I, n(this, d, "f")[I]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(O) {
      const { store: I } = this;
      n(this, c, "f").accessPropertiesByDotNotation ? y.delete(I, O) : delete I[O], this.store = I;
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
    onDidChange(O, I) {
      if (typeof O != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof O}`);
      if (typeof I != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof I}`);
      return this._handleChange(() => this.get(O), I);
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
        const O = h.readFileSync(this.path, n(this, u, "f") ? null : "utf8"), I = this._encryptData(O), v = this._deserialize(I);
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
    *[(i = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [O, I] of Object.entries(this.store))
        yield [O, I];
    }
    _encryptData(O) {
      if (!n(this, u, "f"))
        return O.toString();
      try {
        if (n(this, u, "f"))
          try {
            if (O.slice(16, 17).toString() === ":") {
              const I = O.slice(0, 16), v = _.pbkdf2Sync(n(this, u, "f"), I.toString(), 1e4, 32, "sha512"), p = _.createDecipheriv(V, v, I);
              O = Buffer.concat([p.update(Buffer.from(O.slice(17))), p.final()]).toString("utf8");
            } else {
              const I = _.createDecipher(V, n(this, u, "f"));
              O = Buffer.concat([I.update(Buffer.from(O)), I.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return O.toString();
    }
    _handleChange(O, I) {
      let v = O();
      const p = () => {
        const S = v, $ = O();
        (0, l.isDeepStrictEqual)($, S) || (v = $, I.call(this, $, S));
      };
      return this.events.on("change", p), () => this.events.removeListener("change", p);
    }
    _validate(O) {
      if (!n(this, i, "f") || n(this, i, "f").call(this, O) || !n(this, i, "f").errors)
        return;
      const v = n(this, i, "f").errors.map(({ instancePath: p, message: S = "" }) => `\`${p.slice(1)}\` ${S}`);
      throw new Error("Config schema violation: " + v.join("; "));
    }
    _ensureDirectory() {
      h.mkdirSync(P.dirname(this.path), { recursive: !0 });
    }
    _write(O) {
      let I = this._serialize(O);
      if (n(this, u, "f")) {
        const v = _.randomBytes(16), p = _.pbkdf2Sync(n(this, u, "f"), v.toString(), 1e4, 32, "sha512"), S = _.createCipheriv(V, p, v);
        I = Buffer.concat([v, Buffer.from(":"), S.update(Buffer.from(I)), S.final()]);
      }
      if (process.env.SNAP)
        h.writeFileSync(this.path, I, { mode: n(this, c, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, I, { mode: n(this, c, "f").configFileMode });
        } catch (v) {
          if ((v == null ? void 0 : v.code) === "EXDEV") {
            h.writeFileSync(this.path, I, { mode: n(this, c, "f").configFileMode });
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
    _migrate(O, I, v) {
      let p = this._get(k, "0.0.0");
      const S = Object.keys(O).filter((o) => this._shouldPerformMigration(o, p, I));
      let $ = { ...this.store };
      for (const o of S)
        try {
          v && v(this, {
            fromVersion: p,
            toVersion: o,
            finalVersion: I,
            versions: S
          });
          const f = O[o];
          f(this), this._set(k, o), p = o, $ = { ...this.store };
        } catch (f) {
          throw this.store = $, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(p) || !B.eq(p, I)) && this._set(k, I);
    }
    _containsReservedKey(O) {
      return typeof O == "object" && Object.keys(O)[0] === C ? !0 : typeof O != "string" ? !1 : n(this, c, "f").accessPropertiesByDotNotation ? !!O.startsWith(`${C}.`) : !1;
    }
    _isVersionInRangeFormat(O) {
      return B.clean(O) === null;
    }
    _shouldPerformMigration(O, I, v) {
      return this._isVersionInRangeFormat(O) ? I !== "0.0.0" && B.satisfies(I, O) ? !1 : B.satisfies(v, O) : !(B.lte(O, I) || B.gt(O, v));
    }
    _get(O, I) {
      return y.get(this.store, O, I);
    }
    _set(O, I) {
      const { store: v } = this;
      y.set(v, O, I), this.store = v;
    }
  }
  t.default = z, e.exports = z, e.exports.default = z;
})(Os, Os.exports);
var HE = Os.exports;
const pc = tr, { app: Cn, ipcMain: Ws, ipcRenderer: $c, shell: BE } = Fu, WE = HE;
let yc = !1;
const _c = () => {
  if (!Ws || !Cn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Cn.getPath("userData"),
    appVersion: Cn.getVersion()
  };
  return yc || (Ws.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), yc = !0), e;
};
class JE extends WE {
  constructor(t) {
    let r, n;
    if ($c) {
      const s = $c.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else Ws && Cn && ({ defaultCwd: r, appVersion: n } = _c());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = pc.isAbsolute(t.cwd) ? t.cwd : pc.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    _c();
  }
  async openInEditor() {
    const t = await BE.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var XE = JE;
const YE = /* @__PURE__ */ Wu(XE), Cu = zu(import.meta.url), Js = Ge.dirname(Uu(import.meta.url));
process.env.APP_ROOT = Ge.join(Js, "..");
const Xs = process.env.VITE_DEV_SERVER_URL, p1 = Ge.join(process.env.APP_ROOT, "dist-electron"), Du = Ge.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Xs ? Ge.join(process.env.APP_ROOT, "public") : Du;
const Ae = new YE({
  defaults: {
    downloadPath: mr.getPath("downloads"),
    autoAcceptTransfers: !1,
    theme: "light",
    windowBounds: { width: 1200, height: 800 },
    deviceName: Cu("os").hostname() || "Desktop",
    folderSizeLimit: 10 * 1024 * 1024 * 1024,
    // 10GB default limit
    enableFolderSizeLimit: !1
  }
});
let ne = null;
function Mu() {
  const { width: e, height: t } = Ae.get("windowBounds");
  ne = new gc({
    width: e,
    height: t,
    minWidth: 900,
    minHeight: 600,
    icon: Ge.join(process.env.VITE_PUBLIC || Js, "electron-vite.svg"),
    webPreferences: {
      preload: Ge.join(Js, "preload.mjs"),
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
    ne && Ae.set("windowBounds", ne.getBounds());
  }), ne.on("move", () => {
    ne && Ae.set("windowBounds", ne.getBounds());
  }), ne.webContents.on("did-finish-load", () => {
    ne == null || ne.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Xs ? ne.loadURL(Xs) : ne.loadFile(Ge.join(Du, "index.html"));
}
mr.on("window-all-closed", () => {
  process.platform !== "darwin" && (mr.quit(), ne = null);
});
mr.on("activate", () => {
  gc.getAllWindows().length === 0 && Mu();
});
mr.whenReady().then(() => {
  Mu();
});
He.handle("store:get", (e, t) => Ae.get(t));
He.handle("store:set", (e, t, r) => (Ae.set(t, r), !0));
He.handle("store:delete", (e, t) => (Ae.delete(t), !0));
He.handle("fs:select-download-folder", async () => {
  if (!ne) return null;
  const e = await Vu.showOpenDialog(ne, {
    properties: ["openDirectory"],
    title: "Select Download Folder"
  });
  if (!e.canceled && e.filePaths.length > 0) {
    const t = e.filePaths[0];
    return Ae.set("downloadPath", t), t;
  }
  return null;
});
He.handle("fs:get-download-path", () => Ae.get("downloadPath"));
He.handle("fs:open-file", async (e, t) => {
  try {
    return await vc.openPath(t), !0;
  } catch (r) {
    return console.error("Failed to open file:", r), !1;
  }
});
He.handle("fs:show-in-folder", async (e, t) => {
  try {
    return vc.showItemInFolder(t), !0;
  } catch (r) {
    return console.error("Failed to show file in folder:", r), !1;
  }
});
const QE = async (e) => {
  var t, r;
  try {
    if (process.platform === "win32")
      try {
        const { exec: n } = Cu("child_process"), s = Bu(n), a = Ge.parse(e).root.replace("\\", ""), { stdout: i } = await s(`wmic logicaldisk where caption="${a}" get size,freespace /value`), u = i.split(`
`).filter((l) => l.trim().includes("="));
        let c = 0, d = 0;
        for (const l of u) {
          const h = l.trim();
          h.startsWith("Size=") ? c = parseInt(h.split("=")[1]) || 0 : h.startsWith("FreeSpace=") && (d = parseInt(h.split("=")[1]) || 0);
        }
        if (c > 0)
          return { total: c, free: d, used: c - d };
      } catch (n) {
        console.log("Windows disk space detection failed:", n);
      }
    try {
      const n = await ((r = (t = Jr.promises) == null ? void 0 : t.statfs) == null ? void 0 : r.call(t, e));
      if (n && n.blocks && n.frsize) {
        const s = n.blocks * n.frsize, a = n.bavail * n.frsize, i = s - a;
        if (s > 0)
          return { total: s, free: a, used: i };
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
}, Lu = async (e) => {
  let t = 0;
  try {
    const r = await Jr.promises.readdir(e, { withFileTypes: !0 });
    for (const n of r) {
      const s = Ge.join(e, n.name);
      if (n.isDirectory())
        t += await Lu(s);
      else
        try {
          const a = await Jr.promises.stat(s);
          t += a.size;
        } catch {
        }
    }
  } catch {
  }
  return t;
};
He.handle("fs:get-storage-info", async () => {
  try {
    const e = Ae.get("downloadPath"), t = Ae.get("folderSizeLimit") || 10 * 1024 * 1024 * 1024, r = Ae.get("enableFolderSizeLimit");
    console.log("Getting storage info for:", e);
    const n = await QE(e);
    console.log("Disk usage:", n);
    const s = await Lu(e);
    console.log("Folder size:", s);
    const a = r && t > 0 ? Math.min(s / t * 100, 100) : 0, i = {
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
    return console.log("Storage info result:", i), i;
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
        limit: Ae.get("folderSizeLimit") || t,
        limitEnabled: Ae.get("enableFolderSizeLimit") || !1,
        percentUsed: 0
      },
      path: Ae.get("downloadPath") || mr.getPath("downloads")
    };
  }
});
He.handle("fs:analyze-files", async () => {
  try {
    const e = Ae.get("downloadPath"), t = {
      documents: { count: 0, size: 0 },
      photos: { count: 0, size: 0 },
      videos: { count: 0, size: 0 },
      sound: { count: 0, size: 0 },
      other: { count: 0, size: 0 }
    }, r = async (n) => {
      try {
        const s = await Jr.promises.readdir(n, { withFileTypes: !0 });
        for (const a of s) {
          const i = Ge.join(n, a.name);
          if (a.isDirectory())
            await r(i);
          else {
            const u = await Jr.promises.stat(i), c = Ge.extname(a.name).toLowerCase();
            [".pdf", ".doc", ".docx", ".txt", ".rtf"].includes(c) ? (t.documents.count++, t.documents.size += u.size) : [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"].includes(c) ? (t.photos.count++, t.photos.size += u.size) : [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"].includes(c) ? (t.videos.count++, t.videos.size += u.size) : [".mp3", ".wav", ".flac", ".aac", ".ogg"].includes(c) ? (t.sound.count++, t.sound.size += u.size) : (t.other.count++, t.other.size += u.size);
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
He.handle("window:minimize", () => {
  ne == null || ne.minimize();
});
He.handle("window:maximize", () => {
  ne != null && ne.isMaximized() ? ne.unmaximize() : ne == null || ne.maximize();
});
He.handle("window:close", () => {
  ne == null || ne.close();
});
export {
  p1 as MAIN_DIST,
  Du as RENDERER_DIST,
  Xs as VITE_DEV_SERVER_URL
};
