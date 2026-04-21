import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardTitle, IonCol,
  IonContent, IonGrid,
  IonIcon,
  IonInput, IonItem, IonLabel,
  IonList, IonNote, IonRow, IonSelect, IonSelectOption,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personSharp } from 'ionicons/icons';
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCard, IonCardTitle, IonInput, IonList, IonItem, IonButton, IonIcon, IonSelect, IonLabel, IonSelectOption, IonCol, IonGrid, IonRow, IonNote, RouterLink]
})
export class LoginPage implements OnInit {

  constructor() {
    addIcons({ personSharp: personSharp });
  }

  ngOnInit() {
  }

}
