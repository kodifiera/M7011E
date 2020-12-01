import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-simulator-info',
  templateUrl: './simulator-info.component.html',
  styleUrls: ['./simulator-info.component.css']
})
export class SimulatorInfoComponent implements OnInit {

  temperature: Object = Object;
  price: Object = Object;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void{
    
    this.httpService.getTemperature().subscribe(data => {
      this.temperature = data;
    })
    
    this.httpService.getPrice().subscribe(data => {
      this.price = data;
      console.log(this.price)
    })
  }

  

}
