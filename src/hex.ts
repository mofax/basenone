export function BytesToHex(bytes: Uint8Array): string {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

export function HexToBytes(hex: string): Uint8Array {
    // check that hex is a valid hex string
    if (!/^[0-9a-fA-F]*$/.test(hex)) {
        throw new Error('invalid hex string');
    }
    // check that hex is an even number of characters
    if (hex.length % 2 !== 0) {
        throw new Error('invalid hex string');
    }
    // convert hex to bytes
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(`${hex[i]}${hex[i + 1]}`, 16);
    }
    return bytes;
}
