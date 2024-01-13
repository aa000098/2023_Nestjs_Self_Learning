import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RolesEnum } from "../const/roles.const";
import { PostsModel } from "src/posts/entities/posts.entity";
import { BaseModel } from "src/entity/inheritance.entity";

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
 * 
 * createdAt
 * 
 * updatedAt
 */

@Entity()
export class UsersModel extends BaseModel{
 
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