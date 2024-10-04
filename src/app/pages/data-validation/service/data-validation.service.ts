import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataValidation } from '../model/bulk-validation';
@Injectable({
	providedIn: 'root',
})
export class DataValidationService {

    getDataValidation() :  DataValidation[]{
        return [
            {
                id: "1001",
                feeder: "Feeder A",
                district: "District 1",
                date: new Date("2024-09-28"),
                status: "Pending"
              },
              {
                id: "1002",
                feeder: "Feeder B",
                district: "District 2",
                date: new Date("2024-09-27"),
                status: "Approved"
              },
              {
                id: "1003",
                feeder: "Feeder C",
                district: "District 3",
                date: new Date("2024-09-26"),
                status: "Rejected"
              },
              {
                id: "1004",
                feeder: "Feeder D",
                district: "District 4",
                date: new Date("2024-09-25"),
                status: "Pending"
              },
              {
                id: "1005",
                feeder: "Feeder E",
                district: "District 1",
                date: new Date("2024-09-24"),
                status: "Pending"
              }
          ]
          
    }

    getValidation() :Promise<DataValidation[]> {
        return Promise.resolve(this.getDataValidation()); 
      
    }
   
}


