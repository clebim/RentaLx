import { hashSync } from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
} from 'typeorm';

import AppConfig from '../../../../../api/config/App';

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
  isAdmin?: boolean;

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

  @AfterLoad()
  setUrl(): void {
    if (this.avatarUrl) {
      const baseUrl = `http://${AppConfig.SERVER.http.hostname}:${AppConfig.SERVER.http.port}/api`;

      this.avatarUrl = `${baseUrl}/files/avatar/${this.avatarUrl}`;
    }
  }
}
