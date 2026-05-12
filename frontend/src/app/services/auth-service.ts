import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.sevice';

export interface LoginRequest {
  nombreUsuario: string;
  contrasena: string;
}

export interface LoginResponse {
  id: number;
  nombreReal: string;
  nombreUsuario: string;
  rol: string;
}

export interface RegisterDTO {
  nombreUsuario: string;
  nombreReal: string;
  contrasenaHash: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private apiService = inject(ApiService);

  login(datos: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiService.apiUrl}/usuario/login`, datos);
  }

  register(datos: RegisterDTO): Observable<any> {
    return this.http.post(`${this.apiService.apiUrl}/usuario/crear`, datos);
  }

  guardarSesion(usuario: LoginResponse): void {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }

  obtenerSesion(): LoginResponse | null {
    const data = localStorage.getItem('usuarioLogado');
    return data ? JSON.parse(data) : null;
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioLogado');
  }

  estaLogado(): boolean {
    return !!this.obtenerSesion();
  }
}
