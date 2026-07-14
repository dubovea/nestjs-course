import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowerCase } from './common/pipes/to-lowercase.pipe';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowerCase)
  @Post()
  create(@Body('title') title: string) {
    return `Movie ${title}`;
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  getProfile() {
    return '123';
  }
}
