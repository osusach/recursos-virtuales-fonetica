<template>
    <button class="bg-amber-500 p-10">
        {{ title }}
    </button>
</template>

<script setup>
    defineProps(['title'])
</script>