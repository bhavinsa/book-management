'use strict';

import { Column, Entity } from 'typeorm';
import { BaseModel } from '../framework/base.model';

@Entity()
export class BookModel extends BaseModel {
    @Column()
    public name: string;

    @Column()
    public author: string;

    @Column()
    public uniqueId: string;

    @Column()
    public publishDate: Date;

    @Column()
    public bookCover: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
}