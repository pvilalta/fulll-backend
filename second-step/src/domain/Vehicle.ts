export class Vehicle {
  constructor(
    private readonly registration: string,
    private readonly id?: number
  ) {}

  getId(): number | undefined {
    return this.id;
  }
  getRegistration(): string {
    return this.registration;
  }
}
