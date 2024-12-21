import { Injectable, Logger } from '@nestjs/common';
import ImageKit = require('imagekit');

interface ImageKitInstance {
  upload(params: {
    file: string;
    fileName: string;
  }): Promise<{ url: string; fileId: string; filePath: string }>;
}

export class UploadFileRes {
  fileUrl: string;
  filePath: string;
  fileId: string;
}

@Injectable()
export class StorageService {
  private logger = new Logger(StorageService.name);
  private imagekit: ImageKitInstance;
  constructor() {
    this.imagekit = new ImageKit({
      publicKey:
        process.env.IMAGEKIT_PUBLIC_KEY ||
        'public_tZJzccrNrNscTrpsdjIaO7AG1qM=',
      privateKey:
        process.env.IMAGEKIT_PRIVATE_KEY ||
        'private_aGFgMrFWFx4bqGkaNn6V6qy5t9g=',
      urlEndpoint:
        process.env.IMAGEKIT_URL || 'https://ik.imagekit.io/euwrfh4dvs7',
    });
  }

  async uploadFile(file: {
    buffer: Buffer;
    originalname: string;
    isOriginal?: boolean;
  }): Promise<UploadFileRes> {
    try {
      const buff = Buffer.from(file.buffer);
      const base64Data = buff.toString('base64');
      let fileName = Date.now() + file.originalname;
      if (file.isOriginal) {
        fileName = file.originalname;
      }
      const imageUrl = await this.imagekit.upload({
        file: base64Data,
        fileName: fileName,
      });
      const resData = {
        fileUrl: imageUrl.url,
        fileId: imageUrl.fileId,
        filePath: imageUrl.filePath,
      };
      return resData;
    } catch (e) {
      throw new Error('Failed to upload file'); // Rethrow the error or handle it as needed
    }
  }

  public async uploadBase64(
    base64Data: string,
    fileName: string,
  ): Promise<UploadFileRes> {
    const imageRes = await this.imagekit.upload({
      file: base64Data,
      fileName: fileName,
    });
    return {
      fileUrl: imageRes.url,
      fileId: imageRes.fileId,
      filePath: imageRes.filePath,
    };
  }
}
