import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieEntity } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorModule } from 'src/actor/actor.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
