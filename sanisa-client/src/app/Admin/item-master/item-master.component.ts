import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {  NgbModal, NgbModalRef, NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent {

  @ViewChild('addProduct', { static: false }) addUserModalContent!: ElementRef;
  @ViewChild('productDetails', { static: false }) productDetailContent!: ElementRef;

  addProductModal!: NgbModalRef;
  viewProductDetailModal!: NgbOffcanvasRef;

  public modalService = inject(NgbModal);
  public offcanvasService = inject(NgbOffcanvas);



  
OpenAddProductModal() {
  this.addProductModal = this.modalService.open(this.addUserModalContent, { size: 'lg' });
}

openProductDetail(){
  this.viewProductDetailModal = this.offcanvasService.open(this.productDetailContent,{ position: 'end' ,  backdrop: false } )
}

}
