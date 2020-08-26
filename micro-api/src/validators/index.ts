import { UnprocessableEntityException } from '@nestjs/common';
import { Request } from 'express';

export function imageValidator(
  req: Request,
  file: { originalname: string },
  callback: (error: Error | null, acceptFile: boolean) => void,
): void {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new UnprocessableEntityException('Only image files are allowed!'), false);
  }
  callback(null, true);
}
