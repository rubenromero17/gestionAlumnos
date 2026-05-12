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
  personOutline, shieldCheckmarkOutline, readerOutline,
  closeOutline, checkmarkOutline, hourglassOutline
} from 'ionicons/icons';
import { alumno } from '../modelos/alumno';
import { AlumnoService } from '../services/alumno-service';
import { UsuarioService, Usuario } from '../services/usuario-service';
import {HeaderComponent} from "../components/header/header.component";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
    IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, CommonModule,
    FormsModule, IonProgressBar, IonSearchbar, IonCardSubtitle, HeaderComponent,
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

  // Modal edición
  modalEdicionAbierto: boolean = false;
  usuarioEditando: Usuario | null = null;
  guardandoEdicion: boolean = false;
  formEdicion = { nombreReal: '', nombreUsuario: '', rol: '', contrasenaHash: '' };

  constructor(
    private alumnoService: AlumnoService,
    private usuarioService: UsuarioService,
    private toastController: ToastController
  ) {
    addIcons({
      peopleOutline, businessOutline, personAddOutline,
      settingsOutline, searchOutline, schoolOutline,
      statsChartOutline, listOutline, pencilOutline, trashOutline,
      personOutline, shieldCheckmarkOutline, readerOutline,
      closeOutline, checkmarkOutline, hourglassOutline
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
      resultado = resultado.filter(u => u.rol?.toLowerCase() === this.filtroRol.toLowerCase());
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
    switch (rol?.toLowerCase()) {
      case 'administrador': return 'shield-checkmark-outline';
      case 'profesor':      return 'reader-outline';
      default:              return 'person-outline';
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

  abrirModalEdicion(usuario: Usuario) {
    this.usuarioEditando = usuario;
    this.formEdicion = {
      nombreReal: usuario.nombreReal ?? '',
      nombreUsuario: (usuario as any).nombreUsuario ?? '',
      rol: usuario.rol ?? '',
      contrasenaHash: ''
    };
    this.modalEdicionAbierto = true;
  }

  cerrarModalEdicion() {
    this.modalEdicionAbierto = false;
    this.usuarioEditando = null;
    this.guardandoEdicion = false;
  }

  guardarEdicion() {
    if (!this.usuarioEditando) return;
    this.guardandoEdicion = true;

    const payload: any = {
      nombreReal: this.formEdicion.nombreReal,
      nombreUsuario: this.formEdicion.nombreUsuario,
      rol: this.formEdicion.rol,
    };
    if (this.formEdicion.contrasenaHash.trim()) {
      payload.contrasenaHash = this.formEdicion.contrasenaHash;
    }

    this.usuarioService.actualizarUsuario(this.usuarioEditando.id, payload).subscribe({
      next: (actualizado) => {
        const idx = this.usuarios.findIndex(u => u.id === this.usuarioEditando!.id);
        if (idx !== -1) {
          this.usuarios[idx] = { ...this.usuarios[idx], ...actualizado };
        }
        this.aplicarFiltros();
        this.mostrarToast('Usuario actualizado correctamente', 'success');
        this.cerrarModalEdicion();
      },
      error: () => {
        this.mostrarToast('Error al actualizar el usuario', 'danger');
        this.guardandoEdicion = false;
      }
    });
  }

  getModalidadTexto(mod: number): string {
    return mod === 1 ? 'Presencial' : 'Remoto';
  }
}
