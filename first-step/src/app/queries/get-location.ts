import { queryBus, ActionHandler } from "..";
import { locationRepository } from "../../infra/repository";

export class GetLocationQuery {
  constructor(public readonly id: string) {}
}

class GetLocationHandler implements ActionHandler<GetLocationQuery> {
  exec(payload: GetLocationQuery) {
    return locationRepository.findById(payload.id);
  }
}

queryBus.register(GetLocationQuery.name, new GetLocationHandler());
