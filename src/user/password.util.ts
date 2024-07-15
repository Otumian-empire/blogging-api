import * as bcrypt from 'bcrypt';

export default class PasswordUtil {
  private salt = 10;

  async hash(plainText: string) {
    return bcrypt.hash(plainText, this.salt);
  }

  async verify(plainText: string, hash: string) {
    return bcrypt.compare(plainText, hash);
  }
}
