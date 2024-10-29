import { injectable } from "tsyringe";
import { ActionHandler } from "..";
import { VehicleService } from "../../infra/vehicle";
import { LocationService } from "../../infra/location";

export class ParkVehicleCommand {
  constructor(
    public readonly vehiclePlateNumber: string,
    public readonly locationId: number
  ) {}
}

@injectable()
export class ParkVehicleHandler implements ActionHandler<ParkVehicleCommand> {
  constructor(
    private vehicleService: VehicleService,
    private locationService: LocationService
  ) {}

  async exec(payload: ParkVehicleCommand) {
    const [location, vehicle] = await Promise.all([
      this.locationService.findById(payload.locationId),
      this.vehicleService.findByRegistration(payload.vehiclePlateNumber)
    ]);
    if (!location) throw new Error("Location not found");
    if (!vehicle) throw new Error("Vehicle not found");

    location.park(vehicle.getId() as number);
    return this.locationService.upsert(location);
  }
}
