export class Vehicle {
  constructor(
    private id: string,
    private registration: string
  ) {}

  getId(): string {
    return this.id;
  }

  getRegistration(): string {
    return this.registration;
  }
}
