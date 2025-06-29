import { j as d, F as h, p as o, q as r, c as u, m as l } from "./index-CFQAOdfH.js";
import { A as k } from "./AbstractID3Parser-C1dP_e89.js";
import { I as g } from "./ID3v2Parser-Blva_tJ3.js";
const n = {
  len: 12,
  get: (t, e) => ({ id: h.get(t, e), size: d.get(t, e + 4) })
}, p = {
  len: 16,
  get: (t, e) => ({
    fileSize: o.get(t, e),
    metadataPointer: o.get(t, e + 8)
  })
};
var m;
(function(t) {
  t[t.mono = 1] = "mono", t[t.stereo = 2] = "stereo", t[t.channels = 3] = "channels", t[t.quad = 4] = "quad", t[t["4 channels"] = 5] = "4 channels", t[t["5 channels"] = 6] = "5 channels", t[t["5.1 channels"] = 7] = "5.1 channels";
})(m || (m = {}));
const z = {
  len: 40,
  get: (t, e) => ({
    formatVersion: r.get(t, e),
    formatID: r.get(t, e + 4),
    channelType: r.get(t, e + 8),
    channelNum: r.get(t, e + 12),
    samplingFrequency: r.get(t, e + 16),
    bitsPerSample: r.get(t, e + 20),
    sampleCount: o.get(t, e + 24),
    blockSizePerChannel: r.get(t, e + 32)
  })
}, i = u("music-metadata:parser:DSF");
class F extends l("DSD") {
}
class S extends k {
  async postId3v2Parse() {
    const e = this.tokenizer.position, s = await this.tokenizer.readToken(n);
    if (s.id !== "DSD ")
      throw new F("Invalid chunk signature");
    this.metadata.setFormat("container", "DSF"), this.metadata.setFormat("lossless", !0);
    const a = await this.tokenizer.readToken(p);
    if (a.metadataPointer === BigInt(0))
      i("No ID3v2 tag present");
    else
      return i(`expect ID3v2 at offset=${a.metadataPointer}`), await this.parseChunks(a.fileSize - s.size), await this.tokenizer.ignore(Number(a.metadataPointer) - this.tokenizer.position - e), new g().parse(this.metadata, this.tokenizer, this.options);
  }
  async parseChunks(e) {
    for (; e >= n.len; ) {
      const s = await this.tokenizer.readToken(n);
      switch (i(`Parsing chunk name=${s.id} size=${s.size}`), s.id) {
        case "fmt ": {
          const a = await this.tokenizer.readToken(z);
          this.metadata.setFormat("numberOfChannels", a.channelNum), this.metadata.setFormat("sampleRate", a.samplingFrequency), this.metadata.setFormat("bitsPerSample", a.bitsPerSample), this.metadata.setFormat("numberOfSamples", a.sampleCount), this.metadata.setFormat("duration", Number(a.sampleCount) / a.samplingFrequency);
          const c = a.bitsPerSample * a.samplingFrequency * a.channelNum;
          this.metadata.setFormat("bitrate", c);
          return;
        }
        default:
          this.tokenizer.ignore(Number(s.size) - n.len);
          break;
      }
      e -= s.size;
    }
  }
}
export {
  F as DsdContentParseError,
  S as DsfParser
};
