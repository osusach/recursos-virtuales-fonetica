<template>
<<<<<<< HEAD
    <div :class="{ hidden: isAdmin }" class="flex flex-col items-center bg-usach-aqua-600 px-3 py-2 rounded-md">
        <label for="password" class="pb-5">Contraseña</label>
        <input type="text" class="rounded-md" name="password" v-model="adminPass">
        <button @click="validatePassword()" class="mt-5 p-2 rounded-md bg-usach-terra-600 hover:bg-usach-terra-800">Siguiente</button>
    </div>
    <div :class="{ hidden: !isAdmin}" class="flex flex-row gap-10 items-center justify-between">
        <div class="flex flex-col gap-4 bg-usach-aqua-400 p-3 rounded-lg ">
            <div class="flex flex-row gap-5 items-center">
                <select v-model="selectedGame" class="font-usach-helvetica-body rounded-lg text-usach-industrial-1000 bg-white border-white text-sm 
                                    focus:ring-usach-terra-700 focus:border-usach-terra-700">
                    <option disabled value="">Selecciona un juego</option>
                    <option value="Pindaro">Píndaro</option>
                    <option value="Rima">Rimas</option>
                    <option value="Cat acentual">Acentos</option>
                </select>
                <button  @click="setAction(true)" class="flex flex-row w-full justify-center rounded-lg p-1 font-usach-bebas-body text-lg bg-usach-terra-700 hover:bg-usach-terra-800">
                    <v-icon icon="mdi-plus"></v-icon>
                    <p class="px-3"> Agregar pregunta </p>
                </button>
            </div>
            <div class="flex flex-row w-full h-36 bg-usach-aqua-100 rounded-lg">
                    <ul class="w-full text-center overflow-scroll-y">
                        <li v-for="pregunta in preguntas[selectedGame]" class="flex flex-row py-1 gap-2">
                            <p class="w-[75%]"> {{ pregunta }} </p>
                            <button @click="setAction(false, pregunta)" class="bg-usach-terra-600 rounded-md px-1"> <img class="h-5" src="/edit.svg"> </button>
                            <button @click="removeQuestion(pregunta)" class="bg-usach-rouge-600 rounded-md px-1"> <img class="h-5" src="/delete.svg"> </button>
                        </li>
                    </ul>
            </div>
        </div>
        <div v-if="activeAction" class="flex flex-col gap-2 justify-center font-usach-helvetica-body text-sm bg-usach-aqua-400 p-5 rounded-lg">
            <input placeholder="Escriba la pregunta, palabra o frase" type="text" id="newQuestion" v-model="newQuestion" class="rounded-lg">
            <input placeholder="Respuesta" type="text" id="solution" v-model="solution" class="rounded-lg">
            <select v-model="dificult" class="font-usach-helvetica-body rounded-lg text-usach-industrial-1000 bg-white border-white text-sm 
                                    focus:ring-usach-terra-700 focus:border-usach-terra-700">
                    <option disabled value="">Dificultad</option>
                    <option value="facil">Fácil</option>
                    <option value="medio">Medio</option>
                    <option value="dificil">Difícil</option>
                </select>
            <button class=" font-usach-bebas-body text-xl bg-usach-terra-700 hover:bg-usach-terra-800 p-2 rounded-lg" v-on="action ? { click: addQuestion } : { click: () => {updateQuestion(questionUpdate)} }">Confirmar</button>
        </div>
    </div>
