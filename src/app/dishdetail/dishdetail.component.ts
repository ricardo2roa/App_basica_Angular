import {Component, Input, OnInit, ViewChild, Inject} from '@angular/core';
import {Dish} from "../shared/dish";
import {ActivatedRoute, Params} from "@angular/router";
import {DishService} from "../services/dish.service";
import {Location} from "@angular/common";
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Comment} from '../shared/comment';
import {flyInOut, visibility, expand} from '../animations/app.animations';

interface formErros{
  author:string
  rating:string
  comment:string
}

interface validationMessages{
  author:propertiesMessages
  rating:propertiesMessages
  comment:propertiesMessages
}

interface propertiesMessages{
  required?: string
  minlength?: string
  maxlength?: string
}

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInOut(),
    visibility()
  ]
})

export class DishdetailComponent implements OnInit {

  //@Input() selectedDish: Dish;
  selectedDish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment:Comment;
  errMess: string;
  dishcopy:Dish;
  visibility = 'shown';

  formErrors:formErros = {
    author:'',
    rating:'',
    comment:'',
  };

  validationMessages:validationMessages={
    author:{
      required:'Name is required.',
      minlength:'Name must be at least 2 characters long.',
      maxlength:'Name cannot be more than 25 characters long.'
    },
    rating:{
      required:'Rating is required.'
    },
    comment:{
      required:'Comment is required.',
      minlength:'Comment must be at least 2 characters long.',
      maxlength:'Comment cannot be more than 120 characters long.'
    },
  };

  @ViewChild('fform') commentFormDirective:HTMLFormElement;

  constructor(private activateroute:ActivatedRoute,
              private dishservice:DishService,
              private location:Location,
              private fb:FormBuilder,
              @Inject('BaseURL') public BaseURL:string) {
    this.createForm();
  }

  ngOnInit(): void {
    this.dishservice.getDishIds()
    .subscribe(dishIds => this.dishIds = dishIds);
    //snapshot -> toma una captura del valor observable
    this.activateroute.params.pipe(switchMap((params: Params) => {this.visibility='hidden';return this.dishservice.getDish(params['id']);}))
    .subscribe(dish => {this.selectedDish = dish; this.dishcopy = dish; this.setPrevNext(dish.id);this.visibility='shown'},
    errmess => this.errMess = <any>errmess);
  }

  createForm(){
    this.commentForm = this.fb.group({
      author:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: [0,Validators.required],
      comment: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(120)]],
      date: ''
    });

    this.commentForm.valueChanges
    .subscribe(data=>{this.onValueChange(data);});

    this.onValueChange();
  }

  onValueChange(data?:any){
    if(!this.commentForm) return;
    const form = this.commentForm;
    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        // clear previous error message (if any)
        this.formErrors[field as keyof formErros] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field as keyof validationMessages];
          for( const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field as keyof formErros] += messages[key as keyof propertiesMessages]+' ';
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index -1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index +1) % this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }

  onSubmit(){
    let datetoday = new Date();
    this.comment = this.commentForm.value;
    this.comment.date = datetoday.toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
    .subscribe(dish=>{
      this.selectedDish = dish;
      this.dishcopy = dish;
    },errmess => {
      this.selectedDish = null;
      this.dishcopy = null;
      this.errMess = <any>errmess;
    });
    this.commentForm.reset({
      nameOfComment:'',
      rating: 0,
      comment: '',
      date:''
    });
    this.commentFormDirective.resetForm();
  }
}


