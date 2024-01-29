<template>
	<Juego
		title="¿A qué categoría acentual pertenece esta palabra?"
		:func="acentualQuestion"
		:urlJuego="'/acentual'"
		:idJuego="'3'"
	>
	</Juego>
</template>

<script setup>
import Juego from "../components/Juego.vue";

function acentualQuestion(question) {
	let pos = question.word_pos + 1;
	let frase = question.phrase.split(" ");
	return (
		`<div class="bg-usach-ultra-600 p-3 rounded-lg my-5">` +
		`<p class="cat-text max-w-[20ch] font-usach-helvetica-bold">` +
		frase.slice(0, pos - 1).join(" ") +
		" " +
		`<b class="bg-usach-cloudy-900 rounded-md px-2 py-1">${
			frase[pos - 1]
		}</b>` +
		" " +
		frase.slice(pos).join(" ") +
		`</p>` +
		`</div>`
	);
}
</script>
