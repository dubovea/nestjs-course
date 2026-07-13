// review.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity]), MovieModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
