<template>
	<div v-if="!loading" class="mx-2 flex flex-col gap-4">
		<div
			class="hidden sm:flex flex-row h-14 rounded-lg bg-usach-ultra-900 align-middle items-center"
		>
			<div
				class="flex static bg-usach-ultra-300 h-3 w-full rounded-xl mr-1 ml-6 justify-center items-center font-usach-bebas-title"
			>
				<button
					v-for="num in Array.from(
						{ length: cantPregs },
						(v, i) => i,
					)"
					@click="changeQuestion(num + 1)"
					class="mx-2 rounded-full h-7 w-10 text-lg"
					:class="{
						'bg-usach-ultra-300 font-usach-bebas-body':
							respuestas[num] === undefined,
						'bg-usach-terra-700 text-slate-100':
							respuestas[num] !== undefined,
					}"
				>
					{{ num + 1 }}
				</button>
			</div>

			<button
				class="font-usach-bebas-title mx-3 bg-usach-terra-700 rounded-lg p-1 text-white text-lg"
				@click="endQuiz"
			>
				{{ Fin }}
			</button>
		</div>
		<div
			class="flex flex-col rounded-lg bg-usach-ultra-900 p-5 md:p-10 text-center text-white items-center"
		>
			<div class="font-usach-helvetica-bold text-lg">
				Pregunta {{ i + "/" + cantPregs }}
			</div>

			<div v-html="pregunta"></div>

			<p class="text-center text-xl">{{ props.title }}</p>

			<div class="xs:flex-col preguntas flex sm:flex-row">
				<div
					v-for="(opcion, key) in opciones"
					class="xs:flex-col w-full flex sm:flex-row"
				>
					<button
						:value="opcion.value"
						@click="saveAnswer(opcion.value)"
						class="w-full px-4 py-2 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out"
						:class="{
							' bg-usach-aqua-800 text-white':
								respuesta === opcion.value,
							'bg-gray-200 text-gray-700 hover:bg-gray-300':
								respuesta !== opcion.value,
						}"
					>
						{{ opcion.answer }}
					</button>
				</div>
			</div>

			<div
				class="text-2xl flex flex-row justify-center gap-4 font-usach-bebas-body"
			>
				<button v-if="i > 1" @click="prevQuestion" class="nav-buttons">
					Atrás
				</button>
				<button @click="nextQuestion" class="nav-buttons">
					{{ nextText }}
				</button>
			</div>
		</div>
	</div>
	<Loading v-if="loading" />
</template>

<script setup>
import Loading from "../components/Loading.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { store } from "../store.js";
import axios from "axios";

const props = defineProps({
	title: String,
	idJuego: String, // con Number manda error grr
	urlJuego: String,
	func: Function,
});

// Constantes
const Fin = ref("Terminar");
const i = ref(1);
const loading = ref(true);
const url = "https://devpindarosql.pindarousach.workers.dev";
const router = useRouter();

let opciones = ref([]);
let nextText = ref("Siguiente");
let respuesta = ref(-1);

let respuestas = [];
let apiResponse = null;
let dificultad = Number(localStorage.getItem("dificultad"));
let pregunta = ref("<p></p>");
let cantPregs = 10;

const changeQuestionApi = () => {
	if (apiResponse === null) {
		return;
	}
	let question = apiResponse.payload.game.questions[i.value - 1];
	opciones.value = question.options;
	opciones.value.sort((a, b) => a.value - b.value);
	if (loading) {
		loading.value = false;
	}
	pregunta.value = props.func(question);
};

// get a db
onMounted(async () => {
	try {
		const response = await axios.get(
			url + props.urlJuego + "/start/" + dificultad,
		);
		apiResponse = response.data;
		changeQuestionApi();
	} catch (error) {
		console.error("Error fetching data:", error);
		router.replace("/home");
	}
});

const saveAnswer = (opcion) => {
	respuesta.value = opcion;
	// no borrar respuesta al navegar
	if (respuesta !== -1) {
		respuestas[i.value - 1] = respuesta.value;
	}
};

const nextTextVerify = () => {
	if (i.value == cantPregs) {
		nextText.value = "Terminar";
	} else {
		nextText.value = "Siguiente";
	}
	if (respuestas[i.value - 1]) respuesta.value = respuestas[i.value - 1];
	else respuesta.value = -1;
};

const nextQuestion = () => {
	if (i.value < cantPregs) {
		i.value += 1;
		changeQuestionApi();
		nextTextVerify();
	} else {
		endQuiz();
	}
};

const prevQuestion = () => {
	if (i.value > 1) {
		i.value -= 1;
		changeQuestionApi();
		nextTextVerify();
	}
};

const changeQuestion = (num) => {
	i.value = num;
	changeQuestionApi();
	nextTextVerify();
};

const endQuiz = async () => {
	let question_order = [];
	const data = {
		email: store.email,
		password: store.password,
		session_id: apiResponse.payload.game.session_id,
		answers: [],
	};

	for (let index = 0; index < cantPregs; index++) {
		let answerValue =
			respuestas[index] !== undefined ? Number(respuestas[index]) : 0;
		let resp;
		if (Number(props.idJuego) === 2) {
			question_order.push(
				apiResponse.payload.game.questions[index].game_id,
			);
			resp = {
				question_id: apiResponse.payload.game.questions[index].game_id,
				answer: answerValue,
			};
		} else {
			question_order.push(apiResponse.payload.game.questions[index].id);
			resp = {
				question_id: apiResponse.payload.game.questions[index].id,
				answer: answerValue,
			};
		}
		data.answers.push(resp);
	}

	await axios
		.post(url + props.urlJuego + "/submit", data)
		.then((response) => {
			store.correccion = response.data;
			store.question_order = question_order;
		})
		.catch((error) => {
			console.error("Error en la solicitud:", error);
			router.replace("/home");
		});
	loading.value = true;
	router.push("/correccion/" + props.idJuego);
};
</script>

<style>
@import "../assets/juegos.css";
.cat-text {
	font-size: 1.875rem;
	line-height: 2.5rem;
}
@media (min-width: 640px) {
	.cat-text {
		font-size: 3rem;
		line-height: 4.3rem;
	}
}
</style>
