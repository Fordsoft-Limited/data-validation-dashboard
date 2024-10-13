import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-customer-detail-field',
  templateUrl: './customer-detail-field.component.html',
  styleUrl: './customer-detail-field.component.scss'
})
export class CustomerDetailFieldComponent {

  @Input() fieldName: string = '';
  @Input() newData: string | null = null;
  @Input() existingData: string | null = null;

}
