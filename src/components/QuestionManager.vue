<template>
	<div class="flex flex-col gap-4">
		<p class="font-semibold">Preguntas</p>
		<div
			class="flex flex-row w-full min-h-[40vh] max-h-[40vh] bg-usach-aqua-100 rounded-lg"
		>
			<ul
				class="w-full text-center overflow-y-scroll pt-3 font-usach-helvetica-body"
			>
				<li
					v-for="pregunta in preguntas[selectedGame]"
					class="flex flex-row py-1 gap-2 mb-2"
					:key="pregunta.word"
				>
					<div class="w-[90%]">
						<div
							:class="{ hidden: selectedGame !== 'pindaro' }"
							class="grid grid-cols-4"
						>
							<div>Palabra: {{ pregunta.word }}</div>
							<div>
								Respuesta (Cantidad de sílabas):
								{{ pregunta.answer }}
							</div>
							<div>
								Dificultad: {{ procDificultad(pregunta) }}
							</div>
							<div>
								Pregunta Disponible:
								<input
									type="checkbox"
									class="toggle toggle-info [--tglbg:rgb(220,220,220)]"
									@change="toggleQuestion(pregunta)"
									:checked="procIsActive(pregunta)"
								/>
							</div>
						</div>
						<div
							:class="{ hidden: selectedGame !== 'rima' }"
							class="grid grid-cols-4"
						>
							<div>Palabra: {{ pregunta.word }}</div>
							<div>Rima: {{ pregunta.rhyme }}</div>
							<div>Categoría: {{ procCategoria(pregunta) }}</div>
							<div>
								Pregunta Disponible:
								<input
									type="checkbox"
									class="toggle toggle-info [--tglbg:rgb(220,220,220)]"
									@change="toggleQuestion(pregunta)"
									:checked="procIsActive(pregunta)"
								/>
							</div>
						</div>
						<div
							:class="{ hidden: selectedGame !== 'cat_acentual' }"
							class="grid grid-cols-5"
						>
							<div class="col-span-3">
								Frase: {{ pregunta.acentual_phrase }}
							</div>
							<div>
								Pregunta Disponible:
								<input
									type="checkbox"
									class="toggle toggle-info [--tglbg:rgb(220,220,220)]"
									@change="toggleQuestion(pregunta)"
									:checked="procIsActive(pregunta)"
								/>
							</div>
						</div>
						<hr class="h-px bg-usach-aqua-200 border-0 mt-3" />
					</div>
				</li>
			</ul>
		</div>
		<p class="font-semibold">Preguntas a agregar</p>
		<div
			class="flex flex-row w-full min-h-[40vh] max-h-[40vh] bg-usach-aqua-100 rounded-lg"
		>
			<ul
				class="w-full text-center overflow-y-scroll pt-3 font-usach-helvetica-body"
			>
				<li
					v-for="pregunta in questionsToAdd[selectedGame]"
					class="flex flex-row py-1 gap-2 mb-2"
					:key="pregunta.word"
				>
					<div class="w-[90%]">
						<div
							:class="{ hidden: selectedGame !== 'pindaro' }"
							class="grid grid-cols-3"
						>
							<div>Palabra: {{ pregunta.word }}</div>
							<div>
								Respuesta (Cantidad de sílabas):
								{{ pregunta.answer }}
							</div>
							<div>
								Dificultad: {{ procDificultad(pregunta) }}
							</div>
						</div>
						<div
							:class="{ hidden: selectedGame !== 'rima' }"
							class="grid grid-cols-3"
						>
							<div>Palabra: {{ pregunta.word }}</div>
							<div>Rima: {{ pregunta.rhyme }}</div>
							<div>Categoría: {{ procCategoria(pregunta) }}</div>
						</div>
						<div
							:class="{ hidden: selectedGame !== 'cat_acentual' }"
						>
							<div>Frase: {{ pregunta.acentual_phrase }}</div>
						</div>
						<hr class="h-px bg-usach-aqua-200 border-0 mt-3" />
					</div>
					<button
						@click="removeQuestion(pregunta)"
						class="bg-usach-rouge-600 rounded-md px-1"
					>
						<img class="h-5" src="/delete.svg" />
					</button>
				</li>
			</ul>
		</div>
		<div v-if="activeAction" class="overlay" @click="closeOverlay">
			<div
				class="flex flex-col gap-2 justify-center font-usach-helvetica-body text-sm bg-usach-aqua-400 p-5 rounded-lg min-w-[50vh]"
				@click.stop
			>
				<input
					placeholder="Escriba la palabra o frase"
					type="text"
					id="newQuestion"
					v-model="newQuestion.word"
					class="input input-sm"
				/>
				<div
					:class="{ hidden: selectedGame !== 'pindaro' }"
					class="flex flex-col gap-3 my-1"
					key="pindaro_form"
				>
					<input
						placeholder="Respuesta"
						type="text"
						id="solution"
						v-model="newQuestion.solution"
						class="input input-sm"
					/>
					<select
						v-model="newQuestion.difficulty"
						class="font-usach-helvetica-body select select-sm"
					>
						<option disabled value="">Dificultad</option>
						<option value="0">Fácil</option>
						<option value="1">Medio</option>
						<option value="2">Difícil</option>
					</select>
				</div>
				<div
					:class="{ hidden: selectedGame !== 'rima' }"
					class="flex flex-col gap-3 mb-1"
					key="rima_form"
				>
					<input
						placeholder="Rima de la palabra"
						type="text"
						id="rhyme"
						v-model="newQuestion.rhyme"
						class="input input-sm"
					/>
					<select
						v-model="newQuestion.category"
						class="font-usach-helvetica-body select select-sm"
					>
						<option disabled value="">Categoria</option>
						<option value="a">Aguda</option>
						<option value="g">Grave</option>
						<option value="e">Esdrújula</option>
					</select>
				</div>
				<div
					:class="{ hidden: selectedGame !== 'cat_acentual' }"
					class="text-[15px]"
				>
					<span class="font-semibold">Formato:</span>
					<ul class="ms-4">
						<li>monosílabos átonos: 1</li>
						<li>monosílabos tónicos: 2</li>
						<li>Bisílabos átonos: 3</li>
						<li>palabras agudas: 4</li>
						<li>palabras graves:5</li>
						<li>palabras esdrújulas:6</li>
					</ul>
					<span class="font-semibold"> ejemplo: </span>
					<p class="ms-4">Mi-1-casa-5-es-1-mágica-6-y-1-azul-4</p>
				</div>
				<button
					class="font-usach-bebas-body text-xl bg-usach-terra-700 hover:bg-usach-terra-800 p-2 rounded-lg"
					@click="validateNewQuestionFields"
				>
					Confirmar
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive } from "vue";

