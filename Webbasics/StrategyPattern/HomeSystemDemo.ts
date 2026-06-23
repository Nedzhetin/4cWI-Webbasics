interface heatingStrategy {
  regulateTemperature(temp: number): void;
}

class EcoMode implements heatingStrategy {
  regulateTemperature(temp: number): void {
    console.log(`EcoMode: Regulating temperature to ${temp} degrees.`);
  }
}

class ComfortMode implements heatingStrategy {
  regulateTemperature(temp: number): void {
    console.log(`ComfortMode: Regulating temperature to ${temp} degrees.`);
  }
}
class AwayMode implements heatingStrategy {
  regulateTemperature(temp: number): void {
    console.log(`AwayMode: Regulating temperature to ${temp} degrees.`);
  }
}

class HomeSystem {
  private strategy: heatingStrategy;

  constructor(strategy: heatingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: heatingStrategy) {
    this.strategy = strategy;
  }

  regulateTemperature(temp: number) {
    this.strategy.regulateTemperature(temp);
  }
}

const homeSystem: HomeSystem = new HomeSystem(new EcoMode());
homeSystem.regulateTemperature(18);
homeSystem.setStrategy(new ComfortMode());
homeSystem.regulateTemperature(22);
homeSystem.setStrategy(new AwayMode());
homeSystem.regulateTemperature(16);
