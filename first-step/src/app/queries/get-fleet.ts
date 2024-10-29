import { queryBus, ActionHandler } from "..";
import { fleetRepository } from "../../infra/repository";

export class GetFleetQuery {
  constructor(public readonly id: string) {}
}

class GetFleetHandler implements ActionHandler<GetFleetQuery> {
  exec(payload: GetFleetQuery) {
    return fleetRepository.findById(payload.id);
  }
}

queryBus.register(GetFleetQuery.name, new GetFleetHandler());
