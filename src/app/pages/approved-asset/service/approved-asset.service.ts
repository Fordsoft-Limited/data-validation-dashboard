import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApprovedRecord } from '../model/approved';


@Injectable({
  providedIn: 'root'
})
export class ApprovedAssetService {

  getApprovedRecords():ApprovedRecord[] {
    return[
      {
        customerName: "John Doe",
        cin: "CIN123456",
        recordNumber: "REC001",
        accountNumber: "ACC123456",
        meterNumber: "MTR123456",
        dateCaptured: "2023-09-01",
        dateApproved: "2023-09-10",
        businessUnit: "Business Unit 1",
        feeder: "Feeder 1"
      },
      {
        customerName: "Jane Smith",
        cin: "CIN654321",
        recordNumber: "REC002",
        accountNumber: "ACC654321",
        meterNumber: "MTR654321",
        dateCaptured: "2023-08-15",
        dateApproved: "2023-08-20",
        businessUnit: "Business Unit 2",
        feeder: "Feeder 2"
      },
      {
        customerName: "Robert Brown",
        cin: "CIN789012",
        recordNumber: "REC003",
        accountNumber: "ACC789012",
        meterNumber: "MTR789012",
        dateCaptured: "2023-07-25",
        dateApproved: "2023-07-30",
        businessUnit: "Business Unit 1",
        feeder: "Feeder 3"
      },
      {
        customerName: "Emily Johnson",
        cin: "CIN345678",
        recordNumber: "REC004",
        accountNumber: "ACC345678",
        meterNumber: "MTR345678",
        dateCaptured: "2023-06-05",
        dateApproved: "2023-06-15",
        businessUnit: "Business Unit 3",
        feeder: "Feeder 4"
      },
      {
        customerName: "Michael Lee",
        cin: "CIN567890",
        recordNumber: "REC005",
        accountNumber: "ACC567890",
        meterNumber: "MTR567890",
        dateCaptured: "2023-05-10",
        dateApproved: "2023-05-20",
        businessUnit: "Business Unit 2",
        feeder: "Feeder 5"
      }
    ]

  }

  getRecord() : Promise<ApprovedRecord[]>{
    return Promise.resolve(this.getApprovedRecords());
  }

  constructor() { }
}
