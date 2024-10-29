import { commandBus, ActionHandler } from "..";
import { locationRepository } from "../../infra/repository";

export class ParkVehicleCommand {
  constructor(
    public readonly vehicleId: string,
    public readonly locationId: string
  ) {}
}

class ParkVehicleHandler implements ActionHandler<ParkVehicleCommand> {
  exec(payload: ParkVehicleCommand) {
    const location = locationRepository.findById(payload.locationId);
    if (!location) throw new Error("Location not found");
    location.park(payload.vehicleId);
    locationRepository.upsert(location);
  }
}

commandBus.register(ParkVehicleCommand.name, new ParkVehicleHandler());
