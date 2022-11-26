<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";

import { Location } from "@/models";
import { LocationService } from "@/services";

import { LocationForm, LocationCard } from "@/components";

const items: Ref<Location[]> = ref([]);

const update = async () => {
  items.value = await LocationService.list();
};

const onDelete = async (id: string) => {
  await LocationService.deleteCreature(id);
  update();
};

onMounted(update);
</script>

<template>
  <section class="section locations">
    <div class="container columns is-max-desktop">
      <div class="box panel column is-one-quarter">
        <LocationForm @submit="update" />
      </div>

      <div v-if="items.length" class="block column">
        <ul class="content grid">
          <li v-for="item in items" :key="item.id">
            <LocationCard :item="item" @delete="onDelete" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.locations {
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .grid > li {
    width: calc(100% / 2 - 16px);
  }
}
</style>
