import { expect } from "chai";
import { Given, When, Then } from "@cucumber/cucumber";

import { commandBus, queryBus } from "./config";
import { GetFleetQuery } from "../src/app/queries/get-fleet";
import { CreateFleetCommand } from "../src/app/commands/create-fleet";
import { CreateVehicleCommand } from "../src/app/commands/create-vehicle";
import { AddVehicleToFleetCommand } from "../src/app/commands/add-vehicle-to-fleet";

Given("my fleet", async function () {
  this.fleet = await commandBus.dispatch(new CreateFleetCommand(123));
});

Given("a vehicle", async function () {
  this.vehicle = await commandBus.dispatch(new CreateVehicleCommand("DW-939-XR"));
});

When("I register this vehicle into my fleet", async function () {
  await commandBus.dispatch(new AddVehicleToFleetCommand(this.vehicle.getId(), this.fleet.getId()));
});

When("I try to register this vehicle into my fleet", async function () {
  try {
    await commandBus.dispatch(new AddVehicleToFleetCommand(this.vehicle.getId(), this.fleet.getId()));
  } catch (error) {
    this.error = error;
  }
});

Then("this vehicle should be part of my vehicle fleet", async function () {
  const fleet = await queryBus.dispatch(new GetFleetQuery(this.fleet.getId()));
  expect(fleet.vehicleIds).to.include(1);
});

Given("I have registered this vehicle into my fleet", async function () {
  await commandBus.dispatch(new AddVehicleToFleetCommand(this.vehicle.getId(), this.fleet.getId()));
});

Then("I should be informed this this vehicle has already been registered into my fleet", function () {
  expect(this.error).to.exist;
  expect(this.error.message).to.equal("The vehicle has already been registered in your fleet");
});

Given("the fleet of another user", async function () {
  this.otherFleet = await commandBus.dispatch(new CreateFleetCommand(456));
});

Given("this vehicle has been registered into the other user's fleet", function () {
  commandBus.dispatch(new AddVehicleToFleetCommand(this.vehicle.getId(), this.otherFleet.getId()));
});

Given("this vehicle should be part of my vehicle feet", function () {
  const fleet = queryBus.dispatch(new GetFleetQuery(this.fleet.getId()));
  expect(fleet.vehicleIds).to.include(this.vehicle.getId());
});
