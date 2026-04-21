import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard,
  IonCardTitle, IonInput, IonItem, IonList, IonButton,
  IonIcon, IonGrid, IonRow, IonCol, IonNote, IonRouterLink, IonLabel, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAddSharp } from 'ionicons/icons';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent, CommonModule, FormsModule, IonCard,
    IonCardTitle, IonInput, IonList, IonItem,
    IonButton, IonIcon, IonGrid, IonRow, IonCol, IonNote, IonRouterLink, RouterLink, IonLabel, IonSelect, IonSelectOption
  ]
})
export class RegisterPage implements OnInit {

  constructor() {
    addIcons({ personAddSharp });
  }

  ngOnInit() {}

}
