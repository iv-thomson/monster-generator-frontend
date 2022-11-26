<script setup lang="ts">
import { Creature } from "@/models";

defineProps({
  item: {
    type: Creature,
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
      style="border-radius: 60%; overflow: hidden; height: 130px; width: 130px"
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
    <div class="block is-flex is-justify-content-space-between">
      <span>Strength</span>
      <span>{{ item.strength }}</span>
    </div>
    <div class="block is-flex is-justify-content-space-between">
      <span>Vitality</span>
      <span>{{ item.vitality }}</span>
    </div>
    <div class="block is-flex is-justify-content-space-between">
      <span>Dexterity</span>
      <span>{{ item.dexterity }}</span>
    </div>
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
