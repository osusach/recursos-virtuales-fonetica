import assert from "node:assert";
import {
	csvCell,
	encodePhrase,
	parseAcentualPhrase,
	parseCSV,
	parseImportFile,
} from "./questions.js";

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

assert.deepStrictEqual(parseCSV("a,b\n1,2\n"), [
	["a", "b"],
	["1", "2"],
]);
assert.deepStrictEqual(parseCSV('a,b\n"x,y","he said ""hi"""\n'), [
	["a", "b"],
	["x,y", 'he said "hi"'],
]);
assert.deepStrictEqual(parseCSV('a\n"linea\nnueva"\n'), [
	["a"],
	["linea\nnueva"],
]);

const pindaroCSV = [
	"id,palabra,silabas,fonemas,grafemas,dificultad,activa",
	"1,Casa,2,4,4,Fácil,si",
].join("\n");
assert.deepStrictEqual(parseImportFile("pindaro", pindaroCSV), [
	{
		id: 1,
		word: "Casa",
		answer_value: 2,
		difficulty: 0,
		fonemas: 4,
		grafemas: 4,
		is_active: true,
	},
]);

const rimaCSV = [
	"id,palabra,rima,categoria,activa",
	"7,Amor,or,Aguda,no",
].join("\n");
assert.deepStrictEqual(parseImportFile("rima", rimaCSV), [
	{ id: 7, word: "Amor", rhyme: "or", category: "a", is_active: false },
]);

const acentualJSON = JSON.stringify([
	{
		id: 3,
		phrase: "Mi casa",
		is_active: true,
		words: [
			{ word: "casa", word_pos: 1, answer: 5 },
			{ word: "Mi", word_pos: 0, answer: 1 },
		],
	},
]);
assert.deepStrictEqual(parseImportFile("cat_acentual", acentualJSON), [
	{ id: 3, phrase: "Mi-1-casa-5", is_active: true },
]);

const acentualCSV = ["id,frase,formato,activa", "1,Mi casa,Mi-1-casa-5,si"].join(
	"\n",
);
assert.deepStrictEqual(parseImportFile("cat_acentual", acentualCSV), [
	{ id: 1, phrase: "Mi-1-casa-5", is_active: true },
]);

assert.throws(
	() => parseImportFile("rima", pindaroCSV),
	/columnas/,
	"a Píndaro file must be rejected in the Rimas tab",
);
assert.throws(
	() =>
		parseImportFile(
			"pindaro",
			"id,palabra,silabas,dificultad\n1,Casa,2,Fácil",
		),
	/fonemas/,
	"missing fonemas/grafemas must be rejected",
);

console.log("questions self-check OK");
