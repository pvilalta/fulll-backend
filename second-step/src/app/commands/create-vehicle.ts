import { injectable } from "tsyringe";
import { ActionHandler } from "..";
import { Vehicle } from "../../domain/Vehicle";
import { VehicleService } from "../../infra/vehicle";

export class CreateVehicleCommand {
  constructor(public readonly registration: string) {}
}

@injectable()
export class CreateVehicleHandler implements ActionHandler<CreateVehicleCommand> {
  constructor(private vehicleService: VehicleService) {}

  async exec(payload: CreateVehicleCommand) {
    const existingRegistration = await this.vehicleService.findByRegistration(payload.registration);
    if (existingRegistration) return existingRegistration;
    return this.vehicleService.upsert(new Vehicle(payload.registration));
  }
}
