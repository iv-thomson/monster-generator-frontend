<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';

import { Creature, Encounter, EncounterState } from '@/models';
import { creatureService } from '@/services';

const props = defineProps({
  item: {
    type: Encounter,
    required: true,
  },
});

const emits = defineEmits(['save', 'cancel']);

const state: Ref<EncounterState> = ref(EncounterState.from(props.item));
const creatures: Ref<Creature[]> = ref([]);

onMounted(async () => {
  creatures.value = await creatureService.list();
});

const onSave = () => emits('save', state.value);
const onCancel = () => emits('cancel');
</script>

<template>
  <form class="box form">
    <div class="field">
      <label class="label">Name</label>
      <input v-model="state.name" class="input" />
    </div>

    <div class="field">
      <label class="label">Description</label>
      <textarea v-model="state.description" class="input"></textarea>
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

            ({{ creature.level }})
          </option>
        </select>
      </div>
    </div>

    <div class="buttons is-right">
      <button class="button" @click.prevent="onCancel">CANCEL</button>
      <button class="button is-success" @click.prevent="onSave">SAVE</button>
    </div>
  </form>
</template>
