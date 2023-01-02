import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { Preventivo } from "../../preventivo/entities/preventivo.entity";

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  file_name: string;

  @Column({ nullable: true })
  file_original_name: string;

  @Column({ nullable: true })
  file_content_type: string;

  @Column()
  file_id!: number;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @ManyToOne((type) => Preventivo, { onDelete: "CASCADE" })
  @JoinColumn({ name: "preventivo_id" })
  preventivo: Preventivo;

  @Column({ nullable: true })
  preventivo_id: number;
}
