export interface ApprovedRecord {
    customerName: string;       
    cin: string;                
    recordNumber: string;        
    accountNumber: string;       
    meterNumber: string;        
    dateCaptured: string | Date;          
    dateApproved: string| Date;    
    businessUnit: string;
    feeder: string;     
  }