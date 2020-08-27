import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {PositionsService} from '../../../shared/services/positions.service'
import {Position, MaterialInstance} from '../../../shared/interfaces'
import {MaterialService} from '../../../shared/classes/material.service'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef

  positions: Position[] = []
  loading = false
  positionId = null
  modal: MaterialInstance
  form: FormGroup
 
  constructor(private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })

    this.loading = true
    this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions
      this.loading = false
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  openModalAndUpdateText = () => {
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onSelectPosition(position: Position) {
    const {name, cost, _id} = position
    this.positionId = _id
    this.form.patchValue({name, cost})
    this.openModalAndUpdateText()
  }

  onAddPosition() {
    this.positionId = null
    this.form.reset({name: null, cost: 1})
    this.openModalAndUpdateText()
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation()

    Swal.fire({
      title: `Remove ${position.name} position?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009488',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Submit'
    }).then(result => {
      if (result.value) {
        this.positionsService.delete(position).subscribe(
          response => {
            const idx = this.positions.findIndex(p => p._id === position._id)
            this.positions.splice(idx, 1)
            MaterialService.toast(response.message)
          },
          error => MaterialService.toast(error.error.message)
        )
      }
    })
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    const {name, cost } = this.form.value
    this.form.disable()

    const newPosition: Position = {name, cost, category: this.categoryId}

    const completed = () => {
      this.modal.close()
      this.form.reset({name: '', cost: 1})
      this.form.enable()
    }

    if (this.positionId) {
      newPosition._id = this.positionId
      this.positionsService.update(newPosition).subscribe(
        position => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions[idx] = position
          MaterialService.toast('Changes have been saved')
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    } else {
      this.positionsService.create(newPosition).subscribe(
        position => {
          MaterialService.toast('Position has been created')
          this.positions.push(position)
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    }


  }

}
