<template>
	<div
		:class="{ hidden: isLogged }"
		class="flex flex-col items-center bg-usach-aqua-600 px-10 py-4 rounded-md"
	>
		<label for="mail" class="pb-4">Correo: </label>
		<input
			type="text"
			class="input"
			v-model="mail"
			placeholder="Ingrese el correo"
		/>
		<label for="password" class="py-4">Contraseña:</label>
		<input
			type="password"
			class="input"
			name="password"
			v-model="password"
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
import { ref, defineEmits } from "vue";

const mail = ref("");
const password = ref("");
const isLogged = ref(false);

const emit = defineEmits(["login"]);

const validateLogin = () => {
	if (mail.value && password.value) {
		isLogged.value = true;
		emit("login", true);
	} else {
		alert("Por favor ingrese el correo y la contraseña");
	}
};
</script>

<style scoped>
.hidden {
	display: none;
}
</style>
