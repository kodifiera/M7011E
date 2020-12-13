import { Component,Input,Output,EventEmitter, ViewChild, ElementRef,OnInit } from '@angular/core'; 
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-buffer-sliders',
  templateUrl: './buffer-sliders.component.html',
  styleUrls: ['./buffer-sliders.component.css']
})
export class BufferSlidersComponent implements OnInit {
  rangevalue:string = '';
  serial: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  valueChanged() {
    //skicka ratio till backend
    console.log(this.serial);
  }
}

 
