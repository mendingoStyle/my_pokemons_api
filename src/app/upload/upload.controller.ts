import { Controller, Param, Post, Query, Req } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('fileUpload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }
  @Post()
  async post(
    @Req() request: any,
  ) {

    await this.uploadService.post(request);
    return { message: 'Leitura de arquivo feita com sucesso' }

  }
}
