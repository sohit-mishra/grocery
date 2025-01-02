import { Controller, Get,Put} from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('settings/admin/')
export class CurrencyController {
    constructor(private readonly currencyService :CurrencyService){}

    @Get('update/currency/list')
    findAll(){

    }

    @Get('currency')
    findOne(){

    }


    @Put('update/currency')
    creatOne(){

    }
}
