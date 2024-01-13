import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('userss')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  // auth 모듈에서 회원가입하도록 변경
  // @Post()
  // postUser(@Body('nickname') nickname: string,
  // @Body('email') email: string,
  // @Body('password') password: string) {
  //   return this.usersService.createUser({
  //     nickname, 
  //     email, 
  //     password
  //   });
  // }
}
