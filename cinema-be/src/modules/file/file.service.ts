import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponseDto } from 'src/typing/dto';

@Injectable()
export class FileService {
  async save(
    files: Express.Multer.File[],
    folder: string = 'default',
  ): Promise<FileResponseDto[]> {
    const uploadFolder = `${path}/uploads/${folder}`;
    await ensureDir(uploadFolder);

    const response: FileResponseDto[] = await Promise.all(
      files.map(async (file) => {
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

        return {
          url: `uploads/${folder}/${file.originalname}`,
          name: file.originalname,
        };
      }),
    );
    return response;
  }
}
