import { n as f, F as s, B as z, c as w, d as I, o as S, f as D, a as c, b as u, U as p, S as b, m as g } from "./index-CFQAOdfH.js";
import "node:fs/promises";
import { I as C } from "./ID3v2Parser-Blva_tJ3.js";
const o = {
  len: 12,
  get: (h, t) => ({
    // Group-ID
    chunkID: s.get(h, t),
    // Size
    chunkSize: f.get(h, t + 4)
  })
}, a = w("music-metadata:parser:aiff");
class d extends g("DSDIFF") {
}
class y extends z {
  async parse() {
    const t = await this.tokenizer.readToken(o);
    if (t.chunkID !== "FRM8")
      throw new d("Unexpected chunk-ID");
    const e = (await this.tokenizer.readToken(s)).trim();
    switch (e) {
      case "DSD":
        return this.metadata.setFormat("container", `DSDIFF/${e}`), this.metadata.setFormat("lossless", !0), this.readFmt8Chunks(t.chunkSize - BigInt(s.len));
      default:
        throw new d(`Unsupported DSDIFF type: ${e}`);
    }
  }
  async readFmt8Chunks(t) {
    for (; t >= o.len; ) {
      const e = await this.tokenizer.readToken(o);
      a(`Chunk id=${e.chunkID}`), await this.readData(e), t -= BigInt(o.len) + e.chunkSize;
    }
  }
  async readData(t) {
    a(`Reading data of chunk[ID=${t.chunkID}, size=${t.chunkSize}]`);
    const e = this.tokenizer.position;
    switch (t.chunkID.trim()) {
      case "FVER": {
        const r = await this.tokenizer.readToken(D);
        a(`DSDIFF version=${r}`);
        break;
      }
      case "PROP": {
        if (await this.tokenizer.readToken(s) !== "SND ")
          throw new d("Unexpected PROP-chunk ID");
        await this.handleSoundPropertyChunks(t.chunkSize - BigInt(s.len));
        break;
      }
      case "ID3": {
        const r = await this.tokenizer.readToken(new I(Number(t.chunkSize))), n = S(r);
        await new C().parse(this.metadata, n, this.options);
        break;
      }
      case "DSD":
        this.metadata.format.numberOfChannels && this.metadata.setFormat("numberOfSamples", Number(t.chunkSize * BigInt(8) / BigInt(this.metadata.format.numberOfChannels))), this.metadata.format.numberOfSamples && this.metadata.format.sampleRate && this.metadata.setFormat("duration", this.metadata.format.numberOfSamples / this.metadata.format.sampleRate);
        break;
      default:
        a(`Ignore chunk[ID=${t.chunkID}, size=${t.chunkSize}]`);
        break;
    }
    const i = t.chunkSize - BigInt(this.tokenizer.position - e);
    i > 0 && (a(`After Parsing chunk, remaining ${i} bytes`), await this.tokenizer.ignore(Number(i)));
  }
  async handleSoundPropertyChunks(t) {
    for (a(`Parsing sound-property-chunks, remainingSize=${t}`); t > 0; ) {
      const e = await this.tokenizer.readToken(o);
      a(`Sound-property-chunk[ID=${e.chunkID}, size=${e.chunkSize}]`);
      const i = this.tokenizer.position;
      switch (e.chunkID.trim()) {
        case "FS": {
          const n = await this.tokenizer.readToken(p);
          this.metadata.setFormat("sampleRate", n);
          break;
        }
        case "CHNL": {
          const n = await this.tokenizer.readToken(c);
          this.metadata.setFormat("numberOfChannels", n), await this.handleChannelChunks(e.chunkSize - BigInt(c.len));
          break;
        }
        case "CMPR": {
          const n = (await this.tokenizer.readToken(s)).trim(), k = await this.tokenizer.readToken(u), m = await this.tokenizer.readToken(new b(k, "ascii"));
          n === "DSD" && (this.metadata.setFormat("lossless", !0), this.metadata.setFormat("bitsPerSample", 1)), this.metadata.setFormat("codec", `${n} (${m})`);
          break;
        }
        case "ABSS": {
          const n = await this.tokenizer.readToken(c), k = await this.tokenizer.readToken(u), m = await this.tokenizer.readToken(u), l = await this.tokenizer.readToken(p);
          a(`ABSS ${n}:${k}:${m}.${l}`);
          break;
        }
        case "LSCO": {
          const n = await this.tokenizer.readToken(c);
          a(`LSCO lsConfig=${n}`);
          break;
        }
        default:
          a(`Unknown sound-property-chunk[ID=${e.chunkID}, size=${e.chunkSize}]`), await this.tokenizer.ignore(Number(e.chunkSize));
      }
      const r = e.chunkSize - BigInt(this.tokenizer.position - i);
      r > 0 && (a(`After Parsing sound-property-chunk ${e.chunkSize}, remaining ${r} bytes`), await this.tokenizer.ignore(Number(r))), t -= BigInt(o.len) + e.chunkSize, a(`Parsing sound-property-chunks, remainingSize=${t}`);
    }
    if (this.metadata.format.lossless && this.metadata.format.sampleRate && this.metadata.format.numberOfChannels && this.metadata.format.bitsPerSample) {
      const e = this.metadata.format.sampleRate * this.metadata.format.numberOfChannels * this.metadata.format.bitsPerSample;
      this.metadata.setFormat("bitrate", e);
    }
  }
  async handleChannelChunks(t) {
    a(`Parsing channel-chunks, remainingSize=${t}`);
    const e = [];
    for (; t >= s.len; ) {
      const i = await this.tokenizer.readToken(s);
      a(`Channel[ID=${i}]`), e.push(i), t -= BigInt(s.len);
    }
    return a(`Channels: ${e.join(", ")}`), e;
  }
}
export {
  d as DsdiffContentParseError,
  y as DsdiffParser
};
