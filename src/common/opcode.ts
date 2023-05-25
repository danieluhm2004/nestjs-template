import { HttpException, HttpStatus } from '@nestjs/common';

export function $(opcode: number, statusCode: number, message?: string) {
  return (details: { [key: string]: any } = {}) =>
    new HttpException({ opcode, message, ...details }, statusCode);
}

export const Opcode = {
  Success: $(0, HttpStatus.OK, '요청에 성공하였습니다.'),
  InvalidError: $(
    0,
    HttpStatus.INTERNAL_SERVER_ERROR,
    '알 수 없는 내부 오류가 발생하였습니다.',
  ),
  ValidateFailed: $(
    1,
    HttpStatus.BAD_REQUEST,
    '모든 정보를 올바르게 입력해주세요.',
  ),
  NotFound: $(
    2,
    HttpStatus.NOT_FOUND,
    '잘못된 요청입니다. 잠시 후 다시 시도하세요.',
  ),
};
