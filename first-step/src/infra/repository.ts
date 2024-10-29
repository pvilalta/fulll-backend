import { Fleet } from "../domain/Fleet";
import { Vehicle } from "../domain/Vehicle";
import { Location } from "../domain/Location";

interface Identifiable {
  getId(): string;
}

export class Repository<T extends Identifiable> {
  private items: T[] = [];

  upsert(itemToUpsert: T): string {
    const existingItem = this.findById(itemToUpsert.getId());
    if (existingItem) {
      const index = this.items.indexOf(existingItem);
      this.items[index] = itemToUpsert;
    } else {
      this.items.push(itemToUpsert);
    }

    return itemToUpsert.getId();
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.getId() === id);
  }
}

export const fleetRepository = new Repository<Fleet>();
export const vehicleRepository = new Repository<Vehicle>();
export const locationRepository = new Repository<Location>();
