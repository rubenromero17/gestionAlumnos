import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TareaDTO {
  id: number;
  proyectoId: number;
  titulo: string;
  orden: number;
  completada?: boolean;
}

@Injectable({ providedIn: 'root' })
export class TareaService {

  private readonly base = `${environment.apiUrl}/tarea`;

  constructor(private http: HttpClient) {}

  getTareasPorProyecto(proyectoId: number): Observable<TareaDTO[]> {
    return this.http.get<TareaDTO[]>(`${this.base}/proyecto/${proyectoId}`);
  }

  guardarTareas(proyectoId: number, titulos: string[]): Observable<TareaDTO[]> {
    return this.http.put<TareaDTO[]>(`${this.base}/proyecto/${proyectoId}`, { titulos });
  }

  getTareasConEstado(proyectoId: number, usuarioId: number): Observable<TareaDTO[]> {
    return this.http.get<TareaDTO[]>(`${this.base}/proyecto/${proyectoId}/usuario/${usuarioId}`);
  }

  toggleTarea(tareaId: number, usuarioId: number, completada: boolean): Observable<void> {
    return this.http.patch<void>(`${this.base}/${tareaId}/usuario/${usuarioId}`, { completada });
  }
}
