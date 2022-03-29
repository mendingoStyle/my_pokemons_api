import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { UserChangePasswordDTO } from "./dto/forgetPassword.dto";
import { RecoveryPasswordService } from "./recoveryPassword.service";

@Controller('RecoveryPassword')
export class RecoveryPasswordController {
  constructor(private readonly recoveryPasswordService: RecoveryPasswordService) { }
  @Post()
  async sendRecoveryUrlToEmail(
    @Body(new ValidationPipe()) user: UserChangePasswordDTO): Promise<any> {
    return await this.recoveryPasswordService.changePassword(user)

  }

}