import { u as W, h as P, s as V, e as $, f as b, j as o, k as E, m as J, l as A, S as h, A as Q, B as q, c as R, T as z } from "./index-CFQAOdfH.js";
class e {
  static fromBin(t, r = 0) {
    return new e(e.decode(t, r));
  }
  /**
   * Decode GUID in format like "B503BF5F-2EA9-CF11-8EE3-00C00C205365"
   * @param objectId Binary GUID
   * @param offset Read offset in bytes, default 0
   * @returns GUID as dashed hexadecimal representation
   */
  static decode(t, r = 0) {
    const a = new DataView(t.buffer, r);
    return `${a.getUint32(0, !0).toString(16)}-${a.getUint16(4, !0).toString(16)}-${a.getUint16(6, !0).toString(16)}-${a.getUint16(8).toString(16)}-${W(t.slice(r + 10, r + 16))}`.toUpperCase();
  }
  /**
   * Decode stream type
   * @param mediaType Media type GUID
   * @returns Media type
   */
  static decodeMediaType(t) {
    switch (t.str) {
      case e.AudioMedia.str:
        return "audio";
      case e.VideoMedia.str:
        return "video";
      case e.CommandMedia.str:
        return "command";
      case e.Degradable_JPEG_Media.str:
        return "degradable-jpeg";
      case e.FileTransferMedia.str:
        return "file-transfer";
      case e.BinaryMedia.str:
        return "binary";
    }
  }
  /**
   * Encode GUID
   * @param guid GUID like: "B503BF5F-2EA9-CF11-8EE3-00C00C205365"
   * @returns Encoded Binary GUID
   */
  static encode(t) {
    const r = new Uint8Array(16), a = new DataView(r.buffer);
    return a.setUint32(0, Number.parseInt(t.slice(0, 8), 16), !0), a.setUint16(4, Number.parseInt(t.slice(9, 13), 16), !0), a.setUint16(6, Number.parseInt(t.slice(14, 18), 16), !0), r.set(P(t.slice(19, 23)), 8), r.set(P(t.slice(24)), 10), r;
  }
  constructor(t) {
    this.str = t;
  }
  equals(t) {
    return this.str === t.str;
  }
  toBin() {
    return e.encode(this.str);
  }
}
e.HeaderObject = new e("75B22630-668E-11CF-A6D9-00AA0062CE6C");
e.DataObject = new e("75B22636-668E-11CF-A6D9-00AA0062CE6C");
e.SimpleIndexObject = new e("33000890-E5B1-11CF-89F4-00A0C90349CB");
e.IndexObject = new e("D6E229D3-35DA-11D1-9034-00A0C90349BE");
e.MediaObjectIndexObject = new e("FEB103F8-12AD-4C64-840F-2A1D2F7AD48C");
e.TimecodeIndexObject = new e("3CB73FD0-0C4A-4803-953D-EDF7B6228F0C");
e.FilePropertiesObject = new e("8CABDCA1-A947-11CF-8EE4-00C00C205365");
e.StreamPropertiesObject = new e("B7DC0791-A9B7-11CF-8EE6-00C00C205365");
e.HeaderExtensionObject = new e("5FBF03B5-A92E-11CF-8EE3-00C00C205365");
e.CodecListObject = new e("86D15240-311D-11D0-A3A4-00A0C90348F6");
e.ScriptCommandObject = new e("1EFB1A30-0B62-11D0-A39B-00A0C90348F6");
e.MarkerObject = new e("F487CD01-A951-11CF-8EE6-00C00C205365");
e.BitrateMutualExclusionObject = new e("D6E229DC-35DA-11D1-9034-00A0C90349BE");
e.ErrorCorrectionObject = new e("75B22635-668E-11CF-A6D9-00AA0062CE6C");
e.ContentDescriptionObject = new e("75B22633-668E-11CF-A6D9-00AA0062CE6C");
e.ExtendedContentDescriptionObject = new e("D2D0A440-E307-11D2-97F0-00A0C95EA850");
e.ContentBrandingObject = new e("2211B3FA-BD23-11D2-B4B7-00A0C955FC6E");
e.StreamBitratePropertiesObject = new e("7BF875CE-468D-11D1-8D82-006097C9A2B2");
e.ContentEncryptionObject = new e("2211B3FB-BD23-11D2-B4B7-00A0C955FC6E");
e.ExtendedContentEncryptionObject = new e("298AE614-2622-4C17-B935-DAE07EE9289C");
e.DigitalSignatureObject = new e("2211B3FC-BD23-11D2-B4B7-00A0C955FC6E");
e.PaddingObject = new e("1806D474-CADF-4509-A4BA-9AABCB96AAE8");
e.ExtendedStreamPropertiesObject = new e("14E6A5CB-C672-4332-8399-A96952065B5A");
e.AdvancedMutualExclusionObject = new e("A08649CF-4775-4670-8A16-6E35357566CD");
e.GroupMutualExclusionObject = new e("D1465A40-5A79-4338-B71B-E36B8FD6C249");
e.StreamPrioritizationObject = new e("D4FED15B-88D3-454F-81F0-ED5C45999E24");
e.BandwidthSharingObject = new e("A69609E6-517B-11D2-B6AF-00C04FD908E9");
e.LanguageListObject = new e("7C4346A9-EFE0-4BFC-B229-393EDE415C85");
e.MetadataObject = new e("C5F8CBEA-5BAF-4877-8467-AA8C44FA4CCA");
e.MetadataLibraryObject = new e("44231C94-9498-49D1-A141-1D134E457054");
e.IndexParametersObject = new e("D6E229DF-35DA-11D1-9034-00A0C90349BE");
e.MediaObjectIndexParametersObject = new e("6B203BAD-3F11-48E4-ACA8-D7613DE2CFA7");
e.TimecodeIndexParametersObject = new e("F55E496D-9797-4B5D-8C8B-604DFE9BFB24");
e.CompatibilityObject = new e("26F18B5D-4584-47EC-9F5F-0E651F0452C9");
e.AdvancedContentEncryptionObject = new e("43058533-6981-49E6-9B74-AD12CB86D58C");
e.AudioMedia = new e("F8699E40-5B4D-11CF-A8FD-00805F5C442B");
e.VideoMedia = new e("BC19EFC0-5B4D-11CF-A8FD-00805F5C442B");
e.CommandMedia = new e("59DACFC0-59E6-11D0-A3AC-00A0C90348F6");
e.JFIF_Media = new e("B61BE100-5B4E-11CF-A8FD-00805F5C442B");
e.Degradable_JPEG_Media = new e("35907DE0-E415-11CF-A917-00805F5C442B");
e.FileTransferMedia = new e("91BD222C-F21C-497A-8B6D-5AA86BFC0185");
e.BinaryMedia = new e("3AFB65E2-47EF-40F2-AC2C-70A90D71D343");
e.ASF_Index_Placeholder_Object = new e("D9AADE20-7C17-4F9C-BC28-8555DD98E2A2");
function _(n) {
  return K[n];
}
function j(n) {
  return V($(n, "utf-16le"));
}
const K = [
  j,
  U,
  X,
  Y,
  Z,
  L,
  U
];
function U(n) {
  return new Uint8Array(n);
}
function X(n, t = 0) {
  return L(n, t) === 1;
}
function Y(n, t = 0) {
  return b.get(n, t);
}
function Z(n, t = 0) {
  return o.get(n, t);
}
function L(n, t = 0) {
  return E.get(n, t);
}
class H extends J("ASF") {
}
var v;
(function(n) {
  n[n.UnicodeString = 0] = "UnicodeString", n[n.ByteArray = 1] = "ByteArray", n[n.Bool = 2] = "Bool", n[n.DWord = 3] = "DWord", n[n.QWord = 4] = "QWord", n[n.Word = 5] = "Word";
})(v || (v = {}));
const G = {
  len: 30,
  get: (n, t) => ({
    objectId: e.fromBin(n, t),
    objectSize: Number(o.get(n, t + 16)),
    numberOfHeaderObjects: b.get(n, t + 24)
    // Reserved: 2 bytes
  })
}, g = {
  len: 24,
  get: (n, t) => ({
    objectId: e.fromBin(n, t),
    objectSize: Number(o.get(n, t + 16))
  })
};
class w {
  constructor(t) {
    this.len = Number(t.objectSize) - g.len;
  }
  postProcessTag(t, r, a, s) {
    if (r === "WM/Picture")
      t.push({ id: r, value: I.fromBuffer(s) });
    else {
      const c = _(a);
      if (!c)
        throw new H(`unexpected value headerType: ${a}`);
      t.push({ id: r, value: c(s) });
    }
  }
}
class M extends w {
  get(t, r) {
    return null;
  }
}
class O extends w {
  get(t, r) {
    return {
      fileId: e.fromBin(t, r),
      fileSize: o.get(t, r + 16),
      creationDate: o.get(t, r + 24),
      dataPacketsCount: o.get(t, r + 32),
      playDuration: o.get(t, r + 40),
      sendDuration: o.get(t, r + 48),
      preroll: o.get(t, r + 56),
      flags: {
        broadcast: A(t, r + 64, 24),
        seekable: A(t, r + 64, 25)
      },
      // flagsNumeric: Token.UINT32_LE.get(buf, off + 64),
      minimumDataPacketSize: b.get(t, r + 68),
      maximumDataPacketSize: b.get(t, r + 72),
      maximumBitrate: b.get(t, r + 76)
    };
  }
}
O.guid = e.FilePropertiesObject;
class k extends w {
  get(t, r) {
    return {
      streamType: e.decodeMediaType(e.fromBin(t, r)),
      errorCorrectionType: e.fromBin(t, r + 8)
      // ToDo
    };
  }
}
k.guid = e.StreamPropertiesObject;
class S {
  constructor() {
    this.len = 22;
  }
  get(t, r) {
    const a = new DataView(t.buffer, r);
    return {
      reserved1: e.fromBin(t, r),
      reserved2: a.getUint16(16, !0),
      extensionDataSize: a.getUint16(18, !0)
    };
  }
}
S.guid = e.HeaderExtensionObject;
const f = {
  len: 20,
  get: (n, t) => ({
    entryCount: new DataView(n.buffer, t).getUint16(16, !0)
  })
};
async function N(n) {
  const t = await n.readNumber(E);
  return (await n.readToken(new h(t * 2, "utf-16le"))).replace("\0", "");
}
async function ee(n) {
  const t = await n.readToken(f), r = [];
  for (let a = 0; a < t.entryCount; ++a)
    r.push(await re(n));
  return r;
}
async function te(n) {
  const t = await n.readNumber(E), r = new Uint8Array(t);
  return await n.readBuffer(r), r;
}
async function re(n) {
  const t = await n.readNumber(E);
  return {
    type: {
      videoCodec: (t & 1) === 1,
      audioCodec: (t & 2) === 2
    },
    codecName: await N(n),
    description: await N(n),
    information: await te(n)
  };
}
class l extends w {
  get(t, r) {
    const a = [], s = new DataView(t.buffer, r);
    let c = 10;
    for (let i = 0; i < l.contentDescTags.length; ++i) {
      const d = s.getUint16(i * 2, !0);
      if (d > 0) {
        const u = l.contentDescTags[i], C = c + d;
        a.push({ id: u, value: j(t.slice(r + c, r + C)) }), c = C;
      }
    }
    return a;
  }
}
l.guid = e.ContentDescriptionObject;
l.contentDescTags = ["Title", "Author", "Copyright", "Description", "Rating"];
class x extends w {
  get(t, r) {
    const a = [], s = new DataView(t.buffer, r), c = s.getUint16(0, !0);
    let i = 2;
    for (let d = 0; d < c; d += 1) {
      const u = s.getUint16(i, !0);
      i += 2;
      const C = j(t.slice(r + i, r + i + u));
      i += u;
      const m = s.getUint16(i, !0);
      i += 2;
      const B = s.getUint16(i, !0);
      i += 2;
      const p = t.slice(r + i, r + i + B);
      i += B, this.postProcessTag(a, C, m, p);
    }
    return a;
  }
}
x.guid = e.ExtendedContentDescriptionObject;
class T extends w {
  get(t, r) {
    const a = new DataView(t.buffer, r);
    return {
      startTime: o.get(t, r),
      endTime: o.get(t, r + 8),
      dataBitrate: a.getInt32(12, !0),
      bufferSize: a.getInt32(16, !0),
      initialBufferFullness: a.getInt32(20, !0),
      alternateDataBitrate: a.getInt32(24, !0),
      alternateBufferSize: a.getInt32(28, !0),
      alternateInitialBufferFullness: a.getInt32(32, !0),
      maximumObjectSize: a.getInt32(36, !0),
      flags: {
        reliableFlag: A(t, r + 40, 0),
        seekableFlag: A(t, r + 40, 1),
        resendLiveCleanpointsFlag: A(t, r + 40, 2)
      },
      // flagsNumeric: Token.UINT32_LE.get(buf, off + 64),
      streamNumber: a.getInt16(42, !0),
      streamLanguageId: a.getInt16(44, !0),
      averageTimePerFrame: a.getInt32(52, !0),
      streamNameCount: a.getInt32(54, !0),
      payloadExtensionSystems: a.getInt32(56, !0),
      streamNames: [],
      // ToDo
      streamPropertiesObject: null
    };
  }
}
T.guid = e.ExtendedStreamPropertiesObject;
class D extends w {
  get(t, r) {
    const a = [], s = new DataView(t.buffer, r), c = s.getUint16(0, !0);
    let i = 2;
    for (let d = 0; d < c; d += 1) {
      i += 4;
      const u = s.getUint16(i, !0);
      i += 2;
      const C = s.getUint16(i, !0);
      i += 2;
      const m = s.getUint32(i, !0);
      i += 4;
      const B = j(t.slice(r + i, r + i + u));
      i += u;
      const p = t.slice(r + i, r + i + m);
      i += m, this.postProcessTag(a, B, C, p);
    }
    return a;
  }
}
D.guid = e.MetadataObject;
class y extends D {
}
y.guid = e.MetadataLibraryObject;
class I {
  static fromBuffer(t) {
    return new I(t.length).get(t, 0);
  }
  constructor(t) {
    this.len = t;
  }
  get(t, r) {
    const a = new DataView(t.buffer, r), s = a.getUint8(0), c = a.getInt32(1, !0);
    let i = 5;
    for (; a.getUint16(i) !== 0; )
      i += 2;
    const d = new h(i - 5, "utf-16le").get(t, 5);
    for (; a.getUint16(i) !== 0; )
      i += 2;
    const u = new h(i - 5, "utf-16le").get(t, 5);
    return {
      type: Q[s],
      format: d,
      description: u,
      size: c,
      data: t.slice(i + 4)
    };
  }
}
const F = R("music-metadata:parser:ASF"), ae = "asf";
class ie extends q {
  async parse() {
    const t = await this.tokenizer.readToken(G);
    if (!t.objectId.equals(e.HeaderObject))
      throw new H(`expected asf header; but was not found; got: ${t.objectId.str}`);
    try {
      await this.parseObjectHeader(t.numberOfHeaderObjects);
    } catch (r) {
      F("Error while parsing ASF: %s", r);
    }
  }
  async parseObjectHeader(t) {
    let r;
    do {
      const a = await this.tokenizer.readToken(g);
      switch (F("header GUID=%s", a.objectId.str), a.objectId.str) {
        case O.guid.str: {
          const s = await this.tokenizer.readToken(new O(a));
          this.metadata.setFormat("duration", Number(s.playDuration / BigInt(1e3)) / 1e4 - Number(s.preroll) / 1e3), this.metadata.setFormat("bitrate", s.maximumBitrate);
          break;
        }
        case k.guid.str: {
          const s = await this.tokenizer.readToken(new k(a));
          this.metadata.setFormat("container", `ASF/${s.streamType}`);
          break;
        }
        case S.guid.str: {
          const s = await this.tokenizer.readToken(new S());
          await this.parseExtensionObject(s.extensionDataSize);
          break;
        }
        case l.guid.str:
          r = await this.tokenizer.readToken(new l(a)), await this.addTags(r);
          break;
        case x.guid.str:
          r = await this.tokenizer.readToken(new x(a)), await this.addTags(r);
          break;
        case e.CodecListObject.str: {
          const s = await ee(this.tokenizer);
          s.forEach((i) => {
            this.metadata.addStreamInfo({
              type: i.type.videoCodec ? z.video : z.audio,
              codecName: i.codecName
            });
          });
          const c = s.filter((i) => i.type.audioCodec).map((i) => i.codecName).join("/");
          this.metadata.setFormat("codec", c);
          break;
        }
        case e.StreamBitratePropertiesObject.str:
          await this.tokenizer.ignore(a.objectSize - g.len);
          break;
        case e.PaddingObject.str:
          F("Padding: %s bytes", a.objectSize - g.len), await this.tokenizer.ignore(a.objectSize - g.len);
          break;
        default:
          this.metadata.addWarning(`Ignore ASF-Object-GUID: ${a.objectId.str}`), F("Ignore ASF-Object-GUID: %s", a.objectId.str), await this.tokenizer.readToken(new M(a));
      }
    } while (--t);
  }
  async addTags(t) {
    await Promise.all(t.map(({ id: r, value: a }) => this.metadata.addTag(ae, r, a)));
  }
  async parseExtensionObject(t) {
    do {
      const r = await this.tokenizer.readToken(g), a = r.objectSize - g.len;
      switch (r.objectId.str) {
        case T.guid.str:
          await this.tokenizer.readToken(new T(r));
          break;
        case D.guid.str: {
          const s = await this.tokenizer.readToken(new D(r));
          await this.addTags(s);
          break;
        }
        case y.guid.str: {
          const s = await this.tokenizer.readToken(new y(r));
          await this.addTags(s);
          break;
        }
        case e.PaddingObject.str:
          await this.tokenizer.ignore(a);
          break;
        case e.CompatibilityObject.str:
          await this.tokenizer.ignore(a);
          break;
        case e.ASF_Index_Placeholder_Object.str:
          await this.tokenizer.ignore(a);
          break;
        default:
          this.metadata.addWarning(`Ignore ASF-Object-GUID: ${r.objectId.str}`), await this.tokenizer.readToken(new M(r));
          break;
      }
      t -= r.objectSize;
    } while (t > 0);
  }
}
export {
  ie as AsfParser
};
