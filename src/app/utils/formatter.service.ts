import { Injectable } from '@nestjs/common';


@Injectable()
export class FormatterService {
  nullifyEmpty(string: string = ''): string {
    return String(string)?.trim() || null;
  }

  boolean(info: any): 1 | 0 {
    return info ? 1 : 0;
  }
  integerOrZero(info: any): number {
    if (typeof info === 'number') {
      return info
    }
    return 0
  }
}
