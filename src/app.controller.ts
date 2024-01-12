import { Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Get('user/:id')
  getUser(
    @Param('id', ParseIntPipe) id: number) {
    return this.appService.getUser(id);
  }

  @Post()
  postUser() {
    return this.appService.createUser();
  }

  @Patch('users/:id')
  patchUser(
    @Param('id') id: string,
  ) {
    return this.appService.updateUser(+id);
  }

  @Post('user/profile')
  createUserAndProfile(){
    return this.appService.postUserAndProfile();
  }

  @Post('user/post')
  createUserAndPost() {
    return this.appService.postUserAndPosts();
  }

  @Post('posts/tags')
  createPostsTags() {
    return this.appService.postPostsAndTags();
  }

  @Get('post')
  getPosts() {
    return this.appService.getPosts();
  }

  @Get('Tags')
  getTags() {
    return this.appService.getTags();
  }

  @Post('sample')
  sample() {
    return this.appService.sampleTest()
  }
}
