<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';

import { Creature, EncounterState } from '@/models';
import { creatureService, encounterService } from '@/services';

const state: Ref<EncounterState> = ref(EncounterState.empty());

const creatures: Ref<Creature[]> = ref([]);

const emit = defineEmits(['submit']);

const onSubmit = async () => {
  await encounterService.create(state.value);
  state.value = EncounterState.empty();
  emit('submit');
};

onMounted(async () => {
  creatures.value = await creatureService.list();
});
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

    <div class="field">
      <label class="label">Creatures</label>
      <div class="select is-multiple">
        <select v-model="state.creatures" multiple size="8">
          <option
            v-for="creature in creatures"
            :key="creature.id"
            :value="creature.id"
          >
            {{ creature.name }}
          </option>
        </select>
      </div>
    </div>

    <button class="button is-action" @click.prevent="onSubmit">Submit</button>
  </form>
</template>