const url = import.meta.env.VITE_API_URL;

const props = defineProps(["selectedGame", "token", "activeAction"]);
const emit = defineEmits(["update:activeAction"]);

const closeOverlay = () => {
	emit("update:activeAction", false);
	clearText();
};

const preguntas = reactive({
	pindaro: [],
	rima: [],
	cat_acentual: [],
});

const newQuestion = reactive({
	// General attributes
	word: "",
	// Pindaro attributes
	solution: "",
	difficulty: "",
	// Rima attributes
	category: "",
	rhyme: "",
});

const questionsToAdd = reactive({
	pindaro: [],
	rima: [],
	cat_acentual: [],
});

const questionsToRemove = reactive({
	pindaro: [],
	rima: [],
	cat_acentual: [],
});

const questionsToActivate = reactive({
	pindaro: [],
	rima: [],
	cat_acentual: [],
});

const loadWords = async (path) => {
	const response = await fetch(`${url}${path}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			token: props.token,
		}),
	});
	const res = await response.json();
	return res.payload.silabas.data || res.payload.silabas;
};

const getAll = async () => {
	preguntas.pindaro = await loadWords("/silabas/allSilabas");
	preguntas.rima = await loadWords("/rimas/allRimas");
	preguntas.cat_acentual = await loadWords("/acentual/allAcentuales");
};

const formatearTexto = function (texto) {
	const partes = texto.split("-");
	const palabras = partes.filter(function (part) {
		return isNaN(part);
	});
	const resultado = palabras.join(" ");
	return resultado;
};

const addQuestion = (juego) => {
	// validamos si la palabra ya existe considerando que en cat_acentual viene con el formato
	// Mi-1-casa-5-es-1-mágica-6-y-1-azul-4
	if (juego === "cat_acentual") {
		const palabras = newQuestion.word.split("-");
		const palabrasFiltradas = palabras.filter(function (part) {
			return isNaN(part);
		});
		const palabrasUnicas = [...new Set(palabrasFiltradas)];
		const palabrasUnicasTexto = palabrasUnicas.join(" ");
		const ocurrencias = preguntas[props.selectedGame].filter(
			(obj) =>
				obj.acentual_phrase.toLowerCase() ===
				palabrasUnicasTexto.toLowerCase(),
		).length;

		const ocurrenciasAdd = questionsToAdd[props.selectedGame].filter(
			(obj) =>
				obj.acentual_phrase.toLowerCase() ===
				palabrasUnicasTexto.toLowerCase(),
		).length;

		// Si hay más de una ocurrencia, muestra un alert
		if (ocurrencias >= 1 || ocurrenciasAdd >= 1) {
			alert(`La palabra '${palabrasUnicasTexto}' está repetida.`);
			return;
		}
	} else {
		// Contamos cuántas veces aparece la palabra en la lista
		const ocurrencias = preguntas[props.selectedGame].filter(
			(obj) => obj.word.toLowerCase() === newQuestion.word.toLowerCase(),
		).length;

		const ocurrenciasAdd = questionsToAdd[props.selectedGame].filter(
			(obj) => obj.word.toLowerCase() === newQuestion.word.toLowerCase(),
		).length;

		// Si hay más de una ocurrencia, muestra un alert
		if (ocurrencias >= 1 || ocurrenciasAdd >= 1) {
			alert(`La palabra '${newQuestion.word}' está repetida.`);
			return;
		}
	}

	const pregunta = { word: newQuestion.word };

	if (juego === "pindaro") {
		pregunta.answer = parseInt(newQuestion.solution);
		pregunta.difficulty = parseInt(newQuestion.difficulty);
	} else if (juego === "rima") {
		pregunta.category = newQuestion.category;
		pregunta.rhyme = newQuestion.rhyme;
	} else if (juego === "cat_acentual") {
		pregunta.acentual_phrase = formatearTexto(newQuestion.word);
	}

	questionsToAdd[props.selectedGame].push(pregunta);

	closeOverlay();
};

const validateNewQuestionFields = () => {
	if (newQuestion.word === "") {
		alert("Debe ingresar una palabra");
	} else if (props.selectedGame === "pindaro") {
		if (newQuestion.solution === "") {
			alert("Debe ingresar una respuesta");
		} else if (newQuestion.difficulty === "") {
			alert("Debe ingresar una dificultad");
		} else {
			addQuestion(props.selectedGame);
		}
	} else if (props.selectedGame === "rima") {
		if (newQuestion.category === "") {
			alert("Debe ingresar una categoria");
		} else if (newQuestion.rhyme === "") {
			alert("Debe ingresar una rima");
		} else {
			addQuestion(props.selectedGame);
		}
	} else if (props.selectedGame === "cat_acentual") {
		addQuestion(props.selectedGame);
	}
};

const removeQuestion = (pregunta) => {
	// Si esta en preguntas para agregar se elimina
	const index = questionsToAdd[props.selectedGame].indexOf(pregunta);
	if (index !== -1) {
		questionsToAdd[props.selectedGame].splice(index, 1);
	}

	const index2 = questionsToActivate[props.selectedGame].indexOf(pregunta.id);
	if (index2 !== -1) {
		questionsToActivate[props.selectedGame].splice(index2, 1);
		return;
	}

	if (pregunta.id !== undefined) {
		questionsToRemove[props.selectedGame].push(pregunta.id);
	}
	if (pregunta.acentual_id !== undefined) {
		questionsToRemove[props.selectedGame].push(pregunta.acentual_id);
	}
};

const activateQuestion = (pregunta) => {
	const index = questionsToRemove[props.selectedGame].indexOf(pregunta.id);
	if (index !== -1) {
		questionsToRemove[props.selectedGame].splice(index, 1);
		return;
	}

	if (pregunta.id !== undefined) {
		questionsToActivate[props.selectedGame].push(pregunta.id);
	}
	if (pregunta.acentual_id !== undefined) {
		questionsToActivate[props.selectedGame].push(pregunta.acentual_id);
	}
};

const toggleQuestion = (pregunta) => {
	const index = preguntas[props.selectedGame].indexOf(pregunta);

	preguntas[props.selectedGame][index].is_active =
		(preguntas[props.selectedGame][index].is_active + 1) % 2;
	const is_active = preguntas[props.selectedGame][index].is_active;

	if (is_active === 1) {
		activateQuestion(pregunta);
	} else {
		removeQuestion(pregunta);
	}
};

const togglePostQuestion = async (route, ids) => {
	const res = await fetch(`${url}${route}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			token: props.token,
			ids,
		}),
	});

	const resJson = await res.json();
	return resJson.success;
};

