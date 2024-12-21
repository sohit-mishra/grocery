import { Role } from '../users.model';

export class UploadResponse {
  filePath: string;
  fileUrl: string;
  fileId: string;
}

export interface QrCodePayload {
  _id: string;
  role: Role;
}
