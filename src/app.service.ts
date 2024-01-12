import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { ILike, LessThan, LessThanOrEqual, Not, Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  async createUser() {
    for (let i =0; i<100; i++) {
      await this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }
    return true;
  }

  async getUsers() {
    return await this.userRepository.find({
      where: {
        // id: Not(1),   // 아닌 경우
        // id: LessThan(30),   // 작은 경우
        // id: LessThanOrEqual(30),    // 작거나 같은 경우
        // id: MoreThan(30),    // 큰 경우
        // id: MoreOrEqual(30),   // 크거나 같은 경우
        // id: Equal(30),   // 같은 경우
        // id: Between(10, 15),   // 사이값
        // id: In([1, 3, 5, 7, 99]),    // 포함
        // id: isNull(),    // 널인 경우
        // email: Like('%google%'),   // 유사한 문장
        // email: ILike('%GOOGLE%'),    // 대소문자 구분 안하는 유사한 문장
      },
      
      // select: {   // 어떤 프로퍼티를 선택할지
      //   id:true,
      //   createdAt:true,
      //   updatedAt:true,
      //   version:true,
      //   additionalId:true,
      //   title:true,
      //   profile: {
      //     id: true,
      //   }
      // },  

      // where: [    // 조건 선택
      //   {  // 리스트로 조건을 선택하면 or 조건
      //     additionalId: 1,
      //   },
      //   {
      //   version: 1,    // 같은 객체 안에서 조건을 넣으면 and 조건
      //   additionalId: 2,
      //   },
      //   {
      //     profile: {
      //       id:1
      //     }
      //   }
      // ],
      
      relations: {    // 관계를 가져옴
        posts: true,    // 가져온 관계에 대해 where와 select에서 사용 가능
      },
      
      // order: {    // 오름차순, 내림차순
      //   id: 'ASC',
      //   version: 'DESC',
      // },

      // skip: 0,    // 처음 몇개를 제외할지

      // take: 10,   // 몇개를 가져올지(기본값은 행 전체 개수)
    });
  }

  async getUser(id) {
    const user = await this.userRepository.findOne({
      where: {
        additionalId: id,
      }
    });
  }

  async updateUser(id) {
    const user = await this.userRepository.findOne({
      where:{
        additionalId:id,
      }
    });

    return this.userRepository.save({
      ...user,
      title: user.title + '0',
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async postUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@naver.com',
      profile: {
        profileImg: 'qwer.jpg',
      }
    });

    // const profile = await this.profileRepository.save({
    //   profileImg: 'asdf.jpg',
    //   user,
    // });

    return user;
  }

  async postUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'post@naver.com',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });
    
    return user;
  }

  async postPostsAndTags() {
    const post1 = await this.postRepository.save({
      title: 'tag test 1',
    });
    const post2 = await this.postRepository.save({
      title: 'tag test 2',
    });

    const tag1 = await this.tagRepository.save({
      name: 'post test 1',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'post test 2',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'tag test 3',
      tags: [tag1, tag2],
    });

    return true;
  }

  getPosts() {
    return this.postRepository.find({
      relations:{
        tags: true,
      }
    });
  }
  
  getTags() {
    return this.tagRepository.find({
      relations:{
        posts: true,
      }
    });
  }

  async sampleTest() {
    // const user1 = await this.userRepository.create({  // 데이터베이스에는 저장 안됨
    //   email: 'test@google.com',
    // });

    // const user2 = await this.userRepository.save({   // 데이터 생성 후 저장
    //   email: 'test@google.com',
    // });

    // const user3 = await this.userRepository.preload({   // create와 비슷, 데이터베이스 데이터 불러와서 추가 입력 값으로 객체 생성, 저장은 안함
    //   id: 101,
    //   email: 'test@google.com',
    // });

    // await this.userRepository.delete({   // 데이터 삭제
    //   additionalId: 101,
    // });

    // await this.userRepository.increment({   // 조건에 해당하는 모든 row의 특정 프로퍼티 값 증가
    //   additionalId: 1,
    // }, 'count', 2);

    // await this.userRepository.decrement({   // 조건에 해당하는 특정 프로퍼티 값 감소
    //     additionalId: 1,
    // }, 'count', 1);

    // const count = await this.userRepository.count({   // 조건에 해당하는 row 개수 반환
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // const sum = await this.userRepository.sum('count', {    // 필터에 해당하는 값 모두 더하기
    //   email: ILike('%0%'),
    // });

    // const average = await this.userRepository.average('count', {    // 필터에 해당하는 값 평균
    //   id: LessThan(4),
    // })

    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });

    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // })

    // const users = await this.userRepository.find({
    // });

    // const userOne = await this.userRepository.findOne({    // 여러개면 첫 값만 가져옴
    //   where: {
    //     id: 3,
    //   }
    // });

    const usersAndCount = await this.userRepository.findAndCount({
      take: 3,
    });   // 지정 개수의 데이터와 총 데이터 개수 반환

    return true;
  }
}
