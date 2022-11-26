<script lang="ts" setup>
import UModal from './UModal.vue';

defineProps({
  isActive: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});
const emit = defineEmits(["decline", "confirm"]);
const onConfirm = () => emit("confirm");
const onDecline = () => emit("decline");
</script>

<template>
  <UModal :is-active="isActive" @close="onDecline"
    ><div class="card">
      <header class="card-header">
        <h3 class="card-header-title" style="width: 300px">{{ title }}</h3>
      </header>
      <section class="card-content">
        <div class="content">
          <p>
            {{ content }}
          </p>
        </div>
      </section>
      <section class="card-footer">
        <button class="button card-footer-item" @click="onDecline">
          CANCEL
        </button>
        <button class="button is-danger card-footer-item" @click="onConfirm">
          CONFIRM
        </button>
      </section>
    </div></UModal
  >
</template>
