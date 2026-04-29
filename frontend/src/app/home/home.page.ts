import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
  IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonModal, IonBadge, IonCardContent, IonSearchbar,
  IonItem, IonLabel, ToastController, IonList
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircle, closeOutline, exitOutline, timeOutline, logInOutline, addCircleOutline } from 'ionicons/icons';
import { IonProgressBar, IonInput } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../components/header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
    IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardTitle, IonModal, IonBadge, IonCardContent, CommonModule,
    FormsModule, RouterLink, IonSearchbar, HeaderComponent,
    IonItem, IonLabel, IonInput, IonProgressBar, IonList
  ]
})
export class HomePage implements OnInit {
  isModalOpen = false;
  proyectoSeleccionado: any = null;
  esProyectoInscrito = false;
  nuevoComentario: string = "";

  nombreUsuario: string = "Usuario Pro";
  mostrarTarjetaAsistencia: boolean = true;
  isExiting: boolean = false;

  // Proyectos en los que ya estás
  misProyectos = [
    {
      titulo: 'Sistema de Gestión',
      categoria: 'Frontend',
      imagen: 'https://picsum.photos/id/10/600/400',
      descripcion: 'Panel administrativo avanzado.',
      progreso: 75, // Porcentaje completado
      caracteristicas: ['Autenticación con JWT', 'Dashboard interactivo', 'Exportación PDF'],
      comentarios: []
    },
    {
      titulo: 'Pasarela de Pagos',
      categoria: 'Backend',
      imagen: 'https://picsum.photos/id/20/600/400',
      descripcion: 'Seguridad de alto nivel para transacciones.',
      progreso: 30, // Porcentaje completado
      caracteristicas: ['Encriptación AES-256', 'Webhooks en tiempo real'],
      comentarios: []
    }
  ];

  // Nuevos proyectos disponibles
  nuevosProyectos = [
    { titulo: 'App de Clima Pro', categoria: 'Mobile', imagen: 'https://picsum.photos/id/40/600/400', descripcion: 'Predicción meteorológica con mapas 3D.' },
    { titulo: 'E-commerce API', categoria: 'Backend', imagen: 'https://picsum.photos/id/60/600/400', descripcion: 'Infraestructura escalable para tiendas online.' },
    { titulo: 'Dashboard de Salud', categoria: 'UX/UI', imagen: 'https://picsum.photos/id/80/600/400', descripcion: 'Diseño de interfaz para monitorización médica.' }
  ];

  constructor(private toastController: ToastController) {
    addIcons({ personCircle, closeOutline, exitOutline, timeOutline, logInOutline, addCircleOutline });
  }

  ngOnInit() {
    // LÓGICA DE UN SOLO USO AL DÍA
    const ultimoFichaje = localStorage.getItem('fechaFichaje');
    const hoy = new Date().toDateString();

    if (ultimoFichaje === hoy) {
      this.mostrarTarjetaAsistencia = false;
    }
  }

  async fichar() {
    const hoy = new Date().toDateString();

    // Guardamos en LocalStorage
    localStorage.setItem('fechaFichaje', hoy);

    const toast = await this.toastController.create({
      message: '✅ Te has fichado correctamente',
      duration: 2000,
      position: 'top',
      color: 'success',
      cssClass: 'custom-toast'
    });
    await toast.present();

    this.isExiting = true;
    setTimeout(() => {
      this.mostrarTarjetaAsistencia = false;
    }, 500);
  }

  async inscribirse(proyecto: any) {
    const toast = await this.toastController.create({
      message: `🚀 Inscripción enviada para: ${proyecto.titulo}`,
      duration: 2500,
      color: 'primary',
      position: 'bottom'
    });
    await toast.present();
    console.log("Inscrito en:", proyecto.titulo);
  }

  verDetalles(p: any, i: boolean) {
    this.proyectoSeleccionado = p;
    this.esProyectoInscrito = i;
    this.isModalOpen = true;
  }

  agregarComentario() {
    if (this.nuevoComentario.trim().length > 0 && this.proyectoSeleccionado) {
      if (!this.proyectoSeleccionado.comentarios) {
        this.proyectoSeleccionado.comentarios = [];
      }
      this.proyectoSeleccionado.comentarios.push(this.nuevoComentario);
      this.nuevoComentario = ''; // Limpiamos el input
    }
  }
}
