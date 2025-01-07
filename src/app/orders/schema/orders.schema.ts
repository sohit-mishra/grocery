import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Location {
    @Prop({ required: true })
    latitude: number;

    @Prop({ required: true })
    longitude: number;
}

class StoreAddress {
    @Prop({ required: true })
    address: string;

    @Prop({ type: Location, required: true })
    location: Location;
}

class TransactionDetails {
    @Prop({ type: String, default: null })
    transactionStatus: string;

    @Prop({ type: String, default: null })
    receiptUrl: string;

    @Prop({ type: String, default: null })
    transactionId: string;

    @Prop({ type: String, default: null })
    currency: string;

    @Prop({ type: Number, default: 0 })
    paymentCount: number;

    @Prop({ type: String, default: null })
    paymentMethod: string;

    @Prop({ type: Date })
    transactionDate: Date;

    @Prop({ type: Number })
    transactionAmount: number;
}

class Product {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    imageUrl: string;
}

class ProductImage {
    @Prop({ required: true })
    imageUrl: string;

    @Prop({ required: true })
    imageId: string;

    @Prop({ required: true })
    filePath: string;
}

class CartItem {
    @Prop({ type: [ProductImage], default: [] })
    productImages: ProductImage[];

    @Prop({ required: true })
    productId: string;

    @Prop({ required: true })
    productName: string;

    @Prop({ required: true })
    unit: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    productTotal: number;

    @Prop({ required: true })
    imageUrl: string;

    @Prop({ required: true })
    filePath: string;

    @Prop({ required: true })
    offerPercent: number;

    @Prop({ required: true })
    offerPrice: number;

    @Prop({ required: true })
    isOfferAvailable: boolean;
}

class TaxInfo {
    @Prop({ required: true })
    taxName: string;

    @Prop({ required: true })
    amount: number;
}

class User {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    mobileNumber: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    countryCode: string;
}

@Schema({ timestamps: true })
export class Orders extends Document {
    @Prop({ type: TransactionDetails })
    transactionDetails: TransactionDetails;

    @Prop({ type: Product })
    product: Product;

    @Prop({ default: false })
    isOrderAssigned: boolean;

    @Prop({ default: false })
    isAcceptedByDeliveryBoy: boolean;

    @Prop({ default: false })
    isDeliveryBoyRated: boolean;

    @Prop({ default: false })
    isWalletUsed: boolean;

    @Prop({ type: [CartItem], default: [] })
    cart: CartItem[];

    @Prop({ default: 0 })
    subTotal: number;

    @Prop({ default: 0 })
    tax: number;

    @Prop({ type: TaxInfo })
    taxInfo: TaxInfo;

    @Prop({ default: 0 })
    grandTotal: number;

    @Prop({ default: '' })
    deliveryAddress: string;

    @Prop({ default: '' })
    deliveryInstruction: string;

    @Prop({ default: '' })
    paymentType: string;

    @Prop({ default: 'PENDING' })
    orderStatus: string;

    @Prop({ default: 'PENDING' })
    paymentStatus: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ type: StoreAddress })
    storeAddress: StoreAddress;

    @Prop({ type: User })
    user: User;
}

export const OrderSchema = SchemaFactory.createForClass(Orders);
