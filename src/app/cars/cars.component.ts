import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[];

  selectedCar: Car;
  constructor(private carService: CarService) { 
    this.selectedCar = new Car();
  }

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
  }

  editCar(carId: number) {
    this.selectedCar = this.cars.find( (elem: Car) => elem.id === carId);
    console.log(this.selectedCar);
    /*this.carService.getCarById( carId )
    .subscribe(
      ( car: Car ) => {
        this.selectedCar = car;
      },
      error => {
        alert('Could not retrieve car with Id ' + carId);
      }
    )*/
  }

  deleteCar(carId: number) {
    this.carService.deleteCar( carId )
      .subscribe( (car: Car) => {
        this.getCars();
    });
  }
}
