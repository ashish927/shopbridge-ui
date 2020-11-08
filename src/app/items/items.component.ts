import { ItemserviceService } from './../service/itemservice.service';
import { Item } from './../model/item';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];

  searchText;

  closeResult: string;

  addForm: FormGroup;

  enableEdit = false;
  enableEditIndex = null;
  

  constructor(private formBuilder: FormBuilder, private itemService: ItemserviceService, 
    private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.itemService.getItems()
      .subscribe( data => {
        this.items = data;
      });

      this.addForm = this.formBuilder.group({
        id: [],
        name: ['',Validators.required],
        price: ['', Validators.required],
        description: ['', Validators.required],
      });
  }

 
  onSubmit() {
    console.log("enter here ");
    this.itemService.createItem(this.addForm.value)
      .subscribe( data => {
        this.ngOnInit()
        this.modalService.dismissAll();
      });
  }

  deleteUser(item: Item){
    this.itemService.deleteItem(item.id)
    .subscribe(data=>{
      this.ngOnInit()
    });
  }
  //sorting
  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

 
  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }

  cancel() {
    console.log('cancel');
    this.enableEditIndex = null;
  }

  saveSegment(item:Item) {
    this.enableEditIndex = null;
    this.itemService.updateItem(item)
    .subscribe(data=>{
      this.ngOnInit()
    });
  }


}
