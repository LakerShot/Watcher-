import { MaterialInstance, MaterialDatePiker } from './../interfaces';
import { ElementRef } from '@angular/core'

declare var M

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message, classes: 'rounded'})
  }

  static updateTextInputs() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }

  static initTooltip(ref: ElementRef): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement)
  }

  static initDatePicker(ref: ElementRef, onClose: ()=> void): MaterialDatePiker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'mm.dd.yyyy',
      showClearBtn: true,
      onClose
    })
  }

}

