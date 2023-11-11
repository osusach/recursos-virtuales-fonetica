<template>
	<div :class="{ hidden: loginInfo.isLogged }" class="flex flex-col items-center bg-usach-aqua-600 px-10 py-3 rounded-md">
		<label for="mail" class="pb-5">Correo: </label>
		<input type="text" class="rounded-md" v-model="loginInfo.mail" placeholder="Ingrese el correo">
		<label for="password" class="pb-5">Contraseña</label>
		<input type="password" class="rounded-md" name="password" v-model="loginInfo.password"
			placeholder="Ingrese la contraseña" />
		<button @click="validateLogin()" class="mt-5 p-2 rounded-md bg-usach-terra-600 hover:bg-usach-terra-800">
			Siguiente
		</button>
	</div>
	<div :class="{ hidden: !loginInfo.isLogged }" class="flex flex-row gap-10 items-center justify-between">
		<div class="flex flex-col gap-4 bg-usach-aqua-400 p-3 rounded-lg min-w-[200vh]">
			<div class="flex flex-row gap-5 items-center">
				<select v-model="selectedGame"
					class="font-usach-helvetica-body rounded-lg text-usach-industrial-1000 bg-white border-white text-sm focus:ring-usach-terra-700 focus:border-usach-terra-700">
					<option disabled value="">Selecciona un juego</option>
					<option value="pindaro">Píndaro</option>
					<option value="rima">Rimas</option>
					<option value="cat_acentual">Acentual</option>
				</select>
				<button @click="setAction(true)"
					class="flex flex-row w-fit justify-center rounded-lg p-1 font-usach-bebas-body text-lg bg-usach-terra-700 hover:bg-usach-terra-800">
					<v-icon icon="mdi-plus"></v-icon>
					<p class="px-3">Agregar pregunta</p>
				</button>
				<button @click="applyChanges()"
					class="flex flex-row w-fit justify-center rounded-lg p-1 font-usach-bebas-body text-lg bg-usach-terra-700 hover:bg-usach-terra-800">
					<v-icon icon="mdi-check"></v-icon>
					<p class="px-3">Aplicar cambios</p>
				</button>
			</div>
			<div class="flex flex-row w-full min-h-[70vh] max-h-[70vh] bg-usach-aqua-100 rounded-lg">
				<ul class="w-full text-center overflow-y-scroll pt-3">
					<li v-for="pregunta in preguntas[selectedGame]" class="flex flex-row py-1 gap-2 mb-2">
						<div class="w-[90%]">
							<div :class="{ hidden: selectedGame !== 'pindaro' }" class="grid grid-cols-3">
								<div>
									Palabra:
									{{ pregunta.word }}
								</div>
								<div>
									Respuesta (Cantidad de silabas):
									{{ pregunta.answer }}
								</div>
								<div>
									Dificultad:
									{{ procDificultad(pregunta) }}
								</div>
							</div>
							<div :class="{ hidden: selectedGame !== 'rima' }" class="grid grid-cols-3">
								<div>
									Palabra:
									{{ pregunta.word }}
								</div>
								<div>
									Rima: {{ pregunta.rhyme }}
								</div>
								<div>
									Categoria:
									{{ procCategoria(pregunta) }}
								</div>
							</div>
							<div :class="{ hidden: selectedGame !== 'cat_acentual' }">
								{{ pregunta }}
							</div>
							<hr class="h-px bg-red-800 border-0 mt-3">
						</div>
						<button @click="removeQuestion(pregunta)" class="bg-usach-rouge-600 rounded-md px-1">
							<img class="h-5" src="/delete.svg" />
						</button>
					</li>
				</ul>
			</div>
		</div>
		<div v-if="activeAction" class="overlay" @click="closeOverlay">
			<div class="flex flex-col gap-2 justify-center font-usach-helvetica-body text-sm bg-usach-aqua-400 p-5 rounded-lg"
				@click.stop>
				<input placeholder="Escriba la palabra" type="text" id="newQuestion" v-model="newQuestion.word"
					class="rounded-lg" />
				<div :class="{ hidden: selectedGame !== 'pindaro' }" class="flex flex-col gap-3 my-1" key="pindaro_form">

					<input placeholder="Respuesta" type="text" id="solution" v-model="newQuestion.solution"
						class="rounded-lg" />
					<select v-model="newQuestion.difficulty"
						class="font-usach-helvetica-body rounded-lg text-usach-industrial-1000 bg-white border-white text-sm focus:ring-usach-terra-700 focus:border-usach-terra-700">
						<option disabled value="">Dificultad</option>
						<option value="1">Fácil</option>
						<option value="2">Medio</option>
						<option value="3">Difícil</option>
					</select>
				</div>
				<div :class="{ hidden: selectedGame !== 'rima' }" class="flex flex-col gap-3 mb-1" key="rima_form">
					<input placeholder="Rima de la palabra" type="text" id="rhyme" v-model="newQuestion.rhyme"
						class="rounded-lg" />
					<select v-model="newQuestion.category"
						class="font-usach-helvetica-body rounded-lg text-usach-industrial-1000 bg-white border-white text-sm focus:ring-usach-terra-700 focus:border-usach-terra-700">
						<option disabled value="">Categoria</option>
						<option value="a">Aguda</option>
						<option value="g">Grave</option>
						<option value="e">Esdrújula</option>
					</select>
				</div>
				<div :class="{ hidden: selectedGame !== 'cat_acentual' }" class="flex flex-col gap-3 mb-1"
					key="acentual_form">
				</div>
				<button class="font-usach-bebas-body text-xl bg-usach-terra-700 hover:bg-usach-terra-800 p-2 rounded-lg"
					@click="validateNewQuestionFields">
					Confirmar
				</button>

			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

