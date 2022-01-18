import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Category } from './Category';

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

  @Column({ type: 'uuid', name: 'category_id', nullable: false })
  categoryId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
  updatedAt: Date;

  @ManyToOne(() => Category, category => category.cars)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
