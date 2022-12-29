<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { AdventureMap } from '@/models';
import { adventureMapService } from '@/services';

const maps: Ref<AdventureMap[]> = ref([])

onMounted(async () => {
    maps.value = await adventureMapService.list()
})

</script>

<template>
    <div>
        <div v-for="map in maps" :key="map.id">
            <router-link :to="`/map/${map.id}`">
              {{ map.id }}
            </router-link>
        </div>
    </div>
</template>

