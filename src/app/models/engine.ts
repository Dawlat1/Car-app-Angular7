export class Engine {
    fuel: 'pertrol' | 'diesel' | 'electric';
    power: number;
    consumption: number;

    Engine() {
        this.fuel = 'pertrol';
        this.power = 0;
        this.consumption = 0;
    }
}
