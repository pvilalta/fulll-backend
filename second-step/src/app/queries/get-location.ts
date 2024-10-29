import { injectable } from "tsyringe";
import { ActionHandler } from "..";
import { LocationService } from "../../infra/location";

export class GetLocationQuery {
  constructor(public readonly id: number) {}
}

@injectable()
export class GetLocationHandler implements ActionHandler<GetLocationQuery> {
  constructor(private locationService: LocationService) {}

  exec(payload: GetLocationQuery) {
    return this.locationService.findById(payload.id);
  }
}
