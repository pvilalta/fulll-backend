import { injectable } from "tsyringe";
import { ActionHandler } from "..";
import { Location } from "../../domain/Location";
import { LocationService } from "../../infra/location";

export class CreateLocationCommand {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number
  ) {}
}

@injectable()
export class CreateLocationHandler implements ActionHandler<CreateLocationCommand> {
  constructor(private locationService: LocationService) {}

  async exec(payload: CreateLocationCommand) {
    const existingLocation = await this.locationService.findByCoordinates(payload.latitude, payload.longitude);
    if (existingLocation) return existingLocation;
    else return this.locationService.upsert(new Location(payload.latitude, payload.longitude));
  }
}
