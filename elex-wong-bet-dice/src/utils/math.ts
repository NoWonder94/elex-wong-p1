import assert from 'assert';
import BN from 'bn.js';

export class UInt32 extends BN {
  /**
   * Convert to Buffer representation
   */
  toBuffer(): Buffer {
    const a = super.toArray().reverse();
    const b = Buffer.from(a);
    if (b.length === 4) {
      return b;
    }
    assert(b.length < 4, 'UInt32 too large');

    const zeroPad = Buffer.alloc(4);
    b.copy(zeroPad);
    return zeroPad;
  }

  /**
   * Construct a UInt32 from Buffer representation
   */
  static fromBuffer(buffer: Buffer): BN {
    assert(buffer.length === 4, `Invalid buffer length: ${buffer.length}`);
    return new BN(
      [...buffer]
        .reverse()
        .map((i) => `00${i.toString(16)}`.slice(-2))
        .join(''),
      16
    );
  }
}

export class UInt64 extends BN {
  /**
   * Convert to Buffer representation
   */
  toBuffer(): Buffer {
    const a = super.toArray().reverse();
    const b = Buffer.from(a);
    if (b.length === 8) {
      return b;
    }
    assert(b.length < 8, 'UInt64 too large');

    const zeroPad = Buffer.alloc(8);
    b.copy(zeroPad);
    return zeroPad;
  }

  /**
   * Construct a UInt64 from Buffer representation
   */
  static fromBuffer(buffer: Buffer): BN {
    assert(buffer.length === 8, `Invalid buffer length: ${buffer.length}`);
    return new BN(
      [...buffer]
        .reverse()
        .map((i) => `00${i.toString(16)}`.slice(-2))
        .join(''),
      16
    );
  }
}

export class UInt128 extends BN {
  /**
   * Convert to Buffer representation
   */
  toBuffer(): Buffer {
    const a = super.toArray().reverse();
    const b = Buffer.from(a);
    if (b.length === 16) {
      return b;
    }
    assert(b.length < 16, 'UInt128 too large');

    const zeroPad = Buffer.alloc(16);
    b.copy(zeroPad);
    return zeroPad;
  }

  /**
   * Construct a UInt128 from Buffer representation
   */
  static fromBuffer(buffer: Buffer): BN {
    assert(buffer.length === 16, `Invalid buffer length: ${buffer.length}`);
    return new BN(
      [...buffer]
        .reverse()
        .map((i) => `00${i.toString(16)}`.slice(-2))
        .join(''),
      16
    );
  }
}