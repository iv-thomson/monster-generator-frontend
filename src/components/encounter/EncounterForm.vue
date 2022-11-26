<script lang="ts" setup>
import { Ref, ref } from 'vue';

import { EncounterState } from '@/models';
import { encounterService } from '@/services';

const state: Ref<EncounterState> = ref(EncounterState.empty());

const emit = defineEmits(['submit']);

const onSubmit = () => {
  encounterService.create(state.value);
  state.value = EncounterState.empty();
  emit('submit');
};
</script>

<template>
  <form class="form">
    <div class="field">
      <label class="label">Name</label>
      <input v-model="state.name" class="input" />
    </div>

    <div class="field">
      <label class="label">Description</label>
      <textarea v-model="state.description" class="textarea"></textarea>
    </div>

    <button class="button is-action" @click.prevent="onSubmit">Submit</button>
  </form>
</template>
