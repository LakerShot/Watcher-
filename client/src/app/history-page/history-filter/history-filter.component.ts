import { MaterialService } from './../../shared/classes/material.service';
import { Filter, MaterialDatePiker } from './../../shared/interfaces';
import { Component, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements AfterViewInit,OnDestroy {

  @ViewChild('start') startRef: ElementRef
  @ViewChild('end') endRef: ElementRef
  @Output() onfilter = new EventEmitter<Filter>()
  order: number
  start: MaterialDatePiker
  end: MaterialDatePiker
  isValid = true

  constructor() { }
 
  ngAfterViewInit() { 
    this.start = MaterialService.initDatePicker(this.startRef, this.validate.bind(this))
    this.end = MaterialService.initDatePicker(this.endRef, this.validate.bind(this))
  }

  ngOnDestroy() {
    this.start.destroy()
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true
      return
    }
    this.isValid = this.start.date < this.end.date
  }

  submitFilter() {
    const filter: Filter = {}

    if (this.order) filter.order = this.order

    if (this.start.date) filter.start = this.start.date

    if (this.end.date) filter.end = this.end.date

    //emit date to parent component
    this.onfilter.emit(filter)
  }

}
