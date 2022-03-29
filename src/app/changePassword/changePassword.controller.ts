import { Body, Controller, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { ChangePasswordDTO } from "./dto/forgetPassword.dto";
import { ChangePasswordService } from "./changePassword.service";
import { JwtAuthGuard } from "app/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('ChangePassword')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) { }
  @Post()
  async changePassword(
    @Body(new ValidationPipe()) user: ChangePasswordDTO): Promise<any> {
    return await this.changePasswordService.changePassword(user)
  }

}