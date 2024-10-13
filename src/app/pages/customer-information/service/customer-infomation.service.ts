import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerInformation } from '../model/customer-information';


@Injectable({
  providedIn: 'root'
})
export class CustomerInformationService {

  getDataValidation(): CustomerInformation[] {
    return [
      {
        id: '1001',
        customerFullName: 'John Doe',
        accountNo: 'ACC001',
        meterNo: 'MTR001',
        address: '123 Elm St',
        city: 'Springfield',
        lga: 'LGA1',
        state: 'State1',
        nearestLandmark: 'Near the park',
        date: new Date('2024-09-27'),
        latitude: '12.345678',
        longitude: '98.765432',
        customerId: 'CUST001',
        cin: 'CIN001',
        applicationDate: '2024-01-15',
        mobile: '1234567890',
        email: 'johndoe@example.com',
        statusCode: 'Active',
        accountType: 'Postpaid',
        currentTariffCode: 'R1',
        correctTariffCode: 'R1',
        tariffClass: 'LFN',
        feeder: 'Feeder1',
        feederId: 'FEED001',
        serviceCenter: 'Center1',
        distributionName: 'Distribution1',
        dssId: 'DSS001',
        ltPoleId: 'LT001',
        serviceWire: 'Wire1',
        upriser: 'Upriser1',
        region: 'Region1',
        businessHub: 'Hub1',
        accountCategory: 'Residential',
        connectionType: 'Metered',
        custNatureOfBusiness: 'Business',
        customerNIN: 'NIN001',
        customerSupplyType: '1-Phase',
        customerEstimatedLoad: '1000',
        custHasMeter: 'Yes',
        customerMeterCategory: 'Postpaid - Electronics',
        customerMeterManufacturer: 'Manufacturer1',
        customerMeterSaled: 'Yes',
        customerMeterAccessible: 'Yes',
        customerMeterLocation: 'Indoor',
        customerBillName: 'John Doe',
        customerHasAccountNo: 'Yes',
        customerGroup: 'New',
        isLandlord: 'No',
        landlordName: '',
        landlordPhone: '',
        tenantName: '',
        tenantPhone: '',
        meterCTRatio: '1:1',
        status: 'Pending',
        supplyType:'Single Phase'
      },
      {
        id: '1002',
        customerFullName: 'Jane Smith',
        accountNo: 'ACC002',
        meterNo: 'MTR002',
        address: '456 Oak St',
        city: 'Metropolis',
        lga: 'LGA2',
        state: 'State2',
        nearestLandmark: 'Near the library',
        date: new Date('2024-09-27'),
        latitude: '13.456789',
        longitude: '97.654321',
        customerId: 'CUST002',
        cin: 'CIN002',
        applicationDate: '2024-02-15',
        mobile: '2345678901',
        email: 'janesmith@example.com',
        statusCode: 'Suspended',
        accountType: 'Prepaid',
        currentTariffCode: 'R2',
        correctTariffCode: 'R2',
        tariffClass: 'NMD',
        feeder: 'Feeder2',
        feederId: 'FEED002',
        serviceCenter: 'Center2',
        distributionName: 'Distribution2',
        dssId: 'DSS002',
        ltPoleId: 'LT002',
        serviceWire: 'Wire2',
        upriser: 'Upriser2',
        region: 'Region2',
        businessHub: 'Hub2',
        accountCategory: 'Commercial',
        connectionType: 'Un-Metered',
        custNatureOfBusiness: 'Retail',
        customerNIN: 'NIN002',
        customerSupplyType: '3-Phase',
        customerEstimatedLoad: '2000',
        custHasMeter: 'No',
        customerMeterCategory: 'Prepaid - Pole-Mounted',
        customerMeterManufacturer: 'Manufacturer2',
        customerMeterSaled: 'No',
        customerMeterAccessible: 'No',
        customerMeterLocation: 'Outdoor',
        customerBillName: 'Jane Smith',
        customerHasAccountNo: 'No',
        customerGroup: 'Existing',
        isLandlord: 'Yes',
        landlordName: 'Robert Smith',
        landlordPhone: '321-654-0987',
        tenantName: 'Emily Smith',
        tenantPhone: '234-567-8902',
        meterCTRatio: '1:1',
        status: 'Approved',
        supplyType:'Three Phase'
      },
      {
        id: '1003',
        customerFullName: 'Alice Johnson',
        accountNo: 'ACC003',
        meterNo: 'MTR003',
        address: '789 Pine St',
        city: 'Gotham',
        lga: 'LGA3',
        state: 'State3',
        nearestLandmark: 'Near the school',
        date: new Date('2024-09-27'),
        latitude: '14.567890',
        longitude: '96.543210',
        customerId: 'CUST003',
        cin: 'CIN003',
        applicationDate: '2024-03-15',
        mobile: '3456789012',
        email: 'alicejohnson@example.com',
        statusCode: 'Closed',
        accountType: 'Postpaid',
        currentTariffCode: 'R3',
        correctTariffCode: 'R3',
        tariffClass: 'MD1',
        feeder: 'Feeder3',
        feederId: 'FEED003',
        serviceCenter: 'Center3',
        distributionName: 'Distribution3',
        dssId: 'DSS003',
        ltPoleId: 'LT003',
        serviceWire: 'Wire3',
        upriser: 'Upriser3',
        region: 'Region3',
        businessHub: 'Hub3',
        accountCategory: 'Residential',
        connectionType: 'Metered',
        custNatureOfBusiness: 'Service',
        customerNIN: 'NIN003',
        customerSupplyType: '1-Phase',
        customerEstimatedLoad: '1500',
        custHasMeter: 'Yes',
        customerMeterCategory: 'Postpaid - Digital',
        customerMeterManufacturer: 'Manufacturer3',
        customerMeterSaled: 'Yes',
        customerMeterAccessible: 'Yes',
        customerMeterLocation: 'Indoor',
        customerBillName: 'Alice Johnson',
        customerHasAccountNo: 'Yes',
        customerGroup: 'New',
        isLandlord: 'No',
        landlordName: '',
        landlordPhone: '',
        tenantName: '',
        tenantPhone: '',
        meterCTRatio: '1:1',
        status: 'Rejected',
        supplyType:'Single Phase'
      },
      {
        id: '1004',
        customerFullName: 'Bob Brown',
        accountNo: 'ACC004',
        meterNo: 'MTR004',
        address: '321 Birch St',
        city: 'Star City',
        lga: 'LGA4',
        state: 'State4',
        nearestLandmark: 'Near the mall',
        latitude: '15.678901',
        longitude: '95.432109',
        customerId: 'CUST004',
        cin: 'CIN004',
        applicationDate: '2024-04-15',
        mobile: '4567890123',
        email: 'bobbrown@example.com',
        statusCode: 'Inactive',
        accountType: 'Prepaid',
        currentTariffCode: 'C1',
        correctTariffCode: 'C1',
        tariffClass: 'MD2',
        feeder: 'Feeder4',
        feederId: 'FEED004',
        serviceCenter: 'Center4',
        distributionName: 'Distribution4',
        dssId: 'DSS004',
        ltPoleId: 'LT004',
        serviceWire: 'Wire4',
        upriser: 'Upriser4',
        region: 'Region4',
        businessHub: 'Hub4',
        accountCategory: 'Commercial',
        connectionType: 'Un-Metered',
        custNatureOfBusiness: 'Wholesale',
        customerNIN: 'NIN004',
        customerSupplyType: '3-Phase',
        customerEstimatedLoad: '2500',
        custHasMeter: 'No',
        customerMeterCategory: 'Prepaid - Wall-mounted',
        customerMeterManufacturer: 'Manufacturer4',
        customerMeterSaled: 'No',
        customerMeterAccessible: 'No',
        customerMeterLocation: 'Outdoor',
        customerBillName: 'Bob Brown',
        customerHasAccountNo: 'Yes',
        customerGroup: 'Existing',
        isLandlord: 'Yes',
        landlordName: 'Susan Brown',
        landlordPhone: '654-321-0987',
        tenantName: 'Mike Brown',
        tenantPhone: '567-890-1234',
        meterCTRatio: '1:1',
        date: new Date('2024-09-25'),
        status: 'Pending',
        supplyType:'Single Phase'
      },
      {
        id: '1005',
        customerFullName: 'Charlie Davis',
        accountNo: 'ACC005',
        meterNo: 'MTR005',
        address: '654 Cedar St',
        city: 'Central City',
        lga: 'LGA5',
        state: 'State5',
        nearestLandmark: 'Near the post office',
        latitude: '16.789012',
        longitude: '94.321098',
        customerId: 'CUST005',
        cin: 'CIN005',
        applicationDate: '2024-05-15',
        mobile: '5678901234',
        email: 'charliedavis@example.com',
        statusCode: 'Active',
        accountType: 'Postpaid',
        currentTariffCode: 'R4',
        correctTariffCode: 'R4',
        tariffClass: 'LFN',
        feeder: 'Feeder5',
        feederId: 'FEED005',
        serviceCenter: 'Center5',
        distributionName: 'Distribution5',
        dssId: 'DSS005',
        ltPoleId: 'LT005',
        serviceWire: 'Wire5',
        upriser: 'Upriser5',
        region: 'Region5',
        businessHub: 'Hub5',
        accountCategory: 'Residential',
        connectionType: 'Metered',
        custNatureOfBusiness: 'Home',
        customerNIN: 'NIN005',
        customerSupplyType: '1-Phase',
        customerEstimatedLoad: '1200',
        custHasMeter: 'Yes',
        customerMeterCategory: 'Postpaid - Mechanical',
        customerMeterManufacturer: 'Manufacturer5',
        customerMeterSaled: 'Yes',
        customerMeterAccessible: 'Yes',
        customerMeterLocation: 'Indoor',
        customerBillName: 'Charlie Davis',
        customerHasAccountNo: 'Yes',
        customerGroup: 'New',
        isLandlord: 'No',
        landlordName: '',
        landlordPhone: '',
        tenantName: '',
        tenantPhone: '',
        meterCTRatio: '1:1',
        date: new Date('2024-09-24'),
        status: 'Pending',
        supplyType:'Single Phase'
      },
    ];
  }

  getValidation(): Promise<CustomerInformation[]> {
    return Promise.resolve(this.getDataValidation());
  }
}
