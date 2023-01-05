<script setup lang="ts">
import { ref, Ref, onMounted, computed, ComputedRef } from 'vue';
import { AdventureCell, AdventureMap, Encounter } from '@/models';
import { adventureMapService, encounterService } from '@/services';
import MapGraphPreview from '@/components/adventureCell/graph/MapGraphPreview.vue';
import { router } from '@/router';
import AdventureCellPreview from '@/components/adventureCell/AdventureCellPreview.vue';
import { getRandomItem } from '@/utils';
import UModal from '@/components/ui/UModal.vue';
import { EncounterCard } from '@/components';

const map: Ref<AdventureMap | null> = ref(null)

const newEncounterCard: Ref<Encounter | null> = ref(null)
const selectedCell: Ref<AdventureCell | null> = ref(null)

const id: ComputedRef<string> = computed(() => router.currentRoute.value.params.id as string)

const isEncounterModalOpen = ref(false)
onMounted(async () => {
    map.value = await adventureMapService.get(id.value)
})

const onCellCLick = (cellId: string) => {
    const cell = map.value?.cells.find(existing => existing.id === cellId)

    selectedCell.value = cell || null;
}

const onEcnouterCardDraw = async () => {
    const encounters = (await encounterService.list())
    newEncounterCard.value = getRandomItem(encounters);
    if (!map.value) {
        return
    }
    map.value = map.value.addEncounterToCell(selectedCell.value?.id || '', newEncounterCard.value)
    selectedCell.value = selectedCell.value!.addEncounter(newEncounterCard.value.id)
    isEncounterModalOpen.value = true;
}

const onEncounterRemove = (encounterId: string) => {
    if (!map.value) {
        return
    }
    const cellId = selectedCell.value?.id || '';

    map.value = map.value?.removeEncounterFromCell(cellId, encounterId)
    selectedCell.value = selectedCell.value!.removeEncounter(encounterId)
}

</script>

<template>

    <section class="section locations">
        <div class="container columns is-flex-align-items-stretch" style="margin: auto; min-height: 60vh">
            <div class="column is-one-quarter">
                <header class="header card p-2 is-flex is-justify-content-space-between is-align-items-center">
                    <h4 class="title is-4">{{ selectedCell?.location?.name }}</h4>
                </header>

                <div class="box panel  map-editor-sidebar sticky-header-container">
                    <AdventureCellPreview v-if="selectedCell" :item="selectedCell" @remove="onEncounterRemove" />
                </div>

                <button v-if="selectedCell" class="button is-info" @click="onEcnouterCardDraw">Draw an encounter
                    card</button>
            </div>

            <div class="column">
                <MapGraphPreview :items="map?.cells || []" @select="onCellCLick" />
            </div>

            <UModal :is-active="isEncounterModalOpen" @close="isEncounterModalOpen = false">
                <div class="box">
                    <EncounterCard v-if="newEncounterCard" :item="newEncounterCard" />
                    <div class="buttons is-right">
                        <button class="button" @click="isEncounterModalOpen = false">Ok</button>
                    </div>
                </div>
            </UModal>

        </div>

    </section>
</template>

