import { injectable, inject } from "tsyringe";
import { Repository } from "typeorm";
import { Fleet } from "../domain/Fleet";
import { FleetEntity } from "./entities";

const domainAdapter = (fleet: FleetEntity) => {
  const domainFleet = new Fleet(fleet.userId, fleet.id);
  JSON.parse(fleet.vehicleIds).forEach((v: number) => domainFleet.addVehicle(v));
  return domainFleet;
};

@injectable()
export class FleetService {
  constructor(@inject("FleetRepository") private fleetRepository: Repository<FleetEntity>) {}

  async upsert(fleet: Fleet): Promise<Fleet> {
    const upsertedFleet = await this.fleetRepository.save({
      id: fleet.getId(),
      userId: fleet.getUserId(),
      vehicleIds: JSON.stringify(fleet.getVehicles())
    });
    return domainAdapter(upsertedFleet);
  }

  async findById(id: number): Promise<Fleet | null> {
    const fleet = await this.fleetRepository.findOne({ where: { id } });
    if (!fleet) return null;
    else return domainAdapter(fleet);
  }
}
