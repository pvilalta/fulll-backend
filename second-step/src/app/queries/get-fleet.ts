import { injectable } from "tsyringe";
import { ActionHandler } from "..";
import { FleetService } from "../../infra/fleet";

export class GetFleetQuery {
  constructor(public readonly id: number) {}
}

@injectable()
export class GetFleetHandler implements ActionHandler<GetFleetQuery> {
  constructor(private fleetService: FleetService) {}

  exec(payload: GetFleetQuery) {
    return this.fleetService.findById(payload.id);
  }
}
