import { Component, OnInit,Input } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-msgbox',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() message: any;
  @Input() styl:any
  constructor() { }


  ngOnInit(): void {
    $(document).ready(function () {
      $('.box').fadeOut(4000);
    });
  }

}
