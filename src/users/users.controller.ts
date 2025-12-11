// src/users/users.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('search')
  search(@Query('q') q: string) {
    if (!q || q.trim().length < 1) return [];
    return this.users.searchUsers(q ?? '');
  }
}
