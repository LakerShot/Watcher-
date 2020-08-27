import { Order } from './../interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'computePipe',
  pure: true
})
export class ComputePipe implements PipeTransform {

  transform(order: Order, args?: any): number {
    return order.list.reduce((acc, item) => acc += item.quantity * item.cost, 0)
  }

}
