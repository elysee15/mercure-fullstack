import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/decorateur/public.decorator';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @Public()
  async create(@Body() createProductDto: any) {
    return await this.service.create(createProductDto);
  }

  @Post('login')
  @Public()
  async login(@Body() loginDto: any) {
    return await this.service.login(loginDto);
  }
}
