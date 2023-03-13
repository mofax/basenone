import { test } from "node:test";
import assert from "node:assert";
import { bytesToBase64, base64ToBytes } from "./base64.js";

test("bytesToBase64: 3 bytes", () => {
    const uint8 = new Uint8Array([45, 23, 12]);
    const bufferBase64 = Buffer.from(uint8).toString('base64');
    const base64 = bytesToBase64(uint8);
    console.log(base64)
    assert.strictEqual(bufferBase64, base64);
})

test("bytesToBase64: 4 bytes", () => {
    const uint8 = new Uint8Array([64, 7, 83, 4]);
    const bufferBase64 = Buffer.from(uint8).toString('base64');
    const base64 = bytesToBase64(uint8);
    console.log(base64)
    assert.strictEqual(bufferBase64, base64);
})

test("bytesToBase64: 5 bytes", () => {
    const uint8 = new Uint8Array([64, 7, 83, 4, 38]);
    const bufferBase64 = Buffer.from(uint8).toString('base64');
    const base64 = bytesToBase64(uint8);
    console.log(base64)
    assert.strictEqual(bufferBase64, base64);
})

test("base64ToBytes: 3 bytes", () => {
    const base64 = "LRcM";
    const expected = new Uint8Array([45, 23, 12]);
    const uint8 = base64ToBytes(base64);
    assert.deepStrictEqual(uint8, expected);
})

test("base64ToBytes: 4 bytes", () => {
    const base64 = "QAdTBA==";
    const expected = new Uint8Array([64, 7, 83, 4]);
    const uint8 = base64ToBytes(base64);
    assert.deepStrictEqual(uint8, expected);
})

test("base64ToBytes: 5 bytes", () => {
    const base64 = "QAdTBCY=";
    const expected = new Uint8Array([64, 7, 83, 4, 38]);
    const uint8 = base64ToBytes(base64);
    assert.deepStrictEqual(uint8, expected);
})
