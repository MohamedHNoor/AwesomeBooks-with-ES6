/* eslint-disable */
class t extends Error {}
class z extends t {
  constructor(t) {
    super('Invalid DateTime: ' + t.toMessage());
  }
}
class A extends t {
  constructor(t) {
    super('Invalid Interval: ' + t.toMessage());
  }
}
class q extends t {
  constructor(t) {
    super('Invalid Duration: ' + t.toMessage());
  }
}
class j extends t {}
class _ extends t {
  constructor(t) {
    super('Invalid unit ' + t);
  }
}
class o extends t {}
class r extends t {
  constructor() {
    super('Zone is an abstract class');
  }
}
var e = 'numeric',
  n = 'short',
  s = 'long';
const U = { year: e, month: e, day: e },
  $ = { year: e, month: n, day: e },
  H = { year: e, month: n, day: e, weekday: n },
  W = { year: e, month: s, day: e },
  R = { year: e, month: s, day: e, weekday: s },
  Y = { hour: e, minute: e },
  J = { hour: e, minute: e, second: e },
  P = { hour: e, minute: e, second: e, timeZoneName: n },
  G = { hour: e, minute: e, second: e, timeZoneName: s },
  B = { hour: e, minute: e, hourCycle: 'h23' },
  Q = { hour: e, minute: e, second: e, hourCycle: 'h23' },
  K = { hour: e, minute: e, second: e, hourCycle: 'h23', timeZoneName: n },
  X = { hour: e, minute: e, second: e, hourCycle: 'h23', timeZoneName: s },
  tt = { year: e, month: e, day: e, hour: e, minute: e },
  et = { year: e, month: e, day: e, hour: e, minute: e, second: e },
  rt = { year: e, month: n, day: e, hour: e, minute: e },
  nt = { year: e, month: n, day: e, hour: e, minute: e, second: e },
  st = { year: e, month: n, day: e, weekday: n, hour: e, minute: e },
  it = { year: e, month: s, day: e, hour: e, minute: e, timeZoneName: n },
  at = {
    year: e,
    month: s,
    day: e,
    hour: e,
    minute: e,
    second: e,
    timeZoneName: n
  },
  ot = {
    year: e,
    month: s,
    day: e,
    weekday: s,
    hour: e,
    minute: e,
    timeZoneName: s
  },
  ut = {
    year: e,
    month: s,
    day: e,
    weekday: s,
    hour: e,
    minute: e,
    second: e,
    timeZoneName: s
  };
