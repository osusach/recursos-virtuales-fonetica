<template>
	<header
		className="bg-usach-aqua-900 flex header-s items-center justify-between p-1"
	>
		<div class="flex items-center gap-5">
			<router-link to="/" class="flex-none">
				<img
					src="/UsachSB.png"
					alt="Logo Usach"
					class="logo-sb hidden lg:block"
				/>
				<img
					src="/UsachPB.png"
					alt="Logo Usach"
					class="logo-pb lg:hidden block"
				/>
			</router-link>
			<h1
				class="hidden sm:block sm:text-4xl xl:text-6xl flex-grow text-center font-usach-bebas-title text-white"
			>
				Recursos virtuales para el aprendizaje del lenguaje
			</h1>
			<h1
				class="sm:hidden block text-4xl flex-grow text-center font-usach-bebas-title text-white"
			>
				Recursos para el lenguaje
			</h1>
		</div>
		<div
			class="flex flex-row gap-2 items-center align-middle mr-1 px-4 bg-usach-aqua-700 p-2 rounded-lg w-fit flex-shrink-0"
		>
			<router-link
				to="/usuario"
				class="flex flex-row items-baseline gap-2 flex-shrink-0"
			>
				<img
					class="invert"
					width="16"
					height="16"
					src="https://img.icons8.com/tiny-glyph/16/user.png"
					alt="user"
				/>
				<p
					class="font-usach-bebas-body text-2xl text-white hidden sm:block"
				>
					{{ store.user }}
				</p>
			</router-link>
			<svg width="1" height="25" class="fill-white flex-shrink-0">
				<rect width="400" height="100" />
			</svg>
			<button @click="logout" class="align-middle flex-shrink-0">
				<img
					src="/logout.svg"
					class="h-6 invert fill-usach-terra-900"
				/>
			</button>
		</div>
	</header>
</template>

<script setup>
import { store } from "../store.js";
import { useRouter } from "vue-router";
console.log(store);
const router = useRouter();

const logout = () => {
	store.user = "Invitado";
	store.email = null;
	store.curso = null;
	store.password = null;
	router.push("/");
};
</script>

<style>
.header-s {
	flex-wrap: wrap-reverse;
}
@media (min-width: 640px) {
	.header-s {
		flex-wrap: nowrap;
	}
}
.logo-pb {
	width: 110px;
}
.logo-sb {
	height: 170px;
	width: 538px;
}
</style>
