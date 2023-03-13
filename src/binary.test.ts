import { bytesToBinary, binaryToBytes, padBinary } from "./binary.js";
import { it, test } from "node:test";
import assert from "node:assert";

test("padBinary", () => {
    const padded = padBinary("1010101011");
    assert.strictEqual(padded, "0000001010101011");
    assert.strictEqual(padded.length, 16);
})

test("bytesToBinary", () => {
    const binary = bytesToBinary(new Uint8Array([0b00000001, 0b00000010, 0b00000011]));
    assert.strictEqual(binary, "000000010000001000000011");
});

test("binaryToBytes", () => {
    const bytes = binaryToBytes("000000010000001000000011");
    assert.deepStrictEqual(bytes, new Uint8Array([0b00000001, 0b00000010, 0b00000011]));
})
