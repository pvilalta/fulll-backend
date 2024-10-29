import { expect } from "chai";
import { Given, When, Then } from "@cucumber/cucumber";
import { queryBus } from "../src/app/";
import { commandBus } from "../src/app/";
import { GetFleetQuery } from "../src/app/queries/get-fleet";
import { CreateFleetCommand } from "../src/app/commands/create-fleet";
import { CreateVehicleCommand } from "../src/app/commands/create-vehicle";
import { AddVehicleToFleetCommand } from "../src/app/commands/add-vehicle-to-fleet";

Given("my fleet", async function () {
  commandBus.dispatch(new CreateFleetCommand("fleet123", "user456"));
});

Given("a vehicle", function () {
  commandBus.dispatch(new CreateVehicleCommand("vehicle123", "DW-939-XR"));
});

When("I register this vehicle into my fleet", function () {
  commandBus.dispatch(new AddVehicleToFleetCommand("vehicle123", "fleet123"));
});

Then("this vehicle should be part of my vehicle fleet", function () {
  const fleet = queryBus.dispatch(new GetFleetQuery("fleet123"));
  expect(fleet.vehicleIds).to.include("vehicle123");
});

Given("I have registered this vehicle into my fleet", function () {
  commandBus.dispatch(new AddVehicleToFleetCommand("vehicle123", "fleet123"));
});

When("I try to register this vehicle into my fleet", function () {
  try {
    commandBus.dispatch(new AddVehicleToFleetCommand("vehicle123", "fleet123"));
  } catch (error) {
    this.error = error;
  }
});

Then("I should be informed this this vehicle has already been registered into my fleet", function () {
  expect(this.error).to.exist;
  expect(this.error.message).to.equal("The vehicle has already been registered in your fleet");
});

Given("the fleet of another user", function () {
  commandBus.dispatch(new CreateFleetCommand("fleet789", "user101"));
});

Given("this vehicle has been registered into the other user's fleet", function () {
  commandBus.dispatch(new AddVehicleToFleetCommand("vehicle123", "fleet789"));
});

Given("this vehicle should be part of my vehicle feet", function () {
  const fleet = queryBus.dispatch(new GetFleetQuery("fleet123"));
  expect(fleet.vehicleIds).to.include("vehicle123");
});
