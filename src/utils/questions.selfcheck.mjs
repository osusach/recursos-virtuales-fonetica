import assert from "node:assert";
import { csvCell, encodePhrase, parseAcentualPhrase } from "./questions.js";

assert.deepStrictEqual(
	parseAcentualPhrase("Mi-1-casa-5-es-1-mágica-6-y-1-azul-4"),
	[
		{ word: "Mi", answer: 1 },
		{ word: "casa", answer: 5 },
		{ word: "es", answer: 1 },
		{ word: "mágica", answer: 6 },
		{ word: "y", answer: 1 },
		{ word: "azul", answer: 4 },
	],
);

assert.strictEqual(parseAcentualPhrase("Mi-1-casa"), null, "odd tokens");
assert.strictEqual(parseAcentualPhrase("Mi-x"), null, "non numeric answer");
assert.strictEqual(parseAcentualPhrase("Mi-0"), null, "out of range");
assert.strictEqual(parseAcentualPhrase(""), null, "empty");

assert.strictEqual(
	encodePhrase({
		words: [
			{ word: "casa", answer: 2, word_pos: 0 },
			{ word: "azul", answer: 2, word_pos: 1 },
		],
	}),
	"casa-2-azul-2",
);

assert.strictEqual(csvCell("simple"), "simple");
assert.strictEqual(csvCell('con "comillas"'), '"con ""comillas"""');
assert.strictEqual(csvCell("a,b"), '"a,b"');
assert.strictEqual(csvCell("linea\nnueva"), '"linea\nnueva"');
assert.strictEqual(csvCell(null), "");

console.log("questions self-check OK");
