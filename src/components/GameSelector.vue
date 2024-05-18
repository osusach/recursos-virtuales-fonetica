<template>
	<div
		:class="{ hidden: !isLogged }"
		class="flex flex-row gap-10 items-center justify-between"
	>
		<div
			class="flex flex-col gap-4 bg-usach-aqua-400 p-3 rounded-lg max-w-[95vw]"
		>
			<div class="flex flex-row gap-5 items-center">
				<select
					v-model="selectedGame"
					class="font-usach-helvetica-body select select-sm"
				>
					<option disabled value="">Selecciona un juego</option>
					<option value="pindaro">Píndaro</option>
					<option value="rima">Rimas</option>
					<option value="cat_acentual">Acentual</option>
				</select>
				<button
					@click="setAction(true)"
					class="flex flex-row w-fit justify-center rounded-lg p-1 font-usach-bebas-body text-lg bg-usach-terra-700 hover:bg-usach-terra-800"
				>
					<p class="px-3 w-32">Agregar pregunta</p>
				</button>
				<button
					@click="applyChanges"
					class="flex flex-row w-fit justify-center rounded-lg p-1 font-usach-bebas-body text-lg bg-usach-terra-700 hover:bg-usach-terra-800"
				>
					<p class="px-3 w-32">Aplicar cambios</p>
				</button>
				<p>
					<span class="font-semibold">Importante:</span> Para evitar
					conflictos con juegos ya existentes, las palabras no se
					eliminan de la base de datos, sino que se desactivan para
					futuros juegos. De esa manera, es posible seguir accediendo
					al historial y estadísticas de las partidas anteriores,
					<span class="font-semibold"
						>por lo que si desea cambiar una pregunta, desactívela y
						cree otra</span
					>.
				</p>
			</div>
			<question-manager
				:selectedGame="selectedGame"
				ref="questionManager"
			></question-manager>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import QuestionManager from "./QuestionManager.vue";

const props = defineProps(["isLogged"]);

const selectedGame = ref("");
const activeAction = ref(false);

const setAction = (status) => {
	activeAction.value = status;
};

const questionManager = ref(null);

const applyChanges = () => {
	questionManager.value.applyChanges();
};
</script>

<style scoped>
.hidden {
	display: none;
}
</style>
