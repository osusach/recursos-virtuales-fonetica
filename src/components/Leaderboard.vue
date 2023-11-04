<template>
	<div
		v-if="props.scoreList"
		class="overflow-hidden flex flex-col rounded-lg md:w-[30%] bg-usach-industrial-900"
	>
		<div
			class="flex flex-row px-5 pt-3 text-white text-xl justify-center items-center gap-3"
		>
			<img src="/crown_8.svg" class="h-5 invert" />
			<h1 class="font-usach-helvetica-bold">{{ label }}</h1>
		</div>
		<ol class="text-white">
			<li class="px-3 pb-1 flex flex-row justify-items-start">
				<p class="w-[80px]">
					<img
						class="invert"
						width="24"
						height="24"
						src="https://img.icons8.com/material-outlined/24/leaderboard.png"
						alt="leaderboard"
					/>
				</p>
				<p class="w-[110px]">
					<img
						class="invert"
						width="24"
						height="24"
						src="https://img.icons8.com/material-outlined/24/user--v1.png"
						alt="user--v1"
					/>
				</p>
				<p class="w-[55px]">
					<img
						class="invert"
						width="24"
						height="24"
						src="https://img.icons8.com/material-outlined/24/joystick.png"
						alt="joystick"
					/>
				</p>
				<p>
					<img
						class="invert"
						width="24"
						height="24"
						src="https://img.icons8.com/material-outlined/24/000000/time.png"
						alt="time"
					/>
				</p>
			</li>
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
				<p class="bg-transparent text-white font-usach-helvetica-body">
					{{ index + 1 }}.
				</p>
				<p class="w-36 font-usach-helvetica-bold">{{ item.name }}</p>
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
