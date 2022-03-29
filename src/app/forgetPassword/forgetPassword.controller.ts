import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { ForgetPasswordPayloadDto, ForgetResultDto } from "./dto/forgetPassword.dto";
import { ForgetPasswordService } from "./forgetPassword.service";

@Controller('forgetPassword')
export class ForgetPasswordController {
  constructor(private readonly forgetPasswordService: ForgetPasswordService) { }

  @Post()
  async sendRecoveryUrlToEmail(
    @Body() user: ForgetPasswordPayloadDto): Promise<any> {
    return await this.forgetPasswordService.sendEmail(user)
  }
}