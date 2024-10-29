import { commandBus, ActionHandler } from "..";
import { Location } from "../../domain/Location";
import { locationRepository } from "../../infra/repository";

export class CreateLocationCommand {
  constructor(
    public readonly id: string,
    public readonly latitude: number,
    public readonly longitude: number
  ) {}
}
class CreateCommandHandler implements ActionHandler<CreateLocationCommand> {
  exec(payload: CreateLocationCommand) {
    locationRepository.upsert(new Location(payload.id, payload.latitude, payload.longitude));
  }
}
commandBus.register(CreateLocationCommand.name, new CreateCommandHandler());
