BaseNone is a simple dependency free library to encode Uint8Array to strings and back.

BaseNone should work in any modern browser, compliant javascript runtimes and Node.js.

### Installation

```sh
npm install basenone
```

### Constructor

```js
import BaseNone from 'basenone'

const baseNone = new BaseNone(Uint8Array)
```

### Ascii

```js
// static method
const baseNone = BaseNone.fromAscii('My ascii string');

// raw Uint8Array
const raw = baseNone.getRaw();

// BaseNone to ascii
const ascii: string = baseNone.toAscii();
```

### Binary

```ts
// static method
const baseNone = BaseNone.fromBinary('0100100001100101011011000110110001101111');

// raw Uint8Array
const raw = baseNone.getRaw();

// BaseNone to binary
const binary: string = baseNone.toBinary();
```

### Base 16 (Hex)

```js
// static method
const baseNone = BaseNone.fromHex('48656c6c6f2c20576f726c6421');

// raw Uint8Array
const raw = baseNone.getRaw();

// BaseNone to hex
const hex: string = baseNone.toHex();
```

### base64

```js
// static method
const baseNone = BaseNone.fromBase64('SGVsbG8sIFdvcmxkIQ==');

// raw Uint8Array
const raw = baseNone.getRaw();

// BaseNone to base64
const base64: string = baseNone.toBase64();
```

### UTF-8

```js
// static method
const baseNone = BaseNone.fromUTF8('你好世界');

// raw Uint8Array
const raw = baseNone.getRaw();

// BaseNone to utf8
const utf8: string = baseNone.toUTF8();
```

### Numbers and BigInt

```js
// static method
const baseNone = BaseNone.fromNumber(123456789);
// fromNumber can take a bigint
const baseNone = BaseNone.fromNumber(BigInt(123456789));

// raw Uint8Array
const raw = baseNone.getRaw();

// BaseNone to number
const number: number = baseNone.toNumber();
const bigInt: bigint = baseNone.toBigInt();
```

## In Progress
 - Base 32
 - Base 62
