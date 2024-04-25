<template>
	<div
		:class="{ hidden: loginInfo.isLogged }"
		class="flex flex-col items-center bg-usach-aqua-600 px-10 py-4 rounded-md"
	>
		<label for="mail" class="pb-4">Correo: </label>
		<input
			type="text"
			class="input"
			v-model="loginInfo.mail"
			placeholder="Ingrese el correo"
		/>
		<label for="password" class="py-4">Contraseña:</label>
		<input
			type="password"
			class="input"
			name="password"
			v-model="loginInfo.password"
			placeholder="Ingrese la contraseña"
		/>
		<button
			@click="validateLogin()"
			class="mt-5 p-2 rounded-md bg-usach-terra-600 hover:bg-usach-terra-800"
		>
			Siguiente
		</button>
	</div>
	<div
		:class="{ hidden: !loginInfo.isLogged }"
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
					<v-icon icon="mdi-plus"></v-icon>
					<p class="px-3 w-32">Agregar pregunta</p>
				</button>
				<button
					@click="applyChanges"
					class="flex flex-row w-fit justify-center rounded-lg p-1 font-usach-bebas-body text-lg bg-usach-terra-700 hover:bg-usach-terra-800"
				>
					<v-icon icon="mdi-check"></v-icon>
					<p class="px-3 w-32">Aplicar cambios</p>
				</button>
				<p>
					<span class="font-semibold">Importante:</span> Para evitar
					conflictos con juegos ya existentes, las palabras no se
					eliminan de la base de datos, sino que se desactivan para
					futuros juegos. De esa manera, es posible seguir accediendo
					al historial y estadísticas de las partidas anteriores,
					<span class="font-semibold">
						por lo que si desea cambiar una pregunta, desactivela y
						cree otra
					</span>
					.
				</p>
			</div>
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
					>
						<div class="w-[90%]">
							<div
								:class="{ hidden: selectedGame !== 'pindaro' }"
								class="grid grid-cols-4"
							>
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
								<div>
									Activo / Inactivo:
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
								<div>
									Categoria: {{ procCategoria(pregunta) }}
								</div>
								<div>
									Activo / Inactivo:
									<input
										type="checkbox"
										class="toggle toggle-info [--tglbg:rgb(220,220,220)]"
										@change="toggleQuestion(pregunta)"
										:checked="procIsActive(pregunta)"
									/>
								</div>
							</div>
							<div
								:class="{
									hidden: selectedGame !== 'cat_acentual',
								}"
								class="grid grid-cols-5"
							>
								<div class="col-span-3">
									Frase: {{ pregunta.acentual_phrase }}
								</div>
								<div>
									Activo / Inactivo:
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
					>
						<div class="w-[90%]">
							<div
								:class="{ hidden: selectedGame !== 'pindaro' }"
								class="grid grid-cols-3"
							>
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
							<div
								:class="{ hidden: selectedGame !== 'rima' }"
								class="grid grid-cols-3"
							>
								<div>Palabra: {{ pregunta.word }}</div>
								<div>Rima: {{ pregunta.rhyme }}</div>
								<div>
									Categoria: {{ procCategoria(pregunta) }}
								</div>
							</div>
							<div
								:class="{
									hidden: selectedGame !== 'cat_acentual',
								}"
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
import { ref, reactive } from "vue";

const url = import.meta.env.VITE_API_URL;
const selectedGame = ref("");

const loginInfo = reactive({
	mail: "",
	password: "",
	isLogged: false,
	token: "",
});

const preguntas = reactive({
	pindaro: [],
	rima: [],
	cat_acentual: [],
});

const procDificultad = (pregunta) => {
	if (pregunta.difficulty === 0) {
		return "Fácil";
	} else if (pregunta.difficulty === 1) {
		return "Medio";
	} else if (pregunta.difficulty === 2) {
		return "Difícil";
	}
};

const procCategoria = (pregunta) => {
	if (pregunta.category === "a") {
		return "Aguda";
	} else if (pregunta.category === "e") {
		return "Esdrújula";
	} else if (pregunta.category === "g") {
		return "Grave";
	}
};

const procIsActive = (pregunta) => {
	return pregunta.is_active === 1;
};

const getAll = async () => {
	if (loginInfo.isLogged) {
		const pindaroQuestions = await fetch(`${url}/silabas/allSilabas`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: loginInfo.token,
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
				token: loginInfo.token,
			}),
		});
		const rimas = await rimasQuestions.json();
		preguntas.rima = await rimas.payload.silabas.data;

		const acentualQuestions = await fetch(`${url}/acentual/allAcentuales`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: loginInfo.token,
			}),
		});
		const acentual = await acentualQuestions.json();
		preguntas.cat_acentual = await acentual.payload.silabas;
	}
};

