import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-simulator-info',
  templateUrl: './simulator-info.component.html',
  styleUrls: ['./simulator-info.component.css']
})
export class SimulatorInfoComponent implements OnInit {
  consumption:Object = "";
  temperature:Object = "";
  wind:Object = "";
  price:Object = "";

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getConsumption().subscribe(data => {
      this.consumption = data;
    })
  }

  

  

}