const url = "https://devpindarosql.pindarousach.workers.dev";
const selectedGame = ref("");

const loginInfo = reactive({
	mail: "",
	password: "",
	isLogged: false,
});

const preguntas = reactive({
	pindaro: [
		{ "id": 1, "word": "Cautivo", "answer": 3, "difficulty": 1, "creation_date": "2023-09-03 18:58:50", "modification_date": "2023-09-03 18:58:50", "is_active": 1 },
		{ "id": 2, "word": "Raudo", "answer": 2, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 },
		{ "id": 3, "word": "Violento", "answer": 3, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 },
		{ "id": 4, "word": "Caudal", "answer": 2, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 },
		{ "id": 5, "word": "Furioso", "answer": 3, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 },
		{ "id": 6, "word": "Marioneta", "answer": 4, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 },
		{ "id": 7, "word": "Nuevo", "answer": 2, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 },
		{ "id": 8, "word": "Viejo", "answer": 2, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 },
		{ "id": 9, "word": "Herencia", "answer": 3, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 },
		{ "id": 10, "word": "Divorcio", "answer": 2, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 },
		{ "id": 11, "word": "Amnesia", "answer": 3, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 },
		{ "id": 12, "word": "Magnesio", "answer": 3, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 }, { "id": 13, "word": "Cuaderno", "answer": 3, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 }, { "id": 14, "word": "Etnia", "answer": 2, "difficulty": 1, "creation_date": "2023-09-03 19:10:14", "modification_date": "2023-09-03 19:10:14", "is_active": 1 }],
	rima: [
		{ "id": 26, "word": "casa", "category": "g", "rhyme": "asa" },
		{ "id": 27, "word": "mesa", "category": "g", "rhyme": "esa" },
		{ "id": 28, "word": "canción", "category": "a", "rhyme": "on" },
		{ "id": 29, "word": "lector", "category": "a", "rhyme": "or" },
		{ "id": 30, "word": "pasa", "category": "g", "rhyme": "asa" },
		{ "id": 31, "word": "lámpara", "category": "e", "rhyme": "ampara" },
		{ "id": 32, "word": "trágico", "category": "e", "rhyme": "axiko" },
		{ "id": 33, "word": "queso", "category": "g", "rhyme": "eso" },
		{ "id": 34, "word": "beso", "category": "g", "rhyme": "eso" },
		{ "id": 35, "word": "pesa", "category": "g", "rhyme": "esa" },
		{ "id": 36, "word": "fiesta", "category": "g", "rhyme": "esta" },
		{ "id": 37, "word": "finca", "category": "g", "rhyme": "inka" },
		{ "id": 38, "word": "prístino", "category": "e", "rhyme": "istino" },
		{ "id": 39, "word": "fin", "category": "a", "rhyme": "in" },
		{ "id": 40, "word": "lindo", "category": "g", "rhyme": "indo" }],
	cat_acentual: ["Pregunta 5", "Pregunta 6"],
});

