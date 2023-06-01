<script setup lang="ts">
import { Ref, computed, onMounted, ref, watch } from 'vue'

import { AdventureMap } from '@/models';
import { adventureMapService } from '@/services';
import { useRouter } from 'vue-router';

const maps: Ref<AdventureMap[]> = ref([])

onMounted(async () => {
    maps.value = await adventureMapService.list()
})

const onDelete = async (id: string) => {
    await adventureMapService.delete(id)
    maps.value = await adventureMapService.list()
}

</script>

<template>
    <main class="container">
        <section class="section">
            <router-link :to="`/admin/map-editor`"><button class="button is-primary">New Map</button></router-link>
        </section>
        <section class="section">
            <div v-for="map in maps" :key="map.id" class="mb-2">
                <div class="card box is-flex is-justify-content-space-between">
                    {{ map.name }}

                    <div>
                        <router-link :to="`/admin/map-editor/${map.id}`">
                            <button class="button mr-4">Edit</button>
                        </router-link>
                        <button class="button is-danger" @click="onDelete(map.id)">Delete</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

