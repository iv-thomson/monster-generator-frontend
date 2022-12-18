<script lang="ts" setup>
import { onMounted, Ref, ref, watch, PropType, computed } from 'vue';

import { Creature, Encounter, EncounterDTO, Location } from '@/models';
import { creatureService, encounterService, locationService } from '@/services';
import { AdventureCellState } from '@/models/Adventure/AdventureCell';
import { CreaturePreview } from '@/components';

class EncounterFull implements Encounter {
    constructor(public name: string, public description: string, public creatures: string[], public items: string[], public id: string, public creaturesListFull: Creature[]) { }

    public static from(encounter: EncounterDTO, list: Creature[]): EncounterFull {
        return new EncounterFull(encounter.name, encounter.description, encounter.creatures, encounter.items, encounter.id, list)
    }
}

const props = defineProps({
    item: {
        type: AdventureCellState,
        required: true,
    },
    neighbours: {
        type: Array as PropType<AdventureCellState[]>,
        default: () => [],
    },
})
const emit = defineEmits(['edit', 'createNew'])

const encounters: Ref<EncounterFull[]> = ref([])


watch(() => props.item, async () => {
    const encountersRaw = props.item.encounters.length ? await encounterService.list({ id: props.item.encounters }) : []

    encounters.value = await Promise.all(encountersRaw.map(async (encounter) => EncounterFull.from(encounter, await getCreatures(encounter.creatures))))

}, { immediate: true, deep: true })

const getCreatures = (creatureIds: string[]) => creatureService.list({ id: creatureIds })

const onEdit = () => emit('edit')

</script>

<template>
    <div>
        <div class="block" style="height: auto; width: 100%">
            <img :src="item.location?.image" alt="cell-preview" style="height: auto; width: 100%" />
        </div>

        <label class="label">Description</label>
        <p>{{ item.location?.description }}</p>

        <p>{{ item.description }}</p>

        <label class="label">Encounter threshold</label>
        <p>{{ item.encounterThreshold }}</p>


        <label class="label">Encounters</label>


        <div v-for="encounter in encounters" :key="encounter.id" :value="encounter.id">
            <h6 class="title is-6">{{ encounter.name }}</h6>
            <p>{{ encounter.description }}</p>
            <div class="is-flex is-flex-direction-column mt-4">
                <CreaturePreview v-for="creature in encounter.creaturesListFull" :key="creature.id" :item="creature" />
            </div>
        </div>

        <button class="button" @click="onEdit">Edit</button>
    </div>
</template>
