<template>
    <button :onclick="onClick" class="rounded-lg bg-usach-daisy-800 hover:bg-usach-ultra-800 text-5xl text-white my-3 drop-shadow p-4 px-8">
        <a :href="href">{{label}}</a>
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