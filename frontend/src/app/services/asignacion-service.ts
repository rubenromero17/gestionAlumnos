import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AsignacionDTO {
  alumnoId: number;
  proyectoId: number;
  nombreAlumno?: string;
  tituloProyecto?: string;
}

@Injectable({ providedIn: 'root' })
export class AsignacionService {

  private readonly base = `${environment.apiUrl}/asignacion`;

  constructor(private http: HttpClient) {}

  getAlumnosPorProyecto(proyectoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/proyecto/${proyectoId}`);
  }

  getProyectosPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/alumno/${usuarioId}`);
  }

  inscribir(alumnoId: number, proyectoId: number): Observable<AsignacionDTO> {
    return this.http.post<AsignacionDTO>(this.base, { alumnoId, proyectoId });
  }

  salir(alumnoId: number, proyectoId: number): Observable<void> {
    return this.http.delete<void>(this.base, {
      body: { alumnoId, proyectoId }
    });
  }
}
