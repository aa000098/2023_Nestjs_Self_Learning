import { BaseModel } from "src/entity/inheritance.entity";
import { UsersModel } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostsModel extends BaseModel{
    // 1) UsersModel과 Foreign Key를 이용해 연동
    // 2) null이 될 수 없음
    @ManyToOne(()=> UsersModel, (user)=> user.posts, {
        nullable: false,
    })
    author: UsersModel;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    likeCount: number;

    @Column()
    commentCount: number;
}