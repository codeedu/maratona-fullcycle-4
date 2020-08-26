import { extname, join } from 'path';
import { Request } from 'express';

export const MEDIA_URL = '/media/';
export const MEDIA_DIR = join(process.cwd(), 'media');

export function storagePath(path: string): string{
    return join(MEDIA_DIR, path);
}

export function hashFilename(
  req: Request,
  file: { originalname: string },
  callback: (error: Error | null, filename: string) => void,
): void {
  const ext = extname(file.originalname);
  const hashName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${hashName}${ext}`);
}
