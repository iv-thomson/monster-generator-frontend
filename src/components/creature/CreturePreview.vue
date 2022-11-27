<script setup lang="ts">
import { Creature } from '@/models';

defineProps({
  item: {
    type: Creature,
    required: true,
  },
});
</script>

<template>
  <div class="mb-4 is-flex is-align-items-center">
    <div
    class="mr-4"
      style="border-radius: 20px; overflow: hidden; height: 64px; width: 64px"
    >
      <img
        :src="item.image"
        alt="creature-preview"
        style="width: 100%; height: auto"
      />
    </div>
    <h6 class="title is-6">
      {{ item.name }}
      <span :class="`tag tag--${item.color}`">{{ item.level }}</span>
    </h6>
  </div>
</template>
