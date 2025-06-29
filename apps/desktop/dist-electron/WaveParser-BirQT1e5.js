import "node:fs/promises";
import { f as o, S as h, m as w, k as s, d as S, s as c, B as I, c as p, E as z, F as m, o as T } from "./index-CFQAOdfH.js";
import { I as f } from "./ID3v2Parser-Blva_tJ3.js";
const k = {
  len: 8,
  get: (t, e) => ({
    // Group-ID
    chunkID: new h(4, "latin1").get(t, e),
    // Size
    chunkSize: o.get(t, e + 4)
  })
};
class A {
  constructor(e) {
    this.tagHeader = e, this.len = e.chunkSize, this.len += this.len & 1;
  }
  get(e, a) {
    return new h(this.tagHeader.chunkSize, "ascii").get(e, a);
  }
}
class l extends w("Wave") {
}
var g;
(function(t) {
  t[t.PCM = 1] = "PCM", t[t.ADPCM = 2] = "ADPCM", t[t.IEEE_FLOAT = 3] = "IEEE_FLOAT", t[t.MPEG_ADTS_AAC = 5632] = "MPEG_ADTS_AAC", t[t.MPEG_LOAS = 5634] = "MPEG_LOAS", t[t.RAW_AAC1 = 255] = "RAW_AAC1", t[t.DOLBY_AC3_SPDIF = 146] = "DOLBY_AC3_SPDIF", t[t.DVM = 8192] = "DVM", t[t.RAW_SPORT = 576] = "RAW_SPORT", t[t.ESST_AC3 = 577] = "ESST_AC3", t[t.DRM = 9] = "DRM", t[t.DTS2 = 8193] = "DTS2", t[t.MPEG = 80] = "MPEG";
})(g || (g = {}));
class R {
  constructor(e) {
    if (e.chunkSize < 16)
      throw new l("Invalid chunk size");
    this.len = e.chunkSize;
  }
  get(e, a) {
    return {
      wFormatTag: s.get(e, a),
      nChannels: s.get(e, a + 2),
      nSamplesPerSec: o.get(e, a + 4),
      nAvgBytesPerSec: o.get(e, a + 8),
      nBlockAlign: s.get(e, a + 12),
      wBitsPerSample: s.get(e, a + 14)
    };
  }
}
class D {
  constructor(e) {
    if (e.chunkSize < 4)
      throw new l("Invalid fact chunk size.");
    this.len = e.chunkSize;
  }
  get(e, a) {
    return {
      dwSampleLength: o.get(e, a)
    };
  }
}
const u = {
  len: 420,
  get: (t, e) => ({
    description: c(new h(256, "ascii").get(t, e)).trim(),
    originator: c(new h(32, "ascii").get(t, e + 256)).trim(),
    originatorReference: c(new h(32, "ascii").get(t, e + 288)).trim(),
    originationDate: c(new h(10, "ascii").get(t, e + 320)).trim(),
    originationTime: c(new h(8, "ascii").get(t, e + 330)).trim(),
    timeReferenceLow: o.get(t, e + 338),
    timeReferenceHigh: o.get(t, e + 342),
    version: s.get(t, e + 346),
    umid: new S(64).get(t, e + 348),
    loudnessValue: s.get(t, e + 412),
    maxTruePeakLevel: s.get(t, e + 414),
    maxMomentaryLoudness: s.get(t, e + 416),
    maxShortTermLoudness: s.get(t, e + 418)
  })
}, r = p("music-metadata:parser:RIFF");
class F extends I {
  constructor() {
    super(...arguments), this.blockAlign = 0;
  }
  async parse() {
    const e = await this.tokenizer.readToken(k);
    if (r(`pos=${this.tokenizer.position}, parse: chunkID=${e.chunkID}`), e.chunkID === "RIFF")
      return this.parseRiffChunk(e.chunkSize).catch((a) => {
        if (!(a instanceof z))
          throw a;
      });
  }
  async parseRiffChunk(e) {
    const a = await this.tokenizer.readToken(m);
    switch (this.metadata.setFormat("container", a), a) {
      case "WAVE":
        return this.readWaveChunk(e - m.len);
      default:
        throw new l(`Unsupported RIFF format: RIFF/${a}`);
    }
  }
  async readWaveChunk(e) {
    for (; e >= k.len; ) {
      const a = await this.tokenizer.readToken(k);
      switch (e -= k.len + a.chunkSize, a.chunkSize > e && this.metadata.addWarning("Data chunk size exceeds file size"), this.header = a, r(`pos=${this.tokenizer.position}, readChunk: chunkID=RIFF/WAVE/${a.chunkID}`), a.chunkID) {
        case "LIST":
          await this.parseListTag(a);
          break;
        case "fact":
          this.metadata.setFormat("lossless", !1), this.fact = await this.tokenizer.readToken(new D(a));
          break;
        case "fmt ": {
          const i = await this.tokenizer.readToken(new R(a));
          let n = g[i.wFormatTag];
          n || (r(`WAVE/non-PCM format=${i.wFormatTag}`), n = `non-PCM (${i.wFormatTag})`), this.metadata.setFormat("codec", n), this.metadata.setFormat("bitsPerSample", i.wBitsPerSample), this.metadata.setFormat("sampleRate", i.nSamplesPerSec), this.metadata.setFormat("numberOfChannels", i.nChannels), this.metadata.setFormat("bitrate", i.nBlockAlign * i.nSamplesPerSec * 8), this.blockAlign = i.nBlockAlign;
          break;
        }
        case "id3 ":
        case "ID3 ": {
          const i = await this.tokenizer.readToken(new S(a.chunkSize)), n = T(i);
          await new f().parse(this.metadata, n, this.options);
          break;
        }
        case "data": {
          this.metadata.format.lossless !== !1 && this.metadata.setFormat("lossless", !0);
          let i = a.chunkSize;
          if (this.tokenizer.fileInfo.size) {
            const d = this.tokenizer.fileInfo.size - this.tokenizer.position;
            d < i && (this.metadata.addWarning("data chunk length exceeding file length"), i = d);
          }
          const n = this.fact ? this.fact.dwSampleLength : i === 4294967295 ? void 0 : i / this.blockAlign;
          n && (this.metadata.setFormat("numberOfSamples", n), this.metadata.format.sampleRate && this.metadata.setFormat("duration", n / this.metadata.format.sampleRate)), this.metadata.format.codec === "ADPCM" ? this.metadata.setFormat("bitrate", 352e3) : this.metadata.format.sampleRate && this.metadata.setFormat("bitrate", this.blockAlign * this.metadata.format.sampleRate * 8), await this.tokenizer.ignore(a.chunkSize);
          break;
        }
        case "bext": {
          const i = await this.tokenizer.readToken(u);
          Object.keys(i).forEach((d) => {
            this.metadata.addTag("exif", `bext.${d}`, i[d]);
          });
          const n = a.chunkSize - u.len;
          await this.tokenizer.ignore(n);
          break;
        }
        case "\0\0\0\0":
          r(`Ignore padding chunk: RIFF/${a.chunkID} of ${a.chunkSize} bytes`), this.metadata.addWarning(`Ignore chunk: RIFF/${a.chunkID}`), await this.tokenizer.ignore(a.chunkSize);
          break;
        default:
          r(`Ignore chunk: RIFF/${a.chunkID} of ${a.chunkSize} bytes`), this.metadata.addWarning(`Ignore chunk: RIFF/${a.chunkID}`), await this.tokenizer.ignore(a.chunkSize);
      }
      this.header.chunkSize % 2 === 1 && (r("Read odd padding byte"), await this.tokenizer.ignore(1));
    }
  }
  async parseListTag(e) {
    const a = await this.tokenizer.readToken(new h(4, "latin1"));
    switch (r("pos=%s, parseListTag: chunkID=RIFF/WAVE/LIST/%s", this.tokenizer.position, a), a) {
      case "INFO":
        return this.parseRiffInfoTags(e.chunkSize - 4);
      default:
        return this.metadata.addWarning(`Ignore chunk: RIFF/WAVE/LIST/${a}`), r(`Ignoring chunkID=RIFF/WAVE/LIST/${a}`), this.tokenizer.ignore(e.chunkSize - 4).then();
    }
  }
  async parseRiffInfoTags(e) {
    for (; e >= 8; ) {
      const a = await this.tokenizer.readToken(k), i = new A(a), n = await this.tokenizer.readToken(i);
      this.addTag(a.chunkID, c(n)), e -= 8 + i.len;
    }
    if (e !== 0)
      throw new l(`Illegal remaining size: ${e}`);
  }
  addTag(e, a) {
    this.metadata.addTag("exif", e, a);
  }
}
export {
  F as WaveParser
};
