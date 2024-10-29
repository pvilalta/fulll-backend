import { commandBus, ActionHandler } from "..";
import { fleetRepository } from "../../infra/repository";

export class AddVehicleToFleetCommand {
  constructor(
    public readonly vehicleId: string,
    public readonly fleetId: string
  ) {}
}

class AddVehicleToFleetHandler implements ActionHandler<AddVehicleToFleetCommand> {
  exec(payload: AddVehicleToFleetCommand) {
    const existingFleet = fleetRepository.findById(payload.fleetId);
    if (!existingFleet) throw new Error("Fleet doesn't exist");
    existingFleet.addVehicle(payload.vehicleId);
  }
}

commandBus.register(AddVehicleToFleetCommand.name, new AddVehicleToFleetHandler());
