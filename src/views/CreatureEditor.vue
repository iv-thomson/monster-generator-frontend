<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";

import { Creature } from "@/models";
import { CreatureService } from "@/services/CreatureService";

import { MonsterForm, CreatureCard } from "@/components";

const items: Ref<Creature[]> = ref([]);

const update = async () => {
  items.value = await CreatureService.list();
};

const onDelete = async (id: string) => {
  await CreatureService.deleteCreature(id);
  update();
};

onMounted(update);
</script>

<template>
  <section class="section">
    <div class="container columns is-max-desktop">
      <div class="box panel column is-one-quarter">
        <MonsterForm @submit="update" />
      </div>

      <div v-if="items.length" class="block column">
        <ul class="content grid">
          <li v-for="item in items" :key="item.id">
            <CreatureCard :item="item" @delete="onDelete" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  > li {
    width: calc(100% / 3 - 16px);
  }
}
</style>
