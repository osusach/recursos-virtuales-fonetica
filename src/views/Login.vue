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
			<Boton
				label="Iniciar Sesión"
				href="/"
				@click="loginFunc()"
				class="bg-usach-daisy-700 hover:bg-usach-daisy-900 text-xl"
			/>
			<div
				className="font-usach-helvetica-medium rounded-lg  p-4 text-lg"
			>
				¿No tienes cuenta?
				<router-link to="/register"> <b>Regístrate</b> </router-link>
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
		</div>
	</form>
</template>

<script setup>
import { useRouter } from "vue-router";
import Input from "../components/Input.vue";
import Boton from "../components/Boton.vue";
import Enlaces from "../components/Enlaces.vue";
import axios from "axios";
import { store } from "../store";
import { ref } from "vue";

const router = useRouter();
const url = "https://pindarosql.pindarousach.workers.dev";

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
			console.log("Respuesta del servidor:", response.data);
			const resp = response.data.payload.user[0];
			store.email = resp.email;
			store.password = resp.password;
			store.user = resp.name;
			store.curso = resp.course;
			router.push("/home");
		})
		.catch((error) => {
			console.error("Error en la solicitud:", error);
		});
};
</script>
