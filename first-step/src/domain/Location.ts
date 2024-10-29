export class Location {
  private vehicleId: string | null = null;

  constructor(
    private readonly id: string,
    private readonly latitude: number,
    private readonly longitude: number
  ) {}

  getId(): string {
    return this.id;
  }

  getVehicleId(): string | null {
    return this.vehicleId;
  }

  park(vehicleIdToPark: string): void {
    if (this.isFree()) throw new Error("Location is already occupied");
    else this.vehicleId = vehicleIdToPark;
  }

  private isFree(): boolean {
    return !!this.vehicleId;
  }
}
