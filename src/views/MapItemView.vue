<script setup lang="ts">
import { ref, Ref, onMounted, computed, ComputedRef } from 'vue';
import { AdventureCell, AdventureMap } from '@/models';
import { adventureMapService } from '@/services';
import MapGraphPreview from '@/components/adventureCell/graph/MapGraphPreview.vue';
import { router } from '@/router';
import AdventureCellPreview from '@/components/adventureCell/AdventureCellPreview.vue';

const map: Ref<AdventureMap | null> = ref(null)
const selectedCell: Ref<AdventureCell | null> = ref(null)

const id: ComputedRef<string> = computed(() => router.currentRoute.value.params.id as string)

onMounted(async () => {
    map.value = await adventureMapService.get(id.value)
})

const onCellCLick = (cellId: string) => {
    const cell = map.value?.cells.find(existing => existing.id === cellId)

    selectedCell.value = cell || null;
}

</script>

<template>

    <section class="section locations">
        <div class="container columns is-flex-align-items-stretch" style="margin: auto; min-height: 60vh">
            <div class="column is-one-quarter">
                <header
                    class="header card p-2 is-flex is-justify-content-space-between is-align-items-center">
                    <h4 class="title is-4">{{ selectedCell?.location?.name }}</h4>
                </header>

                <div class="box panel  map-editor-sidebar sticky-header-container">
                    <AdventureCellPreview v-if="selectedCell" :item="selectedCell" />
                </div>
            </div>

            <div class="column">
                <MapGraphPreview :items="map?.cells || []" @select="onCellCLick" />
            </div>

        </div>

    </section>
</template>

