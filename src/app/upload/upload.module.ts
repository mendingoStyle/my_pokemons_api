import { Module } from '@nestjs/common';
import { UtilsModule } from '../utils/utils.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';


@Module({
  imports: [UtilsModule],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
