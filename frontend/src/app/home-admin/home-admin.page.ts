import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
  IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonProgressBar, ToastController,
  IonSearchbar, IonCardSubtitle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleOutline, businessOutline, personAddOutline,
  settingsOutline, searchOutline, schoolOutline,
  statsChartOutline, listOutline, pencilOutline, trashOutline,
  personOutline, shieldCheckmarkOutline, readerOutline
} from 'ionicons/icons';
import { alumno } from '../modelos/alumno';
import { AlumnoService } from '../services/alumno-service';
import { UsuarioService, Usuario } from '../services/usuario-service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
    IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, CommonModule,
    FormsModule, IonProgressBar, IonSearchbar, IonCardSubtitle,
  ]
})
export class HomeAdminPage implements OnInit {
  alumnos: alumno[] = [];
  proyectos: any[] = [];
  loading: boolean = true;

  // Usuarios
  usuarios: Usuario[] = [];
  filtroUsuarios: Usuario[] = [];
  loadingUsuarios: boolean = true;
  textoBusqueda: string = '';
  filtroRol: string = '';

  constructor(
    private alumnoService: AlumnoService,
    private usuarioService: UsuarioService,
    private toastController: ToastController
  ) {
    addIcons({
      peopleOutline, businessOutline, personAddOutline,
      settingsOutline, searchOutline, schoolOutline,
      statsChartOutline, listOutline, pencilOutline, trashOutline,
      personOutline, shieldCheckmarkOutline, readerOutline
    });
  }

  ngOnInit() {
    this.cargarDatosDesdeBD();
    this.cargarUsuarios();
  }

  cargarDatosDesdeBD() {
    this.loading = true;
    this.alumnoService.getAlumnos().subscribe({
      next: (res) => {
        this.alumnos = res;
        this.loading = false;
      },
      error: () => {
        this.mostrarToast('Error conectando con el servidor', 'danger');
        this.loading = false;
      }
    });

    this.alumnoService.getProyectos().subscribe(res => this.proyectos = res);
  }

  cargarUsuarios() {
    this.loadingUsuarios = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
        this.aplicarFiltros();
        this.loadingUsuarios = false;
      },
      error: () => {
        this.mostrarToast('Error cargando usuarios', 'danger');
        this.loadingUsuarios = false;
      }
    });
  }

  buscarUsuario(event: any) {
    this.textoBusqueda = event.target.value?.toLowerCase() ?? '';
    this.aplicarFiltros();
  }

  filtrarPorRol(rol: string) {
    this.filtroRol = rol;
    this.aplicarFiltros();
  }

  private aplicarFiltros() {
    let resultado = [...this.usuarios];

    if (this.filtroRol) {
      resultado = resultado.filter(u => u.rol === this.filtroRol);
    }

    if (this.textoBusqueda.trim()) {
      resultado = resultado.filter(u =>
        u.nombreReal?.toLowerCase().includes(this.textoBusqueda) ||
        u.id?.toString().includes(this.textoBusqueda)
      );
    }

    this.filtroUsuarios = resultado;
  }

  eliminarUsuario(id: number) {
    this.usuarioService.eliminarUsuario(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
        this.aplicarFiltros();
        this.mostrarToast('Usuario eliminado correctamente', 'success');
      },
      error: () => this.mostrarToast('Error al eliminar el usuario', 'danger')
    });
  }

  getIconoPorRol(rol: string): string {
    switch (rol) {
      case 'ADMIN':    return 'shield-checkmark-outline';
      case 'PROFESOR': return 'reader-outline';
      default:         return 'person-outline';
    }
  }

  async mostrarToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }

  getModalidadTexto(mod: number): string {
    return mod === 1 ? 'Presencial' : 'Remoto';
  }
}
