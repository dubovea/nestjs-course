import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateReviewDto) {
    const movie = await this.prismaService.movie.findUnique({
      where: { id: dto.movieId },
      select: { id: true },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${dto.movieId} not found`);
    }

    return this.prismaService.review.create({
      data: {
        text: dto.text,
        rating: dto.rating,
        movie: {
          connect: { id: dto.movieId },
        },
      },
    });
  }
}
