import Dexie, { type EntityTable } from "dexie";
import type { Fruit } from "../interfaces/fruit.interface";

class FruitsDatabase extends Dexie {
  fruits!: EntityTable<Fruit, "id">;

  constructor() {
    super("KittyTasksDatabase");
    this.version(1).stores({
      fruits: "++id, name, color",
    });
  }
}

export const fruitsDatabase = new FruitsDatabase();
