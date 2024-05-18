<template>
	<div
		class="flex flex-col items-center justify-center gap-10 w-screen h-screen bg-usach-aqua-100"
	>
		<login-form @login="handleLogin" />
		<game-selector v-if="isLogged" :isLogged="isLogged" />
	</div>
</template>

<script setup>
import { ref } from "vue";
import LoginForm from "./components/LoginForm.vue";
import GameSelector from "./components/GameSelector.vue";

const isLogged = ref(false);

const handleLogin = (status) => {
	isLogged.value = status;
};
</script>
