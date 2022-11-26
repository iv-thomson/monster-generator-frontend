<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';

import { Creature } from '@/models';
import { CreatureService } from '@/services/CreatureService';

import MonsterFormVue from '@/components/MonsterForm.vue';

const items: Ref<Creature[]> = ref([])

const update = async () => {
    items.value = await CreatureService.list()
}

const onDelete = async (id: string) => {
    await CreatureService.deleteCreature(id)
    console.log('deleted')
    update()
}

onMounted(update)


</script>

<template>
    <section class="section">
        <div class="container columns is-max-desktop">
            <div class="box panel column is-one-quarter">
                <MonsterFormVue @submit="update" />
            </div>

            <div v-if="items.length" class="block column">
                <ul class="content grid">
                    <li v-for="item in items">
                        <div class="box">
                            <div class="block"
                                style="border-radius: 60%; overflow: hidden; height: 130px; width: 130px">
                                <img :src="item.image" alt="creature-preview" style="width: 100%; height: auto" />
                            </div>
                            <h6 class="title is-6">{{ item.name }} <span :class="`color-${item.color}`">{{ item.level
                            }}</span></h6>
                            <div class="block is-flex is-justify-content-space-between">
                                <span>Strength</span>
                                <span>{{ item.strength }}</span>
                            </div>
                            <div class="block is-flex is-justify-content-space-between">
                                <span>Vitality</span>
                                <span>{{ item.vitality }}</span>
                            </div>
                            <div class="block is-flex is-justify-content-space-between">
                                <span>Dexterity</span>
                                <span>{{ item.dexterity }}</span>
                            </div>
                            <button class="button is-danger" @click="onDelete(item.id)">DELETE</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style>
.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px
}

.grid>li {
    width: calc(100% / 3 - 16px);
}
</style>
