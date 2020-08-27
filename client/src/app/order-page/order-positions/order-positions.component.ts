import { MaterialService } from './../../shared/classes/material.service';
import { OrderService } from './../order.service';
import { switchMap, map } from 'rxjs/operators';
import { Position } from './../../shared/interfaces';
import { PositionsService } from './../../shared/services/positions.service';
import { Observable, pipe } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>

  constructor(
    private router: ActivatedRoute,
    private positionsService: PositionsService,
    private order: OrderService
  ) { }

  ngOnInit() {
    this.positions$ = this.router.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionsService.fetch(params['id'])
          }
        ),
        map((positions: Position[]) => {
          return positions.map(position => {
            position.quantity = 1
            return position
          }) 
        })
      )
  }
  
  addToOrder(position: Position) {
    MaterialService.toast(`${position.name} has been added`)
    this.order.add(position)
  }

}
