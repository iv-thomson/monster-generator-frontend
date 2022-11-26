import { Identifiable } from '@/models';
import { onMounted, ref, Ref } from 'vue';
import { CRUDService } from './CRUDService';

export class EditorPageState<T extends Identifiable, P, S extends Object> {
  public items: Ref<T[]> = ref([]);

  public constructor(private service: CRUDService<T, P, S>) {
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.onSave = this.onSave.bind(this);

    onMounted(this.update);
  }

  public async update() {
    this.items.value = await this.service.list();
  }

  public async delete(id: string) {
    await this.service.delete(id);
    this.update();
  }

  public async onSave(id: string, location: S) {
    await this.service.update(id, location);
    await this.update();
  }
}
