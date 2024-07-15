import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  username: string;

  @Column({ length: 45, unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toSafe() {
    return {
      ...this,
      password: undefined
    };
  }
}