class i {
  get type() {
    throw new r();
  }
  get name() {
    throw new r();
  }
  get ianaName() {
    return this.name;
  }
  get isUniversal() {
    throw new r();
  }
  offsetName(t, e) {
    throw new r();
  }
  formatOffset(t, e) {
    throw new r();
  }
  offset(t) {
    throw new r();
  }
  equals(t) {
    throw new r();
  }
  get isValid() {
    throw new r();
  }
}
let lt = null;
class ct extends i {
  static get instance() {
    return (lt = null === lt ? new ct() : lt);
  }
  get type() {
    return 'system';
  }
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  get isUniversal() {
    return !1;
  }
  offsetName(t, { format: e, locale: r }) {
    return se(t, e, r);
  }
  formatOffset(t, e) {
    return ue(this.offset(t), e);
  }
  offset(t) {
    return -new Date(t).getTimezoneOffset();
  }
  equals(t) {
    return 'system' === t.type;
  }
  get isValid() {
    return !0;
  }
}
let ht = {};
function dt(t) {
  return (
    ht[t] ||
      (ht[t] = new Intl.DateTimeFormat('en-US', {
        hour12: !1,
        timeZone: t,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        era: 'short'
      })),
    ht[t]
  );
}
const mt = { year: 0, month: 1, day: 2, era: 3, hour: 4, minute: 5, second: 6 };
function ft(t, e) {
  var t = t.format(e).replace(/\u200E/g, ''),
    [, e, t, r, n, s, i, a] =
      /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(t);
  return [r, e, t, n, s, i, a];
}
function yt(t, e) {
  var r = t.formatToParts(e);
  const n = [];
  for (let t = 0; t < r.length; t++) {
    var { type: s, value: i } = r[t],
      a = mt[s];
    'era' === s ? (n[a] = i) : M(a) || (n[a] = parseInt(i, 10));
  }
  return n;
}
let gt = {};
class c extends i {
  static create(t) {
    return gt[t] || (gt[t] = new c(t)), gt[t];
  }
  static resetCache() {
    (gt = {}), (ht = {});
  }
  static isValidSpecifier(t) {
    return this.isValidZone(t);
  }
  static isValidZone(t) {
    if (!t) return !1;
    try {
      return new Intl.DateTimeFormat('en-US', { timeZone: t }).format(), !0;
    } catch (t) {
      return !1;
    }
  }
  constructor(t) {
    super(), (this.zoneName = t), (this.valid = c.isValidZone(t));
  }
  get type() {
    return 'iana';
  }
  get name() {
    return this.zoneName;
  }
  get isUniversal() {
    return !1;
  }
  offsetName(t, { format: e, locale: r }) {
    return se(t, e, r, this.name);
  }
  formatOffset(t, e) {
    return ue(this.offset(t), e);
  }
  offset(t) {
    t = new Date(t);
    if (isNaN(t)) return NaN;
    var e = dt(this.name);
    let [r, n, s, i, a, o, u] = (e.formatToParts ? yt : ft)(e, t);
    (e = +t), (t = e % 1e3);
    return (
      (ee({
        year: (r = 'BC' === i ? 1 - Math.abs(r) : r),
        month: n,
        day: s,
        hour: 24 === a ? 0 : a,
        minute: o,
        second: u,
        millisecond: 0
      }) -
        (e -= 0 <= t ? t : 1e3 + t)) /
      6e4
    );
  }
  equals(t) {
    return 'iana' === t.type && t.name === this.name;
  }
  get isValid() {
    return this.valid;
  }
}
let wt = {};
function vt(t, e = {}) {
  var r = JSON.stringify([t, e]);
  let n = wt[r];
  return n || ((n = new Intl.ListFormat(t, e)), (wt[r] = n)), n;
}
let pt = {};
function Tt(t, e = {}) {
  var r = JSON.stringify([t, e]);
  let n = pt[r];
  return n || ((n = new Intl.DateTimeFormat(t, e)), (pt[r] = n)), n;
}
let St = {};
function Ot(t, e = {}) {
  var r = JSON.stringify([t, e]);
  let n = St[r];
  return n || ((n = new Intl.NumberFormat(t, e)), (St[r] = n)), n;
}
let bt = {};
function kt(t, e = {}) {
  const { base: r, ...n } = e;
  var s = JSON.stringify([t, n]);
  let i = bt[s];
  return i || ((i = new Intl.RelativeTimeFormat(t, e)), (bt[s] = i)), i;
}
let Mt = null;
function Nt() {
  return (Mt = Mt || new Intl.DateTimeFormat().resolvedOptions().locale);
}
function Dt(t) {
  var r = t.indexOf('-u-');
  if (-1 === r) return [t];
  {
    let e;
    r = t.substring(0, r);
    try {
      e = Tt(t).resolvedOptions();
    } catch (t) {
      e = Tt(r).resolvedOptions();
    }
    var { numberingSystem: t, calendar: n } = e;
    return [r, t, n];
  }
}
function Et(t, e, r) {
  return (
    (r || e) && ((t += '-u'), r && (t += '-ca-' + r), e && (t += '-nu-' + e)), t
  );
}
function Vt(e) {
  const r = [];
  for (let t = 1; t <= 12; t++) {
    var n = L.utc(2016, t, 1);
    r.push(e(n));
  }
  return r;
}
function xt(e) {
  const r = [];
  for (let t = 1; t <= 7; t++) {
    var n = L.utc(2016, 11, 13 + t);
    r.push(e(n));
  }
  return r;
}
function It(t, e, r, n, s) {
  t = t.listingMode(r);
  return 'error' === t ? null : ('en' === t ? n : s)(e);
}
function Ct(t) {
  return (
    (!t.numberingSystem || 'latn' === t.numberingSystem) &&
    ('latn' === t.numberingSystem ||
      !t.locale ||
      t.locale.startsWith('en') ||
      'latn' ===
        new Intl.DateTimeFormat(t.intl).resolvedOptions().numberingSystem)
  );
}
class Ft {
  constructor(t, e, r) {
    (this.padTo = r.padTo || 0), (this.floor = r.floor || !1);
    const { padTo: n, floor: s, ...i } = r;
    if (!e || 0 < Object.keys(i).length) {
      const a = { useGrouping: !1, ...r };
      0 < r.padTo && (a.minimumIntegerDigits = r.padTo), (this.inf = Ot(t, a));
    }
  }
  format(t) {
    var e;
    return this.inf
      ? ((e = this.floor ? Math.floor(t) : t), this.inf.format(e))
      : l(this.floor ? Math.floor(t) : Qt(t, 3), this.padTo);
  }
}
class Zt {
  constructor(t, e, r) {
    this.opts = r;
    let n;
    var s;
    t.zone.isUniversal
      ? ((s = 0 <= (s = (t.offset / 60) * -1) ? 'Etc/GMT+' + s : 'Etc/GMT' + s),
        0 !== t.offset && c.create(s).valid
          ? ((n = s), (this.dt = t))
          : ((n = 'UTC'),
            r.timeZoneName
              ? (this.dt = t)
              : (this.dt =
                  0 === t.offset
                    ? t
                    : L.fromMillis(t.ts + 60 * t.offset * 1e3))))
      : 'system' === t.zone.type
      ? (this.dt = t)
      : ((this.dt = t), (n = t.zone.name));
    const i = { ...this.opts };
    n && (i.timeZone = n), (this.dtf = Tt(e, i));
  }
  format() {
    return this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    return this.dtf.formatToParts(this.dt.toJSDate());
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class Lt {
  constructor(t, e, r) {
    (this.opts = { style: 'long', ...r }), !e && Jt() && (this.rtf = kt(t, r));
  }
  format(t, e) {
    return this.rtf
      ? this.rtf.format(t, e)
      : De(e, t, this.opts.numeric, 'long' !== this.opts.style);
  }
  formatToParts(t, e) {
    return this.rtf ? this.rtf.formatToParts(t, e) : [];
  }
}
class O {
  static fromOpts(t) {
    return O.create(
      t.locale,
      t.numberingSystem,
      t.outputCalendar,
      t.defaultToEN
    );
  }
  static create(t, e, r, n = !1) {
    (t = t || k.defaultLocale),
      (n = t || (n ? 'en-US' : Nt())),
      (e = e || k.defaultNumberingSystem),
      (r = r || k.defaultOutputCalendar);
    return new O(n, e, r, t);
  }
  static resetCache() {
    (Mt = null), (pt = {}), (St = {}), (bt = {});
  }
  static fromObject({ locale: t, numberingSystem: e, outputCalendar: r } = {}) {
    return O.create(t, e, r);
  }
  constructor(t, e, r, n) {
    var [t, s, i] = Dt(t);
    (this.locale = t),
      (this.numberingSystem = e || s || null),
      (this.outputCalendar = r || i || null),
      (this.intl = Et(this.locale, this.numberingSystem, this.outputCalendar)),
      (this.weekdaysCache = { format: {}, standalone: {} }),
      (this.monthsCache = { format: {}, standalone: {} }),
      (this.meridiemCache = null),
      (this.eraCache = {}),
      (this.specifiedLocale = n),
      (this.fastNumbersCached = null);
  }
  get fastNumbers() {
    return (
      null == this.fastNumbersCached && (this.fastNumbersCached = Ct(this)),
      this.fastNumbersCached
    );
  }
  listingMode() {
    var t = this.isEnglish(),
      e = !(
        (null !== this.numberingSystem && 'latn' !== this.numberingSystem) ||
        (null !== this.outputCalendar && 'gregory' !== this.outputCalendar)
      );
    return t && e ? 'en' : 'intl';
  }
  clone(t) {
    return t && 0 !== Object.getOwnPropertyNames(t).length
      ? O.create(
          t.locale || this.specifiedLocale,
          t.numberingSystem || this.numberingSystem,
          t.outputCalendar || this.outputCalendar,
          t.defaultToEN || !1
        )
      : this;
  }
  redefaultToEN(t = {}) {
    return this.clone({ ...t, defaultToEN: !0 });
  }
  redefaultToSystem(t = {}) {
    return this.clone({ ...t, defaultToEN: !1 });
  }
  months(r, n = !1, t = !0) {
    return It(this, r, t, me, () => {
      const e = n ? { month: r, day: 'numeric' } : { month: r },
        t = n ? 'format' : 'standalone';
      return (
        this.monthsCache[t][r] ||
          (this.monthsCache[t][r] = Vt((t) => this.extract(t, e, 'month'))),
        this.monthsCache[t][r]
      );
    });
  }
  weekdays(r, n = !1, t = !0) {
    return It(this, r, t, we, () => {
      const e = n
          ? { weekday: r, year: 'numeric', month: 'long', day: 'numeric' }
          : { weekday: r },
        t = n ? 'format' : 'standalone';
      return (
        this.weekdaysCache[t][r] ||
          (this.weekdaysCache[t][r] = xt((t) => this.extract(t, e, 'weekday'))),
        this.weekdaysCache[t][r]
      );
    });
  }
  meridiems(t = !0) {
    return It(
      this,
      void 0,
      t,
      () => ve,
      () => {
        if (!this.meridiemCache) {
          const e = { hour: 'numeric', hourCycle: 'h12' };
          this.meridiemCache = [
            L.utc(2016, 11, 13, 9),
            L.utc(2016, 11, 13, 19)
          ].map((t) => this.extract(t, e, 'dayperiod'));
        }
        return this.meridiemCache;
      }
    );
  }
  eras(t, e = !0) {
    return It(this, t, e, Oe, () => {
      const e = { era: t };
      return (
        this.eraCache[t] ||
          (this.eraCache[t] = [L.utc(-40, 1, 1), L.utc(2017, 1, 1)].map((t) =>
            this.extract(t, e, 'era')
          )),
        this.eraCache[t]
      );
    });
  }
  extract(t, e, r) {
    const n = this.dtFormatter(t, e),
      s = n.formatToParts(),
      i = s.find((t) => t.type.toLowerCase() === r);
    return i ? i.value : null;
  }
  numberFormatter(t = {}) {
    return new Ft(this.intl, t.forceSimple || this.fastNumbers, t);
  }
  dtFormatter(t, e = {}) {
    return new Zt(t, this.intl, e);
  }
  relFormatter(t = {}) {
    return new Lt(this.intl, this.isEnglish(), t);
  }
  listFormatter(t = {}) {
    return vt(this.intl, t);
  }
  isEnglish() {
    return (
      'en' === this.locale ||
      'en-us' === this.locale.toLowerCase() ||
      new Intl.DateTimeFormat(this.intl)
        .resolvedOptions()
        .locale.startsWith('en-us')
    );
  }
  equals(t) {
    return (
      this.locale === t.locale &&
      this.numberingSystem === t.numberingSystem &&
      this.outputCalendar === t.outputCalendar
    );
  }
}
let zt = null;
class d extends i {
  static get utcInstance() {
    return (zt = null === zt ? new d(0) : zt);
  }
  static instance(t) {
    return 0 === t ? d.utcInstance : new d(t);
  }
  static parseSpecifier(t) {
    if (t) {
      t = t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (t) return new d(ie(t[1], t[2]));
    }
    return null;
  }
  constructor(t) {
    super(), (this.fixed = t);
  }
  get type() {
    return 'fixed';
  }
  get name() {
    return 0 === this.fixed ? 'UTC' : 'UTC' + ue(this.fixed, 'narrow');
  }
  get ianaName() {
    return 0 === this.fixed ? 'Etc/UTC' : 'Etc/GMT' + ue(-this.fixed, 'narrow');
  }
  offsetName() {
    return this.name;
  }
  formatOffset(t, e) {
    return ue(this.fixed, e);
  }
  get isUniversal() {
    return !0;
  }
  offset() {
    return this.fixed;
  }
  equals(t) {
    return 'fixed' === t.type && t.fixed === this.fixed;
  }
  get isValid() {
    return !0;
  }
}
class At extends i {
  constructor(t) {
    super(), (this.zoneName = t);
  }
  get type() {
    return 'invalid';
  }
  get name() {
    return this.zoneName;
  }
  get isUniversal() {
    return !1;
  }
  offsetName() {
    return null;
  }
  formatOffset() {
    return '';
  }
  offset() {
    return NaN;
  }
  equals() {
    return !1;
  }
  get isValid() {
    return !1;
  }
}
function b(t, e) {
  var r;
  return M(t) || null === t
    ? e
    : t instanceof i
    ? t
    : 'string' == typeof t
    ? 'default' === (r = t.toLowerCase())
      ? e
      : 'local' === r || 'system' === r
      ? ct.instance
      : 'utc' === r || 'gmt' === r
      ? d.utcInstance
      : d.parseSpecifier(r) || c.create(t)
    : h(t)
    ? d.instance(t)
    : 'object' == typeof t && t.offset && 'number' == typeof t.offset
    ? t
    : new At(t);
}
let qt = () => Date.now(),
  jt = 'system',
  _t = null,
  Ut = null,
  $t = null,
  Ht = 60,
  Wt;
class k {
  static get now() {
    return qt;
  }
  static set now(t) {
    qt = t;
  }
  static set defaultZone(t) {
    jt = t;
  }
  static get defaultZone() {
    return b(jt, ct.instance);
  }
  static get defaultLocale() {
    return _t;
  }
  static set defaultLocale(t) {
    _t = t;
  }
  static get defaultNumberingSystem() {
    return Ut;
  }
  static set defaultNumberingSystem(t) {
    Ut = t;
  }
  static get defaultOutputCalendar() {
    return $t;
  }
  static set defaultOutputCalendar(t) {
    $t = t;
  }
  static get twoDigitCutoffYear() {
    return Ht;
  }
  static set twoDigitCutoffYear(t) {
    Ht = t % 100;
  }
  static get throwOnInvalid() {
    return Wt;
  }
  static set throwOnInvalid(t) {
    Wt = t;
  }
  static resetCaches() {
    O.resetCache(), c.resetCache();
  }
}
function M(t) {
  return void 0 === t;
}
function h(t) {
  return 'number' == typeof t;
}
function Rt(t) {
  return 'number' == typeof t && t % 1 == 0;
}
function Yt(t) {
  return '[object Date]' === Object.prototype.toString.call(t);
}
function Jt() {
  try {
    return 'undefined' != typeof Intl && !!Intl.RelativeTimeFormat;
  } catch (t) {
    return !1;
  }
}
function Pt(t) {
  return Array.isArray(t) ? t : [t];
}
function Gt(t, r, n) {
  if (0 !== t.length)
    return t.reduce((t, e) => {
      e = [r(e), e];
      return t && n(t[0], e[0]) === t[0] ? t : e;
    }, null)[1];
}
function m(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function u(t, e, r) {
  return Rt(t) && e <= t && t <= r;
}
function l(t, e = 2) {
  let r;
  return (r =
    t < 0 ? '-' + ('' + -t).padStart(e, '0') : ('' + t).padStart(e, '0'));
}
function f(t) {
  if (!M(t) && null !== t && '' !== t) return parseInt(t, 10);
}
function y(t) {
  if (!M(t) && null !== t && '' !== t) return parseFloat(t);
}
function Bt(t) {
  if (!M(t) && null !== t && '' !== t)
    return (t = 1e3 * parseFloat('0.' + t)), Math.floor(t);
}
function Qt(t, e, r = !1) {
  const n = 10 ** e,
    s = r ? Math.trunc : Math.round;
  return s(t * n) / n;
}
function Kt(t) {
  return t % 4 == 0 && (t % 100 != 0 || t % 400 == 0);
}
function Xt(t) {
  return Kt(t) ? 366 : 365;
}
function te(t, e) {
  var r,
    n = (n = e - 1) - (r = 12) * Math.floor(n / r) + 1;
  return 2 == n
    ? Kt(t + (e - n) / 12)
      ? 29
      : 28
    : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n - 1];
}
function ee(t) {
  let e = Date.UTC(
    t.year,
    t.month - 1,
    t.day,
    t.hour,
    t.minute,
    t.second,
    t.millisecond
  );
  return (
    t.year < 100 &&
      0 <= t.year &&
      (e = new Date(e)).setUTCFullYear(e.getUTCFullYear() - 1900),
    +e
  );
}
function re(t) {
  var e =
      (t + Math.floor(t / 4) - Math.floor(t / 100) + Math.floor(t / 400)) % 7,
    t = t - 1,
    t = (t + Math.floor(t / 4) - Math.floor(t / 100) + Math.floor(t / 400)) % 7;
  return 4 == e || 3 == t ? 53 : 52;
}
function ne(t) {
  return 99 < t ? t : t > k.twoDigitCutoffYear ? 1900 + t : 2e3 + t;
}
function se(t, e, r, n = null) {
  const s = new Date(t),
    i = {
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
  n && (i.timeZone = n);
  (t = { timeZoneName: e, ...i }),
    (n = new Intl.DateTimeFormat(r, t)
      .formatToParts(s)
      .find((t) => 'timezonename' === t.type.toLowerCase()));
  return n ? n.value : null;
}
function ie(t, e) {
  let r = parseInt(t, 10);
  Number.isNaN(r) && (r = 0);
  (t = parseInt(e, 10) || 0), (e = r < 0 || Object.is(r, -0) ? -t : t);
  return 60 * r + e;
}
function ae(t) {
  var e = Number(t);
  if ('boolean' == typeof t || '' === t || Number.isNaN(e))
    throw new o('Invalid unit value ' + t);
  return e;
}
function oe(t, e) {
  const r = {};
  for (const s in t) {
    var n;
    !m(t, s) || (null != (n = t[s]) && (r[e(s)] = ae(n)));
  }
  return r;
}
function ue(t, e) {
  var r = Math.trunc(Math.abs(t / 60)),
    n = Math.trunc(Math.abs(t % 60)),
    s = 0 <= t ? '+' : '-';
  switch (e) {
    case 'short':
      return s + l(r, 2) + ':' + l(n, 2);
    case 'narrow':
      return s + r + (0 < n ? ':' + n : '');
    case 'techie':
      return s + l(r, 2) + l(n, 2);
    default:
      throw new RangeError(
        `Value format ${e} is out of range for property format`
      );
  }
}
function le(t) {
  return (
    (r = t),
    ['hour', 'minute', 'second', 'millisecond'].reduce(
      (t, e) => ((t[e] = r[e]), t),
      {}
    )
  );
  var r;
}
const ce = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  he = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],
  de = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
function me(t) {
  switch (t) {
    case 'narrow':
      return [...de];
    case 'short':
      return [...he];
    case 'long':
      return [...ce];
    case 'numeric':
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    case '2-digit':
      return [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
      ];
    default:
      return null;
  }
}
const fe = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ],
  ye = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  ge = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
function we(t) {
  switch (t) {
    case 'narrow':
      return [...ge];
    case 'short':
      return [...ye];
    case 'long':
      return [...fe];
    case 'numeric':
      return ['1', '2', '3', '4', '5', '6', '7'];
    default:
      return null;
  }
}
const ve = ['AM', 'PM'],
  pe = ['Before Christ', 'Anno Domini'],
  Te = ['BC', 'AD'],
  Se = ['B', 'A'];
function Oe(t) {
  switch (t) {
    case 'narrow':
      return [...Se];
    case 'short':
      return [...Te];
    case 'long':
      return [...pe];
    default:
      return null;
  }
}
function be(t) {
  return ve[t.hour < 12 ? 0 : 1];
}
function ke(t, e) {
  return we(e)[t.weekday - 1];
}
function Me(t, e) {
  return me(e)[t.month - 1];
}
function Ne(t, e) {
  return Oe(e)[t.year < 0 ? 0 : 1];
}
function De(t, e, r = 'always', n = !1) {
  var s = {
      years: ['year', 'yr.'],
      quarters: ['quarter', 'qtr.'],
      months: ['month', 'mo.'],
      weeks: ['week', 'wk.'],
      days: ['day', 'day', 'days'],
      hours: ['hour', 'hr.'],
      minutes: ['minute', 'min.'],
      seconds: ['second', 'sec.']
    },
    i = -1 === ['hours', 'minutes', 'seconds'].indexOf(t);
  if ('auto' === r && i) {
    var a = 'days' === t;
    switch (e) {
      case 1:
        return a ? 'tomorrow' : 'next ' + s[t][0];
      case -1:
        return a ? 'yesterday' : 'last ' + s[t][0];
      case 0:
        return a ? 'today' : 'this ' + s[t][0];
    }
  }
  var r = Object.is(e, -0) || e < 0,
    i = Math.abs(e),
    e = 1 === i,
    o = s[t],
    n = n ? (!e && o[2]) || o[1] : e ? s[t][0] : t;
  return r ? i + ` ${n} ago` : `in ${i} ` + n;
}
function Ee(t, e) {
  let r = '';
  for (const n of t) n.literal ? (r += n.val) : (r += e(n.val));
  return r;
}
const Ve = {
  D: U,
  DD: $,
  DDD: W,
  DDDD: R,
  t: Y,
  tt: J,
  ttt: P,
  tttt: G,
  T: B,
  TT: Q,
  TTT: K,
  TTTT: X,
  f: tt,
  ff: rt,
  fff: it,
  ffff: ot,
  F: et,
  FF: nt,
  FFF: at,
  FFFF: ut
};
class w {
  static create(t, e = {}) {
    return new w(t, e);
  }
  static parseFormat(e) {
    let r = null,
      n = '',
      s = !1;
    const i = [];
    for (let t = 0; t < e.length; t++) {
      var a = e.charAt(t);
      "'" === a
        ? (0 < n.length && i.push({ literal: s, val: n }),
          (r = null),
          (n = ''),
          (s = !s))
        : s || a === r
        ? (n += a)
        : (0 < n.length && i.push({ literal: !1, val: n }), (n = a), (r = a));
    }
    return 0 < n.length && i.push({ literal: s, val: n }), i;
  }
  static macroTokenToFormatOpts(t) {
    return Ve[t];
  }
  constructor(t, e) {
    (this.opts = e), (this.loc = t), (this.systemLoc = null);
  }
  formatWithSystemDefault(t, e) {
    null === this.systemLoc && (this.systemLoc = this.loc.redefaultToSystem());
    const r = this.systemLoc.dtFormatter(t, { ...this.opts, ...e });
    return r.format();
  }
  formatDateTime(t, e = {}) {
    const r = this.loc.dtFormatter(t, { ...this.opts, ...e });
    return r.format();
  }
  formatDateTimeParts(t, e = {}) {
    const r = this.loc.dtFormatter(t, { ...this.opts, ...e });
    return r.formatToParts();
  }
  resolvedOptions(t, e = {}) {
    const r = this.loc.dtFormatter(t, { ...this.opts, ...e });
    return r.resolvedOptions();
  }
  num(t, e = 0) {
    if (this.opts.forceSimple) return l(t, e);
    const r = { ...this.opts };
    return 0 < e && (r.padTo = e), this.loc.numberFormatter(r).format(t);
  }
  formatDateTimeFromString(r, t) {
    const n = 'en' === this.loc.listingMode(),
      e = this.loc.outputCalendar && 'gregory' !== this.loc.outputCalendar,
      s = (t, e) => this.loc.extract(r, t, e),
      i = (t) =>
        r.isOffsetFixed && 0 === r.offset && t.allowZ
          ? 'Z'
          : r.isValid
          ? r.zone.formatOffset(r.ts, t.format)
          : '',
      a = () =>
        n ? be(r) : s({ hour: 'numeric', hourCycle: 'h12' }, 'dayperiod'),
      o = (t, e) =>
        n
          ? Me(r, t)
          : s(e ? { month: t } : { month: t, day: 'numeric' }, 'month'),
      u = (t, e) =>
        n
          ? ke(r, t)
          : s(
              e
                ? { weekday: t }
                : { weekday: t, month: 'long', day: 'numeric' },
              'weekday'
            ),
      l = (t) => {
        var e = w.macroTokenToFormatOpts(t);
        return e ? this.formatWithSystemDefault(r, e) : t;
      },
      c = (t) => (n ? Ne(r, t) : s({ era: t }, 'era'));
    return Ee(w.parseFormat(t), (t) => {
      switch (t) {
        case 'S':
          return this.num(r.millisecond);
        case 'u':
        case 'SSS':
          return this.num(r.millisecond, 3);
        case 's':
          return this.num(r.second);
        case 'ss':
          return this.num(r.second, 2);
        case 'uu':
          return this.num(Math.floor(r.millisecond / 10), 2);
        case 'uuu':
          return this.num(Math.floor(r.millisecond / 100));
        case 'm':
          return this.num(r.minute);
        case 'mm':
          return this.num(r.minute, 2);
        case 'h':
          return this.num(r.hour % 12 == 0 ? 12 : r.hour % 12);
        case 'hh':
          return this.num(r.hour % 12 == 0 ? 12 : r.hour % 12, 2);
        case 'H':
          return this.num(r.hour);
        case 'HH':
          return this.num(r.hour, 2);
        case 'Z':
          return i({ format: 'narrow', allowZ: this.opts.allowZ });
        case 'ZZ':
          return i({ format: 'short', allowZ: this.opts.allowZ });
        case 'ZZZ':
          return i({ format: 'techie', allowZ: this.opts.allowZ });
        case 'ZZZZ':
          return r.zone.offsetName(r.ts, {
            format: 'short',
            locale: this.loc.locale
          });
        case 'ZZZZZ':
          return r.zone.offsetName(r.ts, {
            format: 'long',
            locale: this.loc.locale
          });
        case 'z':
          return r.zoneName;
        case 'a':
          return a();
        case 'd':
          return e ? s({ day: 'numeric' }, 'day') : this.num(r.day);
        case 'dd':
          return e ? s({ day: '2-digit' }, 'day') : this.num(r.day, 2);
        case 'c':
          return this.num(r.weekday);
        case 'ccc':
          return u('short', !0);
        case 'cccc':
          return u('long', !0);
        case 'ccccc':
          return u('narrow', !0);
        case 'E':
          return this.num(r.weekday);
        case 'EEE':
          return u('short', !1);
        case 'EEEE':
          return u('long', !1);
        case 'EEEEE':
          return u('narrow', !1);
        case 'L':
          return e
            ? s({ month: 'numeric', day: 'numeric' }, 'month')
            : this.num(r.month);
        case 'LL':
          return e
            ? s({ month: '2-digit', day: 'numeric' }, 'month')
            : this.num(r.month, 2);
        case 'LLL':
          return o('short', !0);
        case 'LLLL':
          return o('long', !0);
        case 'LLLLL':
          return o('narrow', !0);
        case 'M':
          return e ? s({ month: 'numeric' }, 'month') : this.num(r.month);
        case 'MM':
          return e ? s({ month: '2-digit' }, 'month') : this.num(r.month, 2);
        case 'MMM':
          return o('short', !1);
        case 'MMMM':
          return o('long', !1);
        case 'MMMMM':
          return o('narrow', !1);
        case 'y':
          return e ? s({ year: 'numeric' }, 'year') : this.num(r.year);
        case 'yy':
          return e
            ? s({ year: '2-digit' }, 'year')
            : this.num(r.year.toString().slice(-2), 2);
        case 'yyyy':
          return e ? s({ year: 'numeric' }, 'year') : this.num(r.year, 4);
        case 'yyyyyy':
          return e ? s({ year: 'numeric' }, 'year') : this.num(r.year, 6);
        case 'G':
          return c('short');
        case 'GG':
          return c('long');
        case 'GGGGG':
          return c('narrow');
        case 'kk':
          return this.num(r.weekYear.toString().slice(-2), 2);
        case 'kkkk':
          return this.num(r.weekYear, 4);
        case 'W':
          return this.num(r.weekNumber);
        case 'WW':
          return this.num(r.weekNumber, 2);
        case 'o':
          return this.num(r.ordinal);
        case 'ooo':
          return this.num(r.ordinal, 3);
        case 'q':
          return this.num(r.quarter);
        case 'qq':
          return this.num(r.quarter, 2);
        case 'X':
          return this.num(Math.floor(r.ts / 1e3));
        case 'x':
          return this.num(r.ts);
        default:
          return l(t);
      }
    });
  }
  formatDurationFromString(t, e) {
    const r = (t) => {
        switch (t[0]) {
          case 'S':
            return 'millisecond';
          case 's':
            return 'second';
          case 'm':
            return 'minute';
          case 'h':
            return 'hour';
          case 'd':
            return 'day';
          case 'w':
            return 'week';
          case 'M':
            return 'month';
          case 'y':
            return 'year';
          default:
            return null;
        }
      },
      n = w.parseFormat(e),
      s = n.reduce((t, { literal: e, val: r }) => (e ? t : t.concat(r)), []),
      i = t.shiftTo(...s.map(r).filter((t) => t));
    return Ee(
      n,
      ((a = i),
      (t) => {
        var e = r(t);
        return e ? this.num(a.get(e), t.length) : t;
      })
    );
    var a;
  }
}
class g {
  constructor(t, e) {
    (this.reason = t), (this.explanation = e);
  }
  toMessage() {
    return this.explanation
      ? this.reason + ': ' + this.explanation
      : this.reason;
  }
}
n =
  /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function a(...t) {
  t = t.reduce((t, e) => t + e.source, '');
  return RegExp(`^${t}$`);
}
function v(...t) {
  return (i) =>
    t
      .reduce(
        ([t, e, r], n) => {
          var [n, r, s] = n(i, r);
          return [{ ...t, ...n }, r || e, s];
        },
        [{}, null, 1]
      )
      .slice(0, 2);
}
function p(t, ...e) {
  if (null != t)
    for (var [r, n] of e) {
      r = r.exec(t);
      if (r) return n(r);
    }
  return [null, null];
}
function xe(...s) {
  return (t, e) => {
    const r = {};
    let n;
    for (n = 0; n < s.length; n++) r[s[n]] = f(t[e + n]);
    return [r, null, e + n];
  };
}
var e = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
  s = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
  Ie = RegExp(s.source + `(?:${e.source}?(?:\\[(${n.source})\\])?)?`),
  Ce = RegExp(`(?:T${Ie.source})?`),
  Fe = xe('weekYear', 'weekNumber', 'weekDay'),
  Ze = xe('year', 'ordinal'),
  e = RegExp(s.source + ` ?(?:${e.source}|(${n.source}))?`),
  n = RegExp(`(?: ${e.source})?`);
function T(t, e, r) {
  t = t[e];
  return M(t) ? r : f(t);
}
function S(t, e) {
  return [
    {
      hours: T(t, e, 0),
      minutes: T(t, e + 1, 0),
      seconds: T(t, e + 2, 0),
      milliseconds: Bt(t[e + 3])
    },
    null,
    e + 4
  ];
}
function Le(t, e) {
  var r = !t[e] && !t[e + 1],
    t = ie(t[e + 1], t[e + 2]);
  return [{}, r ? null : d.instance(t), e + 3];
}
function ze(t, e) {
  return [{}, t[e] ? c.create(t[e]) : null, e + 1];
}
const Ae = RegExp(`^T?${s.source}$`),
  qe =
    /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function je(t) {
  var [t, e, r, n, s, i, a, o, u] = t;
  const l = '-' === t[0];
  var t = o && '-' === o[0],
    c = (t, e = !1) => (void 0 !== t && (e || (t && l)) ? -t : t);
  return [
    {
      years: c(y(e)),
      months: c(y(r)),
      weeks: c(y(n)),
      days: c(y(s)),
      hours: c(y(i)),
      minutes: c(y(a)),
      seconds: c(y(o), '-0' === o),
      milliseconds: c(Bt(u), t)
    }
  ];
}
const _e = {
  GMT: 0,
  EDT: -240,
  EST: -300,
  CDT: -300,
  CST: -360,
  MDT: -360,
  MST: -420,
  PDT: -420,
  PST: -480
};
function Ue(t, e, r, n, s, i, a) {
  const o = {
    year: 2 === e.length ? ne(f(e)) : f(e),
    month: he.indexOf(r) + 1,
    day: f(n),
    hour: f(s),
    minute: f(i)
  };
  return (
    a && (o.second = f(a)),
    t && (o.weekday = 3 < t.length ? fe.indexOf(t) + 1 : ye.indexOf(t) + 1),
    o
  );
}
const $e =
  /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function He(t) {
  var [, t, e, r, n, s, i, a, o, u, l, c] = t,
    t = Ue(t, n, r, e, s, i, a);
  let h;
  return (h = o ? _e[o] : u ? 0 : ie(l, c)), [t, new d(h)];
}
const We =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
  Re =
    /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
  Ye =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function Je(t) {
  var [, t, e, r, n, s, i, a] = t;
  return [Ue(t, n, r, e, s, i, a), d.utcInstance];
}
function Pe(t) {
  var [, t, e, r, n, s, i, a] = t;
  return [Ue(t, a, e, r, n, s, i), d.utcInstance];
}
const Ge = a(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, Ce),
  Be = a(/(\d{4})-?W(\d\d)(?:-?(\d))?/, Ce),
  Qe = a(/(\d{4})-?(\d{3})/, Ce),
  Ke = a(Ie),
  Xe = v(
    function (t, e) {
      return [
        { year: T(t, e), month: T(t, e + 1, 1), day: T(t, e + 2, 1) },
        null,
        e + 3
      ];
    },
    S,
    Le,
    ze
  ),
  tr = v(Fe, S, Le, ze),
  er = v(Ze, S, Le, ze),
  rr = v(S, Le, ze);
function nr(t) {
  return p(t, [Ge, Xe], [Be, tr], [Qe, er], [Ke, rr]);
}
function sr(t) {
  return p(
    t
      .replace(/\([^)]*\)|[\n\t]/g, ' ')
      .replace(/(\s\s+)/g, ' ')
      .trim(),
    [$e, He]
  );
}
function ir(t) {
  return p(t, [We, Je], [Re, Je], [Ye, Pe]);
}
function ar(t) {
  return p(t, [qe, je]);
}
const or = v(S);
function ur(t) {
  return p(t, [Ae, or]);
}
const lr = a(/(\d{4})-(\d\d)-(\d\d)/, n),
  cr = a(e),
  hr = v(S, Le, ze);
