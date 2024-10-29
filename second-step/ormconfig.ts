import { FleetEntity, VehicleEntity, LocationEntity } from "./src/infra/entities";

export const dataSourceConfig = {
  type: "sqlite" as const,
  synchronize: true,
  logging: false,
  entities: [FleetEntity, VehicleEntity, LocationEntity]
};
