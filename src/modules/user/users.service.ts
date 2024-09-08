import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(userData: any): Promise<User> {
    return this.userModel.create(userData);
  }

  async findOne(id: number): Promise<User> {
    const user = this.userModel.findOne({ where: { id } });
    console.log('users.service.ts findOne', user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    console.log('users.service.ts findByEmail', email);
    return this.userModel.findOne({ where: { email } });
  }
}
