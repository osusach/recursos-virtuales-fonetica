<template>
	<div
		v-if="props.scoreList"
		class="overflow-hidden flex flex-col rounded-lg w-full bg-usach-industrial-900"
	>
		<div
			class="flex flex-row px-5 pt-3 text-white text-xl justify-center items-center gap-3 mb-2"
		>
			<img src="/crown.svg" class="h-6 invert" alt="Crown" />
			<h1 class="font-usach-helvetica-bold">{{ label }}</h1>
		</div>
		<ol class="text-white">
			<li
				v-for="(item, index) in props.scoreList.slice(0, 5)"
				:key="index"
				class="px-3 py-3 flex flex-row justify-evenly font-usach-helvetica-body"
				:class="{
					'bg-usach-terra-600': index === 0,
					'bg-usach-terra-700': index === 1,
					'bg-usach-terra-800': index === 2,
					'bg-usach-terra-900': index === 3,
					'bg-usach-terra-1000': index === 4,
				}"
			>
				<div class="flex flex-row gap-1">
					<p
						class="bg-transparent text-white font-usach-helvetica-body"
					>
						{{ index + 1 }}.
					</p>
					<p
						v-if="item.name !== 'Invitado/Anónimo'"
						class="font-usach-helvetica-bold"
					>
						{{ item.name }}
					</p>
					<p
						v-if="item.name === 'Invitado/Anónimo'"
						class="font-usach-helvetica-bold"
					>
						Invitado
					</p>
				</div>
				<p class="font-usach-helvetica-body">{{ item.answer_time }}</p>
				<p class="text-right font-usach-helvetica-bold">
					{{ item.score }}
				</p>
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
