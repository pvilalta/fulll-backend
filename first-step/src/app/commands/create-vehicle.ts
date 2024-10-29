import { commandBus, ActionHandler } from "..";
import { Vehicle } from "../../domain/Vehicle";
import { vehicleRepository } from "../../infra/repository";

export class CreateVehicleCommand {
  constructor(
    public readonly id: string,
    public readonly registration: string
  ) {}
}

class CreateVehicleHandler implements ActionHandler<CreateVehicleCommand> {
  exec(payload: CreateVehicleCommand) {
    return vehicleRepository.upsert(new Vehicle(payload.id, payload.registration));
  }
}

commandBus.register(CreateVehicleCommand.name, new CreateVehicleHandler());
