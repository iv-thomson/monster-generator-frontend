import { Identifiable } from '@/models';
import { onMounted, ref, Ref } from 'vue';
import { CRUDService } from './CRUDService';

export class EditorPageState<Item extends Identifiable, DTO, State extends Object> {
  public items: Ref<Item[]> = ref([]);

  public constructor(private service: CRUDService<Item, DTO, State>) {
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.onSave = this.onSave.bind(this);

    onMounted(this.update);
  }

  public async update() {
    this.items.value = await this.service.list();
  }

  public async delete(id: string): Promise<void> {
    await this.service.delete(id);
    await this.update();
  }

  public async onSave(id: string, location: State) {
    await this.service.update(id, location);
    await this.update();
  }
}
