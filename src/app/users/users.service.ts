import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepo } from './users.repo';
import { AuthService } from '@core/services/auth.service';
import {
  CreateUserBody,
  CreateUserInput,
  CreateUserResponse,
} from './dto/admin-create.dto';
import { LoginUserBody, LoginUserResponse } from './dto/login-user.dto';
import { ROLE, User, VendorStatus } from './users.model';
import { generateUniqueCode } from '@utils/utils.dto';
import { StorageService } from '@core/services/storage.service';
import * as qrcode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { UploadResponse } from './dto/upload-image.dto';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    private readonly usersRepo: UsersRepo,
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
  ) {}

  async getQrCode(shortLink: string) {
    return qrcode.toDataURL(shortLink, {
      errorCorrectionLevel: 'H',
      scale: 15,
    });
  }

  async generateQrCodes(shortLink: string) {
    const qrCode = await this.getQrCode(shortLink);
    return qrCode;
  }

  async generateQrCode(user: User): Promise<UploadResponse> {
    this.logger.log(user);
    // const payload: QrCodePayload = {
    //   _id: user._id.toString(),
    //   role: user.role,
    // };

    // if (createCatererLink) {
    const dynamicLinkPath = `https://www.w3schools.com/html/`;

    // const { shortLink } = await this.firebaseDynamicLinkService.createfirebaseDynamicLinks(
    // 	dynamicLinkPath,
    // );
    // const qrCode = await this.generateQrCode(shortLink);
    // const settingData: UpdateVendorSettingDTO = {
    //   catererDeepLink: shortLink,
    //   qrCodeImage: {
    //     imageUrl: qrCode.url,
    //     imageId: qrCode.key,
    //     filePath: qrCode.filePath,
    //   },
    // };
    const qrCode = await this.generateQrCodes(dynamicLinkPath);
    const fileName = `${uuidv4()}.png`;
    const uploadRes = await this.storageService.uploadBase64(qrCode, fileName);
    return uploadRes;
  }

  async createUser(body: CreateUserBody): Promise<CreateUserResponse> {
    const { email, mobileNumber, password, role } = body;

    const existingUser = await this.usersRepo.getUserByEmailAndRole(
      email,
      role,
    );

    if (existingUser) {
      if (existingUser.email === email) {
        throw new BadRequestException('Email Already In Use');
      }
      if (existingUser.mobileNumber === mobileNumber) {
        throw new BadRequestException('Mobile Number Already In Use');
      }
    }

    const ownerCode = role === ROLE.OWNER ? generateUniqueCode() : undefined;
    if (role === ROLE.OWNER) {
      body.vendorStatus = VendorStatus.PENDING_FOR_APPROVAL;
    }

    const hashedPassword = await this.authService.hashPassword(password);

    const userInput: CreateUserInput = {
      ...body,
      password: hashedPassword,
      ownerCode,
    };

    const user = await this.usersRepo.createUser(userInput);

    if ([ROLE.OWNER, ROLE.EMPLOYEE].includes(role)) {
      const { fileId, fileUrl, filePath } = await this.generateQrCode(user);
      await this.usersRepo.updateUser(user._id.toString(), {
        qrCodeImage: { imageUrl: fileUrl, imageId: fileId, filePath },
      });
    }

    return {
      message: 'User created successfully',
      id: user._id,
      ownerId: user.ownerId,
    };
  }

  async loginUser(body: LoginUserBody): Promise<any> {
    const { email, password } = body;

    const user = await this.usersRepo.getUserByEmailAndRole(email);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const isVendor = user.role === ROLE.OWNER;

    if (isVendor) {
      if (!user.isEmailVerified) {
        throw new BadRequestException(`User Email not verified`);
      }
      if (user.vendorStatus !== VendorStatus.APPROVED) {
        throw new BadRequestException(`Vendor Account not Approved`);
      }
    }

    const { password: hash } = user;

    const isValid = this.authService.compareHash(password, hash);
    if (!isValid) {
      throw new BadRequestException('Invalid credentials');
    }

    if (user.role === ROLE.EMPLOYEE && !user.ownerId) {
      return {
        id: String(user._id),
        role: user.role,
      };
    }

    const tokenData = {
      id: String(user._id),
      role: user.role,
    };

    const token = this.authService.generateAccessToken(tokenData);
    const response: LoginUserResponse = {
      id: String(user._id),
      message: `You're successfully logged in!`,
      role: user.role,
      accessToken: token,
      isEmailVerified: user.isEmailVerified,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
    };
    return response;
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadResponse> {
    if (!file) {
      throw new BadRequestException(`File is required`);
    }
    const { filePath, fileUrl, fileId } = await this.storageService.uploadFile(
      file,
    );
    return { filePath, fileUrl, fileId };
  }
}
