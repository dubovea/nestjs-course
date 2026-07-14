import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { PrismaService } from '../prisma/prisma.service';
import type { Actor } from '../../generated/prisma/client';

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateActorDto): Promise<Actor> {
    return await this.prismaService.actor.create({
      data: {
        name: dto.name,
      },
    });
  }
}
