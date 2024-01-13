import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from '@nestjs/common';

@Injectable()
export class PasswordPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if(value.toString().length<6) {
            throw new BadRequestException('비밀번호는 6자 이상으로 입력해주세요.')
        }
        return value.toString();
    }
}

@Injectable()
export class MaxLengthPipe implements PipeTransform{
    constructor(private readonly length: number) {}

    transform(value: any, metadata: ArgumentMetadata) {
        if (value.toString().length > this.length) {
            throw new BadRequestException(`최대 길이는 ${this.length}입니다.`);
        }
        return value.toString();
    }
}

@Injectable()
export class MinLengthPipe implements PipeTransform{
    constructor(private readonly length: number) {}
    
    transform(value: any, metadata: ArgumentMetadata) {
        if(value.toString().lengt < this.length) {
            throw new BadRequestException(`최소 길이는 ${this.length}입니다.`);
        }
        return value.toString();
    }
}