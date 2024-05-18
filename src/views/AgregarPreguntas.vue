<template>
	<div
		class="flex flex-col items-center justify-center gap-10 w-screen h-screen bg-usach-aqua-100"
	>
		<login-form @login="handleLogin" />
		<game-selector v-if="loginInfo.isLogged" :isLogged="loginInfo.isLogged" :token="loginInfo.token" ref="gameSelector"/>
	</div>
</template>

<script setup>
import { ref, nextTick, reactive } from "vue";
import LoginForm from "../components/LoginForm.vue";
import GameSelector from "../components/GameSelector.vue";

const loginInfo = reactive({
	isLogged: false,
	token: "",
});
const gameSelector = ref(null);

const handleLogin = async (status) => {
	loginInfo.isLogged = status.isLogged;
	loginInfo.token = status.token;
	if (loginInfo.isLogged) {
		await nextTick();
		gameSelector.value.loadWords();
	}
};
</script>
