import { Fleet } from "../../domain/Fleet";
import { commandBus, ActionHandler } from "..";
import { fleetRepository } from "../../infra/repository";

export class CreateFleetCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string
  ) {}
}

class CreateFleetHandler implements ActionHandler<CreateFleetCommand> {
  exec(payload: CreateFleetCommand) {
    fleetRepository.upsert(new Fleet(payload.id, payload.userId));
  }
}

commandBus.register(CreateFleetCommand.name, new CreateFleetHandler());
