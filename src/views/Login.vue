<template>
	<form class="m-auto grid xl:grid-cols-1 gap-10 p-10 min-w-[35%]">
		<div
			class="flex flex-col text-5xl h-fit p-10 text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg [&>button]:"
		>
			<h1 class="text-3xl mb-5 font-usach-bebas-title">¡Bienvenido!</h1>
			<Input
				Label="Correo"
				forLabel="email"
				type="text"
				placeholder="pindaro@usach.cl"
			/>
			<Input
				Label="Contraseña"
				forLabel="password"
				type="password"
				placeholder="Contraseña"
			/>

			<div
				v-if="!isValidLogin && startedFilling"
				class="m-auto px-4 rounded-lg mb-2 flex flex-row gap-3 items-center justify-center bg-usach-rouge-700 text-xl font-usach-bebas-title"
			>
				<img
					width="24"
					height="24"
					class="invert"
					src="/error.svg"
					alt="error"
				/>
				<p>{{ errorMsg }}</p>
			</div>

			<Boton
				label="Iniciar Sesión"
				@click="validateLogin()"
				class="bg-usach-daisy-700 hover:bg-usach-daisy-900 text-xl"
			/>
			<div
				className="font-usach-helvetica-medium rounded-lg  p-4 text-lg"
			>
				¿No tienes cuenta?
				<router-link to="/register" class="hover:underline">
					<b>Regístrate</b>
				</router-link>
			</div>
			<div
				className="font-usach-helvetica-medium rounded-lg  px-6 text-lg"
			>
				<label>¿Prefieres no registrarte aún?</label>
			</div>
			<Boton
				label="Invitado"
				@click="guestFunc()"
				class="bg-usach-ultra-700 hover:bg-usach-ultra-900 text-xl"
			/>
			<p class="font-usach-helvetica-body text-base">
				<i> Registrate para guardar tus puntajes!</i>
			</p>
		</div>
	</form>
</template>

<script setup>
import { useRouter } from "vue-router";
import Input from "../components/Input.vue";
import Boton from "../components/Boton.vue";
import axios from "axios";
import { store } from "../store";
import { ref } from "vue";
import posthog from "posthog-js";

const router = useRouter();
const url = import.meta.env.VITE_API_URL;

let isValidEmail = ref(true);
let isValidPassword = ref(true);
let isValidLogin = ref(false);
let errorMsg = ref("");
const startedFilling = ref(false);

const validateLogin = () => {
	startedFilling.value = true;
	if (email.value === "") {
		errorMsg.value = "Correo no puede estar vacío";
		isValidEmail.value = false;
		isValidLogin.value = false;
		return;
	} else {
		isValidEmail.value = true;
	}
	if (password.value === "") {
		isValidPassword.value = false;
		isValidLogin.value = false;
		errorMsg.value = "La contraseña no puede estar vacía";
		// return;
	} else {
		isValidPassword.value = true;
	}
	isValidLogin.value = true;
	loginFunc();
};

const guestFunc = () => {
	router.push("/home");
};

const loginFunc = async () => {
	const data = {
		email: email.value,
		password: password.value,
	};

	await axios
		.post(url + "/users/login", data)
		.then((response) => {
			const resp = response.data.payload.user;
			store.email = email.value;
			store.user = resp.name;
			store.curso = resp.course;
			store.token = resp.token;
			router.push("/home");
		})
		.catch((error) => {
			posthog.capture("login error", {
				email: email.value,
				name: error.name,
				message: error.message,
				response: error.response,
				code: error.code,
				method: error.method,
				url: error.url,
				status: error.status,
			});
			errorMsg.value = "El correo o contraseña son incorrectos.";
			isValidLogin.value = false;
		});
};
</script>
