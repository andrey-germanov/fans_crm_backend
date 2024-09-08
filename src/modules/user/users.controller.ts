import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';

@Controller('api/v1')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('add-user')
  async addUser(@Body() userData: any) {
    const user = await this.usersService.create(userData);
    console.log('users.controller.ts addUser', user);
    return user;
  }

  @Post('login')
  async login(@Body() loginData: any) {
    const user = await this.usersService.findByEmail(loginData.email);
    if (user && (await bcrypt.compare(loginData.password, user.password))) {
      const payload = { username: user.name, sub: user.id };
      const token = this.jwtService.sign(payload);
      console.log(user);
      return { access_token: token, user };
    }
    return { message: 'Invalid credentials' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user/:id')
  async getUser(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }
}
