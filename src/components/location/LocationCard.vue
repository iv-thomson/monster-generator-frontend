<script setup lang="ts">
import { Location } from "@/models";

defineProps({
  item: {
    type: Location,
    required: true
  }
});

const emits = defineEmits(["delete", "edit"]);

const onDelete = (id: string) => emits("delete", id);
const onEdit = (id: string) => emits("edit", id);
</script>

<template>
  <div class="box">
    <div
      class="block"
      style="border-radius: 20px; overflow: hidden; height: auto; width: 100%"
    >
      <img
        :src="item.image"
        alt="creature-preview"
        style="min-width: 100%; height: auto; min-height: 200px"
      />
    </div>
    <h5 class="title is-5">{{ item.name }}</h5>
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
