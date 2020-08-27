import { Category, HTMLInputEvent, MaterialInstance } from './../../shared/interfaces';
import { MaterialService } from './../../shared/classes/material.service';
import { CategoriesService } from './../../shared/services/categories.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit  {

  @ViewChild('input') inputRef: ElementRef
  form: FormGroup
  isNew = true
  image: File
  imagePreview
  category: Category
  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.form.disable()

    // swithcMap reterns a new stream
    this.route.params
      .pipe(
        switchMap((params: Params)=> {
          if (params.id) {
            this.isNew = false
            return this.categoriesService.getById(params.id)
          }
          return of(null)
        })
      ).subscribe((category: Category) => {
        if (category) {
          this.category = category
          this.form.patchValue({
            name: category.name
          })
          this.imagePreview = category.imageSrc
          MaterialService.updateTextInputs()
        }
        this.form.enable()
      }, error => MaterialService.toast(error.error.message) )
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }


  // more info about FileReader -> https://javascript.info/file
  onFileUpload(event: HTMLInputEvent) {
    const file = event.target.files[0]
    this.image = file
    
    const reader = new FileReader()

    reader.onload = () => {
      // reader.result - info about img
      this.imagePreview = reader.result
    }
    
    reader.readAsDataURL(file)
  }

  deleteCategory() {

    Swal.fire({
      title: `Remove ${this.category.name} category?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009488',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Submit'
    }).then((result) => {
      if (result.value) {

        this.categoriesService.delete(this.category._id)
        .subscribe(
          _ => Swal.fire('Successfully','Categoty has been Deleted!','success'),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/categories'])
        )
      }
    })    
  }
 
  onSubmit() {
    let obs$
    this.form.disable()
    const {name} = this.form.value

    obs$ = this.isNew ? this.categoriesService.create(name, this.image) 
         : this.categoriesService.update(this.category._id, name, this.image)

    obs$.subscribe((category: Category)=> {
      this.category = category
      MaterialService.toast('The changes have been saved')
      this.form.enable()
    }, error => {
      MaterialService.toast(error.error.message)
      this.form.enable()
    })
  }

}
