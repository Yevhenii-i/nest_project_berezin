// src/auth/auth.service.ts
import { Injectable,BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwt.sign(payload),
    };
  }

  async signup(email: string, password: string, username: string) {
    const hashed = await bcrypt.hash(password, 10);
    
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const user = await this.usersService.createUser({
      email,
      password: hashed,
      username,
    });

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
