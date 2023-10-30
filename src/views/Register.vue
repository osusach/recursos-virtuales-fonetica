<template>
	<form
		class="m-auto grid xl:grid-cols-1 gap-10 p-3 sm:p-10 w-full sm:w-[70%] lg:w-[40%]"
	>
		<div
			class="flex flex-col text-5xl h-fit px-10 py-10 text-white text-center font-usach-helvetica-body bg-usach-aqua-800 rounded-lg [&>button]:"
		>
			<h1 class="text-3xl mb-5 font-usach-bebas-title">Registro</h1>
			<Input
				Label="Usuario"
				@input="validateRegister"
				forLabel="user"
				type="text"
				placeholder="Usuario"
			/>
			<Input
				Label="Correo"
				@input="validateRegister"
				forLabel="email"
				type="text"
				placeholder="Correo"
			/>
			<select
				v-model="selectedFirst"
				@click="validateRegister"
				class="mb-4 font-usach-helvetica-body w-full h-11 rounded-lg text-usach-industrial-1000 bg-white border-white text-sm focus:ring-usach-terra-700 focus:border-usach-terra-700"
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
				@click="validateRegister"
				v-model="selectedSec"
				class="mb-4 font-usach-helvetica-body w-full h-11 rounded-lg bg-white text-usach-industrial-1000 border-white text-sm focus:ring-usach-terra-700 focus:border-usach-terra-700"
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
				@click="validateRegister"
				v-model="selectedSec"
				class="mb-4 font-usach-helvetica-body w-full h-11 rounded-lg bg-white text-usach-industrial-1000 border-white text-sm focus:ring-usach-terra-700 focus:border-usach-terra-700"
				name="languages"
				id="lang"
			>
				<option disabled value="">Grado</option>
				<option v-for="nivel in 4" :value="nivel">
					{{ nivel + "° Medio" }}
				</option>
			</select>
			<Input
				Label="Contraseña"
				@input="validateRegister"
				forLabel="password"
				type="password"
				placeholder="Contraseña"
			/>
			<Input
				Label="Confirme Contraseña"
				@input="validateRegister"
				forLabel="confirm_password"
				type="password"
				placeholder="Repetir contraseña"
			/>

			<div v-if="!isValidRegister" class="m-auto px-4 rounded-lg mb-2 flex flex-row gap-3 items-center justify-center bg-usach-rouge-700 text-xl font-usach-bebas-title">
				<img width="24" height="24" class="invert" src="https://img.icons8.com/material-outlined/24/error--v1.png" alt="error--v1"/>
				<p>{{ errorMsg }}</p>
			</div>
			<Boton
				label="Registrarse"
				@click="registerFunc()"
				:disabled="!isValidRegister"
				:class="
					isValidRegister
						? 'bg-usach-daisy-700 hover:bg-usach-daisy-900 text-xl'
						: 'bg-usach-industrial-300 hover:cursor-default text-xl'
				"
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

const selectedFirst = ref("");
const selectedSec = ref("");
const url = "https://pindarosql.pindarousach.workers.dev";
const router = useRouter();
let isValidRegister = ref(false);
let errorMsg = ref("");

const validateRegister = () => {
	console.log("vl");
	if (user.value === "") {
		errorMsg.value = "Usuario no puede estar vacío";
		isValidRegister.value = false;
		return;
	}
	if (email.value === "") {
		console.log("email");
		errorMsg.value = "Correo no puede estar vacío";
		isValidRegister.value = false;
		return;
	}
	if (selectedFirst.value === "") {
		isValidRegister.value = false;
		errorMsg.value = "Nivel educativo no puede estar vacío";
		console.log(selectedFirst.value);
		return;
	}
	if (selectedSec.value === "" && selectedFirst.value !== "sup") {
		isValidRegister.value = false;
		errorMsg.value = "Grado no puede estar vacío";
		return;
	}
	if (password.value !== confirm_password.value) {
		console.log("pass");
		isValidRegister.value = false;
		errorMsg.value = "Las contraseñas no coinciden";
		return;
	}
	isValidRegister.value = true;
};

const registerFunc = async () => {
	const data = {
		email: email.value,
		password: password.value,
		course: String(selectedSec.value + selectedFirst.value),
		name: user.value,
	};
	console.log(data);

	await axios
		.post(url + "/users/register", data)
		.then((response) => {
			console.log("Respuesta del servidor:", response.data);
			router.push("/home");
		})
		.catch((error) => {
			console.error("Error en la solicitud:", error);
		});
};
</script>
