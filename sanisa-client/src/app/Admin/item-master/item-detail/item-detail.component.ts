import { Component, inject } from '@angular/core';
import { ItemMaster } from '../item-master.interface';
import { ItemMasterService } from '../item-master.service';
import { ActivatedRoute } from '@angular/router';
import { ItemPriceService } from '../item-price.service';
import { ItemPriceDTO } from '../item-price.interface';
import { EventDetailService } from '../../event-master/event-detail/event-detail.service';
import { CategoryDetailService } from '../../category-master/category-detail/category-detail.service';
import { CreateEventDetailDTO, DeleteEventDetailDTO, EventDetailDTO } from '../../event-master/event-detail/event-detail.interface';
import { EventMasterService } from '../../event-master/event-master.service';
import { EventMasterDTO } from '../../event-master/event.interface';
import { UsersService } from '../../users/users.service';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { CategoryDetailDTO, CreateCategoryDetailDTO, DeleteCategoryDetailDTO } from '../../category-master/category-detail/category-detail.interface';
import { CategoryMasterService } from '../../category-master/category-master.service';
import { CategoryMasterDTO } from '../../category-master/category.interface';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {

  item: ItemMaster | null = null
  itemPrice: ItemPriceDTO | null = null
  itemEvents: EventDetailDTO[] = []
  itemCategories: CategoryDetailDTO[] = []
  eventList: EventMasterDTO[] = []
  categoryList: CategoryMasterDTO[] = []
  filteredEventList: EventMasterDTO[] = []
  filteredCategoryList: CategoryMasterDTO[] = []
  itemMasterService = inject(ItemMasterService)
  itemPriceService = inject(ItemPriceService)
  eventDetailService = inject(EventDetailService)
  eventMasterService = inject(EventMasterService)
  categoryDetailService = inject(CategoryDetailService)
  categoryMasterService = inject(CategoryMasterService)
  confirmModal = inject(ConfirmmodalserviceService)
  route = inject(ActivatedRoute)
  User = inject(AuthService).User()

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      let itemId = parseInt(res['id'])
      if (itemId) {
        this.getItemById(itemId)
      }
    })
  }

  getItemById(itemId: number) {
    this.itemMasterService.ReadItemById({ itemId }).subscribe(res => {
      this.item = res
    })
    this.itemPriceService.ReadPriceByItemId({ itemId }).subscribe(res => {
      this.itemPrice = res
    })
    this.getEventByItem(itemId)
    this.getCategoryByItem(itemId)
    this.getEventList()
    this.getCategoryList()
  }


  addEvent() {
    console.log('clicked add event');

  }
  addCategory() {
    throw new Error('Method not implemented.');
  }

  getEventByItem(itemId: number) {
    this.eventDetailService.ReadDetailByItemId({ itemId }).subscribe(res => {
      this.itemEvents = res.items
    })
  }
  createItemEvent(eventId: number) {
    let data: CreateEventDetailDTO = {
      eventId: eventId,
      itemId: this.item?.itemId!,
      actionUser: this.User.userId.toString()
    }
    this.eventDetailService.CreateEventDetail(data).subscribe(res => {
      this.getEventByItem(this.item?.itemId!)
    })
  }
  DeleteEvent(eDetailId: number) {
    let data: DeleteEventDetailDTO = {
      eDetailId: eDetailId,
      actionUser: this.User.userId.toString()
    }
    this.eventDetailService.DeleteEventDetail(data).subscribe(res => {
      this.getEventByItem(this.item?.itemId!)
    })
  }

  eventChange(e: Event, event: EventMasterDTO) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.createItemEvent(event.eventId)
    } else {
      let eDetailId = this.itemEvents.find(i => i.eventId == event.eventId)
      this.DeleteEvent(eDetailId?.eDetailId!)
    }
  }
  getEventList() {
    this.eventMasterService.ReadAllEvent().subscribe(res => {
      this.eventList = res.items
      this.filteredEventList = res.items
    })
  }

  eventFilterChange(event: any): void {
    const inputValue = event.target.value.toLowerCase();
    this.filteredEventList = this.eventList.filter(i =>
      i.eventName.toLowerCase().includes(inputValue)
    );
    if (!inputValue) {
      this.filteredEventList = [...this.eventList];
    }
  }

  eventChecked(event: EventMasterDTO) {
    let eventList = this.itemEvents.find(i => i.eventId == event.eventId)
    return eventList ? true : false
  }

  getEventNameByEventId(eventId: number): EventMasterDTO | null {
    const event = this.eventList.find(i => i.eventId === eventId);
    return event ? event : null; // Return eventName if found, else return an empty string
  }

  removeEvent(event: EventDetailDTO) {
    let data = this.getEventNameByEventId(event.eventId)
    this.confirmModal.openDeleteModal(data?.eventName!, data).subscribe(res => {
      if (res) {
        console.log(res);
        this.DeleteEvent(event.eDetailId)
      } else {
        console.log('no res');
      }
    })
  }


  getCategoryByItem(itemId: number) {
    this.categoryDetailService.ReadCategoryDetailByItemId({ itemId }).subscribe(res => {
      this.itemCategories = res.items
    })
  }
  getCategoryList() {
    this.categoryMasterService.ReadAllCategory().subscribe(res => {
      this.categoryList = res.items
      this.filteredCategoryList = res.items

    })
  }

  categoryFilterChange(event: any): void {
    const inputValue = event.target.value.toLowerCase();
    this.filteredCategoryList = this.categoryList.filter(i =>
      i.cName.toLowerCase().includes(inputValue)
    );
    if (!inputValue) {
      this.filteredCategoryList = [...this.categoryList];
    }
  }

  categoryChange(e: Event, category: CategoryMasterDTO) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.createItemCategory(category.categoryId)
    } else {
      let cDetail = this.itemCategories.find(i => i.categoryId == category.categoryId)
      this.DeleteCategory(cDetail?.detailId!)
    }
  }


  createItemCategory(categoryId: number) {
    let data: CreateCategoryDetailDTO = {
      itemId: this.item?.itemId!,
      actionUser: this.User.userId.toString(),
      categoryId: categoryId
    }
    this.categoryDetailService.CreateCategoryDetail(data).subscribe(res => {
      this.getCategoryByItem(this.item?.itemId!)
    })
  }

  DeleteCategory(detailId: number) {
    let data: DeleteCategoryDetailDTO = {
      actionUser: this.User.userId.toString(),
      detailId: detailId
    }
    this.categoryDetailService.DeleteCategoryDetail(data).subscribe(res => {
      this.getCategoryByItem(this.item?.itemId!)
    })
  }

  categoryChecked(category: CategoryMasterDTO)  {
    let categoryList = this.itemCategories.find(i => i.categoryId == category.categoryId)
    return categoryList ? true : false
  }

  getCategoryNameByCategoryId(categoryId: number): CategoryMasterDTO | null {
    const category = this.categoryList.find(i => i.categoryId == categoryId);
    return category ? category : null; // Return eventName if found, else return an empty string
  }


  removeCategory(category: CategoryDetailDTO) {
    let data = this.getCategoryNameByCategoryId(category.categoryId)
    this.confirmModal.openDeleteModal(data?.cName!, data).subscribe(res => {
      if (res) {
        console.log(res);
        this.DeleteCategory(category.detailId)
      } else {
        console.log('no res');
      }
    })
  }

}
