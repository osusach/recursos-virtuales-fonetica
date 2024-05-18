<template>
	<form
		class="m-auto grid xl:grid-cols-1 gap-10 p-3 sm:p-10 w-full sm:w-[70%] lg:w-[40%]"
	>
		<div
			class="flex flex-col text-5xl h-fit px-10 py-10 text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg [&>button]:"
		>
			<h1 class="text-3xl mb-5 font-usach-bebas-title">Registro</h1>
			<Input
				:class="!isValidUser ? 'ring-red-700 ring-2' : ''"
				Label="Usuario"
				forLabel="user"
				type="text"
				placeholder="Usuario"
			/>
			<Input
				:class="!isValidEmail ? 'ring-red-700 ring-2' : ''"
				Label="Correo"
				forLabel="email"
				type="text"
				placeholder="Correo"
			/>
			<select
				v-model="selectedFirst"
				:class="!isValidSF ? 'ring-red-700 ring-2' : ''"
				class="mb-4 font-usach-helvetica-body w-full h-11 rounded-lg text-usach-industrial-1000 bg-white border-white text-sm focus:ring-usach-terra-700 focus:ring-2"
				name="languages"
				id="lang"
			>
				<option disabled value="">Nivel educativo</option>
				<option value="basica">Enseñanza Básica</option>
				<option value="media">Enseñanza Media</option>
				<option value="sup" @click="selectedSec = ''">
					Educación Superior
				</option>
			</select>
			<select
				v-if="selectedFirst == 'basica'"
				v-model="selectedSec"
				:class="!isValidSS ? 'ring-red-700 ring-2' : ''"
				class="mb-4 font-usach-helvetica-body w-full h-11 rounded-lg bg-white text-usach-industrial-1000 border-white text-sm focus:ring-usach-terra-700 focus:ring-2"
				name="languages"
				id="lang"
			>
				<option disabled value="">Grado</option>
				<option v-for="nivel in 8" :value="nivel">
					{{ nivel + "° Básico" }}
				</option>
			</select>
			<select
				v-if="selectedFirst == 'media'"
				v-model="selectedSec"
				:class="!isValidPassword ? 'ring-red-700 ring-2' : ''"
				class="mb-4 font-usach-helvetica-body w-full h-11 rounded-lg bg-white text-usach-industrial-1000 border-white text-sm focus:ring-usach-terra-700 focus:ring-2"
				name="languages"
				id="lang"
			>
				<option disabled value="">Grado</option>
				<option v-for="nivel in 4" :value="nivel">
					{{ nivel + "° Medio" }}
				</option>
			</select>
			<Input
				:class="!isValidPassword ? 'ring-red-700 ring-2' : ''"
				Label="Contraseña"
				forLabel="password"
				type="password"
				placeholder="Contraseña"
			/>
			<Input
				:class="!isValidPassword ? 'ring-red-700 ring-2' : ''"
				Label="Confirme Contraseña"
				forLabel="confirm_password"
				type="password"
				placeholder="Repetir contraseña"
			/>

			<div
				v-if="!isValidRegister && startedFilling"
				class="m-auto px-4 rounded-lg mb-2 flex flex-row gap-3 items-center justify-center bg-usach-rouge-700 text-xl font-usach-bebas-title"
			>
				<img
					width="24"
					height="24"
					class="invert"
					src="/error.svg"
					alt="error--v1"
				/>
				<p>{{ errorMsg }}</p>
			</div>
			<Boton
				label="Registrarse"
				@click="validateRegister"
				class="bg-usach-daisy-700 hover:bg-usach-daisy-900 text-xl"
			/>
		</div>
	</form>
</template>

<script setup>
import { ref } from "vue";
import Input from "../components/Input.vue";
import Boton from "../components/Boton.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import posthog from "posthog-js";
const selectedFirst = ref("");
const selectedSec = ref("");
const url = import.meta.env.VITE_API_URL;
const router = useRouter();
let isValidUser = ref(true);
let isValidEmail = ref(true);
let isValidSF = ref(true);
let isValidSS = ref(true);
let isValidPassword = ref(true);
let isValidRegister = ref(false);
let errorMsg = ref("");
const startedFilling = ref(false);
const validateRegister = () => {
	startedFilling.value = true;
	if (user.value === "") {
		errorMsg.value = "Usuario no puede estar vacío";
		isValidUser.value = false;
		isValidRegister.value = false;
		return;
	} else {
		isValidUser.value = true;
	}
	if (email.value === "") {
		errorMsg.value = "Correo no puede estar vacío";
		isValidEmail.value = false;
		isValidRegister.value = false;
		return;
	} else {
		isValidEmail.value = true;
	}
	if (selectedFirst.value === "") {
		isValidSF.value = false;
		isValidRegister.value = false;
		errorMsg.value = "Nivel educativo no puede estar vacío";
		return;
	} else {
		isValidSF.value = true;
	}
	if (selectedSec.value === "" && selectedFirst.value !== "sup") {
		isValidSS.value = false;
		isValidRegister.value = false;
		errorMsg.value = "Grado no puede estar vacío";
		return;
	} else {
		isValidSS.value = true;
	}
	if (password.value.length < 8) {
		isValidPassword.value = false;
		isValidRegister.value = false;
		errorMsg.value = "La contraseña debe tener al menos 8 caracteres";
		return;
	}
	if (password.value !== confirm_password.value) {
		isValidPassword.value = false;
		isValidRegister.value = false;
		errorMsg.value = "Las contraseñas no coinciden";
		return;
	} else {
		isValidPassword.value = true;
	}
	isValidRegister.value = true;
	registerFunc();
};
const registerFunc = async () => {
	const data = {
		email: email.value,
		password: password.value,
		course: String(selectedSec.value + selectedFirst.value),
		name: user.value,
	};
	try {
		const response = await fetch(url + "/users/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(JSON.stringify(errorData));
		}
		posthog.capture("usuario registrado", {
			course: String(selectedSec.value + selectedFirst.value),
		});
		router.push("/login");
		alert("Registro Exitoso");
	} catch (error) {
		posthog.capture("register error", {
			message: error.message,
		});
	}
};
</script>