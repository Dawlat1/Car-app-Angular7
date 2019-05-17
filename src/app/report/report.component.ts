import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../models/car';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  cars: Car[];
  total = 0;
  oldest: Car = null;
  mostUsed: Car = null;
  mostExpensive: Car = null;
  mostEfficient: Car = null;

  constructor(private carService: CarService) { }

  calculate(): void {
    for(const car of this.cars) {
      this.total += car.price;
      if(isNullOrUndefined(this.oldest) || car.year < this.oldest.year) {
        this.oldest = car;
      }
      
      if (isNullOrUndefined(this.mostUsed) || car.km > this.mostUsed.km) {
        this.mostUsed = car;
      }

      if (isNullOrUndefined(this.mostExpensive) || car.price > this.mostExpensive.price) {
        this.mostExpensive = car;
      }

      if (isNullOrUndefined(this.mostEfficient) || car.engine.consumption > this.mostEfficient.engine.consumption) {
        this.mostEfficient = car;
      }
    }
  }

  ngOnInit() {
    this.carService.getCars()
      .subscribe( (cars: Car[]) => {
        this.cars = cars;
        this.calculate();
      },
      error => {
        console.log(error);
        alert('Could not retrieve cars')
      }
      );
  }

}
