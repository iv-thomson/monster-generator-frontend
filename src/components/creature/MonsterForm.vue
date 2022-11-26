<script lang="ts" setup>
import { Ref, ref } from "vue";
import { creatureService } from "@/services";
import { CreatureState } from "@/models";

const state: Ref<CreatureState> = ref(CreatureState.empty());

const emit = defineEmits(["submit"]);

const onSubmit = () => {
  creatureService.create(state.value);
  state.value = CreatureState.empty();
  emit("submit");
};
</script>

<template>
  <form class="form">
    <div class="field">
      <label class="label">Name</label>
      <input v-model="state.name" class="input" />
    </div>

    <div class="field">
      <label class="label">Strength</label>
      <input v-model="state.strength" class="input" type="number" />
    </div>

    <div class="field">
      <label class="label">Vitality</label>
      <input v-model="state.vitality" class="input" type="number" />
    </div>

    <div class="field">
      <label class="label">Dexteroty</label>
      <input v-model="state.dexterity" class="input" type="number" />
    </div>

    <div class="field">
      <label class="label">Image</label>
      <input v-model="state.image" class="input" />
    </div>
    <button class="button is-action" @click.prevent="onSubmit">Submit</button>
  </form>
</template>
