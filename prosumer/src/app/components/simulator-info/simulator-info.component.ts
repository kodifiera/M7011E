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

  consumption: any;
  conUnit: string = "";

  generation: any;
  genUnit: string = "";

  wind: any;
  windUnit: string = "";

  subscription1: any;
  subscription2: any;
  sell: number = 0;
  buy: number = 0;
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

      this.wind = parseFloat(data.avg_wind.wind).toFixed(3);
      this.windUnit = data.avg_wind.unit;

    }, error => console.log(error));
    this.subscription2 = timer(0, 5000).subscribe(geh => this.batteryUpdate()
    )
  }

  sellIsActive() {
    if(this.generation - this.consumption > 0) {
      return true;
    }
    return false;
  }

  batteryUpdate = () => {
    let sellActive = this.sellIsActive();
    if (this.battery.valueNow == this.battery.maxValue) {
      this.sell = 100;
    }
    if(this.battery.valueNow == this.battery.minValue) {
      this.buy = 100;
    }
    if(this.battery.valueNow == null) {
      this.battery.valueNow = 2.4;
    }
    if (sellActive) {
      let wPer5Sec = this.generation / 720;    //  ((kwh / hour -> 5 seconds) / volt) gives ampere per 5 seconds
      let newVal = wPer5Sec* (100-this.sell)/100;

      if(((parseFloat(this.battery.valueNow)) + newVal) < this.battery.maxValue) {
        this.battery.valueNow = (parseFloat(this.battery.valueNow) + newVal).toFixed(3);
      } else {
        this.battery.valueNow = this.battery.maxValue;
      }
    }
    else {
      let hoursWithBattery = (this.battery.maxValue) /this.consumption;        //how many hours battery will live
      let wattPet5sec = hoursWithBattery /720        //ampHours / hoursToLive transformed to every 5 seconds
      let newValue = wattPet5sec * (100-this.buy)/100;  //multiplicate with percentage

      if(parseFloat(this.battery.valueNow) - newValue > (this.battery.minValue)) {
        this.battery.valueNow = (parseFloat(this.battery.valueNow) - newValue).toFixed(3);
      } else {
        this.battery.valueNow = this.battery.min;
      }
    }
  }

  ngOnDestroy() {
    console.log("destroy")
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();    
  }
}

class Battery {
  maxValue: any = 2.4; //6*400/1000
  minValue: any = 0;
  valueNow: any = this.maxValue;

}