function dr(t) {
  return p(t, [lr, Xe], [cr, hr]);
}
const mr = {
    weeks: {
      days: 7,
      hours: 168,
      minutes: 10080,
      seconds: 604800,
      milliseconds: 6048e5
    },
    days: { hours: 24, minutes: 1440, seconds: 86400, milliseconds: 864e5 },
    hours: { minutes: 60, seconds: 3600, milliseconds: 36e5 },
    minutes: { seconds: 60, milliseconds: 6e4 },
    seconds: { milliseconds: 1e3 }
  },
  fr = {
    years: {
      quarters: 4,
      months: 12,
      weeks: 52,
      days: 365,
      hours: 8760,
      minutes: 525600,
      seconds: 31536e3,
      milliseconds: 31536e6
    },
    quarters: {
      months: 3,
      weeks: 13,
      days: 91,
      hours: 2184,
      minutes: 131040,
      seconds: 7862400,
      milliseconds: 78624e5
    },
    months: {
      weeks: 4,
      days: 30,
      hours: 720,
      minutes: 43200,
      seconds: 2592e3,
      milliseconds: 2592e6
    },
    ...mr
  },
  N = 365.2425,
  yr = 30.436875,
  gr = {
    years: {
      quarters: 4,
      months: 12,
      weeks: N / 7,
      days: N,
      hours: 24 * N,
      minutes: 525949.2,
      seconds: 525949.2 * 60,
      milliseconds: 525949.2 * 60 * 1e3
    },
    quarters: {
      months: 3,
      weeks: N / 28,
      days: N / 4,
      hours: (24 * N) / 4,
      minutes: 131487.3,
      seconds: (525949.2 * 60) / 4,
      milliseconds: 7889237999.999999
    },
    months: {
      weeks: yr / 7,
      days: yr,
      hours: 24 * yr,
      minutes: 43829.1,
      seconds: 2629746,
      milliseconds: 2629746e3
    },
    ...mr
  },
  D = [
    'years',
    'quarters',
    'months',
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds',
    'milliseconds'
  ],
  wr = D.slice(0).reverse();
