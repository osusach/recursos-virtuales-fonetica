<template>
	<div
		class="flex flex-col items-center justify-center gap-10 w-full min-h-[80vh] bg-usach-aqua-100 p-4"
	>
		<login-form @login="handleLogin" />
		<game-selector
			v-if="loginInfo.isLogged"
			:isLogged="loginInfo.isLogged"
			:token="loginInfo.token"
		/>
	</div>
</template>

<script setup>
import { reactive } from "vue";
import LoginForm from "../components/LoginForm.vue";
import GameSelector from "../components/GameSelector.vue";

const loginInfo = reactive({
	isLogged: false,
	token: "",
});

const handleLogin = (status) => {
	loginInfo.isLogged = status.isLogged;
	loginInfo.token = status.token;
};
</script>
