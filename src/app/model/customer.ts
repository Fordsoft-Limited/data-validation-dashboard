export interface validateCustomer {
    customer_full_name: string;
    account_no: string;
    meter_no: string;
    address: string;
    city: string;
    lga: string;
    state: string;
    nearest_landmark: string;
    setup_date: any;  
    latitude: any;  
    longitude: any;
    customer_id: string;
    cin: string;
    application_date: any;  
    mobile: string;
    email: any;
    status_code: string;  
    account_type: string;  
    current_tariff_code: string;  
    correct_tariff_code: string;  
    tariff_class: string;  
    feeder: string;
    feeder_id: string;
    service_center: string;
    distribution_name: string;
    dss_id: string;
    lt_pole_id: string;
    service_wire: string;
    upriser: string;
    region: string;
    business_hub: string;
    account_category: string;  
    connection_type: string;  
    cust_nature_of_business: string;
    customer_nin: string;
    customer_supply_type: string;  
    customer_estimated_load: string;  
    cust_has_meter: string;  
    customer_meter_category: string;
    customer_meter_manufacturer: string;
    customer_meter_saled: string;  
    customer_meter_accessible: string;  
    customer_meter_location: string;  
    customer_bill_name: string;
    customer_has_account_no: string;  
    customer_group: string;  
    is_landlord: string;  
    landlord_name: string;
    approved_by: number;
    approval_comments: string;
    aproval_status: string;  
    date_approved: any;  
    landlord_phone: string;
    tenant_name: string;
    tenant_phone: string;
    meter_ct_ratio: string;
    date_created: any;  
  }
  

  export interface customerValidateBulk{
    file: File
    constraints: string;
  }

  export interface customerApproveOrReject{
    uuid: string
    approval_status: string
    approval_comments: string
  }