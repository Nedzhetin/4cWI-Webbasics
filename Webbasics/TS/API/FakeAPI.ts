import { Person } from "./types";
import { API } from "./API";

let persons: Person[] = [
  { lastname: "Mustermann", firstname: "Max" },
  { lastname: "Musterfrau", firstname: "Erika" },
  { lastname: "Doe", firstname: "John" },
  { lastname: "Roe", firstname: "Jane" },
  { lastname: "Schmidt", firstname: "Hans" },
  { lastname: "Meier", firstname: "Franz" },
  { lastname: "Müller", firstname: "Peter" },
  { lastname: "Schneider", firstname: "Klaus" },
  { lastname: "Fischer", firstname: "Uwe" },
  { lastname: "Weber", firstname: "Jürgen" },
];

export class FakeAPI implements API {
  getAllPersons(): Person[] {
    return persons;
  }
}
