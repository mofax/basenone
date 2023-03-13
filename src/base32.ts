const encodingTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

// Map each group of 5 bits to 1 printable character, based on the 5-bit value using the Base32 character set map.

// If the last 5-byte block has only 1 byte of input data, 
// pad 4 bytes of zero (\x0000). After encoding it as a normal block, override the last 6 characters with 6 equal signs (======).

// If the last 5-byte block has only 2 bytes of input data, 
// pad 3 bytes of zero (\x0000). After encoding it as a normal block, override the last 4 characters with 4 equal signs (====).

// If the last 5-byte block has only 3 bytes of input data, 
// pad 2 bytes of zero (\x0000). After encoding it as a normal block, override the last 3 characters with 3 equal signs (===).

// If the last 5-byte block has only 4 bytes of input data, 
// pad 1 byte of zero (\x0000). After encoding it as a normal block, override the last 1 characters with 1 equal sign (=).

function encode5Bytes(bytes: Uint8Array): string {
    if (bytes.length !== 5) throw new Error(`encode5Bytes expects 5 bytes but got ${bytes.length}`);

    const byte1 = bytes[0];
    const byte2 = bytes[1];
    const byte3 = bytes[2];
    const byte4 = bytes[3];
    const byte5 = bytes[4];

    const num = (byte1 << 32) | (byte2 << 24) | (byte3 << 16) | (byte4 << 8) | byte5;

    const first5Bits = (num >> 35) & 0x1F;
    const second5Bits = (num >> 30) & 0x1F;
    const third5Bits = (num >> 25) & 0x1F;
    const fourth5Bits = (num >> 20) & 0x1F;
    const fifth5Bits = (num >> 15) & 0x1F;
    const sixth5Bits = (num >> 10) & 0x1F;
    const seventh5Bits = (num >> 5) & 0x1F;
    const eighth5Bits = num & 0x1F;

    return (
        encodingTable[first5Bits] +
        encodingTable[second5Bits] +
        encodingTable[third5Bits] +
        encodingTable[fourth5Bits] +
        encodingTable[fifth5Bits] +
        encodingTable[sixth5Bits] +
        encodingTable[seventh5Bits] +
        encodingTable[eighth5Bits]
    );
}

export function bytesToBase32(bytes: Uint8Array): string {
    let encoded = "";
    let remainingBytes = bytes.length % 5;
    for (let i = 0; i < bytes.length - remainingBytes; i += 5) {
        let toEncode = new Uint8Array(5);
        toEncode[0] = bytes[i];
        toEncode[1] = bytes[i + 1];
        toEncode[2] = bytes[i + 2];
        toEncode[3] = bytes[i + 3];
        toEncode[4] = bytes[i + 4];
        encoded += encode5Bytes(toEncode);
    }
    if (remainingBytes === 1) {
        let toEncode = new Uint8Array(5);
        toEncode[0] = bytes[bytes.length - 1];
        toEncode[1] = 0;
        toEncode[2] = 0;
        toEncode[3] = 0;
        toEncode[4] = 0;
        encoded += encode5Bytes(toEncode) + "======";
    }
    if (remainingBytes === 2) {
        let toEncode = new Uint8Array(5);
        toEncode[0] = bytes[bytes.length - 2];
        toEncode[1] = bytes[bytes.length - 1];
        toEncode[2] = 0;
        toEncode[3] = 0;
        toEncode[4] = 0;
        encoded += encode5Bytes(toEncode) + "====";
    }
    if (remainingBytes === 3) {
        let toEncode = new Uint8Array(5);
        toEncode[0] = bytes[bytes.length - 3];
        toEncode[1] = bytes[bytes.length - 2];
        toEncode[2] = bytes[bytes.length - 1];
        toEncode[3] = 0;
        toEncode[4] = 0;
        encoded += encode5Bytes(toEncode) + "===";
    }
    if (remainingBytes === 4) {
        let toEncode = new Uint8Array(5);
        toEncode[0] = bytes[bytes.length - 4];
        toEncode[1] = bytes[bytes.length - 3];
        toEncode[2] = bytes[bytes.length - 2];
        toEncode[3] = bytes[bytes.length - 1];
        toEncode[4] = 0;
        encoded += encode5Bytes(toEncode) + "=";
    }
    return encoded;
}

function decode5Bytes(str: string): Uint8Array {
    if (str.length !== 8) throw new Error(`decode5Bytes expects 8 characters but got ${str.length}`);

    const first5Bits = encodingTable.indexOf(str[0]);
    const second5Bits = encodingTable.indexOf(str[1]);
    const third5Bits = encodingTable.indexOf(str[2]);
    const fourth5Bits = encodingTable.indexOf(str[3]);
    const fifth5Bits = encodingTable.indexOf(str[4]);
    const sixth5Bits = encodingTable.indexOf(str[5]);
    const seventh5Bits = encodingTable.indexOf(str[6]);
    const eighth5Bits = encodingTable.indexOf(str[7]);

    const num = (first5Bits << 35) | (second5Bits << 30) | (third5Bits << 25) | (fourth5Bits << 20) | (fifth5Bits << 15) | (sixth5Bits << 10) | (seventh5Bits << 5) | eighth5Bits;

    const byte1 = (num >> 32) & 0xFF;
    const byte2 = (num >> 24) & 0xFF;
    const byte3 = (num >> 16) & 0xFF;
    const byte4 = (num >> 8) & 0xFF;
    const byte5 = num & 0xFF;

    return new Uint8Array([byte1, byte2, byte3, byte4, byte5]);
}
