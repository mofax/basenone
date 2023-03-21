import { BaseNone } from "./src/lib.js";
import { test } from "node:test";
import assert from "node:assert";

test("BaseNone.fromNumber", () => {
    const num = 123456789;
    const baseNone = BaseNone.fromNumber(num);
    assert.strictEqual(baseNone.toNumber(), num);
})

test("BaseNone.toBigInt", () => {
    const num = 123456789;
    const baseNone = BaseNone.fromNumber(num);
    assert.strictEqual(baseNone.toBigInt(), BigInt(num));
})
