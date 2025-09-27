import { Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class ModifyUserRequestPipe implements PipeTransform {
  transform(value: any) {
    console.log(value)
    const modified = value

    return modified;
  }
}
