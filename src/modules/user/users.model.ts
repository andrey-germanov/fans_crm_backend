import { Column, Model, Table, BeforeSave } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  password: string;

  @BeforeSave
  static async hashPassword(user: User) {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
}
