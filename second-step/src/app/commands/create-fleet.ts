import { injectable } from "tsyringe";
import { ActionHandler } from "..";
import { Fleet } from "../../domain/Fleet";
import { FleetService } from "../../infra/fleet";

export class CreateFleetCommand {
  constructor(public readonly userId: number) {}
}

@injectable()
export class CreateFleetHandler implements ActionHandler<CreateFleetCommand> {
  constructor(private fleetService: FleetService) {}

  exec(payload: CreateFleetCommand) {
    return this.fleetService.upsert(new Fleet(payload.userId));
  }
}
