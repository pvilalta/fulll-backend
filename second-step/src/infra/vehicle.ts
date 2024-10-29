import { Repository } from "typeorm";
import { injectable, inject } from "tsyringe";

import { VehicleEntity } from "./entities";
import { Vehicle } from "../domain/Vehicle";

const domainAdapter = (fleet: VehicleEntity) => {
  return new Vehicle(fleet.registration, fleet.id);
};

@injectable()
export class VehicleService {
  constructor(@inject("VehicleRepository") private vehicleRepository: Repository<VehicleEntity>) {}

  async upsert(vehicle: Vehicle): Promise<Vehicle> {
    const upsertedVehicle = await this.vehicleRepository.save({
      id: vehicle.getId(),
      registration: vehicle.getRegistration()
    });
    return domainAdapter(upsertedVehicle);
  }

  async findById(id: number): Promise<Vehicle | null> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });
    if (!vehicle) return null;
    else return domainAdapter(vehicle);
  }

  async findByRegistration(registration: string): Promise<Vehicle | null> {
    const vehicle = await this.vehicleRepository.findOne({ where: { registration } });
    if (!vehicle) return null;
    else return domainAdapter(vehicle);
  }
}