=======
	<div class="flex flex-row gap-10 items-center justify-between">
		<div class="flex flex-col gap-4 bg-usach-aqua-400 p-3 rounded-lg">
			<div class="flex flex-row gap-5 items-center">
				<select
					v-model="selectedGame"
					class="font-usach-helvetica-body rounded-lg text-usach-industrial-1000 bg-white border-white text-sm focus:ring-usach-terra-700 focus:border-usach-terra-700"
				>
					<option disabled value="">Selecciona un juego</option>
					<option value="Pindaro">Píndaro</option>
					<option value="Rima">Rimas</option>
					<option value="Cat acentual">Acentos</option>
				</select>
				<button
					@click="setAction(true)"
					class="flex flex-row w-full justify-center rounded-lg p-1 font-usach-bebas-body text-lg bg-usach-terra-700 hover:bg-usach-terra-800"
				>
					<v-icon icon="mdi-plus"></v-icon>
					<p class="px-3">Agregar pregunta</p>
				</button>
			</div>
			<div class="flex flex-row w-full h-36 bg-usach-aqua-100 rounded-lg">
				<ul class="w-full text-center overflow-scroll">
					<li
						v-for="pregunta in preguntas[selectedGame]"
						class="flex flex-row py-1 gap-2"
					>
						<p class="w-[75%]">{{ pregunta }}</p>
						<button
							@click="setAction(false, pregunta)"
							class="bg-usach-terra-600 rounded-md px-1"
						>
							<img class="h-5" src="/edit.svg" />
						</button>
						<button
							@click="removeQuestion(pregunta)"
							class="bg-usach-rouge-600 rounded-md px-1"
						>
							<img class="h-5" src="/delete.svg" />
						</button>
					</li>
				</ul>
			</div>
		</div>
		<div
			v-if="activeAction"
			class="flex flex-col gap-2 justify-center font-usach-helvetica-body text-sm bg-usach-aqua-400 p-5 rounded-lg"
		>
			<input
				placeholder="Escriba la pregunta, palabra o frase"
				type="text"
				id="newQuestion"
				v-model="newQuestion"
				class="rounded-lg"
			/>
			<input
				placeholder="Respuesta"
				type="text"
				id="solution"
				v-model="solution"
				class="rounded-lg"
			/>
			<select
				v-model="dificult"
				class="font-usach-helvetica-body rounded-lg text-usach-industrial-1000 bg-white border-white text-sm focus:ring-usach-terra-700 focus:border-usach-terra-700"
			>
				<option disabled value="">Dificultad</option>
				<option value="facil">Fácil</option>
				<option value="medio">Medio</option>
				<option value="dificil">Difícil</option>
			</select>
			<button
				class="font-usach-bebas-body text-xl bg-usach-terra-700 hover:bg-usach-terra-800 p-2 rounded-lg"
				v-on="
					action
						? { click: addQuestion }
						: {
								click: () => {
									updateQuestion(questionUpdate);
								},
						  }
				"
			>
				Confirmar
			</button>
		</div>
	</div>
>>>>>>> df128719c80179f80f8d38bb489f2e7373c40594
</template>

<script setup>
import { ref } from "vue";
const selectedGame = ref("");

const preguntas = ref({
	Pindaro: ["Pregunta 1", "Pregunta 2"],
	Rima: ["Pregunta 3", "Pregunta 4"],
	"Cat acentual": ["Pregunta 5", "Pregunta 6"],
});

const activeAction = ref(false);
const action = ref(true); // true to add, false to update

const newQuestion = ref("");
const solution = ref("");
const dificult = ref("");

const questionUpdate = ref("");

<<<<<<< HEAD
const isAdmin = ref(false)
const adminPass = ref('')

const questionsToAdd = []
const questionsToRemove = []
const questionsToUpdate = []
=======
const questionsToAdd = [];
const questionsToRemove = [];
const questionsToUpdate = [];
>>>>>>> df128719c80179f80f8d38bb489f2e7373c40594

const validatePassword = () => {
    if (adminPass.value === 'admin') {
        isAdmin.value = true
    }
}

const setAction = (newAction, questionToUpdate) => {
	activeAction.value = true;
	action.value = newAction;
	if (!newAction) {
		questionUpdate.value = questionToUpdate;
	}
};

const clearText = () => {
	newQuestion.value = "";
	solution.value = "";
	dificult.value = "";
	activeAction.value = false;
};

const addQuestion = () => {
	preguntas.value[selectedGame.value].push(newQuestion.value);
	questionsToAdd.push({
		pregunta: newQuestion.value,
		solucion: solution.value,
		dificultad: dificult.value,
		categoria: selectedGame.value,
	});
	clearText();
};

const removeQuestion = (pregunta) => {
	const index = preguntas.value[selectedGame.value].indexOf(pregunta);
	preguntas.value[selectedGame.value].splice(index, 1);
	questionsToRemove.push(pregunta);
};

const updateQuestion = (pregunta) => {
	const index = preguntas.value[selectedGame.value].indexOf(
		questionUpdate.value,
	);
	preguntas.value[selectedGame.value][index] = newQuestion.value;
	questionsToUpdate.push(pregunta);
	clearText();
};
</script>
