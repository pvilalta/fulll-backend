import { Command } from "commander";
import { DataSource } from "typeorm";

import { bootstrap } from "./bootstrap";
import { dataSourceConfig } from "../ormconfig";
import { ParkVehicleCommand } from "./app/commands/park-vehicle";
import { CreateFleetCommand } from "./app/commands/create-fleet";
import { CreateVehicleCommand } from "./app/commands/create-vehicle";
import { CreateLocationCommand } from "./app/commands/create-location";
import { AddVehicleToFleetCommand } from "./app/commands/add-vehicle-to-fleet";

async function init() {
  const appDataSource = new DataSource({
    ...dataSourceConfig,
    database: "database.sqlite"
  });
  await appDataSource.initialize();

  const { commandBus } = bootstrap(appDataSource);
  const program = new Command();

  program
    .command("create <userId>")
    .description("Create a resource for the specified user")
    .action(async (userId: string) => {
      const createdFleet = await commandBus.dispatch(new CreateFleetCommand(Number(userId)));
      console.log(createdFleet.id);
    });

  program
    .command("register-vehicle <fleetId> <vehiclePlateNumber>")
    .description("Register a vehicle to a specified fleet")
    .action(async (fleetId: string, vehiclePlateNumber: string) => {
      const createdVehicle = await commandBus.dispatch(new CreateVehicleCommand(vehiclePlateNumber));
      const fleetWithVehicleAdded = await commandBus.dispatch(new AddVehicleToFleetCommand(createdVehicle.id, Number(fleetId)));
      console.log("fleetWithVehicleAdded", fleetWithVehicleAdded);
    });

  program
    .command("localize-vehicle <fleetId> <vehiclePlateNumber> <latitude> <longitude>")
    .description("Localize a vehicle")
    .action(async (fleetId: string, vehiclePlateNumber: string, latitude: number, longitude: number) => {
      const location = await commandBus.dispatch(new CreateLocationCommand(latitude, longitude));
      const parkedVehicle = await commandBus.dispatch(new ParkVehicleCommand(vehiclePlateNumber, location.id));
      console.log("parkedVehicle", parkedVehicle);
    });

  program.parseAsync(process.argv).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

init().catch((error) => {
  console.error("Error during app initialization:", error);
});
