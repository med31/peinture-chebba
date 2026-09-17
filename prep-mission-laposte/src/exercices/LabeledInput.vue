<script setup lang="ts">
defineProps<{
  id: string;
}>();
</script>

<template>
  <div>
    <label :for="id"><slot /></label>
    <input type="text" :id="id" />
  </div>
</template>
