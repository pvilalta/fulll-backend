import { expect } from "chai";
import { Given, When, Then } from "@cucumber/cucumber";

import { queryBus } from "../src/app/";
import { commandBus } from "../src/app/";

import { GetLocationQuery } from "../src/app/queries/get-location";
import { ParkVehicleCommand } from "../src/app/commands/park-vehicle";
import { CreateLocationCommand } from "../src/app/commands/create-location";

Given("a location", async function () {
  commandBus.dispatch(new CreateLocationCommand("location123", 45.7578, 4.8342));
});

When("I park my vehicle at this location", function () {
  const location = queryBus.dispatch(new GetLocationQuery("location123"));
  commandBus.dispatch(new ParkVehicleCommand("vehicle123", location.getId()));
});

Then("the known location of my vehicle should verify this location", function () {
  const location = queryBus.dispatch(new GetLocationQuery("location123"));
  expect(location.getVehicleId()).equal("vehicle123");
});

Given("my vehicle has been parked into this location", function () {
  const location = queryBus.dispatch(new GetLocationQuery("location123"));
  commandBus.dispatch(new ParkVehicleCommand("vehicle123", location.getId()));
});

When("I try to park my vehicle at this location", function () {
  const location = queryBus.dispatch(new GetLocationQuery("location123"));
  try {
    commandBus.dispatch(new ParkVehicleCommand("vehicle123", location.getId()));
  } catch (error) {
    this.error = error;
  }
});

Then("I should be informed that my vehicle is already parked at this location", function () {
  expect(this.error).to.exist;
  expect(this.error.message).to.equal("Location is already occupied");
});
