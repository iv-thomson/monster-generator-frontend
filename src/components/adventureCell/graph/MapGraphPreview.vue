<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, PropType } from "vue";
import { ForceSimulation } from "@livereader/graphly-d3";
import "@livereader/graphly-d3/style.css";
import Hexagon from "./Hexagon";
import { emitter, EventName } from './EventBus'

import { toD3Format } from "@/services/LocationGraph";
import { AdventureCellState } from "@/models";

const root = ref(null);

let simulation: ForceSimulation;

const props = defineProps({
  items: {
    required: true,
    type: Array as PropType<AdventureCellState[]>
  }
})

const emit = defineEmits(['select'])

onMounted(() => {
  simulation = new ForceSimulation(root.value);
  simulation.templateStore.add("hexagon", Hexagon);

  emitter.on(EventName.CellClicked, onSelect)
});

onUnmounted(() => {
  emitter.off(EventName.CellClicked, onSelect)
})

function onSelect(id: string) {
  emit('select', id)
}

watch(() => props.items, (items) => {
  simulation.render(toD3Format(items));
}, { deep: true });
</script>

<template>
  <div class="card" style="width: 100%">
    <svg ref="root" width="100%" height="100%" style="min-height: 60vh"></svg>
  </div>
</template>

<style scoped>

</style>
