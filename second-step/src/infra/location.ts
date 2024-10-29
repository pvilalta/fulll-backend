import { Repository } from "typeorm";
import { injectable, inject } from "tsyringe";
import { LocationEntity } from "./entities";
import { Location } from "../domain/Location";

const domainAdapter = (fleet: LocationEntity) => {
  const location = new Location(fleet.latitude, fleet.longitude, fleet.id);
  if (fleet.vehicleId) location.park(fleet.vehicleId);
  return location;
};

@injectable()
export class LocationService {
  constructor(@inject("LocationRepository") private locationRepository: Repository<LocationEntity>) {}

  async upsert(location: Location): Promise<Location> {
    const upsertedLocation = await this.locationRepository.save({
      id: location.getId(),
      latitude: location.getLatitude(),
      longitude: location.getLongitude(),
      vehicleId: location.getVehicleId()
    });
    return domainAdapter(upsertedLocation);
  }

  async findById(id: number): Promise<Location | null> {
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) return null;
    else return domainAdapter(location);
  }

  async findByCoordinates(latitude: number, longitude: number): Promise<Location | null> {
    const location = await this.locationRepository.findOne({ where: { latitude, longitude } });
    if (!location) return null;
    else return domainAdapter(location);
  }
}
