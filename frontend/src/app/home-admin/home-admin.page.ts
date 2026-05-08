import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
  IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonModal, IonBadge, IonCardContent, IonItem,
  IonLabel, IonList, IonProgressBar, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleOutline, businessOutline, personAddOutline,
  settingsOutline, searchOutline, schoolOutline,
  statsChartOutline, listOutline
} from 'ionicons/icons';
import {alumno} from "../modelos/alumno";
import {AlumnoService} from "../services/alumno-service";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
    IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, CommonModule,
    FormsModule, IonProgressBar
  ]
})
export class HomeAdminPage implements OnInit {
  alumnos: alumno[] = [];
  proyectos: any[] = [];
  filtroAlumnos: alumno[] = [];
  loading: boolean = true;

  constructor(
    private alumnoService: AlumnoService,
    private toastController: ToastController
  ) {
    addIcons({
      peopleOutline, businessOutline, personAddOutline,
      settingsOutline, searchOutline, schoolOutline,
      statsChartOutline, listOutline
    });
  }

  ngOnInit() {
    this.cargarDatosDesdeBD();
  }

  cargarDatosDesdeBD() {
    this.loading = true;
    this.alumnoService.getAlumnos().subscribe({
      next: (res) => {
        this.alumnos = res;
        this.filtroAlumnos = res;
        this.loading = false;
      },
      error: () => {
        this.mostrarToast('Error conectando con el servidor', 'danger');
        this.loading = false;
      }
    });

    // Carga de proyectos para la sección de gestión
    this.alumnoService.getProyectos().subscribe(res => this.proyectos = res);
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
