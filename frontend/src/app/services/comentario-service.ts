import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ComentarioDTO {
  id: number;
  proyectoId: number;
  usuarioId: number;
  nombreUsuario: string;
  fotoUsuario?: string;
  texto: string;
  fecha: string; // ISO string
}

@Injectable({ providedIn: 'root' })
export class ComentarioService {

  private readonly base = `${environment.apiUrl}/comentario`;

  constructor(private http: HttpClient) {}

  getByProyecto(proyectoId: number): Observable<ComentarioDTO[]> {
    return this.http.get<ComentarioDTO[]>(`${this.base}/proyecto/${proyectoId}`);
  }

  crear(proyectoId: number, usuarioId: number, texto: string): Observable<ComentarioDTO> {
    return this.http.post<ComentarioDTO>(this.base, { proyectoId, usuarioId, texto });
  }

  eliminar(comentarioId: number, usuarioId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${comentarioId}`, {
      body: { usuarioId }
    });
  }
}
