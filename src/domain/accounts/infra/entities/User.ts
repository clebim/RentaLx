import { hashSync } from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', name: 'driver_license' })
  driverLicense: string;

  @Column({ type: 'boolean', name: 'is_admin', default: false })
  isAdmin?: string;

  @Column({ type: 'varchar', name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  generatePasswordHash(): void {
    if (this.password) {
      this.password = hashSync(this.password, 8);
    }
  }
}
