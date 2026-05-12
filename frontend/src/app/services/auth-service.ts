import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.sevice';

export interface RegisterDTO {
  nombreUsuario:  string;
  nombreReal:     string;
  contrasenaHash: string;
  rol:            string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private apiService = inject(ApiService);

  register(datos: RegisterDTO): Observable<any> {
    return this.http.post(`${this.apiService.apiUrl}/usuario/crear`, datos);
  }
}