function E(t, e, r = !1) {
  r = {
    values: r ? e.values : { ...t.values, ...(e.values || {}) },
    loc: t.loc.clone(e.loc),
    conversionAccuracy: e.conversionAccuracy || t.conversionAccuracy,
    matrix: e.matrix || t.matrix
  };
  return new V(r);
}
function vr(t, e, r, n, s) {
  var t = t[s][r],
    i = e[r] / t,
    a =
      !(Math.sign(i) === Math.sign(n[s])) && 0 !== n[s] && Math.abs(i) <= 1
        ? (a = i) < 0
          ? Math.floor(a)
          : Math.ceil(a)
        : Math.trunc(i);
  (n[s] += a), (e[r] -= a * t);
}
function pr(r, n) {
  wr.reduce((t, e) => (M(n[e]) ? t : (t && vr(r, n, t, n, e), e)), null);
}
function Tr(t) {
  const e = {};
  for (var [r, n] of Object.entries(t)) 0 !== n && (e[r] = n);
  return e;
}
class V {
  constructor(t) {
    var e = 'longterm' === t.conversionAccuracy || !1;
    let r = e ? gr : fr;
    t.matrix && (r = t.matrix),
      (this.values = t.values),
      (this.loc = t.loc || O.create()),
      (this.conversionAccuracy = e ? 'longterm' : 'casual'),
      (this.invalid = t.invalid || null),
      (this.matrix = r),
      (this.isLuxonDuration = !0);
  }
  static fromMillis(t, e) {
    return V.fromObject({ milliseconds: t }, e);
  }
  static fromObject(t, e = {}) {
    if (null == t || 'object' != typeof t)
      throw new o(
        'Duration.fromObject: argument expected to be an object, got ' +
          (null === t ? 'null' : typeof t)
      );
    return new V({
      values: oe(t, V.normalizeUnit),
      loc: O.fromObject(e),
      conversionAccuracy: e.conversionAccuracy,
      matrix: e.matrix
    });
  }
  static fromDurationLike(t) {
    if (h(t)) return V.fromMillis(t);
    if (V.isDuration(t)) return t;
    if ('object' == typeof t) return V.fromObject(t);
    throw new o(`Unknown duration argument ${t} of type ` + typeof t);
  }
  static fromISO(t, e) {
    var [r] = ar(t);
    return r
      ? V.fromObject(r, e)
      : V.invalid('unparsable', `the input "${t}" can't be parsed as ISO 8601`);
  }
  static fromISOTime(t, e) {
    var [r] = ur(t);
    return r
      ? V.fromObject(r, e)
      : V.invalid('unparsable', `the input "${t}" can't be parsed as ISO 8601`);
  }
  static invalid(t, e = null) {
    if (!t) throw new o('need to specify a reason the Duration is invalid');
    t = t instanceof g ? t : new g(t, e);
    if (k.throwOnInvalid) throw new q(t);
    return new V({ invalid: t });
  }
  static normalizeUnit(t) {
    var e = {
      year: 'years',
      years: 'years',
      quarter: 'quarters',
      quarters: 'quarters',
      month: 'months',
      months: 'months',
      week: 'weeks',
      weeks: 'weeks',
      day: 'days',
      days: 'days',
      hour: 'hours',
      hours: 'hours',
      minute: 'minutes',
      minutes: 'minutes',
      second: 'seconds',
      seconds: 'seconds',
      millisecond: 'milliseconds',
      milliseconds: 'milliseconds'
    }[t && t.toLowerCase()];
    if (e) return e;
    throw new _(t);
  }
  static isDuration(t) {
    return (t && t.isLuxonDuration) || !1;
  }
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  toFormat(t, e = {}) {
    e = { ...e, floor: !1 !== e.round && !1 !== e.floor };
    return this.isValid
      ? w.create(this.loc, e).formatDurationFromString(this, t)
      : 'Invalid Duration';
  }
  toHuman(r = {}) {
    var t = D.map((t) => {
      var e = this.values[t];
      return M(e)
        ? null
        : this.loc
            .numberFormatter({
              style: 'unit',
              unitDisplay: 'long',
              ...r,
              unit: t.slice(0, -1)
            })
            .format(e);
    }).filter((t) => t);
    return this.loc
      .listFormatter({
        type: 'conjunction',
        style: r.listStyle || 'narrow',
        ...r
      })
      .format(t);
  }
  toObject() {
    return this.isValid ? { ...this.values } : {};
  }
  toISO() {
    if (!this.isValid) return null;
    let t = 'P';
    return (
      0 !== this.years && (t += this.years + 'Y'),
      (0 === this.months && 0 === this.quarters) ||
        (t += this.months + 3 * this.quarters + 'M'),
      0 !== this.weeks && (t += this.weeks + 'W'),
      0 !== this.days && (t += this.days + 'D'),
      (0 === this.hours &&
        0 === this.minutes &&
        0 === this.seconds &&
        0 === this.milliseconds) ||
        (t += 'T'),
      0 !== this.hours && (t += this.hours + 'H'),
      0 !== this.minutes && (t += this.minutes + 'M'),
      (0 === this.seconds && 0 === this.milliseconds) ||
        (t += Qt(this.seconds + this.milliseconds / 1e3, 3) + 'S'),
      'P' === t && (t += 'T0S'),
      t
    );
  }
  toISOTime(t = {}) {
    if (!this.isValid) return null;
    var e = this.toMillis();
    if (e < 0 || 864e5 <= e) return null;
    t = {
      suppressMilliseconds: !1,
      suppressSeconds: !1,
      includePrefix: !1,
      format: 'extended',
      ...t
    };
    const r = this.shiftTo('hours', 'minutes', 'seconds', 'milliseconds');
    let n = 'basic' === t.format ? 'hhmm' : 'hh:mm',
      s =
        ((t.suppressSeconds && 0 === r.seconds && 0 === r.milliseconds) ||
          ((n += 'basic' === t.format ? 'ss' : ':ss'),
          (t.suppressMilliseconds && 0 === r.milliseconds) || (n += '.SSS')),
        r.toFormat(n));
    return (s = t.includePrefix ? 'T' + s : s);
  }
  toJSON() {
    return this.toISO();
  }
  toString() {
    return this.toISO();
  }
  toMillis() {
    return this.as('milliseconds');
  }
  valueOf() {
    return this.toMillis();
  }
  plus(t) {
    if (!this.isValid) return this;
    const e = V.fromDurationLike(t),
      r = {};
    for (const n of D)
      (m(e.values, n) || m(this.values, n)) && (r[n] = e.get(n) + this.get(n));
    return E(this, { values: r }, !0);
  }
  minus(t) {
    if (!this.isValid) return this;
    const e = V.fromDurationLike(t);
    return this.plus(e.negate());
  }
  mapUnits(t) {
    if (!this.isValid) return this;
    const e = {};
    for (const r of Object.keys(this.values)) e[r] = ae(t(this.values[r], r));
    return E(this, { values: e }, !0);
  }
  get(t) {
    return this[V.normalizeUnit(t)];
  }
  set(t) {
    return this.isValid
      ? E(this, { values: { ...this.values, ...oe(t, V.normalizeUnit) } })
      : this;
  }
  reconfigure({
    locale: t,
    numberingSystem: e,
    conversionAccuracy: r,
    matrix: n
  } = {}) {
    t = this.loc.clone({ locale: t, numberingSystem: e });
    return E(this, { loc: t, matrix: n, conversionAccuracy: r });
  }
  as(t) {
    return this.isValid ? this.shiftTo(t).get(t) : NaN;
  }
  normalize() {
    if (!this.isValid) return this;
    var t = this.toObject();
    return pr(this.matrix, t), E(this, { values: t }, !0);
  }
  rescale() {
    if (!this.isValid) return this;
    var t = Tr(this.normalize().shiftToAll().toObject());
    return E(this, { values: t }, !0);
  }
  shiftTo(...t) {
    if (!this.isValid) return this;
    if (0 === t.length) return this;
    t = t.map((t) => V.normalizeUnit(t));
    const e = {},
      r = {},
      n = this.toObject();
    let s;
    for (const a of D)
      if (0 <= t.indexOf(a)) {
        s = a;
        let t = 0;
        for (const o in r) (t += this.matrix[o][a] * r[o]), (r[o] = 0);
        h(n[a]) && (t += n[a]);
        var i = Math.trunc(t);
        (e[a] = i), (r[a] = (1e3 * t - 1e3 * i) / 1e3);
        for (const u in n)
          D.indexOf(u) > D.indexOf(a) && vr(this.matrix, n, u, e, a);
      } else h(n[a]) && (r[a] = n[a]);
    for (const l in r)
      0 !== r[l] && (e[s] += l === s ? r[l] : r[l] / this.matrix[s][l]);
    return E(this, { values: e }, !0).normalize();
  }
  shiftToAll() {
    return this.isValid
      ? this.shiftTo(
          'years',
          'months',
          'weeks',
          'days',
          'hours',
          'minutes',
          'seconds',
          'milliseconds'
        )
      : this;
  }
  negate() {
    if (!this.isValid) return this;
    const t = {};
    for (const e of Object.keys(this.values))
      t[e] = 0 === this.values[e] ? 0 : -this.values[e];
    return E(this, { values: t }, !0);
  }
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  get isValid() {
    return null === this.invalid;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  equals(t) {
    if (!this.isValid || !t.isValid) return !1;
    if (!this.loc.equals(t.loc)) return !1;
    for (const n of D)
      if (
        ((e = this.values[n]),
        (r = t.values[n]),
        !(void 0 === e || 0 === e ? void 0 === r || 0 === r : e === r))
      )
        return !1;
    var e, r;
    return !0;
  }
}
const Sr = 'Invalid Interval';
function Or(t, e) {
  return t && t.isValid
    ? e && e.isValid
      ? e < t
        ? x.invalid(
            'end before start',
            `The end of an interval must be after its start, but you had start=${t.toISO()} and end=` +
              e.toISO()
          )
        : null
      : x.invalid('missing or invalid end')
    : x.invalid('missing or invalid start');
}
class x {
  constructor(t) {
    (this.s = t.start),
      (this.e = t.end),
      (this.invalid = t.invalid || null),
      (this.isLuxonInterval = !0);
  }
  static invalid(t, e = null) {
    if (!t) throw new o('need to specify a reason the Interval is invalid');
    t = t instanceof g ? t : new g(t, e);
    if (k.throwOnInvalid) throw new A(t);
    return new x({ invalid: t });
  }
  static fromDateTimes(t, e) {
    var t = kn(t),
      e = kn(e),
      r = Or(t, e);
    return null == r ? new x({ start: t, end: e }) : r;
  }
  static after(t, e) {
    const r = V.fromDurationLike(e),
      n = kn(t);
    return x.fromDateTimes(n, n.plus(r));
  }
  static before(t, e) {
    const r = V.fromDurationLike(e),
      n = kn(t);
    return x.fromDateTimes(n.minus(r), n);
  }
  static fromISO(t, s) {
    var [i, a] = (t || '').split('/', 2);
    if (i && a) {
      let t, e;
      try {
        (t = L.fromISO(i, s)), (e = t.isValid);
      } catch (a) {
        e = !1;
      }
      let r, n;
      try {
        (r = L.fromISO(a, s)), (n = r.isValid);
      } catch (a) {
        n = !1;
      }
      if (e && n) return x.fromDateTimes(t, r);
      if (e) {
        var o = V.fromISO(a, s);
        if (o.isValid) return x.after(t, o);
      } else if (n) {
        o = V.fromISO(i, s);
        if (o.isValid) return x.before(r, o);
      }
    }
    return x.invalid(
      'unparsable',
      `the input "${t}" can't be parsed as ISO 8601`
    );
  }
  static isInterval(t) {
    return (t && t.isLuxonInterval) || !1;
  }
  get start() {
    return this.isValid ? this.s : null;
  }
  get end() {
    return this.isValid ? this.e : null;
  }
  get isValid() {
    return null === this.invalidReason;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  length(t = 'milliseconds') {
    return this.isValid ? this.toDuration(t).get(t) : NaN;
  }
  count(t = 'milliseconds') {
    if (!this.isValid) return NaN;
    const e = this.start.startOf(t),
      r = this.end.startOf(t);
    return Math.floor(r.diff(e, t).get(t)) + 1;
  }
  hasSame(t) {
    return (
      !!this.isValid && (this.isEmpty() || this.e.minus(1).hasSame(this.s, t))
    );
  }
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  isAfter(t) {
    return !!this.isValid && this.s > t;
  }
  isBefore(t) {
    return !!this.isValid && this.e <= t;
  }
  contains(t) {
    return !!this.isValid && this.s <= t && this.e > t;
  }
  set({ start: t, end: e } = {}) {
    return this.isValid ? x.fromDateTimes(t || this.s, e || this.e) : this;
  }
  splitAt(...t) {
    if (!this.isValid) return [];
    const e = t
        .map(kn)
        .filter((t) => this.contains(t))
        .sort(),
      r = [];
    let n = this['s'],
      s = 0;
    for (; n < this.e; ) {
      var i = e[s] || this.e,
        i = +i > +this.e ? this.e : i;
      r.push(x.fromDateTimes(n, i)), (n = i), (s += 1);
    }
    return r;
  }
  splitBy(t) {
    const e = V.fromDurationLike(t);
    if (!this.isValid || !e.isValid || 0 === e.as('milliseconds')) return [];
    let r = this['s'],
      n = 1,
      s;
    const i = [];
    for (; r < this.e; ) {
      var a = this.start.plus(e.mapUnits((t) => t * n));
      (s = +a > +this.e ? this.e : a),
        i.push(x.fromDateTimes(r, s)),
        (r = s),
        (n += 1);
    }
    return i;
  }
  divideEqually(t) {
    return this.isValid ? this.splitBy(this.length() / t).slice(0, t) : [];
  }
  overlaps(t) {
    return this.e > t.s && this.s < t.e;
  }
  abutsStart(t) {
    return !!this.isValid && +this.e == +t.s;
  }
  abutsEnd(t) {
    return !!this.isValid && +t.e == +this.s;
  }
  engulfs(t) {
    return !!this.isValid && this.s <= t.s && this.e >= t.e;
  }
  equals(t) {
    return (
      !(!this.isValid || !t.isValid) && this.s.equals(t.s) && this.e.equals(t.e)
    );
  }
  intersection(t) {
    if (!this.isValid) return this;
    var e = (this.s > t.s ? this : t).s,
      t = (this.e < t.e ? this : t).e;
    return t <= e ? null : x.fromDateTimes(e, t);
  }
  union(t) {
    if (!this.isValid) return this;
    var e = (this.s < t.s ? this : t).s,
      t = (this.e > t.e ? this : t).e;
    return x.fromDateTimes(e, t);
  }
  static merge(t) {
    const [e, r] = t
      .sort((t, e) => t.s - e.s)
      .reduce(
        ([t, e], r) =>
          e
            ? e.overlaps(r) || e.abutsStart(r)
              ? [t, e.union(r)]
              : [t.concat([e]), r]
            : [t, r],
        [[], null]
      );
    return r && e.push(r), e;
  }
  static xor(t) {
    let e = null,
      r = 0;
    const n = [],
      s = t.map((t) => [
        { time: t.s, type: 's' },
        { time: t.e, type: 'e' }
      ]),
      i = Array.prototype.concat(...s),
      a = i.sort((t, e) => t.time - e.time);
    for (const o of a)
      (r += 's' === o.type ? 1 : -1),
        (e =
          1 === r
            ? o.time
            : (e && +e != +o.time && n.push(x.fromDateTimes(e, o.time)), null));
    return x.merge(n);
  }
  difference(...t) {
    return x
      .xor([this].concat(t))
      .map((t) => this.intersection(t))
      .filter((t) => t && !t.isEmpty());
  }
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : Sr;
  }
  toISO(t) {
    return this.isValid ? this.s.toISO(t) + '/' + this.e.toISO(t) : Sr;
  }
  toISODate() {
    return this.isValid ? this.s.toISODate() + '/' + this.e.toISODate() : Sr;
  }
  toISOTime(t) {
    return this.isValid ? this.s.toISOTime(t) + '/' + this.e.toISOTime(t) : Sr;
  }
  toFormat(t, { separator: e = ' – ' } = {}) {
    return this.isValid ? '' + this.s.toFormat(t) + e + this.e.toFormat(t) : Sr;
  }
  toDuration(t, e) {
    return this.isValid
      ? this.e.diff(this.s, t, e)
      : V.invalid(this.invalidReason);
  }
  mapEndpoints(t) {
    return x.fromDateTimes(t(this.s), t(this.e));
  }
}
class br {
  static hasDST(t = k.defaultZone) {
    const e = L.now().setZone(t).set({ month: 12 });
    return !t.isUniversal && e.offset !== e.set({ month: 6 }).offset;
  }
  static isValidIANAZone(t) {
    return c.isValidZone(t);
  }
  static normalizeZone(t) {
    return b(t, k.defaultZone);
  }
  static months(
    t = 'long',
    {
      locale: e = null,
      numberingSystem: r = null,
      locObj: n = null,
      outputCalendar: s = 'gregory'
    } = {}
  ) {
    return (n || O.create(e, r, s)).months(t);
  }
  static monthsFormat(
    t = 'long',
    {
      locale: e = null,
      numberingSystem: r = null,
      locObj: n = null,
      outputCalendar: s = 'gregory'
    } = {}
  ) {
    return (n || O.create(e, r, s)).months(t, !0);
  }
  static weekdays(
    t = 'long',
    { locale: e = null, numberingSystem: r = null, locObj: n = null } = {}
  ) {
    return (n || O.create(e, r, null)).weekdays(t);
  }
  static weekdaysFormat(
    t = 'long',
    { locale: e = null, numberingSystem: r = null, locObj: n = null } = {}
  ) {
    return (n || O.create(e, r, null)).weekdays(t, !0);
  }
  static meridiems({ locale: t = null } = {}) {
    return O.create(t).meridiems();
  }
  static eras(t = 'short', { locale: e = null } = {}) {
    return O.create(e, null, 'gregory').eras(t);
  }
  static features() {
    return { relative: Jt() };
  }
}
function kr(t, e) {
  var r = (t) => t.toUTC(0, { keepLocalTime: !0 }).startOf('day').valueOf(),
    e = r(e) - r(t);
  return Math.floor(V.fromMillis(e).as('days'));
}
function Mr(t, e, r, n) {
  let [s, i, a, o] = (function (e, r, t) {
    var n, s;
    const i = {};
    let a, o;
    for ([n, s] of [
      ['years', (t, e) => e.year - t.year],
      ['quarters', (t, e) => e.quarter - t.quarter + 4 * (e.year - t.year)],
      ['months', (t, e) => e.month - t.month + 12 * (e.year - t.year)],
      [
        'weeks',
        (t, e) => {
          t = kr(t, e);
          return (t - (t % 7)) / 7;
        }
      ],
      ['days', kr]
    ])
      if (0 <= t.indexOf(n)) {
        a = n;
        let t = s(e, r);
        (o = e.plus({ [n]: t })) > r
          ? ((e = e.plus({ [n]: t - 1 })), --t)
          : (e = o),
          (i[n] = t);
      }
    return [e, i, o, a];
  })(t, e, r);
  (t = e - s),
    (r = r.filter(
      (t) => 0 <= ['hours', 'minutes', 'seconds', 'milliseconds'].indexOf(t)
    )),
    0 === r.length &&
      (a = a < e ? s.plus({ [o]: 1 }) : a) !== s &&
      (i[o] = (i[o] || 0) + t / (a - s)),
    (e = V.fromObject(i, n));
  return 0 < r.length
    ? V.fromMillis(t, n)
        .shiftTo(...r)
        .plus(e)
    : e;
}
const Nr = {
    arab: '[٠-٩]',
    arabext: '[۰-۹]',
    bali: '[᭐-᭙]',
    beng: '[০-৯]',
    deva: '[०-९]',
    fullwide: '[０-９]',
    gujr: '[૦-૯]',
    hanidec: '[〇|一|二|三|四|五|六|七|八|九]',
    khmr: '[០-៩]',
    knda: '[೦-೯]',
    laoo: '[໐-໙]',
    limb: '[᥆-᥏]',
    mlym: '[൦-൯]',
    mong: '[᠐-᠙]',
    mymr: '[၀-၉]',
    orya: '[୦-୯]',
    tamldec: '[௦-௯]',
    telu: '[౦-౯]',
    thai: '[๐-๙]',
    tibt: '[༠-༩]',
    latn: '\\d'
  },
  Dr = {
    arab: [1632, 1641],
    arabext: [1776, 1785],
    bali: [6992, 7001],
    beng: [2534, 2543],
    deva: [2406, 2415],
    fullwide: [65296, 65303],
    gujr: [2790, 2799],
    khmr: [6112, 6121],
    knda: [3302, 3311],
    laoo: [3792, 3801],
    limb: [6470, 6479],
    mlym: [3430, 3439],
    mong: [6160, 6169],
    mymr: [4160, 4169],
    orya: [2918, 2927],
    tamldec: [3046, 3055],
    telu: [3174, 3183],
    thai: [3664, 3673],
    tibt: [3872, 3881]
  },
  Er = Nr.hanidec.replace(/[\[|\]]/g, '').split('');
function I({ numberingSystem: t }, e = '') {
  return new RegExp('' + Nr[t || 'latn'] + e);
}
const Vr = 'missing Intl.DateTimeFormat.formatToParts support';
function C(t, e = (t) => t) {
  return {
    regex: t,
    deser: ([t]) =>
      e(
        (function (e) {
          let r = parseInt(e, 10);
          if (isNaN(r)) {
            r = '';
            for (let t = 0; t < e.length; t++) {
              var n = e.charCodeAt(t);
              if (-1 !== e[t].search(Nr.hanidec)) r += Er.indexOf(e[t]);
              else
                for (const a in Dr) {
                  var [s, i] = Dr[a];
                  s <= n && n <= i && (r += n - s);
                }
            }
            return parseInt(r, 10);
          }
          return r;
        })(t)
      )
  };
}
const xr = `[ ${String.fromCharCode(160)}]`,
  Ir = new RegExp(xr, 'g');
function Cr(t) {
  return t.replace(/\./g, '\\.?').replace(Ir, xr);
}
function Fr(t) {
  return t.replace(/\./g, '').replace(Ir, ' ').toLowerCase();
}
function F(t, r) {
  return null === t
    ? null
    : {
        regex: RegExp(t.map(Cr).join('|')),
        deser: ([e]) => t.findIndex((t) => Fr(e) === Fr(t)) + r
      };
}
function Zr(t, e) {
  return { regex: t, deser: ([, t, e]) => ie(t, e), groups: e };
}
function Lr(t) {
  return { regex: t, deser: ([t]) => t };
}
const zr = {
  year: { '2-digit': 'yy', numeric: 'yyyyy' },
  month: { numeric: 'M', '2-digit': 'MM', short: 'MMM', long: 'MMMM' },
  day: { numeric: 'd', '2-digit': 'dd' },
  weekday: { short: 'EEE', long: 'EEEE' },
  dayperiod: 'a',
  dayPeriod: 'a',
  hour: { numeric: 'h', '2-digit': 'hh' },
  minute: { numeric: 'm', '2-digit': 'mm' },
  second: { numeric: 's', '2-digit': 'ss' },
  timeZoneName: { long: 'ZZZZZ', short: 'ZZZ' }
};
let Ar = null;
function qr(t, n) {
  return Array.prototype.concat(
    ...t.map((t) => {
      {
        var e = n;
        if (t.literal) return t;
        const r = Ur(w.macroTokenToFormatOpts(t.val), e);
        return null == r || r.includes(void 0) ? t : r;
      }
    })
  );
}
function jr(g, t, e) {
  const r = qr(w.parseFormat(e), g),
    n = r.map((t) => {
      {
        var e = t,
          r = g;
        const n = I(r),
          s = I(r, '{2}'),
          i = I(r, '{3}'),
          a = I(r, '{4}'),
          o = I(r, '{6}'),
          u = I(r, '{1,2}'),
          l = I(r, '{1,3}'),
          c = I(r, '{1,6}'),
          h = I(r, '{1,9}'),
          d = I(r, '{2,4}'),
          m = I(r, '{4,6}'),
          f = (t) => ({
            regex: RegExp(t.val.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')),
            deser: ([t]) => t,
            literal: !0
          }),
          y = ((t) => {
            if (e.literal) return f(t);
            switch (t.val) {
              case 'G':
                return F(r.eras('short', !1), 0);
              case 'GG':
                return F(r.eras('long', !1), 0);
              case 'y':
                return C(c);
              case 'yy':
                return C(d, ne);
              case 'yyyy':
                return C(a);
              case 'yyyyy':
                return C(m);
              case 'yyyyyy':
                return C(o);
              case 'M':
                return C(u);
              case 'MM':
                return C(s);
              case 'MMM':
                return F(r.months('short', !0, !1), 1);
              case 'MMMM':
                return F(r.months('long', !0, !1), 1);
              case 'L':
                return C(u);
              case 'LL':
                return C(s);
              case 'LLL':
                return F(r.months('short', !1, !1), 1);
              case 'LLLL':
                return F(r.months('long', !1, !1), 1);
              case 'd':
                return C(u);
              case 'dd':
                return C(s);
              case 'o':
                return C(l);
              case 'ooo':
                return C(i);
              case 'HH':
                return C(s);
              case 'H':
                return C(u);
              case 'hh':
                return C(s);
              case 'h':
                return C(u);
              case 'mm':
                return C(s);
              case 'm':
              case 'q':
                return C(u);
              case 'qq':
                return C(s);
              case 's':
                return C(u);
              case 'ss':
                return C(s);
              case 'S':
                return C(l);
              case 'SSS':
                return C(i);
              case 'u':
                return Lr(h);
              case 'uu':
                return Lr(u);
              case 'uuu':
                return C(n);
              case 'a':
                return F(r.meridiems(), 0);
              case 'kkkk':
                return C(a);
              case 'kk':
                return C(d, ne);
              case 'W':
                return C(u);
              case 'WW':
                return C(s);
              case 'E':
              case 'c':
                return C(n);
              case 'EEE':
                return F(r.weekdays('short', !1, !1), 1);
              case 'EEEE':
                return F(r.weekdays('long', !1, !1), 1);
              case 'ccc':
                return F(r.weekdays('short', !0, !1), 1);
              case 'cccc':
                return F(r.weekdays('long', !0, !1), 1);
              case 'Z':
              case 'ZZ':
                return Zr(
                  new RegExp(`([+-]${u.source})(?::(${s.source}))?`),
                  2
                );
              case 'ZZZ':
                return Zr(new RegExp(`([+-]${u.source})(${s.source})?`), 2);
              case 'z':
                return Lr(/[a-z_+-/]{1,256}?/i);
              default:
                return f(t);
            }
          })(e) || { invalidReason: Vr };
        return (y.token = e), y;
      }
    }),
    s = n.find((t) => t.invalidReason);
  if (s) return { input: t, tokens: r, invalidReason: s.invalidReason };
  var [e, i] = [
      `^${(e = n)
        .map((t) => t.regex)
        .reduce((t, e) => `${t}(${e.source})`, '')}$`,
      e
    ],
    e = RegExp(e, 'i'),
    [i, a] = (function (t, e, r) {
      const n = t.match(e);
      if (n) {
        const s = {};
        let t = 1;
        for (const i in r)
          if (m(r, i)) {
            const a = r[i],
              o = a.groups ? a.groups + 1 : 1;
            !a.literal &&
              a.token &&
              (s[a.token.val[0]] = a.deser(n.slice(t, t + o))),
              (t += o);
          }
        return [n, s];
      }
      return [n, {}];
    })(t, e, i),
    [o, u, l] = a
      ? (function (n) {
          let t = null,
            e;
          return (
            M(n.z) || (t = c.create(n.z)),
            M(n.Z) || ((t = t || new d(n.Z)), (e = n.Z)),
            M(n.q) || (n.M = 3 * (n.q - 1) + 1),
            M(n.h) ||
              (n.h < 12 && 1 === n.a
                ? (n.h += 12)
                : 12 === n.h && 0 === n.a && (n.h = 0)),
            0 === n.G && n.y && (n.y = -n.y),
            M(n.u) || (n.S = Bt(n.u)),
            [
              Object.keys(n).reduce((t, e) => {
                var r = ((t) => {
                  switch (t) {
                    case 'S':
                      return 'millisecond';
                    case 's':
                      return 'second';
                    case 'm':
                      return 'minute';
                    case 'h':
                    case 'H':
                      return 'hour';
                    case 'd':
                      return 'day';
                    case 'o':
                      return 'ordinal';
                    case 'L':
                    case 'M':
                      return 'month';
                    case 'y':
                      return 'year';
                    case 'E':
                    case 'c':
                      return 'weekday';
                    case 'W':
                      return 'weekNumber';
                    case 'k':
                      return 'weekYear';
                    case 'q':
                      return 'quarter';
                    default:
                      return null;
                  }
                })(e);
                return r && (t[r] = n[e]), t;
              }, {}),
              t,
              e
            ]
          );
        })(a)
      : [null, null, void 0];
  if (m(a, 'a') && m(a, 'H'))
    throw new j("Can't include meridiem when specifying 24-hour format");
  return {
    input: t,
    tokens: r,
    regex: e,
    rawMatches: i,
    matches: a,
    result: o,
    zone: u,
    specificOffset: l
  };
}
function _r(t, e, r) {
  var { result: t, zone: e, specificOffset: r, invalidReason: n } = jr(t, e, r);
  return [t, e, r, n];
}
function Ur(s, t) {
  if (!s) return null;
  const e = w.create(t, s),
    r = e.formatDateTimeParts((Ar = Ar || L.fromMillis(1555555555555)));
  return r.map((e) => {
    {
      var r = s,
        { type: e, value: n } = e;
      if ('literal' === e) return { literal: !0, val: n };
      n = r[e];
      let t = zr[e];
      return (t = 'object' == typeof t ? t[n] : t)
        ? { literal: !1, val: t }
        : void 0;
    }
  });
}
const $r = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
  Hr = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function Z(t, e) {
  return new g(
    'unit out of range',
    `you specified ${e} (of type ${typeof e}) as a ${t}, which is invalid`
  );
}
function Wr(t, e, r) {
  const n = new Date(Date.UTC(t, e - 1, r));
  t < 100 && 0 <= t && n.setUTCFullYear(n.getUTCFullYear() - 1900);
  e = n.getUTCDay();
  return 0 === e ? 7 : e;
}
function Rr(t, e, r) {
  return r + (Kt(t) ? Hr : $r)[e - 1];
}
function Yr(t, e) {
  const r = Kt(t) ? Hr : $r,
    n = r.findIndex((t) => t < e),
    s = e - r[n];
  return { month: n + 1, day: s };
}
function Jr(t) {
  var { year: e, month: r, day: n } = t,
    s = Rr(e, r, n),
    r = Wr(e, r, n);
  let i = Math.floor((s - r + 10) / 7),
    a;
  return (
    i < 1
      ? ((a = e - 1), (i = re(a)))
      : i > re(e)
      ? ((a = e + 1), (i = 1))
      : (a = e),
    { weekYear: a, weekNumber: i, weekday: r, ...le(t) }
  );
}
function Pr(t) {
  var { weekYear: e, weekNumber: r, weekday: n } = t,
    s = Wr(e, 1, 4),
    i = Xt(e);
  let a = 7 * r + n - s - 3,
    o;
  a < 1
    ? ((o = e - 1), (a += Xt(o)))
    : a > i
    ? ((o = e + 1), (a -= Xt(e)))
    : (o = e);
  var { month: r, day: n } = Yr(o, a);
  return { year: o, month: r, day: n, ...le(t) };
}
function Gr(t) {
  var { year: e, month: r, day: n } = t;
  return { year: e, ordinal: Rr(e, r, n), ...le(t) };
}
function Br(t) {
  var { year: e, ordinal: r } = t,
    { month: r, day: n } = Yr(e, r);
  return { year: e, month: r, day: n, ...le(t) };
}
function Qr(t) {
  var e = Rt(t.weekYear),
    r = u(t.weekNumber, 1, re(t.weekYear)),
    n = u(t.weekday, 1, 7);
  return e
    ? r
      ? !n && Z('weekday', t.weekday)
      : Z('week', t.week)
    : Z('weekYear', t.weekYear);
}
function Kr(t) {
  var e = Rt(t.year),
    r = u(t.ordinal, 1, Xt(t.year));
  return e ? !r && Z('ordinal', t.ordinal) : Z('year', t.year);
}
function Xr(t) {
  var e = Rt(t.year),
    r = u(t.month, 1, 12),
    n = u(t.day, 1, te(t.year, t.month));
  return e
    ? r
      ? !n && Z('day', t.day)
      : Z('month', t.month)
    : Z('year', t.year);
}
function tn(t) {
  var { hour: t, minute: e, second: r, millisecond: n } = t,
    s = u(t, 0, 23) || (24 === t && 0 === e && 0 === r && 0 === n),
    i = u(e, 0, 59),
    a = u(r, 0, 59),
    o = u(n, 0, 999);
  return s
    ? i
      ? a
        ? !o && Z('millisecond', n)
        : Z('second', r)
      : Z('minute', e)
    : Z('hour', t);
}
const en = 'Invalid DateTime';
function rn(t) {
  return new g('unsupported zone', `the zone "${t.name}" is not supported`);
}
function nn(t) {
  return null === t.weekData && (t.weekData = Jr(t.c)), t.weekData;
}
function sn(t, e) {
  t = {
    ts: t.ts,
    zone: t.zone,
    c: t.c,
    o: t.o,
    loc: t.loc,
    invalid: t.invalid
  };
  return new L({ ...t, ...e, old: t });
}
function an(t, e, r) {
  let n = t - 60 * e * 1e3;
  var s = r.offset(n);
  if (e === s) return [n, e];
  n -= 60 * (s - e) * 1e3;
  e = r.offset(n);
  return s === e ? [n, s] : [t - 60 * Math.min(s, e) * 1e3, Math.max(s, e)];
}
function on(t, e) {
  t += 60 * e * 1e3;
  const r = new Date(t);
  return {
    year: r.getUTCFullYear(),
    month: r.getUTCMonth() + 1,
    day: r.getUTCDate(),
    hour: r.getUTCHours(),
    minute: r.getUTCMinutes(),
    second: r.getUTCSeconds(),
    millisecond: r.getUTCMilliseconds()
  };
}
function un(t, e, r) {
  return an(ee(t), e, r);
}
function ln(t, e) {
  var r = t.o,
    n = t.c.year + Math.trunc(e.years),
    s = t.c.month + Math.trunc(e.months) + 3 * Math.trunc(e.quarters),
    n = {
      ...t.c,
      year: n,
      month: s,
      day:
        Math.min(t.c.day, te(n, s)) +
        Math.trunc(e.days) +
        7 * Math.trunc(e.weeks)
    },
    s = V.fromObject({
      years: e.years - Math.trunc(e.years),
      quarters: e.quarters - Math.trunc(e.quarters),
      months: e.months - Math.trunc(e.months),
      weeks: e.weeks - Math.trunc(e.weeks),
      days: e.days - Math.trunc(e.days),
      hours: e.hours,
      minutes: e.minutes,
      seconds: e.seconds,
      milliseconds: e.milliseconds
    }).as('milliseconds');
  let [i, a] = an(ee(n), r, t.zone);
  return 0 !== s && ((i += s), (a = t.zone.offset(i))), { ts: i, o: a };
}
function cn(t, e, r, n, s, i) {
  var { setZone: a, zone: o } = r;
  if (t && 0 !== Object.keys(t).length) {
    const u = e || o,
      l = L.fromObject(t, { ...r, zone: u, specificOffset: i });
    return a ? l : l.setZone(o);
  }
  return L.invalid(
    new g('unparsable', `the input "${s}" can't be parsed as ` + n)
  );
}
function hn(t, e, r = !0) {
  return t.isValid
    ? w
        .create(O.create('en-US'), { allowZ: r, forceSimple: !0 })
        .formatDateTimeFromString(t, e)
    : null;
}
function dn(t, e) {
  var r = 9999 < t.c.year || t.c.year < 0;
  let n = '';
  return (
    r && 0 <= t.c.year && (n += '+'),
    (n += l(t.c.year, r ? 6 : 4)),
    (n = e
      ? (n = (n += '-') + l(t.c.month) + '-') + l(t.c.day)
      : (n += l(t.c.month)) + l(t.c.day))
  );
}
function mn(t, e, r, n, s, i) {
  let a = l(t.c.hour);
  return (
    e
      ? ((a = (a += ':') + l(t.c.minute)),
        (0 === t.c.second && r) || (a += ':'))
      : (a += l(t.c.minute)),
    (0 === t.c.second && r) ||
      ((a += l(t.c.second)),
      (0 === t.c.millisecond && n) || (a = (a += '.') + l(t.c.millisecond, 3))),
    s &&
      (t.isOffsetFixed && 0 === t.offset && !i
        ? (a += 'Z')
        : (a =
            t.o < 0
              ? (a = (a += '-') + l(Math.trunc(-t.o / 60)) + ':') +
                l(Math.trunc(-t.o % 60))
              : (a = (a += '+') + l(Math.trunc(t.o / 60)) + ':') +
                l(Math.trunc(t.o % 60)))),
    i && (a += '[' + t.zone.ianaName + ']'),
    a
  );
}
const fn = { month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
  yn = {
    weekNumber: 1,
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  },
  gn = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
  wn = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'],
  vn = [
    'weekYear',
    'weekNumber',
    'weekday',
    'hour',
    'minute',
    'second',
    'millisecond'
  ],
  pn = ['year', 'ordinal', 'hour', 'minute', 'second', 'millisecond'];
function Tn(t) {
  var e = {
    year: 'year',
    years: 'year',
    month: 'month',
    months: 'month',
    day: 'day',
    days: 'day',
    hour: 'hour',
    hours: 'hour',
    minute: 'minute',
    minutes: 'minute',
    quarter: 'quarter',
    quarters: 'quarter',
    second: 'second',
    seconds: 'second',
    millisecond: 'millisecond',
    milliseconds: 'millisecond',
    weekday: 'weekday',
    weekdays: 'weekday',
    weeknumber: 'weekNumber',
    weeksnumber: 'weekNumber',
    weeknumbers: 'weekNumber',
    weekyear: 'weekYear',
    weekyears: 'weekYear',
    ordinal: 'ordinal'
  }[t.toLowerCase()];
  if (e) return e;
  throw new _(t);
}
function Sn(t, e) {
  const r = b(e.zone, k.defaultZone),
    n = O.fromObject(e),
    s = k.now();
  let i, a;
  if (M(t.year)) i = s;
  else {
    for (const o of wn) M(t[o]) && (t[o] = fn[o]);
    e = Xr(t) || tn(t);
    if (e) return L.invalid(e);
    e = r.offset(s);
    [i, a] = un(t, e, r);
  }
  return new L({ ts: i, zone: r, loc: n, o: a });
}
function On(e, n, s) {
  const i = !!M(s.round) || s.round,
    t = (t, e) => {
      t = Qt(t, i || s.calendary ? 0 : 2, !0);
      const r = n.loc.clone(s).relFormatter(s);
      return r.format(t, e);
    },
    r = (t) =>
      s.calendary
        ? n.hasSame(e, t)
          ? 0
          : n.startOf(t).diff(e.startOf(t), t).get(t)
        : n.diff(e, t).get(t);
  if (s.unit) return t(r(s.unit), s.unit);
  for (const o of s.units) {
    var a = r(o);
    if (1 <= Math.abs(a)) return t(a, o);
  }
  return t(n < e ? -0 : 0, s.units[s.units.length - 1]);
}
function bn(t) {
  let e = {},
    r;
  return (
    (r =
      0 < t.length && 'object' == typeof t[t.length - 1]
        ? ((e = t[t.length - 1]), Array.from(t).slice(0, t.length - 1))
        : Array.from(t)),
    [e, r]
  );
}
class L {
  constructor(t) {
    const e = t.zone || k.defaultZone;
    let r =
        t.invalid ||
        (Number.isNaN(t.ts) ? new g('invalid input') : null) ||
        (e.isValid ? null : rn(e)),
      n = ((this.ts = M(t.ts) ? k.now() : t.ts), null),
      s = null;
    var i;
    r ||
      (t.old && t.old.ts === this.ts && t.old.zone.equals(e)
        ? ([n, s] = [t.old.c, t.old.o])
        : ((i = e.offset(this.ts)),
          (n = on(this.ts, i)),
          (r = Number.isNaN(n.year) ? new g('invalid input') : null),
          (n = r ? null : n),
          (s = r ? null : i))),
      (this._zone = e),
      (this.loc = t.loc || O.create()),
      (this.invalid = r),
      (this.weekData = null),
      (this.c = n),
      (this.o = s),
      (this.isLuxonDateTime = !0);
  }
  static now() {
    return new L({});
  }
  static local() {
    var [t, e] = bn(arguments),
      [e, r, n, s, i, a, o] = e;
    return Sn(
      {
        year: e,
        month: r,
        day: n,
        hour: s,
        minute: i,
        second: a,
        millisecond: o
      },
      t
    );
  }
  static utc() {
    const [t, e] = bn(arguments),
      [r, n, s, i, a, o, u] = e;
    return (
      (t.zone = d.utcInstance),
      Sn(
        {
          year: r,
          month: n,
          day: s,
          hour: i,
          minute: a,
          second: o,
          millisecond: u
        },
        t
      )
    );
  }
  static fromJSDate(t, e = {}) {
    t = Yt(t) ? t.valueOf() : NaN;
    if (Number.isNaN(t)) return L.invalid('invalid input');
    var r = b(e.zone, k.defaultZone);
    return r.isValid
      ? new L({ ts: t, zone: r, loc: O.fromObject(e) })
      : L.invalid(rn(r));
  }
  static fromMillis(t, e = {}) {
    if (h(t))
      return t < -864e13 || 864e13 < t
        ? L.invalid('Timestamp out of range')
        : new L({
            ts: t,
            zone: b(e.zone, k.defaultZone),
            loc: O.fromObject(e)
          });
    throw new o(
      `fromMillis requires a numerical input, but received a ${typeof t} with value ` +
        t
    );
  }
  static fromSeconds(t, e = {}) {
    if (h(t))
      return new L({
        ts: 1e3 * t,
        zone: b(e.zone, k.defaultZone),
        loc: O.fromObject(e)
      });
    throw new o('fromSeconds requires a numerical input');
  }
  static fromObject(t, e = {}) {
    t = t || {};
    const r = b(e.zone, k.defaultZone);
    if (!r.isValid) return L.invalid(rn(r));
    const n = k.now(),
      s = M(e.specificOffset) ? r.offset(n) : e.specificOffset,
      i = oe(t, Tn),
      a = !M(i.ordinal),
      o = !M(i.year),
      u = !M(i.month) || !M(i.day),
      l = o || u,
      c = i.weekYear || i.weekNumber,
      h = O.fromObject(e);
    if ((l || a) && c)
      throw new j(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (u && a) throw new j("Can't mix ordinal dates with month/day");
    e = c || (i.weekday && !l);
    let d,
      m,
      f = on(n, s),
      y =
        (e
          ? ((d = vn), (m = yn), (f = Jr(f)))
          : a
          ? ((d = pn), (m = gn), (f = Gr(f)))
          : ((d = wn), (m = fn)),
        !1);
    for (const S of d) M(i[S]) ? (y ? (i[S] = m[S]) : (i[S] = f[S])) : (y = !0);
    var g = (e ? Qr : a ? Kr : Xr)(i) || tn(i);
    if (g) return L.invalid(g);
    const w = e ? Pr(i) : a ? Br(i) : i,
      [v, p] = un(w, s, r),
      T = new L({ ts: v, zone: r, o: p, loc: h });
    return i.weekday && l && t.weekday !== T.weekday
      ? L.invalid(
          'mismatched weekday',
          `you can't specify both a weekday of ${i.weekday} and a date of ` +
            T.toISO()
        )
      : T;
  }
  static fromISO(t, e = {}) {
    var [r, n] = nr(t);
    return cn(r, n, e, 'ISO 8601', t);
  }
  static fromRFC2822(t, e = {}) {
    var [r, n] = sr(t);
    return cn(r, n, e, 'RFC 2822', t);
  }
  static fromHTTP(t, e = {}) {
    var [t, r] = ir(t);
    return cn(t, r, e, 'HTTP', e);
  }
  static fromFormat(t, e, r = {}) {
    if (M(t) || M(e))
      throw new o('fromFormat requires an input string and a format');
    var { locale: n = null, numberingSystem: s = null } = r,
      [n, s, i, a] = _r(
        O.fromOpts({ locale: n, numberingSystem: s, defaultToEN: !0 }),
        t,
        e
      );
    return a ? L.invalid(a) : cn(n, s, r, 'format ' + e, t, i);
  }
  static fromString(t, e, r = {}) {
    return L.fromFormat(t, e, r);
  }
  static fromSQL(t, e = {}) {
    var [r, n] = dr(t);
    return cn(r, n, e, 'SQL', t);
  }
  static invalid(t, e = null) {
    if (!t) throw new o('need to specify a reason the DateTime is invalid');
    t = t instanceof g ? t : new g(t, e);
    if (k.throwOnInvalid) throw new z(t);
    return new L({ invalid: t });
  }
  static isDateTime(t) {
    return (t && t.isLuxonDateTime) || !1;
  }
  static parseFormatForOpts(t, e = {}) {
    const r = Ur(t, O.fromObject(e));
    return r ? r.map((t) => (t ? t.val : null)).join('') : null;
  }
  static expandFormat(t, e = {}) {
    const r = qr(w.parseFormat(t), O.fromObject(e));
    return r.map((t) => t.val).join('');
  }
  get(t) {
    return this[t];
  }
  get isValid() {
    return null === this.invalid;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  get zone() {
    return this._zone;
  }
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  get weekYear() {
    return this.isValid ? nn(this).weekYear : NaN;
  }
  get weekNumber() {
    return this.isValid ? nn(this).weekNumber : NaN;
  }
  get weekday() {
    return this.isValid ? nn(this).weekday : NaN;
  }
  get ordinal() {
    return this.isValid ? Gr(this.c).ordinal : NaN;
  }
  get monthShort() {
    return this.isValid
      ? br.months('short', { locObj: this.loc })[this.month - 1]
      : null;
  }
  get monthLong() {
    return this.isValid
      ? br.months('long', { locObj: this.loc })[this.month - 1]
      : null;
  }
  get weekdayShort() {
    return this.isValid
      ? br.weekdays('short', { locObj: this.loc })[this.weekday - 1]
      : null;
  }
  get weekdayLong() {
    return this.isValid
      ? br.weekdays('long', { locObj: this.loc })[this.weekday - 1]
      : null;
  }
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  get offsetNameShort() {
    return this.isValid
      ? this.zone.offsetName(this.ts, { format: 'short', locale: this.locale })
      : null;
  }
  get offsetNameLong() {
    return this.isValid
      ? this.zone.offsetName(this.ts, { format: 'long', locale: this.locale })
      : null;
  }
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  get isInDST() {
    return (
      !this.isOffsetFixed &&
      (this.offset > this.set({ month: 1, day: 1 }).offset ||
        this.offset > this.set({ month: 5 }).offset)
    );
  }
  get isInLeapYear() {
    return Kt(this.year);
  }
  get daysInMonth() {
    return te(this.year, this.month);
  }
  get daysInYear() {
    return this.isValid ? Xt(this.year) : NaN;
  }
  get weeksInWeekYear() {
    return this.isValid ? re(this.weekYear) : NaN;
  }
  resolvedLocaleOptions(t = {}) {
    var {
      locale: t,
      numberingSystem: e,
      calendar: r
    } = w.create(this.loc.clone(t), t).resolvedOptions(this);
    return { locale: t, numberingSystem: e, outputCalendar: r };
  }
  toUTC(t = 0, e = {}) {
    return this.setZone(d.instance(t), e);
  }
  toLocal() {
    return this.setZone(k.defaultZone);
  }
  setZone(e, { keepLocalTime: r = !1, keepCalendarTime: n = !1 } = {}) {
    if ((e = b(e, k.defaultZone)).equals(this.zone)) return this;
    if (e.isValid) {
      let t = this.ts;
      return (
        (r || n) &&
          ((r = e.offset(this.ts)), (n = this.toObject()), ([t] = un(n, r, e))),
        sn(this, { ts: t, zone: e })
      );
    }
    return L.invalid(rn(e));
  }
  reconfigure({ locale: t, numberingSystem: e, outputCalendar: r } = {}) {
    t = this.loc.clone({ locale: t, numberingSystem: e, outputCalendar: r });
    return sn(this, { loc: t });
  }
  setLocale(t) {
    return this.reconfigure({ locale: t });
  }
  set(t) {
    if (!this.isValid) return this;
    var t = oe(t, Tn),
      e = !M(t.weekYear) || !M(t.weekNumber) || !M(t.weekday),
      r = !M(t.ordinal),
      n = !M(t.year),
      s = !M(t.month) || !M(t.day),
      i = t.weekYear || t.weekNumber;
    if ((n || s || r) && i)
      throw new j(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (s && r) throw new j("Can't mix ordinal dates with month/day");
    let a;
    e
      ? (a = Pr({ ...Jr(this.c), ...t }))
      : M(t.ordinal)
      ? ((a = { ...this.toObject(), ...t }),
        M(t.day) && (a.day = Math.min(te(a.year, a.month), a.day)))
      : (a = Br({ ...Gr(this.c), ...t }));
    var [n, i] = un(a, this.o, this.zone);
    return sn(this, { ts: n, o: i });
  }
  plus(t) {
    return this.isValid ? sn(this, ln(this, V.fromDurationLike(t))) : this;
  }
  minus(t) {
    return this.isValid
      ? sn(this, ln(this, V.fromDurationLike(t).negate()))
      : this;
  }
  startOf(t) {
    if (!this.isValid) return this;
    const e = {},
      r = V.normalizeUnit(t);
    switch (r) {
      case 'years':
        e.month = 1;
      case 'quarters':
      case 'months':
        e.day = 1;
      case 'weeks':
      case 'days':
        e.hour = 0;
      case 'hours':
        e.minute = 0;
      case 'minutes':
        e.second = 0;
      case 'seconds':
        e.millisecond = 0;
    }
    return (
      'weeks' === r && (e.weekday = 1),
      'quarters' === r &&
        ((t = Math.ceil(this.month / 3)), (e.month = 3 * (t - 1) + 1)),
      this.set(e)
    );
  }
  endOf(t) {
    return this.isValid
      ? this.plus({ [t]: 1 })
          .startOf(t)
          .minus(1)
      : this;
  }
  toFormat(t, e = {}) {
    return this.isValid
      ? w.create(this.loc.redefaultToEN(e)).formatDateTimeFromString(this, t)
      : en;
  }
  toLocaleString(t = U, e = {}) {
    return this.isValid
      ? w.create(this.loc.clone(e), t).formatDateTime(this)
      : en;
  }
  toLocaleParts(t = {}) {
    return this.isValid
      ? w.create(this.loc.clone(t), t).formatDateTimeParts(this)
      : [];
  }
  toISO({
    format: t = 'extended',
    suppressSeconds: e = !1,
    suppressMilliseconds: r = !1,
    includeOffset: n = !0,
    extendedZone: s = !1
  } = {}) {
    if (!this.isValid) return null;
    var t = 'extended' === t,
      i = dn(this, t);
    return (i += 'T') + mn(this, t, e, r, n, s);
  }
  toISODate({ format: t = 'extended' } = {}) {
    return this.isValid ? dn(this, 'extended' === t) : null;
  }
  toISOWeekDate() {
    return hn(this, "kkkk-'W'WW-c");
  }
  toISOTime({
    suppressMilliseconds: t = !1,
    suppressSeconds: e = !1,
    includeOffset: r = !0,
    includePrefix: n = !1,
    extendedZone: s = !1,
    format: i = 'extended'
  } = {}) {
    return this.isValid
      ? (n ? 'T' : '') + mn(this, 'extended' === i, e, t, r, s)
      : null;
  }
  toRFC2822() {
    return hn(this, 'EEE, dd LLL yyyy HH:mm:ss ZZZ', !1);
  }
  toHTTP() {
    return hn(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  toSQLDate() {
    return this.isValid ? dn(this, !0) : null;
  }
  toSQLTime({
    includeOffset: t = !0,
    includeZone: e = !1,
    includeOffsetSpace: r = !0
  } = {}) {
    let n = 'HH:mm:ss.SSS';
    return (
      (e || t) && (r && (n += ' '), e ? (n += 'z') : t && (n += 'ZZ')),
      hn(this, n, !0)
    );
  }
  toSQL(t = {}) {
    return this.isValid ? this.toSQLDate() + ' ' + this.toSQLTime(t) : null;
  }
  toString() {
    return this.isValid ? this.toISO() : en;
  }
  valueOf() {
    return this.toMillis();
  }
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  toJSON() {
    return this.toISO();
  }
  toBSON() {
    return this.toJSDate();
  }
  toObject(t = {}) {
    if (!this.isValid) return {};
    const e = { ...this.c };
    return (
      t.includeConfig &&
        ((e.outputCalendar = this.outputCalendar),
        (e.numberingSystem = this.loc.numberingSystem),
        (e.locale = this.loc.locale)),
      e
    );
  }
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  diff(t, e = 'milliseconds', r = {}) {
    if (!this.isValid || !t.isValid)
      return V.invalid('created by diffing an invalid DateTime');
    r = { locale: this.locale, numberingSystem: this.numberingSystem, ...r };
    const n = Pt(e).map(V.normalizeUnit),
      s = t.valueOf() > this.valueOf(),
      i = s ? this : t,
      a = s ? t : this,
      o = Mr(i, a, n, r);
    return s ? o.negate() : o;
  }
  diffNow(t = 'milliseconds', e = {}) {
    return this.diff(L.now(), t, e);
  }
  until(t) {
    return this.isValid ? x.fromDateTimes(this, t) : this;
  }
  hasSame(t, e) {
    if (!this.isValid) return !1;
    var r = t.valueOf();
    const n = this.setZone(t.zone, { keepLocalTime: !0 });
    return n.startOf(e) <= r && r <= n.endOf(e);
  }
  equals(t) {
    return (
      this.isValid &&
      t.isValid &&
      this.valueOf() === t.valueOf() &&
      this.zone.equals(t.zone) &&
      this.loc.equals(t.loc)
    );
  }
  toRelative(t = {}) {
    if (!this.isValid) return null;
    var e = t.base || L.fromObject({}, { zone: this.zone }),
      r = t.padding ? (this < e ? -t.padding : t.padding) : 0;
    let n = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'],
      s = t.unit;
    return (
      Array.isArray(t.unit) && ((n = t.unit), (s = void 0)),
      On(e, this.plus(r), { ...t, numeric: 'always', units: n, unit: s })
    );
  }
  toRelativeCalendar(t = {}) {
    return this.isValid
      ? On(t.base || L.fromObject({}, { zone: this.zone }), this, {
          ...t,
          numeric: 'auto',
          units: ['years', 'months', 'days'],
          calendary: !0
        })
      : null;
  }
  static min(...t) {
    if (t.every(L.isDateTime)) return Gt(t, (t) => t.valueOf(), Math.min);
    throw new o('min requires all arguments be DateTimes');
  }
  static max(...t) {
    if (t.every(L.isDateTime)) return Gt(t, (t) => t.valueOf(), Math.max);
    throw new o('max requires all arguments be DateTimes');
  }
  static fromFormatExplain(t, e, r = {}) {
    var { locale: r = null, numberingSystem: n = null } = r;
    return jr(
      O.fromOpts({ locale: r, numberingSystem: n, defaultToEN: !0 }),
      t,
      e
    );
  }
  static fromStringExplain(t, e, r = {}) {
    return L.fromFormatExplain(t, e, r);
  }
  static get DATE_SHORT() {
    return U;
  }
  static get DATE_MED() {
    return $;
  }
  static get DATE_MED_WITH_WEEKDAY() {
    return H;
  }
  static get DATE_FULL() {
    return W;
  }
  static get DATE_HUGE() {
    return R;
  }
  static get TIME_SIMPLE() {
    return Y;
  }
  static get TIME_WITH_SECONDS() {
    return J;
  }
  static get TIME_WITH_SHORT_OFFSET() {
    return P;
  }
  static get TIME_WITH_LONG_OFFSET() {
    return G;
  }
  static get TIME_24_SIMPLE() {
    return B;
  }
  static get TIME_24_WITH_SECONDS() {
    return Q;
  }
  static get TIME_24_WITH_SHORT_OFFSET() {
    return K;
  }
  static get TIME_24_WITH_LONG_OFFSET() {
    return X;
  }
  static get DATETIME_SHORT() {
    return tt;
  }
  static get DATETIME_SHORT_WITH_SECONDS() {
    return et;
  }
  static get DATETIME_MED() {
    return rt;
  }
  static get DATETIME_MED_WITH_SECONDS() {
    return nt;
  }
  static get DATETIME_MED_WITH_WEEKDAY() {
    return st;
  }
  static get DATETIME_FULL() {
    return it;
  }
  static get DATETIME_FULL_WITH_SECONDS() {
    return at;
  }
  static get DATETIME_HUGE() {
    return ot;
  }
  static get DATETIME_HUGE_WITH_SECONDS() {
    return ut;
  }
}
function kn(t) {
  if (L.isDateTime(t)) return t;
  if (t && t.valueOf && h(t.valueOf())) return L.fromJSDate(t);
  if (t && 'object' == typeof t) return L.fromObject(t);
  throw new o(`Unknown datetime argument: ${t}, of type ` + typeof t);
}
s = '3.1.1';
export {
  L as DateTime,
  V as Duration,
  d as FixedOffsetZone,
  c as IANAZone,
  br as Info,
  x as Interval,
  At as InvalidZone,
  k as Settings,
  ct as SystemZone,
  s as VERSION,
  i as Zone
};
