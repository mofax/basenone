import { BytesToHex, HexToBytes } from "./hex.js";
import { padBinary, bytesToBinary, binaryToBytes } from "./binary.js"
import { base64ToBytes, bytesToBase64 } from "./base64.js"

export class BaseNone {
    private _raw: Uint8Array;
    constructor(raw: Uint8Array) {
        if (!(raw instanceof Uint8Array)) throw new Error("Input must be Uint8Array");
        this._raw = raw;
    }
    getRaw(): Uint8Array {
        return this._raw;
    }
    toAscii(): string {
        const chars: string[] = [];
        for (let i = 0; i < this._raw.length; i++) {
            chars.push(String.fromCharCode(this._raw[i]));
        }
        return chars.join("");
    }
    toBase64(): string {
        return bytesToBase64(this._raw);
    }
    toBinary(): string {
        return bytesToBinary(this._raw);
    }
    toHex(): string {
        return BytesToHex(this._raw);
    }
    toUTF8(): string {
        let utf8decoder = new TextDecoder('utf-8');
        return utf8decoder.decode(this._raw);
    }
    static fromAscii(ascii: string): BaseNone {
        let bytes = new Uint8Array(ascii.length);
        for (let i = 0; i < ascii.length; i++) {
            bytes[i] = ascii.charCodeAt(i);
        }
        return new BaseNone(bytes);
    }
    static fromBase64(base64: string): BaseNone {
        return new BaseNone(base64ToBytes(base64));
    }
    static fromBinary(binary: string): BaseNone {
        return new BaseNone(binaryToBytes(padBinary(binary)));
    }
    static fromHex(hex: string): BaseNone {
        return new BaseNone(HexToBytes(hex));
    }
    static fromUTF8(utf8: string): BaseNone {
        let utf8encoder = new TextEncoder();
        return new BaseNone(utf8encoder.encode(utf8));
    }
}

export { padBinary }
