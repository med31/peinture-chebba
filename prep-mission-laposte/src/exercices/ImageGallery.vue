<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  links: string[];
}>();

const images = ref([...props.links]);

function removeAt(index: number): void {
  images.value.splice(index, 1);
}
</script>

<template>
  <div>
    <div v-for="(src, index) in images" :key="src + index" class="image">
      <img :src="src" alt="" />
      <button class="remove" type="button" @click="removeAt(index)">X</button>
    </div>
  </div>
</template>
