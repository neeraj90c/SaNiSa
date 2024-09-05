import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-combo-master',
  templateUrl: './combo-master.component.html',
  styleUrls: ['./combo-master.component.css']
})
export class ComboMasterComponent {
@ViewChild('addCombo', { static: false }) addComboModalContent!: ElementRef;

addComboModal!: NgbModalRef;
public modalService = inject(NgbModal);

OpenAddComboModal() {
this.addComboModal = this.modalService.open(this.addComboModalContent, { size: 'lg' });
}

}
