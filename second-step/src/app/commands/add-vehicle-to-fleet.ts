import { injectable } from "tsyringe";
import { ActionHandler } from "..";
import { FleetService } from "../../infra/fleet";

export class AddVehicleToFleetCommand {
  constructor(
    public readonly vehicleId: number,
    public readonly fleetId: number
  ) {}
}

@injectable()
export class AddVehicleToFleetHandler implements ActionHandler<AddVehicleToFleetCommand> {
  constructor(private fleetService: FleetService) {}

  async exec(payload: AddVehicleToFleetCommand) {
    const fleet = await this.fleetService.findById(payload.fleetId);
    if (!fleet) throw new Error("Fleet doesn't exist");
    fleet.addVehicle(payload.vehicleId);
    return this.fleetService.upsert(fleet);
  }
}
