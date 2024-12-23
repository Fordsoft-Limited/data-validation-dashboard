export interface Customer {
    id?:number;
    uid?: string;
    customerFullName: string;
    accountNo: string;
    meterNo: string;
    address: string;
    city: string;
    lga: string;
    state: string;
    nearestLandmark: string;
    date?: string | Date;
    dateApproved: string| Date;  
    latitude: string;
    longitude: string;
    customerId: string;
    cin: string;
    applicationDate:string | Date; 
    mobile: string;
    email: string;
    statusCode: string; 
    accountType: string; 
    currentTariffCode: string; 
    correctTariffCode: string;
    tariffClass: string; 
    feeder: string;
    feederId: string;
    serviceCenter: string;
    distributionName: string;
    dssId: string;
    ltPoleId: string;
    serviceWire: string;
    upriser: string;
    region: string;
    businessHub: string;
    accountCategory: string; 
    connectionType: string; 
    custNatureOfBusiness: string; 
    customerNIN: string;
    customerSupplyType: string;
    customerEstimatedLoad: string; 
    custHasMeter: string; 
    customerMeterCategory: string; // e.g., 'Postpaid - Electronics'
    customerMeterManufacturer: string;
    customerMeterSaled: string; 
    customerMeterAccessible: string; 
    customerMeterLocation: string; 
    customerBillName: string;
    customerHasAccountNo: string; 
    customerGroup: string; 
    isLandlord: string; 
    landlordName: string;
    landlordPhone: string;
    tenantName: string;
    tenantPhone: string;
    meterCTRatio: string; // e.g., '1:1'
    comments?: string;
    supplyType: string;
    status?:string;
  }

  // Define the structure for region, business hub, and service center
export interface ServiceCentre {
  name: string;
}

export interface BusinessHub {
  name: string;
  serviceCentres: ServiceCentre[];
}

export interface Region {
  name: string;
  businessHubs: BusinessHub[];
}
