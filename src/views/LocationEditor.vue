<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";

import { Location, LocationState } from "@/models";
import { LocationService } from "@/services";

import { LocationForm, LocationCard } from "@/components";
import { ConfirmModal } from "@/utils";
import ConfirmModalVue from "@/components/ui/ConfirmModal.vue";
import LocationCardEditable from "@/components/location/LocationCardEditable.vue";

const items: Ref<Location[]> = ref([]);
const confirmDeleteModal = new ConfirmModal();

const editableItemsMap: Ref<Record<string, boolean>> = ref(
  items.value.reduce((result, item) => ({ ...result, [item.id]: false }), {})
);

const update = async () => {
  items.value = await LocationService.list();
};

const onDelete = async (id: string) => {
  confirmDeleteModal.open().onConfirm(async () => {
    await LocationService.deleteCreature(id);
    update();
  });
};

const onSave = async (id: string, location: LocationState) => {
  await LocationService.updateCreature(id, location);
  await update();
  toggleEditable(id, false);
};

const toggleEditable = (id: string, isActive: boolean): void => {
  editableItemsMap.value[id] = isActive;
};

const isEditable = (id: string): boolean => {
  return editableItemsMap.value[id];
};

onMounted(update);
</script>

<template>
  <section class="section locations">
    <div class="container columns" style="margin: auto">
      <div class="box panel column is-one-quarter">
        <LocationForm @submit="update" />
      </div>

      <div v-if="items.length" class="block column">
        <ul class="content grid">
          <li v-for="item in items" :key="item.id">
            <LocationCardEditable
              v-if="isEditable(item.id)"
              :item="item"
              @save="onSave(item.id, $event)"
              @cancel="toggleEditable(item.id, false)"
            />
            <LocationCard
              v-else
              :item="item"
              @delete="onDelete"
              @edit="toggleEditable(item.id, true)"
            />
          </li>
        </ul>
      </div>
    </div>
    <ConfirmModalVue
      title="Delete location"
      content="Are you sure you want to delete this location? This action is
              irreversible."
      :is-active="confirmDeleteModal.isOpen.value"
      @confirm="confirmDeleteModal.confirm()"
      @decline="confirmDeleteModal.decline()"
    />
  </section>
</template>

<style lang="scss">
.locations {
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    > li {
      width: calc(100% / 2 - 16px);
    }
  }

  @media (max-width: 1200px) {
    .grid {
      > li {
        width: calc(100% - 16px);
      }
    }
  }
}
</style>
