export class Fleet {
  private readonly vehicleIds: string[] = [];

  constructor(
    private readonly id: string,
    private readonly userId: string
  ) {}

  getId(): string {
    return this.id;
  }

  getVehicles(): string[] {
    return this.vehicleIds;
  }

  addVehicle(vehicleId: string): void {
    if (this.isVehicleRegistered(vehicleId)) throw new Error("The vehicle has already been registered in your fleet");
    else this.vehicleIds.push(vehicleId);
  }

  private isVehicleRegistered(vehicleId: string): boolean {
    return this.vehicleIds.includes(vehicleId);
  }
}
