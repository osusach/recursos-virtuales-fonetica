<template>
	<div
		:class="{ hidden: !isLogged }"
		class="flex flex-col gap-6 w-[95vw] max-w-6xl"
	>
		<div class="flex flex-row flex-wrap gap-2">
			<button
				v-for="game in games"
				:key="game.key"
				@click="selectGame(game.key)"
				class="px-5 py-1 rounded-lg font-usach-bebas-body text-2xl text-white transition"
				:class="
					activeTab === game.key
						? 'bg-usach-terra-700'
						: 'bg-usach-aqua-600 hover:bg-usach-aqua-500'
				"
			>
				{{ game.label }}
			</button>
			<button
				@click="activeTab = 'export'"
				class="px-5 py-1 rounded-lg font-usach-bebas-body text-2xl text-white transition"
				:class="
					activeTab === 'export'
						? 'bg-usach-cloudy-800'
						: 'bg-usach-aqua-600 hover:bg-usach-aqua-500'
				"
			>
				Exportar
			</button>
		</div>

		<template v-if="activeTab === 'export'">
			<div class="flex flex-col gap-3 bg-usach-aqua-400 p-3 rounded-lg">
				<p class="font-usach-bebas-title text-2xl">
					Exportar preguntas
				</p>
				<div
					class="flex flex-row flex-wrap gap-2 items-center font-usach-helvetica-body"
				>
					<select v-model="exportFormat" class="select select-sm">
						<option value="csv">CSV</option>
						<option value="json">JSON</option>
					</select>
					<select v-model="exportScope" class="select select-sm">
						<option value="all">Todos los juegos</option>
						<option
							v-for="game in games"
							:key="game.key"
							:value="game.key"
						>
							{{ game.label }}
						</option>
					</select>
					<button
						@click="handleExport"
						:disabled="exporting"
						class="rounded-lg px-4 py-1 font-usach-bebas-body text-lg bg-usach-cloudy-800 hover:bg-usach-cloudy-900 text-white disabled:opacity-60"
					>
						{{ exporting ? "Exportando..." : "Exportar" }}
					</button>
				</div>
				<p class="font-usach-helvetica-body text-sm">
					Se descargará un archivo
					{{ exportFormat.toUpperCase() }} con las preguntas del
					alcance seleccionado.
				</p>
			</div>
		</template>

		<template v-else>
			<div
				class="flex flex-col xl:flex-row gap-3 justify-between bg-usach-aqua-400 p-3 rounded-lg"
			>
				<div class="flex flex-row flex-wrap gap-3 items-center">
					<input
						v-model="search"
						placeholder="Buscar..."
						type="text"
						class="input input-sm"
					/>
					<span class="font-usach-helvetica-body text-sm">
						{{ filteredQuestions.length }} preguntas ·
						{{ activeCount }} activas
					</span>
				</div>
				<div
					class="flex flex-row flex-wrap gap-2 items-center font-usach-helvetica-body"
				>
					<button
						@click="loadQuestions"
						:disabled="loading"
						class="rounded-lg px-4 py-1 font-usach-bebas-body text-lg bg-usach-aqua-800 hover:bg-usach-aqua-900 text-white disabled:opacity-60"
					>
						Refrescar
					</button>
					<button
						@click="openAdd"
						class="flex flex-row items-center gap-2 rounded-lg px-4 py-1 font-usach-bebas-body text-lg bg-usach-terra-700 hover:bg-usach-terra-800 text-white"
					>
						<img
							class="h-4 invert"
							src="/agregar.svg"
							alt="agregar"
						/>
						Agregar
					</button>
					<button
						@click="openImport"
						:disabled="importing"
						class="flex flex-row items-center gap-2 rounded-lg px-4 py-1 font-usach-bebas-body text-lg bg-usach-cloudy-800 hover:bg-usach-cloudy-900 text-white disabled:opacity-60"
					>
						{{ importing ? "Importando..." : "Importar" }}
					</button>
				</div>
			</div>

			<div
				class="relative bg-usach-aqua-100 rounded-lg overflow-auto min-h-[45vh] max-h-[60vh]"
			>
				<table
					class="w-full text-left font-usach-helvetica-body text-sm"
				>
					<thead class="sticky top-0 bg-usach-aqua-200">
						<tr>
							<th
								v-for="column in columns"
								:key="column.header"
								class="px-4 py-2 whitespace-nowrap"
							>
								{{ column.header }}
							</th>
							<th class="px-4 py-2 text-center whitespace-nowrap">
								Habilitado
							</th>
							<th class="px-4 py-2 text-center whitespace-nowrap">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="question in filteredQuestions"
							:key="question.id"
							class="border-b border-usach-aqua-200"
						>
							<td
								v-for="column in columns"
								:key="column.header"
								class="px-4 py-2"
							>
								{{ column.value(question) }}
							</td>
							<td class="px-4 py-2 text-center">
								<input
									type="checkbox"
									class="toggle toggle-info [--tglbg:rgb(220,220,220)]"
									:checked="question.is_active"
									@change="toggleQuestion(question)"
								/>
							</td>
							<td class="px-4 py-2 text-center">
								<button
									@click="openEdit(question)"
									title="Editar"
									class="bg-usach-aqua-700 hover:bg-usach-aqua-600 rounded-md p-1"
								>
									<img
										class="h-4 invert"
										src="/edit.svg"
										alt="editar"
									/>
								</button>
							</td>
						</tr>
						<tr v-if="!loading && !filteredQuestions.length">
							<td
								:colspan="columns.length + 2"
								class="text-center px-4 py-8"
							>
								No hay preguntas para este juego.
							</td>
						</tr>
					</tbody>
				</table>
				<Loading v-if="loading" class="py-8" />
			</div>

			<p
				class="font-usach-helvetica-body text-sm bg-usach-aqua-200 rounded-lg p-3"
			>
				<span class="font-semibold">Importante:</span> Para evitar
				conflictos con juegos ya existentes, las palabras no se eliminan
				de la base de datos, sino que se desactivan para futuros juegos.
				De esa manera, es posible seguir accediendo al historial y
				estadísticas de las partidas anteriores.
			</p>
		</template>

		<question-form
			v-if="formOpen"
			:game="selectedGame"
			:question="editing"
			:token="token"
			@close="formOpen = false"
			@saved="onSaved"
		/>

		<div v-if="importOpen" class="overlay" @click="closeImport">
			<div
				class="flex flex-col gap-4 bg-usach-aqua-400 p-5 rounded-lg w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto font-usach-helvetica-body"
				@click.stop
			>
				<p class="font-usach-bebas-title text-2xl">
					Importar {{ GAMES[selectedGame].label }}
				</p>

				<div class="text-sm flex flex-col gap-1">
					<p class="font-semibold">¿Cómo funciona?</p>
					<ul class="list-disc ms-5 space-y-1">
						<li>
							Usa el botón <span class="font-semibold">Exportar</span>
							de esta pestaña para descargar las preguntas
							actuales (CSV o JSON).
						</li>
						<li>
							Edita el archivo: cambia valores, agrega filas o
							marca la columna
							<span class="font-semibold">activa</span> con
							<code>si</code>/<code>no</code>.
						</li>
						<li>
							Las filas con un
							<span class="font-semibold">id</span> ya existente
							(o con la misma palabra/frase) se
							<span class="font-semibold">actualizan en el lugar</span>,
							conservando su historial de respuestas.
						</li>
						<li>
							Las filas nuevas se
							<span class="font-semibold">agregan</span>.
						</li>
						<li>
							Las palabras que no aparezcan en el archivo
							<span class="font-semibold"
								>no se modifican ni eliminan</span
							>.
						</li>
						<li>
							Antes de aplicar verás un resumen para confirmar.
						</li>
					</ul>
				</div>

				<div
					class="dropzone"
					:class="{ 'dropzone-active': dragging }"
					@click="openFilePicker"
					@dragover.prevent="dragging = true"
					@dragenter.prevent="dragging = true"
					@dragleave.prevent="dragging = false"
					@drop.prevent="handleDrop"
				>
					<p class="text-lg font-semibold">Arrastra el archivo aquí</p>
					<p class="text-sm">o haz clic para seleccionarlo</p>
					<p class="text-xs mt-1">
						Formatos: CSV o JSON · {{ GAMES[selectedGame].label }}
					</p>
				</div>

				<input
					ref="fileInput"
					type="file"
					accept=".csv,.json,text/csv,application/json"
					class="hidden"
					@change="handleImportFile"
				/>

				<div class="flex justify-end">
					<button
						@click="closeImport"
						:disabled="importing"
						class="rounded-lg px-4 py-1 font-usach-bebas-body text-lg bg-usach-cloudy-800 hover:bg-usach-cloudy-900 text-white disabled:opacity-60"
					>
						{{ importing ? "Importando..." : "Cancelar" }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Loading from "./Loading.vue";
import QuestionForm from "./QuestionForm.vue";
import {
	CATEGORIES,
	DIFFICULTIES,
	GAMES,
	GAME_KEYS,
	encodePhrase,
	exportAll,
	exportGame,
	fetchAllQuestions,
	fetchQuestions,
	parseImportFile,
	previewImport,
	applyImport,
	setQuestionActive,
} from "../utils/questions.js";

const props = defineProps(["isLogged", "token"]);

const games = GAME_KEYS.map((key) => GAMES[key]);

const activeTab = ref("pindaro");
const selectedGame = ref("pindaro");
const questions = ref([]);
const loading = ref(false);
const search = ref("");
const exportFormat = ref("csv");
const exportScope = ref("all");
const exporting = ref(false);
const formOpen = ref(false);
const editing = ref(null);
const importing = ref(false);
const importOpen = ref(false);
const dragging = ref(false);
const fileInput = ref(null);

const filteredQuestions = computed(() => {
	const term = search.value.trim().toLowerCase();
	if (!term) return questions.value;
	return questions.value.filter((question) =>
		(question.word || question.phrase || "").toLowerCase().includes(term),
	);
});

const activeCount = computed(
	() => questions.value.filter((question) => question.is_active).length,
);

const columns = computed(() => {
	if (selectedGame.value === "pindaro") {
		return [
			{ header: "Palabra", value: (q) => q.word },
			{ header: "Sílabas", value: (q) => q.answer },
			{ header: "N° fonemas", value: (q) => q.fonemas },
			{ header: "N° grafemas", value: (q) => q.grafemas },
			{
				header: "Dificultad",
				value: (q) => DIFFICULTIES[q.difficulty] ?? q.difficulty,
			},
		];
	}
	if (selectedGame.value === "rima") {
		return [
			{ header: "Palabra", value: (q) => q.word },
			{ header: "Rima", value: (q) => q.rhyme },
			{
				header: "Categoría",
				value: (q) => CATEGORIES[q.category] ?? q.category,
			},
		];
	}
	return [
		{ header: "Frase", value: (q) => q.phrase },
		{ header: "Formato", value: (q) => encodePhrase(q) },
	];
});

async function loadQuestions() {
	if (!props.token) return;
	loading.value = true;
	try {
		questions.value = await fetchQuestions(selectedGame.value, props.token);
	} catch (error) {
		alert(error.message);
		questions.value = [];
	} finally {
		loading.value = false;
	}
}

function selectGame(game) {
	activeTab.value = game;
	selectedGame.value = game;
	search.value = "";
	loadQuestions();
}

async function toggleQuestion(question) {
	const desired = !question.is_active;
	try {
		await setQuestionActive(
			selectedGame.value,
			props.token,
			question.id,
			desired,
		);
		question.is_active = desired;
	} catch (error) {
		alert(error.message);
		loadQuestions();
	}
}

function openAdd() {
	editing.value = null;
	formOpen.value = true;
}

function openEdit(question) {
	editing.value = question;
	formOpen.value = true;
}

async function onSaved() {
	formOpen.value = false;
	await loadQuestions();
}

function openImport() {
	importOpen.value = true;
}

function closeImport() {
	if (!importing.value) importOpen.value = false;
}

function openFilePicker() {
	if (!importing.value) fileInput.value?.click();
}

function importError(response) {
	const conflicts = response.payload?.conflicts || [];
	const details = conflicts
		.slice(0, 10)
		.map((conflict) => `· Fila ${conflict.row}: ${conflict.message}`)
		.join("\n");
	return `${response.message || "Error al importar"}${details ? `\n\n${details}` : ""}`;
}

async function handleImportFile(event) {
	const file = event.target.files?.[0];
	event.target.value = "";
	if (file) await processImportFile(file);
}

async function handleDrop(event) {
	dragging.value = false;
	const file = event.dataTransfer?.files?.[0];
	if (file) await processImportFile(file);
}

async function processImportFile(file) {
	if (!props.token) return;
	importing.value = true;
	try {
		const rows = parseImportFile(selectedGame.value, await file.text());
		if (!rows.length) {
			alert("El archivo no contiene filas");
			return;
		}
		const preview = await previewImport(
			selectedGame.value,
			props.token,
			rows,
		);
		if (!preview.success) {
			alert(importError(preview));
			return;
		}
		const counts = preview.payload;
		const confirmed = confirm(
			`Importar ${GAMES[selectedGame.value].label}\n\n` +
				`Se actualizarán: ${counts.toUpdate}\n` +
				`Se agregarán: ${counts.toInsert}\n` +
				`Sin cambios: ${counts.unchanged}\n` +
				`Ids no encontrados (se emparejan por palabra/frase): ${counts.idNotFound}\n\n` +
				`Las palabras que no aparezcan en el archivo no se modifican ni se eliminan.\n\n` +
				`¿Aplicar la importación?`,
		);
		if (!confirmed) return;
		const result = await applyImport(
			selectedGame.value,
			props.token,
			rows,
		);
		if (!result.success) {
			alert(importError(result));
			return;
		}
		const applied = result.payload;
		alert(
			`Importación completada\n\n` +
				`Actualizadas: ${applied.toUpdate}\n` +
				`Agregadas: ${applied.toInsert}\n` +
				`Sin cambios: ${applied.unchanged}`,
		);
		importOpen.value = false;
		await loadQuestions();
	} catch (error) {
		alert(error.message);
	} finally {
		importing.value = false;
	}
}

async function handleExport() {
	exporting.value = true;
	try {
		if (exportScope.value === "all") {
			const all = await fetchAllQuestions(props.token);
			exportAll(exportFormat.value, all);
		} else {
			const rows = await fetchQuestions(exportScope.value, props.token);
			exportGame(exportScope.value, exportFormat.value, rows);
		}
	} catch (error) {
		alert(error.message);
	} finally {
		exporting.value = false;
	}
}

onMounted(loadQuestions);

defineExpose({ loadQuestions });
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
	z-index: 50;
}

.dropzone {
	cursor: pointer;
	border: 2px dashed rgba(0, 0, 0, 0.35);
	border-radius: 0.5rem;
	padding: 1.5rem;
	text-align: center;
	transition: background-color 0.15s ease;
}

.dropzone-active {
	background-color: rgba(255, 255, 255, 0.45);
}
</style>
