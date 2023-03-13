import { test } from "node:test";
import assert from "node:assert";
import { BytesToHex, HexToBytes } from "./hex.js";

test("BytesToHex", () => {
    const hex = BytesToHex(new Uint8Array([0b00000001, 0b00000010, 0b00000011]));
    assert.strictEqual(hex, "010203");
})

test("HexToBytes", () => {
    const bytes = HexToBytes("010203");
    assert.deepStrictEqual(bytes, new Uint8Array([0b00000001, 0b00000010, 0b00000011]));
})

test("HexToBytes: Fails if hex is invalid", () => {
    // invalid hex string
    assert.throws(() => HexToBytes("0102G3"));
    // invalid hex string length
    assert.throws(() => HexToBytes("01F"));
})
