import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
// PrimeNG Components
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { MegaMenuModule } from 'primeng/megamenu';
import { SidebarModule } from 'primeng/sidebar';

import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [ DataTableComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AccordionModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    ListboxModule,
    MenuModule,
    MultiSelectModule,
    PaginatorModule,
    PanelModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RatingModule,
    SliderModule,
    TableModule,
    TabViewModule,
    MegaMenuModule,
    SidebarModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,

  ],
  exports: [
    CommonModule,
    AccordionModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    ListboxModule,
    MenuModule,
    MultiSelectModule,
    PaginatorModule,
    PanelModule,
    MegaMenuModule,
    SidebarModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RatingModule,
    SliderModule,
    TableModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    DataTableComponent
  ]
})
export class SharedModule { }
