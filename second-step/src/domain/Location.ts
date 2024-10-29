export class Location {
  private vehicleId: number | null = null;

  constructor(
    private readonly latitude: number,
    private readonly longitude: number,
    private readonly id?: number
  ) {}

  getId(): number | undefined {
    return this.id;
  }

  getLatitude(): number {
    return Number(this.latitude);
  }

  getLongitude(): number {
    return Number(this.longitude);
  }

  getVehicleId(): number | null {
    return this.vehicleId;
  }

  park(vehicleIdToPark: number): void {
    if (this.isFree()) throw new Error("Location is already occupied");
    else this.vehicleId = vehicleIdToPark;
  }

  private isFree(): boolean {
    return !!this.vehicleId;
  }
}
