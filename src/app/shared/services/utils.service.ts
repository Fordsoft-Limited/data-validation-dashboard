import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private  storageKey='storageKey'
  constructor() { }
   getItems(): any[] {
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

  saveItems(items: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
  clearItems(){
    localStorage.setItem(this.storageKey, JSON.stringify([]))
  }
  deleteItem(uid: string): void {
    const items = this.getItems();
    const updatedItems = items.filter(item => item.uid !== uid);
    this.saveItems(updatedItems);
  }

}