const procDificultad = (pregunta) => {
	if (pregunta.difficulty === 1) {
		return "Fácil";
	} else if (pregunta.difficulty === 2) {
		return "Medio";
	} else if (pregunta.difficulty === 3) {
		return "Difícil";
	}
}

const procCategoria = (pregunta) => {
	if (pregunta.category === "a") {
		return "Aguda";
	} else if (pregunta.category === "e") {
		return "Esdrújula";
	} else if (pregunta.category === "g") {
		return "Grave";
	}
}

const logged = async () => {
	if (loginInfo.isLogged) {
		const pindaroQuestions = await fetch(`${url}/silabas/allSilabas`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				admin_email: loginInfo.mail,
				admin_password: loginInfo.password,
			}),
		});
		const pindaro = await pindaroQuestions.json();
		preguntas.pindaro = await pindaro.payload.silabas;

		const rimasQuestions = await fetch(`${url}/rimas/allRimas`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				admin_email: loginInfo.mail,
				admin_password: loginInfo.password,
			}),
		});
		const rimas = await rimasQuestions.json();
		preguntas.rima = await rimas.payload.silabas;

		// const acentualQuestions = await fetch(`${url}/acentual/allAcentuales`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		admin_email: loginInfo.mail,
		// 		admin_password: loginInfo.password,
		// 	}),
		// });
		// const acentual = await acentualQuestions.json();
		// preguntas.value["Cat acentual"] = await acentual.payload;
	}
};

onMounted(() => {
	logged();
});

const activeAction = ref(false);

