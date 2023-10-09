<template>
	<button @click="onClick" :type="type" class="default-button">
		<a class="font-usach-helvetica-medium px-max">{{ label }}</a>
		<slot></slot>
	</button>
</template>

<script setup>
const props = defineProps({
	label: String,
	type: {
		type: String,
		required: false,
		default: "button",
	},
	onClick: {
		type: Function,
		required: false,
	},
});
</script>

<style>
.default-button {
	border-radius: 0.5rem /* 8px */;
	--tw-text-opacity: 1;
	color: rgb(255 255 255 / var(--tw-text-opacity));
	margin-top: 0.5rem /* 8px */;
	margin-bottom: 0.5rem /* 8px */;
	--tw-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
		drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
	filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast)
		var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert)
		var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
	padding: 0.5rem /* 8px */;
}
</style>
