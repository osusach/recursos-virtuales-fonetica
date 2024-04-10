<template>
	<header className="bg-usach-aqua-900 flex items-center p-1">
		<div className="flex-none">
			<button @click="routeButton()" title="Ir al inicio">
				<img
					src="/UsachSB.avif"
					alt="Logo Usach"
					className="logo-sb hidden xl:block"
				/>
				<img
					src="/UsachPB.avif"
					alt="Logo Usach"
					className="logo-pb xl:hidden block"
				/>
			</button>
		</div>
		<div class="flex-grow text-center">
			<h1
				className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-usach-bebas-title text-white "
			>
				Recursos virtuales para el aprendizaje del lenguaje
			</h1>
		</div>
		<div
			class="flex flex-row gap-2 items-center align-middle mr-1 px-4 p-2 rounded-lg w-fit flex-shrink-0"
		>
			<router-link
				to="/usuario"
				class="flex flex-row items-baseline gap-2 flex-shrink-0 text-white transition p-2 bg-usach-aqua-700 hover:bg-usach-aqua-600 rounded-lg"
				title="Usuario"
			>
				<img
					class="invert"
					width="16"
					height="16"
					src="/user.svg"
					alt="user"
				/>
				<p class="font-usach-bebas-body text-2xl hidden sm:block">
					{{ store.user }}
				</p>
			</router-link>
			<svg width="1" height="25" class="fill-white flex-shrink-0">
				<rect width="400" height="100" />
			</svg>
			<button
				title="Cerrar Sesión"
				@click="logout"
				class="align-middle flex-shrink-0 transition text-white hover:bg-usach-aqua-600 p-3 bg-usach-aqua-700 rounded-lg"
			>
				<img
					src="/logout.svg"
					class="h-6 invert fill-usach-terra-900"
					alt="Logout"
				/>
			</button>
		</div>
	</header>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../store.js";
import { useRouter } from "vue-router";
const router = useRouter();

const routeButton = () => {
	if (store.email == null) {
		router.push("/login");
	} else {
		router.push("/");
	}
};

const logout = () => {
	store.user = "Invitado";
	store.email = null;
	store.curso = null;
	store.password = null;
	router.push("/login");
};
</script>

<style>
.logo-pb {
	height: 170px;
	width: 170px;
}

.logo-sb {
	height: 170px;
	width: 538px;
}
</style>
