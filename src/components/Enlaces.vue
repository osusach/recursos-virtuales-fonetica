<template>
    <a :href="to" className="font-usach-helvetica-bold rounded-lg  p-4 text-lg">
      <slot></slot>
    </a>
  </template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  methods: {
    navigate(event) {
      event.preventDefault();
      this.$router.push(this.to);
    },
  },
};
</script>
