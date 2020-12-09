import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-simulator-info',
  templateUrl: './simulator-info.component.html',
  styleUrls: ['./simulator-info.component.css']
})
export class SimulatorInfoComponent implements OnInit {

  temperature: any;
  price: any;
  consumption: any;
  generation: any;
  currency: any;
  wind: any;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void{
    
    this.httpService.getTemperature().subscribe((data: any)  => {
      this.temperature = data;
    }, error => console.log(error));

    this.httpService.getWind().subscribe((data:any) => {
      this.wind = data;
    }, error => console.log(error));
    
    this.httpService.getPrice().subscribe((data: any) => {
      console.log(data)
      this.price = data.price;
      this.consumption = data.avg_consumption;
      this.generation = data.avg_generation;
      this.currency = data.price_currency;
    }, error=> console.log(error));
  }

  

}
