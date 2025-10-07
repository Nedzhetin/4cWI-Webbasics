import { API } from "./API";
import { FakeAPI } from "./FakeAPI";
import { RealAPI } from "./RealAPI";

let api: API = new FakeAPI();
api = new RealAPI();
console.log(api.getAllPersons());
