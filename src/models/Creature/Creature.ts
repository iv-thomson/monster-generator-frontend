import { ItemColor } from "../Colors";
import { CreatureDTO } from "./CreatureDTO";

export class CreatureState {
  constructor(
    public name: string,
    public image: string,
    public strength: number,
    public vitality: number,
    public dexterity: number
  ) {}
}

export class Creature {
  constructor(
    public name: string,
    public image: string,
    public strength: number,
    public vitality: number,
    public dexterity: number,
    public id: string
  ) {}

  public get level(): number {
    return Math.ceil((this.strength + this.vitality + this.dexterity) / 3);
  }

  public get color(): ItemColor {
    switch (true) {
      case this.level < 10:
        return ItemColor.Cheap;
      case this.level < 20:
        return ItemColor.Regular;
      case this.level < 40:
        return ItemColor.Magic;
      case this.level < 80:
        return ItemColor.Enchanted;
      case this.level < 160:
        return ItemColor.Epic;
      default:
        return ItemColor.Rare;
    }
  }

  public static from(creatures: CreatureDTO[]) {
    return creatures.map(
      (c) =>
        new Creature(c.name, c.image, c.strength, c.vitality, c.dexterity, c.id)
    );
  }
}
