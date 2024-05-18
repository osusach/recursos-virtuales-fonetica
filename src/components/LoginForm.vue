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
			@click="validateLogin"
			class="mt-5 p-2 rounded-md bg-usach-terra-600 hover:bg-usach-terra-800"
		>
			Siguiente
		</button>
	</div>
</template>

<script setup>
import { reactive, defineEmits, ref } from "vue";

const url = import.meta.env.VITE_API_URL;

const loginInfo = reactive({
	mail: "",
	password: "",
	isLogged: false,
});

const emit = defineEmits(["login"]);

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
			loginInfo.isLogged = true;
			emit("login", { isLogged: true, token});
		} else {
			alert("Correo o contraseña incorrectos");
		}
	}
};
</script>

<style scoped>
.hidden {
	display: none;
}
</style>
