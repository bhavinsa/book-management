'use strict';

import {CreateDateColumn, UpdateDateColumn, VersionColumn, Entity, ObjectIdColumn } from 'typeorm';

/**
 * @author bhavin
 */
@Entity()
export class BaseModel {
	
	/* Relational Database */
	// @PrimaryGeneratedColumn()
	// public _id: string;

	/* NoSql Database */
 	@ObjectIdColumn()            
	public _id: string;

	@CreateDateColumn()
	public createdAt?: Date;

	@UpdateDateColumn({nullable: true})
	public updatedAt?: Date;

	@VersionColumn()
	public __v?: number;
}
