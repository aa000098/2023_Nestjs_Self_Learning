import { UsersModel } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostsModel{
    @PrimaryGeneratedColumn()
    id: number;

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