<template>
	<input
		:type="type"
		:id="forLabel"
		class="mb-4 bg-white text-usach-industrial-1000 text-sm focus:ring-usach-terra-800 focus:ring-2 rounded-lg w-full p-2.5 text-left font-usach-helvetica-body"
		:placeholder="placeholder"
		required
	/>
</template>

<script setup>
const props = defineProps({
	label: String,
	forLabel: String,
	type: String,
	placeholder: {
		type: String,
		required: false,
	},
});
</script>
