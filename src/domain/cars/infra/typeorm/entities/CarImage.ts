import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import AppConfig from '../../../../../api/config/App';
import { Car } from './Car';

@Entity('car_images')
export class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'car_id' })
  carId: string;

  @Column({ type: 'varchar', name: 'image_name' })
  imageName: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
  updatedAt: Date;

  @ManyToOne(() => Car, car => car.images, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  imageUrl?: string;

  @AfterLoad()
  setUrl(): void {
    if (this.imageName) {
      const baseUrl = `http://${AppConfig.SERVER.http.hostname}:${AppConfig.SERVER.http.port}/api`;

      this.imageUrl = `${baseUrl}/files/images/${this.imageName}`;
    }
  }
}
