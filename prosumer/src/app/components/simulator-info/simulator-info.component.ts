import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { timer} from 'rxjs';
import { switchMap} from 'rxjs/operators';



@Component({
  selector: 'app-simulator-info',
  templateUrl: './simulator-info.component.html',
  styleUrls: ['./simulator-info.component.css']
})


export class SimulatorInfoComponent implements OnInit {

  temperature: any;
  
  price: any;
  currency: string = "";

  consumption: any = "";
  conUnit: string = "";

  generation: any;
  genUnit: string = "";

  wind: any;
  windUnit: string = "";

  subscription1: any;
  subscription2: any;
  subscription3: any;
  sell: string = '0';
  buy: string = '0';
  battery: any;


  statusText: string = "";

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.battery = new Battery()
    this.subscription1 = timer(0, 5000).pipe(
    switchMap(()=> this.httpService.getSimulatorInfo())
    ).subscribe((data:any)=> {
      this.temperature = data.avg_temp.temp;

      this.price = data.price.price;
      this.currency = data.price.price_currency; 

      this.consumption = data.avg_consumption.el_consumption;
      this.conUnit = data.avg_consumption.unit;

      this.generation = data.avg_generation.el_generation;
      this.genUnit = data.avg_generation.unit;

      this.wind = data.avg_wind.wind;
      this.windUnit = data.avg_wind.unit;

    }, error => console.log(error));

  }

  sellIsActive() {
    if(this.generation - this.consumption > 0) {
      return true;
    }
    return false;
  }

  batteryUpdate(buy: any) {
    console.log(buy);
    let percent = 0.5;
    let newValue = this.battery.maxValue/1000*(buy/100)

    if(newValue > this.battery.minValue && newValue < this.battery.maxValue) {
      this.battery.valueNow = this.battery.valueNow - this.battery.valueNow*newValue;
    }

  }

  ngOnDestroy() {
    console.log("destroy")
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();    
    this.subscription3.unsubscribe();    
  }
}

class Battery {
  maxValue = 1000;
  minValue = 0;
  valueNow = this.maxValue;
}