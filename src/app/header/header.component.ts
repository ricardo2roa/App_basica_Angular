import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog,
    @Inject('BaseURL') public BaseUrl:string) { }

  ngOnInit(): void {
  }

  openLoginForm(){
    this.dialog.open(LoginComponent, {
      height:'450px',
      width:'500px',
    });
  }
}
