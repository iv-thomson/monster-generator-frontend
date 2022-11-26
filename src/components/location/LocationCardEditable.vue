<script setup lang="ts">
import { ref, Ref } from "vue";

import { Location, LocationState } from "@/models";

const props = defineProps({
  item: {
    type: Location,
    required: true
  }
});

const emits = defineEmits(["save", "cancel"]);

const state: Ref<LocationState> = ref(LocationState.from(props.item));

const onSave = () => emits("save", state.value);
const onCancel = () => emits("cancel");
</script>

<template>
  <form class="box form">
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

    <div class="field">
      <label class="label">Image</label>
      <input v-model="state.image" class="input" />
    </div>

    <div class="field">
      <label class="label">Name</label>
      <input v-model="state.name" class="input" />
    </div>

    <div class="field">
      <label class="label">Description</label>
      <input v-model="state.description" class="input" />
    </div>

    <div class="buttons is-right">
      <button class="button" @click.prevent="onCancel">CANCEL</button>
      <button class="button is-success" @click.prevent="onSave">SAVE</button>
    </div>
  </form>
</template>
