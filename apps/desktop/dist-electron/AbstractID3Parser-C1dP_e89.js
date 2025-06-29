import "node:fs/promises";
import { B as t, K as a, E as r, c as i, L as n } from "./index-CFQAOdfH.js";
import { I as o } from "./ID3v2Parser-Blva_tJ3.js";
const s = i("music-metadata:parser:ID3");
class c extends t {
  constructor() {
    super(...arguments), this.id3parser = new o();
  }
  static async startsWithID3v2Header(e) {
    return (await e.peekToken(a)).fileIdentifier === "ID3";
  }
  async parse() {
    try {
      await this.parseID3v2();
    } catch (e) {
      if (e instanceof r)
        s("End-of-stream");
      else
        throw e;
    }
  }
  finalize() {
  }
  async parseID3v2() {
    await this.tryReadId3v2Headers(), s("End of ID3v2 header, go to MPEG-parser: pos=%s", this.tokenizer.position), await this.postId3v2Parse(), this.options.skipPostHeaders && this.metadata.hasAny() ? this.finalize() : (await new n(this.metadata, this.tokenizer, this.options).parse(), this.finalize());
  }
  async tryReadId3v2Headers() {
    if ((await this.tokenizer.peekToken(a)).fileIdentifier === "ID3")
      return s("Found ID3v2 header, pos=%s", this.tokenizer.position), await this.id3parser.parse(this.metadata, this.tokenizer, this.options), this.tryReadId3v2Headers();
  }
}
export {
  c as A
};
