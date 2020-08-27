import { MaterialService } from './../../shared/classes/material.service';
import { Order, MaterialInstance } from './../../shared/interfaces';
import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() orders: Order[]
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  selectedOrder: Order

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }
  ngOnDestroy(){
    this.modal.destroy()
  }
  
  selectOrder(order: Order) {
    this.selectedOrder = order
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }

}
