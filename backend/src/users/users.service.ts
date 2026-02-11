import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserFromGoogleDto } from './dto/goole-user-.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //this method will be called from the google strategy and will get the user from the database if not present will create a new one
  async findOrCreate(data: CreateUserFromGoogleDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) return user;

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        picture: data.picture,
      },
    });
  }

  async getUserInfo(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }
}
