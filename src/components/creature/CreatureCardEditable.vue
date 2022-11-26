<script setup lang="ts">
import { ref, Ref } from "vue";

import { Creature, CreatureState } from "@/models";

const props = defineProps({
  item: {
    type: Creature,
    required: true
  }
});

const emits = defineEmits(["save", "cancel"]);

const state: Ref<CreatureState> = ref(CreatureState.from(props.item));

const onSave = () => emits("save", state.value);
const onCancel = () => emits("cancel");
</script>

<template>
  <form class="box form">
    <div
      class="block"
      style="border-radius: 60%; overflow: hidden; height: 130px; width: 130px"
    >
      <img
        :src="state.image"
        alt="creature-preview"
        style="width: 100%; height: auto"
      />
    </div>
    <div class="field is-horizontal">
      <label class="field-label">Image</label>
      <input v-model="state.image" class="input" />
    </div>
    <div class="field is-horizontal">
      <label class="field-label">Name</label>
      <input v-model="state.name" class="input" />
    </div>
    <div class="field is-horizontal">
      <label class="field-label">Strength</label>
      <input v-model="state.strength" class="input" type="number" />
    </div>
    <div class="field is-horizontal">
      <label class="field-label">Vitality</label>
      <input v-model="state.vitality" class="input" type="number" />
    </div>
    <div class="field is-horizontal">
      <label class="field-label">Dexterity</label>
      <input v-model="state.dexterity" class="input" type="number" />
    </div>
    <div class="buttons is-right">
      <button class="button" @click.prevent="onCancel">CANCEL</button>
      <button class="button is-success" @click.prevent="onSave">SAVE</button>
    </div>
  </form>
</template>
