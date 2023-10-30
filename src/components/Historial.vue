<template>
	<div
		v-if="props.scoreList"
		class="overflow-hidden flex flex-col rounded-xl w-[30%] bg-usach-ultra-900"
	>
		<div
			class="flex flex-row px-5 pt-3 mb-2 text-white text-xl justify-center items-center gap-3"
		>
			<p class="font-usach-helvetica-bold">{{ label }}</p>
		</div>
		<ol class="text-white">
			<li class="px-3 pb-1 gap-8 flex flex-row justify-center font-usach-helvetica-body">
                <p>Dificultad</p>
				<p>Tiempo</p>
                <p>Puntaje</p>
			</li>
			<li
				v-for="(item, index) in props.scoreList.slice(0, 5)"
				:key="index"
				class="px-3 py-3 flex flex-row justify-evenly gap-4 font-usach-helvetica-body bg-usach-ultra-700"
			>
                <p class=" font-usach-helvetica-body">Dificil</p>
				<p class="font-usach-helvetica-bold">{{ item.answer_time }}</p>
				<p class="w-9 text-right">{{ item.score }}</p>
			</li>
		</ol>
	</div>
</template>

<script setup>
const props = defineProps({
	label: String,
	scoreList: Object,
});
</script>
