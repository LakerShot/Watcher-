import { Subscription } from 'rxjs';
import { Order } from './../shared/interfaces';
import { OrdersService } from './../shared/services/orders.service';
import { MaterialService } from './../shared/classes/material.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialInstance, OrderPosition } from '../shared/interfaces';
import { OrderService } from './order.service'
  
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal') modalRef: ElementRef
  isRoot: boolean
  modal: MaterialInstance
  pending: false
  oSub: Subscription

  constructor(
    private router: Router,
    public order: OrderService,
    private ordersService: OrdersService 
  ) { }

  ngOnInit() {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }
  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }
 
  ngOnDestroy() {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  open() {
    this.modal.open()
  }
  cancel() {
    this.modal.close()
  }

  submit() {
    this.pending
    const order: Order = {
      list: this.order.list.map(item => {
        //delete _id cus this fild was added to UI and don't need to store in backend
        delete item._id
        return item
      })
    }

    this.oSub = this.ordersService.create(order)
      .subscribe(newOrder => {
        MaterialService.toast(`Order №${newOrder.order} has been added`)
        this.order.clear()
      }, error => MaterialService.toast(error.error.message),
         () =>  {
            this.modal.close()
            this.pending = false
         }
      )
  }

  removePostition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

  removeAllPositions() {
    this.order.removeAll()
    this.modal.close()
  }
}
