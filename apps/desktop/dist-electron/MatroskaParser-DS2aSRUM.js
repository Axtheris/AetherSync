import { E as S, c as f, b as w, t as h, v as E, S as I, m as $, w as T, B as z, x as N, T as F } from "./index-CFQAOdfH.js";
import "node:fs/promises";
var e;
(function(a) {
  a[a.string = 0] = "string", a[a.uint = 1] = "uint", a[a.uid = 2] = "uid", a[a.bool = 3] = "bool", a[a.binary = 4] = "binary", a[a.float = 5] = "float";
})(e || (e = {}));
const U = {
  name: "dtd",
  container: {
    440786851: {
      name: "ebml",
      container: {
        17030: { name: "ebmlVersion", value: e.uint },
        // 5.1.1
        17143: { name: "ebmlReadVersion", value: e.uint },
        // 5.1.2
        17138: { name: "ebmlMaxIDWidth", value: e.uint },
        // 5.1.3
        17139: { name: "ebmlMaxSizeWidth", value: e.uint },
        // 5.1.4
        17026: { name: "docType", value: e.string },
        // 5.1.5
        17031: { name: "docTypeVersion", value: e.uint },
        // 5.1.6
        17029: { name: "docTypeReadVersion", value: e.uint }
        // 5.1.7
      }
    },
    // Matroska segments
    408125543: {
      name: "segment",
      container: {
        // Meta Seek Information (also known as MetaSeek)
        290298740: {
          name: "seekHead",
          container: {
            19899: {
              name: "seek",
              multiple: !0,
              container: {
                21419: { name: "id", value: e.binary },
                21420: { name: "position", value: e.uint }
              }
            }
          }
        },
        // Segment Information
        357149030: {
          name: "info",
          container: {
            29604: { name: "uid", value: e.uid },
            29572: { name: "filename", value: e.string },
            3979555: { name: "prevUID", value: e.uid },
            3965867: { name: "prevFilename", value: e.string },
            4110627: { name: "nextUID", value: e.uid },
            4096955: { name: "nextFilename", value: e.string },
            2807729: { name: "timecodeScale", value: e.uint },
            17545: { name: "duration", value: e.float },
            17505: { name: "dateUTC", value: e.uint },
            31657: { name: "title", value: e.string },
            19840: { name: "muxingApp", value: e.string },
            22337: { name: "writingApp", value: e.string }
          }
        },
        // Cluster
        524531317: {
          name: "cluster",
          multiple: !0,
          container: {
            231: { name: "timecode", value: e.uid },
            22743: { name: "silentTracks ", multiple: !0 },
            167: { name: "position", value: e.uid },
            171: { name: "prevSize", value: e.uid },
            160: { name: "blockGroup" },
            163: { name: "simpleBlock" }
          }
        },
        // Track
        374648427: {
          name: "tracks",
          container: {
            174: {
              name: "entries",
              multiple: !0,
              container: {
                215: { name: "trackNumber", value: e.uint },
                29637: { name: "uid", value: e.uid },
                131: { name: "trackType", value: e.uint },
                185: { name: "flagEnabled", value: e.bool },
                136: { name: "flagDefault", value: e.bool },
                21930: { name: "flagForced", value: e.bool },
                // extended
                156: { name: "flagLacing", value: e.bool },
                28135: { name: "minCache", value: e.uint },
                28136: { name: "maxCache", value: e.uint },
                2352003: { name: "defaultDuration", value: e.uint },
                2306383: { name: "timecodeScale", value: e.float },
                21358: { name: "name", value: e.string },
                2274716: { name: "language", value: e.string },
                134: { name: "codecID", value: e.string },
                25506: { name: "codecPrivate", value: e.binary },
                2459272: { name: "codecName", value: e.string },
                3839639: { name: "codecSettings", value: e.string },
                3883072: { name: "codecInfoUrl", value: e.string },
                2536e3: { name: "codecDownloadUrl", value: e.string },
                170: { name: "codecDecodeAll", value: e.bool },
                28587: { name: "trackOverlay", value: e.uint },
                // Video
                224: {
                  name: "video",
                  container: {
                    154: { name: "flagInterlaced", value: e.bool },
                    21432: { name: "stereoMode", value: e.uint },
                    176: { name: "pixelWidth", value: e.uint },
                    186: { name: "pixelHeight", value: e.uint },
                    21680: { name: "displayWidth", value: e.uint },
                    21690: { name: "displayHeight", value: e.uint },
                    21683: { name: "aspectRatioType", value: e.uint },
                    3061028: { name: "colourSpace", value: e.uint },
                    3126563: { name: "gammaValue", value: e.float }
                  }
                },
                // Audio
                225: {
                  name: "audio",
                  container: {
                    181: { name: "samplingFrequency", value: e.float },
                    30901: { name: "outputSamplingFrequency", value: e.float },
                    159: { name: "channels", value: e.uint },
                    // https://www.matroska.org/technical/specs/index.html
                    148: { name: "channels", value: e.uint },
                    32123: { name: "channelPositions", value: e.binary },
                    25188: { name: "bitDepth", value: e.uint }
                  }
                },
                // Content Encoding
                28032: {
                  name: "contentEncodings",
                  container: {
                    25152: {
                      name: "contentEncoding",
                      container: {
                        20529: { name: "order", value: e.uint },
                        20530: { name: "scope", value: e.bool },
                        20531: { name: "type", value: e.uint },
                        20532: {
                          name: "contentEncoding",
                          container: {
                            16980: { name: "contentCompAlgo", value: e.uint },
                            16981: { name: "contentCompSettings", value: e.binary }
                          }
                        },
                        20533: {
                          name: "contentEncoding",
                          container: {
                            18401: { name: "contentEncAlgo", value: e.uint },
                            18402: { name: "contentEncKeyID", value: e.binary },
                            18403: { name: "contentSignature ", value: e.binary },
                            18404: { name: "ContentSigKeyID  ", value: e.binary },
                            18405: { name: "contentSigAlgo ", value: e.uint },
                            18406: { name: "contentSigHashAlgo ", value: e.uint }
                          }
                        },
                        25188: { name: "bitDepth", value: e.uint }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        // Cueing Data
        475249515: {
          name: "cues",
          container: {
            187: {
              name: "cuePoint",
              container: {
                179: { name: "cueTime", value: e.uid },
                183: {
                  name: "positions",
                  container: {
                    247: { name: "track", value: e.uint },
                    241: { name: "clusterPosition", value: e.uint },
                    21368: { name: "blockNumber", value: e.uint },
                    234: { name: "codecState", value: e.uint },
                    219: {
                      name: "reference",
                      container: {
                        150: { name: "time", value: e.uint },
                        151: { name: "cluster", value: e.uint },
                        21343: { name: "number", value: e.uint },
                        235: { name: "codecState", value: e.uint }
                      }
                    },
                    240: { name: "relativePosition", value: e.uint }
                    // extended
                  }
                }
              }
            }
          }
        },
        // Attachment
        423732329: {
          name: "attachments",
          container: {
            24999: {
              name: "attachedFiles",
              multiple: !0,
              container: {
                18046: { name: "description", value: e.string },
                18030: { name: "name", value: e.string },
                18016: { name: "mimeType", value: e.string },
                18012: { name: "data", value: e.binary },
                18094: { name: "uid", value: e.uid }
              }
            }
          }
        },
        // Chapters
        272869232: {
          name: "chapters",
          container: {
            17849: {
              name: "editionEntry",
              container: {
                182: {
                  name: "chapterAtom",
                  container: {
                    29636: { name: "uid", value: e.uid },
                    145: { name: "timeStart", value: e.uint },
                    146: { name: "timeEnd", value: e.uid },
                    152: { name: "hidden", value: e.bool },
                    17816: { name: "enabled", value: e.uid },
                    143: {
                      name: "track",
                      container: {
                        137: { name: "trackNumber", value: e.uid },
                        128: {
                          name: "display",
                          container: {
                            133: { name: "string", value: e.string },
                            17276: { name: "language ", value: e.string },
                            17278: { name: "country ", value: e.string }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        // Tagging
        307544935: {
          name: "tags",
          container: {
            29555: {
              name: "tag",
              multiple: !0,
              container: {
                25536: {
                  name: "target",
                  container: {
                    25541: { name: "tagTrackUID", value: e.uid },
                    25540: { name: "tagChapterUID", value: e.uint },
                    25542: { name: "tagAttachmentUID", value: e.uid },
                    25546: { name: "targetType", value: e.string },
                    // extended
                    26826: { name: "targetTypeValue", value: e.uint },
                    // extended
                    25545: { name: "tagEditionUID", value: e.uid }
                    // extended
                  }
                },
                26568: {
                  name: "simpleTags",
                  multiple: !0,
                  container: {
                    17827: { name: "name", value: e.string },
                    17543: { name: "string", value: e.string },
                    17541: { name: "binary", value: e.binary },
                    17530: { name: "language", value: e.string },
                    // extended
                    17531: { name: "languageIETF", value: e.string },
                    // extended
                    17540: { name: "default", value: e.bool }
                    // extended
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}, g = f("music-metadata:parser:ebml");
class v extends $("EBML") {
}
var c;
(function(a) {
  a[a.ReadNext = 0] = "ReadNext", a[a.IgnoreElement = 2] = "IgnoreElement", a[a.SkipSiblings = 3] = "SkipSiblings", a[a.TerminateParsing = 4] = "TerminateParsing", a[a.SkipElement = 5] = "SkipElement";
})(c || (c = {}));
class M {
  /**
   * @param {ITokenizer} tokenizer Input
   * @param tokenizer
   */
  constructor(n) {
    this.tokenizer = n, this.padding = 0, this.parserMap = /* @__PURE__ */ new Map(), this.ebmlMaxIDLength = 4, this.ebmlMaxSizeLength = 8, this.parserMap.set(e.uint, (i) => this.readUint(i)), this.parserMap.set(e.string, (i) => this.readString(i)), this.parserMap.set(e.binary, (i) => this.readBuffer(i)), this.parserMap.set(e.uid, async (i) => this.readBuffer(i)), this.parserMap.set(e.bool, (i) => this.readFlag(i)), this.parserMap.set(e.float, (i) => this.readFloat(i));
  }
  async iterate(n, i, u) {
    return this.parseContainer(k(n), i, u);
  }
  async parseContainer(n, i, u) {
    const l = {};
    for (; this.tokenizer.position < i; ) {
      let o;
      const s = this.tokenizer.position;
      try {
        o = await this.readElement();
      } catch (r) {
        if (r instanceof S)
          break;
        throw r;
      }
      const t = n.container[o.id];
      if (t)
        switch (u.startNext(t)) {
          case c.ReadNext:
            if (o.id, g(`Read element: name=${x(t)}{id=0x${o.id.toString(16)}, container=${!!t.container}} at position=${s}`), t.container) {
              const m = await this.parseContainer(t, o.len >= 0 ? this.tokenizer.position + o.len : -1, u);
              t.multiple ? (l[t.name] || (l[t.name] = []), l[t.name].push(m)) : l[t.name] = m, await u.elementValue(t, m, s);
            } else {
              const m = this.parserMap.get(t.value);
              if (typeof m == "function") {
                const d = await m(o);
                l[t.name] = d, await u.elementValue(t, d, s);
              }
            }
            break;
          case c.SkipElement:
            g(`Go to next element: name=${x(t)}, element.id=0x${o.id}, container=${!!t.container} at position=${s}`);
            break;
          case c.IgnoreElement:
            g(`Ignore element: name=${x(t)}, element.id=0x${o.id}, container=${!!t.container} at position=${s}`), await this.tokenizer.ignore(o.len);
            break;
          case c.SkipSiblings:
            g(`Ignore remaining container, at: name=${x(t)}, element.id=0x${o.id}, container=${!!t.container} at position=${s}`), await this.tokenizer.ignore(i - this.tokenizer.position);
            break;
          case c.TerminateParsing:
            return g(`Terminate parsing at element: name=${x(t)}, element.id=0x${o.id}, container=${!!t.container} at position=${s}`), l;
        }
      else
        switch (o.id) {
          case 236:
            this.padding += o.len, await this.tokenizer.ignore(o.len);
            break;
          default:
            g(`parseEbml: parent=${x(n)}, unknown child: id=${o.id.toString(16)} at position=${s}`), this.padding += o.len, await this.tokenizer.ignore(o.len);
        }
    }
    return l;
  }
  async readVintData(n) {
    const i = await this.tokenizer.peekNumber(w);
    let u = 128, l = 1;
    for (; !(i & u); ) {
      if (l > n)
        throw new v("VINT value exceeding maximum size");
      ++l, u >>= 1;
    }
    const o = new Uint8Array(l);
    return await this.tokenizer.readBuffer(o), o;
  }
  async readElement() {
    const n = await this.readVintData(this.ebmlMaxIDLength), i = await this.readVintData(this.ebmlMaxSizeLength);
    return i[0] ^= 128 >> i.length - 1, {
      id: p(n, n.length),
      len: p(i, i.length)
    };
  }
  async readFloat(n) {
    switch (n.len) {
      case 0:
        return 0;
      case 4:
        return this.tokenizer.readNumber(E);
      case 8:
        return this.tokenizer.readNumber(h);
      case 10:
        return this.tokenizer.readNumber(h);
      default:
        throw new v(`Invalid IEEE-754 float length: ${n.len}`);
    }
  }
  async readFlag(n) {
    return await this.readUint(n) === 1;
  }
  async readUint(n) {
    const i = await this.readBuffer(n);
    return p(i, n.len);
  }
  async readString(n) {
    return (await this.tokenizer.readToken(new I(n.len, "utf-8"))).replace(/\x00.*$/g, "");
  }
  async readBuffer(n) {
    const i = new Uint8Array(n.len);
    return await this.tokenizer.readBuffer(i), i;
  }
}
function p(a, n) {
  return Number(D(a, n));
}
function D(a, n) {
  const i = new Uint8Array(8), u = a.subarray(0, n);
  try {
    return i.set(u, 8 - n), T.get(i, 0);
  } catch {
    return BigInt(-1);
  }
}
function k(a) {
  return a.container && Object.keys(a.container).map((n) => {
    const i = a.container[n];
    return i.id = Number.parseInt(n), i;
  }).forEach((n) => {
    n.parent = a, k(n);
  }), a;
}
function x(a) {
  let n = "";
  return a.parent && a.parent.name !== "dtd" && (n += `${x(a.parent)}/`), n + a.name;
}
const b = f("music-metadata:parser:matroska");
class C extends z {
  constructor() {
    super(...arguments), this.seekHeadOffset = 0, this.flagUseIndexToSkipClusters = this.options.mkvUseIndex ?? !1;
  }
  async parse() {
    const n = this.tokenizer.fileInfo.size ?? Number.MAX_SAFE_INTEGER, i = new M(this.tokenizer);
    b("Initializing DTD end MatroskaIterator"), await i.iterate(U, n, {
      startNext: (u) => {
        switch (u.id) {
          case 475249515:
            return b(`Skip element: name=${u.name}, id=0x${u.id.toString(16)}`), c.IgnoreElement;
          case 524531317:
            if (this.flagUseIndexToSkipClusters && this.seekHead) {
              const l = this.seekHead.seek.find((o) => o.position + this.seekHeadOffset > this.tokenizer.position);
              if (l) {
                const o = l.position + this.seekHeadOffset - this.tokenizer.position;
                return b(`Use index to go to next position, ignoring ${o} bytes`), this.tokenizer.ignore(o), c.SkipElement;
              }
            }
            return c.IgnoreElement;
          default:
            return c.ReadNext;
        }
      },
      elementValue: async (u, l, o) => {
        switch (b(`Received: name=${u.name}, value=${l}`), u.id) {
          case 17026:
            this.metadata.setFormat("container", `EBML/${l}`);
            break;
          case 290298740:
            this.seekHead = l, this.seekHeadOffset = o;
            break;
          case 357149030:
            {
              const s = l, t = s.timecodeScale ? s.timecodeScale : 1e6;
              if (typeof s.duration == "number") {
                const r = s.duration * t / 1e9;
                await this.addTag("segment:title", s.title), this.metadata.setFormat("duration", Number(r));
              }
            }
            break;
          case 374648427:
            {
              const s = l;
              if (s != null && s.entries) {
                s.entries.forEach((r) => {
                  const m = {
                    codecName: r.codecID.replace("A_", "").replace("V_", ""),
                    codecSettings: r.codecSettings,
                    flagDefault: r.flagDefault,
                    flagLacing: r.flagLacing,
                    flagEnabled: r.flagEnabled,
                    language: r.language,
                    name: r.name,
                    type: r.trackType,
                    audio: r.audio,
                    video: r.video
                  };
                  this.metadata.addStreamInfo(m);
                });
                const t = s.entries.filter((r) => r.trackType === F.audio).reduce((r, m) => !r || m.flagDefault && !r.flagDefault || m.trackNumber < r.trackNumber ? m : r, null);
                t && (this.metadata.setFormat("codec", t.codecID.replace("A_", "")), this.metadata.setFormat("sampleRate", t.audio.samplingFrequency), this.metadata.setFormat("numberOfChannels", t.audio.channels));
              }
            }
            break;
          case 307544935:
            {
              const s = l;
              await Promise.all(s.tag.map(async (t) => {
                const r = t.target, m = r != null && r.targetTypeValue ? N[r.targetTypeValue] : r != null && r.targetType ? r.targetType : "track";
                await Promise.all(t.simpleTags.map(async (d) => {
                  const y = d.string ? d.string : d.binary;
                  await this.addTag(`${m}:${d.name}`, y);
                }));
              }));
            }
            break;
          case 423732329:
            {
              const s = l;
              await Promise.all(s.attachedFiles.filter((t) => t.mimeType.startsWith("image/")).map((t) => this.addTag("picture", {
                data: t.data,
                format: t.mimeType,
                description: t.description,
                name: t.name
              })));
            }
            break;
        }
      }
    });
  }
  async addTag(n, i) {
    await this.metadata.addTag("matroska", n, i);
  }
}
export {
  C as MatroskaParser
};
