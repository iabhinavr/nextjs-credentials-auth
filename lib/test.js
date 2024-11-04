const base32UpperCaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const base32LowerCaseAlphabet = "abcdefghijklmnopqrstuvwxyz234567";

const base32DecodeMap = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9, K: 10,	L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19, U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11, m: 12, n: 13, o: 14, p: 15, q: 16, r: 17, s: 18, t: 19, u: 20, v: 21, w: 22, x: 23, y: 24, z: 25, "2": 26, "3": 27, "4": 28, "5": 29, "6": 30, "7": 31 };

function encodeBase32LowerCaseNoPadding( bytes,	alphabet, padding ) {
	let result = "";
	for (let i = 0; i < bytes.byteLength; i += 5) {
		let buffer = 0n;
		let bufferBitSize = 0;
		for (let j = 0; j < 5 && i + j < bytes.byteLength; j++) {
			buffer = (buffer << 8n) | BigInt(bytes[i + j]);
			bufferBitSize += 8;
		}
		if (bufferBitSize % 5 !== 0) {
			buffer = buffer << BigInt(5 - (bufferBitSize % 5));
			bufferBitSize += 5 - (bufferBitSize % 5);
		}
		for (let j = 0; j < 8; j++) {
			if (bufferBitSize >= 5) {
				result += alphabet[Number((buffer >> BigInt(bufferBitSize - 5)) & 0x1fn)];
				bufferBitSize -= 5;
			} else if (bufferBitSize > 0) {
				result += alphabet[Number((buffer << BigInt(6 - bufferBitSize)) & 0x3fn)];
				bufferBitSize = 0;
			} else if (padding === "none") {
				result += "=";
			}
		}
	}
	return result;
}

let arr = new Uint8Array(20);
crypto.getRandomValues(arr);

const token = encodeBase32LowerCaseNoPadding(arr, base32LowerCaseAlphabet, "none");
console.log(token);

