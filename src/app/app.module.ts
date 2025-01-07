import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@core/core.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BannersModule } from './banners/banners.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ProductOutOfStockModule } from './product-out-of-stock/product-out-of-stock.module';
import { CouponsModule } from './coupons/coupons.module';
import { DealsModule } from './deals/deals.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DeliveryBoyModule } from './delivery-boy/delivery-boy.module';
import { BusinessModule } from './business/business.module';
import { PagesModule } from './pages/pages.module';
import { LanguagesModule } from './languages/languages.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { OrdersModule } from './orders/orders.module';
import { ChatsModule } from './chats/chats.module';
import { CurrencyModule } from './currency/currency.module';
import { DeliveryTaxModule } from './delivery-tax/delivery-tax.module';
import { DeliverytimeslotsModule } from './deliverytimeslots/deliverytimeslots.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    BannersModule,
    BusinessModule,
    CategoriesModule,
    ChatsModule,
    CouponsModule,
    CurrencyModule,
    DealsModule,
    DeliveryBoyModule,
    DeliveryTaxModule,
    DeliverytimeslotsModule,
    LanguagesModule,
    NotificationsModule,
    OrdersModule,
    PagesModule,
    ProductOutOfStockModule,
    ProductsModule,
    SubCategoryModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
