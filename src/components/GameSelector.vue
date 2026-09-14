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
</style>
