// src/users/users.service.ts
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: CreateUserDto) {

    if (!data.password.startsWith('$2')) {
      throw new Error('Password must be hashed before calling UsersService.createUser');
    }
    
    try { 
      return this.prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          password: data.password,
        },
      }); 
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('User with that email already exists');
      }
      throw error;
    }
  }

  async searchUsers(query: string) {
    
    if (!query || query.trim().length === 0) {
      return [];
    }

    return this.prisma.user.findMany({
      where: {
        username: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }
}
