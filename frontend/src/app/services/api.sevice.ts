import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://localhost:8080/api';

  constructor(public http: HttpClient) {}
}
