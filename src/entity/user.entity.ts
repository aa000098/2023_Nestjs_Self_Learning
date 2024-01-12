import { Column, CreateDateColumn, Entity, Generated, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ProfileModel } from "./profile.entity";
import { PostModel } from "./post.entity";

export enum Role{
    USER = 'user',
    ADMIN = 'admin',
}

@Entity()
export class UserModel{
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        nullable: true,
    })
    email: string;
    
    @Column({
        // 데이터베이스에서 인지하는 칼럼 타입이 자동으로 유추됨
        type: 'varchar',
        
        // 프로퍼티 이름으로 자동 유추됨
        name: 'title',
        
        // 입력할 수 있는 글자 길이
        length: 300,
        
        // null 가능 여부
        nullable: true,
        
        // false면 처음 지정할 때 값 지정하고 이후 변경 불가
        update: true,
        
        // find를 실행할 때 기본으로 값을 불러올지
        select: true,
        
        // 아무것도 입력 안했을 때 기본으로 입력되는 값
        default: 'default value',
        
        // 칼럼 중에서 유일무이한 값이 되어야 하는지
        unique: false,
    })
    title: string;
    

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @VersionColumn()
    version: number;

    @Column()
    @Generated('increment')
    additionalId: number;
    
    @OneToOne(()=> ProfileModel, (profile)=> profile.user, {
        eager: false,    // find 실행할 때 항상 같이 가져올 relation
        cascade: true, // relation을 한 번에 같이 저장
        nullable: true, // null이 가능한지, 기본이 true
        onDelete: 'CASCADE', // relation이 삭제됐을 때 참조 관계
        // NO ACTION : 아무것도 안함
        // CASCADE : 참조하는 Row도 같이 삭제 (프로필을 지우면 사용자까지 삭제)
        // SET NULL: 참조하는 Row에서 참조 id를 null로 변경
        // SET DEFAULT : 기본 세팅으로 설정
        // RESTRICT : 참조하고 있는 Row가 있는 경우 참조당하는 Row 삭제 불가
    })
    profile: ProfileModel;

    @OneToMany(()=> PostModel, (post)=> post.author)
    posts: PostModel[];

    @Column({
        default: 0,
    })
    count: number;
}
