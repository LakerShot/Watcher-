import { Position, OrderPosition } from './../shared/interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  public list: OrderPosition[] = []
  public price = 0

  private coputePrice() {
    this.price = this.list.reduce((acc, item) => acc += item.quantity * item.cost, 0)
  }

  add(position: Position) {
    const {name, cost, quantity, _id} = position
    const orderPosition: OrderPosition = Object.assign({}, {name, cost, quantity, _id})

    const candidate = this.list.find(p => p._id === orderPosition._id) 
    
    candidate ? candidate.quantity += orderPosition.quantity : this.list.push(orderPosition)

    this.coputePrice()
  } 
 
  remove(orderPosition: OrderPosition) {
    const idx = this.list.findIndex(p => p._id === orderPosition._id)
    this.list.splice(idx, 1)
    this.coputePrice()
  }

  removeAll() {
    this.clear()
  }
 
  clear() {
    this.list = []
    this.price = 0
  }
}