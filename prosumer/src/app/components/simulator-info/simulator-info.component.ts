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

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void{
    
    this.httpService.getTemperature().subscribe((data: any)  => {
      this.temperature = data;
    })
    
    this.httpService.getPrice().subscribe((data: any) => {
      this.price = data.price;
      this.consumption = data.avg_consumption;
      this.generation = data.avg_generation;
    })
  }

  

}
