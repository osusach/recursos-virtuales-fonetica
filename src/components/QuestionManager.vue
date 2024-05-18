<template>
	<div>
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
					class="flex flex-col gap-3 my-1"
					key="rima_form"
				>
					<input
						placeholder="Rima"
						type="text"
						id="solution"
						v-model="newQuestion.solution"
						class="input input-sm"
					/>
					<select
						v-model="newQuestion.category"
						class="font-usach-helvetica-body select select-sm"
					>
						<option disabled value="">Categoría</option>
						<option value="0">Aguda</option>
						<option value="1">Grave</option>
						<option value="2">Esdrújula</option>
					</select>
				</div>
				<button
					@click="addQuestion"
					class="rounded-lg p-1 font-usach-bebas-body text-lg bg-usach-terra-700 hover:bg-usach-terra-800"
				>
					Agregar Pregunta
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["selectedGame"]);

const activeAction = ref(false);
const newQuestion = ref({
	word: "",
	solution: "",
	difficulty: "",
	category: "",
});

const preguntas = ref({
	pindaro: [],
	rima: [],
	cat_acentual: [],
});

const questionsToAdd = ref({
	pindaro: [],
	rima: [],
	cat_acentual: [],
});

const addQuestion = () => {
	const newQ = { ...newQuestion.value };
	questionsToAdd.value[props.selectedGame].push(newQ);
	newQuestion.value = {
		word: "",
		solution: "",
		difficulty: "",
		category: "",
	};
	activeAction.value = false;
};

const removeQuestion = (pregunta) => {
	questionsToAdd.value[props.selectedGame] = questionsToAdd.value[
		props.selectedGame
	].filter((q) => q !== pregunta);
};

const applyChanges = () => {
	preguntas.value[props.selectedGame] = [
		...preguntas.value[props.selectedGame],
		...questionsToAdd.value[props.selectedGame],
	];
	questionsToAdd.value[props.selectedGame] = [];
};

const toggleQuestion = (pregunta) => {
	pregunta.active = !pregunta.active;
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
	return pregunta.active || false;
};

const closeOverlay = () => {
	activeAction.value = false;
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
