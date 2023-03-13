export function bytesToBinary(bytes: Uint8Array): string {
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
        binary += bytes[i].toString(2).padStart(8, '0');
    }
    return binary;
}

export function binaryToBytes(binary: string): Uint8Array {
    if (binary.length % 8 !== 0) throw new Error(`binaryToBytes expects a binary string with a length that is a multiple of 8 but got ${binary.length}`);
    const length = binary.length / 8;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = parseInt(binary.slice(i * 8, (i + 1) * 8), 2);
    }
    return bytes;
}

export function padBinary(binary: string) {
    if (binary.length % 8 === 0) return binary;
    return binary.padStart(Math.ceil(binary.length / 8) * 8, '0');
}
