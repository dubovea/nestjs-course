import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from 'src/actor/entities/actor.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: { actors: true },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async create(dto: MovieDto): Promise<MovieEntity> {
    const { title, releaseYear, actorIds } = dto;

    if (!actorIds || actorIds.length === 0) {
      throw new NotFoundException(`Не передан список актёров`);
    }

    const actors = await this.actorRepository.find({
      where: {
        id: In(actorIds),
      },
    });

    if (!actors || actorIds.length === 0) {
      throw new NotFoundException(`Один или несколько актеров не найдены`);
    }

    const newMovie = this.movieRepository.create({
      title,
      releaseYear,
      actors,
    });

    return await this.movieRepository.save(newMovie);
  }

  async update(id: string, dto: Partial<MovieDto>): Promise<MovieDto> {
    const movie = await this.findOne(id);
    Object.assign(movie, dto);
    const updated = await this.movieRepository.save(movie);
    return updated;
  }

  async remove(id: string) {
    const movie = await this.findOne(id);
    return await this.movieRepository.remove(movie);
  }
}
