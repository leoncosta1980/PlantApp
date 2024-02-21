//entities/Item.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Item {

@PrimaryGeneratedColumn('increment')
id: number;

@Column('text')
name: string;

@Column('float')
price: number;

@Column('int')
quantity: number;
}
