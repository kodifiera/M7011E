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
  consumption: any;
  generation: any;
  currency: any;
  wind: any;
  subscription1: any;
  subscription2: any;
  subscription3: any;
  sell: string = '0';
  buy: string = '0';


  statusText: string = "";

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.subscription1 = timer(0, 5*6*10000).pipe(
    switchMap(()=> this.httpService.getTemperature())
    ).subscribe((data:any)=> {
      this.temperature = data;
    }, error => console.log(error));

    this.subscription2 = timer(0, 10000).pipe(
      switchMap(()=> this.httpService.getWind())
      ).subscribe((data:any)=> {
        this.wind = data;
      }, error => console.log(error));

    this.subscription3 = timer(0, 10000).pipe(
    switchMap(()=> this.httpService.getPrice())
    ).subscribe((data:any)=> {
      this.price = data.price;
      this.consumption = data.avg_consumption;
      this.generation = data.avg_generation;
      this.currency = data.price_currency;    
    }, error => console.log(error));
  }

  sellIsActive() {
    if(this.generation - this.consumption > 0) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    console.log("destroy")
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();    
    this.subscription3.unsubscribe();    
  }
}
