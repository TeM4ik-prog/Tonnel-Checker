import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FiltersController],
  providers: [FiltersService],
  exports: [FiltersService]
})
export class FiltersModule {}
