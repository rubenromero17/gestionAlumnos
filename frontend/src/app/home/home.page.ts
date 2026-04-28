import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
  IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonModal, IonBadge, IonCardContent, IonSearchbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircle, closeOutline, exitOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton,
    IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardTitle, IonModal, IonBadge, IonCardContent, CommonModule, FormsModule, RouterLink, IonSearchbar
  ]
})
export class HomePage implements OnInit {
  isModalOpen = false;
  proyectoSeleccionado: any = null;
  esProyectoInscrito = false;

  misProyectos = [
    {
      titulo: 'Sistema de Gestión',
      categoria: 'Frontend',
      imagen: 'https://picsum.photos/id/10/600/400',
      descripcion: 'Un panel administrativo avanzado para gestionar usuarios y recursos en tiempo real.'
    },
    {
      titulo: 'Pasarela de Pagos',
      categoria: 'Backend',
      imagen: 'https://picsum.photos/id/20/600/400',
      descripcion: 'Integración de seguridad de alto nivel para transacciones monetarias internacionales.'
    }
  ];

  recomendados = [
    {
      titulo: 'AI Image Gen',
      imagen: 'https://picsum.photos/id/30/600/400',
      descripcion: 'Generador de imágenes mediante inteligencia artificial basado en prompts.'
    },
    {
      titulo: 'Crypto Wallet',
      imagen: 'https://picsum.photos/id/50/600/400',
      descripcion: 'Billetera digital segura para el manejo de activos en la blockchain.'
    }
  ];

  constructor() {
    addIcons({ personCircle, closeOutline, exitOutline });
  }

  ngOnInit() {}

  verDetalles(proyecto: any, inscrito: boolean) {
    this.proyectoSeleccionado = proyecto;
    this.esProyectoInscrito = inscrito;
    this.isModalOpen = true;
  }

  gestionarProyecto(accion: string) {
    console.log(`${accion} en:`, this.proyectoSeleccionado.titulo);
    this.isModalOpen = false;
  }
}
