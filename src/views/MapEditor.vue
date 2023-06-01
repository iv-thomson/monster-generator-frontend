<script setup lang="ts">
import { Ref, computed, watch } from 'vue'
import { AdventureCellState, AdventureMapState, LocationState } from '@/models';

import { ConfirmModal } from '@/utils';
import ConfirmModalVue from '@/components/ui/ConfirmModal.vue';
import AdventureCellForm from '@/components/adventureCell/AdventureCellForm.vue';
import { ref } from 'vue';
import MapGraphPreview from '@/components/adventureCell/graph/MapGraphPreview.vue';
import AdventureCellPreview from '@/components/adventureCell/AdventureCellPreview.vue';
import { adventureMapService } from '@/services';
import { useRoute, useRouter } from 'vue-router';


const mapState = ref(AdventureMapState.empty());
const selectedCell: Ref<AdventureCellState | undefined> = ref()
const modal = new ConfirmModal();

const isEditable = ref(true)
const neighbours = computed(() => mapState.value.cells)

const router = useRouter()
const route = useRoute()

const id = computed(() => route.params.id as string)
const isUpdateMode = computed(() => Boolean(id.value))

watch(() => id.value, async () => {
    mapState.value = isUpdateMode.value ? AdventureMapState.from(await adventureMapService.get(id.value)) : AdventureMapState.empty()
}, {
    immediate: true
})


const onCellCLick = (cellId: string) => {
    isEditable.value = false;

    const cellState = mapState.value.cells.find(existing => existing.id === cellId)
    if (!cellState) { return }
    selectedCell.value = cellState.clone()
}
const onDeleteCell = (key: string) => {
    selectedCell.value = undefined;
    mapState.value = mapState.value.deleteCell(key)
}

const onUpdateCell = (cell: AdventureCellState) => {
    if (mapState.value.cells.some((existing => existing.id == cell.id))) {
        mapState.value = mapState.value.updateCell(cell)
        isEditable.value = false;
        selectedCell.value = cell;
    } else {
        mapState.value = mapState.value.addCell(cell)
        isEditable.value = false;
        selectedCell.value = cell;
    }
}

const onCreateNew = () => {
    selectedCell.value = undefined
    isEditable.value = true
}

const onSave = async () => {
    try {
        await adventureMapService.create(mapState.value);
        router.push('/admin/maps')
    } catch {
        console.log('err')
    }
};

const onUpdate = async () => {
    try {
        await adventureMapService.update(id.value, mapState.value)
        router.push('/admin/maps')
    } catch {
        console.log('err')
    }
}
</script>

<template>
    <section class="section locations">
        <div class="container">
            <form class="form card box">
                <div class="field">
                    <label class="label">Name</label>
                    <input v-model="mapState.name" class="input" />
                </div>
            </form>
        </div>
        <div class="container columns is-flex-align-items-stretch" style="margin: auto; min-height: 60vh">
            <div class="column is-one-quarter">
                <header v-if="!isEditable"
                    class="header card p-2 is-flex is-justify-content-space-between is-align-items-center">
                    <h4 class="title is-4">{{ selectedCell?.location?.name }}</h4>
                    <button class="button is-small" @click="onCreateNew">New cell</button>
                </header>

                <div class="box panel  map-editor-sidebar sticky-header-container">

                    <AdventureCellForm v-if="isEditable" :initial="selectedCell" :neighbours="neighbours"
                        @submit="onUpdateCell" @delete="onDeleteCell" />
                    <AdventureCellPreview v-else-if="selectedCell" :item="selectedCell" @edit="isEditable = true"
                        has-controls @createNew="onCreateNew" />
                </div>
            </div>

            <div class="column">
                <MapGraphPreview :items="mapState.cells" @select="onCellCLick" />

                <div class="buttons is-right mt-4">
                    <button v-if="isUpdateMode" class="button" @click="onUpdate">update</button>
                    <button v-else class="button" @click="onSave">Save</button>
                </div>
            </div>

        </div>

        <ConfirmModalVue title="Delete cell" content="Are you sure you want to delete this cell? This action is
              irreversible." :is-active="modal.isOpen.value" @confirm="modal.confirm()" @decline="modal.decline()" />
    </section>
</template>

<style lang="scss">
.locations {
    .grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        >li {
            width: calc(100% / 2 - 16px);
        }
    }

    @media (max-width: 1200px) {
        .grid {
            >li {
                width: calc(100% - 16px);
            }
        }
    }
}
</style>
