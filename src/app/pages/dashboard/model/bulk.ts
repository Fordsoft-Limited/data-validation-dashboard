// interface Status {
//   label: string;
//   value: string;
// }

export interface BulkValidation {
    requestId: string;       
    submissionDate: string;  
    status: string;  
    recordsProcessed: number; 
    successRate: number | null; 
    errors: string | null;  
  }
  