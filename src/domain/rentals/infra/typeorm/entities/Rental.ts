import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../../../../accounts/infra/typeorm/entities/User';
import { Car } from '../../../../cars/infra/typeorm/entities/Car';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'car_id', type: 'uuid' })
  carId: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({
    name: 'start_date',
    type: 'timestamp',
    default: () => 'now()',
  })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp', nullable: true })
  endDate?: Date;

  @Column({ name: 'expected_return_date', type: 'timestamp', nullable: true })
  expectedReturnDate?: Date;

  @Column({
    type: 'decimal',
    name: 'total',
    precision: 13,
    scale: 2,
    nullable: true,
  })
  total?: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
  updatedAt: Date;

  @ManyToOne(() => Car, car => car.rentals, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(() => User, user => user.rentals, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