const newQuestion = reactive({
	// General attributes
	word: "",
	// Pindaro attributes
	solution: "",
	difficulty: "",
	// Rima attributes
	category: "",
	rhyme: ""
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

const validateLogin = async () => {
	if (loginInfo.mail == "" || loginInfo.password == "") {
		alert("Debe ingresar un correo y una contraseña");
	} else {
		const response = await fetch(`${url}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: loginInfo.mail,
				password: loginInfo.password,
			})
		})
		const res = await response.json();
		const success = await res.success;
		if (await success) {
			loginInfo.isLogged = true;
			logged();
		} else {
			alert("Correo o contraseña incorrectos");
		}
	}
};

const closeOverlay = () => {
	activeAction.value = false;
};

const setAction = () => {
	if (selectedGame.value === "") {
		alert("Debe seleccionar un juego");
	} else {
		activeAction.value = true;
	}
};

const clearText = () => {
	newQuestion.word = "";
	newQuestion.solution = "";
	newQuestion.difficulty = "";
	newQuestion.category = "";
	newQuestion.rhyme = "";
};

const validateNewQuestionFields = () => {
	if (newQuestion.word === "") {
		alert("Debe ingresar una palabra");
	} else if (selectedGame.value === "pindaro") {
		if (newQuestion.solution === "") {
			alert("Debe ingresar una respuesta");
		} else if (newQuestion.difficulty === "") {
			alert("Debe ingresar una dificultad");
		} else {
			addQuestion(selectedGame.value);
		}
	} else if (selectedGame.value === "rima") {
		if (newQuestion.category === "") {
			alert("Debe ingresar una categoria");
		} else if (newQuestion.rhyme === "") {
			alert("Debe ingresar una rima");
		} else {
			addQuestion(selectedGame.value);
		}
	} else if (selectedGame.value === "cat_acentual") {
		addQuestion(selectedGame.value);
	}
}

const addQuestion = (juego) => {

	const pregunta = { word: newQuestion.word }

	if (juego === "pindaro") {
		pregunta.answer = parseInt(newQuestion.solution);
		pregunta.difficulty = parseInt(newQuestion.difficulty);
	} else if (juego === "rima") {
		pregunta.category = newQuestion.category;
		pregunta.rhyme = newQuestion.rhyme;
	}
	// else if (juego === "cat_acentual") {
	// 
	// }

	preguntas[selectedGame.value].push(pregunta);
	questionsToAdd[selectedGame.value].push(pregunta);

	clearText();
	closeOverlay();
};

const removeQuestion = (pregunta) => {
	// Si esta en preguntas se elimina
	const index1 = preguntas[selectedGame.value].indexOf(pregunta);
	preguntas[selectedGame.value].splice(index1, 1);
	// Si esta en preguntas para agregar se elimina
	const index2 = questionsToAdd[selectedGame.value].indexOf(pregunta);
	questionsToAdd[selectedGame.value].splice(index2, 1);

	questionsToRemove[selectedGame.value].push(pregunta);
};

const applyChanges = async () => {
	let resAdd = null;
	let resDelete = null;
	if (selectedGame.value === "") {
		alert("Debe seleccionar un juego");
	} else if (selectedGame.value === "pindaro") {
		if (questionsToAdd.pindaro.length > 0) {
			resAdd = await fetch(`${url}/silabas/uploadSilaba`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					admin_email: loginInfo.mail,
					admin_password: loginInfo.password,
					silabas: questionsToAdd[selectedGame.value].map((question) => {
						return {
							word: question.word,
							answer_value: question.answer,
							difficulty: question.difficulty,
						};
					})
				}),
			});
			resAdd = await resAdd.json();
			resAdd = await resAdd.success;
		}
		if (questionsToRemove.pindaro.length > 0) {
			resDelete = await fetch(`${url}/silabas/deleteSilaba`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					admin_email: loginInfo.mail,
					admin_password: loginInfo.password,
					silabas: questionsToRemove[selectedGame.value],
				}),
			});
			resDelete = await resDelete.json();
			resDelete = await resDelete.success;
		}
	} else if (selectedGame.value === "rima") {
		if (questionsToAdd.rima.length > 0) {
			resAdd = await fetch(`${url}/rimas/uploadRimas`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					admin_email: loginInfo.mail,
					admin_password: loginInfo.password,
					rimas: questionsToAdd[selectedGame.value],
				}),
			});
			resAdd = await resAdd.json();
			resAdd = await resAdd.success;
		}
		if (questionsToRemove.rima.length > 0) {
			resDelete = await fetch(`${url}/rimas/deleteRimas`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					admin_email: loginInfo.mail,
					admin_password: loginInfo.password,
					rimas: questionsToRemove[selectedGame.value],
				}),
			});
			resDelete = await resDelete.json();
			resDelete = await resDelete.success;
		}
	} 
	// else if (selectedGame.value === "cat_acentual") {
	// 	if (questionsToAdd.cat_acentual.length > 0) {
	// 		const res = await fetch(`${url}/acentual/addAcentual`, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				admin_email: loginInfo.mail,
	// 				admin_password: loginInfo.password,
	// 				silabas: questionsToAdd[selectedGame.value],
	// 			}),
	// 		});
	// 	}
	// 	if (questionsToRemove.cat_acentual.length > 0) {
	// 		await fetch(`${url}/acentual/deleteAcentual`, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				admin_email: loginInfo.mail,
	// 				admin_password: loginInfo.password,
	// 				silabas: questionsToRemove[selectedGame.value],
	// 			}),
	// 		});
	// 	}
	// }

	if ((await resAdd|| await resAdd === null) && (await resDelete || await resDelete === null)) {
		alert("Cambios aplicados correctamente");
	} else {
		alert("Error al aplicar los cambios");
	}
}
</script>

<style>
/* styles/globals.css */
.overlay {
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	justify-content: center;
	align-items: center;
	z-index: 10;
}
</style>
