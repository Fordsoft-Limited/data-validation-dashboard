import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-customer-details-qrcode-field',
  templateUrl: './customer-details-qrcode-field.component.html',
  styleUrl: './customer-details-qrcode-field.component.scss'
})
export class CustomerDetailsQrcodeFieldComponent {
  @Input() fieldName!: string;
  @Input() newData: string | null = null; // Accepts string or null
  @Input() existingData: string | null = null; // Accepts string or null
}
