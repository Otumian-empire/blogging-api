import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AppConstant } from 'src/common/constants/app.constant';

@Injectable()
export class UserUtil {
  constructor(
    private jwtService: JwtService,
    private constants: AppConstant
  ) {}

  async hashPassword(plainText: string) {
    return await bcrypt.hash(plainText, this.constants.salt);
  }

  async comparePassword(plainText: string, passwordHash: string) {
    return await bcrypt.compare(plainText, passwordHash);
  }

  async generateJwt(user: { id: number }) {
    const payload = { id: user.id };
    return this.jwtService.sign(payload, { issuer: 'me', secret: 'secret' });
  }

  async verifyJwt(token: string) {
    const payload = await this.jwtService.verify(token, {
      issuer: 'me',
      secret: 'secret'
    });

    return payload;
  }
}
