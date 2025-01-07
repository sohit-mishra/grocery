export class CreateDeliveryTaxDto {
    location: {
      latitude: number;
      longitude: number;
    };
  
    startDeliveryFrom: number;
    currencySymbol: string;
    currencyCode: string;
    fixedDeliveryCharges: number;
    maxWalletAmountUsed: number;
  
    deliveryTimeSlots: {
      timings: {
        _id: string;
        openTime: number;
        closeTime: number;
        deliveryCount: number | null;
        isOpen: boolean;
        slot: string;
      }[];
      _id: string;
      dayCode: number;
      isOpen: boolean;
    }[];
  
    deliveryChargePerKm: number;
    deliveryCoverage: number;
    deliveryType: string;
    minOrderAmountForFree: number;
    paymentMethod: string[];
    taxAmount: number;
    taxName: string;
    taxType: string;
    minimumOrderAmountToPlaceOrder: number;
    shippingMethod: string[];
  }
  