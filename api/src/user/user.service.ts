import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: any): Promise<User> {
    const isUserExist = await this.userModel.findOne({
      name: createUserDto?.name,
    });
    if (isUserExist) {
      throw new NotFoundException(
        "Ce nom d'utilisateur existe deja dans la base de donné",
      );
    }
    const { password } = createUserDto;
    const passHah = this.jwtService.sign({ password: password });
    createUserDto.password = passHah;
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async login(loginDto: any) {
    const { name, password } = loginDto;
    const user = await this.userModel.findOne({ name });
    if (!user) {
      throw new NotFoundException("Cet utilisateur n'existe pas");
    }
    const passHah = user.password;
    const realPassword = <{ password: string }>(
      this.jwtService.decode(String(passHah))
    );
    if (!(realPassword.password === password)) {
      throw new BadRequestException('Mot de passe incorrect');
    }

    return {
      user,
      jwt: this.jwtService.sign({ user: user }),
    };
  }
}
