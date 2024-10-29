import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
export class FleetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  vehicleIds: string;
}

@Entity()
@Unique(["registration"])
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  registration: string;
}

@Entity()
@Unique(["latitude", "longitude"])
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 8, scale: 5 })
  latitude: number;

  @Column({ type: "decimal", precision: 8, scale: 5 })
  longitude: number;

  @Column({ type: "integer", nullable: true })
  vehicleId: number | null;
}
