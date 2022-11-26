<script setup lang="ts">
import { Encounter } from "@/models";

defineProps({
  item: {
    type: Encounter,
    required: true
  }
});

const emits = defineEmits(["delete", "edit"]);

const onDelete = (id: string) => emits("delete", id);
const onEdit = (id: string) => emits("edit", id);
</script>

<template>
  <div class="box">
    <h6 class="title is-6">
      {{ item.name }}
    </h6>

    <p>{{ item.description }}</p>

    <div class="buttons is-right">
      <button
        class="button is-outlined is-danger"
        @click.prevent="onDelete(item.id)"
      >
        DELETE
      </button>
      <button class="button is-info" @click.prevent="onEdit(item.id)">
        EDIT
      </button>
    </div>
  </div>
</template>
