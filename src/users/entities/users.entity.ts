import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesEnum } from "../const/roles.const";
import { PostsModel } from "src/posts/entities/posts.entity";

/**
 * id: number
 * 
 * nickname: string
 * 
 * email: string
 * 
 * password: string
 * 
 * role: [RolesEnum.USER, RolesEnum.ADMIN]
 */

@Entity()
export class UsersModel{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
        unique: true,
    })
    // 최대 길이 20
    // 유일무이한 값
    nickname: string;

    @Column({
        unique: true,
    })
    // 유일무이한 값
    email: string;

    @Column()
    password: string;

    @Column({
        enum: Object.values(RolesEnum),
        default: RolesEnum.USER,
    })
    role: RolesEnum;

    @OneToMany(()=>PostsModel, (post)=>post.author)
    posts: PostsModel[];
}