const activeAction = ref(false);

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
			}),
		});
		const res = await response.json();
		const success = await res.success;
		const token = await res.payload.user.token;
    
		if (await success) {
			loginInfo.token = token;
			loginInfo.isLogged = true;
			getAll();
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
		const ocurrencias = preguntas[selectedGame.value].filter(
			(obj) => obj.acentual_phrase.toLowerCase() === palabrasUnicasTexto.toLowerCase(),
		).length;
	
		const ocurrenciasAdd = questionsToAdd[selectedGame.value].filter(
			(obj) => obj.acentual_phrase.toLowerCase() === palabrasUnicasTexto.toLowerCase(),
		).length;
	
		// Si hay más de una ocurrencia, muestra un alert
		if (ocurrencias >= 1 || ocurrenciasAdd >= 1) {
			alert(`La palabra '${palabrasUnicasTexto}' está repetida.`);
			return;
		}	
	} else {
		// Contamos cuántas veces aparece la palabra en la lista
		const ocurrencias = preguntas[selectedGame.value].filter(
			(obj) => obj.word.toLowerCase() === newQuestion.word.toLowerCase(),
		).length;
	
		const ocurrenciasAdd = questionsToAdd[selectedGame.value].filter(
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

	questionsToAdd[selectedGame.value].push(pregunta);

	clearText();
	closeOverlay();
};

const removeQuestion = (pregunta) => {
	// Si esta en preguntas para agregar se elimina
	const index = questionsToAdd[selectedGame.value].indexOf(pregunta);
	if (index !== -1) {
		questionsToAdd[selectedGame.value].splice(index, 1);
	}

	const index2 = questionsToActivate[selectedGame.value].indexOf(pregunta.id);
	if (index2 !== -1) {
		questionsToActivate[selectedGame.value].splice(index2, 1);
		return;
	}

	if (pregunta.id !== undefined) {
		questionsToRemove[selectedGame.value].push(pregunta.id);
	}
	if (pregunta.acentual_id !== undefined) {
		questionsToRemove[selectedGame.value].push(pregunta.acentual_id);
	}
};

const activateQuestion = (pregunta) => {
	const index = questionsToRemove[selectedGame.value].indexOf(pregunta.id);
	if (index !== -1) {
		questionsToRemove[selectedGame.value].splice(index, 1);
		return;
	}

	if (pregunta.id !== undefined) {
		questionsToActivate[selectedGame.value].push(pregunta.id);
	}
	if (pregunta.acentual_id !== undefined) {
		questionsToActivate[selectedGame.value].push(pregunta.acentual_id);
	}
};

const toggleQuestion = (pregunta) => {
	const index = preguntas[selectedGame.value].indexOf(pregunta);

	preguntas[selectedGame.value][index].is_active =
		(preguntas[selectedGame.value][index].is_active + 1) % 2;
	const is_active = preguntas[selectedGame.value][index].is_active;

	if (is_active === 1) {
		activateQuestion(pregunta);
	} else {
		removeQuestion(pregunta);
	}
};

const applyChanges = async () => {
	const resAdd = [null, null, null];
	const resDelete = [null, null, null];
	const resActivate = [null, null, null];
	if (selectedGame.value === "") {
		alert("Debe seleccionar un juego");
	}

	if (questionsToAdd.pindaro.length > 0) {
		resAdd[0] = await fetch(`${url}/silabas/uploadSilaba`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: loginInfo.token,
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
		resDelete[0] = await fetch(`${url}/silabas/deleteSilabas`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: loginInfo.token,
				ids: questionsToRemove.pindaro,
			}),
		});
		resDelete[0] = await resDelete[0].json();
		resDelete[0] = await resDelete[0].success;
	}
	if (questionsToActivate.pindaro.length > 0) {
		resActivate[0] = await fetch(`${url}/silabas/activateSilabas`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: loginInfo.token,
				ids: questionsToActivate.pindaro,
			}),
		});
		resActivate[0] = await resActivate[0].json();
		resActivate[0] = await resActivate[0].success;
	}
	if (questionsToAdd.rima.length > 0) {
		resAdd[1] = await fetch(`${url}/rimas/uploadRimas`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: loginInfo.token,
				rimas: questionsToAdd.rima,
			}),
		});
		resAdd[1] = await resAdd[1].json();
		resAdd[1] = await resAdd[1].success;
	}
	if (questionsToRemove.rima.length > 0) {
		resDelete[1] = await fetch(`${url}/rimas/deleteRimas`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: loginInfo.token,
				ids: questionsToRemove.rima,
			}),
		});
		resDelete[1] = await resDelete[1].json();
		resDelete[1] = await resDelete[1].success;
	}
	if (questionsToActivate.rima.length > 0) {
		resActivate[1] = await fetch(`${url}/rimas/activateRimas`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: loginInfo.token,
				ids: questionsToActivate.rima,
			}),
		});
		resActivate[1] = await resActivate[1].json();
		resActivate[1] = await resActivate[1].success;
	}
	if (questionsToAdd.cat_acentual.length > 0) {
		resAdd[2] = await fetch(`${url}/acentual/uploadAcentual`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: loginInfo.token,
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
		resDelete[2] = await fetch(`${url}/acentual/deleteAcentuales`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: loginInfo.token,
				ids: questionsToRemove.cat_acentual,
			}),
		});
		resDelete[2] = await resDelete[2].json();
		resDelete[2] = await resDelete[2].success;
	}
	if (questionsToActivate.cat_acentual.length > 0) {
		resActivate[2] = await fetch(`${url}/acentual/activateAcentuales`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: loginInfo.token,
				ids: questionsToActivate.cat_acentual,
			}),
		});
		resActivate[2] = await resActivate[2].json();
		resActivate[2] = await resActivate[2].success;
	}

	let alertMessage = "";
	if (resAdd[0] === true) {
		alertMessage += "Preguntas agregadas correctamente a pindaro\n";
	} else if (resAdd[0] !== true && questionsToAdd.pindaro.length > 0) {
		alertMessage += "Error al agregar preguntas a pindaro\n";
	}
	if (resDelete[0] === true) {
		alertMessage += "Preguntas eliminadas correctamente de pindaro\n";
	} else if (resDelete[0] !== true && questionsToRemove.pindaro.length > 0) {
		alertMessage += "Error al eliminar preguntas de pindaro\n";
	}
	if (resActivate[0] === true) {
		alertMessage += "Preguntas activadas correctamente de pindaro\n";
	} else if (
		resActivate[0] !== true &&
		questionsToActivate.pindaro.length > 0
	) {
		alertMessage += "Error al activar preguntas de pindaro\n";
	}
	if (resAdd[1] === true) {
		alertMessage += "Preguntas agregadas correctamente a rimas\n";
	} else if (resAdd[1] !== true && questionsToAdd.rima.length > 0) {
		alertMessage += "Error al agregar preguntas a rimas\n";
	}
	if (resDelete[1] === true) {
		alertMessage += "Preguntas eliminadas correctamente de rimas\n";
	} else if (resDelete[1] !== true && questionsToRemove.rima.length > 0) {
		alertMessage += "Error al eliminar preguntas de rimas\n";
	}
	if (resActivate[1] === true) {
		alertMessage += "Preguntas activadas correctamente de rimas\n";
	} else if (resActivate[1] !== true && questionsToActivate.rima.length > 0) {
		alertMessage += "Error al activar preguntas de rimas\n";
	}
	if (resAdd[2] === true) {
		alertMessage += "Preguntas agregadas correctamente a acentual\n";
	} else if (resAdd[2] !== true && questionsToAdd.cat_acentual.length > 0) {
		alertMessage += "Error al agregar preguntas a acentual\n";
	}
	if (resDelete[2] === true) {
		alertMessage += "Preguntas eliminadas correctamente de acentual";
	} else if (
		resDelete[2] !== true &&
		questionsToRemove.cat_acentual.length > 0
	) {
		alertMessage += "Error al eliminar preguntas de acentual";
	}
	if (resActivate[2] === true) {
		alertMessage += "Preguntas activadas correctamente de acentual";
	} else if (
		resActivate[2] !== true &&
		questionsToActivate.cat_acentual.length > 0
	) {
		alertMessage += "Error al activar preguntas de acentual";
	}
	if (alertMessage !== "") {
		alert(alertMessage);
	}

	questionsToAdd.pindaro = [];
	questionsToAdd.rima = [];
	questionsToAdd.cat_acentual = [];
	questionsToRemove.pindaro = [];
	questionsToRemove.rima = [];
	questionsToRemove.cat_acentual = [];
	questionsToActivate.pindaro = [];
	questionsToActivate.rima = [];
	questionsToActivate.cat_acentual = [];

	getAll();
};
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
