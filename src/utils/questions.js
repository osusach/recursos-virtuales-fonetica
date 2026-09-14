const url = import.meta.env?.VITE_API_URL;

export const GAMES = {
	pindaro: {
		key: "pindaro",
		label: "Píndaro",
		list: "/silabas/allSilabas",
		listKey: "silabas",
		add: "/silabas/uploadSilaba",
		edit: "/silabas/editSilaba",
		remove: "/silabas/deleteSilabas",
		activate: "/silabas/activateSilabas",
	},
	rima: {
		key: "rima",
		label: "Rimas",
		list: "/rimas/allRimas",
		listKey: "rimas",
		add: "/rimas/uploadRimas",
		edit: "/rimas/editRima",
		remove: "/rimas/deleteRimas",
		activate: "/rimas/activateRimas",
	},
	cat_acentual: {
		key: "cat_acentual",
		label: "Acentual",
		list: "/acentual/allAcentuales",
		listKey: "acentuales",
		add: "/acentual/uploadAcentual",
		edit: "/acentual/editAcentual",
		remove: "/acentual/deleteAcentuales",
		activate: "/acentual/activateAcentuales",
	},
};

export const GAME_KEYS = Object.keys(GAMES);
export const DIFFICULTIES = ["Fácil", "Medio", "Difícil"];
export const CATEGORIES = { a: "Aguda", g: "Grave", e: "Esdrújula" };

async function post(path, body) {
	const response = await fetch(`${url}${path}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	return response.json();
}

function toActive(value) {
	return value === 1 || value === true || value === "1";
}

function normalize(game, raw) {
	if (game === "pindaro") {
		return {
			id: raw.id,
			word: raw.word,
			answer: Number(raw.answer),
			difficulty: Number(raw.difficulty),
			fonemas: Number(raw.fonemas),
			grafemas: Number(raw.grafemas),
			is_active: toActive(raw.is_active),
		};
	}
	if (game === "rima") {
		return {
			id: raw.id,
			word: raw.word,
			rhyme: raw.rhyme,
			category: raw.category,
			is_active: toActive(raw.is_active),
		};
	}
	return {
		id: raw.acentual_id,
		phrase: raw.acentual_phrase,
		is_active: toActive(raw.is_active),
		words: (raw.words || [])
			.slice()
			.sort((a, b) => a.word_pos - b.word_pos),
	};
}

export function encodePhrase(question) {
	return (question.words || [])
		.map((word) => `${word.word}-${word.answer}`)
		.join("-");
}

export function parseAcentualPhrase(phrase) {
	const parts = phrase.split("-");
	if (!parts.length || parts.length % 2 !== 0) return null;
	const words = [];
	for (let i = 0; i < parts.length; i += 2) {
		const word = parts[i].trim();
		const answer = Number(parts[i + 1]);
		if (!word || !Number.isInteger(answer) || answer < 1 || answer > 6) {
			return null;
		}
		words.push({ word, answer });
	}
	return words.length ? words : null;
}

export async function fetchQuestions(game, token) {
	const config = GAMES[game];
	const response = await post(config.list, { token });
	if (!response.success) {
		throw new Error(response.message || "Error al cargar las preguntas");
	}
	return (response.payload?.[config.listKey] || []).map((question) =>
		normalize(game, question),
	);
}

export async function fetchAllQuestions(token) {
	const entries = await Promise.all(
		GAME_KEYS.map(async (game) => [
			game,
			await fetchQuestions(game, token),
		]),
	);
	return Object.fromEntries(entries);
}

export async function addQuestion(game, token, data) {
	const config = GAMES[game];
	let body;
	if (game === "pindaro") {
		body = {
			silabas: [
				{
					word: data.word,
					answer_value: Number(data.answer),
					difficulty: Number(data.difficulty),
					fonemas: Number(data.fonemas),
					grafemas: Number(data.grafemas),
				},
			],
		};
	} else if (game === "rima") {
		body = {
			rimas: [
				{ word: data.word, category: data.category, rhyme: data.rhyme },
			],
		};
	} else {
		body = { acentuales: [{ phrase: data.phrase }] };
	}
	const response = await post(config.add, { token, ...body });
	if (!response.success) {
		throw new Error(response.message || "Error al agregar la pregunta");
	}
	return response;
}

export async function editQuestion(game, token, data) {
	const config = GAMES[game];
	let body;
	if (game === "pindaro") {
		body = {
			silaba: {
				id: data.id,
				word: data.word,
				answer_value: Number(data.answer),
				difficulty: Number(data.difficulty),
				fonemas: Number(data.fonemas),
				grafemas: Number(data.grafemas),
			},
		};
	} else if (game === "rima") {
		body = {
			rima: {
				id: data.id,
				word: data.word,
				category: data.category,
				rhyme: data.rhyme,
			},
		};
	} else {
		body = { acentual_id: data.id, phrase: data.phrase };
	}
	const response = await post(config.edit, { token, ...body });
	if (!response.success) {
		throw new Error(response.message || "Error al editar la pregunta");
	}
	return response;
}

export async function setQuestionActive(game, token, id, active) {
	const config = GAMES[game];
	const response = await post(active ? config.activate : config.remove, {
		token,
		ids: [id],
	});
	if (!response.success) {
		throw new Error(response.message || "Error al actualizar la pregunta");
	}
	return response;
}

const CSV_COLUMNS = {
	pindaro: [
		{ header: "id", value: (q) => q.id },
		{ header: "palabra", value: (q) => q.word },
		{ header: "silabas", value: (q) => q.answer },
		{ header: "fonemas", value: (q) => q.fonemas },
		{ header: "grafemas", value: (q) => q.grafemas },
		{
			header: "dificultad",
			value: (q) => DIFFICULTIES[q.difficulty] ?? q.difficulty,
		},
		{ header: "activa", value: (q) => (q.is_active ? "si" : "no") },
	],
	rima: [
		{ header: "id", value: (q) => q.id },
		{ header: "palabra", value: (q) => q.word },
		{ header: "rima", value: (q) => q.rhyme },
		{
			header: "categoria",
			value: (q) => CATEGORIES[q.category] ?? q.category,
		},
		{ header: "activa", value: (q) => (q.is_active ? "si" : "no") },
	],
	cat_acentual: [
		{ header: "id", value: (q) => q.id },
		{ header: "frase", value: (q) => q.phrase },
		{ header: "formato", value: (q) => encodePhrase(q) },
		{ header: "activa", value: (q) => (q.is_active ? "si" : "no") },
	],
};

export function csvCell(value) {
	const text = value === null || value === undefined ? "" : String(value);
	if (/[",\n]/.test(text)) {
		return `"${text.replace(/"/g, '""')}"`;
	}
	return text;
}

