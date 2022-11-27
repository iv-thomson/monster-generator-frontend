<script setup lang="ts">
import { LocationState } from '@/models';
import { locationService } from '@/services';

import { LocationForm, LocationCard } from '@/components';
import { ConfirmModal } from '@/utils';
import ConfirmModalVue from '@/components/ui/ConfirmModal.vue';
import LocationCardEditable from '@/components/location/LocationCardEditable.vue';
import { EditableItemsState } from '@/services/EditableState';
import { EditorPageState } from '@/services/EditorService';

const state = new EditorPageState(locationService);
const modal = new ConfirmModal();
const editableItems = new EditableItemsState(state.items.value);

const onDelete = (id: string) => modal.open().onConfirm(() => state.delete(id));
const onSave = (id: string, item: LocationState) => {
  state.onSave(id, item);
  editableItems.toggleEditable(id, false);
};
</script>

<template>
  <section class="section locations">
    <div class="container columns" style="margin: auto">
      <div class="box panel column is-one-quarter">
        <LocationForm @submit="state.update" />
      </div>

      <div v-if="state.items.value.length" class="block column">
        <ul class="content grid">
          <li v-for="item in state.items.value" :key="item.id">
            <LocationCardEditable
              v-if="editableItems.isEditable(item.id)"
              :item="item"
              @save="onSave(item.id, $event)"
              @cancel="editableItems.toggleEditable(item.id, false)"
            />
            <LocationCard
              v-else
              :item="item"
              @delete="onDelete"
              @edit="editableItems.toggleEditable(item.id, true)"
            />
          </li>
        </ul>
      </div>
    </div>
    <ConfirmModalVue
      title="Delete location"
      content="Are you sure you want to delete this location? This action is
              irreversible."
      :is-active="modal.isOpen.value"
      @confirm="modal.confirm()"
      @decline="modal.decline()"
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
