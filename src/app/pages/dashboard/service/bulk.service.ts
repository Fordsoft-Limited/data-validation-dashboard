import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BulkValidation } from '../model/bulk';

@Injectable({
	providedIn: 'root',
})
export class BulkService {

	//constructor(private http: HttpClient) { }

	getBulkData(): BulkValidation[] {
		return [
			
			
					{
					  "requestId": "12345",
					  "submissionDate": "2024-09-10",
					  "status": "Completed",
					  "recordsProcessed": 10000,
					  "successRate": 98,
					  "errors": "200 invalid meters"
					},
					{
					  "requestId": "67890",
					  "submissionDate": "2024-09-12",
					  "status": "InProgress",
					  "recordsProcessed": 5000,
					  "successRate": 90,
					  "errors": "100 incomplete data"
					},
					{
					  "requestId": "11223",
					  "submissionDate": "2024-09-14",
					  "status": "Pending",
					  "recordsProcessed": 2000,
					  "successRate": 0,
					  "errors": "API timeout"
					},
					{
					  "requestId": "33445",
					  "submissionDate": "2024-09-15",
					  "status": "Failed",
					  "recordsProcessed": 3000,
					  "successRate": 0,
					  "errors": "API timeout"
					}
				  
				  
			
		]
			
}
getBulk(): Promise<BulkValidation[]> {
    return Promise.resolve(this.getBulkData()); 
  }
}