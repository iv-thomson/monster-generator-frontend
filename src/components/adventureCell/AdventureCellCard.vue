<script setup lang="ts">
import { AdventureCellState } from "@/models";

defineProps({
    item: {
        type: AdventureCellState,
        required: true
    }
})


</script>

<template>
    <div class="box">
        <h6 class="title is-6">
            {{ item.location?.name }}
        </h6>
        <div class="block" style="height: 130px; width: auto">
            <img :src="item.location?.image" alt="cell-preview" style="height: 100%; width: auto" />
        </div>
        <p>{{ item.location?.description }}</p>

        <p>{{ item.description }}</p>

    </div>
</template>
