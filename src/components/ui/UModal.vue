<script lang="ts" setup>
defineProps({
  isActive: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(["close"]);

const onClose = () => emit("close");
</script>

<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="onClose"
    ></button>
  </div>
</template>
