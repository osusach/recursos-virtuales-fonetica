<template>
	<div class="overlay" @click="close">
		<div
			class="flex flex-col gap-3 justify-center font-usach-helvetica-body text-sm bg-usach-aqua-400 p-5 rounded-lg w-[90vw] max-w-lg max-h-[90vh] overflow-y-auto"
			@click.stop
		>
			<p class="font-usach-bebas-title text-2xl">
				{{ isEditing ? "Editar pregunta" : "Agregar pregunta" }}
				· {{ GAMES[game].label }}
			</p>

			<template v-if="game === 'cat_acentual'">
				<div class="text-[15px]">
					<span class="font-semibold">Formato:</span>
					<ul class="ms-4">
						<li>monosílabos átonos: 1</li>
						<li>monosílabos tónicos: 2</li>
						<li>Bisílabos átonos: 3</li>
						<li>palabras agudas: 4</li>
						<li>palabras graves: 5</li>
						<li>palabras esdrújulas: 6</li>
					</ul>
					<span class="font-semibold">ejemplo: </span>
					<p class="ms-4">Mi-1-casa-5-es-1-mágica-6-y-1-azul-4</p>
				</div>
				<label class="flex flex-col gap-1">
					<span class="font-semibold"
						>Frase (palabra-respuesta por palabra)</span
					>
					<input
						v-model="form.phrase"
						placeholder="Escriba la frase en el formato indicado"
						type="text"
						class="input input-sm"
					/>
				</label>
			</template>

			<template v-else>
				<label class="flex flex-col gap-1">
					<span class="font-semibold">Palabra</span>
					<input
						v-model="form.word"
						placeholder="Escriba la palabra"
						type="text"
						class="input input-sm"
					/>
				</label>

				<template v-if="game === 'pindaro'">
					<label class="flex flex-col gap-1">
						<span class="font-semibold">Cantidad de sílabas</span>
						<input
							v-model="form.answer"
							placeholder="Cantidad de sílabas"
							type="number"
							min="1"
							class="input input-sm"
						/>
					</label>
					<label class="flex flex-col gap-1">
						<span class="font-semibold"
							>Número de fonemas</span
						>
						<input
							v-model="form.fonemas"
							placeholder="Número de fonemas"
							type="number"
							min="0"
							class="input input-sm"
						/>
					</label>
					<label class="flex flex-col gap-1">
						<span class="font-semibold"
							>Número de grafemas</span
						>
						<input
							v-model="form.grafemas"
							placeholder="Número de grafemas"
							type="number"
							min="0"
							class="input input-sm"
						/>
					</label>
					<label class="flex flex-col gap-1">
						<span class="font-semibold">Dificultad</span>
						<select
							v-model="form.difficulty"
							class="font-usach-helvetica-body select select-sm"
						>
							<option disabled value="">Dificultad</option>
							<option value="0">Fácil</option>
							<option value="1">Medio</option>
							<option value="2">Difícil</option>
						</select>
					</label>
				</template>

				<template v-else>
					<label class="flex flex-col gap-1">
						<span class="font-semibold">Rima</span>
						<input
							v-model="form.rhyme"
							placeholder="Rima de la palabra"
							type="text"
							class="input input-sm"
						/>
					</label>
					<label class="flex flex-col gap-1">
						<span class="font-semibold">Categoría</span>
						<select
							v-model="form.category"
							class="font-usach-helvetica-body select select-sm"
						>
							<option disabled value="">Categoría</option>
							<option value="a">Aguda</option>
							<option value="g">Grave</option>
							<option value="e">Esdrújula</option>
						</select>
					</label>
				</template>
			</template>

			<button
				class="font-usach-bebas-body text-xl bg-usach-terra-700 hover:bg-usach-terra-800 p-2 rounded-lg disabled:opacity-60"
				:disabled="saving"
				@click="submit"
			>
				{{ saving ? "Guardando..." : "Confirmar" }}
			</button>
		</div>
	</div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import {
	GAMES,
	addQuestion,
	editQuestion,
	encodePhrase,
	parseAcentualPhrase,
} from "../utils/questions.js";

const props = defineProps({
	game: { type: String, required: true },
	question: { type: Object, default: null },
	token: { type: String, required: true },
});
const emit = defineEmits(["close", "saved"]);

const isEditing = computed(() => !!props.question);
const saving = ref(false);

const form = reactive({
	word: props.question?.word ?? "",
	answer: props.question?.answer ?? "",
	fonemas: props.question?.fonemas ?? "",
	grafemas: props.question?.grafemas ?? "",
	difficulty:
		props.question?.difficulty !== undefined
			? String(props.question.difficulty)
			: "",
	rhyme: props.question?.rhyme ?? "",
	category: props.question?.category ?? "",
	phrase: props.question ? encodePhrase(props.question) : "",
});

const valid = computed(() => {
	if (props.game === "cat_acentual") {
		return parseAcentualPhrase(form.phrase) !== null;
	}
	if (!form.word.trim()) return false;
	if (props.game === "pindaro") {
		return (
			form.answer !== "" &&
			Number.isInteger(Number(form.answer)) &&
			Number(form.answer) > 0 &&
			form.difficulty !== "" &&
			form.fonemas !== "" &&
			Number.isInteger(Number(form.fonemas)) &&
			Number(form.fonemas) >= 0 &&
			form.grafemas !== "" &&
			Number.isInteger(Number(form.grafemas)) &&
			Number(form.grafemas) >= 0
		);
	}
	return !!form.rhyme.trim() && form.category !== "";
});

async function submit() {
	if (!valid.value) {
		alert("Complete todos los campos correctamente");
		return;
	}
	saving.value = true;
	try {
		const data =
			props.game === "cat_acentual"
				? { phrase: form.phrase.trim() }
				: form;
		if (isEditing.value) {
			await editQuestion(props.game, props.token, {
				...data,
				id: props.question.id,
			});
		} else {
			await addQuestion(props.game, props.token, data);
		}
		emit("saved");
	} catch (error) {
		alert(error.message);
	} finally {
		saving.value = false;
	}
}

function close() {
	if (!saving.value) emit("close");
}
</script>

<style scoped>
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
</style>
