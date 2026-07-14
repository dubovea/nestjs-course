import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.movie.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const movie = await this.prismaService.movie.findUnique({
      where: { id, isAvailable: true },
      include: {
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
        poster: true,
      },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async create(dto: MovieDto) {
    const { title, releaseYear, actorIds, posterUrl, isAvailable } = dto;

    if (actorIds.length === 0) {
      throw new BadRequestException('At least one actor must be provided');
    }

    await this.assertActorsExist(actorIds);

    return this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        isAvailable,
        actors: {
          connect: [...new Set(actorIds)].map((id) => ({ id })),
        },
        ...(posterUrl !== undefined && {
          poster: {
            create: { url: posterUrl },
          },
        }),
      },
      include: {
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
        poster: true,
      },
    });
  }

  async update(id: string, dto: Partial<MovieDto>) {
    await this.findOne(id);

    if (dto.actorIds) {
      await this.assertActorsExist(dto.actorIds);
    }

    return this.prismaService.movie.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.releaseYear !== undefined && { releaseYear: dto.releaseYear }),
        ...(dto.actorIds !== undefined && {
          actors: {
            set: [...new Set(dto.actorIds)].map((actorId) => ({ id: actorId })),
          },
        }),
        ...(dto.posterUrl !== undefined && {
          poster: {
            update: { data: { url: dto.posterUrl } },
          },
        }),
      },
      include: {
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
        poster: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prismaService.movie.delete({
      where: { id },
    });
  }

  private async assertActorsExist(actorIds: string[]) {
    const uniqueActorIds = [...new Set(actorIds)];
    const actorCount = await this.prismaService.actor.count({
      where: { id: { in: uniqueActorIds } },
    });

    if (actorCount !== uniqueActorIds.length) {
      throw new NotFoundException('One or more actors were not found');
    }
  }
}
