<script lang="ts" setup>
import { onMounted, Ref, ref, watch, PropType, computed } from 'vue';

import { Encounter, Location } from '@/models';
import { encounterService, locationService } from '@/services';
import { AdventureCellState } from '@/models/Adventure/AdventureCell';


const props = defineProps({
    initial: {
        type: AdventureCellState,
        default: null,
    },
    neighbours: {
        type: Array as PropType<AdventureCellState[]>,
        default: () => [],
    },
})
const state: Ref<AdventureCellState> = props.initial ? ref(props.initial) : ref(AdventureCellState.empty());

watch(props, () => {
    state.value = props.initial ? (props.initial) : (AdventureCellState.empty());
})

const locations: Ref<Location[]> = ref([]);
const encounters: Ref<Encounter[]> = ref([])

const emit = defineEmits(['submit', 'delete']);

const onSubmit = () => {
    emit('submit', state.value);

    state.value = AdventureCellState.empty();
};

const onDelete = () => {
    emit('delete', state.value.id);
}

const filteredNeighbours = computed(() => props.neighbours.filter(cell => cell.id !== state.value.id))

onMounted(async () => {
    locations.value = await locationService.list();
    encounters.value = await encounterService.list();
});
</script>

<template>
    <form class="form">
        <div class="field">
            <label class="label">Description</label>
            <textarea v-model="state.description" class="textarea"></textarea>
        </div>

        <div class="field">
            <label class="label">Location</label>
            <div class="select">
                <select v-model="state.location">
                    <option v-for="location in locations" :key="location.id" :value="location">
                        {{ location.name }}
                    </option>
                </select>
            </div>
        </div>

        <div class="field">
            <label class="label">neighbours</label>
            <div class="select is-multiple">
                <select v-model="state.neighbours" multiple>
                    <option v-for="neighbour in filteredNeighbours" :key="neighbour.id" :value="neighbour.id">
                        {{ neighbour.location?.name }}
                    </option>
                </select>
            </div>
        </div>

        <div class="field">
            <label class="label">Encounter threshold</label>
            <input v-model="state.encounterThreshold" class="input" type="number" />
        </div>

        <div class="field">
            <label class="label">Encounters</label>
            <div class="select is-multiple">
                <select v-model="state.encounters" multiple>
                    <option v-for="encounter in encounters" :key="encounter.id" :value="encounter.id">
                        {{ encounter.name }}
                    </option>
                </select>
            </div>
        </div>

        <button class="button is-action" @click.prevent="onSubmit">Submit</button>
        <button v-if="initial" class="button is-danger" @click.prevent="onDelete">Delete</button>
    </form>
</template>
