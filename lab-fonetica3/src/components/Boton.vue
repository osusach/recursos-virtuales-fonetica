<template>
    <button>
        <slot />
    </button>
</template>

<script setup>
const print = () => {
    console.log('hola');
}
</script>