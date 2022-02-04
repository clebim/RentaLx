import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Rental } from '../../../../rentals/infra/typeorm/entities/Rental';
import { CarImage } from './CarImage';
import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'numeric', name: 'daily_rate' })
  dailyRate: number;

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @Column({ type: 'varchar', name: 'license_plate' })
  licensePlate: string;

  @Column({ type: 'decimal', name: 'fine_amount', precision: 13, scale: 2 })
  fineAmount: number;

  @Column({ type: 'varchar' })
  brand: string;

  @Column({ type: 'uuid', name: 'category_id', nullable: true })
  categoryId?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
  updatedAt: Date;

  @ManyToOne(() => Category, category => category.cars, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Specification, specification => specification.cars)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[];

  @OneToMany(() => CarImage, carImage => carImage.car)
  images?: CarImage[];

  @OneToMany(() => Rental, rental => rental.car)
  rentals?: Rental[];
}
