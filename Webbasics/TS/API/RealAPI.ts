import { API } from "./API";
import { Person } from "./types";

export class RealAPI implements API {
  getAllPersons(): Person[] {
    return [{ firstname: "Real", lastname: "Person" }];
  }
}
