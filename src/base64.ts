const encodingTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function encode3Bytes(b: Uint8Array): string {
    let output = '';

    if (b.length !== 3) throw new Error(`encode3Bytes expects 3 bytes but got ${b.length}`);

    const octet_a = b[0];
    const octet_b = b[1];
    const octet_c = b[2];

    const triple = (octet_a << 16) | (octet_b << 8) | octet_c;

    output += encodingTable[(triple >> 18) & 0x3F];
    output += encodingTable[(triple >> 12) & 0x3F];
    output += encodingTable[(triple >> 6) & 0x3F];
    output += encodingTable[(triple >> 0) & 0x3F];

    return output;
}

export function bytesToBase64(bytes: Uint8Array): string {
    let encoded = "";
    let remainingBytes = bytes.length % 3;
    for (let i = 0; i < bytes.length - remainingBytes; i += 3) {
        let toEncode = new Uint8Array(3);
        toEncode[0] = bytes[i];
        toEncode[1] = bytes[i + 1];
        toEncode[2] = bytes[i + 2];
        encoded += encode3Bytes(toEncode);
    }
    if (remainingBytes === 1) {
        const byte1 = bytes[bytes.length - 1];

        const first6Bits = (byte1 >> 2) & 0x3F;
        const last2Bits = (byte1 << 4) & 0x3F;

        encoded += encodingTable[first6Bits];
        encoded += encodingTable[last2Bits];
        encoded += "==";
    } else if (remainingBytes === 2) {
        const byte1 = bytes[bytes.length - 2];
        const byte2 = bytes[bytes.length - 1];

        const num = (byte1 << 8) | byte2;

        encoded += encodingTable[(num >> 10) & 0x3F];
        encoded += encodingTable[(num >> 4) & 0x3F];
        encoded += encodingTable[(num << 2) & 0x3F];
        encoded += "=";
    }
    return encoded;
}

function decode4Chars(s: string): Uint8Array {
    if (s.length !== 4) throw new Error(`decode4Chars expects 4 characters but got ${s.length}`);

    const char1 = s[0];
    const char2 = s[1];
    const char3 = s[2];
    const char4 = s[3];

    const index1 = encodingTable.indexOf(char1);
    const index2 = encodingTable.indexOf(char2);

    let index3: number;
    let index4: number;

    if (s.endsWith("==")) {
        // 1 byte
        const byte1 = (index1 << 2) | (index2 >> 4);
        return new Uint8Array([byte1]);
    } else if (s.endsWith("=")) {
        // 2 bytes
        index3 = encodingTable.indexOf(char3);
        const byte1 = (index1 << 2) | (index2 >> 4);
        const byte2 = (index2 << 4) | (index3 >> 2);
        return new Uint8Array([byte1, byte2]);
    } else {
        // 3 bytes
        index3 = encodingTable.indexOf(char3);
        index4 = encodingTable.indexOf(char4);
        const byte1 = (index1 << 2) | (index2 >> 4);
        const byte2 = (index2 << 4) | (index3 >> 2);
        const byte3 = (index3 << 6) | index4;
        return new Uint8Array([byte1, byte2, byte3]);
    }
}

function base64DecodeLength(str: string): number {
    const padding = str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0;
    const length = Math.floor((str.length * 6) / 8) - padding;
    return length;
}

export function base64ToBytes(arg: string): Uint8Array {
    if (arg.length % 4 !== 0) throw new Error(`base64ToBytes expects a string with a length that is a multiple of 4 but got ${arg.length}`)
    let final = new Uint8Array(base64DecodeLength(arg));
    let offset = 0;
    for (let i = 0; i < arg.length - 3; i += 4) {
        const result = decode4Chars(`${arg[i]}${arg[i + 1]}${arg[i + 2]}${arg[i + 3]}`);
        result.forEach(byte => {
            final[offset] = byte;
            offset++;
        })
    }
    return final;
}
