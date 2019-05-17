import { Component, OnInit, OnChanges, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { Engine } from 'src/app/models/engine';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit, OnChanges {
  @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() selectedCar: Car;

  car: Car = new Car();

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.car.engine = new Engine();
    this.car.engine.fuel = null;
    this.car.engine.consumption = 0;
    this.car.engine.power = 0;
  }

  ngOnChanges(changes: SimpleChanges):void {
    this.car = this.selectedCar;
    console.log(this.car);
  }

  isAddAction(carId): boolean {
    return isNullOrUndefined(carId) || carId === 0;
  }

  debug(form): void {
    console.log(form);
  }

  processFrom(car: Car): void {
    // add a new car
    if (this.isAddAction( car.id )) {
      //we post
      this.carService.addCar(car).subscribe( (car: Car) => {
        this.update.emit(true);
      },
      error => {
        alert('Could not retrieve cars');
      });
    } else {
      this.carService.editCar( car ).subscribe( (car: Car) => {
        this.update.emit(true);
      })
    }
  }
}
