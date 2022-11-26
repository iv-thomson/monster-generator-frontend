<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";

import { Creature, CreatureState } from "@/models";
import { CreatureService } from "@/services/CreatureService";
import { ConfirmModal } from "@/utils";

import { MonsterForm, CreatureCard, CreatureCardEditable } from "@/components";
import UModal from "@/components/ui/UModal.vue";

const items: Ref<Creature[]> = ref([]);

const update = async () => {
  items.value = await CreatureService.list();
};

const confirmDeleteModal = new ConfirmModal();

const onDelete = async (id: string) => {
  confirmDeleteModal.open().onConfirm(async () => {
    await CreatureService.deleteCreature(id);
    update();
  });
};

const onSave = async (id: string, creature: CreatureState) => {
  await CreatureService.updateCreature(id, creature);
  await update();
  toggleEditable(id, false);
};

const editableItemsMap: Ref<Record<string, boolean>> = ref(
  items.value.reduce((result, item) => ({ ...result, [item.id]: false }), {})
);

const isEditable = (id: string): boolean => {
  return editableItemsMap.value[id];
};

const toggleEditable = (id: string, isActive: boolean): void => {
  editableItemsMap.value[id] = isActive;
};

onMounted(update);
</script>

<template>
  <section class="section creatures">
    <div class="container columns" style="margin: auto">
      <div class="box panel column is-one-quarter">
        <MonsterForm @submit="update" />
      </div>

      <div v-if="items.length" class="block column">
        <ul class="content grid">
          <li v-for="item in items" :key="item.id">
            <CreatureCardEditable
              v-if="isEditable(item.id)"
              :item="item"
              @save="onSave(item.id, $event)"
              @cancel="toggleEditable(item.id, false)"
            />
            <CreatureCard
              v-else
              :item="item"
              @delete="onDelete"
              @edit="toggleEditable(item.id, true)"
            />
          </li>
        </ul>
      </div>

      <UModal
        :is-active="confirmDeleteModal.isOpen.value"
        @close="confirmDeleteModal.decline()"
        ><div class="card">
          <header class="card-header">
            <h3 class="card-header-title" style="width: 300px">
              Delete creature
            </h3>
          </header>
          <section class="card-content">
            <div class="content">
              <p>Are you sure you want to delete this creature? This action is irreversible.</p>
            </div>
          </section>
          <section class="card-footer">
            <button
              class="button card-footer-item"
              @click="confirmDeleteModal.decline"
            >
              CANCEL
            </button>
            <button
              class="button is-danger card-footer-item"
              @click="confirmDeleteModal.confirm"
            >
              CONFIRM
            </button>
          </section>
        </div></UModal
      >
    </div>
  </section>
</template>

<style lang="scss">
.creatures {
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    > li {
      width: calc(100% / 4 - 16px);
    }
  }

  @media (max-width: 1400px) {
    .grid {
      > li {
        width: calc(100% / 3 - 16px);
      }
    }
  }

  @media (max-width: 1200px) {
    .grid {
      > li {
        width: calc(100% / 2 - 16px);
      }
    }
  }

  @media (max-width: 600px) {
    .grid {
      > li {
        width: calc(100% - 16px);
      }
    }
  }
}
</style>
