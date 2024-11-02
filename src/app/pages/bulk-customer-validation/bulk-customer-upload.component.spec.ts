// file-upload.component.spec.ts
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import * as XLSX from 'xlsx';
import { BulkCustomerValidationComponent } from './bulk-customer-validation.component';
import { CustomerService } from '../../api/customer.service';

describe('BulkCustomerValidationComponent', () => {
  let component: BulkCustomerValidationComponent;
  let fixture: ComponentFixture<BulkCustomerValidationComponent>;
  let customerService: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulkCustomerValidationComponent],
      imports: [HttpClientTestingModule],
      providers: [CustomerService],
    }).compileComponents();

    fixture = TestBed.createComponent(BulkCustomerValidationComponent);
    component = fixture.componentInstance;
    customerService = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Mock FileReader event structure
  const createMockFileReaderEvent = (result: ArrayBuffer): ProgressEvent<FileReader> => {
    return {
      target: {
        result: result
      }
    } as ProgressEvent<FileReader>;
  };

  it('should upload file and save customers successfully', fakeAsync(() => {
    spyOn(customerService, 'saveBulkCustomers').and.returnValue(of({ message: 'Success' }));
    spyOn(console, 'log'); // Spy on console.log to verify success message

    // Mock file and its content
    const mockFile = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const mockData = [
      ['status', 'customer_full_name', 'account_no', 'meter_no', 'address'], // Headers
      // Mock data rows as needed
    ];

    // Mock FileReader behavior
    const mockReader = {
      onloadstart: () => {},
      onprogress: (event: any) => { event.loaded = 100; event.total = 100; },
      onload: null as ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null,
      readAsArrayBuffer: () => setTimeout(() => {
        // Use optional chaining to check if onload is defined before invoking it
        mockReader.onload?.(createMockFileReaderEvent(new ArrayBuffer(1)));
      }, 0)
    } as unknown as FileReader;

    spyOn(window as any, 'FileReader').and.returnValue(mockReader);

    // Call the method
    component.readAndUploadFile(mockFile);
    tick(); // Advance timer to simulate async upload completion

    expect(customerService.saveBulkCustomers).toHaveBeenCalledWith(jasmine.any(Array));
    expect(console.log).toHaveBeenCalledWith('Bulk save successful', { message: 'Success' });
    expect(component.progressValue).toBe(0);
  }));

  it('should handle upload failure', fakeAsync(() => {
    spyOn(customerService, 'saveBulkCustomers').and.returnValue(throwError({ error: 'Upload failed' }));
    spyOn(console, 'error'); // Spy on console.error to verify error message

    const mockFile = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const mockData = [
      ['status', 'customer_full_name', 'account_no', 'meter_no', 'address'] // Headers
      // Add mock data rows as needed
    ];

    const mockReader = {
      onloadstart: () => {},
      onprogress: (event: any) => { event.loaded = 50; event.total = 100; },
      onload: null as ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null,
      readAsArrayBuffer: () => setTimeout(() => {
        mockReader.onload?.(createMockFileReaderEvent(new ArrayBuffer(1)));
      }, 0)
    } as unknown as FileReader;

    spyOn(window as any, 'FileReader').and.returnValue(mockReader);

    // Call the method
    component.readAndUploadFile(mockFile);
    tick(); // Advance timer to simulate async upload completion

    expect(customerService.saveBulkCustomers).toHaveBeenCalledWith(jasmine.any(Array));
    expect(console.error).toHaveBeenCalledWith('Bulk save failed or cancelled', { error: 'Upload failed' });
    expect(component.isUploading).toBeFalse();
  }));

  it('should cancel the upload', fakeAsync(() => {
    spyOn(customerService, 'saveBulkCustomers').and.returnValue(of({ message: 'Success' }));

    const mockFile = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const mockReader = {
      onloadstart: () => { component.isUploading = true; },
      onprogress: (event: any) => { event.loaded = 50; event.total = 100; },
      readAsArrayBuffer: () => setTimeout(() => {
        component.cancelUpload(); // Simulate cancel
      }, 0)
    } as unknown as FileReader;

    spyOn(window as any, 'FileReader').and.returnValue(mockReader);

    // Call the method
    component.readAndUploadFile(mockFile);
    tick();

    expect(component.isUploading).toBeFalse();
    expect(component.progressValue).toBe(0);
  }));
});