const applyChanges = async () => {
	const resAdd = [null, null, null];
	const resDelete = [null, null, null];
	const resActivate = [null, null, null];
	if (props.selectedGame === "") {
		alert("Debe seleccionar un juego");
	}

	if (questionsToAdd.pindaro.length > 0) {
		resAdd[0] = await fetch(`${url}/silabas/uploadSilaba`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: props.token,
				silabas: questionsToAdd.pindaro.map((question) => {
					return {
						word: question.word,
						answer_value: question.answer,
						difficulty: question.difficulty,
					};
				}),
			}),
		});
		resAdd[0] = await resAdd[0].json();
		resAdd[0] = await resAdd[0].success;
	}
	if (questionsToRemove.pindaro.length > 0) {
		resDelete[0] = togglePostQuestion(
			"/silabas/deleteSilabas",
			questionsToRemove.pindaro,
		);
	}
	if (questionsToActivate.pindaro.length > 0) {
		resActivate[0] = togglePostQuestion(
			"/silabas/activateSilabas",
			questionsToActivate.pindaro,
		);
	}
	if (questionsToAdd.rima.length > 0) {
		resAdd[1] = await fetch(`${url}/rimas/uploadRimas`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: props.token,
				rimas: questionsToAdd.rima,
			}),
		});
		resAdd[1] = await resAdd[1].json();
		resAdd[1] = await resAdd[1].success;
	}
	if (questionsToRemove.rima.length > 0) {
		resDelete[1] = togglePostQuestion(
			"/rimas/deleteRimas",
			questionsToRemove.rima,
		);
	}
	if (questionsToActivate.rima.length > 0) {
		resActivate[1] = togglePostQuestion(
			"/rimas/activateRimas",
			questionsToActivate.rima,
		);
	}
	if (questionsToAdd.cat_acentual.length > 0) {
		resAdd[2] = await fetch(`${url}/acentual/uploadAcentual`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: props.token,
				acentuales: questionsToAdd.cat_acentual.map((question) => {
					return {
						phrase: question.word,
					};
				}),
			}),
		});
		resAdd[2] = await resAdd[2].json();
		resAdd[2] = await resAdd[2].success;
	}
	if (questionsToRemove.cat_acentual.length > 0) {
		resDelete[2] = togglePostQuestion(
			"/acentual/deleteAcentual",
			questionsToRemove.cat_acentual,
		);
	}
	if (questionsToActivate.cat_acentual.length > 0) {
		resActivate[2] = togglePostQuestion(
			"/acentual/activateAcentual",
			questionsToActivate.cat_acentual,
		);
	}

	const categories = ["pindaro", "rimas", "cat_acentual"];

	const actions = {
		add: "agregadas correctamente a",
		delete: "eliminadas correctamente de",
		activate: "activadas correctamente en",
	};

	let alertMessage = "";

	let success = false;

	categories.forEach((category) => {
		const index = categories.indexOf(category);
		const addResult = resAdd[index];
		const deleteResult = resDelete[index];
		const activateResult = resActivate[index];

		if (addResult) {
			alertMessage += `Preguntas ${actions.add} ${category}\n`;
			questionsToAdd[category] = [];
			success = true;
		} else if (!addResult && addResult !== null) {
			alertMessage += `Error al agregar preguntas a ${category}\n`;
		}

		if (deleteResult) {
			alertMessage += `Preguntas ${actions.delete} ${category}\n`;
			questionsToRemove[category] = [];
			success = true;
		} else if (!deleteResult && deleteResult !== null) {
			alertMessage += `Error al eliminar preguntas de ${category}\n`;
		}

		if (activateResult) {
			alertMessage += `Preguntas ${actions.activate} ${category}\n`;
			questionsToActivate[category] = [];
			success = true;
		} else if (!activateResult && activateResult !== null) {
			alertMessage += `Error al activar preguntas en ${category}\n`;
		}
	});

	if (alertMessage !== "") {
		alert(alertMessage);
	}

	if (success) {
		getAll();
	}
};

defineExpose({ applyChanges, getAll });

const clearText = () => {
	newQuestion.word = "";
	newQuestion.solution = "";
	newQuestion.difficulty = "";
	newQuestion.category = "";
	newQuestion.rhyme = "";
};

const procDificultad = (pregunta) => {
	const difficulties = ["Fácil", "Medio", "Difícil"];
	return difficulties[pregunta.difficulty];
};

const procCategoria = (pregunta) => {
	const categories = ["Aguda", "Grave", "Esdrújula"];
	return categories[pregunta.category];
};

const procIsActive = (pregunta) => {
	return pregunta.is_active === 1;
};
</script>

<style scoped>
.hidden {
	display: none;
}
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
