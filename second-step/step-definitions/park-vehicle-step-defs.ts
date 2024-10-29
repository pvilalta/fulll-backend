import { expect } from "chai";
import { Given, When, Then } from "@cucumber/cucumber";

import { commandBus } from "./config";

import { ParkVehicleCommand } from "../src/app/commands/park-vehicle";
import { CreateLocationCommand } from "../src/app/commands/create-location";

const latitude = 45.7578137;
const longitude = 4.8320114;

Given("a location", async function () {
  this.location = await commandBus.dispatch(new CreateLocationCommand(latitude, longitude));
});

When("I park my vehicle at this location", async function () {
  this.locationWithVehicleParked = await commandBus.dispatch(new ParkVehicleCommand("DW-939-XR", this.location.getId()));
});

Then("the known location of my vehicle should verify this location", function () {
  expect(this.locationWithVehicleParked.getLatitude()).equal(latitude);
  expect(this.locationWithVehicleParked.getLongitude()).equal(longitude);
});

Given("my vehicle has been parked into this location", async function () {
  this.locationWithVehicleParked = await commandBus.dispatch(new ParkVehicleCommand("DW-939-XR", this.location.getId()));
});

When("I try to park my vehicle at this location", async function () {
  try {
    await commandBus.dispatch(new ParkVehicleCommand("DW-939-XR", this.location.getId()));
  } catch (error) {
    this.error = error;
  }
});

Then("I should be informed that my vehicle is already parked at this location", function () {
  expect(this.error).to.exist;
  expect(this.error.message).to.equal("Location is already occupied");
});
