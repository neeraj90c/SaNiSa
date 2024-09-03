import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent {

  @ViewChild('addProduct', { static: false }) addUserModalContent!: ElementRef;
  addProductModal!: NgbModalRef;
  public modalService = inject(NgbModal);


  
OpenAddProductModal() {
  this.addProductModal = this.modalService.open(this.addUserModalContent, { size: 'lg' });
}

}
