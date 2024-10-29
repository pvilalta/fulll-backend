export class Fleet {
  private readonly vehicleIds: number[] = [];

  constructor(
    private readonly userId: number,
    private readonly id?: number
  ) {}

  getId(): number | undefined {
    return this.id;
  }

  getUserId(): number {
    return this.userId;
  }

  getVehicles(): number[] {
    return this.vehicleIds;
  }

  addVehicle(vehicleId: number): void {
    if (this.isVehicleRegistered(vehicleId)) throw new Error("The vehicle has already been registered in your fleet");
    else this.vehicleIds.push(vehicleId);
  }

  private isVehicleRegistered(vehicleId: number): boolean {
    return this.vehicleIds.includes(vehicleId);
  }
}