function toCSV(columns, rows) {
	const head = columns.map((column) => csvCell(column.header)).join(",");
	const body = rows.map((row) =>
		columns.map((column) => csvCell(column.value(row))).join(","),
	);
	return [head, ...body].join("\n");
}

function download(filename, content, mimeType) {
	const blob = new Blob([content], { type: mimeType });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();
	URL.revokeObjectURL(link.href);
}

function stamp() {
	return new Date().toISOString().slice(0, 10);
}

export function exportGame(game, format, questions) {
	if (format === "json") {
		download(
			`preguntas-${game}-${stamp()}.json`,
			JSON.stringify(questions, null, 2),
			"application/json",
		);
		return;
	}
	const csv = toCSV(CSV_COLUMNS[game], questions);
	download(`preguntas-${game}-${stamp()}.csv`, csv, "text/csv;charset=utf-8");
}

export function exportAll(format, allQuestions) {
	if (format === "json") {
		download(
			`preguntas-todas-${stamp()}.json`,
			JSON.stringify(allQuestions, null, 2),
			"application/json",
		);
		return;
	}
	const columns = [
		{ header: "juego", value: (row) => GAMES[row.game].label },
		{ header: "id", value: (row) => row.id },
		{ header: "palabra", value: (row) => row.word ?? "" },
		{ header: "frase", value: (row) => row.phrase ?? "" },
		{ header: "silabas", value: (row) => row.answer ?? "" },
		{ header: "fonemas", value: (row) => row.fonemas ?? "" },
		{ header: "grafemas", value: (row) => row.grafemas ?? "" },
		{ header: "rima", value: (row) => row.rhyme ?? "" },
		{
			header: "categoria",
			value: (row) =>
				row.category ? CATEGORIES[row.category] ?? row.category : "",
		},
		{
			header: "dificultad",
			value: (row) =>
				row.difficulty !== undefined
					? DIFFICULTIES[row.difficulty] ?? row.difficulty
					: "",
		},
		{ header: "activa", value: (row) => (row.is_active ? "si" : "no") },
	];
	const rows = GAME_KEYS.flatMap((game) =>
		(allQuestions[game] || []).map((question) => ({ ...question, game })),
	);
	download(
		`preguntas-todas-${stamp()}.csv`,
		toCSV(columns, rows),
		"text/csv;charset=utf-8",
	);
}
