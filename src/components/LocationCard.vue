<script setup lang="ts">
import { Location } from '@/models';

const { item } = defineProps({
    item: {
        type: Location,
        required: true
    },
})

const emits = defineEmits(['delete'])

const onDelete = (id: string) => emits('delete', id)
</script>

<template>
    <div class="box">
        <div class="block" style="border-radius: 20px; overflow: hidden; height: auto; width: 100%">
            <img :src="item.image" alt="creature-preview" style="min-width: 100%; height: auto; min-height: 200px;" />
        </div>
        <h5 class="title is-5">{{ item.name }}</h5>
        <div class="block is-flex  is-flex-direction-column">
            <label class="label">Description</label>
            <span>{{ item.description }}</span>
        </div>

        <button class="button is-danger" @click="onDelete(item.id)">DELETE</button>
    </div>
</template>

