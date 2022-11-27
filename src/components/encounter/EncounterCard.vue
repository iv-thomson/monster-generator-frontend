<script setup lang="ts">
import { Creature, Encounter } from '@/models';
import { ItemColor } from '@/models/Colors';
import { creatureService } from '@/services';
import { onMounted, Ref, ref } from 'vue';
import { CreaturePreview } from '..';

const props = defineProps({
  item: {
    type: Encounter,
    required: true,
  },
});

const emits = defineEmits(['delete', 'edit']);

const creatures: Ref<Creature[]> = ref([]);

const onDelete = (id: string) => emits('delete', id);
const onEdit = (id: string) => emits('edit', id);

onMounted(async () => {
  creatures.value = await creatureService.list({ id: props.item.creatures });
});
</script>

<template>
  <div class="box">
    <h6 class="title is-6">
      {{ item.name }}
    </h6>

    <p>{{ item.description }}</p>

    <label>Creatures:</label>
    <div class="is-flex is-flex-direction-column mt-4">
      <CreaturePreview
        v-for="creature in creatures"
        :key="creature.id"
        :item="creature"
      />
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
