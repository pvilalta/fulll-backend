import "reflect-metadata";
import { DataSource } from "typeorm";
import { container } from "tsyringe";

import { ActionBus } from "./app";
import { FleetService } from "./infra/fleet";
import { VehicleService } from "./infra/vehicle";
import { LocationService } from "./infra/location";
import { GetFleetHandler } from "./app/queries/get-fleet";
import { GetLocationHandler } from "./app/queries/get-location";
import { CreateFleetHandler } from "./app/commands/create-fleet";
import { ParkVehicleHandler } from "./app/commands/park-vehicle";
import { CreateVehicleHandler } from "./app/commands/create-vehicle";
import { CreateLocationHandler } from "./app/commands/create-location";
import { AddVehicleToFleetHandler } from "./app/commands/add-vehicle-to-fleet";
import { FleetEntity, VehicleEntity, LocationEntity } from "./infra/entities";

export function bootstrap(appDataSource: DataSource) {
  container.registerInstance(DataSource, appDataSource);
  container.registerInstance("FleetRepository", appDataSource.getRepository(FleetEntity));
  container.registerInstance("VehicleRepository", appDataSource.getRepository(VehicleEntity));
  container.registerInstance("LocationRepository", appDataSource.getRepository(LocationEntity));

  container.registerSingleton(FleetService);
  container.registerSingleton(VehicleService);
  container.registerSingleton(LocationService);

  const commandBus = container.resolve(ActionBus);
  commandBus.register("CreateFleetCommand", container.resolve(CreateFleetHandler));
  commandBus.register("CreateVehicleCommand", container.resolve(CreateVehicleHandler));
  commandBus.register("AddVehicleToFleetCommand", container.resolve(AddVehicleToFleetHandler));
  commandBus.register("CreateLocationCommand", container.resolve(CreateLocationHandler));
  commandBus.register("ParkVehicleCommand", container.resolve(ParkVehicleHandler));
  container.registerInstance("CommandBus", commandBus);

  const queryBus = container.resolve(ActionBus);
  queryBus.register("GetFleetQuery", container.resolve(GetFleetHandler));
  queryBus.register("GetLocationQuery", container.resolve(GetLocationHandler));
  container.registerInstance("QueryBus", queryBus);

  return { commandBus, queryBus };
}
