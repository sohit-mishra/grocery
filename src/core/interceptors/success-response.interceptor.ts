import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { CommonResponseModel } from '@utils/utils.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessResponseInterceptor<T extends string | object>
  implements NestInterceptor<T, CommonResponseModel<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CommonResponseModel<T>> {
    const httpContext = context.switchToHttp();
    // const request = httpContext.getRequest();
    // const originalPath = request.originalUrl;

    // if (originalPath === '/contract-note/create') {
    //   return next.handle();
    // }

    return next.handle().pipe(
      map((response) => {
        const finalResponse: CommonResponseModel<T> = {
          status: httpContext.getResponse().statusCode,
          data: response,
        };

        if (typeof response === 'object') {
          if ('message' in response) {
            finalResponse.message = response['message'];
            delete response['message'];
          }
          if (!Object.keys(response).length) {
            delete finalResponse['data'];
          }
        }

        return finalResponse;
      }),
    );
  }
}
