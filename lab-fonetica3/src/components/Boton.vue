<template>
    <button :onclick="onClick" class="rounded-lg bg-usach-terra-700 hover:bg-usach-terra-800 text-lg text-white my-2 drop-shadow p-2">
        <a className="font-usach-helvetica-medium px-max" :href="href">
            {{ label }}
        </a>
    </button>
</template>

<script setup>
    const props = defineProps({
        href: {
            type: String,
            required: false
        },
        label: String,
        onClick:  {
            type: Function,
            required: false
        }
    })
</script>